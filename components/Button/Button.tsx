import React, { FC, HTMLAttributes } from "react";

import { Spinner } from "components/SVG/Spinner";

export interface Props {
  size?: Size;
  children?: any;
  className?: string;
  customColor?: string;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

export type Variant = "default" | "ghost" | "selected";
export type Size = "big" | "small" | "bigFluid" | "smallFluid";

const Button: FC<Props & HTMLAttributes<HTMLButtonElement>> = ({
  variant = "default",
  size = "small",
  children,
  className = "",
  customColor = "",
  type = "button",
  disabled,
  loading = false,
  ...rest
}: Props) => {
  const styleVariant = customColor === "" ? styles.variant[variant] : "";
  const styleSize = styles.size[size];

  return (
    <button
      disabled={loading}
      type={type}
      {...rest}
      className={`${styleVariant} ${styleSize} box-border cursor-pointer select-none whitespace-nowrap px-2 text-center transition-colors ${className} ${customColor != "" ? "customColorButton" : ""
        } ${disabled ? "opacity-30 pointer-events-none" : ""}`}
    >
      {loading ? <Spinner color={customColor ? "white" : "black"} /> : children}
      <style>{`
        .customColorButton {
          background: ${customColor};
          border: 1px solid ${customColor};
          color: black;
        }
        .customColorButton:hover {
          background: transparent;
          color: ${customColor};
        }
      `}</style>
    </button>
  );
};

export default Button;

const styles = {
  variant: {
    default:
      "bg-white text-black border md:hover:bg-transparent md:hover:text-white md:hover:border-white",
    ghost:
      "border border-white text-white bg-transparent md:hover:bg-white md:hover:text-black",
    selected: "bg-white text-black border md:border-transparent",
  },
  size: {
    big: "px-[40px] py-[16px] w-auto text-2xl font-bold",
    small: "px-[40px] py-[8px] w-auto text-base font-bold",
    smallFluid: "py-[8px] text-base w-full font-bold",
    bigFluid: "py-[16px] text-2xl w-full font-bold",
  },
};
