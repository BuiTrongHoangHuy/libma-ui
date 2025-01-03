import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar"
import {Calendar, Home, Inbox, Search, Settings, SquareLibrary, NotebookTabs} from "lucide-react";
import LogoIcon from "@/assets/LogoIcon.jsx";
import {Link, useNavigate} from "react-router-dom";

// Menu items.
const items = [
    {
        title: "Trang chủ",
        url: "/home",
        icon: Home,
    },
    {
        title: "Người dùng",
        url: "/users",
        icon: Inbox,
    },
    {
        title: "Bạn đọc",
        url: "/readers",
        icon: Calendar,
    },
    {
        title: "Mượn sách",
        url: "/borrowingbook",
        icon: SquareLibrary,
    },
    {
        title: "Danh mục",
        url: "/categories",
        icon: NotebookTabs,
    },
    {
        title: "Cài đặt",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className={"flex items-center pt-5 justify-center"}>
                            <LogoIcon></LogoIcon>
                        </div>
                        <SidebarMenu className="py-6">
                            {items.map((item) => (
                                <SidebarMenuItem className="gap-2" key={item.title}>
                                    <Link to={`${item.url}`}>
                                        <SidebarMenuButton className="min-h-10 items-center text-base" asChild>
                                            <div >
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarTrigger/>
            </SidebarFooter>
        </Sidebar>
    )
}
