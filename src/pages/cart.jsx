import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CartArea from "@/components/cart-wishlist/cart-area";
import { seoDescriptions } from "@/data/seo-descriptions";

const CartPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" description={seoDescriptions.cart} />
      <div className="tb-cart-page__top">
        <HeaderThree />
        <section className="tb-cart-page__hero">
          <div className="tb-cart-page__hero-inner">
            <nav className="tb-cart-page__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Shopping cart</span>
            </nav>
            <h1 className="tb-cart-page__title">Shopping cart</h1>
          </div>
        </section>
      </div>
      <CartArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default CartPage;
