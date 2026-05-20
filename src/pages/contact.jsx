import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderThree from "@/layout/headers/header-3";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";

const ContactPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Contact" description={seoDescriptions.contact} />
      <div className="tb-contact-page__top">
        <HeaderThree />
        <section className="tb-contact-page__hero">
          <div className="tb-contact-page__hero-inner">
            <nav className="tb-contact-page__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Contact</span>
            </nav>
            <h1 className="tb-contact-page__title">Contact us</h1>
            <p className="tb-contact-page__lead">
              Questions about orders, products, or delivery? We&apos;re here to help.
            </p>
          </div>
        </section>
      </div>
      <ContactArea />
      <ContactMap />
      <FooterTwo />
    </Wrapper>
  );
};

export default ContactPage;
