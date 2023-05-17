import { useMessage } from "@/commons/hooks/message";
import { useForm } from "@/commons/hooks/form";
import { AppInterface } from "@/commons/interface/app";
import { ButtonCustom, EditorText, InputCustom, InputError } from "@/components/form";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";

export default function GeneralConfig({ data }: { data?: AppInterface.Config }) {
  if (!data) return <></>;
  const { setMessage } = useMessage();
  const { useAxios } = useAuth();
  const [{ loading, data: dataPut }, putProcess] = useAxios({ url: "config", method: "PUT" }, { manual: true });
  const { origin_rajaongkir, shopFooter, ...newData } = data;
  const { data: config, setData } = useForm(newData);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    putProcess({ data: config });
  };
  useEffect(() => {
    dataPut && setMessage({ type: "success", message: dataPut["message"] });
    return () => {};
  }, [dataPut]);

  return (
    <form onSubmit={submit} className="form flex justify-center">
      <div className="">
        <InputCustom label={"Email"} value={config?.email} onChange={(e) => setData("email", e.target.value)} />
        <InputCustom label={"Whatsapp"} value={config?.whatsapp} onChange={(e) => setData("whatsapp", e.target.value)} />
        <InputCustom label={"Instagram"} value={config?.instagram} onChange={(e) => setData("instagram", e.target.value)} />
        <InputCustom label={"Twitter"} value={config?.twitter} onChange={(e) => setData("twitter", e.target.value)} />
        <div className="mt-4">
          <label htmlFor="content" className="font-bold pb-2">
            About
          </label>
          <EditorText folder="upload/article" height={400} textHtml={config?.about || ""} onChange={(htmlText) => setData("about", htmlText)} />
          <InputError message={""} />
        </div>
        <div className="mt-4">
          <label htmlFor="advertising" className="font-bold pb-2">
            Advertising Opportunities
          </label>
          <EditorText
            folder="upload/advertising"
            height={400}
            textHtml={config?.advertising_opportunities || ""}
            onChange={(htmlText) => setData("advertising_opportunities", htmlText)}
          />
          <InputError message={""} />
        </div>
        <div className="my-10">
          <ButtonCustom type="submit" disabled={loading} className="w-full">
            Save
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
}
