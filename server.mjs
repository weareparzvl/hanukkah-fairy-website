import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
import handler from "./api/subscribe.js";
const root = resolve(process.cwd(), "dist");
const types = {
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
};
createServer(async (req, res) => {
  let path;
  try {
    path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    return res.end();
  }
  if (path === "/api/subscribe") return handler(req, res);
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    return res.end();
  }
  // Same clean URLs as Vercel: /book serves dist/book.html.
  if (path === "/") path = "/index.html";
  else if (!extname(path)) path = `${path}.html`;
  if (!/^\/[a-zA-Z0-9._/-]+$/.test(path) || path.includes("..")) {
    res.writeHead(404);
    return res.end("Not found");
  }
  try {
    const file = resolve(root, `.${path}`);
    if (!(await stat(file)).isFile()) throw new Error("not a file");
    res.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : await readFile(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(Number(process.env.PORT || 8761), "127.0.0.1", () =>
  console.log(
    `Hanukkah Fairy preview: http://127.0.0.1:${process.env.PORT || 8761}`,
  ),
);
