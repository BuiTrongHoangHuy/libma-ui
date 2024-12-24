import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { borrowTicketColumns } from "./borrow-ticket-columns";
import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button"
import { addTicketColumns } from "./add-ticket-columns";
import { DataTableAddTicket } from "@/components/data-table-add-ticket";
import { AddBorrowingTicketDialog } from "./components/add-borrowing-ticket-dialog";


const borrowTicketData = [
    {
        ticketId: "BR001",
        readerId: "US001",
        readerName: "Huy",
        createdAt: "27/11/2024",
        expiredAt: "30/11/2024",
        borrowQuantity: "5",
        status: "Còn hạn"
    },
    {
        ticketId: "BR002",
        readerId: "US002",
        readerName: "Hoàng",
        createdAt: "27/11/2024",
        expiredAt: "30/11/2024",
        borrowQuantity: "4",
        status: "Hết hạn"
    },
];
const addTicketData = [
    {
        bookId: "B001",
        bookTitle: "OOP",
        returnDate: "03/12/2024",
        status: "Đã kích hoạt",
    },
    {
        bookId: "B001",
        bookTitle: "DSA",
        returnDate: "03/12/2024",
        status: "Chưa kích hoạt",
    },
]

export const BookBorrowingPage = () => {
    const [selectedTab, setSelectedTab] = useState("borrow_ticket");

    const handleAddButtonClick = () => {
        setSelectedTab("add_ticket");
    };

    return (
        <div className="p-10 flex flex-col space-y-5">
            <div>
                <p className="text-display/lg/bold font-bold">Mượn sách</p>
            </div>
            <Tabs defaultValue="borrow_ticket" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                        value="borrow_ticket">Phiếu mượn sách</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                        value="add_ticket">Thêm phiếu mượn</TabsTrigger>
                </TabsList>

                <TabsContent className="py-5" value="borrow_ticket">
                    <DataTable data={borrowTicketData} columns={borrowTicketColumns} addButton={<Button onClick={handleAddButtonClick}>+ Thêm mới</Button>} />
                </TabsContent>
                <TabsContent className="py-5" value="add_ticket">
                    <DataTableAddTicket data={addTicketData} columns={addTicketColumns} addButton={<AddBorrowingTicketDialog/>} />
                </TabsContent>
            </Tabs>

        </div>
    );
}