/* Scroll-linked book with complete, uncropped pages and direct page navigation. */
(() => {
  const reader = document.querySelector(".reader");
  const stage = reader.querySelector(".reader-stage");
  const pages = [...reader.querySelectorAll("[data-reader-page]")];
  const cover = pages[0];
  const controls = reader.querySelector(".reader-controls");
  const prev = reader.querySelector("[data-reader-prev]");
  const next = reader.querySelector("[data-reader-next]");
  const caption = reader.querySelector("[data-reader-caption]");
  const dots = [...reader.querySelectorAll("[data-reader-go]")];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 760px)");
  const labels = [
    "Front cover",
    "The story",
    "A little kindness",
    "Stay in the loop",
  ];
  const stops = [0, 0.36, 0.64, 0.94];
  const signupAnchor = document.createElement("span");
  signupAnchor.className = "reader-signup-anchor";
  signupAnchor.setAttribute("aria-hidden", "true");
  reader.append(signupAnchor);
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const ease = (x) => x * x * (3 - 2 * x);
  const back = pages[1].querySelector(".reader-art-page").cloneNode(true);
  back.classList.add("reader-cover-inside");
  back.setAttribute("aria-hidden", "true");
  cover.append(back);
  let enhanced = false;
  let active = -1;
  let frame = 0;
  let frozen = false;
  function setActive(index) {
    if (active === index) return;
    active = index;
    reader.dataset.page = index;
    pages.forEach((page, i) => {
      page.inert = enhanced && i !== index;
      page.toggleAttribute("aria-hidden", enhanced && i !== index);
      if (enhanced && i !== index) page.setAttribute("aria-hidden", "true");
      page.classList.toggle("is-current", i === index);
    });
    caption.textContent = labels[index];
    prev.disabled = index === 0;
    next.disabled = index === 3;
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
  }
  function draw() {
    frame = 0;
    if (!enhanced || frozen) return;
    const nav = parseFloat(getComputedStyle(stage).top) || 0;
    const travel = reader.offsetHeight - stage.offsetHeight;
    const p = clamp((nav - reader.getBoundingClientRect().top) / travel);
    const open = ease(clamp((p - 0.1) / 0.18));
    const second = ease(clamp((p - 0.46) / 0.12));
    const third = ease(clamp((p - 0.74) / 0.12));
    const weights = [
      1 - open,
      open * (1 - second),
      second * (1 - third),
      third,
    ];
    setActive(p < 0.2 ? 0 : p < 0.52 ? 1 : p < 0.8 ? 2 : 3);
    cover.style.visibility = open < 1 ? "visible" : "hidden";
    cover.style.transform = mobile.matches
      ? `rotateY(${-90 * open}deg)`
      : `translateX(${50 * open}%) rotateY(${-180 * open}deg)`;
    cover.style.opacity = mobile.matches ? 1 - open : 1;
    pages.slice(1).forEach((page, i) => {
      const weight = weights[i + 1];
      page.style.visibility = weight > 0 ? "visible" : "hidden";
      page.style.opacity = weight;
      // The final form is flat and still while typing. Only complete story surfaces move.
      const offset =
        i === 0 ? -second * 14 : i === 1 ? (1 - second) * 14 - third * 14 : 0;
      page.style.transform = `translateX(${offset}px)`;
    });
    // The inside of the turning cover becomes the left page; never slice its artwork.
    pages[1].querySelector(".reader-art-page").style.opacity = mobile.matches
      ? open
      : open >= 1
        ? 1
        : 0;
  }
  function queueDraw() {
    if (!frame) frame = requestAnimationFrame(draw);
  }
  function updateMode() {
    if (
      reader.contains(document.activeElement) &&
      document.activeElement.matches("input")
    )
      return;
    const minimumHeight = innerWidth < 351 ? 840 : mobile.matches ? 760 : 760;
    enhanced =
      !reduce.matches &&
      innerHeight >= minimumHeight &&
      (mobile.matches || innerWidth >= 1040);
    reader.classList.toggle("is-enhanced", enhanced);
    controls.hidden = !enhanced;
    // Native fragment navigation must target the final scroll position, not the
    // absolutely positioned form at the beginning of the sticky stage.
    pages[3].id = enhanced ? "" : "dibs";
    signupAnchor.id = enhanced ? "dibs" : "";
    signupAnchor.style.top = `${(reader.offsetHeight - stage.offsetHeight) * stops[3]}px`;
    active = -1;
    if (!enhanced) {
      pages.forEach((page) => {
        page.inert = false;
        page.removeAttribute("aria-hidden");
        page.style.cssText = "";
      });
      pages[1].querySelector(".reader-art-page").style.opacity = "";
    } else draw();
  }
  function go(index, focusForm = false) {
    if (!enhanced) {
      pages[index].scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      const top =
        scrollY +
        reader.getBoundingClientRect().top -
        parseFloat(getComputedStyle(stage).top);
      window.scrollTo({
        top: top + (reader.offsetHeight - stage.offsetHeight) * stops[index],
        behavior: "instant",
      });
      draw();
    }
    if (focusForm)
      reader.querySelector("#email").focus({ preventScroll: true });
  }
  prev.addEventListener("click", () => go(Math.max(0, active - 1)));
  next.addEventListener("click", () => go(Math.min(3, active + 1)));
  dots.forEach((dot) =>
    dot.addEventListener("click", () => go(Number(dot.dataset.readerGo))),
  );
  document.querySelectorAll('a[href="#dibs"]').forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      frozen = false;
      go(3, true);
      history.replaceState(null, "", "#dibs");
    }),
  );
  // Touch keyboards can resize the viewport and shift scroll. Keep the signup page stable.
  reader.addEventListener("focusin", (event) => {
    if (event.target.closest("form")) {
      go(3);
      frozen = true;
    }
  });
  reader.addEventListener("focusout", () =>
    setTimeout(() => {
      if (!reader.querySelector("form").contains(document.activeElement)) {
        const previousMode = enhanced;
        frozen = false;
        updateMode();
        if (previousMode !== enhanced) go(3);
      }
    }, 0),
  );
  addEventListener("scroll", queueDraw, { passive: true });
  addEventListener("resize", updateMode, { passive: true });
  reduce.addEventListener("change", updateMode);
  const announcement = document.querySelector(".announcement");
  new ResizeObserver(() =>
    document.documentElement.style.setProperty(
      "--announcement-h",
      `${announcement.offsetHeight}px`,
    ),
  ).observe(announcement);
  updateMode();
  function followSignupHash() {
    if (location.hash !== "#dibs") return;
    frozen = false;
    // Wait for fonts and the browser's own fragment jump before choosing the page.
    document.fonts.ready.then(() => requestAnimationFrame(() => go(3)));
  }
  addEventListener("pageshow", followSignupHash);
  addEventListener("hashchange", followSignupHash);
  if (document.readyState === "complete") followSignupHash();
})();
