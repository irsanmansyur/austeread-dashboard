import { listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import HelmetLayout from "@/layouts/HelmetLayout";
import { useAuth } from "@/context/auth";
import { AppInterface } from "@/commons/interface/app";
import ButtonCustom from "@/components/form/button";
import ButtonEdit from "@/components/form/buttonEdit";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { routes } from "@/commons/enums/routes";

export default function ListNewsPage() {
  const { useAxios } = useAuth();
  const [{ data = { data: [] }, loading, error }, refetchUsers] = useAxios<{ data: AppInterface.Article[] }>({ url: "/news" });
  const [openAddUser, setOpenAddUser] = useState(false);
  const [userEdit, setUserEdit] = useState<AppInterface.User | null>(null);
  const [userChangePassword, setUserChangePassword] = useState<AppInterface.User | null>(null);
  const [count, setCount] = useState(0);
  const setBreads = useSetRecoilState(listBreadCrumbAtom);
  useEffect(() => {
    setBreads([{ text: "News" }]);
    return () => {};
  }, []);

  return (
    <HelmetLayout title="News List">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">News</h2>
          <Link to={routes.news_add} className="flex items-center gap-2 cursor-pointer">
            Tambah
          </Link>
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
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No.</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created at</th>
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
                  data.data.map((news, i) => {
                    return (
                      <tr key={news.id}>
                        <td className="px-2 text-center py-5 border-b border-gray-200 bg-white text-sm">{i + 1}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{news.title}</p>
                          <div className="text-gray-800 text-sm whitespace-no-wrap">
                            Author : <span className="font-bold"> {news.tbl_user.first_name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{news.tbl_news_category.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{news.createdAt}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className=" flex justify-center items-center gap-2">
                            <ButtonEdit>Edit</ButtonEdit>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              {/* <span className="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span> */}
              {/* <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">Prev</button>
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">Next</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </HelmetLayout>
  );
}
