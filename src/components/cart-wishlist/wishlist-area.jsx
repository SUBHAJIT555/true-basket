import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";

const WishlistArea = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <section className="tb-wishlist-page">
      <div className="tb-wishlist-page__inner">
        {wishlist.length === 0 ? (
          <div className="tb-wishlist-page__empty">
            <h2>No wishlist items yet</h2>
            <p>Save products you love and add them to cart anytime.</p>
            <Link href="/shop" className="tb-wishlist-page__shop-btn">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="tb-wishlist-page__table">
              <div className="tb-wishlist-page__table-head" aria-hidden="true">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Action</span>
                <span />
              </div>
              <ul className="tb-wishlist-page__list">
                {wishlist.map((item) => (
                  <WishlistItem key={item._id} product={item} />
                ))}
              </ul>
            </div>

            <div className="tb-wishlist-page__footer">
              <Link href="/shop" className="tb-wishlist-page__continue-link">
                ← Continue shopping
              </Link>
              <Link href="/cart" className="tb-wishlist-page__cart-btn">
                Go to cart
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WishlistArea;
