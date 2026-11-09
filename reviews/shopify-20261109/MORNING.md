# Status
Shopify swap is built, tested and on a preview. It is not live yet: production promote and the email are waiting on Harley.

# Ship-ready
- Preview: https://hanukkah-fairy-website-evngbqhj9-parzvl.vercel.app (Vercel login, or the 23h share link given in chat; regenerate with the Vercel connector get_access_to_vercel_url)
- Promote command: vercel promote https://hanukkah-fairy-website-evngbqhj9-parzvl.vercel.app --scope parzvl --yes  (run from /Users/parzvl/hanukkah-fairy-website/site)
- Gmail draft in "Re: Website Notes" to hello@thehanukkahfairy.com, draft id r-8430513016187335307.

# Needs 5 min
- Check the preview: hero "The Fairy Gift Shop" button, Gift Shop image, "Shop now" button. All three go to https://thehanukkahfairy.myshopify.com/
- Draft link: see PARKED.md item 1 (re-link in Gmail or send as is).
- Send the draft only after the promote, because it says "All set."

# Stuck
Nothing blocking.

# Decisions made
- "Shop on Etsy" button now reads "Shop now". Override if you want "Visit the shop" or similar.
- No UTM tags on the Shopify links.
- Pink-button proposal from Nov 4 left untouched (never approved).
- Nov 4 live work committed locally as its own commit. Nothing pushed.

Evidence: shots/before, shots/prod-before, shots/after, shots/preview (13 viewports each, results.json per set), shots/diff (annotated), compare-390-giftshop.png, compare-1280-giftshop.png.
