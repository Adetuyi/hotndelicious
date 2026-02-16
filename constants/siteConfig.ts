import { StaticImageData } from 'next/image';

export const siteConfig = {
  name: 'HotnDelicious',
  tagline: 'Authentic Nigerian Meals, Delivered to Your Door',
  domain: 'hotndelicious.com',
  description:
    'Authentic Nigerian home-cooked meals delivered fresh to your door in Middlesbrough and surrounding areas.',
  contact: {
    email: 'info@hotndelicious.com',
    phone: '+44 7XXX XXXXXX',
    whatsapp: '+447XXXXXXXXX',
    whatsappDisplay: '+44 7XXX XXXXXX',
  },
  delivery: {
    areas: ['Middlesbrough', 'Stockton-on-Tees', 'Redcar', 'Thornaby', 'Billingham'],
    pricing: {
      middlesbrough: 10,
      surroundingNote: 'Contact us for pricing',
    },
  },
  social: {
    instagram: 'https://instagram.com/hotndelicious',
    facebook: 'https://facebook.com/hotndelicious',
  },
  hours: {
    delivery: '12pm - 8pm, Tuesday - Sunday',
    orderCutoff: 'Order by 10am for same-day delivery',
  },
};

export type MealItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | StaticImageData;
  category: 'rice' | 'soup' | 'grill' | 'sides' | 'party' | string;
};
