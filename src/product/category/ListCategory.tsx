import { listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import HelmetLayout from "@/layouts/HelmetLayout";
import { useAuth } from "@/context/auth";
import { AppInterface } from "@/commons/interface/app";
import { ButtonCustom, ButtonDelete, ButtonEdit } from "@/components/form";
import { Icon } from "@iconify/react";
import CreateCategory from "./CreateCategory";
import routes from "@/commons/enums/routes";
import EditProductCategory from "./EditCategory";
export function ListCategoryProductPage() {
  const { useAxios, api } = useAuth();
  const [{ data = { data: [] }, loading, error: errorLoadCategory, response }, refetchCategory] = useAxios<{ data: AppInterface.CategoryProduct[] }>({ url: "/products-category" });
  const setBreads = useSetRecoilState(listBreadCrumbAtom);
  useEffect(() => {
    setBreads([{ text: "Product", url: routes.product.list }, { text: "Category" }]);
    return () => {};
  }, []);

  const [categoryEdit, setCategoryEdit] = useState<AppInterface.CategoryProduct>();
  const [createCategory, setCreateCategory] = useState(false);

  return (
    <HelmetLayout title="List Product Category">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Product Category</h2>
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => setCreateCategory(true)}>
            <Icon icon="material-symbols:add" className="w-7 h-7" />
          </div>
        </div>
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
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
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
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={999} className="text-center p-10">
                      <ButtonCustom disabled className="w-full bg-transparent hover:bg-transparent"></ButtonCustom>
                    </td>
                  </tr>
                ) : (
                  data.data.map((category, i) => {
                    return (
                      <tr key={category.id}>
                        <td className="px-2 text-center py-5 border-b border-gray-200 bg-white text-sm">{i + 1}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{category.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className=" flex justify-center items-center gap-2">
                            <ButtonEdit onClick={(e) => setCategoryEdit(category)}>Edit</ButtonEdit>
                            <ButtonDelete
                              handleDelete={async (property) => {
                                return api
                                  .delete(`products-category/${category.id}`)
                                  .then((resp) => refetchCategory())
                                  .catch((error) => {
                                    property.setError(error?.message || "Gagal hapus Category");
                                  });
                              }}
                            >
                              Delete
                            </ButtonDelete>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">Prev</button>
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProductCategory
        category={categoryEdit}
        onCLose={(updated) => {
          setCategoryEdit(undefined);
          updated && refetchCategory();
        }}
      />
      <CreateCategory
        open={createCategory}
        onCLose={(updated) => {
          setCreateCategory(false);
          updated && refetchCategory();
        }}
      />
    </HelmetLayout>
  );
}
