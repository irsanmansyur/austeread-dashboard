import { listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import HelmetLayout from "@/layouts/HelmetLayout";
import { useAuth } from "@/context/auth";
import { AppInterface } from "@/commons/interface/app";
import { Link } from "react-router-dom";
import { routes } from "@/commons/enums/routes";
import { InputCustom } from "@/components/form/InputGroup";
import { useForm } from "@/commons/hooks/form";
import SelectCustom from "@/components/form/select";
import { convertBase64 } from "@/commons/helpers/image";
import InputError from "@/components/form/InputError";
import EditorText from "@/components/form/editor-text";

export default function AddNewsPage() {
  const { useAxios, user } = useAuth();
  const [{ data: category = [] }] = useAxios<AppInterface.Kategori[]>("getAllCategory");
  const { errors, get, data, setData } = useForm<AppInterface.Article>();
  const refPreview = useRef<HTMLImageElement>(null);
  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>, typeKey: "thumbnail" | "img") => {
    e.preventDefault();
    if (!e.currentTarget.files || !refPreview.current) return;

    const file = e.currentTarget.files[0];
    const base64 = await convertBase64(file);

    refPreview.current.src = base64 + "";
    refPreview.current.style.display = "block";
    setData(typeKey, file);
  };
  useEffect(() => {
    setData("creator", user?.id + "");
    return () => {};
  }, []);

  return (
    <HelmetLayout title="Add News" breads={[{ text: "News", url: routes.news }, { text: "Add" }]}>
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Add News</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <form className="flex sm:gap-4 flex-col sm:flex-row justify-between">
            <div className="sm:w-2/3 w-full mb-6">
              <InputCustom label="Title" value={data.title} error={errors?.title} onChange={(e) => setData("title", e.target.value)} />
              <div className="mt-4">
                <label htmlFor="content" className="font-bold pb-2">
                  Content
                </label>
                <EditorText folder="upload/article" height={400} textHtml={data.desc} onChange={(htmlText) => setData("desc", htmlText)} />
                <InputError message={errors?.desc} />
              </div>
            </div>
            <div className="sm:w-1/3 w-full mb-6">
              <SelectCustom label="Category" value={data.category} options={category?.map((ctg) => ({ value: ctg.id + "", label: ctg.name }))} error={errors?.category} />
              <div className="mt-4    ">
                <label className="inline-block mb-2 text-gray-500">Thumbnail (jpg,png)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="relative flex flex-col items-center justify-center pt-7">
                      <img ref={refPreview} className="absolute inset-0 w-full h-32 rounded" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select Thumbnail</p>
                    </div>
                    <input type="file" onChange={(e) => changeImage(e, "thumbnail")} className="opacity-0" accept="image/*" />
                  </label>
                </div>
                <InputError message={errors?.thumbnail} className="mt-2" />
              </div>
              <div className="mt-4    ">
                <label className="inline-block mb-2 text-gray-500">Upload Image(jpg,png)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="relative flex flex-col items-center justify-center pt-7">
                      <img ref={refPreview} className="absolute inset-0 w-full h-32 rounded" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select a photo</p>
                    </div>
                    <input type="file" onChange={(e) => changeImage(e, "img")} className="opacity-0" accept="image/*" />
                  </label>
                </div>
                <InputError message={errors?.img} className="mt-2" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </HelmetLayout>
  );
}
