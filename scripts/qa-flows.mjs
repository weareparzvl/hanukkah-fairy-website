// Interaction checks: modal, signup, step two, closing form, nights, no-JS post. Usage: node scripts/qa-flows.mjs [base] [outDir]
import { pathToFileURL } from "node:url";
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_PATH || "/Users/parzvl/atlasrr-shop/_qa/node_modules/playwright/index.mjs").href);
const base = process.argv[2] || "http://127.0.0.1:8761";
const out = process.argv[3] || "reviews/rebuild-20261111/shots";
const submit = process.argv[4] !== "no-submit";
const browser = await chromium.launch();
const results = [];
const check = (name, pass, detail = "") => results.push(`${pass ? "PASS" : "FAIL"} ${name}${detail ? " : " + detail : ""}`);
for (const [width, height] of [[1440, 900], [390, 844]]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  // Modal from the hero
  await page.click(".hero-kit");
  await page.waitForTimeout(350);
  check(`${width} modal opens from hero`, await page.evaluate(() => document.querySelector("#kit-modal").open));
  check(`${width} modal records entry point`, (await page.inputValue('#kit-modal input[name="entry"]')) === "hero");
  await page.screenshot({ path: `${out}/flow-modal-${width}.png` });
  if (submit) {
    await page.fill("#modal-email", `qa-${width}-${Date.now()}@example.com`);
    await page.check('#kit-modal input[name="consent"]');
    await page.click('#kit-modal button[type="submit"]');
    await page.waitForSelector("#kit-modal [data-kit-done]:not([hidden])", { timeout: 15000 }).catch(() => {});
    check(`${width} signup shows the download`, await page.isVisible("#kit-modal [data-kit-download]"));
    await page.screenshot({ path: `${out}/flow-done-${width}.png` });
    await page.click('#kit-modal [data-reads-with="grandkids"]');
    await page.waitForTimeout(500);
    check(`${width} step two thanks`, await page.isVisible("#kit-modal [data-kit-step-thanks]"));
    const events = await page.evaluate(() => window.dataLayer.map((e) => e.event).filter(Boolean));
    check(`${width} dataLayer events`, ["kit_cta_click", "sign_up"].every((e) => events.includes(e)), events.join(","));
  }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check(`${width} Escape closes modal`, !(await page.evaluate(() => document.querySelector("#kit-modal").open)));
  // Nights
  await page.locator("#nights").scrollIntoViewIfNeeded();
  await page.click('[data-night="5"]');
  check(`${width} night 6 shows`, (await page.locator(".night-copy.is-active h3").innerText()).includes("troll"));
  await page.screenshot({ path: `${out}/flow-nights-${width}.png` });
  // Closing signup: a plain section, no book to open
  await page.locator(".kit-ending").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  check(`${width} no opening-book reader on the page`, (await page.locator(".reader").count()) === 0);
  check(`${width} closing kit form visible`, await page.isVisible("#reader-email"));
  await page.screenshot({ path: `${out}/flow-ending-${width}.png` });
  check(`${width} no page errors`, errors.length === 0, errors.join(" | "));
  await context.close();
}
// Without JavaScript: content present and the form posts to a real page.
const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
const page = await plain.newPage();
await page.goto(base + "/", { waitUntil: "load" });
check("no-JS: all eight nights in the page", (await page.locator(".night-copy").count()) === 8 && (await page.locator(".night-copy >> nth=7").isVisible()));
await page.goto(base + "/kit", { waitUntil: "load" });
if (submit) {
  await page.fill("#kit-page-email", `qa-nojs-${Date.now()}@example.com`);
  await page.check('main input[name="consent"]');
  await Promise.all([page.waitForURL("**/kit/thanks"), page.click('main button[type="submit"]')]).catch(() => {});
  check("no-JS: form post lands on the thanks page", page.url().endsWith("/kit/thanks"), page.url());
}
await browser.close();
console.log(results.join("\n"));
if (results.some((r) => r.startsWith("FAIL"))) process.exitCode = 1;
