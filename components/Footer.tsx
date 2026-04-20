import Link from 'next/link';
import { siteConfig } from '@/constants/siteConfig';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2 text-sm">
              {/* <LogoStacked variant="light" className="h-12 w-auto" /> */}
              <Image
                src="/logo.png"
                alt="HotNNice Delicacies"
                width={160}
                height={160}
                className="hidden sm:inline-block"
              />
            </div>
            <p className="text-background/70 text-sm leading-relaxed">{siteConfig.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Menu', path: '/menu' },
                { label: 'Order', path: '/order' },
                { label: 'Contact', path: '/contact' },
              ].map(item => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-background/70 flex items-center gap-2 text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-background/70 flex items-center gap-2 text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="font-display mb-4 text-lg font-semibold">Delivery Areas</h4>
            <div className="text-background/70 flex items-start gap-2 text-sm">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span>{siteConfig.delivery.areas.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="border-background/10 text-background/50 mt-10 border-t pt-6 text-center text-sm">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
