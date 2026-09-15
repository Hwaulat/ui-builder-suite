import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ListFilter, 
  Database, 
  FileText,
  CheckSquare,
  Users
} from "lucide-react";
import SidebarItem from "../global-sidebar/sidebar-item";

const coreFunctions = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Daily Progress",
    url: "/daily-progress",
    icon: ListFilter,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Approval",
    url: "/records",
    icon: CheckSquare,
    badge: <span className="bg-[#1F5AA6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
  },
];

const setupSystem = [
  // {
  //   title: "Master Data",
  //   url: "/master-data",
  //   icon: Database,
  //   children: [
  //     { label: "Categories", path: "/master-data/categories" }
  //   ]
  // },
  {
    title: "Users Management",
    url: "/users",
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 bg-[#0B1120] text-white">
      <SidebarHeader className="p-4 pt-6 bg-[#0B1120]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold italic">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white leading-tight">RDL - Quality</span>
            <span className="text-xs text-[#7A9BBE]">Control System</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#0B1120]">
        <SidebarGroup className="pt-2">
          <SidebarGroupLabel className="text-[#476282] text-xs font-semibold px-4 mb-2 tracking-wider">
            CORE FUNCTIONS
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 space-y-1">
            {coreFunctions.map((item) => (
              <SidebarItem 
                key={item.title} 
                item={{
                  label: item.title,
                  path: item.url,
                  icon: item.icon,
                  type: 'item',
                  badge: item.badge
                }}
                collapsed={false}
                isMobile={false}
                canAccess={() => true}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="pt-2">
          <SidebarGroupLabel className="text-[#476282] text-xs font-semibold px-4 mb-2 tracking-wider">
            SETUP SYSTEM
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 space-y-1">
            {setupSystem.map((item) => (
              <SidebarItem 
                key={item.title} 
                item={{
                  label: item.title,
                  path: item.url,
                  icon: item.icon,
                  type: 'item',
                  children: item.children
                }}
                collapsed={false}
                isMobile={false}
                canAccess={() => true}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-[#0B1120]">
        <div className="flex items-center justify-between px-2 text-xs text-[#476282]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>System Online</span>
          </div>
          <span>v2.4.1</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
