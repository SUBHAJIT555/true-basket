import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper";
import { useGetPopularProductByTypeQuery } from "@/redux/features/productApi";
import ProductSliderItem from "./product-slider-item";
import ErrorMsg from "@/components/common/error-msg";
import { HomeTwoPopularPrdLoader } from "@/components/loader";
import { siteInfo } from "@/data/contact-info";

const slider_setting = {
  slidesPerView: 5,
  spaceBetween: 16,
  grabCursor: true,
  simulateTouch: true,
  touchRatio: 1,
  threshold: 5,
  preventClicks: false,
  preventClicksPropagation: false,
  noSwipingSelector: "button, .tb-product-card__actions",
  pagination: {
    el: ".tb-popular__pagination",
    clickable: true,
  },
  scrollbar: {
    el: ".tb-popular__scrollbar",
    draggable: true,
    dragClass: "tb-popular__scrollbar-drag",
    snapOnRelease: true,
  },
  breakpoints: {
    1400: { slidesPerView: 5 },
    1200: { slidesPerView: 4 },
    992: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    576: { slidesPerView: 2 },
    0: { slidesPerView: 1.15, spaceBetween: 12 },
  },
};

const PopularProducts = () => {
  const { data: products, isError, isLoading } =
    useGetPopularProductByTypeQuery("jewelry");

  let content = null;

  if (isLoading) {
    content = <HomeTwoPopularPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products?.data?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    content = (
      <Swiper
        {...slider_setting}
        modules={[Scrollbar, Pagination]}
        className="tb-popular__swiper"
      >
        {products.data.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductSliderItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <section className="tb-popular" aria-labelledby="tb-popular-heading">
      <div className="tb-popular__inner">
        <header className="tb-popular__head">
          <div>
            <p className="tb-popular__badge">Trending now</p>
            <h2 id="tb-popular-heading" className="tb-popular__title">
              Popular picks from <span>{siteInfo.companyName}</span>
            </h2>
          </div>
          <Link href="/shop" className="tb-popular__link">
            View all products
          </Link>
        </header>

        <div className="tb-popular__slider">
          {content}
          <div className="tb-popular__scrollbar" />
          <div className="tb-popular__pagination" />
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
