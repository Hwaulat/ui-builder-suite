import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    // Basic auth check using localStorage for mock implementation
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("auth_token") !== null;
      if (!isAuthenticated) {
        throw redirect({
          to: "/login",
        });
      }
    }
  },
  component: AuthenticatedLayout,
});

import { TopBar } from "@/components/layout/TopBar";
import { useSidebar } from "@/components/ui/sidebar";

function AuthenticatedContent() {
  const { state, setOpen, openMobile, setOpenMobile } = useSidebar();
  
  return (
    <div className="h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 flex flex-col bg-muted/20 overflow-hidden w-full h-full">
        <TopBar 
          collapsed={state === "collapsed"}
          setCollapsed={(c) => setOpen(!c)}
          sidebarOpen={openMobile}
          setSidebarOpen={setOpenMobile}
        />
        <div className="flex-1 overflow-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AuthenticatedContent />
    </SidebarProvider>
  );
}
