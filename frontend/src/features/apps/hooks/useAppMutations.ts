import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import type { AppCreateRequestBody } from "../data/types";
import { createAppThunk } from "../state/app-thunk";
import { toast } from "react-toastify";
import { addApp } from "../state/app-slice";
import type { NotifyError } from "../../../util/ErrorHandlerUtil";

export default function useAppMutations() {
  const dispatch = useAppDispatch();
  const [creatingApp, setCreatingApp] = useState(false);
  const [createAppError, setCreateAppError] = useState<string | null>(null);

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
      setCreateAppError(err.error.message);
      created = false;
    } finally {
      setCreatingApp(false);
    }
    return created;
  };

  return {
    createApp,
    creatingApp,
    createAppError,
  };
}
