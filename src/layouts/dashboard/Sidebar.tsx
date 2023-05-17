import { FaHeading, FaQuoteLeft } from "react-icons/fa/index";
import { AiFillContacts, AiFillDashboard } from "react-icons/ai/index";
import { MdArticle, MdCategory, MdOutlineArticle } from "react-icons/md/index";
import { BsLayoutWtf, BsPeopleFill, BsPersonSquare } from "react-icons/bs/index";
import { BiPhotoAlbum } from "react-icons/bi/index";
import { NavLink } from "react-router-dom";
import { routes } from "@/commons/enums/routes";
import { Icon } from "@iconify/react";

export default function Sidebar({ openSideBar, setOpenSideBar }: { setting_app?: object; openSideBar: any; setOpenSideBar: any }) {
  const LiSideBar = ({ url = "#", text, icon }: any) => {
    return (
      <li onClick={(e) => setOpenSideBar(!openSideBar)}>
        <NavLink
          to={url}
          className={({ isActive }) =>
            (isActive ? "bg-primary hover:bg-primary/90 active:bg-primary-light" : "hover:bg-white/10 active:bg-white/30") +
            `middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white  w-full flex items-center gap-4 px-4 capitalize active`
          }
        >
          {icon}
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{text}</p>{" "}
        </NavLink>
      </li>
    );
  };
  return (
    <aside
      className={`overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 ${
        openSideBar ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <div className="relative border-b border-white/20 flex justify-center p-4">
        <a target={"_blank"} href="/" className="flex flex-col gap-2">
          <img src={"/images/logo.austeread.gif"} className="relative  rounded-md max-h-16" />
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">AUSTEREAD</h6>
        </a>
        <button
          onClick={(e) => setOpenSideBar(!openSideBar)}
          className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <LiSideBar url={routes.dashboard} text="Dashboard" icon={<AiFillDashboard className="w-5 h-5 text-inherit" />} />
        </ul>
        <ul className="mb-4 flex flex-col gap-1 ">
          {/* user Menu */}
          <li className="mx-3.5 mt-4 mb-2">
            <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">Users</p>
          </li>
          <LiSideBar url={routes.manage_users} text="Manage Users" icon={<BsPeopleFill className="w-5 h-5 text-inherit" />} />
          {/* end of user menu */}
          <LiPembatas />
          {/* News Menu */}
          <li className="mx-3.5 mt-4 mb-2">
            <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">News</p>
          </li>
          <LiSideBar url={routes.news} text="Manage News" icon={<MdOutlineArticle className="w-5 h-5 text-inherit" />} />
          <LiSideBar url={routes.categori.list} text="Manage News Category" icon={<MdCategory className="w-5 h-5 text-inherit" />} />
          <LiSideBar url={routes.hightlight.list} text="Manage Hightlight" icon={<Icon className="w-5 h-5 text-inherit" icon="cryptocurrency:hight" />} />
          {/* end of news menu */}
          <LiPembatas />
          {/* Product Menu */}
          <li className="mx-3.5 mt-4 mb-2">
            <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">Product</p>
          </li>
          <LiSideBar url={routes.product.list} text="Product List" icon={<Icon className="w-5 h-5 text-inherit" icon="akar-icons:product-hunt-fill" />} />
          <LiSideBar url={routes.product.category} text="Product Category" icon={<Icon className="w-5 h-5 text-inherit" icon="bxs:category" />} />
          <LiSideBar url={routes.product.sub_category} text="Product Sub Category" icon={<Icon className="w-5 h-5 text-inherit" icon="iconamoon:category-thin" />} />
          {/* end of Product menu */}
          <LiPembatas />

          {/* Discount Menu */}
          <LiSideBar url={routes.discount} text="Discount Code" icon={<Icon icon={"bxs:discount"} className="w-5 h-5 text-inherit" />} />
          {/* end of Discount  menu */}

          {/* Questions  Menu */}
          <LiSideBar url={routes.questions} text="Questions List" icon={<Icon icon={"mdi:question-mark-circle-outline"} className="w-5 h-5 text-inherit" />} />
          {/* end of question  menu */}

          {/* Configuration Menu */}
          <LiSideBar url={routes.configuration.list} text="Configuration List" icon={<Icon icon="icon-park-solid:config" className="w-5 h-5 text-inherit" />} />
          {/* Endof Configuration */}
        </ul>
      </div>
    </aside>
  );
}

const LiPembatas = () => {
  return <li className="border-b  mx-4 border-b-blue-gray-800 my-4"></li>;
};
