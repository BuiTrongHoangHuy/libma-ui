import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router/Router";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <RouterProvider router={router} />
    </>
)
