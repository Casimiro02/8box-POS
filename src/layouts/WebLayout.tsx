import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SidebarNav from "@/components/SidebarNav";

const WebLayout = () => {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset className="relative bg-gray-100 overflow-hidden">
        
        {/* Background Design */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Gradient Shape at Bottom */}
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-rose-100 to-rose-200"
            style={{ clipPath: 'polygon(0 50%, 100% 38%, 100% 100%, 0 100%)' }}
          ></div>

          {/* Decorative Strips */}
          <div
            className="absolute right-0 w-60 h-9 bg-pink-100 transform -rotate-3"
            style={{ top: '250px' }}
          ></div>
          <div
            className="absolute left-0 w-50 h-9 bg-red-900 transform -rotate-6"
            style={{ top: '340px' }}
          ></div>
          <div
            className="absolute left-18 w-45 h-9 bg-red-800 transform -rotate-7 translate-y-2"
            style={{ top: '350px' }}
          ></div>
        </div>
        {/* END: Background Design */}

        {/* Main Content Area */}
        {/* Added 'relative' and 'z-10' so content sits ON TOP of the background */}
        <main className="flex-1 overflow-auto relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default WebLayout;