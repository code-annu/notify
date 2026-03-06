import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppUsers } from "../state/app-users-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { AddAppUsersForm } from "../components/AddAppUsersForm";
import { AppUserComp } from "../components/AppUserComp";
import type { AppUser } from "../data/types";

interface AppUsersTabProps {
  appId: string;
}

export const AppUsersTab: React.FC<AppUsersTabProps> = ({ appId }) => {
  const dispatch = useAppDispatch();
  const { appUsers } = useAppSelector((state) => state.appUsers);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    if (appId) {
      dispatch(getAppUsers(appId));
    }
  }, [appId, dispatch]);

  if (appUsers.loading && !appUsers.data) {
    return (
      <div className="flex justify-center items-center py-12">
        <CircularLoadingBar />
      </div>
    );
  }

  if (appUsers.error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        <p className="font-semibold text-sm">Failed to load app users</p>
        <p className="text-sm mt-1">
          {appUsers.error.error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => dispatch(getAppUsers(appId))}
          className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  const usersList = appUsers.data?.users || [];

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">App Users</h2>
          <p className="text-sm text-gray-500">
            Manage users for this application.
          </p>
        </div>
        <PrimaryButton onClick={() => setIsAddFormOpen(true)}>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Users
          </div>
        </PrimaryButton>
      </div>

      <div className="flex-1">
        {usersList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 border border-gray-100 border-dashed rounded-xl">
            <div className="p-3 bg-white rounded-full shadow-sm mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              No users found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-sm">
              Get started by adding new users to this application.
            </p>
            <button
              onClick={() => setIsAddFormOpen(true)}
              className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Add New Users &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usersList.map((user: AppUser) => (
              <AppUserComp key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      {isAddFormOpen && (
        <AddAppUsersForm
          appId={appId}
          onClose={() => setIsAddFormOpen(false)}
        />
      )}
    </div>
  );
};
