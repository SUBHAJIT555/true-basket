/**
 * True Basket — hero & shop category list (single source of truth).
 */
import MobileAccessoriesHero from "@assets/images/HeroImages/MobileAccessoriesHero.webp";
import SmartGadgetsHero from "@assets/images/HeroImages/SmartGadgetsHero.webp";
import ComputerAccessoriesHero from "@assets/images/HeroImages/ComputerAccessoriesHero.webp";
import HomeElectronicsHero from "@assets/images/HeroImages/HomeElectronicsHero.webp";
import BooksHero from "@assets/images/HeroImages/BooksHero.webp";
import StationeryItemsHero from "@assets/images/HeroImages/StationeryItemsHero.webp";
import MensWearHero from "@assets/images/HeroImages/Men'sWearHero.webp";
import WomensWearHero from "@assets/images/HeroImages/Women'sWearHero.webp";
import KidsWearHero from "@assets/images/HeroImages/KidsWearHero.webp";
import FashionAccessoriesHero from "@assets/images/HeroImages/FashionAccessoriesHero.webp";

export const heroCategories = [
  { id: "mobile", title: "Mobile Accessories", slug: "mobile-accessories", img: MobileAccessoriesHero, count: 70 },
  { id: "gadgets", title: "Smart Gadgets", slug: "smart-gadgets", img: SmartGadgetsHero, count: 41 },
  { id: "computer", title: "Computer Accessories", slug: "computer-accessories", img: ComputerAccessoriesHero, count: 40 },
  { id: "home", title: "Home Electronics", slug: "home-electronics", img: HomeElectronicsHero, count: 46 },
  { id: "books", title: "Books", slug: "books", img: BooksHero, count: 50 },
  { id: "stationery", title: "Stationery", slug: "stationery", img: StationeryItemsHero, count: 51 },
  { id: "mens", title: "Men's Wear", slug: "mens-wear", img: MensWearHero, count: 50 },
  { id: "womens", title: "Women's Wear", slug: "womens-wear", img: WomensWearHero, count: 51 },
  { id: "kids", title: "Kids' Wear", slug: "kids-wear", img: KidsWearHero, count: 50 },
  { id: "fashion", title: "Fashion Accessories", slug: "fashion-accessories", img: FashionAccessoriesHero, count: 51 },
];

export default heroCategories;
