import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate, Routes
} from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout.jsx";
import {HomePage} from "../pages/HomePage/Home.jsx";
import {UsersPage} from "@/pages/UserPage/UserPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/users" element={<UsersPage />} />
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
