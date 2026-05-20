import React, { useState } from "react";
import Link from "next/link";
import { siteInfo } from "@/data/contact-info";
import contactInfo from "@/data/contact-info";
import { getFaqItems } from "@/data/faq";

const faqItems = getFaqItems();

const FaqArea = () => {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="tb-faq" aria-labelledby="tb-faq-heading">
      <div className="tb-faq__inner">
        <header className="tb-faq__intro">
          <p className="tb-faq__badge">Help centre</p>
          <h2 id="tb-faq-heading" className="tb-faq__title">
            Answers from <span>{siteInfo.companyName}</span>
          </h2>
          <p className="tb-faq__text">
            Everything you need to know about requesting a quote, delivery across Mumbai,
            payments, and returns—before you reach out.
          </p>
        </header>

        <div className="tb-faq__list">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className={`tb-faq__item${isOpen ? " tb-faq__item--open" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="tb-faq__question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className="tb-faq__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="tb-faq__question-text">{item.question}</span>
                  <span className="tb-faq__icon" aria-hidden="true">
                    <i className="fa-solid fa-plus" />
                  </span>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="tb-faq__panel"
                  hidden={!isOpen}
                >
                  <p className="tb-faq__answer">{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="tb-faq__cta">
          <div className="tb-faq__cta-content">
            <h3 className="tb-faq__cta-title">Still have questions?</h3>
            <p className="tb-faq__cta-text">
              Our team is happy to help with quotes, delivery, and product details.
            </p>
            <div className="tb-faq__cta-links">
              <Link href="/contact" className="tb-faq__cta-btn tb-faq__cta-btn--primary">
                Contact us
              </Link>
              <a href={contactInfo.mailtoLink} className="tb-faq__cta-btn tb-faq__cta-btn--outline">
                {contactInfo.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FaqArea;
