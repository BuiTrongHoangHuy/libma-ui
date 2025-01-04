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
    useGetBookCopyQuery,
    useGetCategoryQuery,
    useGetEditionQuery,
    useGetTitleQuery
} from "@/store/rtk/book.service.js";
import {useState} from "react";

const publicationsData = [
    {
        id: "PL001",
        name: "Tạp chí",
        allowUse: false,
        createdAt: "03/12/2024",
        note: "huy22@yahoo.com",
    },
    {
        id: "PL002",
        name: "Truyện",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "PL003",
        name: "Sách giáo khoa",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "PL004",
        name: "Luận án",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },
];

const bookTitleData = [
    {
        titleId: "B001",
        titleName: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        summary: "A guide to writing clean, maintainable, and efficient code in software development.",
    },
    {
        titleId: "B002",
        titleName: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        summary: "An insightful book about building good habits and breaking bad ones for a better life.",
    },
    {
        titleId: "B003",
        titleName: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        summary: "A philosophical novel about a young shepherd's journey to find treasure and discover his purpose.",
    },
    {
        titleId: "B004",
        titleName: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "History",
        summary: "A fascinating exploration of the history of humanity from ancient times to the modern era.",
    },
    {
        titleId: "B005",
        titleName: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        category: "Programming",
        summary: "A timeless resource for software developers on mastering the art of programming and problem-solving.",
    },
    {
        titleId: "B006",
        titleName: "1984",
        author: "George Orwell",
        category: "Dystopian Fiction",
        summary: "A chilling novel about a totalitarian regime and the dangers of oppressive governments.",
    },
    {
        titleId: "B007",
        titleName: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Classic Literature",
        summary: "A powerful story about racial injustice and moral growth in the American South.",
    },
    {
        titleId: "B008",
        titleName: "Deep Work",
        author: "Cal Newport",
        category: "Productivity",
        summary: "A guide to achieving deep focus in a world filled with distractions to produce meaningful work.",
    },
    {
        titleId: "B009",
        titleName: "Dune",
        author: "Frank Herbert",
        category: "Science Fiction",
        summary: "An epic tale of politics, religion, and survival on the desert planet Arrakis.",
    },
    {
        titleId: "B010",
        titleName: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        summary: "A classic novel about love, class, and society in 19th-century England.",
    },
];

const bookEditionData = [
    {
        editionId: "BE001",
        title: "Lập trình JavaScript",
        editionNumber: 1,
        publicationYear: 2022,
        publisher: "Nhà xuất bản Đại học Bách Khoa",
        isbn: "978-3-16-148410-0"
    },
    {
        editionId: "BE002",
        title: "Học máy cơ bản",
        editionNumber: 2,
        publicationYear: 2023,
        publisher: "Nhà xuất bản Công nghệ Thông tin",
        isbn: "978-1-23-456789-7"
    },
    {
        editionId: "BE003",
        title: "Thiết kế web hiện đại",
        editionNumber: 1,
        publicationYear: 2021,
        publisher: "Nhà xuất bản Sách Mới",
        isbn: "978-0-98-765432-1"
    },
    {
        editionId: "BE004",
        title: "Phát triển ứng dụng di động",
        editionNumber: 3,
        publicationYear: 2024,
        publisher: "Nhà xuất bản Khoa học",
        isbn: "978-1-23-000098-6"
    },
    {
        editionId: "BE005",
        title: "Hệ thống cơ sở dữ liệu",
        editionNumber: 1,
        publicationYear: 2022,
        publisher: "Nhà xuất bản Đại học Khoa học Tự nhiên",
        isbn: "978-9-87-654321-4"
    }
];

const bookCopyData = [
    {
        bookId: "B001",
        bookTitle: "Lập Trình Web Căn Bản",
        location: "Kệ 1, Tầng 2",
        condition: "Mới",
        status: "Có sẵn"
    },
    {
        bookId: "B002",
        bookTitle: "Kỹ Thuật Phần Mềm",
        location: "Kệ 2, Tầng 3",
        condition: "Cũ",
        status: "Mượn"
    },
    {
        bookId: "B003",
        bookTitle: "Lịch Sử Việt Nam",
        location: "Kệ 3, Tầng 1",
        condition: "Mới",
        status: "Có sẵn"
    },
    {
        bookId: "B004",
        bookTitle: "Công Nghệ Thông Tin",
        location: "Kệ 1, Tầng 1",
        condition: "Tốt",
        status: "Có sẵn"
    },
    {
        bookId: "B005",
        bookTitle: "Toán Học Đại Cương",
        location: "Kệ 4, Tầng 2",
        condition: "Cũ",
        status: "Mượn"
    }
]

export const CategoryPage = () => {
    const [activeTab, setActiveTab] = useState('publications');

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
        console.log("heheh", transformedEditionData)
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
                                 value="isbn_add">Thêm sách bằng isbn</TabsTrigger>
                </TabsList>

                <TabsContent className="py-5" value="publications">
                    {isLoadingCategories ? (
                        <p>Loading...</p>
                    ) : (
                        <DataTable data={categoriesData} columns={publicationsColumns}
                                   addButton={<AddPublicationDialog/>}/>)}

                </TabsContent>
                <TabsContent className="py-5" value="book_title">
                    {isLoadingTitles ? (
                        <p>Loading...</p>
                    ) : (
                        <DataTable data={transformedData} columns={bookTitleColumns} addButton={<AddBookTitleDialog/>}/>
                    )}
                </TabsContent>
                <TabsContent className="py-5" value="book_edition">
                    {isLoadingEditions ? (
                        <p>Loading...</p>
                    ) : (
                        <DataTable data={transformedEditionData} columns={bookEditionColumns}
                                   addButton={<AddBookEditionDialog/>}/>
                    )}
                </TabsContent>
                <TabsContent className="py-5" value="book_copy">
                    {isLoadingBookCopy ? (
                        <p>Loading...</p>
                    ) : (
                        <DataTable data={transformedBookCopyData} columns={bookCopyColumns}
                                   addButton={<AddBookCopyDialog/>}/>
                    )}
                </TabsContent>
                <TabsContent className="py-5" value="isbn_add">
                    <BookForm/>
                </TabsContent>
            </Tabs>

        </div>
    );
}