import { useMessage } from "@/commons/hooks/message";
import { ButtonCustom, SelectCustom } from "@/components/form";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";

export default function RajaOnkirConfig({ origin_rajaongkir }: { origin_rajaongkir: string }) {
  const [originRajaongkir, setOriginRajaongkir] = useState(origin_rajaongkir.split(","));
  if (originRajaongkir.length !== 3) return <></>;

  const { setMessage } = useMessage();
  const { useAxios } = useAuth();
  const [{ data: dataProvince = { data: [] } }] = useAxios<{ data: any[] }>("province");
  const [{ data: dataCity = { data: [] } }, refetcCity] = useAxios<{ data: any[] }>("city?province=" + originRajaongkir[0]);
  const [{ data: dataSubdistrict = { data: [] } }, refetcSubdistrict] = useAxios<{ data: any[] }>("subdistrict?city=" + originRajaongkir[1]);
  const [{ loading, data: dataPut }, putProcess] = useAxios({ url: "config", method: "PUT" }, { manual: true });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    putProcess({ data: { origin_rajaongkir: originRajaongkir.join(",") } });
  };

  useEffect(() => {
    dataPut && setMessage({ type: "success", message: dataPut["message"] || "Origin Raja onkir Update" });
    return () => {};
  }, [dataPut]);
  return (
    <form className="mt-6" onSubmit={submit}>
      <label className="border-b py-2 block">Origin Raja Ongkir</label>
      <div className="flex justify-between mt-5 gap-2">
        <SelectCustom
          classParent="w-full"
          value={originRajaongkir[0] || ""}
          label="Provinsi"
          onChange={(e) => {
            const newOriginRO = [...originRajaongkir];
            newOriginRO[0] = e.target.value;
            refetcCity({ url: `city?province=${newOriginRO[0]}` });
            setOriginRajaongkir(newOriginRO);
          }}
          options={dataProvince.data.map((p) => ({ label: p.province, value: p.province_id }))}
        />
        <SelectCustom
          value={originRajaongkir[1] || ""}
          onChange={(e) => {
            const newOriginRO = [...originRajaongkir];
            newOriginRO[1] = e.target.value;
            refetcSubdistrict({ url: `subdistrict?city=${newOriginRO[1]}` });
            setOriginRajaongkir(newOriginRO);
          }}
          classParent="w-full"
          label="Kabupaten/Kota"
          options={dataCity.data.map((p) => ({ label: p.city_name, value: p.city_id }))}
        />
        <SelectCustom
          value={originRajaongkir[2] || ""}
          onChange={(e) => {
            const newOriginRO = [...originRajaongkir];
            newOriginRO[2] = e.target.value;
            setOriginRajaongkir(newOriginRO);
          }}
          classParent="w-full"
          label="Kecamatan"
          options={dataSubdistrict.data.map((p) => ({ label: p.subdistrict_name, value: p.subdistrict_id }))}
        />
      </div>
      <div className="my-10">
        <ButtonCustom type="submit" disabled={loading} className="w-full">
          Save
        </ButtonCustom>
      </div>
    </form>
  );
}
