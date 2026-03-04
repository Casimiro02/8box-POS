import { FaHouseChimney } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import type { IconType } from "react-icons";


interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: FaHouseChimney,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: FaShoppingCart,
  },
  {
    label: "History",
    href: "/history",
    icon: FaHistory,
  },
  {
    label: "Clock-in",
    href: "/clock-in",
    icon: FaClock,
  },
  {
    label: "Report",
    href: "/report",
    icon: FaChartPie,
  },
  {
    label: "End of Day",
    href: "/end-of-day",
    icon: FaClipboardList,
  },
  {
    label: "Settings",
    href: "/setting",
    icon: IoMdSettings,
  },
];
