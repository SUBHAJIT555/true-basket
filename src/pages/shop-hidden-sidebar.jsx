import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import ShopHiddenSidebarArea from "@/components/shop/shop-hidden-sidebar-area";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import Footer from "@/layout/footers/footer";
import ShopHiddenLoader from "@/components/loader/shop/shop-hidden-loader";
import useDebounce from "@/hooks/use-debounce";

const ShopHiddenSidebarPage = () => {
  const router = useRouter();
  const query = router.query;

  // Skip query until client-side mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    data: products,
    isError,
    isLoading,
  } = useGetAllProductsQuery(undefined, { skip: !mounted });

  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [priceValue, setPriceValue] = useState([0, 0]);
  const priceInitializedRef = useRef(false);

  // Debounce price value for filtering and URL updates (500ms delay)
  const debouncedPriceValue = useDebounce(priceValue, 500);

  // Load the maximum price once the products have been loaded (capped at 10,000)
  // Also read minprice and maxprice from URL on mount
  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      products?.data?.length > 0 &&
      !priceInitializedRef.current
    ) {
      const calculatedMaxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      const maxPrice = Math.min(calculatedMaxPrice, 10000);

      // Read price from URL if available
      const urlMinPrice = query.minprice ? parseFloat(query.minprice) : 0;
      const urlMaxPrice = query.maxprice
        ? parseFloat(query.maxprice)
        : maxPrice;

      // Validate URL prices
      const validMinPrice =
        isNaN(urlMinPrice) || urlMinPrice < 0
          ? 0
          : Math.min(urlMinPrice, maxPrice);
      const validMaxPrice =
        isNaN(urlMaxPrice) || urlMaxPrice <= 0
          ? maxPrice
          : Math.min(urlMaxPrice, maxPrice);

      setPriceValue([validMinPrice, validMaxPrice]);
      priceInitializedRef.current = true;
    }
  }, [isLoading, isError, products, query.minprice, query.maxprice]);

  // Update URL when debounced price value changes
  useEffect(() => {
    if (!mounted || !router.isReady || !priceInitializedRef.current) return;

    const currentMinPrice = query.minprice ? parseFloat(query.minprice) : 0;
    const currentMaxPrice = query.maxprice ? parseFloat(query.maxprice) : 0;

    // Only update URL if price actually changed (with small tolerance for floating point)
    const minPriceChanged =
      Math.abs(currentMinPrice - debouncedPriceValue[0]) > 0.01;
    const maxPriceChanged =
      Math.abs(currentMaxPrice - debouncedPriceValue[1]) > 0.01;

    if (minPriceChanged || maxPriceChanged) {
      const newQuery = { ...query };

      // Update or remove minprice
      if (debouncedPriceValue[0] > 0) {
        newQuery.minprice = debouncedPriceValue[0].toString();
      } else {
        delete newQuery.minprice;
      }

      // Update or remove maxprice (only if it's not the default max)
      if (debouncedPriceValue[1] > 0 && debouncedPriceValue[1] < 10000) {
        newQuery.maxprice = debouncedPriceValue[1].toString();
      } else {
        delete newQuery.maxprice;
      }

      // Update URL without page reload
      router.push(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { scroll: false, shallow: true },
      );
    }
  }, [debouncedPriceValue, mounted, router.isReady, query, router]);

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };
  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };
  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopHiddenLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.data?.length > 0) {
    // products
    let product_items = products.data;
    // select short filtering
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = products.data;
      } else if (selectValue === "Low to High") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = products.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = products.data.filter((p) => p.discount > 0);
      } else {
        product_items = products.data;
      }
    }

    // price filter (use debounced value to avoid immediate recalculation while dragging)
    // Also check URL params as fallback
    const minPrice =
      debouncedPriceValue[0] > 0
        ? debouncedPriceValue[0]
        : query.minprice
          ? parseFloat(query.minprice)
          : 0;
    const maxPrice =
      debouncedPriceValue[1] > 0
        ? debouncedPriceValue[1]
        : query.maxprice
          ? parseFloat(query.maxprice)
          : 0;

    if (maxPrice > 0) {
      product_items = product_items.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice,
      );
    }

    content = (
      <>
        <ShopHiddenSidebarArea
          all_products={products.data}
          products={product_items}
          otherProps={otherProps}
        />

        <ShopFilterOffCanvas
          all_products={products.data}
          otherProps={otherProps}
        />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Shop" description={seoDescriptions.shop} />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb
        title="Shop Hidden Sidebar"
        subtitle="Shop Hidden Sidebar"
      />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopHiddenSidebarPage;
