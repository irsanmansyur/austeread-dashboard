import Axios from "axios";

let urls = {
  test: `http://localhost:4023/api/`,
  development: process.env.BASE_API_DEV,
  production: process.env.BASE_API_PROD,
};

const NODE_ENV = (process.env.NODE_ENV || "test") as keyof typeof urls;
const api = Axios.create({
  baseURL: urls[NODE_ENV],
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
