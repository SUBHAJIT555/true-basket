import React from "react";
import { Delivery, Discount, Support } from "@/svg";

const stats = [
  {
    value: "10+",
    label: "Categories",
    detail: "Groceries, tech & fashion in one place",
    icon: <Support />,
  },
  {
    value: "10+",
    label: "Key sectors",
    detail: "Covered",
    icon: <Discount />,
  },
  {
    value: "100%",
    label: "Commitment",
    detail: "To quality & fast delivery",
    icon: <Delivery />,
  },
];

const FeatureAreaThree = () => {
  return (
    <section className="tb-features" aria-label="Store highlights">
      <div className="tb-features__inner">
        <ul className="tb-features__grid">
          {stats.map((item, i) => (
            <li key={i} className="tb-features__col">
              <div className="tb-features__stat">
                <span className="tb-features__value">{item.value}</span>
                <span className="tb-features__label">{item.label}</span>
              </div>
              <div className="tb-features__detail">
                <span className="tb-features__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <p className="tb-features__detail-text">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeatureAreaThree;
