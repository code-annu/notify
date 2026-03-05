import React, { useState } from "react";
import type { AppChannel } from "../data/types";
import { ChannelType } from "../data/types";
import { useAppDispatch } from "../../../app/app-hook";
import { deleteAppChannel, getAppChannels } from "../state/app-channel-thunk";
import { DangerButton } from "../../../components/button/DangerButton";
import { toast } from "react-toastify";

interface AppChannelCardProps {
  channel: AppChannel;
  appId: string;
}

export const AppChannelCard: React.FC<AppChannelCardProps> = ({
  channel,
  appId,
}) => {
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteAppChannel(channel.id)).unwrap();
      // Refetch channels to update the list after deletion
      dispatch(getAppChannels(appId));
      toast.success("Channel deleted successfully");
    } catch (error) {
      console.error("Failed to delete channel", error);
      toast.error("Failed to delete channel");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const getChannelIcon = (type: ChannelType) => {
    switch (type) {
      case ChannelType.EMAIL:
        return (
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
            className="text-blue-500"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      case ChannelType.SMS:
        return (
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
            className="text-green-500"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case ChannelType.PUSH:
        return (
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
            className="text-purple-500"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
      default:
        return (
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
            className="text-gray-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white border text-left flex justify-between border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all relative">
      <div className="flex gap-4 items-start w-full">
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 mt-1">
          {getChannelIcon(channel.channelType)}
        </div>
        <div className="flex flex-col flex-1 min-w-0 py-1">
          <h4 className="font-semibold text-gray-900 truncate">
            {channel.channelName}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
              {channel.channelType.toLowerCase()}
            </span>
            <span className="text-xs text-gray-400 truncate">
              ID: {channel.id.substring(0, 8)}...
            </span>
          </div>
          <span className="text-xs text-gray-400 mt-2">
            Created {new Date(channel.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Delete Icon Button */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2 self-start"
          aria-label="Delete channel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Confirmation Dialog Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center text-center z-10 border border-red-100">
          <p className="font-medium text-gray-900 mb-1">Delete Channel?</p>
          <p className="text-xs text-gray-500 mb-3 px-2">
            This action cannot be undone. Notifications through this channel
            will fail.
          </p>
          <div className="flex gap-2 w-full px-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <DangerButton
              onClick={handleDelete}
              isLoading={isDeleting}
              className="flex-1 py-1.5 text-sm"
            >
              Delete
            </DangerButton>
          </div>
        </div>
      )}
    </div>
  );
};
