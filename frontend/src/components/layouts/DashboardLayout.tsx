import React from "react";
import { Outlet } from "react-router-dom";
import { SideNavbar } from "../navbar/SideNavbar";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideNavbar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};
