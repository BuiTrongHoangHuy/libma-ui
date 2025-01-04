import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/Router";
import Provider from "./components/provider/provider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </>
);
