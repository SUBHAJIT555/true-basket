import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError } from "@/utils/toast";

const ProductItem = ({ product }) => {
  const { _id, title, price, discountedPrice, img, status, rating, reviews } =
    product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  const sellingPrice =
    discountedPrice && discountedPrice < price ? discountedPrice : price;
  const originalPrice =
    discountedPrice && discountedPrice < price ? price : null;
  const reviewCount = Array.isArray(reviews) ? reviews.length : 0;
  const ratingValue = Number(rating) || 0;

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
            sizes="(max-width: 576px) 50vw, 280px"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </button>
        {status === "out-of-stock" && (
          <span className="tb-product-card__badge">Out of stock</span>
        )}
      </div>

      <div className="tb-product-card__actions">
        {isAddedToCart ? (
          <Link
            href="/cart"
            className="tb-product-card__action-btn is-active"
            aria-label="View cart"
          >
            <Cart />
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAddProduct}
            className="tb-product-card__action-btn"
            disabled={status === "out-of-stock"}
            aria-label="Add to cart"
          >
            <Cart />
          </button>
        )}
        <button
          type="button"
          onClick={openModal}
          className="tb-product-card__action-btn"
          aria-label="Quick view"
        >
          <QuickView />
        </button>
        <button
          type="button"
          onClick={handleWishlistProduct}
          className={`tb-product-card__action-btn${isAddedToWishlist ? " is-active" : ""}`}
          disabled={status === "out-of-stock"}
          aria-label="Add to wishlist"
        >
          <Wishlist />
        </button>
      </div>

      <div className="tb-product-card__body">
        <h3 className="tb-product-card__title">
          <button type="button" className="tb-product-card__title-btn" onClick={openModal}>
            {title}
          </button>
        </h3>

        {(ratingValue > 0 || reviewCount > 0) && (
          <div className="tb-product-card__rating">
            <Rating
              allowFraction
              size={14}
              initialValue={ratingValue}
              readonly
              fillColor="#f59e0b"
            />
            <span className="tb-product-card__rating-count">
              {reviewCount > 0
                ? `(${reviewCount} ${reviewCount === 1 ? "Review" : "Reviews"})`
                : `(${ratingValue.toFixed(1)})`}
            </span>
          </div>
        )}

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

export default ProductItem;
