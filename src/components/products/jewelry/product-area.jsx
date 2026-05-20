import ErrorMsg from "@/components/common/error-msg";
import { useGetProductsByVariantQuery } from "@/redux/features/productApi";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/router";
import ProductItem from "./product-item";
import { HomeTwoPrdLoader } from "@/components/loader";
import { ArrowRight } from "@/svg";
import { getSiteNumber } from "@/lib/siteConfig";
import { siteInfo } from "@/data/contact-info";

const ProductArea = ({ defaultCategory = "All Collection" }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultCategory);
  const [categoryCounts, setCategoryCounts] = useState({});
  const activeRef = useRef(null);
  const marker = useRef(null);

  const variantId = useMemo(() => {
    try {
      const siteNumber = getSiteNumber();
      const mod = siteNumber % 10;
      return mod === 0 ? 10 : mod;
    } catch {
      return 1;
    }
  }, []);

  const { data: productsData, isError, isLoading } = useGetProductsByVariantQuery({
    variantId,
    category: activeTab,
  });

  const variantConfig = productsData?.variantConfig;
  const tabs =
    variantConfig?.tabs || ["All Collection", "Man Wear", "Women Wear", "Kids Wear"];
  const title = variantConfig?.title || "Home, Office & Everyday Essentials";
  const subtitle = variantConfig?.subtitle || "Product Collection";

  useEffect(() => {
    if (productsData?.totalCount !== undefined) {
      setCategoryCounts((prev) => ({
        ...prev,
        [activeTab]: productsData.totalCount,
      }));
    }
  }, [activeTab, productsData?.totalCount]);

  const getCategoryCount = (tab) => {
    return categoryCounts[tab] || (tab === activeTab ? productsData?.totalCount || 0 : 0);
  };

  useEffect(() => {
    if (activeRef.current && marker.current) {
      marker.current.style.left = `${activeRef.current.offsetLeft}px`;
      marker.current.style.width = `${activeRef.current.offsetWidth}px`;
    }
  }, [activeTab, productsData, tabs]);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleShowMore = () => {
    if (!variantConfig) return;

    const categoryConfig = variantConfig.categoryMap[activeTab];

    if (activeTab === "All Collection" || !categoryConfig?.slug) {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${categoryConfig.slug}`);
    }
  };

  let content = null;

  if (isLoading) {
    content = <HomeTwoPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!productsData?.data?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    const product_items = productsData.data;

    content = (
      <>
        <header className="tb-collection__header">
          <div className="tb-collection__intro">
            <p className="tb-collection__badge">{subtitle}</p>
            <h2 id="tb-collection-heading" className="tb-collection__title">
              {title.split(" ").length > 3 ? (
                <>
                  {title.split(" ").slice(0, -2).join(" ")}{" "}
                  <span>{title.split(" ").slice(-2).join(" ")}</span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="tb-collection__desc">
              Browse curated picks in{" "}
              <strong>electronics, stationery, garments and fashion accessories</strong>{" "}
              for your home, office and everyday life on {siteInfo.companyName}.
            </p>
          </div>

          <nav className="tb-collection__tabs" aria-label="Product categories">
            <div className="tb-collection__tabs-inner">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  ref={activeTab === tab ? activeRef : null}
                  type="button"
                  onClick={() => handleActiveTab(tab)}
                  className={`tb-collection__tab${activeTab === tab ? " is-active" : ""}`}
                >
                  <span className="tb-collection__tab-label">{tab.split("-").join(" ")}</span>
                  <span className="tb-collection__tab-count">{getCategoryCount(tab)}</span>
                </button>
              ))}
              <span ref={marker} className="tb-collection__tab-marker" aria-hidden="true" />
            </div>
          </nav>
        </header>

        <div className="tb-collection__grid">
          {product_items.map((prd) => (
            <div key={prd._id} className="tb-collection__col">
              <ProductItem product={prd} />
            </div>
          ))}
        </div>

        <div className="tb-collection__footer">
          <button type="button" onClick={handleShowMore} className="tb-collection__more-btn">
            Show more
            <ArrowRight />
          </button>
        </div>
      </>
    );
  }

  return (
    <section className="tb-collection" aria-labelledby="tb-collection-heading">
      <div className="tb-collection__inner">{content}</div>
    </section>
  );
};

export default ProductArea;
