import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppChannels } from "../state/app-channel-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import type { AppChannel } from "../data/types";
import { AppChannelCard } from "./AppChannelCard";
import { CreateChannelForm } from "./CreateChannelForm";

interface AppChannelsTabProps {
  appId: string;
}

export const AppChannelsTab: React.FC<AppChannelsTabProps> = ({ appId }) => {
  const dispatch = useAppDispatch();
  const { appChannels } = useAppSelector((state) => state.appChannel);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Fetch if data is empty OR if the loaded channels don't belong to this app
    if (!appChannels.data || appChannels.appId !== appId) {
      dispatch(getAppChannels(appId));
    }
  }, [appId, appChannels.data, appChannels.appId, dispatch]);

  if (appChannels.loading) return <CircularLoadingBar />;

  if (appChannels.error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p className="font-semibold">Failed to load channels</p>
        <p className="text-sm mt-1">
          {appChannels.error.error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => dispatch(getAppChannels(appId))}
          className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  const channels = appChannels.data?.appChannels || [];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Configured Channels
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage the communication channels for your application.
          </p>
        </div>
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
          Add Channel
        </PrimaryButton>
      </div>

      {channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <div className="bg-white p-3 rounded-full shadow-sm mb-4 border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" x2="16" y1="13" y2="13" />
              <line x1="8" x2="16" y1="17" y2="17" />
              <line x1="10" x2="10.01" y1="9" y2="9" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            No channels configured
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            You haven't added any notification channels to this application yet.
          </p>
          <PrimaryButton onClick={() => setShowCreateForm(true)}>
            Create Your First Channel
          </PrimaryButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((channel: AppChannel) => (
            <AppChannelCard key={channel.id} channel={channel} appId={appId} />
          ))}
        </div>
      )}

      {showCreateForm && (
        <CreateChannelForm
          appId={appId}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};
