import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import ButtonCustom from "./button";
import Swal from "sweetalert2";

type handleDeleteType = (property: { setError: (error: string) => void }) => Promise<any>;
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  handleDelete?: handleDeleteType;
};
export function ButtonDelete({ children, handleDelete = async () => {}, ...props }: Props) {
  const [loading, setLoading] = useState(false);
  console.log("loading", loading);

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await handleDelete({
            setError: (error: string) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
              });
            },
          }).finally(() => {
            setLoading(false);
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <form>
      <ButtonCustom
        type="submit"
        disabled={loading}
        {...props}
        className="bg-transparent shadow border-red-600 border-2 rounded-full focus:outline-none focus:border-red-600 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white focus:ring-blue-500/70"
        onClick={onClickDelete}
      >
        <MdDelete className="inline-block h-5 w-5 mr-1" />
        {children}
      </ButtonCustom>
    </form>
  );
}

export default ButtonDelete;
