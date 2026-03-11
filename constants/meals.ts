import type { MealItem } from './siteConfig';

import spaghettiImg from '@/assets/meals/spaghetti-bolognaise.jpeg';
import plantainLasagnaImg from '@/assets/meals/plantain-lasagna.jpeg';
import lasagnaImg from '@/assets/meals/lasagna.jpeg';
import jollofRiceWithProteinImg from '@/assets/meals/jollof-rice-with-protein-of-choice-and-plantain.jpeg';
import friedRiceImg from '@/assets/meals/fried-rice.jpeg';
import whiteRiceAndStewImg from '@/assets/meals/white-rice-and-stew.jpeg';
import moiMoiImg from '@/assets/meals/moi-moi.jpeg';
import ofadaRiceImg from '@/assets/meals/ofada-rice-and-ayamase-sauce.jpeg';
import bangaSoupImg from '@/assets/meals/banga-soup.jpeg';
import ofeAkwuImg from '@/assets/meals/ofe-akwu.jpeg';
import tomatoStewImg from '@/assets/meals/tomato-stew.jpeg';
import roastedYamAndPlantainImg from '@/assets/meals/roasted-yam-and-plantain-with-tilapia-fish.jpeg';
import abachaImg from '@/assets/meals/abacha.jpeg';
import afangSoupImg from '@/assets/meals/afang-soup.jpeg';
import edikaikongImg from '@/assets/meals/edikaikong.jpeg';
import efoRiroImg from '@/assets/meals/efo-riro.jpeg';
import ohaSoupImg from '@/assets/meals/oha-soup.jpeg';
import ogbonoSoyImg from '@/assets/meals/ogbono-soy.jpeg';
import okraSoupImg from '@/assets/meals/okra-soup.jpeg';
import suyaImg from '@/assets/meals/suya.jpeg';
import suyaBurgerImg from '@/assets/meals/suya-burger.jpeg';
import puffPuffImg from '@/assets/meals/puff-puff.jpeg';
import smallChopsImg from '@/assets/meals/small-chops.jpeg';
import meatPieImg from '@/assets/meals/meat-pie.jpeg';
import okpaImg from '@/assets/meals/okpa.jpeg';
import akaraAndAkamuImg from '@/assets/meals/akara-and-akamu.jpeg';
import oatmealImg from '@/assets/meals/oatmeal.jpeg';
import garriImg from '@/assets/meals/garri.jpeg';
import fufuImg from '@/assets/meals/fufu.jpeg';
import poundedYamImg from '@/assets/meals/pounded-yam.jpeg';
import roastedTilapiaImg from '@/assets/meals/roasted-tilapia-fish.jpeg';

export const meals: MealItem[] = [
  // Pasta
  {
    id: 'spaghetti-bolognaise',
    name: 'Spaghetti Bolognaise',
    description: 'Classic spaghetti topped with a rich, slow-cooked meat sauce and aromatic herbs',
    price: 24,
    image: spaghettiImg,
    category: 'pasta',
  },
  {
    id: 'lasagna',
    name: 'Lasagna',
    description:
      'Oven-baked pasta layered with rich meat sauce, creamy béchamel, and golden melted cheese',
    price: 26,
    image: lasagnaImg,
    category: 'pasta',
  },
  {
    id: 'plantain-lasagna',
    name: 'Plantain Lasagna',
    description:
      'A creative twist on classic lasagna, layered with sweet ripe plantain, seasoned minced meat, and béchamel sauce',
    price: 30,
    image: plantainLasagnaImg,
    category: 'pasta',
  },

  // Grill
  {
    id: 'suya-burger',
    name: 'Suya Burger',
    description:
      'A bold fusion burger stacked with a spiced grilled beef patty, caramelized onions, and fresh toppings in a toasted bun',
    price: 32,
    image: suyaBurgerImg,
    category: 'grill',
  },
  {
    id: 'suya',
    name: 'Suya',
    description:
      'Smoky, peppery grilled beef skewers coated in a bold spice blend, served with sliced onions and tomatoes',
    price: 22,
    image: suyaImg,
    category: 'grill',
  },
  {
    id: 'roasted-tilapia-fish',
    name: 'Roasted Tilapia Fish',
    description:
      'Whole tilapia fish marinated in a blend of peppers and spices, then fire-roasted to a crispy, flavourful finish',
    price: 28,
    image: roastedTilapiaImg,
    category: 'grill',
  },
  {
    id: 'roasted-yam-and-plantain-with-tilapia-fish',
    name: 'Roasted Yam and Plantain with Tilapia Fish',
    description:
      'Fire-roasted yam and plantain served alongside seasoned grilled tilapia — a classic combination full of bold flavour',
    price: 35,
    image: roastedYamAndPlantainImg,
    category: 'grill',
  },

  // Snacks
  {
    id: 'meat-pie',
    name: 'Meat Pie',
    description:
      'Flaky, golden pastry filled with seasoned minced meat, diced potatoes, and carrots — a satisfying baked treat',
    price: 10,
    image: meatPieImg,
    category: 'snacks',
  },
  {
    id: 'small-chops',
    name: 'Small Chops',
    description:
      'An assorted platter of bite-sized party favourites: puff puff, samosa, spring rolls, and peppered chicken',
    price: 18,
    image: smallChopsImg,
    category: 'snacks',
  },
  {
    id: 'puff-puff',
    name: 'Puff Puff',
    description:
      'Soft, golden deep-fried dough balls — a light, lightly sweetened snack that is impossible to resist',
    price: 8,
    image: puffPuffImg,
    category: 'snacks',
  },

  // Breakfast
  {
    id: 'oatmeal',
    name: 'Oatmeal',
    description:
      'Creamy, slow-cooked oats served warm — a wholesome and filling way to start the day',
    price: 10,
    image: oatmealImg,
    category: 'breakfast',
  },
  {
    id: 'akara-and-akamu',
    name: 'Akara and Akamu',
    description:
      'Crispy deep-fried bean cakes paired with smooth, warm fermented corn porridge — a hearty, comforting breakfast',
    price: 14,
    image: akaraAndAkamuImg,
    category: 'breakfast',
  },

  // Rice
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    description: 'Stir-fried rice loaded with colourful vegetables, prawns, and savoury seasoning',
    price: 30,
    image: friedRiceImg,
    category: 'rice',
  },
  {
    id: 'white-rice-and-stew',
    name: 'White Rice and Stew',
    description: 'Fluffy steamed white rice paired with a hearty, slow-cooked tomato-based stew',
    price: 22,
    image: whiteRiceAndStewImg,
    category: 'rice',
  },
  {
    id: 'jollof-rice-with-protein-and-plantain',
    name: 'Jollof Rice with Protein of Choice and Plantain',
    description:
      'Fragrant, tomato-based jollof rice served with your choice of chicken, beef, or fish alongside caramelized fried plantain',
    price: 35,
    image: jollofRiceWithProteinImg,
    category: 'rice',
  },
  {
    id: 'ofada-rice-and-ayamase-sauce',
    name: 'Ofada Rice and Ayamase Sauce',
    description:
      'Unpolished, locally grown rice paired with a bold, smoky green pepper sauce — a deeply flavourful combination',
    price: 32,
    image: ofadaRiceImg,
    category: 'rice',
  },

  // Sides
  {
    id: 'tomato-stew',
    name: 'Tomato Stew',
    description:
      'Classic tomato-based stew slow-cooked with blended peppers, onions, and your choice of protein',
    price: 14,
    image: tomatoStewImg,
    category: 'sides',
  },
  {
    id: 'moi-moi',
    name: 'Moi Moi',
    description:
      'Steamed bean pudding made with blended black-eyed peas, peppers, onions, and a choice of fillings',
    price: 10,
    image: moiMoiImg,
    category: 'sides',
  },
  {
    id: 'abacha',
    name: 'Abacha',
    description:
      'A vibrant salad of shredded dried cassava, palm oil, garden eggs, fermented beans, and crayfish — bold and refreshing',
    price: 18,
    image: abachaImg,
    category: 'sides',
  },
  {
    id: 'okpa',
    name: 'Okpa',
    description:
      'Dense and satisfying Bambara nut pudding steamed to perfection — wholesome, filling, and full of flavour',
    price: 8,
    image: okpaImg,
    category: 'sides',
  },

  // Soup
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    description:
      'A rich, hearty spinach stew loaded with assorted meats, smoked fish, and aromatic peppers',
    price: 26,
    image: efoRiroImg,
    category: 'soup',
  },
  {
    id: 'okra-soup',
    name: 'Okra Soup',
    description:
      'Silky, draw okra soup cooked with assorted meat and seafood — warming, wholesome, and full of depth',
    price: 24,
    image: okraSoupImg,
    category: 'soup',
  },
  {
    id: 'ogbono-soy',
    name: 'Ogbono Soy',
    description:
      'Draw soup made from ground ogbono seeds with a soy-enriched twist — thick, hearty, and deeply satisfying',
    price: 24,
    image: ogbonoSoyImg,
    category: 'soup',
  },
  {
    id: 'banga-soup',
    name: 'Banga Soup',
    description:
      'Thick, aromatic palm nut soup slow-cooked with fresh fish and fragrant hand-picked spices',
    price: 28,
    image: bangaSoupImg,
    category: 'soup',
  },
  {
    id: 'ofe-akwu',
    name: 'Ofe Akwu',
    description:
      'Rich, flavourful palm nut soup simmered with assorted meat and crayfish — warming and deeply comforting',
    price: 26,
    image: ofeAkwuImg,
    category: 'soup',
  },
  {
    id: 'afang-soup',
    name: 'Afang Soup',
    description:
      'A delicate, earthy soup made with afang leaves, waterleaf, and assorted proteins — layered with complex flavour',
    price: 30,
    image: afangSoupImg,
    category: 'soup',
  },
  {
    id: 'edikaikong',
    name: 'Edikaikong',
    description:
      'Highly nutritious leafy green soup packed with ugu and waterleaf, loaded with seafood and assorted meat',
    price: 28,
    image: edikaikongImg,
    category: 'soup',
  },
  {
    id: 'oha-soup',
    name: 'Oha Soup',
    description:
      'Delicate, earthy soup made with tender oha leaves and cocoyam thickener, rich with assorted meats',
    price: 28,
    image: ohaSoupImg,
    category: 'soup',
  },

  // Swallow
  {
    id: 'pounded-yam',
    name: 'Pounded Yam',
    description:
      'Silky, smooth yam dough pounded to perfection — a classic, versatile swallow best enjoyed with any rich soup',
    price: 12,
    image: poundedYamImg,
    category: 'swallow',
  },
  {
    id: 'fufu',
    name: 'Fufu',
    description:
      'Smooth, stretchy cassava dough — a soft and satisfying side to pair with any hearty soup',
    price: 10,
    image: fufuImg,
    category: 'swallow',
  },
  {
    id: 'garri',
    name: 'Garri',
    description:
      'Light cassava flakes served with cold water, sugar, groundnuts, and milk — a wholesome and satisfying snack',
    price: 6,
    image: garriImg,
    category: 'swallow',
  },
];
