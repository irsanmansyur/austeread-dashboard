import { useEffect, useRef } from "react";
import HelmetLayout from "@/layouts/HelmetLayout";
import { useAuth } from "@/context/auth";
import { AppInterface } from "@/commons/interface/app";
import { routes } from "@/commons/enums/routes";
import { useForm } from "@/commons/hooks/form";
import { convertBase64 } from "@/commons/helpers/image";
import { InputCustom, InputError, EditorText, SelectCustom, ButtonCustom } from "@/components/form";
import { Icon } from "@iconify/react";
import { NumericFormat } from "react-number-format";
import TypeProduct from "./type-product";
import SubcategorySelect from "./sub-category/subcategory-select";

type Props = {};
export function ProductCreate({ ...props }: Props) {
  const { useAxios, user, isAuthenticated } = useAuth();

  const [{ data: category = [] }] = useAxios<AppInterface.Product>("getAllCategory");
  const { data, setData } = useForm<AppInterface.Product>({
    choice: [{ name: "", price: 0, stock: 0, weight: 0 }],
  });
  const refPreviewAsset = useRef<HTMLImageElement>(null);
  const refPreview = useRef<HTMLImageElement>(null);
  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>, typeKey: "size_chart" | "asset_digital") => {
    e.preventDefault();
    if (!e.currentTarget.files || !refPreview.current || !refPreviewAsset.current) return;

    const file = e.currentTarget.files[0];
    const base64 = await convertBase64(file);

    if (typeKey == "asset_digital") {
      refPreviewAsset.current.src = base64 + "";
      refPreviewAsset.current.style.display = "block";
    } else {
      refPreview.current.src = base64 + "";
      refPreview.current.style.display = "block";
    }
    setData(typeKey, file);
  };
  useEffect(() => {
    setData("creator", user?.id + "");
    return () => {};
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("data", data);
  }

  return (
    <HelmetLayout title="Create Product" breads={[{ text: "Product", url: routes.product.list }, { text: "Create" }]}>
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Create Product</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto bg-white">
          <form className="flex sm:gap-4 flex-col sm:flex-row justify-between" onSubmit={submit}>
            <div className="sm:w-2/3 w-full mb-6 space-y-5">
              <InputCustom label="Product Name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
              <div className="space-y-3">
                <label>Choice in product</label>

                {data.choice.map((choice, i) => {
                  const newChoices = [...data.choice];
                  const newChoice = newChoices[i];
                  return (
                    <div className="flex gap-3 text-sm" key={i}>
                      <div className="flex gap-2">
                        <InputCustom
                          label="Choice"
                          value={choice.name}
                          onChange={(e) => {
                            newChoice.name = e.target.value;
                            setData("choice", newChoices);
                          }}
                        />
                        <NumericFormat
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          value={choice.stock}
                          customInput={InputCustom}
                          label="Stock"
                          onValueChange={(e) => {
                            newChoice.stock = +e.value;
                            setData("choice", newChoices);
                          }}
                        />
                        <NumericFormat
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          value={choice.weight}
                          customInput={InputCustom}
                          label="Weight"
                          onValueChange={(e) => {
                            newChoice.weight = +e.value;
                            setData("choice", newChoices);
                          }}
                        />
                        <NumericFormat
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          value={choice.price}
                          onValueChange={(e) => {
                            newChoice.price = +e.value;
                            setData("choice", newChoices);
                          }}
                          customInput={InputCustom}
                          prefix="Rp. "
                          label="Price"
                        />
                      </div>
                      <div className="flex items-end pb-3 gap-2 w-[150px]">
                        {data.choice.length !== 1 && (
                          <ButtonCustom
                            type={"button"}
                            className="sm:py-3 bg-red-500 hover:bg-red-600"
                            onClick={(e) => {
                              setData(
                                "choice",
                                data.choice.filter((_: any, iN: number) => i !== iN)
                              );
                            }}
                          >
                            <Icon icon={"mdi:delete-empty"} />
                          </ButtonCustom>
                        )}
                        {i + 1 == data.choice.length && (
                          <ButtonCustom
                            onClick={(e) => {
                              setData("choice", [...data.choice, { name: "", price: 0, stock: 0, weight: 0 }]);
                            }}
                            type="button"
                            className="sm:py-3"
                          >
                            <Icon icon={"material-symbols:add"} />
                          </ButtonCustom>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <label htmlFor="content" className="font-bold pb-2">
                  Descriptions
                </label>
                <EditorText folder="upload/article" height={200} textHtml={data.desc} onChange={(htmlText) => setData("desc", htmlText)} />
              </div>
              <div className="mt-4">
                <label htmlFor="content" className="font-bold pb-2">
                  Details
                </label>
                <EditorText folder="upload/article" height={200} textHtml={data.detail} onChange={(htmlText) => setData("detail", htmlText)} />
              </div>
            </div>
            <div className="sm:w-1/3 w-full mb-6 space-y-5">
              <TypeProduct value={data.type} onChange={(v: any) => setData("type", v)} />
              <SubcategorySelect />
              <div className="space-y-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                  <strong>Image</strong>(leave this field blank, if don't want to change)
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
                  id="file_input"
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.currentTarget.files) return;
                    const imgs = [];
                    for (let index = 0; index < e.currentTarget.files.length; index++) {
                      imgs.push(e.currentTarget.files[index]);
                    }
                    setData("img", imgs);
                  }}
                />
              </div>
              <div className="mt-4">
                <label className="inline-block mb-2 text-gray-500">Size Chart Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="relative flex flex-col items-center justify-center pt-7">
                      <img ref={refPreview} className="absolute inset-0 w-full h-32 rounded" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select Thumbnail</p>
                    </div>
                    <input type="file" onChange={(e) => changeImage(e, "size_chart")} className="opacity-0" accept="image/*" />
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="inline-block mb-2 text-gray-500">Asset(jpg,png)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="relative flex flex-col items-center justify-center pt-7">
                      <img ref={refPreviewAsset} className="absolute inset-0 w-full h-32 rounded" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select a photo</p>
                    </div>
                    <input type="file" onChange={(e) => changeImage(e, "asset_digital")} className="opacity-0" accept="image/*" />
                  </label>
                </div>
              </div>
              <ButtonCustom className="w-full">Save</ButtonCustom>
            </div>
          </form>
        </div>
      </div>
    </HelmetLayout>
  );
}
