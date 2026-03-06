import React, { useState } from "react";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { OutlinedButton } from "../../../components/button/OutlinedButton";
import { TextInputField } from "../../../components/input/TextInputField";
import { useAppUsersMutations } from "../hooks/useAppUsersMutations";

interface AddAppUsersFormProps {
  appId: string;
  onClose: () => void;
}

interface TemporaryUser {
  externalId: string;
  fullname: string;
  email: string;
  phone: string;
}

export const AddAppUsersForm: React.FC<AddAppUsersFormProps> = ({
  appId,
  onClose,
}) => {
  const { addUsers, addingUsers, addError } = useAppUsersMutations();

  const [externalId, setExternalId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [usersToAdd, setUsersToAdd] = useState<TemporaryUser[]>([]);

  const handleAddUserToList = () => {
    if (
      !externalId.trim() &&
      !email.trim() &&
      !phone.trim() &&
      !fullname.trim()
    )
      return;

    setUsersToAdd((prev) => [
      ...prev,
      {
        externalId: externalId.trim(),
        fullname: fullname.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
    ]);

    // Reset current inputs
    setExternalId("");
    setFullname("");
    setEmail("");
    setPhone("");
  };

  const handleRemoveUserFromList = (index: number) => {
    setUsersToAdd((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveUsers = async () => {
    if (usersToAdd.length === 0) return;

    const success = await addUsers(appId, { appUsers: usersToAdd });
    if (success) {
      setUsersToAdd([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Add New Users
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Add users to this application. You can queue multiple users before
          saving.
        </p>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <TextInputField
                label="Full Name"
                placeholder="e.g., John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={addingUsers}
              />
            </div>
            <div className="flex-1">
              <TextInputField
                label="External ID"
                placeholder="e.g., usr_123"
                value={externalId}
                onChange={(e) => setExternalId(e.target.value)}
                disabled={addingUsers}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <TextInputField
                label="Email"
                placeholder="e.g., user@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={addingUsers}
              />
            </div>
            <div className="flex-1">
              <TextInputField
                label="Phone"
                placeholder="e.g., +1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={addingUsers}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <OutlinedButton
            onClick={handleAddUserToList}
            disabled={
              addingUsers ||
              (!externalId.trim() &&
                !email.trim() &&
                !phone.trim() &&
                !fullname.trim())
            }
          >
            Add to List
          </OutlinedButton>
        </div>

        {/* Queued Users List */}
        {usersToAdd.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">
              Users to Add ({usersToAdd.length})
            </h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {usersToAdd.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:gap-4 text-sm">
                    {user.fullname && (
                      <span className="font-semibold text-gray-900">
                        {user.fullname}
                      </span>
                    )}
                    {user.externalId && (
                      <span className="font-medium text-gray-700">
                        ID: {user.externalId}
                      </span>
                    )}
                    {user.email && (
                      <span className="text-gray-600">{user.email}</span>
                    )}
                    {user.phone && (
                      <span className="text-gray-600">{user.phone}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveUserFromList(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                    disabled={addingUsers}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {addError && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mb-4">
            {addError.error?.message || "An error occurred while adding users."}
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            disabled={addingUsers}
          >
            Cancel
          </button>
          <PrimaryButton
            onClick={handleSaveUsers}
            isLoading={addingUsers}
            disabled={usersToAdd.length === 0 || addingUsers}
          >
            Save Users
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
