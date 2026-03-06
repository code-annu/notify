import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import { deleteAppUser, getAppUsers } from "../state/app-users-thunk";
import { AppUserApi } from "../data/AppUserApi";
import type { AppUserAddRequest } from "../data/types";
import {
  mapToNotifyError,
  type NotifyError,
} from "../../../util/ErrorHandlerUtil";

export function useAppUsersMutations() {
  const dispatch = useAppDispatch();
  const [isDeletingUserId, setIsDeletingUserId] = useState<string | null>(null);
  const [addingUsers, setAddingUsers] = useState(false);
  const [addError, setAddError] = useState<NotifyError | null>(null);

  const deleteUser = async (
    appId: string,
    appUserId: string,
  ): Promise<boolean> => {
    try {
      setIsDeletingUserId(appUserId);
      await dispatch(deleteAppUser(appUserId)).unwrap();
      // Refresh the list after successful deletion
      dispatch(getAppUsers(appId));
      return true;
    } catch (error) {
      console.error("Failed to delete user:", error);
      return false;
    } finally {
      setIsDeletingUserId(null);
    }
  };

  const addUsers = async (
    appId: string,
    input: AppUserAddRequest,
  ): Promise<boolean> => {
    try {
      setAddingUsers(true);
      setAddError(null);
      await AppUserApi.addAppUsers(appId, input);
      dispatch(getAppUsers(appId));
      return true;
    } catch (error) {
      setAddError(mapToNotifyError(error));
      return false;
    } finally {
      setAddingUsers(false);
    }
  };

  return {
    deleteUser,
    isDeletingUserId,
    addUsers,
    addingUsers,
    addError,
  };
}
