import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import { handleViolationsColumns } from "./handle-violations-columns";
import { readerCardColumns } from "./reader-card-columns";
import {DataTable} from "@/components/data-table.jsx";
import {AddGroupUserDialog} from "@/pages/UserPage/components/add-group-user-dialog.jsx";
import { AddReaderCardDialog } from "./components/add-reader-card-dialog";
import { AddHandleViolationDialog } from "./components/add-handle-violation-dialog";

const violationsData = [
    {
        id: "VL001",
        readerName: "Huy",
        reason: "Rách sách",
        punishmentType: "Thu hồi thẻ",
        expense: "100.000",
        beginAt: "27/11/2024",
        endAt: "30/11/2024",
    },
    {
        id: "VL002",
        readerName: "Hoang",
        reason: "Mất sách",
        punishmentType: "Phạt tiền",
        expense: "100.000",
        beginAt: "27/11/2024",
        endAt: "30/11/2024",
    }, 
];
const readerCardData = [
    {
        id: "RD001",
        readerName: "john_doe",
        createdAt: "03/12/2024",
        expiredAt: "01/01/2025",
        cardType: "Student Card",
        status: "InActive",
        
    },
    {
        id: "RD002",
        readerName: "jane_smith",
        createdAt: "04/12/2024",
        expiredAt: "30/12/2024",
        cardType: "Guest Card",
        status: "Active",
        
    },
    // Add more user data as needed
]

export const ReaderPage = () => {
    return (
        <div className="p-10 flex flex-col space-y-5">
            <div>
                <p className="text-display/lg/bold font-bold">Bạn đọc</p>
            </div>
            <Tabs defaultValue="reader_card">
                <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="reader_card">Thẻ bạn đọc</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="handle_violation">Xử lý vi phạm</TabsTrigger>
                </TabsList>

                <TabsContent className="py-5" value="reader_card">
                    <DataTable data={readerCardData} columns={readerCardColumns} addButton={<AddReaderCardDialog/>}/>

                </TabsContent>
                <TabsContent className="py-5" value="handle_violation">
                    <DataTable data={violationsData} columns={handleViolationsColumns} addButton={<AddHandleViolationDialog/>}/>
                </TabsContent>
            </Tabs>

        </div>
    );
}