import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
// internal
import ErrorMsg from '../common/error-msg';
import { useGetProductTypeCategoryQuery } from '@/redux/features/categoryApi';
import HomeCateLoader from '../loader/home/home-cate-loader';

const categorySliderSettings = {
  slidesPerView: 5,
  spaceBetween: 24,
  // pagination: {
  //   el: '.tp-category-slider-dot',
  //   clickable: true,
  // },
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1200: { slidesPerView: 5 },
    992: { slidesPerView: 4 },
    768: { slidesPerView: 3 },
    576: { slidesPerView: 2 },
    0: { slidesPerView: 2 },
  },
};

const ElectronicCategory = () => {
  const { data: categories, isLoading, isError } = useGetProductTypeCategoryQuery('electronics');
  const router = useRouter();

  const handleCategoryRoute = (title) => {
    router.push(`/shop?category=${title.toLowerCase().replace("&", "").split(" ").join("-")}`);
  };

  let content = null;
  if (isLoading) {
    content = <HomeCateLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = (
      <Swiper
        {...categorySliderSettings}
        modules={[Navigation, Pagination, Autoplay]}
        className="tp-product-category-swiper swiper-container"
      >
        {category_items.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="tp-product-category-item text-center mb-40">
              <div className="tp-product-category-thumb fix">
                <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.parent)}>
                  <Image src={item.img} alt={item.parent || 'category'} width={76} height={98} />
                </a>
              </div>
              <div className="tp-product-category-content">
                <h3 className="tp-product-category-title">
                  <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.parent)}>
                    {item.parent}
                  </a>
                </h3>
                <p>{item.products?.length ?? 0} Product</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="tp-category-slider-dot tp-swiper-dot text-center mt-30" />
      </Swiper>
    );
  }

  return (
    <section className="tp-product-category pt-60 pb-15">
      <div className="container">
        {content}
      </div>
    </section>
  );
};

export default ElectronicCategory;