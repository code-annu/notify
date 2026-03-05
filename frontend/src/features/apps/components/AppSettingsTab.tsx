import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/app-hook";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { DangerButton } from "../../../components/button/DangerButton";
import { TextInputField } from "../../../components/input/TextInputField";
import useAppMutations from "../hooks/useAppMutations";
import { useNavigate } from "react-router-dom";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";

export const AppSettingsTab: React.FC = () => {
  const navigate = useNavigate();
  const { selectedApp } = useAppSelector((state) => state.app);
  const {
    updateApp,
    updatingApp,
    updateAppError,
    deleteApp,
    deletingApp,
    deleteAppError,
  } = useAppMutations();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (selectedApp.loading) return <CircularLoadingBar />;

  if (!selectedApp.data) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p className="font-semibold">App Details not found</p>
      </div>
    );
  }

  useEffect(() => {
    if (selectedApp.data) {
      setName(selectedApp.data.name);
      setDescription(selectedApp.data.description || "");
    }
  }, [selectedApp.data]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await updateApp(selectedApp.data!.id, {
      name: name.trim(),
      description: description.trim(),
    });
  };

  const handleDeleteApp = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this app? This action cannot be undone.",
      )
    ) {
      const success = await deleteApp(selectedApp.data!.id);
      if (success) {
        navigate("/apps");
      }
    }
  };

  return (
    <div className="flex flex-col h-full gap-8 max-w-2xl">
      <div className="flex flex-col gap-4">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">App Settings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your application details or delete it permanently.
          </p>
        </div>

        <form
          onSubmit={handleSaveChanges}
          className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-2"
        >
          <TextInputField
            label="Application Name"
            placeholder="e.g., E-commerce Platform"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={updatingApp}
          />
          <TextInputField
            label="Description"
            placeholder="Briefly describe what this app is for..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={updatingApp}
          />

          {updateAppError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mt-1">
              {updateAppError}
            </div>
          )}

          <div className="flex justify-start mt-2 border-t border-gray-50 pt-4">
            <PrimaryButton
              type="submit"
              isLoading={updatingApp}
              disabled={
                !name.trim() ||
                updatingApp ||
                (name.trim() === selectedApp.data.name &&
                  description.trim() === (selectedApp.data.description || ""))
              }
            >
              Save Changes
            </PrimaryButton>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-500 mt-1">
            Once you delete an application, there is no going back. Please be
            certain.
          </p>
        </div>

        <div className="bg-red-50/50 p-5 rounded-xl border border-red-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2">
          <div>
            <h3 className="text-sm font-semibold text-red-800">
              Delete Application
            </h3>
            <p className="text-xs text-red-600/80 mt-1 max-w-sm">
              This will permanently delete the{" "}
              <strong>{selectedApp.data.name}</strong> app and all its channels.
            </p>
          </div>

          <DangerButton
            type="button"
            onClick={handleDeleteApp}
            isLoading={deletingApp}
            disabled={deletingApp}
          >
            Delete App
          </DangerButton>
        </div>

        {deleteAppError && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mt-1">
            {deleteAppError}
          </div>
        )}
      </div>
    </div>
  );
};
