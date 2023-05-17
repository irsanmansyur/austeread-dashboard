import React from "react";
import { twMerge } from "tailwind-merge";
import SpinnerIcon from "./icon-spinner";
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: "small" | "normal";
}
export function ButtonCustom({ size = "normal", className, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        `px-2 sm:px-3 py-0 sm:py-2 font-medium text-center text-white bg-primary/90 rounded-lg hover:bg-primary focus:ring focus:outline-none focus:ring-primary/70 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary/80 relative flex justify-center items-center transition duration-500`,
        className
      )}
    >
      {children}
      {props.disabled && (
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <SpinnerIcon />
        </div>
      )}
    </button>
  );
}
export default ButtonCustom;
