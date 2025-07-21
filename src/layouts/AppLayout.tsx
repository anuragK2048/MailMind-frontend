import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OptionsHeader from "@/components/common/OptionsHeader";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <SidebarProvider className="flex h-full w-full overflow-hidden">
      <AppSidebar />
      <main className="flex h-full min-w-0 flex-1 flex-col bg-slate-200">
        <div className="flex h-[60px] shrink-0 items-center">
          <SidebarTrigger />
          <OptionsHeader />
        </div>
        <div className="flex-1 overflow-hidden bg-slate-400 p-4 px-12">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
