import { motion } from "framer-motion";
import { meals } from "@/constants/meals";
import MealCard from "@/components/MealCard";

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
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every dish is prepared fresh from scratch using authentic Nigerian recipes
              and the finest ingredients. Pick your favourites and we'll deliver them hot to your door.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="mt-12 text-center bg-muted rounded-xl p-8">
            <p className="font-display text-xl font-semibold text-foreground mb-2">
              Don't see what you're craving?
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
