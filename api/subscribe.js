import { normalizeEmail, saveSignup } from "../lib/signups.mjs";

// Best-effort per-instance abuse throttle; private storage and validation are enforced separately.
const attempts = new Map();
function rateLimited(key) {
  const now = Date.now();
  if (attempts.size > 2000)
    for (const [id, value] of attempts)
      if (value.until < now) attempts.delete(id);
  const current = attempts.get(key);
  if (!current || current.until < now) {
    attempts.set(key, { count: 1, until: now + 60000 });
    return false;
  }
  return ++current.count > 8;
}
function reply(res, code, payload, html = false) {
  res.statusCode = code;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (html) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>The Hanukkah Fairy · Signup</title><link rel="stylesheet" href="/css/site.css"><main class="wrap privacy-page"><p class="eyebrow">The Hanukkah Fairy</p><h1>${payload.ok ? "You’re on the list." : "Let’s try that again."}</h1><p>${payload.ok ? "A little magic is headed your way. Thanks for joining us." : "We couldn’t save your signup. Please return to the form and try again."}</p><a class="button" href="/#dibs">Back to The Hanukkah Fairy</a></main></html>`,
    );
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(payload));
  }
}
export default async function handler(req, res) {
  const html = (req.headers["content-type"] || "").includes(
    "application/x-www-form-urlencoded",
  );
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { ok: false });
  }
  const origin = req.headers.origin;
  if (req.headers["sec-fetch-site"] === "cross-site")
    return reply(res, 403, { ok: false }, html);
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host)
        return reply(res, 403, { ok: false }, html);
    } catch {
      return reply(res, 403, { ok: false }, html);
    }
  }
  const ip = String(
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
  ).split(",")[0];
  if (rateLimited(ip)) {
    res.setHeader("Retry-After", "60");
    return reply(res, 429, { ok: false }, html);
  }
  if (Number(req.headers["content-length"]) > 2048)
    return reply(res, 413, { ok: false }, html);
  let data;
  try {
    if (typeof req.body === "object" && req.body !== null) data = req.body;
    else {
      let raw = typeof req.body === "string" ? req.body : "";
      if (!raw)
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 2048)
            return reply(res, 413, { ok: false }, html);
        }
      if (Buffer.byteLength(raw) > 2048)
        return reply(res, 413, { ok: false }, html);
      data = html
        ? Object.fromEntries(new URLSearchParams(raw))
        : JSON.parse(raw);
    }
    if (!data || Array.isArray(data) || typeof data !== "object")
      return reply(res, 400, { ok: false }, html);
  } catch {
    return reply(res, 400, { ok: false }, html);
  }
  if (data.website) return reply(res, 400, { ok: false }, html);
  const email = normalizeEmail(data.email || data.EMAIL);
  if (!email || (data.consent !== true && data.consent !== "on"))
    return reply(res, 400, { ok: false }, html);
  try {
    await saveSignup(email);
    return reply(res, 200, { ok: true }, html);
  } catch (error) {
    // Never log submitted email addresses or credentials.
    console.error("Signup storage error:", error.name);
    return reply(res, 503, { ok: false }, html);
  }
}
