import { normalizeSignup, saveSignup } from "../lib/signups.mjs";

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
  res.statusCode = html ? 303 : code;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (html) {
    // Ordinary form posts (no JavaScript) land on a real page either way.
    res.setHeader("Location", payload.ok ? "/kit/thanks" : "/kit?retry=1");
    res.end();
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
  if (Number(req.headers["content-length"]) > 4096)
    return reply(res, 413, { ok: false }, html);
  let data;
  try {
    if (typeof req.body === "object" && req.body !== null) data = req.body;
    else {
      let raw = typeof req.body === "string" ? req.body : "";
      if (!raw)
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 4096)
            return reply(res, 413, { ok: false }, html);
        }
      if (Buffer.byteLength(raw) > 4096)
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
  const record = normalizeSignup({
    email: data.email || data.EMAIL,
    name: data.name,
    address: data.address,
    phone: data.phone,
    entry: data.entry,
    readsWith: data.readsWith,
  });
  // The second step only adds who they read with to a row that already has consent.
  const followUp = data.step === 2 || data.step === "2";
  if (
    !record ||
    (followUp
      ? !record.readsWith
      : data.consent !== true && data.consent !== "on")
  )
    return reply(res, 400, { ok: false }, html);
  if (followUp) record.followUp = true;
  try {
    await saveSignup(record);
    return reply(res, 200, { ok: true }, html);
  } catch (error) {
    // Never log submitted email addresses or credentials.
    console.error("Signup storage error:", error.name);
    return reply(res, 503, { ok: false }, html);
  }
}
