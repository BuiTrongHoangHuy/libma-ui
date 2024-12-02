import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Calendar, Home, Inbox, Search, Settings} from "lucide-react";
import LogoIcon from "@/assets/LogoIcon.jsx";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "User",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Reader",
        url: "#",
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
            <SidebarHeader />
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className={"flex items-center justify-center"}>
                            <LogoIcon></LogoIcon>
                        </div>
                        <SidebarMenu className="py-5">
                            {items.map((item) => (
                                <SidebarMenuItem className="gap-2" key={item.title}>
                                    <SidebarMenuButton className="min-h-10 items-center text-base" asChild>
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}
