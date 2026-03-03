import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { AppComp } from "../components/AppComp";
import { AppCreateForm } from "../components/AppCreateForm";
import { getMyApps } from "../state/app-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";

export const AppsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { myApps } = useAppSelector((state) => state.app);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (myApps.data) return;
    dispatch(getMyApps());
  }, []);

  if (myApps.loading) return <CircularLoadingBar />;

  if (!myApps.data) return <></>;

  console.log(myApps.data);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your registered applications for notifications.
          </p>
        </div>
        {!showCreateForm && (
          <PrimaryButton onClick={() => setShowCreateForm(true)}>
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
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create App
          </PrimaryButton>
        )}
      </div>

      {showCreateForm && (
        <AppCreateForm onClose={() => setShowCreateForm(false)} />
      )}

      {myApps.loading && !myApps.data ? (
        <CircularLoadingBar />
      ) : myApps.error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p className="font-semibold">Failed to load applications</p>
          <p className="text-sm mt-1">
            {myApps.error.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => dispatch(getMyApps())}
            className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      ) : myApps.data.apps.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center flex flex-col items-center">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="15" y1="12" y2="12" />
              <line x1="12" x2="12" y1="9" y2="15" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No applications found
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first application to start sending
            notifications.
          </p>
          <PrimaryButton onClick={() => setShowCreateForm(true)}>
            Create Your First App
          </PrimaryButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {myApps.data.apps.map((app) => (
            <AppComp key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};
