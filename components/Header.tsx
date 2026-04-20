'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Order', path: '/order' },
  { label: 'Contact', path: '/contact' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-card/95 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:h-20">
        <Link href="/" className="flex items-center gap-2 text-sm">
          {/* <LogoStacked className="h-12 w-auto" /> */}
          <Image
            src="/logo.png"
            alt="HotNNice Delicacies"
            width={80}
            height={80}
            className="hidden sm:inline-block"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-body hover:text-primary text-sm font-medium transition-colors ${
                pathname === item.path ? 'text-primary' : 'text-foreground/70'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="bg-gradient-warm text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Order Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-foreground p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-card border-border overflow-hidden border-b md:hidden"
          >
            <div className="container flex flex-col gap-3 px-4 py-4">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-body py-2 font-medium transition-colors ${
                    pathname === item.path ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/order"
                onClick={() => setMobileOpen(false)}
                className="bg-gradient-warm text-primary-foreground rounded-lg px-5 py-3 text-center font-semibold transition-opacity hover:opacity-90"
              >
                Order Now
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
