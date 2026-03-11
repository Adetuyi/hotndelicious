'use client';

import { useState } from 'react';
import { siteConfig } from '@/constants/siteConfig';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hi! My name is ${form.name}.\n\n${form.message}\n\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}`
    );
    toast.success('Opening WhatsApp!');

    setTimeout(() => {
      window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`, '_blank');
    }, 1000);
  };

  const inputClass =
    'w-full border border-input rounded-lg px-4 py-3 bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body';

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h1 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Get In Touch
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            Got a question, special request, or just want to chat about our food? We&apos;d love to
            hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-display text-foreground text-2xl font-semibold">
              Reach Out Directly
            </h2>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary/10 border-secondary/20 hover:bg-secondary/20 flex items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-xl">
                <MessageCircle size={22} className="text-secondary-foreground" />
              </div>
              <div>
                <p className="text-foreground font-semibold">WhatsApp</p>
                <p className="text-muted-foreground text-sm">
                  {siteConfig.contact.whatsappDisplay}
                </p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="bg-primary/5 border-primary/10 hover:bg-primary/10 flex items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl">
                <Phone size={22} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Phone</p>
                <p className="text-muted-foreground text-sm">{siteConfig.contact.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="bg-warm-gold/5 border-warm-gold/10 hover:bg-warm-gold/10 flex items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <div className="bg-warm-gold flex h-12 w-12 items-center justify-center rounded-xl">
                <Mail size={22} className="text-warm-gold-foreground" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Email</p>
                <p className="text-muted-foreground text-sm">{siteConfig.contact.email}</p>
              </div>
            </a>

            <div className="bg-muted border-border flex items-start gap-4 rounded-xl border p-4">
              <div className="bg-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <MapPin size={22} className="text-accent-foreground" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Delivery Areas</p>
                <p className="text-muted-foreground text-sm">
                  {siteConfig.delivery.areas.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-foreground mb-6 text-2xl font-semibold">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Your Name *"
                className={inputClass}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Email Address *"
                className={inputClass}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className={inputClass}
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
              <textarea
                required
                placeholder="Your message *"
                rows={5}
                className={inputClass}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="bg-gradient-warm text-primary-foreground w-full rounded-xl py-4 text-lg font-bold transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
