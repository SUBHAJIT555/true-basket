import React, { useMemo } from 'react';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// internal
import ProductItem from './product-item';
import ErrorMsg from '@/components/common/error-msg';
import { useGetNewArrivalsByVariantQuery } from '@/redux/features/productApi';
import { HomeTwoBestSellPrdPrdLoader } from '@/components/loader';
import { getSiteNumber } from '@/lib/siteConfig';

// slider setting
const slider_setting = {
    slidesPerView: 4,
		spaceBetween: 24,
		scrollbar: {
			el: '.tp-best-swiper-scrollbar',
			draggable: true,
			dragClass: 'tp-swiper-scrollbar-drag',
			snapOnRelease: true,
		  },

		breakpoints: {
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		}
}

const NewArrivals = () => {
  const { data: productsData, isError, isLoading } = useGetNewArrivalsByVariantQuery();
  
  // Get variant configuration for title
  const variantConfig = productsData?.variantConfig;
  const title = variantConfig?.title || "New Arrivals";
  const subtitle = "New Arrivals This Week";
  
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className='row'>
      <HomeTwoBestSellPrdPrdLoader loading={isLoading}/>
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && productsData?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && productsData?.data?.length > 0) {
    // Products are already filtered and limited to 8 by the API
    const product_items = productsData.data;
    content = (
      <Swiper {...slider_setting} modules={[Scrollbar]} className="tp-best-slider-active swiper-container mb-10">
        {product_items.map(item => (
          <SwiperSlide key={item._id} className="tp-best-item-4">
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }
  return (
    <>
      <section className="tp-best-area pt-115">
        <div className="container"> 
            <div className="row">
              <div className="col-xl-12">
                  <div className="tp-section-title-wrapper-4 mb-50 text-center">
                    <span className="tp-section-title-pre-4">{subtitle}</span>
                    <h3 className="tp-section-title-4">New Arrivals In {title} for You</h3>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                  <div className="tp-best-slider">
                    {content}
                    <div className="tp-best-swiper-scrollbar tp-swiper-scrollbar"></div>
                  </div>
              </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
