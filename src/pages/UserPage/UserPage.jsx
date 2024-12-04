import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import {groupUserColumns} from "@/pages/UserPage/group-user-columns.jsx";
import {DataTable} from "@/pages/UserPage/data-table.jsx";
import {userColumns} from "@/pages/UserPage/user-columns.jsx";
import {AddGroupUserDialog} from "@/pages/UserPage/components/add-group-user-dialog.jsx";
import {AddUserDialog} from "@/pages/UserPage/components/add-user-dialog.jsx";

const groupUserData = [
    {
        id: "US001",
        name: "admin",
        allowUse: false,
        createdAt: "03/12/2024",
        note: "huy22@yahoo.com",
    },
    {
        id: "US002",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US003",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US004",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US005",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US006",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US007",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US008",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US009",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US0010",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US011",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US012",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US013",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    }, {
        id: "US014",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },
];
const userData = [
    {
        id: "US001",
        username: "john_doe",
        fullname: "John Doe",
        role: "Admin",
        status: "Active",
        createdAt: "03/12/2024",
    },
    {
        id: "US002",
        username: "jane_smith",
        fullname: "Jane Smith",
        role: "User",
        status: "Active",
        createdAt: "04/12/2024",
    },
    // Add more user data as needed
]

export const UsersPage = () => {
    return (
        <div className="p-10 flex flex-col space-y-5">
            <div>
                <p className="text-display/lg/bold font-bold">Người dùng</p>
            </div>
            <Tabs defaultValue="group_user">
                <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="group_user">Nhóm người dùng</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="user">Người dùng</TabsTrigger>
                </TabsList>

                <TabsContent className="py-5" value="group_user">
                    <DataTable data={groupUserData} columns={groupUserColumns} addButton={<AddGroupUserDialog/>}/>

                </TabsContent>
                <TabsContent className="py-5" value="user">
                    <DataTable data={userData} columns={userColumns} addButton={<AddUserDialog/>}/>
                </TabsContent>
            </Tabs>

        </div>
    );
}