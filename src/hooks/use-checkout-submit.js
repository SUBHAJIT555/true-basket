import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// internal
import useCartInfo from "./use-cart-info";
import { removeAllItemsFromCart } from "@/redux/features/cartSlice";
import { notifyError } from "@/utils/toast";
import { submitToApi } from "@/lib/submit-api";
import { getSellingPrice } from "@/lib/cart-price";

/**
 * Quote-based checkout: collect billing + cart, POST to API, on success clear cart and redirect to /mail-success.
 * No payment, no shipping charges, no login.
 */
const useCheckoutSubmit = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const dispatch = useDispatch();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setError(null);

    if (!cart_products?.length) {
      setError("Your cart is empty. Add items before requesting a quote.");
      return;
    }

    setSubmitting(true);

    const orderItems = cart_products.map((item) => ({
      name: item.title,
      quantity: item.orderQuantity,
      price: getSellingPrice(item),
    }));

    const payload = {
      formType: "quote",
      billing_first_name: data.firstName?.trim() ?? "",
      billing_last_name: data.lastName?.trim() ?? "",
      billing_email: data.email?.trim() ?? "",
      billing_phone: data.contactNo?.trim() ?? "",
      billing_address: data.address?.trim() ?? "",
      billing_town: data.city?.trim() ?? "",
      billing_state: data.state?.trim() ?? "",
      postcode: data.zipCode?.trim() ?? "",
      notes: data.orderNote?.trim() ?? "",
      cart_items: orderItems,
      cart_total: String(total.toFixed(2)),
      order_total: String(total.toFixed(2)),
    };

    try {
      const result = await submitToApi(payload);

      if (!result.success) {
        setError(result.error || "Request failed. Please try again.");
        setSubmitting(false);
        return;
      }

      dispatch(removeAllItemsFromCart());
      setSubmitting(false);
      router.push("/mail-success");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    submitHandler,
    submitting,
    error,
    total,
    cart_products,
  };
};

export default useCheckoutSubmit;
