import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import {DataTable} from "@/components/data-table.jsx";
import { publicationsColumns } from "./publications-columns";
import { AddPublicationDialog } from "./components/add-publication-dialog";

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

export const CategoryPage = () => {
    return (
        <div className="p-10 flex flex-col space-y-5">
            <div>
                <p className="text-display/lg/bold font-bold">Danh mục</p>
            </div>
            <Tabs defaultValue="group_user">
                <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="group_user">Phân loại ấn phẩm</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="user">Phân loại kho</TabsTrigger>
                </TabsList>

                <TabsContent className="py-5" value="group_user">
                    <DataTable data={publicationsData} columns={publicationsColumns} addButton={<AddPublicationDialog/>}/>
                </TabsContent>
            </Tabs>

        </div>
    );
}