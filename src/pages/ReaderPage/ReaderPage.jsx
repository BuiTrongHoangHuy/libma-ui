import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { handleViolationsColumns } from "./handle-violations-columns";
import { readerCardColumns } from "./reader-card-columns";
import { DataTable } from "@/components/data-table.jsx";
import { AddReaderCardDialog } from "./components/add-reader-card-dialog";
import { AddHandleViolationDialog } from "./components/add-handle-violation-dialog";
import { readerApi } from "./api/readerApi";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailReaderCardDialog } from "./components/detail-reader-dialog";

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
    const { toast } = useToast()
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [readerId, setReaderId] = useState(null);

    const { data: rawReaderData = [], isLoading, isError } = useQuery({
        queryKey: ["allReaders"], // Object form
        queryFn: async () => {
            const response = await readerApi.getAllReaders();
            // console.log(response.data);
            return response.data;
        },
        onError: () => {
            toast({
                title: <p className="text-error">Lấy dữ liệu thất bại</p>,
                description: "Lỗi hệ thống",
                status: "error",
                duration: 2000,
            });
        },
    });

    const allReader = rawReaderData.map(reader => ({
        reader_id: reader.reader_id || 0, // Ensure there's a default value if the field is missing
        fullName: reader.fullName || '',
        phoneNumber: reader.phoneNumber || '',
        email: reader.email || '',
        address: reader.address || '',
        type: reader.type || 'Student', // Default value for role if not present
        status: reader.status || 0, // Default to 1 if status is missing
        createdAt: new Date(reader.createdAt) || new Date(),
        updatedAt: new Date(reader.updatedAt) || new Date(),
        expiredAt: new Date(reader.expiredAt) || new Date(Date.now),
    })).filter((user) => user.status !== 0);

    const handleReaderAdded = () => {
        queryClient.invalidateQueries({
            queryKey: ["allReaders"], // Object form
        });
    };

    const handleDeleteReaders = async (rowsToDelete) => {
        try {
            await Promise.all(
                rowsToDelete.map((reader) => {
                    console.log(reader);
                    readerApi.deleteReader(reader.reader_id);
                }
                )
            );

        } catch (error) {
            console.error("Failed to delete users:", error);
            throw error;
        }
    };

    const handleViewReaderDetails = (id) => {
        setReaderId(id);
        setOpen(true);
    };

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
                    <DetailReaderCardDialog id={readerId} open={open} setOpen={setOpen} />
                    <DataTable data={allReader} columns={readerCardColumns(handleViewReaderDetails)} addButton={<AddReaderCardDialog onReaderAdded={handleReaderAdded} />} onDeleteRows={handleDeleteReaders} />
                </TabsContent>
                <TabsContent className="py-5" value="handle_violation">
                    <DataTable data={violationsData} columns={handleViolationsColumns} addButton={<AddHandleViolationDialog />} />
                </TabsContent>
            </Tabs>

        </div>
    );
}