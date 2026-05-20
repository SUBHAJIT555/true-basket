import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import contactInfo, { siteInfo } from "@/data/contact-info";
import { Email, Location } from "@/svg";
import logo from "@assets/img/logo/logo.svg";
import pay from "@assets/img/footer/footer-pay.png";
import { submitToApi } from "@/lib/submit-api";
import { notifyError, notifySuccess } from "@/utils/toast";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/return-policy" },
];

const FooterTwo = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email?.trim() ?? "";
    if (!trimmed) return;
    setSubmitting(true);
    const result = await submitToApi({ formType: "newsletter", email: trimmed });
    setSubmitting(false);
    if (result.success) {
      notifySuccess("Subscribed successfully!");
      setEmail("");
    } else {
      notifyError(result.error || "Subscription failed.");
    }
  };

  return (
    <footer className="tb-footer">
      <div className="tb-footer__main">
        <div className="tb-footer__inner">
          <div className="tb-footer__grid">
            <div className="tb-footer__brand">
              <Link href="/" className="tb-footer__logo">
                <Image src={logo} alt={siteInfo.companyName} width={140} height={40} />
              </Link>
              <p className="tb-footer__tagline">{siteInfo.tagline}</p>

              <div className="tb-footer__callout">
                <span className="tb-footer__callout-label">Got questions? Call us</span>
                <a href={contactInfo.telLink} className="tb-footer__callout-phone">
                  {contactInfo.phone}
                </a>
              </div>

              <ul className="tb-footer__contact-list">
                <li>
                  <span className="tb-footer__contact-icon" aria-hidden="true">
                    <Email />
                  </span>
                  <a href={contactInfo.mailtoLink}>{contactInfo.email}</a>
                </li>
                <li>
                  <span className="tb-footer__contact-icon" aria-hidden="true">
                    <Location />
                  </span>
                  <a href={contactInfo.mapLink} target="_blank" rel="noreferrer">
                    {contactInfo.addressDisplay}
                  </a>
                </li>
              </ul>
            </div>

            <nav className="tb-footer__col" aria-label="Quick links">
              <h3 className="tb-footer__heading">Quick links</h3>
              <ul className="tb-footer__links">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="tb-footer__col" aria-label="Legal">
              <h3 className="tb-footer__heading">Legal</h3>
              <ul className="tb-footer__links">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="tb-footer__newsletter">
              <h3 className="tb-footer__heading">Subscribe</h3>
              <p className="tb-footer__newsletter-text">
                Get deals, new arrivals, and updates from {siteInfo.companyName}.
              </p>
              <form className="tb-footer__form" onSubmit={handleNewsletterSubmit}>
                <div className="tb-footer__form-row">
                  <input
                    type="email"
                    className="tb-footer__input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitting}
                    aria-label="Email address"
                  />
                  <button type="submit" className="tb-footer__submit" disabled={submitting}>
                    {submitting ? "Sending…" : "Subscribe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="tb-footer__bottom">
        <div className="tb-footer__inner tb-footer__bottom-inner">
          <p className="tb-footer__copyright">
            © {new Date().getFullYear()} {siteInfo.companyName}. All rights reserved.
          </p>
          <div className="tb-footer__payments">
            <Image src={pay} alt="Accepted payment methods" width={220} height={28} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
