import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "./index.css";
import router from "./router/Router";
import {store} from './store/store.js'
import {Provider} from 'react-redux'
import {Toaster} from "@/components/ui/toaster.jsx";
import Provider from "./components/provider/provider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <>
            
              <Provider>
                <RouterProvider router={router} />
                <Toaster/>
              </Provider>
        </>
    </Provider>
);
