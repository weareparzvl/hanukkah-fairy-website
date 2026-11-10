# Google Tag Manager, 2026-11-10

Harley, 11/10: "Install this google analytics code" then "Use this one instead then send to production" (same GTM-MPV9H7PZ snippet both times).

- Read "instead" as GTM in place of `npm i @vercel/analytics` (asked earlier the same afternoon). Vercel Analytics was installed, wired, then removed; package.json is unchanged.
- Snippet installed verbatim, high in `<head>`, on index.html and privacy.html. Commit f5981a8.
- Preview lm38w8fpv: GTM loads (200) on / and /privacy, 13-size QA clean, fold strip 0px at 13 sizes.
- Promoted by Claude on Harley's "send to production": production deployment 31kXNA42M31mcnjaA2twhi4tR2sp. This also shipped the fold fix (84f677f).
- Live check after promote: GTM-MPV9H7PZ in both pages, gtm.js 200, no console errors, 13-size QA clean, fold strip 0px at 13 sizes, 3 Shopify links, 0 Etsy.

## Open
- The published container (version 1) has no tags, triggers or measurement IDs. Nothing is recorded until a GA4 tag is added in GTM and published.
- This snippet pushes `gtag('js', ...)`, not the standard `{'gtm.start', event: 'gtm.js'}`. dataLayer shows gtm.dom and gtm.load only. Unverified whether "All Pages" (Page View) triggers fire; check in GTM Preview once a tag exists.
- privacy.html does not mention analytics or cookies.
