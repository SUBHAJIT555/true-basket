import React from 'react';
import Link from 'next/link';
import contactInfo, { siteInfo } from '@/data/contact-info';

const ReturnPolicyArea = () => {
  return (
    <>
      {/* return policy section start */}
      <section className="tp-terms-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-terms-wrapper">
                <div className="tp-terms-content">
                  <div className="tp-section-title-wrapper-4 mb-50">
                    <h3 className="tp-section-title-4 mb-20">Return Policy</h3>
                  </div>
                  <p className="mb-20" style={{ color: '#666', fontSize: '14px' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="mb-40" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    At {siteInfo.companyName} we want you to be completely satisfied with your purchase. If you are not entirely happy with your order, we offer a straightforward return and refund process. Please read this policy carefully before initiating a return.
                  </p>

                  {/* Section 1 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>1. Return Eligibility</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      You may return most items within <strong>30 days</strong> of delivery for a full refund or exchange, provided that:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>The item is unused, unworn, and in the same condition as received (in original packaging where applicable)</li>
                      <li style={{ marginBottom: '10px' }}>All tags, certificates, and documentation are included</li>
                      <li style={{ marginBottom: '10px' }}>The item is not a customized, personalized, or made-to-order piece (unless defective)</li>
                      <li style={{ marginBottom: '10px' }}>You have proof of purchase (order number or receipt)</li>
                    </ul>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Items that are damaged, altered, or show signs of wear cannot be accepted for return. We reserve the right to refuse returns that do not meet these conditions.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>2. Non-Returnable Items</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      The following items generally cannot be returned unless they are defective or we have made an error:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Custom or engraved jewelry</li>
                      <li style={{ marginBottom: '10px' }}>Earrings (for hygiene reasons, unless sealed and unused)</li>
                      <li style={{ marginBottom: '10px' }}>Items marked as final sale at the time of purchase</li>
                      <li style={{ marginBottom: '10px' }}>Gift cards</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>3. How to Initiate a Return</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      To start a return:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Contact our customer service at <a href={contactInfo.mailtoLink}>{contactInfo.email}</a> or <a href={contactInfo.telLink}>{contactInfo.phone}</a>, or through our <Link href="/contact">contact page</Link>, with your order number and reason for return</li>
                      <li style={{ marginBottom: '10px' }}>We will provide you with a Return Authorization (RA) number and return shipping instructions</li>
                      <li style={{ marginBottom: '10px' }}>Securely pack the item in its original packaging (or equivalent) and include the RA number inside the package</li>
                      <li style={{ marginBottom: '10px' }}>Ship the package to the address we provide using a trackable method. We recommend insuring high-value items</li>
                    </ul>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Returns sent without an RA number may experience delays in processing. You are responsible for return shipping costs unless the return is due to our error or a defective product.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>4. Refunds</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved:
                    </p>
                    <ul className="tp-terms-list mb-15" style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8' }}>
                      <li style={{ marginBottom: '10px' }}>Refunds will be processed to the original payment method within 5–10 business days</li>
                      <li style={{ marginBottom: '10px' }}>You will receive the full purchase price (excluding original shipping, unless the return was due to our error)</li>
                      <li style={{ marginBottom: '10px' }}>Depending on your bank or card issuer, it may take additional time for the refund to appear on your statement</li>
                    </ul>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      If your return is not approved, we will contact you and may arrange for the item to be sent back to you at your cost.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>5. Exchanges</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      If you would like to exchange an item for a different size, style, or product, please follow the return process above and indicate that you want an exchange. We will process the return and, subject to availability, ship the replacement item. Price differences will be charged or refunded as applicable.
                    </p>
                  </div>

                  {/* Section 6 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>6. Damaged or Defective Items</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      If you receive a damaged or defective item, please contact us within 7 days of delivery with photos and a description. We will arrange a replacement or full refund at no extra cost to you, including return shipping. Do not discard the original packaging until we have confirmed the resolution.
                    </p>
                  </div>

                  {/* Section 7 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>7. Lost or Stolen Return Shipments</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      We are not responsible for return packages lost or stolen in transit. We recommend using a trackable and insured shipping service. Once we receive the returned item, we will process your refund or exchange as outlined above.
                    </p>
                  </div>

                  {/* Section 8 */}
                  <div className="tp-terms-section mb-50">
                    <h3 className="mb-20" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--tp-heading-secondary)', marginBottom: '20px' }}>8. Contact Us</h3>
                    <p className="mb-15" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                      For questions about returns, refunds, or exchanges, contact us at <a href={contactInfo.mailtoLink}>{contactInfo.email}</a>, call <a href={contactInfo.telLink}>{contactInfo.phone}</a>, or visit our <Link href="/contact">contact page</Link>. We are here to help.
                    </p>
                  </div>

                  {/* Agreement */}
                  <div className="tp-terms-agreement mt-60 pt-40" style={{ borderTop: '1px solid #e5e5e5' }}>
                    <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
                      By placing an order with {siteInfo.companyName}, you acknowledge that you have read and understood this Return Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* return policy section end */}
    </>
  );
};

export default ReturnPolicyArea;
