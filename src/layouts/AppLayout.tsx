import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OptionsHeader from "@/components/common/OptionsHeader";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <OptionsHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
