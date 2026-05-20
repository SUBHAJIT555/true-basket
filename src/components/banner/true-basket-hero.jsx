import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "@/data/contact-info";
import { heroCategories } from "@/data/hero-categories";

export default function TrueBasketHero() {
  const marqueeItems = useMemo(() => [...heroCategories, ...heroCategories], []);
  const [paused, setPaused] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState(null);

  const onEnter = (slug) => {
    setPaused(true);
    setHoveredSlug(slug);
  };

  const onLeave = () => {
    setPaused(false);
    setHoveredSlug(null);
  };

  return (
    <section
      className="tb-home-hero"
      style={{
        background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
      }}
    >
      <div className="tb-home-hero__inner">
        <p className="tb-home-hero__badge">India&apos;s trusted marketplace</p>

        <h1 className="tb-home-hero__title">
          Everything You Need,
          <span> Delivered with Care.</span>
        </h1>

        <p className="tb-home-hero__text">
          From electronics and stationery to garments and daily essentials — {siteInfo.companyName}{" "}
          brings quality products to your doorstep with fast, reliable delivery across India.
        </p>

        <div className="tb-home-hero__buttons">
          <Link href="/shop" className="tb-home-hero__btn tb-home-hero__btn--fill">
            Shop Now
          </Link>
          <Link href="/contact" className="tb-home-hero__btn tb-home-hero__btn--line">
            Contact Us
          </Link>
        </div>

        <h2 className="tb-home-hero__label">Our Categories</h2>

        <div
          className={`tb-home-hero__marquee${paused ? " is-paused" : ""}`}
          onMouseLeave={onLeave}
        >
          <div className="tb-home-hero__marquee-track">
            {marqueeItems.map((cat, index) => {
              const isActive = paused && hoveredSlug === cat.slug;
              const isDim = paused && hoveredSlug !== cat.slug;

              return (
                <Link
                  key={`${cat.slug}-${index}`}
                  href={`/shop?category=${cat.slug}`}
                  className={`tb-home-hero__cat${isActive ? " is-active" : ""}${isDim ? " is-dim" : ""}`}
                  onMouseEnter={() => onEnter(cat.slug)}
                  onFocus={() => onEnter(cat.slug)}
                >
                  <span className="tb-home-hero__cat-img">
                    <Image
                      src={cat.img}
                      alt={cat.title}
                      width={200}
                      height={200}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </span>
                  <span className="tb-home-hero__cat-name">{cat.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
