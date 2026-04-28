# Food Hygiene Rating Display — Design Spec

**Date:** 2026-04-28
**Status:** Approved (pending user spec review)

## Summary

Display the business's official UK Food Standards Agency 5-star Food Hygiene Rating across the public website to build trust with first-time visitors. Four touchpoints: a trust strip below the hero, a sentence woven into the About copy, a dedicated mini-section mid-page, and a small badge in the footer. Each occurrence uses the same reusable badge component and links to the official FSA listing.

## Motivation

The site currently has no formal trust signals — credibility is built entirely through narrative ("Who's Cooking Your Food?"). UK takeaway customers actively look for the FSA Food Hygiene Rating before ordering, and the business holds the top rating (5 — Very Good). Surfacing this prominently is straightforward credibility that costs nothing.

## Source / Authority

- **Rating:** Food Hygiene Rating 5 — "Very Good"
- **Authority:** UK Food Standards Agency (FSA)
- **Public listing:** https://ratings.food.gov.uk/business/1913815/hot-n-nice-delicacies

All on-page badges link to this listing in a new tab with `rel="noopener noreferrer"`.

## Visual approach

Use a faithful SVG recreation of the official FSA Food Hygiene Rating sticker (green/blue/white stripes, large "5", "Food Hygiene Rating · very good" wording). The official mark is the trust signal — credibility comes from displaying *that mark*, not a custom design. We frame it inside the site's existing brand surfaces (cream/muted backgrounds, soft shadows, warm typography for surrounding copy). The contrast between the green/blue regulated mark and the warm-orange brand palette is what makes it pop while still feeling intentional.

## Components (new)

### `components/FoodHygieneBadge.tsx`
Pure SVG component reproducing the official FSA mark.

- **Props:**
  - `size`: `'sm' | 'md' | 'lg'` — controls width (sm ≈ 56px, md ≈ 96px, lg ≈ 140px)
  - `className?`: passthrough for layout adjustments
  - `title?`: accessible title (defaults to "Food Hygiene Rating: 5 — Very Good — Food Standards Agency")
- **Notes:** Stateless. Single source of truth for the badge artwork. No external image asset.

### `components/FoodHygieneTrustStrip.tsx`
Placement #1 — full-width band rendered directly below the hero.

- Soft cream/muted background, thin band (≈ 80px tall on desktop, stacks on mobile)
- Layout: small badge + bold "Food Hygiene Rating: 5 — Very Good" + subtext "Awarded by the Food Standards Agency" + "Verify →" link
- Subtle fade-in via Framer Motion (matches existing site motion patterns)

### `components/FoodHygieneSection.tsx`
Placement #3 — dedicated mid-page section between Featured Meals and How It Works.

- Cream/muted background, generous vertical padding (matches existing `py-16 md:py-24` pattern)
- Centred layout: `lg` badge → heading "Officially 5-Star Rated for Food Hygiene" → one-line body ("Independently inspected and verified by the UK Food Standards Agency.") → "Verify our rating on food.gov.uk →" link
- `whileInView` fade-up animation matching other sections

## Edits to existing files

### `app/page.tsx`
1. Render `<FoodHygieneTrustStrip />` immediately after the hero `<section>` and before the About section.
2. Append a sentence to the second About paragraph: *"And we're proud to hold a **5-star Food Hygiene Rating** from the Food Standards Agency — because every kitchen deserves nothing less."* The phrase "5-star Food Hygiene Rating" wraps in an `<a>` to the FSA listing.
3. Render `<FoodHygieneSection />` between the Featured Meals section and the How It Works section.

### `components/Footer.tsx`
Add a small `<FoodHygieneBadge size="sm" />` near the contact column with caption "Food Hygiene Rating: 5" and link to the FSA listing. Style consistent with surrounding footer elements.

### `constants/siteConfig.ts`
Add a new constant for the FSA listing URL so it lives in one place:

```ts
foodHygiene: {
  rating: 5,
  ratingLabel: 'Very Good',
  authority: 'Food Standards Agency',
  listingUrl: 'https://ratings.food.gov.uk/business/1913815/hot-n-nice-delicacies',
}
```

All components reference `siteConfig.foodHygiene` rather than hardcoding the URL.

## Accessibility

- Badge SVG includes `<title>` for screen readers
- Links use descriptive text ("Verify our rating on food.gov.uk") not "click here"
- Colour contrast: text on cream backgrounds uses existing `--color-foreground` / `--color-muted-foreground` tokens (already passing WCAG AA)
- All external links: `target="_blank" rel="noopener noreferrer"`

## Out of scope

- Updates to `hotndelicious_delivery___lovable/` (the legacy prototype directory)
- Showing the FSA badge on `/menu`, `/order`, or `/contact` pages — homepage only for this iteration
- Animated/interactive badge variations (hover effects beyond standard link styling)
- Caching or live-fetching the rating from the FSA API — the rating is hardcoded as 5; if it ever changes, edit `siteConfig.foodHygiene.rating`

## Verification

After implementation, the user will run the dev server and view the homepage to confirm visual fit. They have explicitly reserved the right to prune any of the four placements after seeing them rendered.

## Open questions

None. All clarifying questions resolved during brainstorming:
- Source: UK FSA Food Hygiene Rating (official, regulated)
- Placements: trust strip + About weave + dedicated section + footer badge
- External link: yes, to the FSA listing URL above
