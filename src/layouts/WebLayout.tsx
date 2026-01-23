// src/layouts/WebLayout.tsx
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"; // Add SidebarInset import
import SidebarNav from "@/components/SidebarNav";

const WebLayout = () => {
  return (
    <SidebarProvider>
      <SidebarNav />
      {/* Wrap the main content with SidebarInset */}
      <SidebarInset>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default WebLayout;