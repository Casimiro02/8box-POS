import { Sidebar, SidebarContent } from "./ui/sidebar";
import Profile from "@/components/Profile";
import Navigation from "./Navigation";

const SidebarNav = () => {
  return (
    <Sidebar className="bg-[#0E4A64] text-white border-none">
      <SidebarContent>
        <Profile />
        <Navigation />
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
