import React from "react";
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavButtonProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  to,
  icon: Icon,
  label,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200
        ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
};
