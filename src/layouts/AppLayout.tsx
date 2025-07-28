import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OptionsHeader from "@/components/common/OptionsHeader";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { startWatchingForUpdates } from "@/api/syncApi";
import { toast, Toaster } from "sonner";

export default function AppLayout() {
  // Start watching for incoming emails
  useEffect(() => {
    startWatchingForUpdates();
    toast("Successfully logged in");
  }, []);
  return (
    <SidebarProvider className="flex h-full w-full">
      <AppSidebar />
      <main className="relative flex h-full min-w-0 flex-1 flex-col">
        <Toaster />
        <SidebarTrigger className="absolute z-50" />
        <div className="relative flex h-[70px] shrink-0 items-end px-4 md:px-12 lg:px-20">
          <OptionsHeader />
        </div>
        <div className="relative z-0 flex-1 overflow-hidden px-4 pb-4 md:px-12 lg:px-20">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

// Mark as Read/Unread
// Done
// Star
// Remind later
