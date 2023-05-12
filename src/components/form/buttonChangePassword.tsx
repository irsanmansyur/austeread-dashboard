import React from "react";
import ButtonCustom from "./button";
import { BiKey } from "react-icons/bi";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export default function ButtonChangePassword({ children, ...props }: Props) {
  return (
    <ButtonCustom
      {...props}
      className="bg-transparent shadow border-green-600 border-2 rounded-full   focus:outline-none focus:border-green-600 px-4 py-2 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500/70"
    >
      <BiKey className="inline-block h-5 w-5 mr-1" />
      {children}
    </ButtonCustom>
  );
}
