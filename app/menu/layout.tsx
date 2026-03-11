import type { Metadata } from 'next';
import { meals } from '@/constants/meals';
import { siteConfig } from '@/constants/siteConfig';

export const metadata: Metadata = {
  title: 'Our Menu',
  description:
    'Browse our full menu of freshly made home-cooked meals — pasta, grills, rice dishes, soups, and more. Delivered hot to your door in Middlesbrough and surrounding areas.',
};

const menuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `${siteConfig.name} Menu`,
  description: 'Full menu of freshly made home-cooked meals available for delivery.',
  url: `https://${siteConfig.domain}/menu`,
  hasMenuSection: Object.entries(
    meals.reduce<Record<string, typeof meals>>((acc, meal) => {
      (acc[meal.category] ??= []).push(meal);
      return acc;
    }, {})
  ).map(([category, items]) => ({
    '@type': 'MenuSection',
    name: category.charAt(0).toUpperCase() + category.slice(1),
    hasMenuItem: items.map(meal => ({
      '@type': 'MenuItem',
      name: meal.name,
      description: meal.description,
      offers: {
        '@type': 'Offer',
        price: meal.price.toFixed(2),
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
      },
    })),
  })),
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      {children}
    </>
  );
}
