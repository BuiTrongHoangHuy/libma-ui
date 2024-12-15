import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
const MainLayout = () => {
    return (
        <SidebarProvider>
                <AppSidebar />
                <main className="flex-grow bg-background min-w-screen w-full">
                    <div className="w-full h-full overflow-x-hidden">
                        <Outlet />
                    </div>
                </main>
        </SidebarProvider>
    );
};

export default MainLayout;
