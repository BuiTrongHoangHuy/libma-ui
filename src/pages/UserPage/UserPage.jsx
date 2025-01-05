import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DataTable } from "@/components/data-table.jsx";
import { userColumns } from "@/pages/UserPage/user-columns.jsx";
import { AddUserDialog } from "@/pages/UserPage/components/add-user-dialog.jsx";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/pages/UserPage/api/userApi.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailUserDialog } from "./components/detail-user-dialog";
import { useState } from "react";

export const UsersPage = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false); 
  const [userId, setUserId] = useState(null);

  const { data: rawUserData = [], isLoading, isError } = useQuery({
    queryKey: ["allUsers"], // Object form
    queryFn: async () => {
      const response = await userApi.getAllUsers();
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

  // Format raw data into the desired structure
  const allUser = rawUserData.map(user => ({
    user_id: user.user_id || 0, // Ensure there's a default value if the field is missing
    fullName: user.fullName || '',
    phoneNumber: user.phoneNumber || '',  
    email: user.email || '',
    address: user.address || '',
    role: user.role || 'user', // Default value for role if not present
    status: user.status || 0, // Default to 1 if status is missing
    createdAt: new Date(user.createdAt) || new Date(),
    updatedAt: new Date(user.updatedAt) || new Date(),
  })).filter((user) => user.status !== 0);

  // Hàm để trigger refetch sau khi thêm người dùng
  const handleUserAdded = () => {
    queryClient.invalidateQueries({
      queryKey: ["allUsers"], // Object form
    });
  };

  const handleDeleteUsers = async (rowsToDelete) => {
    try {
      await Promise.all(
        rowsToDelete.map((user) => {
          // console.log(user.email);
          userApi.deleteUser(user.email);
        }
        )
      );

    } catch (error) {
      console.error("Failed to delete users:", error);
      throw error;
    }
  };

  const handleViewUserDetails = (id) => {
    setUserId(id);
    setOpen(true);
};

  return (
    <div className="p-10 flex flex-col space-y-5">
      <div>
        <p className="text-display/lg/bold font-bold">Người dùng</p>
      </div>
      <Tabs defaultValue="user">
        <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
          {/* <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="group_user">Nhóm người dùng</TabsTrigger> */}
          <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                                focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                                aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
            value="user">Người dùng</TabsTrigger>
        </TabsList>

        <TabsContent className="py-5" value="user">
          <DetailUserDialog id={userId} open={open} setOpen={setOpen} />
          <DataTable data={allUser} columns={userColumns(handleViewUserDetails)} addButton={<AddUserDialog onUserAdded={handleUserAdded} />} onDeleteRows={handleDeleteUsers} />
        </TabsContent>
      </Tabs>

    </div>
  );
}