import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import AboutArea from "@/components/about/about-area";

const AboutPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="About Us" description={seoDescriptions.about} />
      <div className="dc-about-page__top">
        <HeaderThree />
        <section className="dc-about-page__hero">
          <div className="container">
            <nav className="dc-about-page__breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>About Us</span>
            </nav>
            <h1 className="dc-about-page__title">About Us</h1>
          </div>
        </section>
      </div>
      <AboutArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default AboutPage;
