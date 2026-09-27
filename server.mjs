import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
import handler from "./api/subscribe.js";
const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
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
  if (path === "/privacy") path = "/privacy.html";
  if (path === "/") path = "/index.html";
  // Only website assets are served; source, environment files, CSVs and scripts stay private.
  if (
    !/^\/(?:index\.html|privacy\.html|(?:css|js|assets)\/[a-zA-Z0-9._/-]+)$/.test(
      path,
    ) ||
    path.includes("..")
  ) {
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
