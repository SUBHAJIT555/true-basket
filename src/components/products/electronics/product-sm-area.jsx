import React from 'react';
// internal
import { ShapeLineSm } from '@/svg';
import { useGetDiscountFeaturedSellingQuery } from '@/redux/features/productApi';
import ErrorMsg from '@/components/common/error-msg';
import ProductSmItem from './product-sm-item';
import HomeSmPrdLoader from '@/components/loader/home/home-sm-prd-loader';

const ProductSmArea = () => {
  const { data, isError, isLoading } = useGetDiscountFeaturedSellingQuery();
  const discountProducts = data?.discountProducts ?? [];
  const featuredProducts = data?.featuredProducts ?? [];
  const sellingProducts = data?.sellingProducts ?? [];

  let content = null;
  if (isLoading) {
    content = <HomeSmPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError) {
    const hasAny = discountProducts.length > 0 || featuredProducts.length > 0 || sellingProducts.length > 0;
    if (!hasAny) {
      content = <ErrorMsg msg="No Products found!" />;
    } else {
      content = (
        <div className="row">
          <div className="col-xl-4 col-md-6">
            <div className="tp-product-sm-list mb-50">
              <div className="tp-section-title-wrapper mb-40">
                <h3 className="tp-section-title tp-section-title-sm">
                  Discount Products
                  <ShapeLineSm />
                </h3>
              </div>
              <div className="tp-product-sm-wrapper mr-20">
                {discountProducts.map((item) => (
                  <ProductSmItem key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="tp-product-sm-list mb-50">
              <div className="tp-section-title-wrapper mb-40">
                <h3 className="tp-section-title tp-section-title-sm">
                  Featured Products
                  <ShapeLineSm />
                </h3>
              </div>
              <div className="tp-product-sm-wrapper mr-20">
                {featuredProducts.map((item) => (
                  <ProductSmItem key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="tp-product-sm-list mb-50">
              <div className="tp-section-title-wrapper mb-40">
                <h3 className="tp-section-title tp-section-title-sm">
                  Selling Products
                  <ShapeLineSm />
                </h3>
              </div>
              <div className="tp-product-sm-wrapper mr-20">
                {sellingProducts.map((item) => (
                  <ProductSmItem key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <section className="tp-product-sm-area">
      <div className="container">
        {content}
      </div>
    </section>
  );
};

export default ProductSmArea;