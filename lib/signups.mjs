import { get, put, BlobPreconditionFailedError } from "@vercel/blob";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export const HEADER = "email,signed_up_at,source,consent_version\r\n";
export const CONSENT_VERSION = "launch-updates-2026-09";
export function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  // Deliberately support ordinary email addresses; reject control characters and CSV formulas.
  if (
    email.length > 254 ||
    !/^[a-z0-9][a-z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(
      email,
    )
  )
    return null;
  const local = email.split("@")[0];
  if (local.length > 64 || local.endsWith(".") || local.includes(".."))
    return null;
  return email;
}
export function csvRow(email, now = new Date().toISOString()) {
  return `"${email}","${now}","website","${CONSENT_VERSION}"\r\n`;
}
export function hasEmail(csv, email) {
  return csv.split(/\r?\n/).some((line) => line.startsWith(`"${email}",`));
}
export function signupPath() {
  // Preview traffic cannot pollute the production mailing list.
  return process.env.VERCEL_ENV === "production"
    ? "production/signups.csv"
    : "preview/signups.csv";
}
export async function readPrivateCsv(path = signupPath()) {
  const result = await get(path, { access: "private", useCache: false });
  if (!result) return null;
  if (result.statusCode !== 200 || !result.stream)
    throw new Error("Storage did not return a CSV");
  return {
    csv: await new Response(result.stream).text(),
    etag: result.blob.etag,
  };
}
export async function saveBlobSignup(
  email,
  { path = signupPath(), read = readPrivateCsv, write = put } = {},
) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const current = await read(path);
    const csv = current?.csv || HEADER;
    if (!csv.startsWith(HEADER)) throw new Error("Unexpected CSV format");
    if (hasEmail(csv, email)) return;
    try {
      await write(path, csv + csvRow(email), {
        access: "private",
        contentType: "text/csv",
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        allowOverwrite: Boolean(current),
        ...(current ? { ifMatch: current.etag } : {}),
      });
      return;
    } catch (error) {
      const conflict =
        error instanceof BlobPreconditionFailedError ||
        /already exists|precondition/i.test(error.message);
      if (!conflict || attempt === 7) throw error;
      await new Promise((done) =>
        setTimeout(done, 30 * (attempt + 1) + Math.random() * 60),
      );
    }
  }
}
let localQueue = Promise.resolve();
export function saveLocalSignup(email) {
  const file = resolve(process.env.SIGNUPS_CSV_PATH || "data/signups.csv");
  const pending = localQueue.then(async () => {
    await mkdir(dirname(file), { recursive: true, mode: 0o700 });
    let csv;
    try {
      csv = await readFile(file, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      csv = HEADER;
    }
    if (!csv.startsWith(HEADER)) throw new Error("Unexpected CSV format");
    if (hasEmail(csv, email)) return;
    const temporary = `${file}.tmp`;
    await writeFile(temporary, csv + csvRow(email), { mode: 0o600 });
    await rename(temporary, file);
  });
  localQueue = pending.catch(() => {});
  return pending;
}
export async function saveSignup(email) {
  if (process.env.HF_LOCAL_CSV === "1") return saveLocalSignup(email);
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID)
    throw new Error("Signup storage unavailable");
  return saveBlobSignup(email);
}
