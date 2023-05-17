import { AppInterface } from "@/commons/interface/app";
import { ButtonCustom, ButtonDelete, ButtonEdit } from "@/components/form";
import Loading from "@/components/loader/Loading";
import { useAuth } from "@/context/auth";
import HelmetLayout from "@/layouts/HelmetLayout";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import DiscountEditModal from "./DiscountEdit";
import DiscountCreateModal from "./DiscountCreate";

export function ListDiscount() {
  const { useAxios, api } = useAuth();
  const [{ data = { data: [] }, loading }, refectDiscount] = useAxios<{ data: AppInterface.discount[] }>("discount_code", { manual: true });
  const [discountEdit, setDiscountEdit] = useState<AppInterface.discount>();
  const [discountCreate, setDiscountCreate] = useState(false);
  useEffect(() => {
    refectDiscount();
    return () => {};
  }, []);

  return (
    <HelmetLayout title="Discount List">
      <div className="border bg-white mt-10 rounded shadow">
        <div className="header flex px-5 py-2 border-b justify-between items-center">
          <h1>Discount Code List</h1>
          <ButtonCustom onClick={(e) => setDiscountCreate(true)}>
            <Icon icon={"material-symbols:add-box"} className="w-6 h-6" />
          </ButtonCustom>
        </div>
        <div className="body p-5">
          {/* <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div> */}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-2 w-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No.</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={999}>
                        <div className="flex justify-center w-full py-5">
                          <Loading />
                        </div>
                      </td>
                    </tr>
                  )}
                  {data.data.map((discount, i) => {
                    return (
                      <tr key={discount.id}>
                        <td className="px-2 text-center py-5 border-b border-gray-200 bg-white text-sm">{i + 1}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{discount.code}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {discount.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace(/\,00$/, "")}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className=" flex justify-center items-center gap-2">
                            <ButtonEdit onClick={(e) => setDiscountEdit(discount)}>Edit</ButtonEdit>
                            <ButtonDelete
                              handleDelete={(property) => {
                                return api
                                  .delete(`news-discount/${discount.id}`)
                                  .then((resp) => refectDiscount())
                                  .catch((error) => {
                                    property?.setError && property?.setError(error?.message || "Gagal hapus Category");
                                  });
                              }}
                            >
                              Delete
                            </ButtonDelete>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <DiscountEditModal
            discount={discountEdit}
            onCLose={(udated) => {
              setDiscountEdit(undefined);
              udated && refectDiscount();
            }}
          />
          <DiscountCreateModal
            open={discountCreate}
            onCLose={(udated) => {
              setDiscountCreate(false);
              udated && refectDiscount();
            }}
          />
        </div>
      </div>
    </HelmetLayout>
  );
}
