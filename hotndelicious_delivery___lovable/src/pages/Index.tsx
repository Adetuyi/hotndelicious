import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, Truck, ClipboardList, Phone, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";
import { meals } from "@/constants/meals";
import MealCard from "@/components/MealCard";
import heroImg from "@/assets/hero-food.jpg";

const featuredMeals = meals.slice(0, 6);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Authentic Nigerian dishes including jollof rice, suya, and egusi soup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Authentic Nigerian
              <span className="block text-primary">Home-Cooked Meals</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 font-body leading-relaxed">
              Made with love, delivered hot to your door in Middlesbrough.
              From smoky suya to rich egusi soup — taste the flavours of Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/order"
                className="bg-gradient-warm text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity text-center"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-foreground/10 transition-colors text-center"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Who's Cooking Your Food?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              We're a family that brought the bold, rich flavours of Nigerian cuisine all the way to Middlesbrough.
              Every meal is prepared from scratch in our kitchen using authentic recipes passed down through generations,
              fresh ingredients sourced daily, and a whole lot of love.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              No shortcuts. No frozen meals. Just honest, home-cooked Nigerian food —
              the way it's meant to taste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Most Loved Dishes
            </h2>
            <p className="text-muted-foreground text-lg">
              Straight from our kitchen to your table
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMeals.map((meal, i) => (
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
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: UtensilsCrossed,
                step: "1",
                title: "Browse Our Menu",
                desc: "Explore our delicious selection of authentic Nigerian dishes",
              },
              {
                icon: ClipboardList,
                step: "2",
                title: "Place Your Order",
                desc: "Choose your meals and submit your order online or via WhatsApp",
              },
              {
                icon: Truck,
                step: "3",
                title: "We Deliver Hot",
                desc: "Freshly cooked meals delivered straight to your door",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">Step {item.step}</div>
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Delivering Across Middlesbrough
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            {siteConfig.delivery.areas.join(" • ")}
          </p>
          <div className="inline-block bg-card rounded-xl px-8 py-4 shadow-sm border border-border">
            <p className="font-semibold text-foreground">
              £{siteConfig.delivery.pricing.middlesbrough} delivery within Middlesbrough
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Surrounding areas — {siteConfig.delivery.pricing.surroundingNote.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-cta">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Taste the Best of Nigeria?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Order now and let us bring the flavours of home to your doorstep.
          </p>
          <Link
            to="/order"
            className="inline-block bg-foreground text-background px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity mb-8"
          >
            Place Your Order
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/80 text-sm">
            <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone size={18} /> {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail size={18} /> {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
