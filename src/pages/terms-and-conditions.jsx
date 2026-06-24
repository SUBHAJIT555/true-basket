import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import TermsArea from "@/components/terms/terms-area";

const TermsAndConditionsPage = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle="Terms and Conditions"
        description={seoDescriptions["terms-and-conditions"]}
      />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Terms and Conditions"
        subtitle="Terms and Conditions"
        center={true}
      />
      <TermsArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default TermsAndConditionsPage;
