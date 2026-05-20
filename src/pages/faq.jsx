import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import FaqArea from "@/components/faq/faq-area";

const FAQPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="FAQ" description={seoDescriptions.faq} />
      <div className="tb-faq-page__top">
        <HeaderThree />
        <section className="tb-faq-page__hero">
          <div className="tb-faq-page__hero-inner">
            <nav className="tb-faq-page__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>FAQ</span>
            </nav>
            <h1 className="tb-faq-page__title">Frequently asked questions</h1>
            <p className="tb-faq-page__lead">
              Quick answers about quotes, delivery, payments, and getting help from our team.
            </p>
          </div>
        </section>
      </div>
      <FaqArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default FAQPage;
