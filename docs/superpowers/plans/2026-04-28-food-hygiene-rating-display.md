# Food Hygiene Rating Display Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display the business's UK FSA 5-star Food Hygiene Rating across the homepage in four placements (trust strip, About weave, dedicated section, footer badge), all linked to the official FSA listing.

**Architecture:** One reusable SVG badge component (`FoodHygieneBadge`) consumed by two layout components (`FoodHygieneTrustStrip`, `FoodHygieneSection`) and inline in the footer. Configuration (URL/rating/authority) lives in `constants/siteConfig.ts` so all consumers share one source of truth.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4 (with custom CSS variables in `app/globals.css`), framer-motion (existing), lucide-react (existing).

**Verification:** No automated tests exist in this codebase. Verification is `npm run lint` + `npm run build` + visual check via `npm run dev`.

---

### Task 1: Add `foodHygiene` config to siteConfig

**Files:**
- Modify: `constants/siteConfig.ts`

- [ ] **Step 1: Add foodHygiene block to siteConfig**

Add this property to the `siteConfig` object, after `hours`:

```ts
  foodHygiene: {
    rating: 5,
    ratingLabel: 'Very Good',
    authority: 'Food Standards Agency',
    listingUrl: 'https://ratings.food.gov.uk/business/1913815/hot-n-nice-delicacies',
  },
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 2: Build `FoodHygieneBadge` SVG component

**Files:**
- Create: `components/FoodHygieneBadge.tsx`

- [ ] **Step 1: Create the component file**

```tsx
import { siteConfig } from '@/constants/siteConfig';

type Size = 'sm' | 'md' | 'lg';

const SIZE_PX: Record<Size, number> = {
  sm: 56,
  md: 96,
  lg: 140,
};

type Props = {
  size?: Size;
  className?: string;
  title?: string;
};

const FoodHygieneBadge = ({ size = 'md', className, title }: Props) => {
  const width = SIZE_PX[size];
  const accessibleTitle =
    title ??
    `Food Hygiene Rating: ${siteConfig.foodHygiene.rating} — ${siteConfig.foodHygiene.ratingLabel} — ${siteConfig.foodHygiene.authority}`;

  return (
    <svg
      role="img"
      aria-label={accessibleTitle}
      viewBox="0 0 220 110"
      width={width}
      height={(width * 110) / 220}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{accessibleTitle}</title>

      {/* Outer rounded card */}
      <rect x="0" y="0" width="220" height="110" rx="8" fill="#0A2540" />

      {/* Top green band: "FOOD HYGIENE RATING" */}
      <rect x="6" y="6" width="208" height="22" rx="3" fill="#1F7A3A" />
      <text
        x="110"
        y="22"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#FFFFFF"
        letterSpacing="1.5"
      >
        FOOD HYGIENE RATING
      </text>

      {/* White rating block */}
      <rect x="6" y="32" width="208" height="50" fill="#FFFFFF" />

      {/* Rating numbers 0-5 with the matching one highlighted */}
      {[0, 1, 2, 3, 4, 5].map((n, i) => {
        const x = 18 + i * 32;
        const isMatch = n === siteConfig.foodHygiene.rating;
        return (
          <g key={n}>
            <circle
              cx={x}
              cy={57}
              r={11}
              fill={isMatch ? '#0A2540' : '#FFFFFF'}
              stroke="#0A2540"
              strokeWidth="1.5"
            />
            <text
              x={x}
              y={61}
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
              fontSize="13"
              fill={isMatch ? '#FFFFFF' : '#0A2540'}
            >
              {n}
            </text>
          </g>
        );
      })}

      {/* "very good" callout */}
      <text
        x="110"
        y="80"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#0A2540"
      >
        very good
      </text>

      {/* Bottom band: authority */}
      <rect x="6" y="86" width="208" height="18" rx="3" fill="#0A2540" />
      <text
        x="110"
        y="99"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="600"
        fontSize="9"
        fill="#FFFFFF"
        letterSpacing="0.6"
      >
        FOOD STANDARDS AGENCY · food.gov.uk
      </text>
    </svg>
  );
};

export default FoodHygieneBadge;
```

- [ ] **Step 2: Verify the component renders by importing it in a stub**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 3: Build `FoodHygieneTrustStrip` component

**Files:**
- Create: `components/FoodHygieneTrustStrip.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/constants/siteConfig';
import FoodHygieneBadge from './FoodHygieneBadge';

const FoodHygieneTrustStrip = () => {
  return (
    <section className="bg-muted border-border/60 border-y" aria-label="Food hygiene rating">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="container flex flex-col items-center justify-center gap-4 px-4 py-5 text-center sm:flex-row sm:gap-6 sm:text-left"
      >
        <FoodHygieneBadge size="sm" className="shrink-0" />
        <div className="flex flex-col gap-0.5">
          <p className="text-foreground font-display text-base font-bold sm:text-lg">
            Food Hygiene Rating: {siteConfig.foodHygiene.rating} — {siteConfig.foodHygiene.ratingLabel}
          </p>
          <p className="text-muted-foreground text-sm">
            Awarded by the {siteConfig.foodHygiene.authority}.{' '}
            <a
              href={siteConfig.foodHygiene.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
            >
              Verify <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default FoodHygieneTrustStrip;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 4: Build `FoodHygieneSection` component

**Files:**
- Create: `components/FoodHygieneSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/constants/siteConfig';
import FoodHygieneBadge from './FoodHygieneBadge';

const FoodHygieneSection = () => {
  return (
    <section className="bg-background py-16 md:py-20" aria-label="Food safety">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="container flex flex-col items-center px-4 text-center"
      >
        <FoodHygieneBadge size="lg" className="mb-6 drop-shadow-md" />
        <h2 className="font-display text-foreground mb-3 text-3xl font-bold md:text-4xl">
          Officially 5-Star Rated for Food Hygiene
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl text-lg">
          Independently inspected and verified by the UK {siteConfig.foodHygiene.authority} —
          because clean kitchens make better meals.
        </p>
        <a
          href={siteConfig.foodHygiene.listingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 font-semibold transition-colors"
        >
          Verify our rating on food.gov.uk <ExternalLink size={16} />
        </a>
      </motion.div>
    </section>
  );
};

export default FoodHygieneSection;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 5: Wire up homepage (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add imports**

Add to the existing import block at the top of the file:

```tsx
import FoodHygieneTrustStrip from '@/components/FoodHygieneTrustStrip';
import FoodHygieneSection from '@/components/FoodHygieneSection';
```

- [ ] **Step 2: Render `FoodHygieneTrustStrip` after the Hero**

Immediately after the closing `</section>` of the Hero block (currently around line 65) and before the `{/* About */}` comment, insert:

```tsx
      <FoodHygieneTrustStrip />
```

- [ ] **Step 3: Add the FSA sentence to the About copy**

In the second `<p>` of the About section (currently the one ending with "...the way it's meant to taste."), append a third paragraph immediately after it:

```tsx
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              And we&apos;re proud to hold a{' '}
              <a
                href={siteConfig.foodHygiene.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                5-star Food Hygiene Rating
              </a>{' '}
              from the {siteConfig.foodHygiene.authority} — because every kitchen deserves nothing
              less.
            </p>
```

- [ ] **Step 4: Render `FoodHygieneSection` between Featured Meals and How It Works**

Immediately after the closing `</section>` of the Featured Meals block (the one that ends with the "View Full Menu" link) and before the `{/* How It Works */}` comment, insert:

```tsx
      <FoodHygieneSection />
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 6: Add badge to Footer

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Import the badge**

Add to the existing import block at the top of the file:

```tsx
import FoodHygieneBadge from './FoodHygieneBadge';
```

- [ ] **Step 2: Add the badge under the Brand column**

Inside the Brand column `<div className="md:col-span-1">`, replace the current contents from line 13 onward with:

```tsx
            <div className="mb-4 flex items-center gap-2 text-sm">
              <Image
                src="/logo.png"
                alt="HotNNice Delicacies"
                width={160}
                height={160}
                className="hidden sm:inline-block"
              />
            </div>
            <p className="text-background/70 mb-6 text-sm leading-relaxed">{siteConfig.tagline}</p>
            <a
              href={siteConfig.foodHygiene.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-start gap-2 transition-opacity hover:opacity-90"
              aria-label={`Verify our Food Hygiene Rating ${siteConfig.foodHygiene.rating} on food.gov.uk`}
            >
              <FoodHygieneBadge size="sm" />
              <span className="text-background/60 text-xs font-medium">
                Food Hygiene Rating: {siteConfig.foodHygiene.rating}
              </span>
            </a>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 7: Final verification and commit

**Files:**
- All previously modified/created files
- The pending price update on `constants/meals.ts` (already modified earlier in session)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes without errors. Warnings on unrelated existing pages are acceptable.

- [ ] **Step 3: Stage changes explicitly (avoid `git add -A`)**

```bash
git add constants/meals.ts \
        constants/siteConfig.ts \
        components/FoodHygieneBadge.tsx \
        components/FoodHygieneTrustStrip.tsx \
        components/FoodHygieneSection.tsx \
        components/Footer.tsx \
        app/page.tsx \
        docs/superpowers/plans/2026-04-28-food-hygiene-rating-display.md
```

- [ ] **Step 4: Verify staged set**

Run: `git status --short`
Expected: only the files listed above appear staged. No stray files.

- [ ] **Step 5: Commit**

```bash
git commit -m "$(cat <<'EOF'
feat: display FSA 5-star Food Hygiene Rating + update meal prices

Adds the official UK Food Standards Agency Food Hygiene Rating in four
homepage placements: a trust strip below the hero, a sentence in the
About copy, a dedicated mini-section between menu and process, and a
small badge in the footer. All instances link to the official FSA
listing. Also rolls in the previously-staged meal price updates.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Confirm commit succeeded**

Run: `git status` and `git log -1 --stat`
Expected: working tree clean, commit appears with the listed files.

---

## Self-review notes

- **Spec coverage:** All four placements (trust strip, About weave, dedicated section, footer badge) have dedicated tasks. Reusable badge component, siteConfig constant, and FSA link are all covered.
- **Out-of-scope items respected:** No changes to `hotndelicious_delivery___lovable/`, no other pages touched, no live API fetch.
- **Type consistency:** `FoodHygieneBadge` props (`size`, `className`, `title`) match across all callsites. `siteConfig.foodHygiene.{rating,ratingLabel,authority,listingUrl}` accessed consistently.
- **No placeholders:** Every code block is complete and copy-pasteable.
