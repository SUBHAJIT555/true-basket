import React, { useState } from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";

const SHIPPING_OPTIONS = [
  { id: "flat_rate", label: "Flat rate", amount: 20 },
  { id: "local_pickup", label: "Local pickup", amount: 25 },
  { id: "free_shipping", label: "Free shipping", amount: 0 },
];

const CartCheckout = () => {
  const { total } = useCartInfo();
  const [shippingId, setShippingId] = useState("free_shipping");

  const selectedShipping =
    SHIPPING_OPTIONS.find((opt) => opt.id === shippingId) || SHIPPING_OPTIONS[2];
  const shipCost = selectedShipping.amount;
  const grandTotal = total + shipCost;

  return (
    <div className="tb-cart-page__summary">
      <h2 className="tb-cart-page__summary-title">Order summary</h2>

      <div className="tb-cart-page__summary-row">
        <span>Subtotal</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div className="tb-cart-page__shipping-block">
        <h3 className="tb-cart-page__shipping-title">Shipping</h3>
        <ul className="tb-cart-page__shipping-list">
          {SHIPPING_OPTIONS.map((opt) => (
            <li key={opt.id}>
              <label className="tb-cart-page__shipping-option">
                <input
                  type="radio"
                  name="shipping"
                  value={opt.id}
                  checked={shippingId === opt.id}
                  onChange={() => setShippingId(opt.id)}
                />
                <span className="tb-cart-page__shipping-label">
                  {opt.label}
                  {opt.amount > 0 && <strong>₹{opt.amount.toFixed(2)}</strong>}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="tb-cart-page__summary-row tb-cart-page__summary-row--total">
        <span>Total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>

      <Link href="/checkout" className="tb-cart-page__checkout-btn">
        Proceed to checkout
      </Link>
    </div>
  );
};

export default CartCheckout;
