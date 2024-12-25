import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate, Routes
} from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout.jsx";
import {HomePage} from "../pages/HomePage/Home.jsx";
import {UsersPage} from "@/pages/UserPage/UserPage.jsx";
import { ReaderPage } from "@/pages/ReaderPage/ReaderPage.jsx";
import { BookBorrowingPage } from "@/pages/BookBorrowingPage/BookBorrowingPage.jsx";
import { CategoryPage } from "@/pages/CategoryPage/CategoryPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/readers" element={<ReaderPage/>} />
                <Route path="/borrowingbook" element={ <BookBorrowingPage/> }/>
                <Route path="/categories" element={ <CategoryPage/> }/>
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
