import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const { handleSubmit, submitHandler, register, errors } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);

  return (
    <section className="tb-checkout">
      <div className="tb-checkout__inner">
        {cart_products.length === 0 ? (
          <div className="tb-checkout__empty">
            <h2>No items in cart</h2>
            <p>Add products to your cart before requesting a quote.</p>
            <Link href="/shop" className="tb-checkout__shop-btn">
              Return to shop
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitHandler)} className="tb-checkout__form">
            <div className="tb-checkout__grid">
              <div className="tb-checkout__col tb-checkout__col--main">
                <CheckoutBillingArea register={register} errors={errors} />
              </div>
              <div className="tb-checkout__col tb-checkout__col--aside">
                <CheckoutOrderArea checkoutData={checkoutData} />
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CheckoutArea;
