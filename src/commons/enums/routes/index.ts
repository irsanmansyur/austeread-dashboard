import { category } from "./category";
import { hightlight } from "./highlight";
import { product } from "./product";
import { news } from "./news";
import { Order } from "./order";
export const routes = {
  dashboard: "/admin/dashboard",
  login: "/auth/login",
  manage_users: "/admin/user/list",
  news,
  news_add: "/admin/news/add",
  news_category: "/admin/news-category",
  categori: { ...category },
  hightlight,
  configuration: {
    list: "/admin/configuration",
  },
  questions: "/admin/questions",
  discount: "/admin/discount",
  product,
  Order,
};

export default routes;
