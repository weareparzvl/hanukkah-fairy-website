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
    assert.match(csv, /"website","kit-2026-11"/);
  } finally {
    delete process.env.SIGNUPS_CSV_PATH;
    await rm(dir, { recursive: true });
  }
});

test("optional contact details are not required, are bounded, and stay spreadsheet-safe", async () => {
  const { normalizeSignup, csvRow } = await import("../lib/signups.mjs");
  assert.deepEqual(normalizeSignup({ email: "parent@example.com" }), {
    email: "parent@example.com",
    name: "",
    address: "",
    phone: "",
    entry: "",
    readsWith: "",
  });
  assert.equal(
    normalizeSignup({ email: "parent@example.com", name: "x".repeat(121) }),
    null,
  );
  assert.equal(
    normalizeSignup({ email: "parent@example.com", phone: { number: "123" } }),
    null,
  );
  const row = csvRow({
    email: "parent@example.com",
    name: 'A "Quoted" Name',
    address: "12 Main St, Brooklyn\nNY",
    phone: "+1 212 555 0100",
  });
  assert.ok(row.includes('"A ""Quoted"" Name"'));
  assert.ok(row.includes('"12 Main St, Brooklyn NY"'));
  assert.ok(row.includes('"\'+1 212 555 0100"'));
  assert.equal(row.split("\n").length, 2);
});

test("existing four-column CSV upgrades without losing subscriber records", async () => {
  const { LEGACY_HEADER, upgradeCsv } = await import("../lib/signups.mjs");
  const legacy =
    LEGACY_HEADER +
    '"earlier@example.com","2026-09-27T00:00:00Z","website","launch-updates-2026-09"\r\n';
  let stored = legacy;
  await saveBlobSignup(
    { email: "new@example.com", name: "New Parent", address: "", phone: "" },
    {
      read: async () => ({ csv: stored, etag: "1" }),
      write: async (path, body) => {
        stored = body;
      },
    },
  );
  assert.ok(stored.startsWith(HEADER));
  assert.ok(
    stored.includes(
      '"earlier@example.com","2026-09-27T00:00:00Z","website","launch-updates-2026-09","","","","",""',
    ),
  );
  assert.ok(stored.includes('"New Parent"'));
  assert.equal(stored.trim().split("\n").length, 3);
  assert.equal(upgradeCsv(stored), stored);
});

test("seven-column CSV upgrades to the kit columns without losing records", async () => {
  const { CONTACT_HEADER, upgradeCsv } = await import("../lib/signups.mjs");
  const row =
    '"earlier@example.com","2026-10-01T00:00:00Z","website","launch-updates-2026-09","Ann","1 Main St","555"';
  const upgraded = upgradeCsv(CONTACT_HEADER + row + "\r\n");
  assert.equal(upgraded, HEADER + row + ',"",""\r\n');
});

test("kit signup records its entry point; step two fills who they read with", async () => {
  let stored = HEADER;
  const store = {
    read: async () => ({ csv: stored, etag: "1" }),
    write: async (path, body) => {
      stored = body;
    },
  };
  await saveBlobSignup({ email: "p@example.com", entry: "hero" }, store);
  assert.match(stored, /"p@example.com",.*"kit-2026-11","","","","hero",""\r\n$/);
  await saveBlobSignup(
    { email: "p@example.com", readsWith: "grandkids", followUp: true },
    store,
  );
  assert.match(stored, /"hero","grandkids"\r\n$/);
  assert.equal(stored.trim().split("\n").length, 2);
  // Unknown values and unknown addresses change nothing.
  const before = stored;
  await saveBlobSignup(
    { email: "p@example.com", readsWith: "=cmd", followUp: true },
    store,
  );
  await saveBlobSignup(
    { email: "stranger@example.com", readsWith: "kids", followUp: true },
    store,
  );
  assert.equal(stored, before);
});
