import React from "react";
import type { Profile } from "../data/types";

interface ProfileViewCompProps {
  profile: Profile;
}

export const ProfileViewComp: React.FC<ProfileViewCompProps> = ({
  profile,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Profile Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">First Name</p>
          <p className="font-semibold text-gray-800">
            {profile.firstName || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Last Name</p>
          <p className="font-semibold text-gray-800">
            {profile.lastName || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
          <p className="font-semibold text-gray-800">{profile.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Company Name</p>
          <p className="font-semibold text-gray-800">
            {profile.companyName || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Member Since</p>
          <p className="font-semibold text-gray-800">
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          API Credentials
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Your API Key</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 block px-3 py-2 bg-white border border-gray-300 rounded font-mono text-sm text-gray-600 truncate">
              {profile.apiKey || "No API Key available"}
            </code>
            {profile.apiKey && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profile.apiKey!);
                  // Optional: add a tiny visual feedback here if desired
                }}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="Copy API Key"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Keep this key secret. Do not expose it in public repositories or
            client-side code.
          </p>
        </div>
      </div>
    </div>
  );
};
