# The Hanukkah Fairy website

A responsive storybook launch site for parents of children ages 3–10. Plain HTML, CSS and browser JavaScript; a small Node endpoint saves signups to a private CSV.

## Preview locally

```sh
npm install
HF_LOCAL_CSV=1 npm run dev
```

Open http://localhost:8761. Local signups go to `data/signups.csv`, which is ignored by Git and never served as a website asset. Without `HF_LOCAL_CSV=1`, the server uses private Vercel Blob storage via `.env.local`.

## Signup storage

The Vercel project is `parzvl/hanukkah-fairy-website`. Its private Blob store is `hanukkah-fairy-signups`.

- Production: `production/signups.csv`
- Preview/development: `preview/signups.csv`
- Columns: `email`, `signed_up_at` (UTC), `source`, `consent_version`, `name`, `address`, `phone`
- Email and adult email consent are required. Name, mailing address and phone are optional. Existing four-column files migrate on the next new signup, preserving earlier records.
- Email addresses are normalized and duplicates are ignored. Conditional writes and retries protect concurrent signups. Contact fields are bounded, quoted, and protected against spreadsheet formula interpretation.
- The browser confirms success only after the CSV has been saved.
- There is no public endpoint for reading the mailing list. Blob credentials stay on the server.

Download the current production list to `exports/signups.csv`:

```sh
vercel env pull .env.local
npm run export:signups
```

For the preview list: `npm run export:signups -- --preview`. The CSV is also available to authorized team members in the Vercel storage dashboard. Keep exports private. Signup stores the address; it does not send email. Import the CSV into the chosen email platform when launch communications are ready, and honor removal requests.

## Open sales later

Set `preorderUrl` in `js/config.js` to the verified retailer URL. The book section then shows a purchase button and the purchasing FAQ updates. Signup remains available. The October 15 launch is supplied by Elise. No price, format, or stock claim is invented while those details are unsettled.

## Build and deploy

```sh
npm test
npm run build
vercel deploy
```

Vercel uses Node 24. The build copies only the public site into `public/`; private data, server code and credentials are excluded. `api/subscribe.js` runs as a serverless function. Production promotion is a separate step after design approval.

## Motion and interaction

The actual front cover opens with native scroll position, followed by the original story spread, a kindness spread, and the signup page. The cover rotates around a fixed center seam; each desktop page stays square and expands to fill the available viewport. Desktop pages open as a spread; mobile pages stack artwork above the text. Small-height screens, tablets, reduced-motion users and visitors without JavaScript receive all pages in ordinary document flow. The signup form also supports ordinary HTML submission without JavaScript.

The desktop hero fits the opening viewport, with the scroll instruction and divider visible above the fold. The mouse cue stays fixed in that screen position through the book, fading out after the last page and back in on reverse scrolling. All four characters have their own crawlable panels; the candle buttons show eight family activity ideas.

## Source and design

Existing cover, logo and character assets are reused. The supplied Book Bible remains the story reference; unpublished spreads are not exposed. Elise’s September 28 feedback supplies the current age range (3–10), October 15 launch, family copy and bold illustrated direction. Original nightscape, liner and product mockups come from her attachments and the shared asset folder. See reviews/elise-feedback-2026-09-28.md for provenance and review coverage.

## Search and AI search

The homepage ships crawlable book details, canonical and social metadata, linked WebSite/WebPage/Book structured data, robots.txt, and sitemap.xml. See [SEO.md](SEO.md) for verified implementation and account-level indexing follow-up.
