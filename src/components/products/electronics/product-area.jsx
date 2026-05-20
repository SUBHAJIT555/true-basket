import React, { useState, useMemo } from "react";
import { useGetTrendingTabsProductsQuery } from "@/redux/features/productApi";
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";

const tabs = [
  { id: "new", label: "New" },
  { id: "featured", label: "Featured" },
  { id: "topSellers", label: "TopSellers" },
];

const ProductArea = () => {
  const [activeTab, setActiveTab] = useState("new");
  const { data, isError, isLoading } = useGetTrendingTabsProductsQuery();

  const productItems = useMemo(() => {
    if (!data) return [];
    if (activeTab === "new") return data.newProducts ?? [];
    if (activeTab === "featured") return data.featuredProducts ?? [];
    if (activeTab === "topSellers") return data.topSellersProducts ?? [];
    return [];
  }, [data, activeTab]);

  const handleActiveTab = (tab) => setActiveTab(tab);

  let content = null;
  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && productItems.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && productItems.length > 0) {
    content = productItems.map((prd) => (
      <div key={prd._id} className="col-xl-3 col-lg-3 col-sm-6">
        <ProductItem product={prd} />
      </div>
    ));
  }
  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper mb-40">
              <h3 className="tp-section-title">
                Trending Products
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-7">
            <div className="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
              <ul className="nav nav-tabs justify-content-sm-end">
                {tabs.map((tab) => (
                  <li key={tab.id} className="nav-item">
                    <button
                      onClick={() => handleActiveTab(tab.id)}
                      className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                    >
                      {tab.label}
                      <span className="tp-product-tab-line">
                        <TabLine />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ProductArea;
