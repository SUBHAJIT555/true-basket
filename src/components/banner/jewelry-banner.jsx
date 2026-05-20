import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "@/data/contact-info";
import { heroCategories } from "@/data/hero-categories";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7.2L5.4 10.1L11.5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const JewelryBanner = () => {
  const categories = useMemo(() => heroCategories, []);
  const marqueeItems = useMemo(() => [...categories, ...categories], [categories]);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const handleCardEnter = (id) => {
    setIsPaused(true);
    setHoveredId(id);
  };

  const handleMarqueeLeave = () => {
    setIsPaused(false);
    setHoveredId(null);
  };

  return (
    <section className="tb-hero">
      <div
        className="tb-hero__bg"
        aria-hidden="true"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
        }}
      />
      <div className="tb-hero__wrap">
        <span className="tb-hero__badge">
          <CheckIcon />
          India&apos;s trusted marketplace
        </span>

        <h1 className="tb-hero__title">
          Everything You Need,
          <span className="tb-hero__title-accent"> Delivered with Care.</span>
        </h1>

        <p className="tb-hero__desc">
          From electronics and stationery to garments and daily essentials —{" "}
          {siteInfo.companyName} brings quality products to your doorstep with fast,
          reliable delivery across India.
        </p>

        <div className="tb-hero__actions">
          <Link href="/shop" className="tb-hero__btn tb-hero__btn--primary">
            Shop Now
          </Link>
          <Link href="/contact" className="tb-hero__btn tb-hero__btn--outline">
            Contact Us
          </Link>
        </div>

        <h2 className="tb-hero__categories-label">Our Categories</h2>

        <div
          className={`tb-hero__marquee${isPaused ? " is-paused" : ""}`}
          onMouseLeave={handleMarqueeLeave}
        >
          <div className="tb-hero__marquee-track">
            {marqueeItems.map((item, index) => {
              const isHovered = hoveredId === item.id;
              const isDimmed = isPaused && !isHovered;

              return (
                <Link
                  key={`${item.id}-${index}`}
                  href={`/shop?category=${item.slug}`}
                  className={`tb-hero__marquee-card${isHovered ? " is-hovered" : ""}${isDimmed ? " is-dimmed" : ""}`}
                  onMouseEnter={() => handleCardEnter(item.id)}
                  onFocus={() => handleCardEnter(item.id)}
                >
                  <span className="tb-hero__marquee-card-media">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="140px"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <span className="tb-hero__marquee-card-title">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelryBanner;
