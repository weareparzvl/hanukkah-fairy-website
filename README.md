# hanukkahfairy.com launch site

Static one-pager. No build step. Plain HTML, CSS, vanilla JS.

## Run locally

```bash
cd /Users/parzvl/hanukkah-fairy-website/site
python3 -m http.server 8760
# http://localhost:8760/
```

## Files

```
site/
├── index.html      hero, story, cast, ritual, plush, authors, email capture, footer
├── css/site.css    tokens + layout (Bagel Fat One / Grandstander / Author)
├── js/site.js      sparkles, mobile menu, display-line fitter, Mailchimp JSONP capture
└── assets/         trimmed character PNGs, cover, logo, plush renders, favicon
```

## Before deploy: two constants in js/site.js

| Constant | What | Status |
|---|---|---|
| `MC_URL` | Mailchimp `post-json` endpoint for the Hanukkah Fairy audience (same pattern as kitchenblockparty) | EMPTY. Form shows "List not connected yet" until set |
| `PREORDER_URL` | Retailer link. Button stays hidden while empty | EMPTY. No Amazon listing found 2026-09-26 |

Do not deploy with `MC_URL` empty. The Sep 10 brief rule: no hanukkahfairy.com without email capture wired.

## Domain state (checked 2026-09-26)

`hanukkahfairy.com` resolves to Squarespace (198.49.23.144/145, 198.185.159.144/145) and serves a one-image holding page with an Instagram link. The Sep 10 brief said the domain was on GoDaddy and unpointed. Someone connected Squarespace since. Deploy plan: new Vercel project, then swap the A records at the registrar to Vercel. Only on Harley's go.

## Sources of truth

- Copy bank and story beats: `/Users/parzvl/hanukkah-fairy-website/specs/Book bible.md`
- Character canon: `/Users/parzvl/hanukkah-fairy/art/refs/` (the CHARACTER-SPECS.md in this package is generated and wrong on the angel: the book's angel is an older man)
- Coda line verified against the printed spread `art/web/32.jpg`: "once left that way too."
