import React from 'react';
import Link from 'next/link';
import contactInfo, { siteInfo } from '@/data/contact-info';

const CookiePolicyArea = () => {
  return (
    <>
      <section className="tp-terms-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-terms-wrapper">
                <div className="tp-terms-content">
                  <div className="tp-section-title-wrapper-4 mb-50">
                    <h3 className="tp-section-title-4 mb-20">Cookie Policy</h3>
                  </div>
                  <p className="mb-20" style={{ color: '#666', fontSize: '14px' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="mb-40" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    This Cookie Policy explains how {siteInfo.companyName} ({siteInfo.domain}) uses cookies and similar technologies on this website. By using our site, you consent to the use of cookies as described below.
                  </p>

                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)' }}>1. What Are Cookies</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, improve performance, and understand how you use the site.
                    </p>
                  </div>

                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)' }}>2. How We Use Cookies</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We use cookies to: remember items in your cart, keep your preferences (e.g. language), analyze site traffic and usage, and improve security and site functionality.
                    </p>
                  </div>

                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)' }}>3. Types of Cookies We Use</h3>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}><strong>Strictly necessary:</strong> Required for the site to work (e.g. cart, security).</li>
                      <li style={{ marginBottom: '10px' }}><strong>Functional:</strong> Remember your choices and preferences.</li>
                      <li style={{ marginBottom: '10px' }}><strong>Analytics:</strong> Help us understand how visitors use our site.</li>
                    </ul>
                  </div>

                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)' }}>4. Managing Cookies</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      You can control or delete cookies through your browser settings. Disabling certain cookies may affect site functionality, such as keeping items in your cart.
                    </p>
                  </div>

                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)' }}>5. Contact</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      For questions about our use of cookies, contact us at <a href={contactInfo.mailtoLink}>{contactInfo.email}</a>, call <a href={contactInfo.telLink}>{contactInfo.phone}</a>, or visit our <Link href="/contact">contact page</Link>.
                    </p>
                  </div>

                  <div className="tp-terms-agreement mt-60 pt-40" style={{ borderTop: '1px solid #e5e5e5' }}>
                    <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
                      By continuing to use {siteInfo.domain}, you agree to this Cookie Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookiePolicyArea;
