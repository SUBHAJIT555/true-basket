import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";

const MailSuccessPage = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle="Quote Request Sent"
        description={seoDescriptions["mail-success"]}
      />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Quote Request Sent"
        subtitle="Thank you"
        center={true}
      />
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="tp-checkout-place white-bg p-5">
                <h2 className="mb-3">Thank you for your quote request</h2>
                <p className="mb-4">
                  We have received your request and will get back to you with a
                  quote shortly.
                </p>
                <Link href="/shop" className="tp-checkout-btn">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default MailSuccessPage;
