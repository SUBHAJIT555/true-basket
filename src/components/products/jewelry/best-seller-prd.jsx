import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeTwoBestSellPrdPrdLoader } from "@/components/loader";
import { siteInfo } from "@/data/contact-info";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 16,
  grabCursor: true,
  simulateTouch: true,
  touchRatio: 1,
  threshold: 5,
  preventClicks: false,
  preventClicksPropagation: false,
  noSwipingSelector: "button, .tb-product-card__actions",
  scrollbar: {
    el: ".tb-bestseller__scrollbar",
    draggable: true,
    dragClass: "tb-bestseller__scrollbar-drag",
    snapOnRelease: true,
  },
  pagination: {
    el: ".tb-bestseller__pagination",
    clickable: true,
  },
  breakpoints: {
    1400: { slidesPerView: 4 },
    1200: { slidesPerView: 4 },
    992: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    576: { slidesPerView: 2 },
    0: { slidesPerView: 1.15, spaceBetween: 12 },
  },
};

const BestSellerPrd = () => {
  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: "jewelry",
    query: "topSeller=true",
  });

  let content = null;

  if (isLoading) {
    content = <HomeTwoBestSellPrdPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products?.data?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    const product_items = products.data.slice(0, 8);

    content = (
      <Swiper
        {...slider_setting}
        modules={[Scrollbar, Pagination]}
        className="tb-bestseller__swiper"
      >
        {product_items.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <section className="tb-bestseller" aria-labelledby="tb-bestseller-heading">
      <div className="tb-bestseller__inner">
        <header className="tb-bestseller__head">
          <div>
            <p className="tb-bestseller__badge">Customer favorites</p>
            <h2 id="tb-bestseller-heading" className="tb-bestseller__title">
              Top sellers on <span>{siteInfo.companyName}</span>
            </h2>
          </div>
          <Link href="/shop" className="tb-bestseller__link">
            View all products
          </Link>
        </header>

        <div className="tb-bestseller__slider">
          {content}
          <div className="tb-bestseller__scrollbar" />
          <div className="tb-bestseller__pagination" />
        </div>
      </div>
    </section>
  );
};

export default BestSellerPrd;
