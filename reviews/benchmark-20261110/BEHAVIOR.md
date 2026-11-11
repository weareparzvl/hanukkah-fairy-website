# Signup conversion and behavior evidence

**For:** thehanukkahfairy.com rebuild
**Compiled:** Tuesday, November 10, 2026 (ET)
**Scope:** Read-only research. No forms were submitted, no accounts created, nothing bought.

## How to read this file

Every claim carries a label:

- **[V] Verified.** I opened the primary or owner source this session and read the number there.
- **[S] Secondary.** The number comes from a search summary, aggregator or vendor recap. I did not open the original study, so treat the exact figure as reported, not confirmed.
- **[D] Data pull.** My own Google Trends pull this session (method in section 6).
- **[I] Inference.** My reasoning or recommendation. Not a measured fact.
- **[U] Unverified.** Circulating claim I could not confirm. Do not cite.

Vendor benchmarks use different denominators (displays, form views, sessions, visitors). They are not comparable across vendors, only within one vendor's dataset.

---

## 0. Bottom line

1. **The current form sits in the weakest placement with the weakest offer.** It is an embedded form at the very end of a long storybook (index.html:616), promising a newsletter ("Book news, character mischief, and the first word on our plush pals"). Embedded forms rank last for email in Klaviyo's form-type data, and "newsletters and updates" convert at 17.46% versus a 22.16% average in MailerLite's 41,000-form dataset, below learning resources (27.4%) and giveaways (29.37%). [V]
2. **The form asks for four inputs plus a required checkbox.** Omnisend's 1.24B-display dataset shows 1 to 3 fields at 2.1 to 2.2% and 4 fields at 1.5% (about 30% lower). [V] The consent line still says "launch emails," but the book launched October 15, 2026 per PRODUCT.md. [V, repo]
3. **Signups receive nothing.** README.md confirms signups go to a private CSV and "it does not send email." [V, repo] Klaviyo advisers report most people buy within 10 days of subscribing. [V, Klaviyo blog quoting an adviser] Every day without a welcome flow wastes the highest-intent moment.
4. **The site already owns the best lead magnet idea and is not using it.** The ritual section ("She hides. You seek. Be kind. Get a treat.") is a direct analog of Elf on the Shelf, where "elf on the shelf ideas" searches run about 35% of the brand's own search volume. [D] A free "8-Night Kit" (nightly hiding spots, kindness missions, read-aloud prompts, printables) plus nightly "Fairy Mail" during Hanukkah turns the newsletter into a utility parents need every night.
5. **The season is now.** Hanukkah 2026 begins the evening of Friday, December 4 and ends at nightfall Saturday, December 12. [V] In the two closest calendar analogs (2021 and 2023), US "hanukkah gifts" search peaked in the week containing the first night and the prior week ran 31 to 59% of peak. [D] For 2026 that peak week is Sunday November 29 to Saturday December 5, which also holds Cyber Monday. [I]

---

## 1. Email capture benchmarks (Question 1)

### 1a. Popups and forms, by dataset

| Dataset | Average | Good / top | Notes | Label |
|---|---|---|---|---|
| Omnisend, 1.24B popup displays, calendar 2025 (published Feb 9, 2026) | 2.1% (2024: 2.3%) | 3 to 5% "good," 5%+ "excellent," 3.5%+ "top performers" | Popup forms only, forms with 1,000+ yearly views, 50%+ outliers removed. Text and charts disagree on several sub-figures. | [V] |
| Wisepops, ~1B email-signup popup displays (published Sep 30, 2025, labeled 2026 report) | 4.82% (prior 4.65%); ecommerce 6.88% | Top 10% of campaigns 57.7% | Emails collected / displays. Top 10% is inflated by click-triggered popups. | [V] |
| Klaviyo, Klaviyo brands (Aug 29, 2023) | Full-screen has the highest email median at 3.54%, then popup, flyout, embed | n/a | Klaviyo says the differences were not statistically significant. Sample not stated. | [V] |
| Klaviyo general benchmark (Aug 6, 2026 post) | 3% submit rate | Practitioner reports 3 to 8% for standard popups, 8 to 20% for strong brands | Practitioner opinion inside a Klaviyo post, not a dataset. | [V] |
| Sumo / BDOW page (2026 title) | 2.1% average opt-in | 8%+ top performer | Form-type chart: click-triggered two-step 4.1%, exit-intent 3.8%, welcome mat 3.4%, standard popup 2.95%, timed 2.9%, scroll box 2.6%, sticky bar 2.3%. Chart values read from image alt text. | [V] page, chart values [S] |
| Sumo older study, ~1.75B popups | 3.09% | Top 10% 9.28% | Study date not shown. | [S] |
| MailerLite, 41,000+ forms and popups from 10,000+ paid accounts (Mar 13, 2026) | 22.16% | Giveaways 29.37% | Denominator is form opens (embedded forms count on page load). Not comparable to display-based popup rates. | [V] |
| Unbounce Conversion Benchmark Report 2024 (Jul 2023 to Jul 2024) | Landing page median 6.6% all industries | Ecommerce top quartile 11.4%+ | 57M conversions, 41,000 pages, 464M pageviews. | [S] |

### 1b. By form type and trigger

| Format | Number | Source | Label |
|---|---|---|---|
| Click-triggered popup (visitor clicks a button first) | 54.42% average, 63.35% top 10% | Wisepops | [V] |
| Click-triggered two-step | 4.1% | Sumo chart | [S] |
| Exit-intent | 3.94% average, 19.2% top 10% | Wisepops | [V] |
| Exit trigger | 1.8% (text) / 2.1% (chart) | Omnisend | [V] |
| Time-delay trigger | 2.9% ("afterTimePassed/other") | Omnisend | [V] |
| Scroll trigger | 5.37% Wisepops; 2.1% Omnisend | both | [V] |
| Full-screen / welcome mat | 3.54% median (Klaviyo); 3.4% (Sumo chart) | Klaviyo, Sumo | [V] / [S] |
| Embedded / inline | Ranked last for email by Klaviyo (no median given) | Klaviyo | [V] |
| Footer form | 0.5 to 1.5% | mailflowauthority.com, unsourced | [U] |
| Landing page | 6.6% median | Unbounce 2024 | [S] |

**What this means here [I]:** The current form is an embedded form shown only to people who reach the end of the reader. Its exposure is a fraction of sessions, and its per-view rate is likely in the bottom tier. A realistic first goal for a rebuilt capture system is a sitewide 3 to 5% visitor-to-subscriber rate (Omnisend's "good" band), with 5%+ as the stretch. There is no baseline yet, so set one first (change 12).

---

## 2. What moves signup rate (Question 2)

Effect sizes are relative unless marked "pt" (percentage points).

| Lever | Evidence | Label |
|---|---|---|
| **Field count** | Omnisend: 1 field 2.1%, 2 fields 2.2%, 3 fields 2.1%, 4 fields 1.5%, 5+ fields 1.4%. Wisepops is non-monotonic (3 fields 7.86%, 5 fields 30.37%, which Wisepops attributes to highly qualified traffic). Read Wisepops as confounded by placement. | [V] |
| **Field type** | HubSpot's analysis of 40,000+ landing pages: more fields lowers conversion "slightly," textareas and dropdowns hurt most. Counterexample: Michael Aagaard cut 9 fields to 6 and conversion fell 14.23%, because he removed the wrong fields. | [S] |
| **Asking for context** | Caden Lane (kids' clothing) tested 30 popup versions; conversion was highest when the form "asked for more context, not less," including who the shopper was buying for. No lift figure published. | [V] Klaviyo post |
| **Multi-step** | Wisepops 5.17% vs 4.62% (+12%). Omnisend 2.3% vs 2.0%. Klaviyo +0.58 pt for email, not significant. | [V] |
| **Gamified (spin-to-win)** | Wisepops 29.99% vs 4.04% traditional. Omnisend 3.5% vs 2.0%. Both are almost always discount wheels, so the incentive and the game are confounded. | [V] |
| **Discount vs none** | Omnisend 2.4% vs 1.7% (+41%). Wisepops 7.45% vs 4.60% (+62%). Klaviyo +0.52 pt, not significant. MailerLite: discounts are the *lowest* offer type at 16.2%. | [V] |
| **Content offer type** | MailerLite: giveaways/contests 29.37%, learning resources 27.4%, interactive tools (quizzes) 26.44%, reports 24.61%, ebooks 23.22%, templates 21.14%, waitlists/early access 19%, newsletters/updates 17.46%, discounts 16.2%. | [V] |
| **Timing** | Omnisend delay buckets: 0 to 1 s 1.9%, 1 to 5 s 2.3%, 6 to 10 s 2.4% (best), 11 to 15 s 2.1%, 16 to 30 s 1.9%, 31 to 60 s 1.8%. A Klaviyo practitioner recommends about a 5 s delay plus 20% scroll and never on page load. | [V] |
| **Countdown timer** | Conflicting: Omnisend 1.9% with vs 2.1% without (slightly worse). Wisepops 12.84% vs 4.73%. Fake timers are flagged as a deceptive dark pattern in the FTC's 2022 staff report (see 4h). | [V] / [S] |
| **Images** | Wisepops 5.71% vs 3.98%. Omnisend 2.2% vs 2.1%. Klaviyo -0.01 pt (email), not significant. | [V] |
| **Device** | Mobile beats desktop: Wisepops 4.98% vs 3.67%; Omnisend mobile 2.2% vs desktop-only 1.4%. | [V] |
| **Page targeting** | Omnisend URL-targeted 2.4% vs 2.0%. | [V] |
| **Teaser** | Klaviyo practitioner: "Don't skip the teaser." No number. Klaviyo excludes teaser-only views from submit rate. | [V] |
| **Button copy, first person** | "Start my free 30 day trial" vs "your": about 90% more clicks in the Unbounce/ContentVerve test; Aagaard reports 30 to 90% lifts across sites; Joanna Wiebe's replication found 24%. Primary data not found. | [S] |
| **Social proof counter on signup** | Recart tests across brands: a live subscriber count on the email step usually *lowered* email conversion. A case reported by Conversion.com found social proof lowered newsletter signups but raised order-page conversion. | [S] |
| **Reviews** | Spiegel Research Center (2017): a product with five reviews has 270% higher purchase likelihood than one with none; 380% for higher-priced items; purchase likelihood peaks at 4.0 to 4.7 stars; verified-buyer badges +15%; benefit diminishes after the first five reviews. | [V] |
| **Popups and annoyance** | NN/g (Kaley, 2019): never show a popup before users can get value; ask for email after interaction (finishing content, browsing a category); never stack popups; prefer nonmodal overlays. | [V] |
| **Mobile search** | Google Search Central: "Don't obscure the entire page with interstitials"; banners using "only a small fraction of the screen" are recommended and can be used for newsletter signups; intrusive dialogs "may lead to poor search performance." | [V] |

---

## 3. Lead magnets for parents and holiday traditions (Question 3)

### 3a. What the category leaders do

| Brand | Mechanic | Label |
|---|---|---|
| **Elf on the Shelf** (elfontheshelf.com) | Email capture framed as a "North Pole Newsletter" and "Be Part of Our Community" promising "exclusive elf ideas." Large "Explore Our Fun and Easy Ideas" library sorted by effort (easy last-minute, big-effort, crafts and printables, props, recipes). Free coloring pages. Scout Elf and pet "registries" as an ongoing membership layer. Bundles on product tiles. No reviews on the homepage. | [V] |
| **Elf on the Shelf scale** | Lumistella sold 28.3M Elf dolls and pets globally since 2005 (Bloomberg, 2023); company-linked sources now cite 31M+. Started as a self-published book plus doll sold by hand. | [S] |
| **Mensch on a Bench** | Hanukkah book plus doll ritual, created after the founder's son asked for an Elf on the Shelf. Brand site claims 325,000+ Jewish families. Ran an app and a giveaway on Kveller. Site refused connection this session. | [S] |
| **PJ Library** | Free age-matched Jewish book every month for children birth to 12, interfaith families welcome. Hanukkah hub with printables, a child-friendly Hanukkah story, crafts, recipes; downloadable Winter Holiday Guide. About 650,000 to 680,000 books mailed per month (sources differ on books vs children). Site refused connection this session. | [S] |
| **My Jewish Learning** | "All About Hanukkah" email series: one email field, "Subscribe Now," promises answers to three curiosity questions (what the name means, the origin story, where customs come from). Cadence not stated. | [V] |
| **Chabad.org** | "Eight Lights for Eight Nights" printable companion with insights, stories and activities per night; "Daily Tidbits: eight doses for the eight nights"; a Holiday Guide email sent before the holiday. | [S] |
| **Kveller** | Sponsored giveaways (Mensch on a Bench) and "free stuff" posts for Hanukkah activity books. | [S] |
| **Third-party printable blogs** | Coloring-page bundles gated behind email (This Tiny Blue House); Elf on the Shelf welcome/goodbye letters and countdown calendars as free kits. | [S] |

### 3b. Search demand for lead magnet topics [D]

Google Trends, US, web search, October 15 to December 31, 2025, summed daily index within one shared query:

- "hanukkah gifts" 1,342; "mensch on a bench" 234; "hanukkah books" 211; "hanukkah activities" 77; "hanukkah coloring pages" 75; "hanukkah crafts" 39; "hanukkah fairy" 0 (below Trends' threshold).
- Separate query: "elf on the shelf" 1,681; "elf on the shelf ideas" 595; "hanukkah gifts" 11 at that scale. "Elf on the shelf ideas" is about 35% of the brand term and about 54 times "hanukkah gifts."

**Reading [I]:** Parents running a nightly hide-and-seek ritual search for *ideas*, every night. Hanukkah has no equivalent "ideas" franchise yet. Brand search for "hanukkah fairy" is not measurable, so visitors will arrive from Amazon, social, referrals and press, not search. The capture system has to convert cold-ish traffic on first visit.

### 3c. Recommended lead magnet [I]

**"The Fairy's 8-Night Kit," delivered instantly, followed by eight nightly Fairy Mail notes (Dec 4 to 11).**

- Eight hiding-spot cards (one per night, rising difficulty for ages 3 to 10).
- Eight kindness missions matched to the book's themes (belonging, courage, kindness).
- A "Leave a little nosh" note and a "The Fairy was here" reply note.
- One coloring page per character (Fairy, Pup, Grizzlebottom, the angel in sneakers).
- A personalized letter from the Fairy, generated in the browser from the child's first name so the name is never stored (privacy-preserving personalization; see section 8).
- Format: a single printable PDF plus a mobile page for parents who do not print.

Why this offer: it maps to the two strongest MailerLite categories (learning resources and templates/interactive), it uses the ritual the site already sells, it creates a reason to open email every night of the holiday, and it needs no discount on a book that is sold through Amazon and Apple Books where the brand does not control price. [I, grounded in the [V] data above]

---

## 4. Behavioral principles, each tied to a pattern (Question 4)

### 4a. Reciprocity
- **Research:** Regan (1971, *Journal of Experimental Social Psychology* 7:627-639): participants given an unsolicited Coke bought roughly twice as many raffle tickets from the giver, even when they disliked him. [S]
- **Pattern [I]:** Give before asking. The reader's final spread becomes a gift: "The Fairy left something for you," with a free sample card visible *before* the email field. Never gate the storybook itself.

### 4b. Commitment and consistency (foot in the door)
- **Research:** Freedman and Fraser (1966, *JPSP* 4:195-202): people who first agreed to a small request were far more likely to accept a large one (reported 76% vs 17% in the sign study). A later commentary puts typical lifts at 5 to 15 points. [S]
- **Pattern [I]:** Step 1 asks only for email. Step 2 (optional) asks a one-tap context question: "Who are you reading with?" (ages 3 to 5 / 6 to 8 / 9 to 10 / I'm a grandparent / it's a gift). Answers drive personalization (Caden Lane pattern, [V]).

### 4c. Social proof
- **Research:** Goldstein, Cialdini and Griskevicius (2008, *JCR*): hotel signs saying most guests reuse towels raised reuse to 44.1% from 35.1% (about +26%). The same-room norm reached 49.3% vs 37.2% for the standard message (about +33%). Norms work best when they match the reader's situation. [V, from the paper's text]
- **Reviews:** Spiegel (2017): five reviews raise purchase likelihood 270%; 4.0 to 4.7 stars beats 5.0. [V]
- **Caution:** Subscriber counters often lower signup rates, especially when small. [S]
- **Pattern [I]:** Use situational, parent-to-parent proof drawn from real submissions only (for example, after Night 1: "Families like yours hid the Fairy in the cereal box"), real Amazon star rating once there are five or more reviews, and named educator or rabbi quotes. Do not show a subscriber count until it is large.

### 4d. Endowed progress
- **Research:** Nunes and Drèze (2006, *JCR* 32:504-512): a car-wash card needing 8 stamps with none given was completed by 19%; a 10-stamp card with 2 pre-stamped was completed by 34%. Works best when there is a reason for the head start. [S]
- **Pattern [I]:** After signup show "Night 1 is ready" with the first card already unlocked, and an 8-night tracker with night 1 filled. Step 2 of the form shows "Step 2 of 2, almost done."

### 4e. Goal gradient
- **Research:** Kivetz, Urminsky and Zheng (2006, *JMR* 43:39-58): coffee-card customers bought about 20% faster as they neared the reward; a 12-stamp card with 2 bonus stamps was completed faster (median 10 vs 15 days) than a plain 10-stamp card. [S]
- **Pattern [I]:** Nightly emails carry a visible progress line ("Night 6 of 8. Two hiding spots left"). Night 8 promises a finale (a certificate, a reply letter from the Fairy).

### 4f. Zeigarnik and Ovsiankina effects
- **Research:** A 2025 meta-analysis (Ghibellini and Meier, *Humanities and Social Sciences Communications*) found **no** general memory advantage for unfinished tasks (Zeigarnik) but a general tendency to **resume** interrupted tasks (Ovsiankina). [S]
- **Pattern [I]:** Do not rely on "people remember unfinished things." Rely on resumption: a saved reader position ("Pick up where you left off: page 7"), and nightly emails that end with tomorrow's teaser.

### 4g. Peak-end rule
- **Research:** Kahneman, Fredrickson, Schreiber and Redelmeier (1993, *Psychological Science* 4:401-405): most participants chose to repeat a longer cold-water trial that ended less painfully. Remembered experience is weighted to the peak and the end. [S]
- **Pattern [I]:** The current end of the reader is a five-element form, which makes the last moment of the best experience on the site a chore. Make the end the peak: a reveal animation, the free kit, one email field. Same for the holiday: a Night 8 finale email and a December 12 "What did the Fairy see?" wrap.

### 4h. Loss aversion and urgency (real deadlines only)
- **Research:** Scarcity raises perceived value (Worchel, Lee and Adewole 1975, *JPSP* 32:906-914, cookies from a near-empty jar rated more desirable). [S] The FTC's 2022 staff report "Bringing Dark Patterns to Light" lists countdown timers on offers that are not time-limited and false low-stock claims as deceptive. [S]
- **Pattern [I]:** Use the calendar's real deadlines: "First candle in 6 days," "Order by [date] to arrive by the first night." No fake timers, no invented stock levels (PRODUCT.md already forbids inventing stock claims [V, repo]).

### 4i. Default effects
- **Research:** Johnson and Goldstein (2003, *Science* 302:1338-1339): consent rates differ sharply between opt-out and opt-in regimes; later commentary notes actual donation differences are smaller than the famous chart. [S]
- **Pattern [I]:** Defaults here mean removing needless choices: preselect the most common reader age in step 2 only as a visible, changeable option; make the recommended gift bundle the default highlighted tier; default nightly emails to the recipient's local afternoon. Never pre-check marketing consent for SMS (see section 8).

### 4j. Fogg Behavior Model (B = MAP)
- **Source:** behaviormodel.org: "Behavior happens when Motivation, Ability, and a Prompt come together at the same time." [V]
- **Diagnosis [I]:** Motivation peaks in the ritual section and at the end of the reader. Ability is low (five inputs). The prompt appears in only one place, at the bottom. Fix all three: prompts at motivation peaks, one-field ability, and nightly prompts during the holiday.

### 4k. Implementation intentions (added; not in the brief but directly useful)
- **Research:** Gollwitzer and Sheeran (2006) meta-analysis of 94 tests reported d = 0.65 for if-then plans; a 2024 update of 642 tests found smaller bias-corrected effects (d = 0.15 to 0.35). [S]
- **Pattern [I]:** The December 3 email asks parents to pick tonight's hiding spot and reading time ("After dinner, before candles, we read. The Fairy hides in ___"). Small, real effect at zero cost.

### 4l. Choice architecture for gift buyers
- **Compromise effect:** Simonson (1989, *JCR* 16:158-174): an option gains share when it sits between alternatives, and the effect is stronger when people expect to justify the choice to others, which describes gift buyers. [S]
- **Choice overload:** Iyengar and Lepper (2000): 24 jams drew more tasters but 3% bought vs 30% with 6 jams. Scheibehenne et al. (2010) meta-analysis of 50 experiments found a mean effect near zero with large variance. [S] Read as: overload is real only under some conditions, so keep the gift choice to three clear tiers rather than banning choice.
- **Pattern [I]:** Three tiers: Book / Book + plush pal (labeled "Most-given first-night gift" only if that becomes true; until then "Our pick") / Full collection. Add a "Buying for a grandchild?" path with ship-to-family and gift-message notes.

---

## 5. Gift commerce evidence (Question 5)

| Topic | Evidence | Label |
|---|---|---|
| **Bundles** | No peer-reviewed effect size found. Vendor figures: Kard claims +55% AOV and +86% revenue per user; a Cartylabs archetype reports +16% AOV, +27% units per order. All self-reported. | [S] |
| **Gift guides** | No primary data found on gift-guide usage or conversion. Gift-idea searches historically accelerated after Black Friday and peaked a week before Christmas (Think with Google, older data). | [S] |
| **Ship-by deadlines** | Baymard: 20% of abandoners (excluding "just browsing") left because delivery was too slow; 40% because of extra costs; 12% couldn't see total cost up front (page updated Oct 28, 2026). | [V] |
| **Delivery date vs speed** | Baymard recommends showing an estimated delivery *date* per shipping option instead of a speed; eye-tracking showed users ignore shipping names and read dates. | [S] |
| **USPS 2026** | Contiguous US send-by dates for delivery before Dec 25: Ground Advantage and First-Class Thu Dec 17, Priority Mail Fri Dec 18, Priority Express Sat Dec 19. No business-day window stated. | [V] |
| **Reviews and UGC** | Spiegel: see 2. PowerReviews 2025 survey (21,279 consumers): 95% regularly read reviews; 2024 survey: 60% always look for shopper photos/videos. "Visitors who interact with UGC convert 106% higher" is correlational (self-selected). | [V] Spiegel, [S] PowerReviews |
| **Where people shop** | NRF survey Oct 1 to 7, 2026 (8,094 adults): 43% start before November; 64% likely to do most shopping Thanksgiving weekend; books and other media are on 25% of wish lists; online is the top destination at 53%. No Hanukkah-specific figures. | [V] |
| **Audience size** | Pew (2020 data): about 7.5M Jewish Americans including 1.8M children [S]; 80% of US Jews own a menorah [V]; among intermarried Jewish parents, 28% raise children Jewish by religion and 29% raise at least one child Jewish but not by religion [V]. | mixed |

**Ship-by math for Hanukkah 2026 [I]:** USPS's Christmas buffer is 8 days for Ground Advantage (Dec 17 to 25) and 7 days for Priority (Dec 18 to 25). The same buffer against the first candle (Dec 4) gives Ground Advantage Nov 26, which is Thanksgiving, so effectively **Wed Nov 25**, and Priority **Fri Nov 27**. Against Night 8 (Dec 11): Ground **Thu Dec 3**, Priority **Fri Dec 4**. Subtract the Shopify store's handling time to get the customer-facing "order by" date, and confirm with the fulfillment partner before publishing any date. Amazon and Apple Books delivery is controlled by those retailers; Apple Books is instant and is the honest last-minute answer.

**Dependency [V, repo]:** PRODUCT.md and the FAQ state the plush pals and boxed collection are still in development and purchase controls stay hidden until a verified retailer URL exists. Bundle recommendations apply only once a bundle is actually purchasable.

---

## 6. Seasonality (Question 6)

### 6a. Verified dates

| Event | Date | Label |
|---|---|---|
| Hanukkah 2026 first candle | Friday, Dec 4, 2026, "Light 1 candle before sundown" (it is Friday, so before Shabbat) | [V] Hebcal |
| Last (8th) candle | Friday, Dec 11, 2026, "Light 8 candles before sundown" | [V] Hebcal |
| Holiday ends | Nightfall Saturday, Dec 12, 2026 | [V] Hebcal |
| Thanksgiving / Black Friday / Cyber Monday | Nov 26 / Nov 27 / Nov 30, 2026 | [I, calendar arithmetic] |
| Hanukkah 2027 | Begins sundown Friday Dec 24, 2027; ends nightfall Saturday Jan 1, 2028 | [V] Hebcal |

### 6b. Google Trends method [D]

Pulled on Nov 10, 2026 from Google Trends (US, web search) through the Trends explore endpoint in a logged-in browser tab. Weekly series June 2021 to May 2026; weeks start Sunday. Week 0 is the week containing the first night. Each season is rescaled so its highest week between 8 weeks before and 2 weeks after the first night equals 100. Low-volume daily series were too noisy to use.

**"hanukkah gifts"**

| First night | -6 | -5 | -4 | -3 | -2 | -1 | 0 | +1 |
|---|---|---|---|---|---|---|---|---|
| 2021, Sun Nov 28 | 5 | 8 | 13 | 16 | 29 | 31 | **100** | 66 |
| 2022, Sun Dec 18 | 14 | 25 | 27 | 44 | 66 | 83 | **100** | 17 |
| 2023, Thu Dec 7 | 6 | 9 | 15 | 22 | 30 | 59 | **100** | 43 |
| 2024, Wed Dec 25 | 21 | 28 | 30 | 49 | 77 | **100** | **100** | 30 |
| 2025, Sun Dec 14 | 16 | 22 | 25 | 27 | 51 | 88 | **100** | 29 |

**"hanukkah books"**

| First night | -6 | -5 | -4 | -3 | -2 | -1 | 0 | +1 |
|---|---|---|---|---|---|---|---|---|
| 2021 | 0 | 10 | 16 | 22 | 24 | 38 | **100** | 28 |
| 2022 | 22 | 30 | 30 | 80 | 93 | 86 | **100** | 16 |
| 2023 | 14 | 9 | 19 | 24 | 31 | 66 | **100** | 63 |
| 2024 | 33 | 48 | 54 | **100** | 87 | 89 | 76 | 20 |
| 2025 | 12 | 24 | 29 | 40 | 65 | 72 | **100** | 40 |

**"hanukkah" (general interest)**

| First night | -6 | -5 | -4 | -3 | -2 | -1 | 0 | +1 |
|---|---|---|---|---|---|---|---|---|
| 2021 | 3 | 5 | 8 | 9 | 14 | 27 | **100** | 27 |
| 2022 | 7 | 10 | 13 | 23 | 29 | 48 | **100** | 29 |
| 2023 | 4 | 5 | 8 | 12 | 16 | 31 | **100** | 59 |
| 2024 | 5 | 8 | 10 | 19 | 23 | 35 | **100** | 31 |
| 2025 | 5 | 8 | 11 | 13 | 28 | 41 | **100** | 41 |

**Findings [D]:**
- Gift search peaks in the first-night week in every year; demand is back-loaded. Four weeks out it runs 13 to 30% of peak.
- When Hanukkah lands near Thanksgiving (2021, 2023), the run-up is shorter and steeper: the week before ran 31 to 59%.
- Book search starts earlier and is noisier (2024 peaked three weeks before the first night, when Hanukkah fell on Christmas).
- Interest holds at 29 to 66% of peak in the week after the first night because gifts span eight nights.

**Projection for 2026 [I]:** Peak gift week Sun Nov 29 to Sat Dec 5. Thanksgiving week (Nov 22 to 28) likely 30 to 60% of peak. Nov 15 to 21 likely 15 to 30%. Hanukkah 2027 falls on Christmas Eve, so next year's plan is a different shape (closest analog: 2024).

### 6c. Dated timeline (all ET)

| Step | Dates | Goal | Actions [I] |
|---|---|---|---|
| **Step 1: Instrument and fix the form** | Tue Nov 10 to Sun Nov 15 | Baseline, stop leakage | GTM events live (form views, submits, reader depth, outbound buy clicks). Connect an email platform. Cut the form to email only. Fix "launch emails" copy. Ship the welcome email that delivers *something* even before the kit is done. |
| **Step 2: Launch the kit** | Mon Nov 16 to Sat Nov 21 | Build the list in the 15 to 30% demand window | 8-Night Kit live. Click-triggered entry points in hero, ritual section and mid-reader. Behavior-triggered nonmodal flyout. Welcome series (3 emails) live. Pitch the kit to Jewish parenting outlets as a free resource (Kveller, PJ Library partner communities, local JCC newsletters). |
| **Step 3: Peak gifting** | Sun Nov 22 to Thu Dec 3 | Convert gift intent; keep capturing | Ship-by module with real dates (assuming 2 days of handling: Ground order-by around Mon Nov 23, Priority around Wed Nov 25; confirm with the fulfillment partner before publishing). Cyber Monday Nov 30 email to the list. Dec 3 "Tomorrow night" planning email (implementation intention). Hero swaps to "First candle Friday." |
| **Step 4: The eight nights** | Fri Dec 4 to Fri Dec 11 | Engagement peak; late signups | Nightly Fairy Mail. Friday sends (Dec 4, Dec 11) go out in the morning because candles are lit before sundown on Friday. Avoid Saturday daytime sends for observant households; send Night 2 Saturday after nightfall or fold it into Friday morning [I]. Late signups get "Tonight is Night N" and jump in. Gift messaging shifts to "for the remaining nights" and Apple Books instant. |
| **Step 5: The end** | Sat Dec 12 to Thu Dec 31 | Peak-end, reviews, UGC | Dec 12 or 13 finale email: "What did the Fairy see?" Ask for Amazon reviews (target 5+, the Spiegel threshold). Invite photos of hiding spots (with consent, no children's faces required). |
| **Step 6: Off-season** | Jan to Aug 2027 | Keep warm, evergreen capture | Monthly at most. Evergreen kindness kit as the off-season magnet. Plan 2027 around Christmas Eve overlap and interfaith families. Restart full capture early September 2027. |

---

## 7. Welcome and nurture (Question 7)

### 7a. Benchmarks

| Metric | Number | Source | Label |
|---|---|---|---|
| Welcome email click rate | 6.5% average, 13.3% top performers | Klaviyo 2026 Omnichannel Benchmarks (via Klaviyo blog) | [V] |
| Welcome revenue per recipient | $5.75 average, $13.27 top performers | same | [V] |
| All flows (2026) | Open 32.2% good / 45.8% top 10%; click 5.58% / 10.48% | Klaviyo benchmarks page, 183,000+ customers | [V] |
| Flow placed-order rate, toys and hobbies | 1.75% (campaigns 1.07%) | Klaviyo benchmarks page | [V] |
| Automation vs campaigns | Automations were 2% of sends and 30% of email revenue; $2.87 vs $0.18 revenue per send; welcome and abandoned cart drove 76% of automation orders | Omnisend 2026 report (2025 data, 150,000 brands, 27B emails) | [V] |
| Welcome conversion | About 2% (Omnisend 2025); about 3% in an older Omnisend set | Stripo compilation | [S] |
| Welcome open / click | 83.63% open, 16.60% click (single welcome); 51.05% / 5.59% across autoresponder series | GetResponse via Stripo (Aug 2026) | [S] |
| Series vs single | A series earns about 51% more revenue than one welcome email | "one Mailchimp analysis" via Stripo, no primary | [S] |
| Timing | Send immediately; most buyers purchase within 10 days of subscribing; at least a day between emails; keep welcome subscribers out of regular campaigns | Klaviyo welcome-email post | [V] |
| First email window | Within 30 minutes, then two more the same week | Omnisend guidance | [S] |
| Opens are unreliable | Apple Mail Privacy Protection inflates opens; judge on clicks and orders | Stripo, Klaviyo-based playbook | [S] |

### 7b. Proposed sequence [I]

| # | When | Job | Content |
|---|---|---|---|
| W1 | Immediately | Deliver, reciprocity | The 8-Night Kit download and mobile link. How the tradition works in four lines (Read, Find the Fairy, Get a treat, Leave a nosh). "First candle Friday, Dec 4." One soft link to the book. |
| W2 | +1 day | Meet the cast, read-aloud | A short illustrated cast intro and one read-aloud tip by age band (uses the step 2 answer). |
| W3 | +3 days | The gift | Book on Amazon / Apple Books; for grandparents, ship to the family; real order-by dates; plush only if purchasable. |
| P1 | Thu Dec 3 | Plan | "Tomorrow night." Pick tonight's hiding spot and reading time (if-then plan). |
| N1 to N8 | Dec 4 to Dec 11 | Ritual | One email per night: hiding-spot idea, kindness mission, one rhyme from the book, progress line ("Night 3 of 8"). Very short. |
| F1 | Dec 12 or 13 | Peak-end | Finale, certificate, review ask, photo invite. |

Late signups (after Dec 4) skip W2 and W3 and join the nightly run at the current night. Signups after Dec 12 get an evergreen welcome. Suppress the nightly run from anyone who already bought through a tracked link only if purchase data is available; otherwise do not guess.

---

## 8. Compliance notes (not legal advice; route to counsel)

| Issue | What the source says | Implication [I] | Label |
|---|---|---|---|
| **Email consent (US)** | FTC CAN-SPAM guide: an opt-out regime; "you don't need to get members' consent to send them marketing emails"; requirements are accurate headers, honest subject lines, ad disclosure, a physical postal address, a clear opt-out, and honoring opt-outs within 10 business days. | A required consent checkbox is not required by CAN-SPAM. A clear disclosure under the button can replace it for US email. GDPR or Canadian (CASL) visitors need separate handling. | [V] |
| **"I'm a grown-up" checkbox and COPPA** | FTC COPPA FAQ: a check box stating "I am over 12 years old" "would not be considered a neutral age-screening mechanism"; age screens must not encourage falsifying age; a site is not child-directed "just because some children visit"; factors include subject matter, visual content and actual audience. | If counsel judges the site general audience (PRODUCT.md says the primary audience is parents), no age screen is needed and the checkbox can go. If counsel judges it mixed audience (the storybook reader is child-appealing), the current checkbox is the wrong mechanism and a neutral age screen or a parent-only capture design is needed. Decide before scaling capture. | [V] |
| **Phone field and SMS** | Marketing texts need express written consent: an unchecked, separate box, explicit "marketing" language, phone not required, not a condition of purchase. | The current form collects phone under consent language that mentions only emails. Remove the phone field until a compliant SMS program exists. | [S] |
| **Child's name in the personalized letter** | Not researched against the rule text. | Generate the letter in the browser and do not transmit or store the name. | [I] |
| **Fake urgency** | FTC 2022 dark patterns report flags fake timers and false scarcity. | Only real dates. | [S] |

---

## 9. Diagnosis of the current page [I unless marked]

1. **One prompt, at the bottom.** The only form is at the end of the storybook (index.html:616), plus a nav link to it. Most visitors never see it.
2. **Wrong offer.** "Book news, character mischief, and the first word on our plush pals" is a newsletter promise, the second-weakest offer class in MailerLite's data. [V data]
3. **High friction.** Email, name, mailing address, phone and a required checkbox. Optional labels still read as effort, and a street address is a heavy ask with no stated reason.
4. **Stale and anxious consent copy.** "Launch emails" after launch; "I'm a grown-up" reads as a legal hurdle at the emotional high point of the story.
5. **No follow-through.** Signups go to a CSV and receive no email (README.md). [V, repo]
6. **No proof.** No reviews, ratings, quotes or press.
7. **No calendar awareness.** Nothing on the page says the first candle is Friday, December 4, or how to get the book in time.
8. **The best hook is buried.** "She hides. You seek. Be kind. Get a treat." is the product's reason to exist and the natural lead magnet, and it has no call to action of its own.

---

## 10. The 12 highest-leverage changes, ranked

Ranked by expected impact on signups and engagement for this season. Effect estimates are inference anchored to the cited data, not predictions.

| Rank | Change | Principle | Evidence |
|---|---|---|---|
| 1 | **Replace the newsletter promise with "The Fairy's 8-Night Kit"** (printables plus eight nightly notes), shown as a visible free sample before the email field. | Reciprocity; value exchange | MailerLite: newsletters 17.46% vs learning resources 27.4%, giveaways 29.37% [V]; "elf on the shelf ideas" demand [D]; Elf on the Shelf, Chabad, PJ Library patterns [V]/[S] |
| 2 | **One field, then an optional one-tap step 2** ("Who are you reading with?"). Drop name, address and phone from signup. | Fogg ability; foot in the door; personalization | Omnisend: 4 fields 1.5% vs 1 to 3 fields 2.1 to 2.2% [V]; multi-step +12% Wisepops [V]; Caden Lane context [V] |
| 3 | **Prompts at motivation peaks:** a "Get the free 8-Night Kit" button in the hero, the ritual section and mid-reader, each opening a one-field click-triggered modal. | Fogg prompt; NN/g ask after engagement | Click-triggered 54.42% avg (Wisepops) [V]; two-step 4.1% (Sumo) [S]; NN/g [V] |
| 4 | **Connect an email platform and send W1 instantly** (kit delivery). | Reciprocity; most purchases within 10 days | Klaviyo welcome RPR $5.75 avg [V]; Omnisend automations 30% of revenue from 2% of sends [V]; README shows no sending today [V] |
| 5 | **"8 Nights of Fairy Mail" nightly sequence, Dec 4 to 11,** with progress line and Shabbat-aware send times. | Goal gradient; endowed progress; Ovsiankina resumption; peak-end | Kivetz 2006 [S]; Nunes and Drèze 2006 [S]; 2025 Zeigarnik meta-analysis [S] |
| 6 | **One behavior-triggered, nonmodal capture:** mobile bottom sheet or desktop flyout after 6 to 10 s plus about 40% scroll or reader page 4; once per session; remembers dismissal; desktop-only exit intent. Test a "spin the dreidel to reveal tonight's hiding spot" variant (content reward, no prize). | Prompt timing; annoyance control | Omnisend 6 to 10 s best [V]; Google banners guidance [V]; NN/g [V]; gamified lifts (confounded) [V] |
| 7 | **First-person, benefit button and honest disclosure:** "Send my 8-night kit"; replace the required "launch emails" checkbox with a line under the button after counsel signs off on COPPA. | Ownership framing; friction removal | Aagaard tests 30 to 90%, replication 24% [S]; CAN-SPAM [V]; COPPA FAQ [V] |
| 8 | **Make the end of the reader a peak:** the Fairy "leaves" the kit with a short reveal; one field; no other inputs. Save reader position for return visits. | Peak-end; reciprocity; resumption | Kahneman et al. 1993 [S]; 2025 meta-analysis [S] |
| 9 | **Real social proof, situational and specific:** Amazon star rating once 5+ reviews exist; named parent, educator or rabbi quotes; "families like yours" hiding-spot UGC after Night 1. No subscriber counter. | Social proof | Spiegel 270% at 5 reviews, 4.0 to 4.7 sweet spot [V]; Goldstein 2008 +26 to +33% [V]; Recart counters hurt [S] |
| 10 | **Calendar and ship-by module:** "First candle Friday, Dec 4," honest order-by dates per retailer, Apple Books as the instant option, Night 8 as the late-gift deadline. | Loss aversion with real deadlines | Baymard: slow delivery 20%, extra costs 40% [V]; delivery date over speed [S]; USPS 2026 dates [V]; FTC dark patterns [S] |
| 11 | **Gift choice architecture:** three tiers with a highlighted middle; "Buying for a grandchild?" path with ship-to-family and gift note. Only with purchasable items. | Compromise effect; limited choice | Simonson 1989 [S]; Iyengar and Lepper / Scheibehenne [S]; bundle AOV vendor data only [S] |
| 12 | **Measurement first in sequence:** GTM events for form view, form start, submit, step-2 answer, kit download, reader depth (25/50/75/100%), outbound clicks to Amazon, Apple Books and Shopify; one A/B test at a time on the flyout. | You cannot manage what has no baseline | Empty GTM container per brief; Omnisend found A/B-tested forms no better on average (2.0% vs 2.1%), so test only big, distinct ideas [V] |

Ranked 12th on direct impact, but do it first, because every other change needs it to be judged.

---

## 11. What I could not verify

- PJ Library and Mensch on a Bench sites refused connection; their figures are secondary.
- No primary data on gift-guide usage, bundle lifts in peer-reviewed research, or Hanukkah-specific retail spending.
- No published Hanukkah-specific Google Trends commentary; section 6b is my own pull.
- The Expedia "removing one field earned $12M" story: no source found. Do not cite.
- Exact numbers in Freedman and Fraser (1966), Nunes and Drèze (2006) and Regan (1971) come from secondary descriptions; the papers' PDFs were scanned images or not opened.
- Klaviyo's "top 10% of popups convert at 7.8%" did not appear on the Klaviyo page that was said to contain it. Do not cite.
- USPS publishes no business-day window for Ground Advantage; the Hanukkah ship-by dates in section 5 are inference from USPS's Christmas buffers.

---

## 12. Sources

**Benchmarks and form research**
- Omnisend, Email popup performance in 2025 (Feb 9, 2026): https://www.omnisend.com/blog/email-popup-statistics/
- Wisepops, popup stats (Sep 30, 2025): https://wisepops.com/blog/popup-stats
- Sumo / BDOW email signup benchmarks: https://bdow.com/stories/email-signup-benchmarks/
- Klaviyo UK, sign-up form best practice (Aug 29, 2023): https://www.klaviyo.com/uk/blog/sign-up-form-best-practice-convert-visitors-into-customers
- Klaviyo, sign-up form best practices (Aug 6, 2026): https://www.klaviyo.com/blog/sign-up-form-best-practices
- Klaviyo, list growth strategies (Caden Lane): https://www.klaviyo.com/blog/email-sms-list-growth-strategies
- Klaviyo help, signup form analytics: https://help.klaviyo.com/hc/en-us/articles/360015960712
- MailerLite, lead magnet statistics (Mar 13, 2026): https://www.mailerlite.com/blog/best-lead-magnet-statistics
- Unbounce 2024 Conversion Benchmark Report press release: https://prnewswire.com/news-releases/unbounces-2024-conversion-benchmark-report-proves-that-attention-spans-are-declining-and-so-are-conversion-rates-302239407.html
- HubSpot, form fields and landing page conversions: https://blog.hubspot.com/blog/tabid/6307/bid/6746/which-types-of-form-fields-lower-landing-page-conversions.aspx
- CXL, should you reduce form fields: https://cxl.com/blog/reduce-form-fields/
- ClickZ, me vs you pronouns in CTAs: https://clickz.com/me-vs-you-how-pronouns-affect-click-conversion-rates/32596/
- Recart, subscriber count widget test: https://recart.com/laboratory/weekly-subscriber-count-widget-email-test
- Conversion.com, removing social proof: https://info.conversion.com/boosting-sign-ups-and-orders-by-removing-social-proof
- Nielsen Norman Group, Popups: 10 problematic trends (2019): https://www.nngroup.com/articles/popups/
- Google Search Central, avoid intrusive interstitials: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials

**Lead magnets and category examples**
- Elf on the Shelf: https://www.elfontheshelf.com/
- Bloomberg on Lumistella (2023): https://www.bloomberg.com/news/features/2023-12-20/the-company-behind-elf-on-the-shelf-s-christmas-domination
- Mensch on a Bench, Mensch 101: https://themenschonabench.com/the-mishpacha-mensch-101
- Forward on the Mensch on a Bench app: https://forward.com/schmooze/323701/mensch-yourself-this-hanukkah-with-the-mensch-on-a-bench-app
- Kveller, Mensch on a Bench giveaway: https://www.kveller.com/sponsored-win-the-mensch-on-a-bench-for-hanukkah/
- PJ Library: https://www.pjlibrary.org/Home and one-pager https://pjlibrary.org/one-page-pdf
- Harold Grinspoon Foundation on PJ Library: https://hgf.org/what-we-do/pj-library/
- My Jewish Learning, All About Hanukkah email series: https://www.myjewishlearning.com/sign-up-for-our-email-series-all-about-hanukkah/
- Chabad.org Daily Tidbits: https://www.chabad.org/holidays/chanukah/article_cdo/aid/104269/jewish/Daily-Tidbits.htm
- Chabad Eight Lights for Eight Nights PDF: https://www.betemunah.org/Eight_Lights_for_Eight_Nights.pdf
- Kveller free Hanukkah activity book: https://www.kveller.com/free-stuff-alert-hanukkah-activity-book-card-games/

**Behavioral research**
- Fogg Behavior Model: https://behaviormodel.org/
- Goldstein, Cialdini, Griskevicius (2008) PDF: https://carlsonschool-d8.prd.umn.edu/sites/carlsonschool.umn.edu/files/2018-10/118359.pdf
- Nunes and Drèze (2006) summary: https://www.coglode.com/nuggets/endowed-progress-effect
- Kivetz, Urminsky, Zheng (2006): https://business.columbia.edu/faculty/research/goal-gradient-hypothesis-resurrected-purchase-acceleration-illusionary-goal
- Ghibellini and Meier (2025) Zeigarnik/Ovsiankina meta-analysis: https://ideas.repec.org/a/pal/palcom/v12y2025i1d10.1057_s41599-025-05000-w.html
- Kahneman et al. (1993): https://ius.uzh.ch/dam/jcr:5ae9adc9-61ec-4174-b37c-4b752f36c23b/Kahnemann%20et%20al.%20-%20When%20More%20Pain%20is%20Preferred%20to%20Less%20(1993).pdf
- Freedman and Fraser (1966): https://pubmed.ncbi.nlm.nih.gov/5969145/
- Johnson and Goldstein (2003) discussion: https://thedecisionlab.com/insights/health/can-defaults-save-lives-the-power-of-default-options-on-life-saving-decisions
- Worchel, Lee, Adewole (1975): https://stafforini.com/works/worchel-1975-effects-supply-demand/
- Simonson (1989): https://econpapers.repec.org/RePEc:oup:jconrs:v:16:y:1989:i:2:p:158-74
- Scheibehenne, Greifeneder, Todd (2010): https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf
- Gollwitzer and Sheeran (2006) and 2024 update, summary: https://www.thebehavioralscientist.com/glossary/implementation-intentions
- Regan (1971) description: https://persuasion-and-influence.blogspot.com/2015/01/cheers-to-that-reciprocity-effect-in.html

**Commerce, reviews, shipping**
- Spiegel Research Center, How Online Reviews Influence Sales: https://spiegel.medill.northwestern.edu/How-Online-Reviews-Influence-Sales
- PowerReviews, visual UGC: https://www.powerreviews.com/how-user-generated-visual-content-impacts-purchase-behavior/
- PowerReviews 2024 report release: https://prnewswire.com/news-releases/unlocking-consumer-confidence-60-of-shoppers-always-search-for-user-generated-product-visuals-before-committing-to-a-purchase-up-from-50-in-2021-302060281.html
- Baymard, cart abandonment (updated Oct 28, 2026): https://baymard.com/lists/cart-abandonment-rate
- Baymard, delivery date vs shipping speed: https://baymard.com/blog/shipping-speed-vs-delivery-date
- USPS 2026 holiday shipping deadlines: https://www.usps.com/holiday/holiday-shipping-dates.htm
- NRF 2026 holiday survey: https://nrf.com/media-center/press-releases/affordability-shapes-winter-holiday-shopping-according-to-nrf-holiday-survey
- NRF 2025 Thanksgiving weekend survey: https://nrf.com/media-center/press-releases/thanksgiving-weekend-expected-to-draw-largest-number-of-shoppers-on-record
- Bundle vendor data (Kard via eCommerce Fastlane): https://ecommercefastlane.com/how-shopify-bundles-drive-aov-increases/
- Cartylabs bundle archetype: https://cartylabs.com/case-studies/home-goods-bundles-units-per-order/
- Think with Google, holiday searches: https://thinkwithgoogle.com/consumer-insights/consumer-trends/holiday-shopping-insights

**Seasonality and audience**
- Hebcal, Chanukah 2026: https://www.hebcal.com/holidays/chanukah-2026
- Hebcal, Chanukah 2027: https://www.hebcal.com/holidays/chanukah-2027
- Google Trends (pulled Nov 10, 2026): https://trends.google.com/trends/explore?geo=US&q=hanukkah%20gifts
- Pew, Jewish Americans in 2020: https://www.pewresearch.org/religion/2021/05/11/jewish-americans-in-2020/
- Pew, Jewish practices and customs: https://www.pewresearch.org/religion/2021/05/11/jewish-practices-and-customs/
- Pew, marriage, families and children: https://www.pewresearch.org/religion/2021/05/11/marriage-families-and-children/

**Email nurture**
- Klaviyo, welcome email examples (2026 Omnichannel Benchmarks): https://www.klaviyo.com/blog/welcome-email-examples
- Klaviyo, benchmarks by industry: https://www.klaviyo.com/marketing-resources/email-benchmarks-by-industry
- Omnisend 2026 Ecommerce Marketing Report: https://www.omnisend.com/2026-ecommerce-marketing-report
- Stripo Research, welcome email benchmarks (Aug 2026): https://research.stripo.email/welcome-email-open-rates

**Compliance**
- FTC, CAN-SPAM compliance guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- FTC, COPPA FAQ: https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions
- AWS, SMS marketing opt-in requirements: https://docs.aws.amazon.com/sms-voice/latest/userguide/registration-help-optin-marketing.html
- FTC dark patterns report summary (Venable): https://www.venable.com/insights/blogs/2022/09/the-ftc-brings-more-light-to-dark-patterns-in-new

**Repo files read (local)**
- /Users/parzvl/hanukkah-fairy-website/site/index.html (signup form at lines 600 to 704; ritual section from line 361)
- /Users/parzvl/hanukkah-fairy-website/site/PRODUCT.md
- /Users/parzvl/hanukkah-fairy-website/site/README.md
