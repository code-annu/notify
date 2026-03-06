import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppByIdThunk } from "../state/app-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { AppChannelsTab } from "../../app_channel/components/AppChannelsTab";
import { AppUsersTab } from "../../app_users/pages/AppUsersTab";
import { AppSettingsTab } from "../components/AppSettingsTab";

enum TabType {
  CHANNELS = "CHANNELS",
  USERS = "USERS",
  SETTING = "SETTING",
}

export const AppDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedApp } = useAppSelector((state) => state.app);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CHANNELS);

  useEffect(() => {
    if (id) {
      dispatch(getAppByIdThunk(id));
    }
  }, [id, dispatch]);

  if (selectedApp.loading) return <CircularLoadingBar />;

  if (selectedApp.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p className="font-semibold">Failed to load application details</p>
          <p className="text-sm mt-1">
            {selectedApp.error.error?.message ||
              "An unexpected error occurred."}
          </p>
        </div>
      </div>
    );
  }

  if (!selectedApp.data) return <></>;

  const app = selectedApp.data;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* App Header Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{app.name}</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">ID: {app.id}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              app.active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {app.active ? "Active" : "Inactive"}
          </span>
        </div>
        <p className="text-gray-600 mt-4">
          {app.description || "No description provided."}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div className="border-b border-gray-200 px-6 flex gap-6">
          <button
            onClick={() => setActiveTab(TabType.CHANNELS)}
            className={`py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === TabType.CHANNELS
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Channels
          </button>
          <button
            onClick={() => setActiveTab(TabType.USERS)}
            className={`py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === TabType.USERS
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab(TabType.SETTING)}
            className={`py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === TabType.SETTING
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Setting
          </button>
        </div>

        <div className="p-6 h-full min-h-[400px]">
          {activeTab === TabType.CHANNELS && <AppChannelsTab appId={app.id} />}
          {activeTab === TabType.USERS && <AppUsersTab appId={app.id} />}
          {activeTab === TabType.SETTING && <AppSettingsTab />}
        </div>
      </div>
    </div>
  );
};
