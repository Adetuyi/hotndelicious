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
            Food Hygiene Rating: {siteConfig.foodHygiene.rating} —{' '}
            {siteConfig.foodHygiene.ratingLabel}
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
