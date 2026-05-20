import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteInfo } from "@/data/contact-info";
import aboutImage from "@assets/images/HeroImages/HomeElectronicsHero.webp";

const highlights = [
  "Mobile & laptop accessories",
  "Smart gadgets & audio",
  "Daily-wear garments",
  "Stationery & office supplies",
  "Fashion jewellery & add-ons",
  "Gifts & everyday picks",
];

const JewelryAbout = () => {
  return (
    <section className="tb-about" aria-labelledby="tb-about-heading">
      <div className="tb-about__inner">
        <div className="tb-about__grid">
          <div className="tb-about__media">
            <Image
              src={aboutImage}
              alt={`About ${siteInfo.companyName}`}
              fill
              sizes="(max-width: 991px) 100vw, 42vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="tb-about__content">
            <p className="tb-about__badge">{siteInfo.domain}</p>

            <h2 id="tb-about-heading" className="tb-about__title">
              Electronics, stationery
              <span>&amp; everyday style</span>
            </h2>

            <div className="tb-about__body">
              <p>
                <strong>{siteInfo.companyName}</strong> is your go-to store for the
                things you use every day. From{" "}
                <strong>mobiles, audio and computer gear</strong> to{" "}
                <strong>notebooks, office supplies, garments</strong> and{" "}
                <strong>fashion accessories</strong>, we bring it all together in one
                easy place.
              </p>
              <p>
                Choose from curated collections of <strong>electronics</strong>,{" "}
                <strong>stationery &amp; desk essentials</strong>,{" "}
                <strong>men&apos;s &amp; women&apos;s wear</strong> and{" "}
                <strong>accessories</strong> that help you work, study and step out with
                confidence.
              </p>
            </div>

            <ul className="tb-about__list">
              {highlights.map((item) => (
                <li key={item} className="tb-about__item">
                  <span className="tb-about__check" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="tb-about__actions">
              <Link href="/shop" className="tb-about__btn tb-about__btn--fill">
                Explore products
              </Link>
              <Link href="/contact" className="tb-about__btn tb-about__btn--line">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelryAbout;
