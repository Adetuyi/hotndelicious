'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Truck, ClipboardList, Phone, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/constants/siteConfig';
import { meals } from '@/constants/meals';
import MealCard from '@/components/MealCard';
import heroImg from '@/assets/hero-food.jpg';
import Image from 'next/image';

const featuredMeals = meals.slice(0, 9);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Image
          src={heroImg}
          alt="A spread of freshly cooked home meals including jollof rice, grilled skewers, and hearty soups"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="bg-gradient-hero absolute inset-0" />
        <div className="relative z-10 container px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-primary-foreground mb-6 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
              Freshly Made,
              <span className="text-primary block">Delivered to Your Door</span>
            </h1>
            <p className="text-primary-foreground/80 font-body mb-8 text-lg leading-relaxed md:text-xl">
              Made with love, delivered hot to your door in Middlesbrough. From smoky grilled
              skewers to rich, hearty soups — taste the flavours of home.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/order"
                className="bg-gradient-warm text-primary-foreground rounded-xl px-8 py-4 text-center text-lg font-bold transition-opacity hover:opacity-90"
              >
                Order Now
              </Link>
              <Link
                href="/menu"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl border-2 px-8 py-4 text-center text-lg font-semibold transition-colors"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="bg-background py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-display text-foreground mb-6 text-3xl font-bold md:text-4xl">
              Who&apos;s Cooking Your Food?
            </h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              We&apos;re a family that brought bold, vibrant flavours from our home kitchen all the
              way to Middlesbrough. Every meal is prepared from scratch using recipes passed down
              through generations, fresh ingredients sourced daily, and a whole lot of love.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              No shortcuts. No frozen meals. Just honest, home-cooked food — the way it&apos;s meant
              to taste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Our Most Loved Dishes
            </h2>
            <p className="text-muted-foreground text-lg">Straight from our kitchen to your table</p>
          </motion.div>
          <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredMeals.map((meal, i) => (
              <motion.div
                key={meal.id}
                initial="hidden"
                whileInView="visible"
                className="last:sm:hidden last:lg:block last:xl:hidden"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <MealCard meal={meal} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/menu"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-block rounded-xl border-2 px-8 py-3 font-semibold transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-display text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: UtensilsCrossed,
                step: '1',
                title: 'Browse Our Menu',
                desc: 'Explore our delicious selection of freshly made dishes',
              },
              {
                icon: ClipboardList,
                step: '2',
                title: 'Place Your Order',
                desc: 'Choose your meals and submit your order online or via WhatsApp',
              },
              {
                icon: Truck,
                step: '3',
                title: 'We Deliver Hot',
                desc: 'Freshly cooked meals delivered straight to your door',
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
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <item.icon size={28} className="text-primary" />
                </div>
                <div className="text-primary mb-2 text-sm font-bold">Step {item.step}</div>
                <h3 className="font-display text-foreground mb-2 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container px-4 text-center">
          <h2 className="font-display text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Delivering Across Middlesbrough
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            {siteConfig.delivery.areas.join(' • ')}
          </p>
          <div className="bg-card border-border inline-block rounded-xl border px-8 py-4 shadow-sm">
            <p className="text-foreground font-semibold">
              £{siteConfig.delivery.pricing.middlesbrough} delivery within Middlesbrough
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Surrounding areas — {siteConfig.delivery.pricing.surroundingNote.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16 md:py-24">
        <div className="container px-4 text-center">
          <h2 className="font-display text-primary-foreground mb-4 text-3xl font-bold md:text-4xl">
            Ready to Taste Something Delicious?
          </h2>
          <p className="text-primary-foreground/80 mx-auto mb-8 max-w-xl text-lg">
            Order now and let us bring the flavours of home to your doorstep.
          </p>
          <Link
            href="/order"
            className="bg-foreground text-background mb-8 inline-block rounded-xl px-10 py-4 text-lg font-bold transition-opacity hover:opacity-90"
          >
            Place Your Order
          </Link>
          <div className="text-primary-foreground/80 flex flex-wrap justify-center gap-6 text-sm">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              className="hover:text-primary-foreground flex items-center gap-2 transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hover:text-primary-foreground flex items-center gap-2 transition-colors"
            >
              <Phone size={18} /> {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-primary-foreground flex items-center gap-2 transition-colors"
            >
              <Mail size={18} /> {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
