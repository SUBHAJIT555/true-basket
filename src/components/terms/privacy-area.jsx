import React from 'react';
import contactInfo, { siteInfo } from '@/data/contact-info';

const PrivacyArea = () => {
  return (
    <>
      {/* privacy policy section start */}
      <section className="tp-terms-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-terms-wrapper">
                <div className="tp-terms-content">
                  <div className="tp-section-title-wrapper-4 mb-50">
                    <h3 className="tp-section-title-4 mb-20">Privacy Policy</h3>
                  </div>
                  <p className="mb-20" style={{ color: '#666', fontSize: '14px' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="mb-40" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    We at {siteInfo.companyName} ({siteInfo.domain}) are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
                  </p>

                  {/* Section 1 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>1. Information We Collect</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We may collect information that you provide directly to us, including:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Name, email address, phone number, and mailing address when you create an account or place an order</li>
                      <li style={{ marginBottom: '10px' }}>Payment and billing information (processed securely through our payment providers)</li>
                      <li style={{ marginBottom: '10px' }}>Communications and correspondence when you contact us or subscribe to our newsletter</li>
                      <li style={{ marginBottom: '10px' }}>Preferences, wishlists, and order history</li>
                    </ul>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We also automatically collect certain information when you visit our website, such as IP address, browser type, device information, and usage data through cookies and similar technologies.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>2. How We Use Your Information</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We use the information we collect to:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Process and fulfill your orders and send order confirmations and shipping updates</li>
                      <li style={{ marginBottom: '10px' }}>Manage your account and provide customer support</li>
                      <li style={{ marginBottom: '10px' }}>Send you marketing communications (with your consent) about new products, offers, and updates</li>
                      <li style={{ marginBottom: '10px' }}>Improve our website, products, and services based on usage and feedback</li>
                      <li style={{ marginBottom: '10px' }}>Prevent fraud, comply with legal obligations, and protect our rights and the rights of others</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>3. Cookies and Tracking Technologies</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We use cookies and similar technologies to enhance your experience, remember your preferences, analyze site traffic, and personalize content. You can control cookie settings through your browser. Disabling certain cookies may affect the functionality of our website.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>4. Sharing Your Information</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Service providers who assist us with payment processing, shipping, email delivery, and analytics (under strict confidentiality agreements)</li>
                      <li style={{ marginBottom: '10px' }}>Law enforcement or regulatory authorities when required by law or to protect our rights</li>
                      <li style={{ marginBottom: '10px' }}>Business partners in connection with a merger, acquisition, or sale of assets (with notice to you)</li>
                    </ul>
                  </div>

                  {/* Section 5 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>5. Data Security</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment data is handled by certified payment processors and is not stored on our servers. Despite our efforts, no method of transmission over the Internet is completely secure.
                    </p>
                  </div>

                  {/* Section 6 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>6. Your Rights and Choices</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Depending on your location, you may have the right to:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Access, correct, or delete your personal information</li>
                      <li style={{ marginBottom: '10px' }}>Opt out of marketing communications at any time (via unsubscribe links or account settings)</li>
                      <li style={{ marginBottom: '10px' }}>Object to or restrict certain processing of your data</li>
                      <li style={{ marginBottom: '10px' }}>Data portability where applicable</li>
                    </ul>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      To exercise these rights, please contact us using the details below.
                    </p>
                  </div>

                  {/* Section 7 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>7. Data Retention</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Account and order data are typically retained for a period consistent with applicable law and business needs.
                    </p>
                  </div>

                  {/* Section 8 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>8. Children's Privacy</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us so we can delete it.
                    </p>
                  </div>

                  {/* Section 9 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>9. Changes to This Policy</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                    </p>
                  </div>

                  {/* Section 10 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>10. Contact Us</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      If you have questions about this Privacy Policy or our data practices, please contact us at <a href={contactInfo.mailtoLink}>{contactInfo.email}</a>, call <a href={contactInfo.telLink}>{contactInfo.phone}</a>, or write to us at {contactInfo.addressDisplay}. You can also use our contact page.
                    </p>
                  </div>

                  {/* Agreement */}
                  <div className="tp-terms-agreement mt-60 pt-40" style={{ borderTop: '1px solid #e5e5e5' }}>
                    <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
                      By using {siteInfo.domain}, you acknowledge that you have read and understood this Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* privacy policy section end */}
    </>
  );
};

export default PrivacyArea;
