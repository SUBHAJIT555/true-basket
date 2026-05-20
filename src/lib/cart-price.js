export const getSellingPrice = (item) => {
  const { price, discountedPrice, discount } = item || {};
  if (discountedPrice && discountedPrice < price) return discountedPrice;
  if (discount > 0) {
    return Number(price) - (Number(price) * Number(discount)) / 100;
  }
  return price;
};
