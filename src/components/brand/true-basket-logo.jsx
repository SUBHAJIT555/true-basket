import React from "react";
import Link from "next/link";

const sizeMap = {
  sm: "tb-logo--sm",
  md: "tb-logo--md",
  lg: "tb-logo--lg",
};

const TrueBasketLogo = ({
  variant = "dark",
  size = "md",
  className = "",
  href,
  asLink = false,
}) => {
  const classes = [
    "tb-logo",
    variant === "light" ? "tb-logo--light" : "tb-logo--dark",
    sizeMap[size] || sizeMap.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="tb-logo__true">True</span>
      <span className="tb-logo__basket">Basket</span>
    </>
  );

  if (asLink || href) {
    return (
      <Link href={href || "/"} className={classes} aria-label="True Basket home">
        {content}
      </Link>
    );
  }

  return (
    <span className={classes} aria-label="True Basket">
      {content}
    </span>
  );
};

export default TrueBasketLogo;
