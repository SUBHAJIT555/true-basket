/**
 * Page-specific meta descriptions for SEO. All include True Basket brand.
 * Used with <SEO pageTitle="..." description={seoDescriptions.key} /> in pages.
 */
import { siteInfo } from "./contact-info";

const brand = siteInfo.companyName;

export const seoDescriptions = {
  home: `${brand} — Fresh groceries, fruits, vegetables and daily essentials delivered fast.`,
  shop: `Shop at ${brand} for groceries, fresh produce, dairy, snacks, beverages and home essentials.`,
  about: `About ${brand}. Your trusted neighbourhood marketplace for everyday grocery needs.`,
  contact: `Contact ${brand}. Get in touch for orders, delivery and support.`,
  cart: `Your shopping cart at ${brand}. Review your groceries before checkout.`,
  checkout: `Secure checkout at ${brand}. Complete your grocery order safely.`,
  wishlist: `Your wishlist at ${brand}. Save favourite grocery items for later.`,
  faq: `Frequently asked questions about shopping with ${brand}.`,
  coupon: `Grab the best grocery offers and coupons at ${brand}.`,
  "privacy-policy": `${brand} Privacy Policy. How we collect, use and protect your information.`,
  "cookie-policy": `${brand} Cookie Policy. How we use cookies on our website.`,
  "terms-and-conditions": `${brand} Terms and Conditions. Terms of use for our website and services.`,
  "return-policy": `${brand} Return and Refund Policy. How to return or exchange items.`,
  "mail-success": `Thank you for contacting ${brand}. We will get back to you soon.`,
  "404": `Page not found. Return to ${brand} home.`,
  "shop-category": `Browse grocery categories at ${brand}. Fruits, vegetables, dairy, pantry staples and more.`,
};

export default seoDescriptions;
