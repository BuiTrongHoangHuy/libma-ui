import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

// Menu items
const items = [
  {
    title: 'Trang chủ',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Thư viện',
    url: '/library',
    icon: Library,
  },
  {
    title: 'Người dùng',
    url: '/users',
    icon: Inbox,
  },
  {
    title: 'Bạn đọc',
    url: '/readers',
    icon: Calendar,
  },
  {
    title: 'Mượn sách',
    url: '/borrowingbook',
    icon: SquareLibrary,
  },
  {
    title: 'Danh mục',
    url: '/categories',
    icon: NotebookTabs,
  },
  {
    title: 'Cài đặt',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // State for active and hovered item
  const [activeItem, setActiveItem] = useState('Trang chủ'); // Default active item
  const [hoveredItem, setHoveredItem] = useState(null); // Item currently being hovered

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
                <SidebarMenuItem
                  key={item.title}
                  onMouseEnter={() => setHoveredItem(item.title)} // Set hovered item
                  onMouseLeave={() => setHoveredItem(null)} // Clear hovered item
                >
                  <Link
                    to={item.url}
                    onClick={() => setActiveItem(item.title)} // Set active item
                  >
                    <SidebarMenuButton
                      className={`min-h-10 items-center text-base ${
                        activeItem === item.title ? 'bg-[#5CD3E5] text-white' : ''
                      }`}
                      asChild
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <div className="relative flex items-center">
                        {/* Icon with animation */}
                        <item.icon
                          className={`absolute left-2 transition-transform duration-300 ${
                            activeItem === item.title || hoveredItem === item.title
                              ? 'translate-x-0 opacity-100'
                              : '-translate-x-5 opacity-0'
                          }`}
                        />
                        {/* Title */}
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
