import { cp, mkdir, rm } from "node:fs/promises";
await rm("public", { recursive: true, force: true });
await mkdir("public", { recursive: true });
for (const path of ["index.html", "privacy.html", "css", "js", "assets"])
  await cp(path, `public/${path}`, { recursive: true });
console.log(
  "Website built in public/. Server code, credentials and CSVs are excluded.",
);
