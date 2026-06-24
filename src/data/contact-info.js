/**
 * Single source of truth for company and contact information across the website.
 * Update these values in one place to reflect everywhere (footer, header, SEO, contact pages).
 */

export const siteInfo = {
  companyName: "True Basket",
  domain: "true-basket.com",
  tagline: "Your daily essentials, delivered to your door.",
  email: "info@true-basket.com",
  websiteUrl: "https://true-basket.com",
};

export const contactInfo = {
  ...siteInfo,

  // Indian phone: +91 and 10-digit number (no spaces in tel: for reliable dialing)
  phone: "+91 98765 43210",
  phoneRaw: "919876543210", // digits only for tel: link
  telLink: "tel:+919876543210",

  email: siteInfo.email,
  mailtoLink: `mailto:${siteInfo.email}`,

  // Indian address (line1, line2, city state pin)
  address: {
    line1: '123, Main Road',
    line2: 'Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400058',
  },
  // Single string for display (e.g. footer, contact page)
  addressDisplay: '123, Main Road, Andheri West, Mumbai, Maharashtra 400058',
  // Google Maps embed URL (optional – replace with your actual location)
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.714912999623!2d72.8392143149002!3d19.113557987115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c5e87d2e7f1d%3A0x2f2b2b2b2b2b2b2b!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1678114595329!5m2!1sen!2sin',
  // Optional: link to open in Google Maps
  mapLink: 'https://www.google.com/maps/place/Mumbai,+Maharashtra',
};

export default contactInfo;
