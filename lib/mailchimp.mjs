// Adds a new signup to Elise and Donny's Mailchimp audience through the same
// endpoint their embedded form posts to (embed code supplied 2026-11-11).
// Email only. Best effort: the private CSV stays the record if Mailchimp is down.
const FORM = {
  host: "https://kitchenblockparty.us11.list-manage.com",
  u: "29369f3f907c98ca093dc4921",
  id: "5b1a110c2d",
  f_id: "004811e1f0",
};

export function mailchimpUrl(email) {
  const params = new URLSearchParams({ u: FORM.u, id: FORM.id, f_id: FORM.f_id, EMAIL: email });
  // Mailchimp's own bot trap: must be present and empty.
  params.set(`b_${FORM.u}_${FORM.id}`, "");
  // Without a callback name Mailchimp answers with an HTML page instead of JSON.
  params.set("c", "cb");
  return `${FORM.host}/subscribe/post-json?${params}`;
}

export async function addToMailchimp(email, { fetchImpl = fetch, timeout = 4000 } = {}) {
  if (process.env.HF_MAILCHIMP === "off") return { ok: false, skipped: true };
  try {
    const response = await fetchImpl(mailchimpUrl(email), { signal: AbortSignal.timeout(timeout) });
    const text = await response.text();
    const data = JSON.parse(text.replace(/^[^(]*\(|\)\s*;?\s*$/g, "") || text);
    // "already subscribed" comes back as an error; that is fine.
    return { ok: data.result === "success", already: /already subscribed/i.test(data.msg || "") };
  } catch (error) {
    return { ok: false, error: error.name };
  }
}
