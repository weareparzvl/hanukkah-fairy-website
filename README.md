# The Hanukkah Fairy website

A responsive storybook launch site for parents of children ages 3–9. Plain HTML, CSS and browser JavaScript; a small Node endpoint saves signups to a private CSV.

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
- Columns: `email`, `signed_up_at` (UTC), `source`, `consent_version`
- Addresses are normalized and duplicates are ignored. Conditional writes and retries protect concurrent signups.
- The browser confirms success only after the CSV has been saved.
- There is no public endpoint for reading the mailing list. Blob credentials stay on the server.

Download the current production list to `exports/signups.csv`:

```sh
vercel env pull .env.local
npm run export:signups
```

For the preview list: `npm run export:signups -- --preview`. The CSV is also available to authorized team members in the Vercel storage dashboard. Keep exports private. Signup stores the address; it does not send email. Import the CSV into the chosen email platform when launch communications are ready, and honor removal requests.

## Open sales later

Set `preorderUrl` in `js/config.js` to the verified retailer URL. The book section then shows a purchase button and the purchasing FAQ updates. Signup remains available. No price, publication day, format, or stock claim is invented while those details are unsettled.

## Build and deploy

```sh
npm test
npm run build
vercel deploy
```

Vercel uses Node 24. The build copies only the public site into `public/`; private data, server code and credentials are excluded. `api/subscribe.js` runs as a serverless function. Production promotion is a separate step after design approval.

## Motion and interaction

The storybook cover opens with native scroll position. Characters use accessible keyboard tabs; the candle buttons show eight family activity ideas. Small-height screens, reduced-motion users and visitors without JavaScript receive a static open book. The signup form also supports ordinary HTML submission without JavaScript.

## Source and design

Existing cover, logo and character assets are reused. The supplied Book Bible remains the story reference; unpublished spreads are not exposed. The rebuild uses the user's current audience range, ages 3–9.
