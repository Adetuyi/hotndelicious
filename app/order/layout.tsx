import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Place Your Order',
  description:
    'Order fresh home-cooked meals online from HotnNiceDelicacies. Choose your dishes and we\'ll deliver them hot to your door in Middlesbrough and surrounding areas.',
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
