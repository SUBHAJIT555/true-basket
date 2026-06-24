import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import CookiePolicyArea from "@/components/terms/cookie-policy-area";

const CookiePolicyPage = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle="Cookie Policy"
        description={seoDescriptions["cookie-policy"]}
      />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Cookie Policy"
        subtitle="Cookie Policy"
        center={true}
      />
      <CookiePolicyArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default CookiePolicyPage;
