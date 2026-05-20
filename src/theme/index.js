const trueBasket = require("./sites/true-basket");

const themes = {
  "true-basket": trueBasket,
  "daily-cart": trueBasket,
};

const themeId = process.env.NEXT_PUBLIC_SITE_THEME || "true-basket";

module.exports = themes[themeId] || trueBasket;
