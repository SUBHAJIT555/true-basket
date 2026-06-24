import React from "react";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import HeaderTwo from "@/layout/headers/header-2";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import CouponArea from "@/components/coupon/coupon-area";

const CouponPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Coupon" description={seoDescriptions.coupon} />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Grab Best Offer" subtitle="Coupon" />
      <CouponArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default CouponPage;
