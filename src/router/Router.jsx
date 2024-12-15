import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate, Routes
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout.jsx";
import {HomePage} from "../pages/HomePage/Home.jsx";
import {UsersPage} from "@/pages/UserPage/UserPage.jsx";
import { ReaderPage } from "@/pages/ReaderPage/ReaderPage.jsx";
import DefaultLayout from "@/layouts/DefaultLayout.jsx";
import {LoginPage} from "@/pages/LoginPage/LoginPage.jsx";
import {SignUpPage} from "@/pages/SignUpPage/SignUpPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/readers" element={<ReaderPage/>} />
            </Route>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/login" element ={<LoginPage/>}/>
                <Route path="/sign-up" element={<SignUpPage/>}/>

            </Route>
        </Route>
    ),
    {
        future: {
            v7_startTransition: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionStatusRevalidation: true
        }
    }
);

export default router;
