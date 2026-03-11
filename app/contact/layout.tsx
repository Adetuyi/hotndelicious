import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with HotnNiceDelicacies — reach us by WhatsApp, phone, or email for orders, special requests, and delivery queries in Middlesbrough.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
