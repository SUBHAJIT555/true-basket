import React from "react";
import contactInfo from "@/data/contact-info";

const ContactMap = () => {
  return (
    <section className="tb-contact-map" aria-label="Store location map">
      <div className="tb-contact-map__inner">
        <div className="tb-contact-map__header">
          <p className="tb-contact-map__badge">Find us</p>
          <h2 className="tb-contact-map__title">Visit our location</h2>
          <p className="tb-contact-map__text">{contactInfo.addressDisplay}</p>
        </div>
        <div className="tb-contact-map__frame">
          <iframe
            src={contactInfo.mapEmbedUrl}
            title="True Basket location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
