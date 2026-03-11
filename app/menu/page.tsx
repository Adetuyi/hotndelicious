'use client';

import { motion } from 'framer-motion';
import { meals } from '@/constants/meals';
import MealCard from '@/components/MealCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const MenuPage = () => {
  return (
    <>
      <section className="bg-background py-16 md:py-24">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h1 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Our Menu
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Every dish is prepared fresh from scratch using time-honoured recipes and the finest
              ingredients. Pick your favourites and we&apos;ll deliver them hot to your door.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal, i) => (
              <motion.div
                key={meal.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <MealCard meal={meal} />
              </motion.div>
            ))}
          </div>

          <div className="bg-muted mt-12 rounded-xl p-8 text-center">
            <p className="font-display text-foreground mb-2 text-xl font-semibold">
              Don&apos;t see what you&apos;re craving?
            </p>
            <p className="text-muted-foreground">
              Contact us for custom orders — we love cooking special requests!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
