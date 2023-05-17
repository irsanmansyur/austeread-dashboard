import { AppInterface } from "@/commons/interface/app";
import { ButtonCustom, ButtonDelete, ButtonEdit, InputCustom } from "@/components/form";
import { useAuth } from "@/context/auth";
import { Icon } from "@iconify/react";
import { useState } from "react";
import FooterEditModal from "./FooterEditModal";
import Loading from "@/components/loader/Loading";
import FooterCreateModal from "./FooterCreateModal";

export default function FooterConfig() {
  const { useAxios, api } = useAuth();
  const [{ data = [], loading }, refetchData] = useAxios<AppInterface.ShopFooter[]>("/shopFooter");
  const [editFooter, setEditFooter] = useState<AppInterface.ShopFooter | undefined>();
  const [createFooter, setCreateFooter] = useState(false);
  return (
    <div className="mt-6">
      <div className="header flex justify-between border-b py-2 mb-2">
        <label className="">Shop Footer</label>
        <ButtonCustom onClick={(e) => setCreateFooter(true)}>
          <Icon icon={"material-symbols:add"} />
        </ButtonCustom>
      </div>
      {data.map((SF, i: number) => {
        return (
          <div className="flex gap-2 items-center" key={i}>
            <InputCustom placeholder={SF.name} classParent="w-full" readOnly disabled />
            <div className="flex gap-2">
              <ButtonEdit onClick={(e) => setEditFooter(SF)} />
              <ButtonDelete
                handleDelete={(proper) => {
                  return api
                    .delete("shopFooter/" + SF.id)
                    .catch((e) => {
                      proper.setError("Gagal Hapus Footer");
                    })
                    .then((res) => {
                      refetchData();
                    });
                }}
              />
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex items-center justify-center p-6">
          <Loading />
        </div>
      )}

      <FooterEditModal
        footerConfig={editFooter}
        onCLose={(updated) => {
          setEditFooter(undefined);
          updated && refetchData();
        }}
      />
      <FooterCreateModal
        open={createFooter}
        onCLose={(updated) => {
          setCreateFooter(false);
          updated && refetchData();
        }}
      />
    </div>
  );
}
