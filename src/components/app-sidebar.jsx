import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar"
import {Calendar, Home, Inbox, Search, Settings} from "lucide-react";
import LogoIcon from "@/assets/LogoIcon.jsx";
import {Link, useNavigate} from "react-router-dom";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "User",
        url: "/users",
        icon: Inbox,
    },
    {
        title: "Reader",
        url: "/readers",
        icon: Calendar,
    },
    {
        title: "Categories",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
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
