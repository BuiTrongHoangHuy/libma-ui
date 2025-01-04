import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import router from "./router/Router";
import {store} from './store/store.js'
import {Provider} from 'react-redux'
import {Toaster} from "@/components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <>
            <RouterProvider router={router}/>
            <Toaster/>
        </>
    </Provider>
);
