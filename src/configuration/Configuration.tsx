import { useForm } from "@/commons/hooks/form";
import { AppInterface } from "@/commons/interface/app";
import { ButtonCustom, EditorText, InputCustom, InputError, SelectCustom } from "@/components/form";
import { useAuth } from "@/context/auth";
import HelmetLayout from "@/layouts/HelmetLayout";
import { Icon } from "@iconify/react";
import { useState } from "react";
import FooterConfig from "./FooterConfig";
import RajaOnkirConfig from "./RajaOnkirConfig";
import GeneralConfig from "./GeneralConfig";

export function Configuration() {
  const { useAxios } = useAuth();
  const [{ data, loading }] = useAxios<AppInterface.Config>("config");
  const { data: config, setData } = useForm(data);
  const [openTab, setOpenTab] = useState(1);

  return (
    <HelmetLayout title="Configuration " className="">
      <div className="rounded border shadow bg-white p-5  mt-10">
        <div className="border-b card-header pb-5 flex justify-between items-center">
          <h1 className="title">Configuration</h1>
          <ul className="flex gap-2">
            <li
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " + (openTab === 1 ? "text-white bg-primary" : "text-primary bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
            >
              General
            </li>
            <li
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " + (openTab === 2 ? "text-white bg-primary" : "text-primary bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
            >
              Raja Onkir
            </li>
            <li
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " + (openTab === 3 ? "text-white bg-primary" : "text-primary bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
            >
              Footer
            </li>
          </ul>
        </div>
        <div className="card-body py-5">
          {openTab === 1 && <GeneralConfig data={data} />}
          {openTab === 2 && <RajaOnkirConfig origin_rajaongkir={data?.origin_rajaongkir || ""} />}
          {openTab === 3 && <FooterConfig />}
        </div>
      </div>
    </HelmetLayout>
  );
}
