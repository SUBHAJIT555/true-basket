import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Close } from "@/svg";
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector((state) => state.productModal);
  const { img, status, title } = productItem || {};
  const dispatch = useDispatch();
  const isOpen = isModalOpen && Boolean(productItem);

  useEffect(() => {
    if (!isOpen) return undefined;

    dispatch(initialOrderQuantity());
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("tb-modal-open");

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(handleModalClose());
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("tb-modal-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, dispatch]);

  if (typeof window === "undefined" || !isOpen) {
    return null;
  }

  // Portal into #root so Geist/Inter CSS variables from next/font apply (body is outside #root)
  const portalRoot = document.getElementById("root") || document.body;

  return createPortal(
    <>
      <div
        className="tb-modal__overlay"
        onClick={() => dispatch(handleModalClose())}
        aria-hidden="true"
      />
      <div
        className="tb-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Product quick view"
      >
        <div className="tb-modal__body">
          <div className="tb-modal__gallery">
            <div className="tb-modal__image">
              <Image
                src={img || "/assets/img/product/product-1.jpg"}
                alt={title || "Product"}
                width={416}
                height={480}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
              {status === "out-of-stock" && (
                <span className="tb-modal__stock-badge">Out of stock</span>
              )}
            </div>
          </div>

          <div className="tb-modal__panel">
            <button
              type="button"
              className="tb-modal__close"
              onClick={() => dispatch(handleModalClose())}
              aria-label="Close"
            >
              <Close />
            </button>
            <DetailsWrapper productItem={productItem} />
          </div>
        </div>
      </div>
    </>,
    portalRoot
  );
};

export default ProductModal;
