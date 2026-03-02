import React from "react";
import { Home, LayoutGrid, User, LogOut } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { NavButton } from "../button/NavButton";
import { DangerButton } from "../button/DangerButton";
import { AppRoutes } from "../../router/router";
import { useNavigate } from "react-router-dom";

export const SideNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here before navigating
    navigate(AppRoutes.LOGIN);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 shadow-sm z-50">
      {/* Top: AppIcon */}
      <div className="flex items-center mb-10 pl-2">
        <AppIcon />
        <span className="text-xl font-bold ml-3 text-gray-800 tracking-wide">
          Notify
        </span>
      </div>

      {/* Center: Navigation Items */}
      <nav className="flex-1 space-y-2">
        <NavButton to={AppRoutes.HOME} icon={Home} label="Home" />
        <NavButton to={AppRoutes.APPS} icon={LayoutGrid} label="Apps" />
        <NavButton to={AppRoutes.PROFILE} icon={User} label="Profile" />
      </nav>

      {/* Bottom: Logout */}
      <div className="pt-6 border-t border-gray-200 mt-auto">
        <DangerButton
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </DangerButton>
      </div>
    </aside>
  );
};
