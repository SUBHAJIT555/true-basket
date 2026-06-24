import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import PrivacyArea from "@/components/terms/privacy-area";

const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle="Privacy Policy"
        description={seoDescriptions["privacy-policy"]}
      />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Privacy Policy"
        subtitle="Privacy Policy"
        center={true}
      />
      <PrivacyArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
