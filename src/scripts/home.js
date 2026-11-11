/* Home page only: the illustrated hero and the scroll-opened book. */
import "./reader.js";

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
  if (Math.abs(required - current) > 0.5) hero.style.setProperty("--hero-mobile-extension", `${required}px`);
}
const heroLayoutObserver = new ResizeObserver(() => requestAnimationFrame(fitMobileHero));
heroLayoutObserver.observe(hero);
heroLayoutObserver.observe(heroCaption);
fitMobileHero();
