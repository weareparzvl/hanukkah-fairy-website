# LoopLoop brief: Shopify merch link swap

Started 2026-11-09 1:55 PM ET. Source: Gmail "Re: Website Notes", message 1a1c1a4e237ca4ca (Elise + Donny, 2026-11-09 1:49 PM ET).

Goal: every merch link on thehanukkahfairy.com goes to https://thehanukkahfairy.myshopify.com/ instead of Etsy, and nothing else in the design changes.

Budget: one change set, three regression passes max.
Deliverables: edited site, verified Vercel preview, regression evidence, Gmail draft reply (not sent).
Do NOT: promote to production, send the email, touch other copy, colors or layout, push to any remote.

Pass criteria:
1. Zero etsy.com references in the built site.
2. All three merch links point to the exact Shopify URL, open in a new tab, rel=noopener.
3. Pixel diff before vs after at 13 viewports: only the Gift Shop button label region changes.
4. No horizontal overflow, no broken images, no console errors at any viewport.
5. Pup rooftop checks unchanged versus the Nov 4 record.
6. Tests and build pass. Preview build files match the local build byte for byte.
