import { useState } from "react";
import { siteConfig } from "@/constants/siteConfig";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hi! My name is ${form.name}.\n\n${form.message}\n\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`, "_blank");
    toast.success("Opening WhatsApp!");
  };

  const inputClass =
    "w-full border border-input rounded-lg px-4 py-3 bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get In Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Got a question, special request, or just want to chat about Nigerian food?
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Reach Out Directly
            </h2>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <MessageCircle size={22} className="text-secondary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">WhatsApp</p>
                <p className="text-muted-foreground text-sm">{siteConfig.contact.whatsappDisplay}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Phone size={22} className="text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p className="text-muted-foreground text-sm">{siteConfig.contact.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-warm-gold/5 border border-warm-gold/10 hover:bg-warm-gold/10 transition-colors"
            >
              <div className="w-12 h-12 bg-warm-gold rounded-xl flex items-center justify-center">
                <Mail size={22} className="text-warm-gold-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-muted-foreground text-sm">{siteConfig.contact.email}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-muted border border-border">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Delivery Areas</p>
                <p className="text-muted-foreground text-sm">
                  {siteConfig.delivery.areas.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Your Name *"
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Email Address *"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <textarea
                required
                placeholder="Your message *"
                rows={5}
                className={inputClass}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="w-full bg-gradient-warm text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
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
