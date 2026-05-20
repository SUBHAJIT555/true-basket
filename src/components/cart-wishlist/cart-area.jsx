import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <section className="tb-cart-page">
      <div className="tb-cart-page__inner">
        {cart_products.length === 0 ? (
          <div className="tb-cart-page__empty">
            <h2>Your cart is empty</h2>
            <p>Add items from the shop to see them here.</p>
            <Link href="/shop" className="tb-cart-page__shop-btn">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="tb-cart-page__layout">
            <div className="tb-cart-page__main">
              <div className="tb-cart-page__shipping">
                <RenderCartProgress />
              </div>

              <div className="tb-cart-page__table">
                <div className="tb-cart-page__table-head" aria-hidden="true">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span />
                </div>
                <ul className="tb-cart-page__list">
                  {cart_products.map((item) => (
                    <CartItem key={item._id} product={item} />
                  ))}
                </ul>
              </div>

              <div className="tb-cart-page__actions">
                <Link href="/shop" className="tb-cart-page__continue-link">
                  ← Continue shopping
                </Link>
                <button
                  type="button"
                  className="tb-cart-page__clear-btn"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear cart
                </button>
              </div>
            </div>

            <aside className="tb-cart-page__aside">
              <CartCheckout />
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartArea;
