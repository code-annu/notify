import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { TextInputField } from "../../../components/input/TextInputField";
import { createAppChannel, getAppChannels } from "../state/app-channel-thunk";
import { ChannelType } from "../data/types";

interface CreateChannelFormProps {
  appId: string;
  onClose: () => void;
}

export const CreateChannelForm: React.FC<CreateChannelFormProps> = ({
  appId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { create } = useAppSelector((state) => state.appChannel);

  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>(
    ChannelType.EMAIL,
  );

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    try {
      await dispatch(
        createAppChannel({
          appId,
          body: {
            channelName: channelName.trim(),
            channelType,
          },
        }),
      ).unwrap();

      // Reset form and close dialog
      setChannelName("");
      setChannelType(ChannelType.EMAIL);
      onClose();

      // Refresh channels list
      dispatch(getAppChannels(appId));
    } catch (error) {
      console.error("Failed to create app channel:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Create New Channel
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Set up a new notification channel for this application.
        </p>

        <form onSubmit={handleCreateChannel} className="flex flex-col gap-5">
          <TextInputField
            label="Channel Name"
            placeholder="e.g., Marketing Emails, Urgent SMS..."
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            disabled={create.loading}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Channel Type
            </label>
            <div className="relative">
              <select
                value={channelType}
                onChange={(e) => setChannelType(e.target.value as ChannelType)}
                disabled={create.loading}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors text-gray-900 appearance-none disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <option value={ChannelType.EMAIL}>Email</option>
                <option value={ChannelType.SMS}>SMS</option>
                <option value={ChannelType.PUSH}>Push Notification</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {create.error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mt-1">
              {create.error.error?.message ||
                "An error occurred while creating the channel."}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
              disabled={create.loading}
            >
              Cancel
            </button>
            <PrimaryButton
              type="submit"
              isLoading={create.loading}
              disabled={!channelName.trim() || create.loading}
            >
              Create Channel
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
