import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { submitToApi } from "@/lib/submit-api";
import { siteInfo } from "@/data/contact-info";

const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Message"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to proceed.")
    .label("Terms and Conditions"),
});

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!data) return;
    setSubmitting(true);
    const result = await submitToApi({
      formType: "contact",
      name: data.name?.trim() ?? "",
      email: data.email?.trim() ?? "",
      subject: data.subject?.trim() ?? "",
      message: data.message?.trim() ?? "",
      phone: data.phone?.trim() ?? "",
    });
    setSubmitting(false);
    if (result.success) {
      notifySuccess("Message sent successfully!");
      reset();
    } else {
      notifyError(result.error || "Failed to send message.");
    }
  };

  return (
    <form className="tb-contact-form" onSubmit={handleSubmit(onSubmit)} id="contact-form" noValidate>
      <div className="tb-contact-form__row tb-contact-form__row--half">
        <div className="tb-contact-form__field">
          <label htmlFor="name" className="tb-contact-form__label">
            Your name
          </label>
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            className="tb-contact-form__input"
            placeholder="Full name"
            autoComplete="name"
          />
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="tb-contact-form__field">
          <label htmlFor="email" className="tb-contact-form__label">
            Email address
          </label>
          <input
            {...register("email")}
            id="email"
            name="email"
            type="email"
            className="tb-contact-form__input"
            placeholder={siteInfo.email}
            autoComplete="email"
          />
          <ErrorMsg msg={errors.email?.message} />
        </div>
      </div>

      <div className="tb-contact-form__field">
        <label htmlFor="subject" className="tb-contact-form__label">
          Subject
        </label>
        <input
          {...register("subject")}
          id="subject"
          name="subject"
          type="text"
          className="tb-contact-form__input"
          placeholder="How can we help?"
        />
        <ErrorMsg msg={errors.subject?.message} />
      </div>

      <div className="tb-contact-form__field">
        <label htmlFor="message" className="tb-contact-form__label">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          name="message"
          className="tb-contact-form__input tb-contact-form__input--area"
          placeholder="Tell us about your order, product question, or feedback…"
          rows={6}
        />
        <ErrorMsg msg={errors.message?.message} />
      </div>

      <div className="tb-contact-form__remember">
        <input
          {...register("remember")}
          id="remember"
          name="remember"
          type="checkbox"
          className="tb-contact-form__checkbox"
        />
        <label htmlFor="remember">
          I agree that {siteInfo.companyName} may store my details to respond to this
          enquiry.
        </label>
        <ErrorMsg msg={errors.remember?.message} />
      </div>

      <div className="tb-contact-form__actions">
        <button type="submit" className="tb-contact-form__submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
