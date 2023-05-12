import { listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BreadcrumbsHome from "./breadcrumbs-home";

const Breadcrumb = () => {
  const list = useRecoilValue(listBreadCrumbAtom);

  return (
    <div aria-label="breadcrumb" className="w-max">
      <ol className="flex flex-wrap items-center w-full bg-blue-gray-50 bg-opacity-60 py-2 px-4 rounded-md">
        <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
          <BreadcrumbsHome />
          {list.length > 0 && <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>}
        </li>
        {list.map((li, i) => {
          return (
            <li
              key={i}
              className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500"
            >
              {li.url ? <Link to={li.url}>{li.text}</Link> : li.text}
              {list.length - 1 - i > 0 && (
                <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
