import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OptionsHeader from "@/components/common/OptionsHeader";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <OptionsHeader />
      </main>
    </SidebarProvider>
  );
}
