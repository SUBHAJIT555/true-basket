import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
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
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
