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
