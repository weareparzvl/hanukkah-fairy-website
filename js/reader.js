/* Scroll-linked book with complete, uncropped pages and a fixed spine. */
(() => {
  const reader = document.querySelector(".reader");
  const stage = reader.querySelector(".reader-stage");
  const pages = [...reader.querySelectorAll("[data-reader-page]")];
  const cover = pages[0];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 760px)");
  const stops = [0, 0.94];
  const last = pages.length - 1;
  const signupAnchor = document.createElement("span");
  signupAnchor.className = "reader-signup-anchor";
  signupAnchor.setAttribute("aria-hidden", "true");
  reader.append(signupAnchor);
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const ease = (x) => x * x * (3 - 2 * x);
  const firstSpreadLeft = pages[1].querySelector(".reader-page");
  const back = firstSpreadLeft.cloneNode(true);
  back.classList.add("reader-cover-inside");
  back.setAttribute("aria-hidden", "true");
  cover.append(back);
  const hero = document.querySelector(".hero");
  const flyingFairy = hero.querySelector(".hero-fairy");
  const cue = document.querySelector(".scroll-cue");
  const followingCue = document.createElement("div");
  followingCue.className = "scroll-cue scroll-cue-follow";
  followingCue.innerHTML = cue.innerHTML;
  followingCue.setAttribute("aria-hidden", "true");
  document.body.append(followingCue);
  function drawCue() {
    const heroBounds = hero.getBoundingClientRect();
    if (heroBounds.bottom > 0) {
      const flight = reduce.matches
        ? 0
        : clamp(-heroBounds.top / heroBounds.height);
      flyingFairy.style.transform = `translate3d(${flight * 28}px, ${flight * -65}px, 0)`;
    }
    const position = cue.getBoundingClientRect();
    const pinned = position.bottom <= innerHeight - 35 + 1;
    const remaining = reader.getBoundingClientRect().bottom - innerHeight;
    const opacity = reduce.matches
      ? Number(remaining >= 0)
      : clamp(1 + remaining / 180);
    followingCue.style.left = `${position.left}px`;
    followingCue.style.opacity = pinned ? opacity : 0;
    cue.style.visibility = pinned ? "hidden" : "";
  }
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
  }
  function draw() {
    frame = 0;
    drawCue();
    if (!enhanced || frozen) return;
    const nav = parseFloat(getComputedStyle(stage).top) || 0;
    const travel = reader.offsetHeight - stage.offsetHeight;
    const p = clamp((nav - reader.getBoundingClientRect().top) / travel);
    const open = ease(clamp((p - 0.1) / 0.45));
    const weights = [1 - open, open];
    setActive(p < 0.35 ? 0 : 1);
    cover.style.visibility = open < 1 ? "visible" : "hidden";
    cover.style.transform = mobile.matches
      ? `rotateY(${-90 * open}deg)`
      : `rotateY(${-180 * open}deg)`;
    cover.style.opacity = mobile.matches ? 1 - open : 1;
    pages.slice(1).forEach((page, i) => {
      const weight = weights[i + 1];
      page.style.visibility = weight > 0 ? "visible" : "hidden";
      page.style.opacity = weight;
    });
    // The inside of the turning cover becomes the left page; never slice its artwork.
    firstSpreadLeft.style.opacity = mobile.matches
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

    // Native fragment navigation must target the final scroll position, not the
    // absolutely positioned form at the beginning of the sticky stage.
    pages[last].id = enhanced ? "" : "dibs";
    signupAnchor.id = enhanced ? "dibs" : "";
    signupAnchor.style.top = `${(reader.offsetHeight - stage.offsetHeight) * stops[last]}px`;
    active = -1;
    if (!enhanced) {
      pages.forEach((page) => {
        page.inert = false;
        page.removeAttribute("aria-hidden");
        page.style.cssText = "";
      });
      firstSpreadLeft.style.opacity = "";
    }
    draw();
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
  document.querySelectorAll('a[href="#dibs"]').forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      frozen = false;
      go(last, true);
      history.replaceState(null, "", "#dibs");
    }),
  );
  // Touch keyboards can resize the viewport and shift scroll. Keep the signup page stable.
  reader.addEventListener("focusin", (event) => {
    if (event.target.closest("form")) {
      go(last);
      frozen = true;
    }
  });
  reader.addEventListener("focusout", () =>
    setTimeout(() => {
      if (!reader.querySelector("form").contains(document.activeElement)) {
        const previousMode = enhanced;
        frozen = false;
        updateMode();
        if (previousMode !== enhanced) go(last);
      }
    }, 0),
  );
  addEventListener("scroll", queueDraw, { passive: true });
  addEventListener("resize", updateMode, { passive: true });
  reduce.addEventListener("change", updateMode);
  updateMode();
  document.fonts.ready.then(queueDraw);
  function followSignupHash() {
    if (location.hash !== "#dibs") return;
    frozen = false;
    // Wait for fonts and the browser's own fragment jump before choosing the page.
    document.fonts.ready.then(() => requestAnimationFrame(() => go(last)));
  }
  addEventListener("pageshow", followSignupHash);
  addEventListener("hashchange", followSignupHash);
  if (document.readyState === "complete") followSignupHash();
})();
