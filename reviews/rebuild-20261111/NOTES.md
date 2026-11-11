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
- Adult checkbox stays until counsel reviews the wording (Harley's default).
- The fixed "A little scroll" cue stays (locked in the manifest, 2026-09-27).
- The liner pattern in the reader stays: Elise supplied it for the site and it is on production today.
- Plush cards marked "In development" stay: Elise asked for the product mockups.
- Approved copy lines on the home page were not rewritten.

## Open

1. Production go from Harley. Nothing is promoted.
2. Owners: email platform (Shopify Email or Klaviyo), GA4 ID, age range across retailers, counsel review of consent, a contact email for removal requests, ship-by dates, and a look at the kit's new copy (hiding spots, kind things, notes).
3. `www.hanukkahfairy.com` serves a duplicate of the site with a canonical to thehanukkahfairy.com; it should 301. Domain settings change, needs a go.
4. Confirm the Amazon Associates tag `thehanukkahfa-20` (taken from the old redirect) belongs to the owners.
5. Second cut: `/gifts`, `/characters`, `/authors`, `/read-aloud`, `/press`.
6. Three QA rows sit in the preview CSV (`qa-preview-*@example.com`); production CSV untouched.
