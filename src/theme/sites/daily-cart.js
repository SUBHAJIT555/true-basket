/**
 * Daily Cart — site theme tokens.
 * Copy this file for each new ecom site; keep SCSS in theme/sites/ in sync.
 */
module.exports = {
  id: "daily-cart",
  name: "Daily Cart",

  colors: {
    primary: "#4F46E5",
    secondary: "#F97316",
    accent: "#10B981",
    primaryRgb: "79, 70, 229",
    error: "#DC2626",
    white: "#FFFFFF",
    black: "#0F172A",
    textBody: "#475569",
    border: "#E2E8F0",
    track: "#F1F5F9",
  },

  fonts: {
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    body: "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading:
      "var(--font-geist-sans), var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  toastClass: "daily-cart-toast",
};
