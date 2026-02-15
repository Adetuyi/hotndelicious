import { Link } from "react-router-dom";
import { siteConfig } from "@/constants/siteConfig";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="font-display text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Menu", path: "/menu" },
                { label: "Order", path: "/order" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Delivery Areas</h4>
            <div className="flex items-start gap-2 text-sm text-background/70">
              <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{siteConfig.delivery.areas.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center text-background/50 text-sm">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
