import React, { memo } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";

const CategoryFilter = memo(({ setCurrPage, shop_right = false }) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  // handle category route
  const handleCategoryRoute = (slug) => {
    setCurrPage(1);
    router.push(
      `/${shop_right?'shop-right-sidebar':'shop'}?category=${slug
        }`
        )
    dispatch(handleFilterSidebarClose());
  }
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <li key={item._id}>
        <a
          onClick={() => handleCategoryRoute(item.slug)}
          style={{ cursor: "pointer" }}
          className={
            router.query.category ===
            item.slug
              ? "active"
              : ""
          }
        >
          {item.parent} <span>{item.products.length}</span>
        </a>
      </li>
    ));
  }
  return (
    <>
      <div className="tp-shop-widget tb-shop-categories mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories tb-shop-categories__list">
            <ul className="tb-shop-categories__scroll">{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
});

CategoryFilter.displayName = "CategoryFilter";

export default CategoryFilter;
