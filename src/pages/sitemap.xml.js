// Lastmod is the build date, so it is accurate on every deploy.
const paths = ["/", "/book", "/tradition", "/eight-nights", "/kit", "/faq"];
export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((path) => `  <url>\n    <loc>https://thehanukkahfairy.com${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
