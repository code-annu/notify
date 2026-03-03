import React from "react";
import { useNavigate } from "react-router-dom";
import type { App } from "../data/types";

interface AppCompProps {
  app: App;
}

export const AppComp: React.FC<AppCompProps> = ({ app }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/apps/${app.id}`)}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4 h-full cursor-pointer hover:border-indigo-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className="text-xl font-semibold text-gray-900 line-clamp-1"
            title={app.name}
          >
            {app.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-mono">ID: {app.id}</p>
        </div>
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
            app.active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {app.active ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 min-h-15">
        {app.description || (
          <span className="italic text-gray-400">No description provided.</span>
        )}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1.5 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="font-medium text-gray-700">
            {app.owner.firstName} {app.owner.lastName || ""}
          </span>
        </div>
        <div>{new Date(app.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
};
