import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import RenderCartProgress from "./render-cart-progress";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import { closeCartMini, remove_product } from "@/redux/features/cartSlice";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { Close } from "@/svg";
import { getSellingPrice } from "@/lib/cart-price";

const CartMiniSidebar = () => {
  const { cart_products, cartMiniOpen } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };

  const handleOpenModal = (item) => {
    dispatch(handleProductModal({ ...item }));
  };

  return (
    <>
      <aside
        className={`tb-cart-drawer${cartMiniOpen ? " is-open" : ""}`}
        aria-hidden={!cartMiniOpen}
        aria-label="Shopping cart"
      >
        <div className="tb-cart-drawer__panel">
          <header className="tb-cart-drawer__header">
            <h2 className="tb-cart-drawer__title">Shopping cart</h2>
            <button
              type="button"
              className="tb-cart-drawer__close"
              onClick={handleCloseCartMini}
              aria-label="Close cart"
            >
              <Close />
            </button>
          </header>

          <RenderCartProgress />

          <div className="tb-cart-drawer__body">
            {cart_products.length > 0 ? (
              <ul className="tb-cart-drawer__list">
                {cart_products.map((item) => {
                  const unitPrice = getSellingPrice(item);

                  return (
                    <li key={item._id} className="tb-cart-drawer__item">
                      <button
                        type="button"
                        className="tb-cart-drawer__thumb"
                        onClick={() => handleOpenModal(item)}
                        aria-label={`View ${item.title}`}
                      >
                        <Image
                          src={item.img}
                          width={72}
                          height={72}
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </button>

                      <div className="tb-cart-drawer__item-body">
                        <button
                          type="button"
                          className="tb-cart-drawer__item-title"
                          onClick={() => handleOpenModal(item)}
                        >
                          {item.title}
                        </button>
                        <p className="tb-cart-drawer__item-meta">
                          <span className="tb-cart-drawer__item-price">
                            ₹{unitPrice?.toFixed(2)}
                          </span>
                          <span className="tb-cart-drawer__item-qty">
                            ×{item.orderQuantity}
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="tb-cart-drawer__remove"
                        onClick={() =>
                          handleRemovePrd({ title: item.title, id: item._id })
                        }
                        aria-label={`Remove ${item.title}`}
                      >
                        <Close />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="tb-cart-drawer__empty">
                <Image src={empty_cart_img} alt="Empty cart" />
                <p>Your cart is empty</p>
                <Link
                  href="/shop"
                  className="tb-cart-drawer__shop-btn"
                  onClick={handleCloseCartMini}
                >
                  Go to shop
                </Link>
              </div>
            )}
          </div>

          {cart_products.length > 0 && (
            <footer className="tb-cart-drawer__footer">
              <div className="tb-cart-drawer__subtotal">
                <span className="tb-cart-drawer__subtotal-label">Subtotal</span>
                <span className="tb-cart-drawer__subtotal-value">₹{total.toFixed(2)}</span>
              </div>
              <div className="tb-cart-drawer__actions">
                <Link
                  href="/cart"
                  className="tb-cart-drawer__btn tb-cart-drawer__btn--primary"
                  onClick={handleCloseCartMini}
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  className="tb-cart-drawer__btn tb-cart-drawer__btn--outline"
                  onClick={handleCloseCartMini}
                >
                  Checkout
                </Link>
              </div>
            </footer>
          )}
        </div>
      </aside>

      <button
        type="button"
        className={`tb-cart-drawer__overlay${cartMiniOpen ? " is-open" : ""}`}
        onClick={handleCloseCartMini}
        aria-label="Close cart overlay"
      />
    </>
  );
};

export default CartMiniSidebar;
