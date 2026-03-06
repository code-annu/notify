import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppUserApi } from "../data/AppUserApi";
import {
  mapToNotifyError,
  type NotifyError,
} from "../../../util/ErrorHandlerUtil";
import type { AppUserList } from "../data/types";

export const getAppUsers = createAsyncThunk<
  AppUserList,
  string,
  { rejectValue: NotifyError }
>("appUsers/getAppUsers", async (appId, { rejectWithValue }) => {
  try {
    return await AppUserApi.getAppUsers(appId);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const deleteAppUser = createAsyncThunk<
  void,
  string,
  { rejectValue: NotifyError }
>("appUsers/deleteAppUser", async (appUserId, { rejectWithValue }) => {
  try {
    await AppUserApi.deleteUser(appUserId);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});
