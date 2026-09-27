# Search and AI search setup

## Implemented September 27, 2026

- Canonical origin: https://thehanukkahfairy.com/. The aliases serve the same canonical URL.
- Homepage title and description identify the book, Hanukkah, and ages 3–9.
- Open Graph and social-card metadata use the canonical origin and existing cover artwork.
- Linked WebSite, WebPage, and Book JSON-LD identifies the title, authors, illustrator, audience, themes, and original cover. No unconfirmed ISBN, price, publication date, reviews, stock status, or purchasing offer is published.
- The book summary, author credits, age range, launch status, and parent FAQs are in the server-delivered HTML. They can be read without JavaScript or scrolling through an animation.
- robots.txt allows public-page crawling and advertises the XML sitemap. API routes are excluded. Private CSVs remain outside the public build; robots.txt is not their access control.
- sitemap.xml lists the canonical, indexable homepage. The privacy page retains its existing noindex setting and has its own canonical URL.
- Hero cover is preloaded with high fetch priority; images retain dimensions; fonts use display=swap; optional motion uses native scroll/requestAnimationFrame and has a reduced-motion/static fallback.

## Account-level follow-up

Search Console and Bing Webmaster Tools account access has not been verified in this workspace. No sitemap submission, indexing request, search ranking, or AI citation is claimed. In verified accounts, submit https://thehanukkahfairy.com/sitemap.xml and inspect the canonical homepage. Monitor indexing and search/AI discovery reports. Update the sitemap's lastmod only when substantive public content changes.

When sales open, update the visible purchase answer and book facts in the HTML alongside the purchase URL, then add only verified publication/ISBN/offer details to structured data.

## Guidance used

- Google: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Bing: https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/

The implementation follows crawlability, clear content, canonicalization, and accurate structured data. No special AI markup or llms.txt ranking benefit is assumed.
