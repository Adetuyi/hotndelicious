import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Order", path: "/order" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl">🔥</span>
          <span className="font-display text-xl md:text-2xl font-bold text-gradient-warm">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body font-medium text-sm transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/order"
            className="bg-gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Order Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-body font-medium py-2 transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/order"
                onClick={() => setMobileOpen(false)}
                className="bg-gradient-warm text-primary-foreground px-5 py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
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
