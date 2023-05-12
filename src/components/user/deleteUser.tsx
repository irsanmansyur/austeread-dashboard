import { AppInterface } from "@/commons/interface/app";
import React from "react";
import ButtonDelete from "../form/buttonDelete";
import { useAuth } from "@/context/auth";
import Swal from "sweetalert2";

type Props = { user: AppInterface.User; onDeleted?: (status: boolean) => void };
export default function DeleteUser({ user, onDeleted }: Props) {
  const { useAxios } = useAuth();
  const [{ loading: deleteLoading, error: deleteError, response: responseUpdate }, executeDelete] = useAxios({ url: "/users/" + user.id, method: "DELETE" }, { manual: true });
  const deleteUser = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin Menghapus user?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await executeDelete();
        if (deleteError) return Swal.fire("Gagal Menghapus user", "", "error");
        onDeleted && onDeleted(true);
      }
    });
  };

  return (
    <form onSubmit={deleteUser}>
      <ButtonDelete type="submit" disabled={deleteLoading}>
        Delete
      </ButtonDelete>
    </form>
  );
}
