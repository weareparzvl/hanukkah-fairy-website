---
name: The Hanukkah Fairy
description: An illustrated storybook launch world built from the approved book artwork.
colors:
  paper: "#fff8ee"
  ink: "#132447"
  blue: "#1254cf"
  yellow: "#f6f34a"
  line: "#13244730"
  white: "#ffffff"
  product-blush: "#ffdae8"
  ritual-aqua: "#c7eff1"
  fairy-sky: "#bde6ff"
  pup-gold: "#ffd27a"
  angel-lilac: "#e5d7fa"
  troll-pink: "#ff75b5"
  midnight: "#102754"
  night-card: "#203e6b"
  reader-paper: "#fffaf0"
  reader-left: "#f1e7cc"
  field-paper: "#fffef9"
  field-border: "#b8c2d0"
  button-hover: "#274b87"
  yellow-hover: "#ffff80"
typography:
  headline:
    fontFamily: '"Bricolage Grotesque", "DM Sans", sans-serif'
    fontSize: "clamp(56px, 8.6vw, 144px)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  title:
    fontFamily: '"Bricolage Grotesque", "DM Sans", sans-serif'
    fontSize: "clamp(32px, 4vw, 66px)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: '"DM Sans", Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  reader-quote:
    fontFamily: '"Bagel Fat One", Georgia, serif'
    fontSize: "clamp(28px, 3vw, 44px)"
    fontWeight: 400
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  button:
    fontFamily: '"DM Sans", Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.35
rounded:
  control: "4px"
  page: "8px"
spacing:
  field-gap: "12px"
  product-gap: "24px"
  reader-gap: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 25px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 25px"
  button-yellow-hover:
    backgroundColor: "{colors.yellow-hover}"
  signup-input:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 10px"
    height: "42px"
  night-card:
    backgroundColor: "{colors.night-card}"
    textColor: "{colors.white}"
    rounded: "{rounded.page}"
    padding: "38px"
---

# Design System: The Hanukkah Fairy

## Overview

The approved book artwork anchors an exuberant illustrated world: an electric-blue nightscape, coral/pink wordmark, turquoise Fairy, acid-yellow announcements and distinct full-width character colors. Oversized campaign type gives the art room to lead; readable body copy explains the book and family ritual.

The implemented direction is recorded from css/site.css, css/reader.css and js/reader.js, with approved context in reviews/elise-feedback-2026-09-28.md. No additional creative metaphor has been approved. Tokens above describe source values; component-specific and responsive overrides remain authoritative in the CSS.

**Key Characteristics:**
- Supplied book art at generous scale.
- Full-width color sections and oversized headings.
- Warm paper reading surfaces with a physical book seam.
- Restrained scroll motion and a legible static fallback.

## Colors

Primary accents are electric blue and acid yellow. Yellow carries launch emphasis, hero conversion and night-section headings. Blue carries reader quotations and form focus. Ink and warm paper support the reading and navigation surfaces.

Secondary section colors distinguish the blush product/story world, aqua ritual, sky Fairy, gold Pup, lilac Angel and hot-pink Grizzlebottom. Midnight anchors the eight-night feature and footer; its lighter card surface holds the interactive activity. The imported artwork supplies additional colors without turning every illustrated hue into a UI token. Sidecar tonal ramps are derived preview metadata, not additional implemented UI colors.

**The Artwork Authority Rule.** Preserve the supplied cover, logo, liner and character colors; use section fills to support those assets.

## Typography

Bricolage Grotesque provides campaign headlines and component titles; DM Sans handles body copy, navigation, fields and actions. Bagel Fat One is reserved for the reader's book-style headings and quotations; its form title returns to Bricolage.

The frontmatter records base h2/h3 and quote roles. Individual large sections use their own clamps: the yellow statement reaches 154px, the ritual heading 150px and cast names 110–130px. At the main mobile breakpoint the base h2 becomes 58px, while large section headings retain responsive clamps. Enhanced desktop reader quotes use clamp(40px, 3.7vw, 68px); mobile quotes use clamp(27px, 7.4vw, 33px).

**The Reading Rhythm Rule.** Tight display leading belongs to headlines. Keep explanatory text at the observed 1.5–1.7 leading; reader text and artwork must remain complete.

## Layout

The main container is min(1500px, calc(100% - 112px)). Gutters reduce to 32px per side below 1100px and 20px below 760px. The desktop product grid uses 0.85fr / 1.05fr / 1.05fr columns; ritual, cast, family and night sections use broad two-column compositions. Below 760px these become single columns; the four ritual steps become two columns. Character text comes before the portrait on mobile.

Navigation is sticky, 80px tall on desktop and 72px on mobile. The hero's height accounts for navigation, announcement and the bottom divider, with a 650px minimum. Mobile caption copy sits on a solid dark-blue panel so the illustrated windows do not compete with the text.

The static reader is a normal document sequence. Its enhanced version occupies 440svh and pins a viewport-sized stage; desktop spreads have a 2:1 ratio, creating square pages. Enhancement requires adequate viewport height and either a mobile width at or below 760px or a desktop width at or above 1040px. Intermediate widths, short viewports and reduced motion retain static pages. At widths below 351px enhancement requires 840px height; other eligible widths require 760px. The mobile enhanced book is 535px tall, or 590px below 351px.

## Elevation & Depth

Most sections are flat color fields with thin separators. Depth belongs to the physical book and supplied art: a layered page-edge shadow, subtle inner seam shadows and a soft Fairy drop shadow. Exact shadow and motion values are recorded in the sidecar. The stepped reader shadow represents stacked paper; it is not a generic card treatment.

## Shapes

Controls have modest control-radius corners. Reader spreads and the night activity surface use the page radius. Product presentations and large section planes stay rectangular. The candle interaction uses narrow wax rectangles and an asymmetric flame silhouette. Preserve the actual illustrated silhouettes; do not replace them with generic icons.

## Components

**Buttons:** Ink primary and yellow hero variants use the same compact rectangular form. Base controls have a 52px minimum height; compact navigation and form controls use 44px. Hover changes the fill and lifts by 2px over 0.2s. Disabled submission controls reduce opacity to 0.6. General keyboard focus uses a visible pink outline; reduced motion removes the lift.

**Signup fields:** Visible DM Sans labels, full-width paper fields and a thin neutral border. Desktop fields are 42px high, mobile fields 44px, with a narrow-screen 40px override. Focus uses an electric-blue outline. Invalid fields use a red border and submission feedback has distinct success/error text colors. Email and adult consent are required; optional data stays clearly labeled.

**Navigation:** Paper background, fine bottom border, supplied logo and direct section links. Desktop links are 14px/600 with underline on hover; the mobile menu uses larger stacked links and a 44px toggle. Preserve keyboard focus and expanded-state behavior.

**Product presentations:** Original mockups sit inside rectangular light image surfaces with object-fit: contain. Captions use a lower separator and visible development/preview status. Keep product artwork uncropped.

**Eight-night activity:** A midnight section holds the lighter activity card and eight candle buttons. Active candles show bright flames and the selected button uses yellow text. The taller shamash remains a distinct visual element. Keep the existing accessible pressed states and accompanying text.

**Book reader:** The actual cover rotates from a fixed seam while story, kindness and signup spreads fade into view. Signup links target the final page and focus email. The form freezes scroll changes while focused. The mouse cue stays stationary through the reader and fades reversibly as the reader leaves the viewport. Reduced-motion users receive static pages.

## Do's and Don'ts

### Do:
- Do use the supplied artwork and original product mockups.
- Do preserve readable text, complete book pages and visible keyboard focus.
- Do adapt large compositions into the implemented mobile reading order.
- Do keep motion tied to scrolling and honor reduced motion.

### Don't:
- Don't invent replacement character designs or product imagery.
- Don't crop book text or rotate the cover away from its fixed seam.
- Don't add Back/Next or dot controls to the reader.
- Don't use the tight campaign-heading leading for body copy.
