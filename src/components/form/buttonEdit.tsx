import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import ButtonCustom from "./button";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export default function ButtonEdit({ children, ...props }: Props) {
  return (
    <ButtonCustom
      {...props}
      className="bg-transparent shadow border-blue-600 border-2 rounded-full   focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500/70"
    >
      <MdModeEditOutline className="inline-block h-5 w-5 mr-1" />
      {children}
    </ButtonCustom>
  );
}
