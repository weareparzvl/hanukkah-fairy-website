// Builds the approval preview that is served under /v2 on the live domain.
// Astro prefixes its own bundled assets; this prefixes the hand-written site links.
import { execSync } from "node:child_process";
import { readdir, readFile, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";

const base = "/v2";
execSync("npx astro build", { stdio: "inherit", env: { ...process.env, HF_BASE: base } });
const out = "dist-v2";
const prefix = (url) => {
  if (!url.startsWith("/") || url.startsWith("//") || url === base || url.startsWith(`${base}/`) || url.startsWith(`${base}#`) || url.startsWith("/api/")) return url;
  if (url === "/") return base;
  if (url.startsWith("/#")) return base + url.slice(1);
  return base + url;
};
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (/\.html$/.test(entry.name)) {
      let html = await readFile(path, "utf8");
      html = html.replace(/\b(href|src|action|poster)="([^"]*)"/g, (_, attr, url) => `${attr}="${prefix(url)}"`);
      html = html.replace(/\bsrcset="([^"]*)"/g, (_, set) => `srcset="${set.split(", ").map((part) => { const [url, ...rest] = part.split(" "); return [prefix(url), ...rest].join(" "); }).join(", ")}"`);
      await writeFile(path, html);
    } else if (/\.css$/.test(entry.name)) {
      const css = await readFile(path, "utf8");
      await writeFile(path, css.replace(/url\((["']?)\/(?!v2\/|\/)/g, `url($1${base}/`));
    }
  }
}
await walk(out);
// The live site's robots.txt and sitemap stay the only ones.
await rm(join(out, "robots.txt"), { force: true });
await rm(join(out, "sitemap.xml"), { force: true });
console.log(`Approval preview built in ${out}/ for ${base}.`);
