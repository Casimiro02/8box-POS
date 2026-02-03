import { Sidebar, SidebarContent } from "./ui/sidebar";
import Profile from "@/components/Profile";
import Navigation from "./Navigation";

const SidebarNav = () => {
  return (
    <Sidebar
      variant="floating"
      className="
        text-white
        border-none
        rounded-3xl
      "
    >
      <SidebarContent>
        <Profile />
        <Navigation />
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
