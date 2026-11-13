# Rebuild, first cut: 2026-11-11

Branch `rebuild/kit-2026-11` (from `redesign/storybook-scroll`). Production is untouched and still serves the old one-page site.
Brief: `reviews/benchmark-20261110/REBUILD-BRIEF.md`. Harley, 2026-11-11: "Rebuild Hanukkahfairy.com using that study to guide us to a signficantly better outcome." and "THere's no risk in rebuilding the site to make it better. Launch won't break."

## Preview

https://hanukkah-fairy-website-7xijnisnv-parzvl.vercel.app (deployment protected; share link expires 2026-11-12 5:01 AM ET; make a new one with the Vercel connector).

## What changed

- Stack: Astro 7.4.10, static output to `dist/`. `api/subscribe.js` runs beside it on Vercel (verified on the preview: signup 200, step two 200, no consent 400).
- Pages: `/`, `/book`, `/tradition`, `/eight-nights`, `/kit`, `/kit/thanks`, `/faq`, `/privacy`, 404. Sitemap lists the six indexable ones with the build date.
- Signup: "The Fairy's 8-Night Kit" replaces Get Fairy Mail. Email only, adult checkbox kept, name, address and phone removed. The PDF downloads on success; no email platform is needed for that. Entry points: nav, hero, tradition section, home kit band, reader last page, footer band, `/kit`, plus one small nudge after 8 seconds and 30% scroll (once per visitor).
- Optional step two after signup: who they read with (kids, grandkids, class, gift).
- CSV: new columns `entry`, `reads_with`; consent version `kit-2026-11`; older four- and seven-column files upgrade without losing rows. 8 tests pass.
- Kit: six letter pages built from approved art only by `npm run kit` (cover, how it works with cut-out Fairy and Pup, eight night cards, eight notes, menorah to color). 1.27 MB. Served with `X-Robots-Tag: noindex`.
- Book facts in page text and JSON-LD from one file (`src/data/book.js`): authors, illustrator, ages 3 to 10, Oct 15 2026, publisher, 72 pages, both ISBNs, per-edition links. Direct links to Amazon hardcover, paperback and Kindle, Apple Books, Barnes & Noble, and the signed bundle on Shopify. The `link.amazon` redirect is gone.
- All eight nights are HTML on `/` and `/eight-nights`. Every FAQ answer is visible on `/faq`.
- Fonts self-hosted, images resized with srcset, square favicon and `/favicon.ico`, 1200px social image.
- GTM: Google's standard head snippet plus the noscript frame, same container GTM-MPV9H7PZ. dataLayer events: `kit_cta_click`, `form_start`, `sign_up` (step 1 and 2), `kit_download`, `kit_nudge_view`, `buy_click`, `shop_click`, `night_select`, `reader_complete`, `scroll_depth`.
- Old anchors still work on the home page: `#products`, `#ritual`, `#cast`, `#gift-shop`, `#nights`, `#authors`, `#story`, `#dibs`, `#buy`. `/privacy.html` and `/index.html` 308 to the clean URLs.

## Evidence (final preview, 2026-11-11 about 1:05 AM ET)

- `scripts/qa-sizes.mjs`: clean at 13 sizes on 7 pages (no horizontal overflow, clipped buttons, buttons under 44px, or hero overlap).
- `scripts/qa-flows.mjs` (local build): 22 of 22 pass at 1440 and 390: modal opens from hero with entry recorded, signup shows the download, step two saves, Escape closes, nights picker, reader reaches the kit page, no page errors, all eight nights present without JavaScript, plain form post lands on `/kit/thanks`.
- Lighthouse mobile: `/` performance 100, LCP 1.8 s, 753 KB; `/book` 100, 1.5 s, 307 KB; `/kit` 100, 1.5 s, 409 KB. Accessibility 100 and best practices 100 on all. Before (brief): performance 75, LCP 5.5 s, 2.4 MB. The SEO score reads 61 on previews only because Vercel sends noindex there.
- All six retailer URLs returned 200.
- Em dash scan of built HTML: none. No text-shadow in built CSS.

## Critic pass

One fresh-context critic judged the build against the brief and the Book Bible. Fixed: kit notes no longer imply the Fairy watches ("A kind thing to try tomorrow"), form verbs no longer promise an email that is not sent, affiliate note beside every Amazon button group, `sponsored` only on Amazon links, consent row and footer links and FAQ rows at 44px, phone headline breaks, tablet hero (the Fairy no longer covers the wordmark, a defect that is also on the live site), shorter titles, privacy page names the LLC and the two local storage flags.

Not changed, with reasons:
- Adult checkbox stays. Harley, 2026-11-11: "leave it in".
- The fixed "A little scroll" cue stays (locked in the manifest, 2026-09-27).
- The liner pattern in the reader stays: Elise supplied it for the site and it is on production today.
- Plush cards marked "In development" stay: Elise asked for the product mockups.
- Approved copy lines on the home page were not rewritten.

## Open

1. Production go from Harley. Nothing is promoted.
2. Owners: email platform (Shopify Email or Klaviyo), GA4 ID, age range across retailers, a contact email for removal requests, ship-by dates, and a look at the kit's new copy (hiding spots, kind things, notes).
3. `www.hanukkahfairy.com` serves a duplicate of the site with a canonical to thehanukkahfairy.com; it should 301. Domain settings change, needs a go.
4. Confirm the Amazon Associates tag `thehanukkahfa-20` (taken from the old redirect) belongs to the owners.
5. Second cut: `/gifts`, `/characters`, `/authors`, `/read-aloud`, `/press`.
6. Three QA rows sit in the preview CSV (`qa-preview-*@example.com`); production CSV untouched.

## Approval preview at /v2 (live 2026-11-11, about 1:45 AM ET)

Harley, 2026-11-11: "push it live to a preview page like hanukkahfairy.com/v2 - make it so it's not searchable until we get Donny and Elise's approval"

- Live at https://thehanukkahfairy.com/v2 and https://www.hanukkahfairy.com/v2. Production deployment: https://vercel.com/parzvl/hanukkah-fairy-website/HcjesdK9KQZ81C9dCpudYhmmcW6F
- Not searchable: every /v2 page has `<meta name="robots" content="noindex, nofollow">` and every /v2 response (pages, PDF, images) carries `X-Robots-Tag: noindex, nofollow`. /v2 is not in the sitemap, and the live site does not link to it. robots.txt is unchanged on purpose: blocking /v2 there would stop crawlers from seeing the noindex.
- The live site at the root is unchanged: `/`, `/js/site.js`, `/css/site.css`, `/privacy`, `/robots.txt` and `/sitemap.xml` hash the same before and after.
- Signups made on /v2 go to `production/v2-preview-signups.csv` through `/api/subscribe-v2`, not to the live list. It holds QA rows (`qa-*@example.com`).
- How it ships: branch `release/v2-preview` (worktree `/Users/parzvl/hanukkah-fairy-website/site-v2-release`) is the live site's branch plus a prebuilt `v2/` folder. To update: here run `npm run build:v2`, replace `v2/` in the worktree with `dist-v2/`, commit, `vercel deploy --scope parzvl --yes`, verify, then promote on Harley's go.
- Verified on the live domain: 22 of 22 flow checks and the 13-size check on 7 pages.
- At launch: deploy `rebuild/kit-2026-11` itself to production (indexable, real signup file) and drop /v2 with a redirect to `/`.

## Phone fixes (live on /v2 2026-11-11, about 2:40 AM ET)

Harley, 2026-11-11: "Mobile glitches a little bit. "A little scroll. A little magic." shouldnt show on mobile"

- The scroll cue (hero and the fixed follower) is hidden at 760px and below. Desktop keeps it. This narrows the 2026-09-27 lock, which kept the cue fixed through the book.
- Load jump on phones fixed: the hero caption and buy buttons moved after scripts loaded (one layout shift, 0.0256). The space is now sized by a small inline script before first paint, and the two fonts are preloaded. Measured after: 0 shifts on `/`, `/book`, `/kit`, `/eight-nights` (iPhone 13 profile, full scroll down and back).
- Reader on phones: its mode is now chosen from the small viewport height and ignores height-only resizes, so it no longer switches layout when the browser toolbar hides. Not reproducible in headless Chrome; needs a look on a real phone.
- Production deployment 8fNJZ7L4XaFiPSEZ7oKEBjpqumWy. Root home page hash unchanged (1ed375edff). On the live /v2: cue hidden on phone at four scroll positions, 13-size check clean, flow checks pass.

## Owners' notes, 2026-11-11 10:35 PM ET (email "Re: Website Notes", message 1a1cdd37a5be84b9)

Donny and Elise sent seven notes after seeing /v2. All addressed on this branch:

1. Gift Shop section now sits above the collection ("dolls in development").
2. "She hides. You seek." uses their attached winged flying Fairy (`src/assets/fairy-wings.png`, from "Fairy 1.png").
3. Angel in sneakers copy now opens "Meet Harold. Pink glasses. Tiny wings."
4. Form is email only (already true on the rebuild; their screenshot was of the current root site, which still asks for name, address and phone).
5. The scroll-opened book around the signup is gone. The page ends on a plain pink section with the kit form. `reader.js` and `reader.css` removed.
6. Mailchimp: new signups are also added to their audience through the endpoint in their embed code (`lib/mailchimp.mjs`, email only). The private CSV stays as the fallback. `HF_MAILCHIMP=off` skips it for local QA. Checked against the endpoint with an invalid and an example.com address (both rejected by Mailchimp as expected); no real address was submitted.
7. Kit: their five coloring pages (Fairy, Pup, Harold, Grizzlebottom, Mazel) are pages 7 to 11. Kit is 11 pages, 1.7 MB. Copy updated on /kit, the home kit band and the FAQ. Privacy page names Mailchimp and the unsubscribe link.

Checks: 9 unit tests pass, 22 of 22 flow checks pass locally, no console errors or overflow at 1440 and 390.

## Launch, 2026-11-11 about 11:05 PM ET

Harley: "Make v2 the mainsite". The rebuild now serves https://thehanukkahfairy.com/ (production deployment 5bX5giEGyjZRDakzWcuZfyTw6azW, promoted from preview hanukkah-fairy-website-n1q12k7fw-parzvl.vercel.app, commit 3c275b5, deployed from the clean worktree `../site-main-release`).
- Indexable (`index, follow`), sitemap and robots.txt served. `/v2` and `/v2/*` redirect (307) to the root paths.
- Signups go to the real list (`production/signups.csv`) and to Mailchimp. The old file is upgraded to the new columns on the first new signup. Backup taken first: `exports/signups-before-launch-20261111.csv` (4 rows).
- Live checks: 13 URLs respond as expected, 15 of 15 flow checks pass (no-submit), no console errors or overflow at 1440 and 390.
- Not observed yet: a real signup on production (CSV upgrade plus Mailchimp add).

## Owners' notes, 2026-11-12 (Gmail message 1a1ce393e7b1dd42)

Commit `144c77e`, not live yet. Preview: https://hanukkah-fairy-website-jox0p8kbt-parzvl.vercel.app (private, target preview).

1. Kit section moved to the bottom and merged with the mailing list signup: one section (`KitBand`, form id `band`, entry `home-kit`) replaces both the mid-page kit band and the "She left you something." closing section. Anchors `#kit`, `#story`, `#dibs` all point to it.
2. "8-Night Kit" is now "8 Night Kit" everywhere, including the kit PDF (rebuilt, 11 pages, 0 overflow) and its previews. "eight-night tradition" is "eight night tradition". The PDF file name and the `/eight-nights` page address keep their hyphens (addresses, not copy).
3. Gift Shop moved up to third, right after the "A new Hanukkah tradition is here." statement.

Home order: hero > brand-statement > gift-shop > ritual-feature > book-feature > product-world > cast-world > eight-nights > authors > kit-band > faq.

Checks (local build): 15 of 15 flow checks (no-submit), 9 of 9 tests, no console errors or overflow at 1440 and 390. Shots in `reviews/rebuild-20261112/shots`.

Update, 2026-11-12 9:15 AM ET: pushed to GitHub branch `dev` (`c1a5e70`, dev URL https://hanukkah-fairy-website-git-dev-parzvl.vercel.app), then promoted preview `jox0p8kbt` to production on Harley's go ("Push to production"), deployment `78tJ96pxwz3fEnPtpSEBRQPGhSMN`. Live checks: all pages, PDF, sitemap and robots 200, `/v2` 307, 15 of 15 flow checks (no-submit). Owners emailed in the "Website Notes" thread (Gmail message 1a1d01d41e0e39c8).

## SEO pass, 2026-11-13 (owners' email, Gmail message 1a1d57c594d50b45)

Goal: help Google tie "Hanukkah Fairy" searches to the real book and its official cover. No visual change (screenshots differ from 2026-11-12 by under 0.6% of pixels, all inside the cover image).

Audit of the live site before the change:
- Already right: Book, WebSite and Organization JSON-LD; two print ISBNs; canonical tags; `index, follow, max-image-preview:large`; robots.txt allows everything but `/api/`; sitemap; cover present as a real `<img>` on `/` and `/book`.
- Gaps: the cover reached Google under three different addresses (page image `/_astro/cover.<hash>.webp`, JSON-LD `/assets/cover.webp`, social `/og-cover.jpg`), none descriptive and none shared; Book data had no audience, no image object, no linked author or illustrator entities, and sat on `/` and `/book` only; sitemap listed no images; `www.hanukkahfairy.com` served a full copy of the site (200) instead of redirecting.

Changes:
- One official cover address, `/images/the-hanukkah-fairy-book-cover.jpg` (2000 x 2000, exported from the original `assets/covers/Cover Front.jpg`), used by the page `<img>` on `/` and `/book` (`src/components/Cover.astro`), JSON-LD, Open Graph, X card and the sitemap. Old addresses still resolve.
- `src/data/schema.js`: ImageObject for the cover, Person entities for Elise Dykowsky, Donny Dykowsky and Tincho Schmidt (Goodreads profiles as `sameAs`, each returned 200 on 2026-11-13), PeopleAudience ages 3 to 10, per-edition image and Amazon ASIN, every page marked `about` the book. The whole book entity now ships on every page.
- Head: home title "The Hanukkah Fairy | Picture Book by Elise and Donny Dykowsky", home description names authors and illustrator, book title "The Hanukkah Fairy Book | Editions, ISBNs and Where to Buy", `og:image:type`, `twitter:image:alt`, `book:tag`, `meta author`.
- Sitemap: image entries for `/` and `/book`.
- `vercel.json`: `www.hanukkahfairy.com` and `hanukkahfairy.com` 301/308 to `thehanukkahfairy.com`; cache header for `/images/`.

Left out on purpose (not verified, so not invented): ISBNs for the Kindle and Apple Books editions, prices, copyright holder, founders.

Validation: validator.schema.org on the built `/`, `/book` and `/faq` HTML: 0 errors, 0 warnings. 15 of 15 flow checks (no-submit), 9 of 9 tests, no console errors or overflow at 1440 and 390. Google Rich Results Test needs the live URL; run after the deploy.
