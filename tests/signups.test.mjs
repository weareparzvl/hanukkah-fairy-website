import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  normalizeEmail,
  HEADER,
  saveBlobSignup,
  saveLocalSignup,
} from "../lib/signups.mjs";

test("normalizes email and rejects malformed, multiline, and spreadsheet-formula inputs", () => {
  assert.equal(
    normalizeEmail(" Parent+Launch@Example.com "),
    "parent+launch@example.com",
  );
  for (const email of [
    "",
    "not-an-email",
    "a@b",
    "a\r\n@b.com",
    '=HYPERLINK("x")@example.com',
    "+sum@example.com",
    "a..b@example.com",
    "a@-example.com",
  ])
    assert.equal(normalizeEmail(email), null, email);
});

test("concurrent CSV appends preserve distinct signups and deduplicate retries", async () => {
  let csv = HEADER;
  let version = 1;
  const read = async () => ({ csv, etag: String(version) });
  const write = async (path, body, options) => {
    await new Promise((done) => setTimeout(done, 2));
    if (options.ifMatch !== String(version))
      throw new Error("precondition failed");
    assert.equal(options.access, "private");
    csv = body;
    version++;
  };
  await Promise.all(
    [
      "one@example.com",
      "two@example.com",
      "three@example.com",
      "one@example.com",
    ].map((email) => saveBlobSignup(email, { read, write })),
  );
  assert.equal(csv.trim().split("\n").length, 4);
  for (const email of [
    "one@example.com",
    "two@example.com",
    "three@example.com",
  ])
    assert.equal(csv.split(email).length, 2);
});

test("storage failure propagates instead of confirming a lost signup", async () => {
  await assert.rejects(
    saveBlobSignup("parent@example.com", {
      read: async () => ({ csv: HEADER, etag: "1" }),
      write: async () => {
        throw new Error("storage offline");
      },
    }),
    /storage offline/,
  );
});

test("local CSV persists complete rows and excludes duplicates", async () => {
  const dir = await mkdtemp(join(tmpdir(), "hf-signups-"));
  process.env.SIGNUPS_CSV_PATH = join(dir, "signups.csv");
  try {
    await Promise.all(
      ["a@example.com", "b@example.com", "a@example.com"].map(saveLocalSignup),
    );
    const csv = await readFile(process.env.SIGNUPS_CSV_PATH, "utf8");
    assert.ok(csv.startsWith(HEADER));
    assert.equal(csv.trim().split("\n").length, 3);
    assert.match(csv, /"website","launch-updates-2026-09"/);
  } finally {
    delete process.env.SIGNUPS_CSV_PATH;
    await rm(dir, { recursive: true });
  }
});
