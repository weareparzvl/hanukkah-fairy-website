/* The Hanukkah Fairy. Native browser features, progressive enhancement, no libraries. */
const body = document.body;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const track = (event, detail = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...detail });
};
const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  },
};

/* Menu */
const menu = document.querySelector("#mobile-menu");
const menuToggle = document.querySelector(".menu-toggle");
function setMenu(open, returnFocus = false) {
  menu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  body.classList.toggle("menu-open", open);
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => setMenu(menu.hidden));
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (menu.hidden) return;
  if (event.key === "Escape") setMenu(false, true);
  if (event.key === "Tab") {
    const links = [...menu.querySelectorAll("a")];
    if (event.shiftKey && document.activeElement === menuToggle) {
      event.preventDefault();
      links.at(-1).focus();
    }
    if (!event.shiftKey && document.activeElement === links.at(-1)) {
      event.preventDefault();
      menuToggle.focus();
    }
  }
});
matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

/* Eight nights: every night is in the page; the candles choose one. */
document.querySelectorAll("[data-nights]").forEach((card) => {
  const buttons = [...card.querySelectorAll("[data-night]")];
  const panels = [...card.querySelectorAll("[data-night-panel]")];
  card.classList.add("is-enhanced");
  buttons.forEach((button, index) =>
    button.addEventListener("click", () => {
      buttons.forEach((item, i) => {
        item.setAttribute("aria-pressed", String(i === index));
        item.classList.toggle("is-lit", i <= index);
      });
      panels.forEach((panel, i) => panel.classList.toggle("is-active", i === index));
      track("night_select", { night: index + 1 });
    }),
  );
});

/* Kit modal */
const modal = document.querySelector("#kit-modal");
const nudge = document.querySelector("#kit-nudge");
let entry = "modal";
function closeNudge(remember = true) {
  if (!nudge || nudge.hidden) return;
  nudge.hidden = true;
  body.classList.remove("nudge-open");
  if (remember) store.set("hf-nudge", "dismissed");
}
document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-kit-open]");
  if (opener && modal?.showModal) {
    event.preventDefault();
    entry = opener.dataset.entry || "modal";
    track("kit_cta_click", { location: entry });
    setMenu(false);
    closeNudge(false);
    modal.querySelector('input[name="entry"]').value = entry;
    modal.showModal();
    const email = modal.querySelector('input[type="email"]');
    if (!email.closest("form").hidden) email.focus();
    return;
  }
  if (event.target.closest("[data-kit-close]") || event.target === modal) modal.close();
  if (event.target.closest("[data-nudge-close]")) closeNudge();
  const download = event.target.closest("[data-kit-download]");
  if (download) track("kit_download", { location: download.closest("[data-kit-capture]") ? "form" : "page" });
  const tracked = event.target.closest("[data-track]");
  if (tracked)
    track(tracked.dataset.track, {
      location: tracked.dataset.location || "",
      retailer: tracked.dataset.retailer || "",
      edition: tracked.dataset.edition || "",
    });
  if (event.target.closest("[data-print]")) window.print();
});

/* Kit forms */
const endpoint = "/api/subscribe";
async function post(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok && data.ok, status: response.status };
  } finally {
    clearTimeout(timeout);
  }
}
document.querySelectorAll("[data-kit-capture]").forEach((capture) => {
  const form = capture.querySelector("[data-kit-form]");
  const done = capture.querySelector("[data-kit-done]");
  const input = form.querySelector('input[type="email"]');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".capture-status");
  let savedEmail = "";
  const setStatus = (message, kind = "") => {
    status.textContent = message;
    status.className = `capture-status ${kind}`;
  };
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    setStatus("");
  });
  input.addEventListener("focus", () => track("form_start", { location: form.elements.entry.value }), { once: true });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.setAttribute("aria-invalid", "true");
      setStatus("Please enter a valid email address.", "error");
      input.focus();
      return;
    }
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    setStatus("Fetching your kit…");
    try {
      const result = await post({
        email,
        entry: form.elements.entry.value,
        website: form.elements.website.value,
        consent: form.elements.consent.checked,
      });
      if (!result.ok)
        throw new Error(
          result.status === 429
            ? "Please wait a little before trying again."
            : "We couldn’t save your signup. Please try again in a moment.",
        );
      savedEmail = email;
      store.set("hf-kit", "1");
      track("sign_up", { step: 1, location: form.elements.entry.value });
      form.reset();
      form.hidden = true;
      done.hidden = false;
      done.focus({ preventScroll: true });
    } catch (error) {
      setStatus(
        error.name === "AbortError"
          ? "That took a little too long. Please try again."
          : error.message.includes("Please")
            ? error.message
            : "We couldn’t save your signup. Please try again in a moment.",
        "error",
      );
    } finally {
      submit.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
  const step = capture.querySelector("[data-kit-step]");
  step.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-reads-with]");
    if (!choice) return;
    track("sign_up", { step: 2, reads_with: choice.dataset.readsWith });
    // Best effort: the kit is already theirs whether or not this saves.
    post({ email: savedEmail, step: 2, readsWith: choice.dataset.readsWith }).catch(() => {});
    step.hidden = true;
    capture.querySelector("[data-kit-step-thanks]").hidden = false;
  });
});

/* A failed no-JavaScript post comes back to /kit?retry=1 */
if (new URLSearchParams(location.search).has("retry"))
  document.querySelectorAll("[data-kit-retry]").forEach((note) => (note.hidden = false));

/* Nudge: once per visitor, only after real engagement, never over the form or the kit pages. */
if (nudge && !store.get("hf-kit") && !store.get("hf-nudge") && !location.pathname.startsWith("/kit")) {
  let waited = false;
  let scrolled = false;
  const show = () => {
    if (!waited || !scrolled || modal.open || !nudge.hidden) return;
    if (document.activeElement?.matches("input")) return;
    nudge.hidden = false;
    body.classList.add("nudge-open");
    track("kit_nudge_view");
    removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    scrolled = scrollY > (document.documentElement.scrollHeight - innerHeight) * 0.3;
    show();
  };
  setTimeout(() => { waited = true; show(); }, 8000);
  addEventListener("scroll", onScroll, { passive: true });
}

/* Scroll depth, for the baseline the site has never had */
const marks = [25, 50, 75, 100];
addEventListener(
  "scroll",
  () => {
    const depth = ((scrollY + innerHeight) / document.documentElement.scrollHeight) * 100;
    while (marks.length && depth >= marks[0]) track("scroll_depth", { percent: marks.shift() });
  },
  { passive: true },
);
void reducedMotion;
