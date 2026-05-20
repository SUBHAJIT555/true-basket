import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import { getSellingPrice } from "@/lib/cart-price";

const CheckoutOrderArea = ({ checkoutData }) => {
  const { submitting, error } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total: cartTotal } = useCartInfo();

  return (
    <div className="tb-checkout__order">
      <h2 className="tb-checkout__order-title">Your order</h2>

      <ul className="tb-checkout__order-list">
        <li className="tb-checkout__order-head">
          <span>Product</span>
          <span>Total</span>
        </li>

        {cart_products.map((item) => {
          const unit = getSellingPrice(item);
          const line = unit * item.orderQuantity;
          return (
            <li key={item._id} className="tb-checkout__order-row">
              <p className="tb-checkout__order-product">
                {item.title} <span className="tb-checkout__order-qty">× {item.orderQuantity}</span>
              </p>
              <span className="tb-checkout__order-line">₹{line.toFixed(2)}</span>
            </li>
          );
        })}

        <li className="tb-checkout__order-subtotal">
          <span>Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </li>

        <li className="tb-checkout__order-total">
          <span>Total</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </li>
      </ul>

      {error && <div className="tb-checkout__error" role="alert">{error}</div>}

      <div className="tb-checkout__submit-wrap">
        <button type="submit" disabled={submitting} className="tb-checkout__submit">
          {submitting ? "Sending…" : "Ask for quote"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
