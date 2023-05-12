import ButtonCustom from "@/components/form/button";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Swal from "sweetalert2";

type Props = { active: boolean };
export default function Logout({ active }: Props) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    Swal.fire({
      title: "Apakah anda yakin ingin keluar?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logout();
      }
    });
    setLoading(false);
  };
  return (
    <form onSubmit={onSubmit}>
      <ButtonCustom disabled={loading} type="submit" className={`hover:bg-red-500 hover:text-white text-red-600 bg-transparent w-full justify-start gap-2`}>
        <AiOutlineLogout className="mt-[2px]" /> <span> Logout</span>
      </ButtonCustom>
    </form>
  );
}
