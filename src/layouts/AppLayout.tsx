import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OptionsHeader from "@/components/common/OptionsHeader";
import { Outlet } from "react-router";
import { useEffect } from "react";

export default function AppLayout() {
  // Start watching for incoming emails
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/v1/sync/start-watch", {
        method: "POST",
        credentials: "include",
      });
      const result = await res.json();
      console.log(result);
    })();
  }, []);
  return (
    <SidebarProvider className="flex h-full w-full">
      <AppSidebar />
      <main className="flex h-full min-w-0 flex-1 flex-col bg-slate-200">
        <div className="flex h-[60px] shrink-0 items-center">
          <SidebarTrigger />
          <OptionsHeader />
        </div>
        <div className="relative z-0 flex-1 overflow-hidden bg-slate-400 p-4 px-12">
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
