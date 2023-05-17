import App from "./../App";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import Login, { redirectIfUser } from "@/pages/auth/login";
import Dashboard from "@/pages/dashboard";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import Home from "@/pages/home";
import { routes } from "@/commons/enums/routes";
import UserList from "@/pages/users";
import NotFound from "@/pages/NotFound";
import pages, { Configuration, ListCategoryPage, ListCategoryProductPage, ListDiscount, ListHighlight, QuestionList, SubCategoryProductList } from "@/pages";
import ListProduct from "@/product/ListProduct";
// Configure nested routes with JSX
export const browserRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<Home />} path="/" />
      <Route path="admin" element={<DashboardLayout />}>
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path={routes.manage_users} element={<UserList />} />
        <Route path={routes.news} element={<pages.ListNewsPage />} />
        <Route path={routes.news_add} element={<pages.AddNewsPage />} />
        <Route path={routes.categori.list} element={<ListCategoryPage />} />
        <Route path={routes.hightlight.list} element={<ListHighlight />} />
        <Route path={routes.configuration.list} element={<Configuration />} />
        <Route path={routes.questions} element={<QuestionList />} />
        <Route path={routes.discount} element={<ListDiscount />} />

        <Route path={routes.product.list} element={<ListProduct />} />
        <Route path={routes.product.category} element={<ListCategoryProductPage />} />
        <Route path={routes.product.sub_category} element={<SubCategoryProductList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={routes.login} element={<Login />} loader={redirectIfUser} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
