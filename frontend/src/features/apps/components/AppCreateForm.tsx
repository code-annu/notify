import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { TextInputField } from "../../../components/input/TextInputField";
import { createApp, getMyApps } from "../state/app-thunk";

interface AppCreateFormProps {
  onClose: () => void;
}

export const AppCreateForm: React.FC<AppCreateFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { create } = useAppSelector((state) => state.app);

  const [newAppName, setNewAppName] = useState("");
  const [newAppDescription, setNewAppDescription] = useState("");

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim()) return;

    try {
      await dispatch(
        createApp({
          name: newAppName,
          description: newAppDescription,
        }),
      ).unwrap();

      // Reset form and close
      setNewAppName("");
      setNewAppDescription("");
      onClose();

      // Refresh apps list
      dispatch(getMyApps());
    } catch (error) {
      console.error("Failed to create app:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        Create New Application
      </h2>
      <form
        onSubmit={handleCreateApp}
        className="flex flex-col gap-4 max-w-2xl"
      >
        <TextInputField
          label="Application Name"
          placeholder="e.g., E-commerce Platform"
          value={newAppName}
          onChange={(e) => setNewAppName(e.target.value)}
          required
          disabled={create.loading}
        />
        <TextInputField
          label="Description (Optional)"
          placeholder="Briefly describe what this app is for..."
          value={newAppDescription}
          onChange={(e) => setNewAppDescription(e.target.value)}
          disabled={create.loading}
        />

        {create.error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
            {create.error.error?.message ||
              "An error occurred while creating the app."}
          </div>
        )}

        <div className="flex gap-3 justify-end mt-2 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={create.loading}
          >
            Cancel
          </button>
          <PrimaryButton
            type="submit"
            isLoading={create.loading}
            disabled={!newAppName.trim() || create.loading}
          >
            Create Application
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
