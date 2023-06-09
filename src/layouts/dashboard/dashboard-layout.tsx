import { useEffect, useState } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import Breadcrumb from "./breadcrumb";
import FlashMessage from "./FlashMessage";
import Footer from "./footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ProtectRoute, useAuth } from "@/context/auth";
import { routes } from "@/commons/enums/routes";
import { useMessage } from "@/commons/hooks/message";

export default function DashboardLayout() {
  let { isAuthenticated, loading, api, logout } = useAuth();
  const { message } = useMessage();

  let navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = useState(null);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate(routes.login, { replace: true });
        }
        return Promise.reject(error);
      }
    );
    // if (!isAuthenticated) navigate(routes.login, { replace: true });
    return () => {};
  }, [isAuthenticated, loading]);

  return (
    <ProtectRoute>
      <div className="min-h-screen bg-gray-50">
        <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        <div className="p-4 xl:ml-80">
          <Navbar breadcrumbs={<Breadcrumb />} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
          <main className="mx-auto flex min-h-[calc(100vh-130px)] justify-between flex-col ">
            <div className="content relative">
              {message && <FlashMessage flash={message} />}
              <Outlet />
            </div>
            <Footer time_render={0.2} />
          </main>
        </div>
      </div>
    </ProtectRoute>
  );
}
