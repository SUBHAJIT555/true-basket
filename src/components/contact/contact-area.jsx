import React from "react";
import ContactForm from "../forms/contact-form";
import contactInfo, { siteInfo } from "@/data/contact-info";
import social_data from "@/data/social-data";

const ContactArea = () => {
  const { address } = contactInfo;

  return (
    <section className="tb-contact" aria-labelledby="tb-contact-heading">
      <div className="tb-contact__inner">
        <header className="tb-contact__intro">
          <p className="tb-contact__badge">Get in touch</p>
          <h2 id="tb-contact-heading" className="tb-contact__title">
            Reach the <span>{siteInfo.companyName}</span> team
          </h2>
          <p className="tb-contact__text">
            Fill out the form and we&apos;ll get back to you within one business day.
            You can also call or email us directly using the details on the right.
          </p>
        </header>

        <div className="tb-contact__grid">
          <div className="tb-contact__form-panel">
            <h3 className="tb-contact__form-title">Send a message</h3>
            <ContactForm />
          </div>

          <aside className="tb-contact__aside" aria-label="Contact information">
            <div className="tb-contact__card">
              <div className="tb-contact__card-icon tb-contact__card-icon--primary">
                <i className="fa-regular fa-envelope" aria-hidden="true" />
              </div>
              <div className="tb-contact__card-body">
                <h4 className="tb-contact__card-title">Email &amp; phone</h4>
                <p>
                  <a href={contactInfo.mailtoLink}>{contactInfo.email}</a>
                </p>
                <p>
                  <a href={contactInfo.telLink}>{contactInfo.phone}</a>
                </p>
              </div>
            </div>

            <div className="tb-contact__card">
              <div className="tb-contact__card-icon tb-contact__card-icon--secondary">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
              </div>
              <div className="tb-contact__card-body">
                <h4 className="tb-contact__card-title">Our office</h4>
                <p>
                  <a href={contactInfo.mapLink} target="_blank" rel="noreferrer">
                    {address.line1}
                    <br />
                    {address.line2}
                    <br />
                    {address.city}, {address.state} {address.pin}
                  </a>
                </p>
              </div>
            </div>

            <div className="tb-contact__card tb-contact__card--social">
              <h4 className="tb-contact__card-title">Follow us</h4>
              <p className="tb-contact__card-note">
                Stay updated on offers and new arrivals.
              </p>
              <div className="tb-contact__social">
                {social_data.slice(0, 4).map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tb-contact__social-link"
                    aria-label={item.title}
                  >
                    <i className={item.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
