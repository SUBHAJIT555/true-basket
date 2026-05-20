import React, { useState } from 'react';
import Image from 'next/image';
// internal
import { AnimatedLine } from '@/svg';
import shape_1 from '@assets/img/subscribe/subscribe-shape-1.png';
import shape_2 from '@assets/img/subscribe/subscribe-shape-2.png';
import shape_3 from '@assets/img/subscribe/subscribe-shape-3.png';
import shape_4 from '@assets/img/subscribe/subscribe-shape-4.png';
import plane from '@assets/img/subscribe/plane.png';
import { submitToApi } from '@/lib/submit-api';
import { notifyError, notifySuccess } from '@/utils/toast';

function Shape({ img, num }) {
  return (
    <Image className={`tp-subscribe-shape-${num}`} src={img} alt="shape" />
  );
}

const CtaArea = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email?.trim() ?? '';
    if (!trimmed) return;
    setSubmitting(true);
    const result = await submitToApi({ formType: 'cta', email: trimmed });
    setSubmitting(false);
    if (result.success) {
      notifySuccess('Subscribed successfully!');
      setEmail('');
    } else {
      notifyError(result.error || 'Subscription failed.');
    }
  };

  return (
    <section className="tp-subscribe-area pt-70 pb-65 theme-bg p-relative z-index-1">
      <div className="tp-subscribe-shape">
        <Shape img={shape_1} num="1" />
        <Shape img={shape_2} num="2" />
        <Shape img={shape_3} num="3" />
        <Shape img={shape_4} num="4" />
        <div className="tp-subscribe-plane">
          <Image className="tp-subscribe-plane-shape" src={plane} alt="img" />
          <AnimatedLine />
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-7">
            <div className="tp-subscribe-content">
              <span>Sale 20% off all store</span>
              <h3 className="tp-subscribe-title">Subscribe our Newsletter</h3>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5">
            <div className="tp-subscribe-form">
              <form onSubmit={handleSubmit}>
                <div className="tp-subscribe-input">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitting}
                  />
                  <button type="submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaArea;