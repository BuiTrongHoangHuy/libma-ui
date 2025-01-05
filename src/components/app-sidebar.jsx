import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, Settings, SquareLibrary, NotebookTabs, Library } from 'lucide-react';
import LogoIcon from '@/assets/LogoIcon.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

const items = [
  { title: 'Trang chủ', url: '/home', icon: Home },
  { title: 'Thư viện', url: '/library', icon: Library },
  { title: 'Người dùng', url: '/users', icon: Inbox },
  { title: 'Bạn đọc', url: '/readers', icon: Calendar },
  { title: 'Mượn sách', url: '/borrowingbook', icon: SquareLibrary },
  { title: 'Danh mục', url: '/categories', icon: NotebookTabs },
  { title: 'Cài đặt', url: '#', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Lấy đường dẫn hiện tại
  const location = useLocation();

  // Xác định item nào active dựa trên `location.pathname`
  const activeItem = items.find((item) => location.pathname.startsWith(item.url))?.title;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center pt-5 justify-center">
              <LogoIcon />
            </div>
            <SidebarMenu className="py-6">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.url}>
                    <SidebarMenuButton
                      className={`min-h-10 items-center text-base ${
                        activeItem === item.title ? 'bg-[#5CD3E5] text-white' : ''
                      }`}
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <div className="relative flex items-center">
                        <item.icon
                          className={`absolute left-2 transition-transform duration-300 ${
                            activeItem === item.title ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                          }`}
                        />
                        {!isCollapsed && <span className="ml-6">{item.title}</span>}
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
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
