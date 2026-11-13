// Lastmod is the build date, so it is accurate on every deploy.
// The home and book pages list the official cover so Google ties that image to them.
import { cover } from "../data/book.js";
const origin = "https://thehanukkahfairy.com";
const paths = ["/", "/book", "/tradition", "/eight-nights", "/kit", "/faq"];
const withCover = new Set(["/", "/book"]);
export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const image = `\n    <image:image>\n      <image:loc>${origin}${cover.path}</image:loc>\n    </image:image>`;
  const urls = paths
    .map((path) => `  <url>\n    <loc>${origin}${path}</loc>\n    <lastmod>${today}</lastmod>${withCover.has(path) ? image : ""}\n  </url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
