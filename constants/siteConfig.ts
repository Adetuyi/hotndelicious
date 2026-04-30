import { StaticImageData } from 'next/image';

export const siteConfig = {
  name: 'HotnNiceDelicacies',
  tagline: 'Fresh Home-Cooked Meals, Delivered to Your Door',
  domain: 'hotnnicedelicacies.com',
  description:
    'Fresh home-cooked meals made from scratch and delivered hot to your door in Middlesbrough and surrounding areas.',
  contact: {
    email: 'hotnnicedelicacies@gmail.com',
    phone: '+44 7776 320068',
    whatsapp: '+447776320068',
    whatsappDisplay: '+44 7776 320068',
  },
  delivery: {
    areas: ['Middlesbrough', 'Stockton-on-Tees', 'Redcar', 'Thornaby', 'Billingham'],
    pricing: {
      middlesbrough: 5,
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
  foodHygiene: {
    rating: 5,
    ratingLabel: 'Very Good',
    authority: 'Food Standards Agency',
    listingUrl: 'https://ratings.food.gov.uk/business/1913815/hot-n-nice-delicacies',
  },
  email: {
    fromDefault: 'Hot N Nice Delicacies <orders@hotnnicedelicacies.com>',
    notificationToDefault: 'hotnnicedelicacies@gmail.com',
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
