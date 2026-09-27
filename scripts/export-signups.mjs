import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { readPrivateCsv, HEADER } from "../lib/signups.mjs";
const preview = process.argv.includes("--preview");
const path = preview ? "preview/signups.csv" : "production/signups.csv";
const result = await readPrivateCsv(path);
const csv = result?.csv || HEADER;
const output = resolve(
  "exports",
  preview ? "preview-signups.csv" : "signups.csv",
);
await mkdir(dirname(output), { recursive: true, mode: 0o700 });
await writeFile(output, csv, { mode: 0o600 });
console.log(
  `Saved ${Math.max(0, csv.trim().split("\n").length - 1)} signups to ${output}`,
);
