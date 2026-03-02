import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { deleteProfile, getProfile } from "../state/profile-thunk";
import { ProfileViewComp } from "../components/ProfileViewComp";
import { ProfileUpdateComp } from "../components/ProfileUpdateComp";
import { DangerButton } from "../../../components/button/DangerButton";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/router";

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { myProfile, delete: deleteState } = useAppSelector(
    (state) => state.profile,
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(myProfile);
    if (!myProfile.data) {
      dispatch(getProfile());
    }
  }, []);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action is irreversible.",
      )
    ) {
      const resultAction = await dispatch(deleteProfile());
      if (deleteProfile.fulfilled.match(resultAction)) {
        navigate(AppRoutes.LOGIN);
      }
    }
  };

  if (myProfile.loading && !myProfile.data) {
    return (
      <div className="flex items-center justify-center p-12 min-h-[50vh]">
        <svg
          className="animate-spin h-8 w-8 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (myProfile.error && !myProfile.data) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center justify-between shadow-sm">
        <span>
          {myProfile.error.error.message || "Failed to load profile."}
        </span>
        <button
          onClick={() => dispatch(getProfile())}
          className="font-semibold text-red-700 hover:underline cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!myProfile.data) {
    return null; // or empty state
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        {!isEditing && (
          <PrimaryButton onClick={() => setIsEditing(true)}>
            Edit Profile
          </PrimaryButton>
        )}
      </div>

      {isEditing ? (
        <ProfileUpdateComp
          profile={myProfile.data}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileViewComp profile={myProfile.data} />
      )}

      {!isEditing && (
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100 mt-8 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
            <p className="text-sm text-red-600/80 mt-1">
              Once you delete your profile, there is no going back. Please be
              certain.
            </p>
          </div>

          {deleteState.error && (
            <div className="p-3 bg-white text-red-600 border border-red-200 rounded text-sm">
              {deleteState.error.error.message}
            </div>
          )}

          <DangerButton isLoading={deleteState.loading} onClick={handleDelete}>
            Delete Profile
          </DangerButton>
        </div>
      )}
    </div>
  );
};
