import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { handleProductModal } from "@/redux/features/productModalSlice";

const ProductSmItem = ({ product }) => {
  const { _id, img, category, title, price, discountedPrice, reviews } = product || {};
  const displayPrice = typeof discountedPrice === 'number' && !Number.isNaN(discountedPrice)
    ? discountedPrice
    : (typeof price === 'number' && !Number.isNaN(price) ? price : 0);
  const [ratingVal, setRatingVal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle open modal
  const handleOpenModal = () => {
    dispatch(handleProductModal(product));
  };

  return (
    <div className="tp-product-sm-item d-flex align-items-center">
      <div className="tp-product-thumb mr-25 fix">
        <div onClick={handleOpenModal} style={{ cursor: 'pointer',width: '140px',height: '140px' }}>
          <Image
            src={img}
            alt="product img"
            width={140}
            height={140}
            
          />
        </div>
      </div>
      <div className="tp-product-sm-content">
        <div className="tp-product-category">
          <a href="#">{category?.name}</a>
        </div>
        <h3 className="tp-product-title">
          <a onClick={handleOpenModal} style={{ cursor: 'pointer' }}>{title}</a>
        </h3>
        <div className="tp-product-rating d-sm-flex align-items-center">
          <div className="tp-product-rating-icon">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-rating-text">
          ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
          </div>
        </div>
        <div className="tp-product-price-wrapper">
          <span className="tp-product-price">₹{displayPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSmItem;
