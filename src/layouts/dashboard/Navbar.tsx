import { userAtom } from "@/commons/data/user.atom";
import { BsSearch } from "react-icons/bs";
import ProfileNameButton from "./ProfileName";
import { useAuth } from "@/context/auth";

export default function Navbar({ openSideBar, setOpenSideBar, breadcrumbs: Breadcrumb }: any) {
  const { user } = useAuth();
  if (!user) return <></>;
  return (
    <>
      <nav className="block backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80  w-full max-w-full px-4 bg-white rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 border border-gray-200">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div>{Breadcrumb}</div>
          <div className="flex items-center">
            <div className="mr-auto md:mr-4 md:w-56">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 border border-slate-300 pr-7"
                  placeholder="Search"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 ">
                  <BsSearch />
                </button>
              </div>
            </div>
            <ButtonSidebar setOpenSideBar={setOpenSideBar} />
            <ProfileNameButton user={user} />
          </div>
        </div>
      </nav>
    </>
  );
}

const ButtonSidebar = ({ setOpenSideBar }: any) => {
  return (
    <button
      onClick={(e) => setOpenSideBar((e: boolean) => !e)}
      className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
      type="button"
    >
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth={3} className="h-6 w-6 text-blue-gray-500">
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
};
