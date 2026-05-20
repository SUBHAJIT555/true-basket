import React from "react";
import { FadeLoader, BarLoader } from "react-spinners";
import theme from "@/theme";

const primaryHex = theme.colors.primary.replace("#", "");

const Loader = ({ loading, spinner = "scale", color = primaryHex }) => {
  return (
    <div className="text-center">
      {spinner === "scale" && (
        <BarLoader
          color={`#${color}`}
          loading={loading}
          height={8}
          width={100}
          margin={2}
        />
      )}
      {spinner === "fade" && (
        <FadeLoader loading={loading} color={theme.colors.primary} />
      )}
    </div>
  );
};

export default Loader;
