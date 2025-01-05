import {Outlet} from "react-router-dom";
import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const MainLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="flex-grow bg-background min-w-screen w-full">
                {/* Dropdown Menu */}
                <div className="relative flex ml-auto w-[260px] h-[55px] rounded-md mt-8 mr-8">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <div
                                className="flex items-center gap-4 group pl-4 py-4 cursor-pointer bg-gray-400 rounded-2xl transition-transform duration-200 ease-in-out hover:scale-105">
                                <div className="flex flex-col">
                                    <span className="font-bold text-black">Huy Bui Trong Hoang</span>
                                    <span className="text-sm text-black">Account menu</span>
                                </div>
                                <div
                                    className="flex items-center justify-center w-12 h-12 bg-primary-color text-white rounded-full transition-transform duration-200 ease-in-out group-hover:scale-110">
                                </div>
                            </div>

                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content
                            className="mt-2 w-48 bg-white shadow-lg rounded-md border p-2"
                            sideOffset={8}
                        >
                            <DropdownMenu.Item
                                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-800"
                                onClick={() => console.log("Log Out")}
                            >
                                Log Out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
                <div className="w-full h-full overflow-x-hidden">
                    <Outlet/>
                </div>
            </main>
        </SidebarProvider>
    );
};

export default MainLayout;
