import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import { browserRoutes } from "./routes";
import "tw-elements";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={browserRoutes} />);
