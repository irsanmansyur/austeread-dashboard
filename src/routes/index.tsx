import App from "./../App";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Login, { redirectIfUser } from "@/pages/auth/login";
import Dashboard from "@/pages/dashboard";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Home from "@/pages/home";
import { routes } from "@/commons/enums/route";
import UserList from "@/pages/users";
import NotFound from "@/pages/NotFound";
import pages from "@/pages";
// Configure nested routes with JSX
export const browserRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<Home />} path="/" />
      <Route path="admin" element={<DashboardLayout />}>
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path={routes.manage_users} element={<UserList />} />
        <Route path={routes.news} element={<pages.ListNewsPage />} />
        <Route path={routes.news_category} element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={routes.login} element={<Login />} loader={redirectIfUser} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
