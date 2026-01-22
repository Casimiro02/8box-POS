import { navItems } from "@/constants/nav";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div>
      <nav>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = currentPath === href;
          return (
            <Link
              key={label}
              to={href}
              className={`transition-colors text-nowrap ${isActive ? "text-primary bg-black font-bold hover:underline" : "text-black"}`}
            >
              <div className="flex flex-col items-center p-3">
                <Icon className="inline mr-2" />
                <span>{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
