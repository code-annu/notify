import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import type { AppCreateRequestBody, AppUpdateRequestBody } from "../data/types";
import {
  createAppThunk,
  updateAppThunk,
  deleteAppThunk,
} from "../state/app-thunk";
import { toast } from "react-toastify";
import { addApp, updateLocalApp, removeLocalApp } from "../state/app-slice";
import type { NotifyError } from "../../../util/ErrorHandlerUtil";

export default function useAppMutations() {
  const dispatch = useAppDispatch();
  const [creatingApp, setCreatingApp] = useState(false);
  const [createAppError, setCreateAppError] = useState<string | null>(null);

  const [updatingApp, setUpdatingApp] = useState(false);
  const [updateAppError, setUpdateAppError] = useState<string | null>(null);

  const [deletingApp, setDeletingApp] = useState(false);
  const [deleteAppError, setDeleteAppError] = useState<string | null>(null);

  const createApp = async (input: AppCreateRequestBody) => {
    let created: boolean;
    try {
      setCreatingApp(true);
      setCreateAppError(null);
      const app = await dispatch(createAppThunk(input)).unwrap();
      toast.success("App created successfully");
      dispatch(addApp(app));
      created = true;
    } catch (error) {
      const err = error as NotifyError;
      setCreateAppError(err.error?.message || "An error occurred");
      created = false;
    } finally {
      setCreatingApp(false);
    }
    return created;
  };

  const updateApp = async (id: string, input: AppUpdateRequestBody) => {
    let updated: boolean;
    try {
      setUpdatingApp(true);
      setUpdateAppError(null);
      const app = await dispatch(updateAppThunk({ id, data: input })).unwrap();
      toast.success("App updated successfully");
      dispatch(updateLocalApp(app));
      updated = true;
    } catch (error) {
      const err = error as NotifyError;
      setUpdateAppError(err.error?.message || "An error occurred");
      updated = false;
    } finally {
      setUpdatingApp(false);
    }
    return updated;
  };

  const deleteApp = async (id: string) => {
    let deleted: boolean;
    try {
      setDeletingApp(true);
      setDeleteAppError(null);
      await dispatch(deleteAppThunk(id)).unwrap();
      toast.success("App deleted successfully");
      dispatch(removeLocalApp(id));
      deleted = true;
    } catch (error) {
      const err = error as NotifyError;
      setDeleteAppError(err.error?.message || "An error occurred");
      deleted = false;
    } finally {
      setDeletingApp(false);
    }
    return deleted;
  };

  return {
    createApp,
    creatingApp,
    createAppError,
    updateApp,
    updatingApp,
    updateAppError,
    deleteApp,
    deletingApp,
    deleteAppError,
  };
}
