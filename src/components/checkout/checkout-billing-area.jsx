import React from "react";
import ErrorMsg from "../common/error-msg";

const CheckoutBillingArea = ({ register, errors }) => {
  return (
    <div className="tb-checkout__billing">
      <h2 className="tb-checkout__billing-title">Billing details</h2>

      <div className="tb-checkout__fields">
        <div className="tb-checkout__row">
          <div className="tb-checkout__field">
            <label htmlFor="firstName">
              First name <span className="tb-checkout__req">*</span>
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
              id="firstName"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
            />
            <ErrorMsg msg={errors?.firstName?.message} />
          </div>
          <div className="tb-checkout__field">
            <label htmlFor="lastName">
              Last name <span className="tb-checkout__req">*</span>
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              id="lastName"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
            />
            <ErrorMsg msg={errors?.lastName?.message} />
          </div>
        </div>

        <div className="tb-checkout__field tb-checkout__field--full">
          <label htmlFor="address">
            Street address <span className="tb-checkout__req">*</span>
          </label>
          <input
            {...register("address", { required: "Street address is required" })}
            id="address"
            type="text"
            placeholder="House number and street name"
            autoComplete="street-address"
          />
          <ErrorMsg msg={errors?.address?.message} />
        </div>

        <div className="tb-checkout__field tb-checkout__field--full">
          <label htmlFor="city">
            Town / city <span className="tb-checkout__req">*</span>
          </label>
          <input
            {...register("city", { required: "Town/City is required" })}
            id="city"
            type="text"
            placeholder="Town / city"
            autoComplete="address-level2"
          />
          <ErrorMsg msg={errors?.city?.message} />
        </div>

        <div className="tb-checkout__row">
          <div className="tb-checkout__field">
            <label htmlFor="state">State / country (optional)</label>
            <input
              {...register("state")}
              id="state"
              type="text"
              placeholder="State or country"
              autoComplete="address-level1"
            />
          </div>
          <div className="tb-checkout__field">
            <label htmlFor="zipCode">Postcode / ZIP (optional)</label>
            <input
              {...register("zipCode")}
              id="zipCode"
              type="text"
              placeholder="Postcode / ZIP"
              autoComplete="postal-code"
            />
          </div>
        </div>

        <div className="tb-checkout__field tb-checkout__field--full">
          <label htmlFor="contactNo">
            Phone <span className="tb-checkout__req">*</span>
          </label>
          <input
            {...register("contactNo", { required: "Phone is required" })}
            id="contactNo"
            type="tel"
            placeholder="Phone"
            autoComplete="tel"
          />
          <ErrorMsg msg={errors?.contactNo?.message} />
        </div>

        <div className="tb-checkout__field tb-checkout__field--full">
          <label htmlFor="email">
            Email <span className="tb-checkout__req">*</span>
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <ErrorMsg msg={errors?.email?.message} />
        </div>

        <div className="tb-checkout__field tb-checkout__field--full">
          <label htmlFor="orderNote">Note about your order (optional)</label>
          <textarea
            {...register("orderNote")}
            id="orderNote"
            rows={4}
            placeholder="Notes about your order, e.g. special requests."
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
