// Builds The Fairy's 8-Night Kit (US Letter PDF) and the page previews the site shows.
// Run: npm run kit. Needs Playwright: set PLAYWRIGHT_PATH or install it locally.
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { nights, steps } from "../src/data/nights.js";

const root = process.cwd();
const url = (path) => pathToFileURL(resolve(root, path)).href;
const playwrightPath =
  process.env.PLAYWRIGHT_PATH ||
  "/Users/parzvl/atlasrr-shop/_qa/node_modules/playwright/index.mjs";
const { chromium } = await import(pathToFileURL(playwrightPath).href);

const font = (pkg, file) => url(`node_modules/${pkg}/files/${file}`);
// Print-sized copies keep the PDF small enough to download on a phone.
const sharp = (await import("sharp")).default;
await mkdir("scripts/kit/img", { recursive: true });
const prepared = {
  "logo.png": sharp("src/assets/logo-wide.webp").resize({ width: 1100 }).png({ palette: true, quality: 90 }),
  "fairy-cover.png": sharp("src/assets/fairy-wand.png").resize({ height: 1500 }).png({ palette: true, quality: 90 }),
  "fairy.jpg": sharp("src/assets/fairy-wand.png").resize({ height: 1100 }).flatten({ background: "#ffffff" }).jpeg({ quality: 86 }),
  "pup.jpg": sharp("src/assets/pup.png").resize({ height: 800 }).flatten({ background: "#ffffff" }).jpeg({ quality: 86 }),
  "cover.jpg": sharp("src/assets/cover.webp").resize({ width: 640 }).jpeg({ quality: 84 }),
};
for (const [name, image] of Object.entries(prepared))
  await image.toFile(`scripts/kit/img/${name}`);
const art = (name) => url(`scripts/kit/img/${name}`);
// Coloring pages supplied by Elise and Donny (2026-11-11). Full-page line art with its own footer.
const coloring = ["fairy", "pup", "harold", "grizzlebottom", "mazel"];

const card = (night) => `
  <article class="card">
    <p class="card-night">Night ${night.n} of 8</p>
    <p class="card-date">${night.date}</p>
    <h3>${night.title}</h3>
    <p class="card-body">${night.activity}</p>
    <dl>
      <dt>Tonight’s hiding spot</dt><dd>${night.hide}</dd>
      <dt>Tonight’s kind thing</dt><dd>${night.kind}</dd>
    </dl>
  </article>`;

const note = (night) => `
  <article class="note">
    <p class="note-title">You found me!</p>
    <p class="note-night">Night ${night.n} of 8</p>
    <p class="note-line">A kind thing to try tomorrow:</p>
    <span class="rule"></span><span class="rule"></span>
    <p class="note-sign">Love, the Hanukkah Fairy</p>
  </article>`;

const candle = (label, tall = false) => `
  <div class="candle${tall ? " tall" : ""}">
    <span class="flame"></span><span class="stick"></span><span class="num">${label}</span>
  </div>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>The Fairy’s 8-Night Kit | The Hanukkah Fairy</title>
<style>
@font-face { font-family: "Bricolage"; font-weight: 200 800; src: url("${font("@fontsource-variable/bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2")}") format("woff2"); }
@font-face { font-family: "DM Sans"; font-weight: 100 1000; src: url("${font("@fontsource-variable/dm-sans", "dm-sans-latin-wght-normal.woff2")}") format("woff2"); }
@font-face { font-family: "Bagel"; src: url("${font("@fontsource/bagel-fat-one", "bagel-fat-one-latin-400-normal.woff2")}") format("woff2"); }
@page { size: 8.5in 11in; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font: 12.5pt/1.5 "DM Sans", Arial, sans-serif; color: #132447; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, p, dl, dd { margin: 0; }
h1, h2, h3 { font-family: "Bricolage", sans-serif; font-weight: 800; letter-spacing: -0.035em; line-height: 0.98; }
.sheet { position: relative; width: 8.5in; height: 11in; padding: 0.6in; overflow: hidden; page-break-after: always; background: #fff; display: flex; flex-direction: column; }
.sheet:last-child { page-break-after: auto; }
.sheet.color { padding: 0; }
.sheet.color img { width: 100%; height: 100%; object-fit: contain; }
.foot { margin-top: auto; padding-top: 0.2in; display: flex; justify-content: space-between; font-size: 9pt; color: #465572; border-top: 1px solid #13244730; }

/* 1. Cover */
.cover { background: #fff8ee; padding: 0; }
.cover-top { background: #1254cf; height: 4.9in; position: relative; }
.cover-top .logo { position: absolute; left: 0.5in; top: 0.45in; width: 3.5in; }
.cover-top .fairy { position: absolute; right: -0.15in; bottom: -1.5in; height: 5.6in; }
.cover-copy { padding: 1.75in 0.6in 0; }
.cover-copy .tag { display: inline-block; background: #f6f34a; padding: 5pt 11pt; border-radius: 3pt; font-weight: 700; font-size: 10.5pt; }
.cover h1 { font-size: 68pt; margin-top: 0.26in; }
.cover-copy > p:last-child { font-size: 15pt; line-height: 1.4; margin-top: 0.26in; max-width: 5.6in; }
.cover .foot { margin: auto 0.6in 0.45in; }

/* 2. How it works */
.how h2 { font-size: 54pt; }
.how .refrain { font: 800 22pt/1.1 "Bricolage", sans-serif; letter-spacing: -0.03em; color: #1254cf; margin-top: 0.14in; }
.steps { list-style: none; margin: 0.36in 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0.22in 0.4in; counter-reset: step; }
.steps li { counter-increment: step; padding-left: 0.5in; position: relative; }
.steps li:before { content: counter(step); position: absolute; left: 0; top: 0; width: 0.36in; height: 0.36in; border-radius: 50%; background: #f6f34a; font: 800 14pt/0.36in "Bricolage", sans-serif; text-align: center; }
.steps strong { display: block; font: 800 16pt/1.1 "Bricolage", sans-serif; letter-spacing: -0.02em; }
.steps span { display: block; font-size: 11pt; margin-top: 3pt; }
.when { margin-top: 0.32in; background: #c7eff1; border-radius: 6pt; padding: 0.2in 0.26in; font-size: 11.5pt; }
.when strong { font-weight: 700; }
.cutouts { margin-top: 0.3in; flex: 1; min-height: 0; display: grid; grid-template-columns: 1.25fr 1fr; gap: 0.3in; }
.cut { border: 2px dashed #132447; border-radius: 10pt; padding: 0.18in; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 0; text-align: center; }
.cut img { flex: 1; min-height: 0; max-width: 100%; object-fit: contain; }
.cut p { font-size: 10.5pt; font-weight: 600; margin-top: 6pt; }
.cut-label { font: 400 10pt "DM Sans", sans-serif; align-self: flex-start; }

/* 3 and 4. Night cards */
.cards h2, .notes h2, .track h2 { font-size: 30pt; }
.sub { font-size: 11pt; margin-top: 6pt; color: #465572; }
.card-grid { flex: 1; min-height: 0; margin-top: 0.22in; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 0.2in; }
.card { border: 2px dashed #132447; border-radius: 10pt; padding: 0.24in; display: flex; flex-direction: column; }
.card-night { font: 800 12pt "Bricolage", sans-serif; color: #1254cf; }
.card-date { font-size: 9.5pt; color: #465572; }
.card h3 { font-size: 21pt; margin-top: 0.12in; line-height: 1.02; }
.card-body { font-size: 10.5pt; line-height: 1.45; margin-top: 0.1in; }
.card dl { margin-top: auto; padding-top: 0.12in; }
.card dt { font-size: 9pt; font-weight: 700; margin-top: 0.09in; }
.card dd { font-size: 10.5pt; line-height: 1.4; }

/* 5. Notes */
.note-grid { flex: 1; min-height: 0; margin-top: 0.22in; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, 1fr); gap: 0.16in; }
.note { border: 2px dashed #132447; border-radius: 10pt; padding: 0.16in 0.22in; display: flex; flex-direction: column; background: #fff8ee; }
.note-title { font: 400 19pt/1 "Bagel", Georgia, serif; color: #1254cf; }
.note-night { font-size: 9.5pt; font-weight: 700; margin-top: 3pt; }
.note-line { font-size: 10pt; margin-top: auto; }
.rule { display: block; border-bottom: 1px solid #132447; height: 0.27in; }
.note-sign { font-size: 9.5pt; font-weight: 600; margin-top: 7pt; text-align: right; }

/* 6. Menorah */
.menorah { margin: 0.55in auto 0; display: flex; align-items: flex-end; gap: 0.3in; }
.candle { display: flex; flex-direction: column; align-items: center; gap: 6pt; }
.candle .flame { width: 0.3in; height: 0.46in; border: 2.5px solid #132447; border-radius: 75% 25% 60% 40%; transform: rotate(12deg); }
.candle .stick { width: 0.36in; height: 2.5in; border: 2.5px solid #132447; border-radius: 4pt 4pt 0 0; }
.candle.tall .stick { height: 3.2in; }
.candle .num { font: 800 13pt "Bricolage", sans-serif; }
.base { width: 6.6in; height: 0.22in; border: 2.5px solid #132447; border-radius: 4pt; margin: -2px auto 0; }
.track .hint { text-align: center; font-size: 11pt; margin-top: 0.2in; }
.bookend { margin-top: auto; display: grid; grid-template-columns: 1.7in 1fr; gap: 0.35in; align-items: center; background: #ffdae8; border-radius: 8pt; padding: 0.28in; }
.bookend img { width: 100%; border-radius: 3pt; }
.bookend h3 { font-size: 21pt; }
.bookend p { font-size: 10.5pt; margin-top: 8pt; }
.bookend .quote { font: 400 15pt/1.15 "Bagel", Georgia, serif; color: #1254cf; }
.track .foot { margin-top: 0.3in; }
</style>
</head>
<body>
<section class="sheet cover">
  <div class="cover-top">
    <img class="logo" src="${art("logo.png")}" alt="The Hanukkah Fairy" />
    <img class="fairy" src="${art("fairy-cover.png")}" alt="" />
  </div>
  <div class="cover-copy">
    <span class="tag">Free printable</span>
    <h1>The Fairy’s<br />8-Night Kit</h1>
    <p>She hides. You seek. Be kind. Get a treat.<br />Everything you need for all eight nights.</p>
  </div>
  <div class="foot"><span>thehanukkahfairy.com</span><span>Print at home on letter paper</span></div>
</section>

<section class="sheet how">
  <h2>She hides.<br />You seek.</h2>
  <p class="refrain">Be kind. Get a treat.</p>
  <ol class="steps">
    ${steps.map(([a, b]) => `<li><strong>${a}</strong><span>${b}</span></li>`).join("")}
  </ol>
  <p class="when"><strong>Hanukkah 2026:</strong> the first candle is Friday, December 4, at sundown. Night eight is Friday, December 11. After bedtime, a grown-up hides the Fairy and leaves her note. Jelly donuts left out overnight tend to disappear.</p>
  <div class="cutouts">
    <div class="cut"><span class="cut-label">Cut along the dashes</span><img src="${art("fairy.jpg")}" alt="" /><p>The Fairy. Hide her somewhere new every night.</p></div>
    <div class="cut"><span class="cut-label">Cut along the dashes</span><img src="${art("pup.jpg")}" alt="" /><p>Pup. He guards the donuts. Mostly.</p></div>
  </div>
  <div class="foot"><span>The Fairy’s 8-Night Kit</span><span>thehanukkahfairy.com</span></div>
</section>

${[0, 4]
  .map(
    (start) => `
<section class="sheet cards">
  <h2>Nights ${start + 1} to ${start + 4}</h2>
  <p class="sub">One card a night. Cut them apart or keep the page on the fridge.</p>
  <div class="card-grid">${nights.slice(start, start + 4).map(card).join("")}</div>
  <div class="foot"><span>The Fairy’s 8-Night Kit</span><span>thehanukkahfairy.com</span></div>
</section>`,
  )
  .join("")}

<section class="sheet notes">
  <h2>Notes from the Fairy</h2>
  <p class="sub">For grown-ups: fill one in each night and leave it where she hides.</p>
  <div class="note-grid">${nights.map(note).join("")}</div>
  <div class="foot"><span>The Fairy’s 8-Night Kit</span><span>thehanukkahfairy.com</span></div>
</section>

<section class="sheet track">
  <h2>Color a flame every night.</h2>
  <p class="sub">The tall one in the middle is the shamash, the helper candle. It lights the rest.</p>
  <div class="menorah">
    ${[1, 2, 3, 4].map((n) => candle(n)).join("")}
    ${candle("&nbsp;", true)}
    ${[5, 6, 7, 8].map((n) => candle(n)).join("")}
  </div>
  <div class="base"></div>
  <p class="hint">Eight nights. Eight hiding spots. Eight kind things.</p>
  <div class="bookend">
    <img src="${art("cover.jpg")}" alt="The Hanukkah Fairy book cover" />
    <div>
      <p class="quote">“Happiness grows when kindness is near.”</p>
      <h3 style="margin-top:0.16in">It starts with the story.</h3>
      <p>The Hanukkah Fairy is a rhyming picture book by Elise and Donny Dykowsky, illustrated by Tincho Schmidt. Hardcover, paperback and ebook at thehanukkahfairy.com/book</p>
    </div>
  </div>
  <div class="foot"><span>© 2026 The Hanukkah Fairy™</span><span>This story belongs to you.</span></div>
</section>
${coloring.map((name) => `
<section class="sheet color"><img src="${url(`src/assets/coloring/${name}.png`)}" alt="" /></section>`).join("")}
</body>
</html>`;

if (html.includes("—")) throw new Error("Em dash found in kit copy");

await mkdir("scripts/kit", { recursive: true });
await mkdir("static/kit", { recursive: true });
await mkdir("src/assets/kit", { recursive: true });
await writeFile("scripts/kit/kit.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 816, height: 1056 },
  deviceScaleFactor: 2,
});
await page.goto(url("scripts/kit/kit.html"));
await page.evaluate(() => document.fonts.ready);
await page.waitForLoadState("networkidle");
await page.pdf({
  path: "static/kit/the-fairys-8-night-kit.pdf",
  width: "8.5in",
  height: "11in",
  printBackground: true,
});
const sheets = await page.locator(".sheet").all();
for (const [index, sheet] of sheets.entries())
  await sheet.screenshot({ path: `src/assets/kit/page-${index + 1}.png` });
// Overflow check: no sheet's content may be taller than the sheet.
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll(".sheet")].map(
    (sheet) => sheet.scrollHeight - sheet.clientHeight,
  ),
);
await browser.close();
console.log(`Kit built: ${sheets.length} pages. Overflow px per page: ${overflow.join(", ")}`);
if (overflow.some((px) => px > 1)) process.exitCode = 1;
