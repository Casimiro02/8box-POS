import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarNav from "@/components/SidebarNav";

const WebLayout = () => {
  return (
    <SidebarProvider>
      <SidebarNav />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default WebLayout;
