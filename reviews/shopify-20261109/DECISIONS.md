# Decisions

Format: [time ET] | [action] | [why] | [confidence 1-5] | [reversible y/n]

---

1:53 PM | Decision 0: scope = swap 3 Etsy links (hero button, Gift Shop image, Gift Shop button) to the exact URL Donny sent | Thread read in full (20 messages); latest ask is only the link swap | 5 | y
1:53 PM | Work on local tree as-is, including uncommitted Nov 4 changes | Live index.html, site.css, site.js, reader.css, reader.js, config.js are byte-identical to local, so local == production | 5 | y
1:53 PM | Shopify URL is safe to link | HTTP 200, public storefront with 8+ product pages; "password" strings are customer-login JS, not a lock screen | 5 | y
1:53 PM | Button label "Shop on Etsy" becomes "Shop now" | Naming Etsy is now wrong; heading above already says The Fairy Gift Shop, so repeating it is redundant; shorter label cannot wrap at 340px | 4 | y
1:53 PM | No UTM parameters added | Use Donny's URL exactly; tracking is a separate call | 4 | y
1:53 PM | Leave pink-button proposal alone | Still a proposal from Nov 4, not approved; out of scope | 5 | y
2:00 PM | Baseline capture at 13 viewports, local vs production | Pixel noise floor = 0 at all 13, so local build is a faithful stand-in for live | 5 | y
2:05 PM | Edited index.html (3 hrefs, 1 aria-label, 1 label) + 1 CSS comment | Exact scope of decision 0 | 5 | y
2:08 PM | Regression pass 1: 12/13 viewports changed only in one 141x66 box (Gift Shop button). 340x640 showed page-wide text anti-alias noise | Crop showed identical text; two re-runs at 340x640 gave the single button box. Logged as rasterization noise, re-run kept as the record | 5 | y
2:10 PM | Self-critique on "Shop now": weakest points = generic CTA, button narrower than before, could say "Visit the shop". Kept "Shop now" | Narrower button still matches the yellow button family; shortest label; heading already names the shop | 4 | y
2:11 PM | Vercel preview deploy (not production) | DEPLOY.md step 2; production promote is a hard stop for Harley | 5 | y
2:12 PM | Preview dpl_AoVo3LRNazvDt95kzrTVkzV5McC4 is behind Vercel Authentication; created a 23h share link via Vercel connector | Needed to verify the deployed build and give Harley a phone-openable link; content is the public site plus this change | 4 | y (expires 2026-11-10 6:00 PM)
2:14 PM | Preview check: 45 of 48 built files byte-identical; index.html and privacy.html identical at their clean URLs; only extra is Vercel's preview-only feedback script; assets/ruvector.db is excluded by .vercelignore (also 404 on production) | Proves preview = tested local build | 5 | y
2:16 PM | Preview vs local after: pixel-identical at all 13 viewports; 6/6 merch clicks open the Shopify store in a new tab (title "The Hanukkah Fairy", 28 product links) | Final regression pass | 5 | y
2:18 PM | Local commit of the Nov 4 live state (Gift Shop, nav, rooftop Pup) separate from today's change; .gitignore keeps review screenshots local (205 MB) | Nov 4 work was live but never committed; separate commits keep history honest | 5 | y
2:20 PM | Gmail draft v1 rewrote the URL text into a google.com/url redirect; v2 (HTML anchor) kept clean text but redirect href; v3 (bare domain text) also auto-linked through redirect | Connector behaviour, not fixable from the API after 2 attempts; parked per stop rule. Visible text is clean | 4 | y
2:21 PM | Did not promote to production or send the email | Hard stops: production deploy and client email need Harley's go | 5 | y
