import { navItems } from "@/constants/nav";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex flex-col flex-1">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = currentPath === href;

        return (
          <Link
            key={label}
            to={href}
            className={`flex flex-col items-center py-4 px-6 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-rose-50 text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon className="size-5 mb-1" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;