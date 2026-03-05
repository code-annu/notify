import React, { useState } from "react";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { TextInputField } from "../../../components/input/TextInputField";
import useAppMutations from "../hooks/useAppMutations";

interface AppCreateFormProps {
  onClose: () => void;
}

export const AppCreateForm: React.FC<AppCreateFormProps> = ({ onClose }) => {
  const [newAppName, setNewAppName] = useState("");
  const [newAppDescription, setNewAppDescription] = useState("");
  const { createApp, creatingApp, createAppError } = useAppMutations();

  const handleCreateApp = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newAppName.trim()) return;
    const created = await createApp({
      name: newAppName,
      description: newAppDescription,
    });

    if (created) {
      setNewAppName("");
      setNewAppDescription("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Create New Application
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Set up a new application to start sending notifications.
        </p>

        <form onSubmit={handleCreateApp} className="flex flex-col gap-5">
          <TextInputField
            label="Application Name"
            placeholder="e.g., E-commerce Platform"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            required
            disabled={creatingApp}
          />
          <TextInputField
            label="Description (Optional)"
            placeholder="Briefly describe what this app is for..."
            value={newAppDescription}
            onChange={(e) => setNewAppDescription(e.target.value)}
            disabled={creatingApp}
          />

          {createAppError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mt-1">
              {createAppError}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
              disabled={creatingApp}
            >
              Cancel
            </button>
            <PrimaryButton
              type="submit"
              isLoading={creatingApp}
              disabled={!newAppName.trim() || creatingApp}
            >
              Create Application
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
