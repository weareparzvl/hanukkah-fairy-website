# The Hanukkah Fairy website

A multi-page storybook site for parents of children ages 3 to 10, rebuilt on Astro in November 2026. Pages are static HTML; one small Node function (`api/subscribe.js`) saves signups to a private CSV. Rebuild notes: `reviews/rebuild-20261111/NOTES.md`. The research behind it: `reviews/benchmark-20261110/`.

## Layout

- `src/pages/`: home, `/book`, `/tradition`, `/eight-nights`, `/kit`, `/kit/thanks`, `/faq`, `/privacy`, 404 and the sitemap.
- `src/data/book.js`: the one fact set (authors, ISBNs, retailer links, Hanukkah dates). Page text and JSON-LD both read from it. Change a fact here, nowhere else.
- `src/data/nights.js`: the eight nights. The site and the printable kit both read from it.
- `src/components/KitForm.astro`: the one-field signup used in the modal, the home band, the reader and `/kit`.
- `static/`: files served as they are (robots.txt, icons, the kit PDF).

## Preview locally

```sh
npm install
HF_LOCAL_CSV=1 npm run preview
```

Open http://localhost:8761. This builds to `dist/` and serves it with the signup function, so forms work. Local signups go to `data/signups.csv`, which is ignored by Git. `npm run dev` gives live reload without the signup function.

## The 8-Night Kit

`npm run kit` rebuilds `static/kit/the-fairys-8-night-kit.pdf` and the page previews in `src/assets/kit/` from `src/data/nights.js`, using only the approved character art. It needs Playwright (set `PLAYWRIGHT_PATH`). Commit the results. `npm run icons` rebuilds the favicon and social image.

Kit promises that need an email platform (nightly notes) are off: see `kit.nightlyNotes` in `src/data/book.js`. Turn them on only once a platform sends them.

## Signup storage

The Vercel project is `parzvl/hanukkah-fairy-website`. Its private Blob store is `hanukkah-fairy-signups`.

- Production: `production/signups.csv`
- Preview/development: `preview/signups.csv`
- Columns: `email`, `signed_up_at` (UTC), `source`, `consent_version`, `name`, `address`, `phone`, `entry`, `reads_with`
- Email and adult email consent are required. The form no longer asks for name, mailing address or phone; those columns stay for earlier records. `entry` is the button that opened the form. `reads_with` is the optional one-tap answer after signup (kids, grandkids, class, gift). Older four- and seven-column files migrate on the next signup, preserving earlier records.
- Email addresses are normalized and duplicates are ignored. Conditional writes and retries protect concurrent signups. Contact fields are bounded, quoted, and protected against spreadsheet formula interpretation.
- The browser confirms success only after the CSV has been saved.
- There is no public endpoint for reading the mailing list. Blob credentials stay on the server.

Download the current production list to `exports/signups.csv`:

```sh
vercel env pull .env.local
npm run export:signups
```

For the preview list: `npm run export:signups -- --preview`. The CSV is also available to authorized team members in the Vercel storage dashboard. Keep exports private. Signup stores the address; it does not send email. Import the CSV into the chosen email platform when launch communications are ready, and honor removal requests.

## Build and deploy

```sh
npm test
npm run build
vercel deploy --scope parzvl --yes
```

Vercel runs `astro build` and serves `dist/`; `api/subscribe.js` runs as a serverless function beside it. Previews are protected. Production promotion is a separate step and needs Harley's go.

Checks: `node scripts/qa-sizes.mjs <base> <outDir> [shareToken]` (13 sizes, 7 pages) and `node scripts/qa-flows.mjs <base> <outDir>` (modal, signup, step two, reader, nights, no-JavaScript post).

## Motion and interaction

The actual front cover opens with native scroll position, followed by the original story spread, a kindness spread, and the signup page. The cover rotates around a fixed center seam; each desktop page stays square and expands to fill the available viewport. Desktop pages open as a spread; mobile pages stack artwork above the text. Small-height screens, tablets, reduced-motion users and visitors without JavaScript receive all pages in ordinary document flow. The signup form also supports ordinary HTML submission without JavaScript.

The desktop hero fits the opening viewport, with the scroll instruction and divider visible above the fold. The mouse cue stays fixed in that screen position through the book, fading out after the last page and back in on reverse scrolling. All four characters have their own crawlable panels; the candle buttons show eight family activity ideas.

## Source and design

Existing cover, logo and character assets are reused. The supplied Book Bible remains the story reference; unpublished spreads are not exposed. Elise’s September 28 feedback supplies the current age range (3–10), October 15 launch, family copy and bold illustrated direction. Original nightscape, liner and product mockups come from her attachments and the shared asset folder. See reviews/elise-feedback-2026-09-28.md for provenance and review coverage.

## Search and AI search

The homepage ships crawlable book details, canonical and social metadata, linked WebSite/WebPage/Book structured data, robots.txt, and sitemap.xml. See [SEO.md](SEO.md) for verified implementation and account-level indexing follow-up.
