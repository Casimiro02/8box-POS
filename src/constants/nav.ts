import { FaHouseChimney } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import type { IconType } from "react-icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: FaHouseChimney,
  },
  {
    label: "Orders",
    href: "/order",
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
    icon: FaHistory,
  },
  {
    label: "Report",
    href: "/report",
    icon: FaChartPie,
  },
  {
    label: "Settings",
    href: "/setting",
    icon: IoMdSettings,
  },
];
