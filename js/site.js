/* The Hanukkah Fairy. Native scroll, progressive enhancement, no animation library. */
(() => {
  "use strict";
  const config = window.HF_CONFIG || {};
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const body = document.body;
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

  // Keep Pup on the painted roof. Grow the space below the illustration only
  // as much as the actual caption needs, including after fonts or text resize.
  const hero = document.querySelector(".hero");
  const heroCaption = hero.querySelector(".hero-caption");
  const heroPup = hero.querySelector(".hero-scene .hero-pup");
  function fitMobileHero() {
    if (!matchMedia("(max-width: 760px)").matches) {
      hero.style.removeProperty("--hero-mobile-extension");
      return;
    }
    const current = parseFloat(getComputedStyle(hero).getPropertyValue("--hero-mobile-extension")) || 0;
    const captionTopWithoutExtension = heroCaption.getBoundingClientRect().top - current;
    const required = Math.ceil(Math.max(0, heroPup.getBoundingClientRect().bottom + 16 - captionTopWithoutExtension));
    if (Math.abs(required - current) > 0.5) {
      hero.style.setProperty("--hero-mobile-extension", `${required}px`);
    }
  }
  const heroLayoutObserver = new ResizeObserver(() => requestAnimationFrame(fitMobileHero));
  heroLayoutObserver.observe(hero);
  heroLayoutObserver.observe(heroCaption);
  fitMobileHero();

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-waiting");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  function setMotion() {
    body.classList.toggle("motion-on", !reducedMotion.matches);
    reveals.forEach((el) => {
      el.classList.toggle(
        "is-waiting",
        !reducedMotion.matches && el.getBoundingClientRect().top > innerHeight,
      );
      observer.observe(el);
    });
  }
  reducedMotion.addEventListener("change", setMotion);
  setMotion();

  const nights = [
    [
      "one / Start a story",
      "Scoot a little closer.",
      "Find your favorite cozy spot and read together. Ask your little one: “What does Hanukkah mean to you?”",
    ],
    [
      "two / Hide & seek",
      "Where would a fairy hide?",
      "Pick a hiding place for a little handwritten fairy note. Let the kids hunt for it, then take turns dreaming up tomorrow’s spot.",
    ],
    [
      "three / A small kindness",
      "Make someone’s day.",
      "Draw a picture for a neighbor, help set the table, or call someone you miss. Let your little reader choose the kind thing.",
    ],
    [
      "four / A little nosh",
      "Save room for something sweet.",
      "Share a jelly donut and a favorite moment from the story. What snack would you leave for a hungry fairy?",
    ],
    [
      "five / Be a good neighbor",
      "Spread the joy.",
      "Invite someone to join you for a treat, a game, or a candle lighting.",
    ],
    [
      "six / Find your courage",
      "Let the good times troll.",
      "Tell a joke, make a funny face, or do your best Grizzlebottom impression. First one to laugh loses. (Actually, everybody wins.)",
    ],
    [
      "seven / Turn up the joy",
      "Have a living-room dance party.",
      "Pick a favorite song, make a little space, and dance together.",
    ],
    [
      "eight / Keep the light",
      "Make it a memory.",
      "Ask everyone to share their favorite moment from the eight nights. Choose one little act of kindness to keep doing all year.",
    ],
  ];
  const candleButtons = [...document.querySelectorAll("[data-night]")];
  candleButtons.forEach((button, index) =>
    button.addEventListener("click", () => {
      candleButtons.forEach((item, i) => {
        item.setAttribute("aria-pressed", String(i === index));
        item.classList.toggle("is-lit", i <= index);
      });
      document.querySelector("#night-label").textContent =
        `Night ${nights[index][0]}`;
      document.querySelector("#night-title").textContent = nights[index][1];
      document.querySelector("#night-description").textContent =
        nights[index][2];
    }),
  );

  const form = document.querySelector("[data-capture]");
  const input = form.querySelector('input[type="email"]');
  const submit = form.querySelector("button");
  const status = form.querySelector(".capture-status");
  const setStatus = (message, kind = "") => {
    status.textContent = message;
    status.className = `capture-status ${kind}`;
  };
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    setStatus("");
  });
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
    setStatus("Saving your spot…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(config.signupEndpoint || "/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          email,
          name: form.elements.name.value,
          address: form.elements.address.value,
          phone: form.elements.phone.value,
          website: form.elements.website.value,
          consent: form.elements.consent.checked,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(
          response.status === 429
            ? "Please wait a little before trying again."
            : "We couldn’t save your signup. Please try again in a moment.",
        );
      form.reset();
      setStatus("You’re in! Watch your inbox for Fairy Mail.", "success");
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
      clearTimeout(timeout);
      submit.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
