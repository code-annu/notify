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
    </div>
  );
};
