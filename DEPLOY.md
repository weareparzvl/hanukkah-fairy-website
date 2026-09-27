# Deployment

The site is linked to the existing Vercel project `parzvl/hanukkah-fairy-website`.

1. Run `npm test` and `npm run build`.
2. Run `vercel deploy` for a preview.
3. Review the desktop/mobile layout, scrolling, character tabs and signup.
4. On approval, promote the reviewed preview with `vercel promote <deployment-url>`.

The private Blob store `hanukkah-fairy-signups` is connected to production, preview and development. Production writes `production/signups.csv`; previews write `preview/signups.csv`. Never expose the Blob read/write token in browser code. No domain/DNS change is needed for the existing project.

Use `npm run export:signups` after `vercel env pull .env.local` to download the production CSV. See README.md for details.
