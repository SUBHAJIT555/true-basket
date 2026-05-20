import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
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
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default TermsAndConditionsPage;
