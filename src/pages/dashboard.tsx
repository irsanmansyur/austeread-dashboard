import { listBreadCrumbAtom } from "@/commons/data/breadcrumb.atom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import reactLogo from "../assets/react.svg";
import HelmetLayout from "@/layouts/HelmetLayout";
import { MdOutlineArticle, MdPeople } from "react-icons/md";

function Dashboard() {
  const [count, setCount] = useState(0);
  const setBreads = useSetRecoilState(listBreadCrumbAtom);
  useEffect(() => {
    setBreads([{ text: "Dashboard" }]);
    return () => {};
  }, []);

  return (
    <HelmetLayout title="Dashboard">
      <div className="flex flex-wrap mt-10 gap-10">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border group">
          <div className="flex-auto p-4">
            <div className="flex flex-row">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Jumlah User</p>
                  <h5 className="mb-2 font-bold dark:text-white">53,000</h5>
                </div>
              </div>
              <div className="px-3 text-right basis-1/3">
                <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500 flex items-center justify-center">
                  <MdPeople className="ni leading-none ni-money-coins text-lg relative text-white group-hover:scale-150 transition duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border group">
          <div className="flex-auto p-4">
            <div className="flex flex-row">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Total News</p>
                  <h5 className="mb-2 font-bold dark:text-white">2,000</h5>
                </div>
              </div>
              <div className="px-3 text-right basis-1/3">
                <div className="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-green-500 to-blue-500 flex items-center justify-center">
                  <MdOutlineArticle className="text-lg relative text-white group-hover:scale-150 transition duration-700 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetLayout>
  );
}

export default Dashboard;
