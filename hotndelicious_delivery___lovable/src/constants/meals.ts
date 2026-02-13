import type { MealItem } from "./siteConfig";

import jollofImg from "@/assets/meals/jollof-rice.jpg";
import friedRiceImg from "@/assets/meals/fried-rice.jpg";
import egusiImg from "@/assets/meals/egusi-soup.jpg";
import pepperSoupImg from "@/assets/meals/pepper-soup.jpg";
import catfishSoupImg from "@/assets/meals/catfish-pepper-soup.jpg";
import suyaImg from "@/assets/meals/suya.jpg";
import moiMoiImg from "@/assets/meals/moi-moi.jpg";
import ofadaImg from "@/assets/meals/ofada-rice.jpg";
import friedPlantainImg from "@/assets/meals/fried-plantain.jpg";
import roastedPlantainImg from "@/assets/meals/roasted-plantain.jpg";
import asunImg from "@/assets/meals/asun.jpg";
import smallChopsImg from "@/assets/meals/small-chops.jpg";

export const meals: MealItem[] = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    description: "The iconic West African rice dish cooked in rich tomato sauce with aromatic spices",
    price: 12,
    image: jollofImg,
    category: "rice",
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    description: "Nigerian-style fried rice with vegetables, prawns, and seasoning",
    price: 12,
    image: friedRiceImg,
    category: "rice",
  },
  {
    id: "egusi-pounded-yam",
    name: "Egusi Soup + Pounded Yam",
    description: "Melon seed soup with leafy vegetables, served with smooth pounded yam",
    price: 15,
    image: egusiImg,
    category: "soup",
  },
  {
    id: "egusi-eba",
    name: "Egusi Soup + Eba",
    description: "Melon seed soup with leafy vegetables, served with cassava flour swallow",
    price: 14,
    image: egusiImg,
    category: "soup",
  },
  {
    id: "egusi-amala",
    name: "Egusi Soup + Amala",
    description: "Melon seed soup with leafy vegetables, served with yam flour swallow",
    price: 14,
    image: egusiImg,
    category: "soup",
  },
  {
    id: "pepper-soup-goat",
    name: "Pepper Soup (Goat)",
    description: "Spicy, aromatic broth with tender goat meat",
    price: 14,
    image: pepperSoupImg,
    category: "soup",
  },
  {
    id: "pepper-soup-catfish",
    name: "Pepper Soup (Catfish)",
    description: "Light, peppery soup with fresh catfish",
    price: 13,
    image: catfishSoupImg,
    category: "soup",
  },
  {
    id: "suya",
    name: "Suya",
    description: "Smoky, spiced grilled beef skewers with yaji seasoning",
    price: 10,
    image: suyaImg,
    category: "grill",
  },
  {
    id: "moi-moi",
    name: "Moi Moi",
    description: "Steamed bean pudding with eggs and fish",
    price: 8,
    image: moiMoiImg,
    category: "sides",
  },
  {
    id: "ofada-rice",
    name: "Ofada Rice & Stew",
    description: "Local unpolished rice served with spicy ofada sauce",
    price: 14,
    image: ofadaImg,
    category: "rice",
  },
  {
    id: "fried-plantain",
    name: "Fried Plantain (Dodo)",
    description: "Sweet, caramelized fried plantain",
    price: 5,
    image: friedPlantainImg,
    category: "sides",
  },
  {
    id: "roasted-plantain",
    name: "Roasted Plantain (Boli)",
    description: "Fire-roasted plantain with groundnut",
    price: 5,
    image: roastedPlantainImg,
    category: "sides",
  },
  {
    id: "asun",
    name: "Asun",
    description: "Spicy smoked goat meat — a party favourite",
    price: 12,
    image: asunImg,
    category: "grill",
  },
  {
    id: "small-chops",
    name: "Small Chops (Party Pack)",
    description: "Assortment of puff puff, samosa, spring rolls, chicken",
    price: 20,
    image: smallChopsImg,
    category: "party",
  },
];
