import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ReturnPolicyArea from "@/components/terms/return-policy-area";

const ReturnPolicyPage = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle="Return Policy"
        description={seoDescriptions["return-policy"]}
      />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Return Policy"
        subtitle="Return Policy"
        center={true}
      />
      <ReturnPolicyArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default ReturnPolicyPage;
