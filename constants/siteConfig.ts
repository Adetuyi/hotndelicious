import { StaticImageData } from 'next/image';

export const siteConfig = {
  name: 'HotnNiceDelicacies',
  tagline: 'Authentic Nigerian Meals, Delivered to Your Door',
  domain: 'hotnnicedelicacies.com',
  description:
    'Authentic Nigerian home-cooked meals delivered fresh to your door in Middlesbrough and surrounding areas.',
  contact: {
    email: 'hotnnicedelicacies@gmail.com',
    phone: '+44 7776 320068',
    whatsapp: '+447776320068',
    whatsappDisplay: '+44 7776 320068',
  },
  delivery: {
    areas: ['Middlesbrough', 'Stockton-on-Tees', 'Redcar', 'Thornaby', 'Billingham'],
    pricing: {
      middlesbrough: 10,
      surroundingNote: 'Contact us for pricing',
    },
  },
  social: {
    instagram: 'https://instagram.com/hotnnicedelicacies',
    facebook: 'https://facebook.com/hotnnicedelicacies',
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
