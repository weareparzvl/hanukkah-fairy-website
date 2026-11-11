# The Hanukkah Fairy: rebuild brief

Written 2026-11-10 for the agent rebuilding thehanukkahfairy.com. Read this file first, then the three research files beside it for detail and sources:
- `SITES.md`: 12 benchmark sites, verbatim copy, comparison table, screenshots in `shots/` (gitignored).
- `BEHAVIOR.md`: signup and engagement evidence with numbers and sources.
- `SEO.md`: technical, search and AI search audit of the live site with file and line evidence.

Labels: [V] verified by fetching or observing it on 2026-11-10. [I] inference. Anything unlabeled is a requirement.

## 1. The job

The site has one job: turn a cold visitor (a parent or grandparent who has never heard of the book) into a subscriber or a buyer, and make the book's ritual ("She hides. You seek. Be kind. Get a treat.") the reason to come back for all eight nights.

Order of goals:
1. Email signups (the asset the owners keep; most gift buying follows within days of subscribing per Klaviyo, see BEHAVIOR.md).
2. Book purchases (Amazon hardcover, paperback and Kindle, Apple Books, Barnes & Noble, Shopify signed bundle).
3. Merch purchases on Shopify.
4. Being found and cited: Google, Bing, and AI answer engines for Hanukkah book and Hanukkah activity queries.

## 2. Where it stands today [V]

- One long page plus /privacy. Every topic is a #fragment, so the sitemap has one URL.
- One signup form, on the last page of the scroll storybook. A header button ("Get Fairy Mail") jumps to it. The form asks for email plus optional name, mailing address and phone, and needs a consent checkbox whose copy says "launch emails" (the book launched Oct 15). The offer is "Book news, character mischief, and the first word on our plush pals."
- Signups are saved to a private CSV in the Vercel Blob store `hanukkah-fairy-signups` (`production/signups.csv`). No email platform is connected; subscribers receive nothing.
- No reviews, ratings or social proof anywhere. No lead magnet. No content pages.
- 784 words of HTML text. Nights 2 to 8 of the activity ideas exist only in JavaScript (`js/site.js:85-127`), invisible to AI crawlers that do not run JS.
- No ISBNs, formats, page count, publish date or publisher on the page or in JSON-LD.
- Age range conflict: the site says 3 to 10, Amazon says 3 to 8. Apple Books lists only Elise as author.
- The Amazon button goes through `link.amazon/B05ClKju5` to the paperback page with `utm_source=chatgpt.com` in the URL. Hardcover, Kindle and Barnes & Noble are never linked, though the FAQ promises Barnes & Noble (`index.html:754`).
- A search for the book's own name returned no thehanukkahfairy.com result (SEO.md; Google not checked directly). 0 of 12 current Hanukkah book lists mention it. Goodreads has 0 ratings; no Wikidata item; no Amazon author pages.
- Mobile Lighthouse performance 75, LCP 5.5 s, 2.4 MB page, no srcset. SEO, accessibility and best practices score 100.
- Shopify store (thehanukkahfairy.myshopify.com): 9 products. One book bundle (signed paperback plus tote, $45), the rest apparel and totes from $22 to $42. No plush yet (in development per `PRODUCT.md`).
- Measurement: Google Tag Manager GTM-MPV9H7PZ is installed but the container has no tags. There is no baseline for traffic, engagement or signup rate.

## 3. House rules (non-negotiable)

- "We can't post the current spreads ever - especially not to cut corners." (Harley, 2026-09-05). No current book spreads on the site in any form.
- New imagery: stills in Flora, motion in Kling. Never Harley's Google API ("Never use my google API again. We should always us Flora or Kling.", 2026-11-02). Match the book's illustrated style; generated art is judged against the approved site art before it ships.
- American spelling. Zero em dashes in any copy.
- Copy goes through the copy skill (GGCopyv4) in the book's voice: warm, rhyming where it earns it, written to grown-ups reading with kids.
- Production deploys and promotes need Harley's explicit go. Build to a Vercel preview first; run the 13-size QA before asking.
- Keep: Google Tag Manager GTM-MPV9H7PZ on every page (snippet in the current `index.html` head), the Shopify links, Amazon and Apple Books, the private signup storage unless an email platform replaces it, and the privacy page (updated for any new collection or analytics).
- Do not invent prices, review quotes, ratings, subscriber counts, stock or ship dates. Show social proof only when it is real.

## 4. What best-in-class looks like (from SITES.md)

| Benchmark | Take this |
|---|---|
| The Elf on the Shelf | Signup as a keepsake (personalized "adoption certificate"), a filterable ideas hub, a countdown to the ritual, a reviewed box set. |
| Big Life Journal | A gated printable challenge ("FREE 21-Day Family Gratitude Challenge") with a product mockup, child-age segmentation, a weekly freebie day. |
| James Clear | The book itself as the magnet (free Chapter 1) right in the hero; a fixed-format email with a named cadence. |
| Daily Stoic | A cadence promise plus social proof at the form, next to a store of ritual objects and signed books. |
| The Gruffalo | Popup fronted by the book cover; activities filterable by book and age. |
| Paddington store | Captures the child's birthday at signup; gift bundles; review counts on product cards. |
| Reindeer in Here | Book plus plush tradition; a printable "Name Your Reindeer" ID card. |
| Mensch on a Bench | Direct Hanukkah analog; doll plus book bundle; "over 325,000 Jewish families". Weak signup (footer, "news"): the gap to beat. |
| The Giving Manger | Itemized box set; free printables as $0 products. |

Every benchmark asks for one or two typed fields at first capture. None asks for a mailing address or phone. None hides its only form at the end of a long interactive experience.

## 5. Signup system

1. **Offer.** Replace "newsletter" with a ritual kit, working name "The Fairy's 8-Night Kit": printable hiding-spot cards, eight kindness missions, coloring pages, and a nightly note from the Fairy by email on Dec 4 to 11. Name and copy go through GGCopyv4; art through Flora. Show a mockup of the kit at every form (Big Life Journal pattern).
2. **Keepsake variant.** Test a personalized step: "Name your Fairy's first hiding spot" or the child's first name on a printable certificate (Elf registry, Reindeer ID card).
3. **Fields.** Email only. Optional step 2 after submit: one tap for who they read with or the child's age band. Drop mailing address and phone (no SMS consent exists for the phone field). In Omnisend data, 4-field forms convert at 1.5% against 2.1 to 2.2% for 1 to 3 fields.
4. **Entry points.** The kit CTA in the hero, in the tradition section, mid-reader, at the reader's last page (the peak), on the eight-nights page, and in the footer of every page. CTA buttons open a one-field modal (click-triggered popups average 54.42% in Wisepops data). One non-modal slide-in after 6 to 10 seconds plus some scroll; desktop-only exit intent. No load-time popup; never stack it under a cookie banner.
5. **Copy.** First-person button ("Send my 8-night kit"). A cadence promise ("One note a night, Dec 4 to 11"). Replace the "I'm a grown-up" checkbox with a plain disclosure line after counsel review: the FTC COPPA FAQ says a checkbox like "I am over 12" is not a neutral age screen.
6. **Delivery.** Connect an email platform before launch so the kit arrives in under a minute. Shopify Email or Klaviyo both connect to the Shopify store [I]; the owners choose. Keep writing to the private CSV as a backup until the platform is live.
7. **Sequence.** Welcome email with the kit (immediate), two more over the next week (the story behind the book; the gift guide), the planning email Dec 3 ("pick tonight's hiding spot"), nightly emails Dec 4 to 11 with a progress line ("Night 3 of 8"), a finale and review ask after Dec 12.

Targets [I]: no baseline exists, so set it first. Then aim for 3 to 5% of visitors subscribing (Omnisend: 2.1% average popup rate, 3 to 5% good, 5%+ excellent).

## 6. Pages and content

Each page has real server-rendered HTML text, its own title and description, and an entry in the sitemap with an accurate lastmod.

| URL | Purpose | Target queries [I] |
|---|---|---|
| `/` | Hook, the ritual in one screen, kit CTA, buy buttons, proof | the hanukkah fairy, hanukkah fairy book |
| `/book` | Facts block (title, authors, illustrator, ages, formats, ISBNs, pages, publish date, publisher), synopsis, every retailer, reviews | rhyming hanukkah picture book, new hanukkah books 2026 |
| `/tradition` | How the hide-and-seek kindness ritual works, night by night, with the kit | hanukkah elf on the shelf alternative, jewish elf on the shelf, hanukkah hide and seek tradition |
| `/eight-nights` | All 8 nights visible as text, printable, dates (first candle Fri Dec 4, 2026) | hanukkah activities for kids, 8 nights of hanukkah ideas, hanukkah kindness activities |
| `/characters` | The Fairy, Pup and the cast | |
| `/gifts` | Gift guide linked to individual Shopify products, three tiers with a highlighted middle tier, a grandparent path, real order-by dates | hanukkah gifts for kids, hanukkah gifts for toddlers |
| `/authors` | Elise, Donny and the illustrator; the first-hand origin story | |
| `/read-aloud` | Read-aloud video, classroom and library notes | hanukkah read aloud |
| `/press` | Media kit: cover, facts, author photos, contact | |
| `/faq` | Every answer visible, no collapsed-only content | |
| `/privacy` | Updated for the kit, email platform and analytics | |

The storybook reader can stay as the home page's signature moment if it ends on the kit (peak-end rule) and every word in it also exists as HTML text.

## 7. Commerce

- Link each edition directly: Amazon hardcover (B0HN6MZKP8), paperback, Kindle (B0HMG4H8MN), Apple Books, Barnes & Noble hardcover, Shopify signed bundle. ASINs and ISBNs per SEO.md; confirm against KDP before shipping.
- Gift tiers only from purchasable items. The plush appears only when it can be bought.
- Ship-by dates from the fulfillment partner. Research estimate (unconfirmed): about Nov 23 Ground, Nov 25 Priority. Apple Books and Kindle are the instant option after that.
- Reviews: show the Amazon rating once there are 5+ reviews (Spiegel: the first 5 reviews lift purchase likelihood 270%; 4.0 to 4.7 stars beats 5.0). Ask buyers for honest reviews after Night 8.
- Shopify: a branded shop subdomain, a meta description, a canonical, and a link back to the main site.

## 8. SEO and AI search spec

- One locked fact set (title, authors, illustrator, one age range, publisher, publish date, ISBNs) used identically on the site, JSON-LD, Amazon, Apple Books, Barnes & Noble, Goodreads and Open Library. Decision needed: the age range.
- JSON-LD: Book (with workExample per edition, isbn, numberOfPages, datePublished, publisher, offers, sameAs), Person for each author and the illustrator, Organization, BreadcrumbList. FAQPage is optional: Google dropped FAQ rich results on 2026-05-07 [V per SEO.md].
- All content server-rendered. No important text only in JS or only inside collapsed elements.
- Images: srcset and modern formats, a smaller nav logo, self-hosted fonts. Targets: LCP under 2.5 s on mobile, page under 1 MB.
- Square favicon plus /favicon.ico. Sitemap lastmod updated on every deploy. Open Graph book tags.
- Robots: keep search and AI crawlers allowed. llms.txt is optional; no major engine states it reads one (SEO.md).
- Off-site (owners and Parzvl, outside the build): Google Search Console and Bing Webmaster verification, Amazon Author Central, Goodreads author claims, Wikidata items, a press kit pitched to the lists that rank now (AJL/Jewish Book Garden, Hadassah, Kveller, JBC, PJ Library, parent blogs), a YouTube read-aloud, a Merchant Center feed.

## 9. Behavioral design

| Principle | Pattern on this site |
|---|---|
| Reciprocity | Give the kit first; the email is the delivery address. |
| Fogg ability | One field. One tap for step 2. |
| Fogg prompt | CTAs at motivation peaks: hero, tradition, the reader's last page. |
| Foot in the door | Email first, segmentation after. |
| Goal gradient and endowed progress | "Night 3 of 8" in every nightly email; Night 1 already checked when the kit arrives. |
| Peak-end rule | The reader ends with the Fairy leaving the kit. |
| Social proof | Real, situational: named parent quotes, hiding-spot photos, the Amazon rating at 5+ reviews. No subscriber counter until it is large. |
| Loss aversion, honestly | "First candle Friday, Dec 4" and real order-by dates. No fake timers. |
| Compromise effect | Three gift tiers, middle highlighted. |
| Personalization and IKEA effect | The child's name or the first hiding spot on a printable. |

## 10. Measurement (build before launch)

- A GA4 tag in GTM-MPV9H7PZ (needs the owners' GA4 measurement ID). Confirm in GTM Preview that page views fire with the current snippet; if not, switch to Google's standard two-part GTM snippet.
- Events: `kit_cta_click` (with location), `sign_up` (with step and entry point), `buy_click` (with retailer and edition), `shop_click`, `kit_download`, `video_play`, `reader_complete`, scroll depth.
- One A/B test at a time: offer framing, then entry-point timing.
- Search Console and Bing Webmaster for search and AI referral data.

## 11. Timing

Hanukkah 2026: first candle Friday Dec 4 at sundown; Night 8 Friday Dec 11; ends nightfall Saturday Dec 12 (Hebcal, per BEHAVIOR.md). Gift searches peaked in the first-night week in 2021 and 2023 [I from Google Trends]. A full rebuild may not be live and indexed in time, so the current site gets the highest-impact fixes first:

- **Step 1 (this week, current site):** email-only form, kit offer, fixed consent copy, all 8 nights as HTML, book facts and Book JSON-LD, direct retailer links, square favicon, GA4 in GTM, email platform connected.
- **Step 2 (Nov 16 to 21):** kit art and PDF, CTAs in hero and tradition, slide-in, welcome sequence.
- **Step 3 (Nov 22 to Dec 3):** gift guide, order-by dates, Dec 3 planning email.
- **Step 4 (Dec 4 to 11):** nightly emails.
- **Step 5 (Dec 12 to 31):** finale, review asks, parent photos.
- **Rebuild:** build on a preview in parallel; launch in January or after Hanukkah so it is indexed well before Hanukkah 2027 (starts Dec 24, 2027; restart list building in September).

## 12. Open decisions (owners or Harley)

1. The email platform: Shopify Email or Klaviyo.
2. The age range: 3 to 10 or 3 to 8.
3. Counsel review of the consent wording and dropping the phone field.
4. The GA4 measurement ID and Search Console access.
5. Whether to allow AI training crawlers (does not affect search inclusion per each vendor's docs).
6. Kit contents and art budget (Flora).
