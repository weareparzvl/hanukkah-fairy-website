# Status
LIVE. Promoted by Harley on 2026-11-10; production deployment exj8wn1b9. thehanukkahfairy.com shows "Shop Here", 3 Shopify links, 0 Etsy. 13-viewport QA on the live site is clean and matches the approved preview pixel for pixel (shots/prod-after, shots/diff-prod-after). Remaining: Harley sends draft r231835830172965726.

# Ship-ready
- Preview: https://hanukkah-fairy-website-gklpacu5a-parzvl.vercel.app (Vercel login, or the share link given in chat, valid until 2026-11-10 9:31 PM; regenerate with the Vercel connector get_access_to_vercel_url)
- Promote command: vercel promote https://hanukkah-fairy-website-gklpacu5a-parzvl.vercel.app --scope parzvl --yes  (run from /Users/parzvl/hanukkah-fairy-website/site)
- Gmail draft replying to Donny's 4:24 PM ET message in "Re: Website Notes", to hello@thehanukkahfairy.com, draft id r231835830172965726. Covers both asks. The old draft r-8430513016187335307 was deleted (superseded).

# Needs 5 min
- Check the preview: hero "The Fairy Gift Shop" button, Gift Shop image, "Shop Here" button. All three go to https://thehanukkahfairy.myshopify.com/
- Draft link: see PARKED.md item 1 (re-link in Gmail or send as is).
- Send the draft only after the promote, because it says "All set."

# Stuck
Nothing blocking.

# Decisions made
- Gift Shop button reads "Shop Here" (Donny's wording, title case to match "Apple Books" and "The Fairy Gift Shop"). Replaces the earlier "Shop now" pick.
- No UTM tags on the Shopify links.
- Pink-button proposal from Nov 4 left untouched (never approved).
- Commits are local only (2f2221e Shopify links, ebfe4f2 Shop Here). Nothing pushed.

Evidence: shots/before, shots/prod-before, shots/after, shots/preview, shots/shophere (13 viewports each, results.json per set), shots/diff (annotated), shots/diff-shophere (after vs shophere: only the button label changed, 595 to 665 px per viewport, same page height), compare-390-giftshop.png, compare-1280-giftshop.png, compare-shophere.png.
