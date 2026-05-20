import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import WishlistArea from "@/components/cart-wishlist/wishlist-area";
import { seoDescriptions } from "@/data/seo-descriptions";

const WishlistPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Wishlist" description={seoDescriptions.wishlist} />
      <div className="tb-wishlist-page__top">
        <HeaderThree />
        <section className="tb-wishlist-page__hero">
          <div className="tb-wishlist-page__hero-inner">
            <nav className="tb-wishlist-page__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Wishlist</span>
            </nav>
            <h1 className="tb-wishlist-page__title">Wishlist</h1>
          </div>
        </section>
      </div>
      <WishlistArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default WishlistPage;
