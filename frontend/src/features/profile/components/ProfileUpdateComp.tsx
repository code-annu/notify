import React, { useState } from "react";
import type { Profile } from "../data/types";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { updateProfile, getProfile } from "../state/profile-thunk";
import { PrimaryButton } from "../../../components/button/PrimaryButton";

interface ProfileUpdateCompProps {
  profile: Profile;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProfileUpdateComp: React.FC<ProfileUpdateCompProps> = ({
  profile,
  onSuccess,
  onCancel,
}) => {
  const dispatch = useAppDispatch();
  const { update } = useAppSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    companyName: profile.companyName || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(resultAction)) {
      // Re-fetch profile to ensure state in view is synced properly
      // though slice could also update `myProfile.data` manually if handled. Let's fetch anyway.
      await dispatch(getProfile());
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Update Profile
      </h2>
      {update.error && (
        <div className="p-3 bg-red-50 text-red-600 rounded drop-shadow-sm text-sm">
          {update.error.error.message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 block">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            required
            disabled={update.loading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 block">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            disabled={update.loading}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-600 block">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            disabled={update.loading}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          disabled={update.loading}
        >
          Cancel
        </button>
        <PrimaryButton type="submit" isLoading={update.loading}>
          Save Changes
        </PrimaryButton>
      </div>
    </form>
  );
};
