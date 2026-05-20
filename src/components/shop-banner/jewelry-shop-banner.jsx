import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "@/data/contact-info";
import banner1 from "@assets/img/banner/4/banner-1.jpg";
import banner2 from "@assets/img/banner/4/banner-2.jpg";
import banner3 from "@assets/img/banner/4/banner-3.jpg";
import banner4 from "@assets/img/banner/4/banner-4.jpg";

const promos = [
  {
    image: banner1,
    eyebrow: siteInfo.companyName,
    title: "Electronics, stationery & fashion",
    description: "Everything from phones and laptops to notebooks and daily wear.",
    href: "/shop",
    cta: "Browse all",
    featured: true,
  },
  {
    image: banner4,
    eyebrow: "Deals",
    title: "Shop all departments",
    description: "Daily offers across every category.",
    href: "/shop",
    cta: "View deals",
    tall: true,
  },
  {
    image: banner2,
    eyebrow: "Electronics",
    title: "Smart gadgets & devices",
    description: "Audio, mobiles, and desk tech.",
    href: "/shop?category=smart-gadgets",
  },
  {
    image: banner3,
    eyebrow: "Fashion",
    title: "Garments & accessories",
    description: "Fresh styles for every occasion.",
    href: "/shop?category=fashion-accessories",
  },
];

function PromoTile({ image, eyebrow, title, description, href, cta, featured, tall }) {
  const className = [
    "tb-promo-tile",
    featured && "tb-promo-tile--featured",
    tall && "tb-promo-tile--tall",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={className}>
      <span className="tb-promo-tile__media">
        <Image
          src={image}
          alt=""
          fill
          sizes={
            featured
              ? "(max-width: 767px) 100vw, 66vw"
              : tall
                ? "(max-width: 991px) 100vw, 34vw"
                : "(max-width: 767px) 100vw, 33vw"
          }
          style={{ objectFit: "cover" }}
        />
        <span className="tb-promo-tile__shade" aria-hidden="true" />
      </span>

      <span className="tb-promo-tile__content">
        <span className="tb-promo-tile__eyebrow">{eyebrow}</span>
        <span className="tb-promo-tile__title">{title}</span>
        <span className="tb-promo-tile__text">{description}</span>
        {cta && <span className="tb-promo-tile__cta">{cta}</span>}
      </span>
    </Link>
  );
}

const JewelryShopBanner = () => {
  return (
    <section className="tb-promo" aria-labelledby="tb-promo-title">
      <div className="tb-promo__inner">
        <div className="tb-promo__head">
          <h2 id="tb-promo-title" className="tb-promo__title">
            Shop by <span className="text-primary">department</span>
          </h2>
          <p className="tb-promo__sub">
            Hand-picked collections from {siteInfo.companyName}
          </p>
        </div>

        <div className="tb-promo__grid">
          {promos.map((promo) => (
            <PromoTile key={promo.title} {...promo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JewelryShopBanner;
