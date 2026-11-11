// Screenshots and layout checks for the rebuild. Usage: node scripts/qa-shots.mjs [base] [outDir]
import { pathToFileURL } from "node:url";
import { mkdir } from "node:fs/promises";
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_PATH || "/Users/parzvl/atlasrr-shop/_qa/node_modules/playwright/index.mjs").href);
const base = process.argv[2] || "http://127.0.0.1:8761";
const out = process.argv[3] || "reviews/rebuild-20261111/shots";
const only = process.argv[4];
await mkdir(out, { recursive: true });
const pages = [["home", "/"], ["book", "/book"], ["tradition", "/tradition"], ["eight-nights", "/eight-nights"], ["kit", "/kit"], ["faq", "/faq"], ["privacy", "/privacy"], ["thanks", "/kit/thanks"]];
const sizes = [[1440, 900], [390, 844]];
const browser = await chromium.launch();
const problems = [];
for (const [width, height] of sizes) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("console", (m) => m.type() === "error" && problems.push(`${width} console: ${m.text()}`));
  page.on("pageerror", (e) => problems.push(`${width} pageerror: ${e.message}`));
  page.on("response", (r) => r.status() >= 400 && !r.url().includes("googletagmanager") && problems.push(`${width} ${r.status()} ${r.url()}`));
  for (const [name, path] of pages) {
    if (only && only !== name) continue;
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow > 0) problems.push(`${width} ${name}: horizontal overflow ${overflow}px`);
    await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true });
    await page.screenshot({ path: `${out}/${name}-${width}-fold.png` });
  }
  await context.close();
}
await browser.close();
console.log(problems.length ? problems.join("\n") : "No console errors, failed requests or horizontal overflow.");
