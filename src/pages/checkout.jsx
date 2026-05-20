import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import Wrapper from "@/layout/wrapper";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import CheckoutArea from "@/components/checkout/checkout-area";

const CheckoutPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Checkout" description={seoDescriptions.checkout} />
      <div className="tb-checkout-page__top">
        <HeaderThree />
        <section className="tb-checkout-page__hero">
          <div className="tb-checkout-page__hero-inner">
            <nav className="tb-checkout-page__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Checkout</span>
            </nav>
            <h1 className="tb-checkout-page__title">Checkout</h1>
          </div>
        </section>
      </div>
      <CheckoutArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default CheckoutPage;
