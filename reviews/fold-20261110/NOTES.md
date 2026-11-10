# Fold strip fix, 2026-11-10

Harley, 11:38 AM ET: "The fold includes a yellow strip from the next card. It needs to be fixed"

Cause: `.hero` height was `calc(100svh - var(--nav) - 16px)`, so 16px of the yellow brand statement always showed under the hero above 760px wide, and on tall phones (430x932) where the Pup extension computes to 0.

Fix (commit 84f677f, css/site.css lines 241, 1102, 1662): drop the `- 16px`. Phone keeps `+ var(--hero-mobile-extension)` so Pup's rooftop spacing logic is untouched.

Evidence (screenshots gitignored):
- live-before/ and fixed/: first screen at 13 sizes, fold.json each. Strip 16px at 11 of 13 live; 0px at all 13 fixed.
- sheet-desktop.png, sheet-phone.png, sheet-tablet.png: before/after pairs.
- qa/: 13-viewport regression, no overflow, broken images or console errors.
- preview/ + diff-preview/: preview nn0f2rosv matches the local build pixel for pixel.

Side effect: on tall phones the white "A little scroll" pill now appears after the first few pixels of scroll instead of on load, matching 390px phones.

Promote (Harley runs it; auto mode blocks it for Claude):
vercel promote https://hanukkah-fairy-website-nn0f2rosv-parzvl.vercel.app --scope parzvl --yes
- 2026-11-10 about 5:00 PM ET: promoted with Harley's GTM go (lm38w8fpv, production 31kXNA42M31mcnjaA2twhi4tR2sp). Live: 0px strip at 13 sizes.
