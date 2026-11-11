import { get, put, BlobPreconditionFailedError } from "@vercel/blob";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export const LEGACY_HEADER = "email,signed_up_at,source,consent_version\r\n";
export const CONTACT_HEADER =
  "email,signed_up_at,source,consent_version,name,address,phone\r\n";
export const HEADER =
  "email,signed_up_at,source,consent_version,name,address,phone,entry,reads_with\r\n";
export const CONSENT_VERSION = "kit-2026-11";
export const READS_WITH = ["kids", "grandkids", "class", "gift"];
export function normalizeEntry(value) {
  return typeof value === "string" && /^[a-z0-9-]{1,40}$/.test(value)
    ? value
    : "";
}
export function normalizeReadsWith(value) {
  return READS_WITH.includes(value) ? value : "";
}
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
export function normalizeSignup(data) {
  const email = normalizeEmail(typeof data === "string" ? data : data?.email);
  if (!email) return null;
  const record = { email };
  for (const [field, limit] of Object.entries({
    name: 120,
    address: 500,
    phone: 50,
  })) {
    const value = typeof data === "string" ? "" : (data[field] ?? "");
    if (
      typeof value !== "string" ||
      value.length > limit ||
      /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)
    )
      return null;
    record[field] = value.replace(/\s+/g, " ").trim();
  }
  record.entry = normalizeEntry(typeof data === "string" ? "" : data.entry);
  record.readsWith = normalizeReadsWith(
    typeof data === "string" ? "" : data.readsWith,
  );
  return record;
}
export function csvCell(value) {
  // Quoting handles commas and quotes; the prefix prevents spreadsheet formulas.
  const safe = /^[=+@-]/.test(value) ? "'" + value : value;
  return '"' + safe.replace(/"/g, '""') + '"';
}
export function csvRow(value, now = new Date().toISOString()) {
  const record = normalizeSignup(value);
  if (!record) throw new Error("Invalid signup");
  return (
    [
      record.email,
      now,
      "website",
      CONSENT_VERSION,
      record.name,
      record.address,
      record.phone,
      record.entry,
      record.readsWith,
    ]
      .map(csvCell)
      .join(",") + "\r\n"
  );
}
export function upgradeCsv(csv) {
  if (csv.startsWith(HEADER)) return csv;
  // Older files gain empty cells; no earlier record is dropped or rewritten.
  for (const [header, padding] of [
    [CONTACT_HEADER, ',"",""'],
    [LEGACY_HEADER, ',"","","","",""'],
  ]) {
    if (!csv.startsWith(header)) continue;
    const rows = csv.slice(header.length).split(/\r?\n/).filter(Boolean);
    return HEADER + rows.map((row) => row + padding + "\r\n").join("");
  }
  throw new Error("Unexpected CSV format");
}
// Step two of the signup: one tap that fills the last cell of an existing row.
export function setReadsWith(csv, email, readsWith) {
  const value = normalizeReadsWith(readsWith);
  if (!value) return csv;
  return csv
    .split(/(?<=\r\n)/)
    .map((line) =>
      line.startsWith(`"${email}",`) && /,""\r\n$/.test(line)
        ? line.replace(/,""\r\n$/, `,${csvCell(value)}\r\n`)
        : line,
    )
    .join("");
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
  value,
  { path = signupPath(), read = readPrivateCsv, write = put } = {},
) {
  const record = normalizeSignup(value);
  if (!record) throw new Error("Invalid signup");
  for (let attempt = 0; attempt < 8; attempt++) {
    const current = await read(path);
    const csv = upgradeCsv(current?.csv || HEADER);
    const next = hasEmail(csv, record.email)
      ? setReadsWith(csv, record.email, record.readsWith)
      : value?.followUp
        ? csv // A follow-up never creates a row: there is no consent on it.
        : csv + csvRow(record);
    if (next === csv) return;
    try {
      await write(path, next, {
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
export function saveLocalSignup(value) {
  const record = normalizeSignup(value);
  if (!record) return Promise.reject(new Error("Invalid signup"));
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
    csv = upgradeCsv(csv);
    const next = hasEmail(csv, record.email)
      ? setReadsWith(csv, record.email, record.readsWith)
      : value?.followUp
        ? csv // A follow-up never creates a row: there is no consent on it.
        : csv + csvRow(record);
    if (next === csv) return;
    const temporary = `${file}.tmp`;
    await writeFile(temporary, next, { mode: 0o600 });
    await rename(temporary, file);
  });
  localQueue = pending.catch(() => {});
  return pending;
}
export async function saveSignup(record) {
  if (process.env.HF_LOCAL_CSV === "1") return saveLocalSignup(record);
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID)
    throw new Error("Signup storage unavailable");
  return saveBlobSignup(record);
}
