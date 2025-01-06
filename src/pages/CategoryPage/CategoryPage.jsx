import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import {DataTable} from "@/components/data-table.jsx";
import {publicationsColumns} from "./publications-columns";
import {AddPublicationDialog} from "./components/add-publication-dialog";
import {bookTitleColumns} from "./book-title-columns";
import {AddBookTitleDialog} from "./components/add-book-title-dialog";
import {bookEditionColumns} from "./book-edition-columns";
import {AddBookEditionDialog} from "./components/add-book-edition-dialog";
import {bookCopyColumns} from "./book-copy-columns";
import {AddBookCopyDialog} from "./components/add-book-copy-dialog";
import BookForm from "./components/add-book-by-isbn";
import {
    useAddTitleMutation,
    useGetBookCopyQuery,
    useGetCategoryQuery,
    useGetEditionQuery,
    useGetTitleQuery
} from "@/store/rtk/book.service.js";
import {useState} from "react";
import {UpdateBookTitleDialog} from "@/pages/CategoryPage/components/updateTitleModal.jsx";
import {UpdateBookEditionDialog} from "@/pages/CategoryPage/components/updateEditionModal.jsx";
import {UpdateBookCopyDialog} from "@/pages/CategoryPage/components/updateBookCopyModal.jsx";


export const CategoryPage = () => {
    const [activeTab, setActiveTab] = useState('publications');
    const [open, setOpen] = useState(false);
    const [readerId, setReaderId] = useState(null);
    const {data: categoriesResponse, isLoading: isLoadingCategories} = useGetCategoryQuery();
    const {data: titlesResponse, isLoading: isLoadingTitles} = useGetTitleQuery(undefined, {
            skip: activeTab !== 'book_title',
        }
    );
    const {data: editionsResponse, isLoading: isLoadingEditions} = useGetEditionQuery(undefined, {
            skip: activeTab !== 'book_edition',
        }
    );
    const {data: bookCopyResponse, isLoading: isLoadingBookCopy} = useGetBookCopyQuery(undefined, {
            skip: activeTab !== 'book_copy',
        }
    );

    const categoriesData = categoriesResponse?.data ? categoriesResponse.data : [];
    const titlesData = titlesResponse?.data ? titlesResponse.data : [];
    const editionsData = editionsResponse?.data ? editionsResponse.data : [];
    const bookCopyData = bookCopyResponse?.data ? bookCopyResponse.data : [];
    let transformedData = []
    let transformedEditionData = []
    let transformedBookCopyData = []

    if (activeTab === "book_title") {
        transformedData = titlesData.map((item) => ({
            ...item,
            categoryName: item.Category?.categoryName || "N/A",
        }));
    }
    if (activeTab === "book_edition") {
        transformedEditionData = editionsData.map((item) => ({
            ...item,
            titleName: item.Title?.titleName || "N/A",
            categoryName: item.Title?.Category?.categoryName || "N/A",
            author: item.Title?.author || "N/A",
        }));
    }
    if (activeTab === "book_copy") {
        transformedBookCopyData = bookCopyData.map((item) => ({
            ...item,
            titleName: item.Edition?.Title?.titleName || "N/A",
            editionNumber: item.Edition?.editionNumber || "N/A",
            categoryName: item.Edition?.Title?.Category?.categoryName || "N/A",
            author: item.Edition?.Title?.author || "N/A",
            publisher: item.Edition?.publisher || "N/A",
            publicationYear: item.Edition?.publicationYear || "N/A",
            isbn: item.Edition?.isbn || "N/A",
        }));
    }
    console.log("book", bookCopyData)
    const handleViewTitleDetails = (id) => {
        setReaderId(id);
        setOpen(true);
    };
    return (
        <div className="p-10 flex flex-col space-y-5">
            <div>
                <p className="text-display/lg/bold font-bold">Danh mục</p>
            </div>
            <Tabs value={activeTab} onValueChange={(tab => setActiveTab(tab))}>
                <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="publications">Phân loại ấn phẩm</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="book_title">Quản lý tựa sách</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="book_edition">Quản lý đầu sách</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="book_copy">Quản lý sách</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="isbn_add">Thêm sách nhanh</TabsTrigger>
                </TabsList>

                <TabsContent className="py-5" value="publications">
                    {isLoadingCategories ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <DataTable data={categoriesData} columns={publicationsColumns}
                                   addButton={<AddPublicationDialog/>}/>)}

                </TabsContent>
                <TabsContent className="py-5" value="book_title">
                    {isLoadingTitles ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <DataTable data={transformedData} columns={bookTitleColumns(handleViewTitleDetails)}
                                       addButton={<AddBookTitleDialog/>}/>
                            <UpdateBookTitleDialog id={readerId} open={open} setOpen={setOpen}></UpdateBookTitleDialog>
                        </>

                    )}
                </TabsContent>
                <TabsContent className="py-5" value="book_edition">
                    {isLoadingEditions ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <DataTable data={transformedEditionData}
                                       columns={bookEditionColumns(handleViewTitleDetails)}
                                       addButton={<AddBookEditionDialog/>}/>
                            <UpdateBookEditionDialog id={readerId} open={open}
                                                     setOpen={setOpen}></UpdateBookEditionDialog>
                        </>

                    )}
                </TabsContent>
                <TabsContent className="py-5" value="book_copy">
                    {isLoadingBookCopy ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <DataTable data={transformedBookCopyData} columns={bookCopyColumns(handleViewTitleDetails)}
                                       addButton={<AddBookCopyDialog/>}/>
                            <UpdateBookCopyDialog id={readerId} open={open}
                                                  setOpen={setOpen}></UpdateBookCopyDialog>
                        </>

                    )}
                </TabsContent>
                <TabsContent className="py-5" value="isbn_add">
                    <BookForm/>
                </TabsContent>
            </Tabs>

        </div>
    );
}