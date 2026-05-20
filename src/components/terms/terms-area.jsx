import React from 'react';
import Link from 'next/link';
import contactInfo, { siteInfo } from '@/data/contact-info';

const TermsArea = () => {
  return (
    <>
      {/* terms and conditions section start */}
      <section className="tp-terms-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-terms-wrapper">
                <div className="tp-terms-content">
                  <div className="tp-section-title-wrapper-4 mb-50">
                    <h3 className="tp-section-title-4 mb-20">Terms and Conditions</h3>
                  </div>
                  <p className="mb-20" style={{ color: '#666', fontSize: '14px' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="mb-40" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    Welcome to {siteInfo.companyName} ({siteInfo.domain}). By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.
                  </p>

                  {/* Section 1 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>1. Acceptance of Terms</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>2. Use License</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Modify or copy the materials</li>
                      <li style={{ marginBottom: '10px' }}>Use the materials for any commercial purpose or for any public display</li>
                      <li style={{ marginBottom: '10px' }}>Attempt to reverse engineer any software contained on the website</li>
                      <li style={{ marginBottom: '10px' }}>Remove any copyright or other proprietary notations from the materials</li>
                      <li style={{ marginBottom: '10px' }}>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>3. Product Information</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that product descriptions, images, or other content on this site is accurate, complete, reliable, current, or error-free.
                    </p>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      All products are subject to availability. We reserve the right to discontinue any product at any time without notice. Prices are subject to change without notice.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>4. Orders and Payment</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      When you place an order, you are making an offer to purchase products at the prices stated. We reserve the right to accept or reject your order for any reason, including product availability, errors in pricing or product information, or fraud prevention.
                    </p>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Payment must be received before we ship your order. We accept various payment methods as displayed on our checkout page. All prices are in Indian Rupees (₹) unless otherwise stated.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>5. Shipping and Delivery</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We will ship products to the address you provide during checkout. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.
                    </p>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Risk of loss and title for products purchased pass to you upon delivery to the carrier. You are responsible for filing any claims with carriers for damaged or lost shipments.
                    </p>
                  </div>

                  {/* Section 6 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>6. Returns and Refunds</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We offer a return policy for eligible products within the specified return period. Products must be returned in their original condition, unused, and with all original packaging and documentation.
                    </p>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Customized or personalized items may not be eligible for return unless defective. Refunds will be processed to the original payment method within the timeframe specified in our return policy.
                    </p>
                  </div>

                  {/* Section 7 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>7. Intellectual Property</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      All content on this website, including text, graphics, logos, images, audio clips, digital downloads, and software, is the property of {siteInfo.companyName} or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
                    </p>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      You may not use our trademarks, logos, or other proprietary information without our express written consent.
                    </p>
                  </div>

                  {/* Section 8 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>8. User Accounts</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                    </p>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion, including if we believe that your conduct violates these Terms and Conditions.
                    </p>
                  </div>

                  {/* Section 9 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>9. Limitation of Liability</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      In no event shall {siteInfo.companyName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                  </div>

                  {/* Section 10 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>10. Privacy Policy</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
                    </p>
                  </div>

                  {/* Section 11 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>11. Modifications to Terms</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We reserve the right to revise these Terms and Conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions.
                    </p>
                  </div>

                  {/* Section 12 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>12. Governing Law</h3>
                    <p className="mb-15">
                      These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of India.
                    </p>
                  </div>

                  {/* Section 13 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>13. Contact Information</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      If you have any questions about these Terms and Conditions, please contact us:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}><strong>{siteInfo.companyName}</strong> — {siteInfo.domain}</li>
                      <li style={{ marginBottom: '10px' }}>Email: <a href={contactInfo.mailtoLink}>{contactInfo.email}</a></li>
                      <li style={{ marginBottom: '10px' }}>Phone: <a href={contactInfo.telLink}>{contactInfo.phone}</a></li>
                      <li style={{ marginBottom: '10px' }}>Address: <a href={contactInfo.mapLink} target="_blank" rel="noreferrer">{contactInfo.addressDisplay}</a></li>
                      <li style={{ marginBottom: '10px' }}>Or through our <Link href="/contact">contact page</Link>.</li>
                    </ul>
                  </div>

                  {/* Agreement */}
                  <div className="tp-terms-agreement mt-60 pt-40" style={{ borderTop: '1px solid #e5e5e5' }}>
                    <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
                      By using {siteInfo.domain}, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* terms and conditions section end */}
    </>
  );
};

export default TermsArea;
