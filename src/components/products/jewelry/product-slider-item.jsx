import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError } from "@/utils/toast";

const ProductSliderItem = ({ product }) => {
  const { _id, title, price, discountedPrice, img, status } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  const sellingPrice =
    discountedPrice && discountedPrice < price ? discountedPrice : price;
  const originalPrice =
    discountedPrice && discountedPrice < price ? price : null;

  const openModal = () => {
    dispatch(handleProductModal({ ...product }));
  };

  const handleAddProduct = () => {
    if (status === "out-of-stock") {
      notifyError("This product is out of stock");
    } else {
      dispatch(add_cart_product(product));
    }
  };

  const handleWishlistProduct = () => {
    dispatch(add_to_wishlist(product));
  };

  return (
    <article className="tb-product-card">
      <div className="tb-product-card__media">
        <button type="button" className="tb-product-card__img-btn" onClick={openModal}>
          <Image
            src={img}
            alt={title}
            width={280}
            height={320}
            sizes="(max-width: 576px) 85vw, 240px"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </button>
        {status === "out-of-stock" && (
          <span className="tb-product-card__badge">Out of stock</span>
        )}
      </div>

      <div className="tb-product-card__actions swiper-no-swiping">
        <button
          type="button"
          onClick={handleAddProduct}
          className={`tb-product-card__action-btn ${isAddedToCart ? "is-active" : ""}`}
          aria-label="Add to cart"
        >
          <Cart />
          <span className="tb-product-card__tooltip">Add to cart</span>
        </button>
        <button
          type="button"
          onClick={openModal}
          className="tb-product-card__action-btn"
          aria-label="Quick view"
        >
          <QuickView />
          <span className="tb-product-card__tooltip">Quick view</span>
        </button>
        <button
          type="button"
          onClick={handleWishlistProduct}
          className={`tb-product-card__action-btn ${isAddedToWishlist ? "is-active" : ""}`}
          aria-label="Add to wishlist"
        >
          <Wishlist />
          <span className="tb-product-card__tooltip">Wishlist</span>
        </button>
      </div>

      <div className="tb-product-card__body">
        <h3 className="tb-product-card__title">
          <button type="button" className="tb-product-card__title-btn" onClick={openModal}>
            {title}
          </button>
        </h3>
        <div className="tb-product-card__price">
          <span className="tb-product-card__price-current">₹{sellingPrice?.toFixed(2)}</span>
          {originalPrice && (
            <span className="tb-product-card__price-old">₹{originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductSliderItem;
