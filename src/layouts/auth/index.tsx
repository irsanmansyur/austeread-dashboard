import { NotLoginProtect } from "@/context/auth";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <NotLoginProtect>
      <div className="relative min-h-screen w-full">
        {/* <Header /> */}
        <img
          src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </NotLoginProtect>
  );
}
