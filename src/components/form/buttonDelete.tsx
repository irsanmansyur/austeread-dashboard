import React from "react";
import { MdDelete } from "react-icons/md";
import ButtonCustom from "./button";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export default function ButtonDelete({ children, ...props }: Props) {
  return (
    <ButtonCustom
      {...props}
      className="bg-transparent shadow border-red-600 border-2 rounded-full   focus:outline-none focus:border-red-600 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white focus:ring-blue-500/70"
    >
      <MdDelete className="inline-block h-5 w-5 mr-1" />
      {children}
    </ButtonCustom>
  );
}
