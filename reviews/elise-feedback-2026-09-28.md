# Elise website feedback — implementation and review

Source: “Website Notes,” Elise + Donny Dykowsky, September 28, 2026, in harley@parzvl.com. User explicitly requested implementation and more than one review pass.

## Direction

The existing book artwork is the visual authority: electric-blue illustrated nightscape, coral/pink logo, turquoise Fairy, acid-yellow announcements, blush/pink product world, original blue/pink liner, and midnight-blue eight-night feature. Typography pairs oversized Bricolage Grotesque campaign headings with the approved Bagel Fat One book quotations and readable DM Sans body copy. One poster-like opening screen, then distinct product/ritual/character worlds. Parents must quickly understand the book, its age range, launch, and current email action.

## Feedback coverage

- Universal neighborhood copy; remove Brooklyn references from visible text, alternative text, metadata and schema.
- Ages 3–10 throughout public content and Book structured data.
- October 15 launch shown in announcement, hero, product, story, signup and purchasing FAQ. 2026 is the upcoming October inferred from this September 28 feedback; no unverified publication-format, stock, ISBN or price claims added.
- Exact supplied family-story paragraph retained; illustrator and early art-direction credits retained.
- Actual Cover Art Clean attachment used as homepage background.
- Actual attached four-character doll-set mockup displayed prominently.
- Original Book, Fairy + Book, and Fairy + Pup + Book mockups retrieved from the shared HF - ASSETS/MOCKUPS folder.
- Original Lining_Wrapping Paper.pdf rendered for the family section and Fairy Mail artwork.
- Poster hero: huge logo, oversized Fairy, supplied “Santa skips her house. She stopped waiting.” line, one primary conversion action and a secondary cast link.
- Oversized headings and full-width color sections; four individual character panels, including Grizzlebottom in hot pink.
- The ritual is a large visual feature; eight-night candle interaction follows the cast.
- The actual front cover, preserved story/quote spread, kindness spread, and final signup page remain in the fixed-seam scroll reader previously requested by Harley.
- “Get Fairy Mail” replaces generic list language. Duplicate standalone signup sections removed. Name, mailing address, phone remain optional; email/adult email consent required; private CSV workflow preserved.
- Product sets are explicitly previews/in development. Purchase buttons stay configured but hidden until a verified retailer URL exists, consistent with Harley’s direct instruction.
- Restrained motion: Fairy moves with the opening scroll, the large book opens around a fixed seam, the stationary mouse cue fades reversibly after the reader. Reduced-motion users get static pages.
- Crawlable HTML, canonical URLs, sitemap, robots and book schema retained and updated.

## Review pass 1 — composition and mobile usability

Captured desktop 1440×900 and mobile 390×844 section views; checked 320, 768 and 1366 widths. Identified decorative horizontal overhang, mobile text over bright windows, an obscured secondary hero link, and a remaining neighborhood name in social image metadata. Fixed those together. Kept tight leading only on oversized display headings, as an intentional response to the editorial brief; body copy remains at readable leading.

## Review pass 2 — confirmation and independent review

Confirmation screenshots: /tmp/hf-elise-review/. Hero and signup screenshots show actual viewport overlays. Tall individual-section captures temporarily hide only the fixed navigation and scroll cue so the complete section can be reviewed without screenshot artifacts. A separate fresh-context reviewer assessed 12 desktop/mobile screenshots and the relevant source, returned **ship**, and found no material visual or UX issues. Compact display-headline leading is intentional; no body text uses that leading.

## Asset provenance

- nightscape.webp: Cover Art Clean.png attached to Website Notes.
- boxed-plush-set.webp: 3 all character boxed mockup 2.png attached to Website Notes.
- product-0.webp: Book Plain mockup.png, Drive file 1prBQjSujLx8CAfua3J5lZoI2UAt98hHO.
- product-1.webp: Fairy & Book box set.png, Drive file 1bE__ih64zaUFbrHYf8xOwGatgwkfS-Qs.
- product-2.webp: Fairy & Pup Book Set.png, Drive file 1Pv26c8dH6cUdILzLNKWOSUTyVHjf9H6Z.
- liner.webp: first page rendered from Lining_Wrapping Paper.pdf, Drive file 1_9thoOgJ6BRKqZcnnnILyLgE-iims8_g.
- Existing cover, logo, and transparent character art retained.
- Image work is format conversion/rendering of supplied assets, with no invented product imagery or replacement character designs.

## Intentional interpretations

The email’s opening universal-neighborhood instruction governs copy, while its supplied city artwork governs visual style. A launch announcement does not create a purchase destination. Book previews retain the original approved public reader rather than exposing the private manuscript. The four-stop cover/story/kindness/signup sequence fulfills the user’s existing animated-book instruction.

## Functional verification

Seven viewports passed (320×740, 375×812, 390×844, 768×1024, 1366×768, 1440×900, 1920×1080): no horizontal overflow, mobile menu and Escape, eight-night selection, direct signup, optional contact fields, and the final reader form. A synthetic local submission was read from the private local CSV; a simulated server failure displayed an error without false success. Reduced motion, no-JavaScript content, metadata age/date consistency, and absence of Brooklyn copy passed. The independent visual reviewer did not repeat these runtime checks.

## Production release

Source commit `2852c91` deployed September 28 to https://thehanukkahfairy.com/ via Vercel deployment `dpl_AcpqTffeYMNe2HNmAjM4pSfZscJs`. The explicit PARZVL scope resolved an initial unscoped authorization error. Live desktop (1440×900) and mobile (390×844) checks passed: layout, menu, candles, fixed hinge, square desktop pages, final signup and direct signup links. Both domains serve the new revision; all six new assets, robots.txt and sitemap.xml returned 200; live age metadata is 3–10. Live hero screenshots were inspected. No production mailing-list rows were created during this release. The unchanged storage backend was verified locally and by its six tests.
