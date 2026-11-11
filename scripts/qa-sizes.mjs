// 13-size check: fold screenshots of the home page plus overflow and error checks on every page.
// Usage: node scripts/qa-sizes.mjs <base> <outDir> [shareToken]
import { pathToFileURL } from "node:url";
import { mkdir } from "node:fs/promises";
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_PATH || "/Users/parzvl/atlasrr-shop/_qa/node_modules/playwright/index.mjs").href);
const [base, out, share] = process.argv.slice(2);
await mkdir(out, { recursive: true });
const sizes = ["320x740", "340x640", "375x812", "390x844", "768x1024", "1024x768", "1280x800", "1366x768", "1440x900", "1512x860", "1728x1000", "1920x1080", "2560x1300"];
const paths = ["/", "/book", "/tradition", "/eight-nights", "/kit", "/faq", "/privacy"];
const browser = await chromium.launch();
const problems = [];
for (const size of sizes) {
  const [width, height] = size.split("x").map(Number);
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  page.on("pageerror", (e) => problems.push(`${size} pageerror: ${e.message}`));
  page.on("response", (r) => r.status() >= 400 && !/googletagmanager|_vercel/.test(r.url()) && problems.push(`${size} ${r.status()} ${r.url()}`));
  if (share) await page.goto(`${base}/?_vercel_share=${share}`, { waitUntil: "networkidle" });
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    const report = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - innerWidth;
      // Buttons and links that are clipped by the viewport edge.
      const clipped = [...document.querySelectorAll("main .button, .nav .button")].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width && (r.left < -1 || r.right > innerWidth + 1);
      }).length;
      const small = [...document.querySelectorAll("main a.button, main button.button, .menu-toggle")].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width && r.height < 43.5;
      }).length;
      return { overflow, clipped, small };
    });
    if (report.overflow > 0) problems.push(`${size} ${path}: horizontal overflow ${report.overflow}px`);
    if (report.clipped) problems.push(`${size} ${path}: ${report.clipped} clipped buttons`);
    if (report.small) problems.push(`${size} ${path}: ${report.small} buttons under 44px tall`);
    if (path === "/") {
      await page.waitForTimeout(250);
      await page.screenshot({ path: `${out}/${size}.png` });
      const hero = await page.evaluate(() => {
        const box = (s) => document.querySelector(s).getBoundingClientRect();
        const kit = box(".hero-kit"), buy = box(".hero-buy"), cap = box(".hero-caption"), mark = box(".hero-wordmark");
        const hit = (a, b) => !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        return { kitVisible: kit.bottom <= innerHeight, captionOverBuy: hit(cap, buy), captionOverMark: cap.top < mark.top + mark.height * 0.55 && cap.left < mark.right && innerWidth > 760 };
      });
      if (hero.captionOverBuy) problems.push(`${size} hero: caption overlaps buy card`);
      if (!hero.kitVisible) problems.push(`${size} hero: kit button below the fold`);
    }
  }
  await context.close();
}
await browser.close();
console.log(problems.length ? problems.join("\n") : `Clean at all ${sizes.length} sizes on ${paths.length} pages.`);
