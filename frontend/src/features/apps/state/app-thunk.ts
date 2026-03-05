import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppsApi } from "../data/AppsApi";
import {
  mapToNotifyError,
  type NotifyError,
} from "../../../util/ErrorHandlerUtil";
import type {
  App,
  AppCreateRequestBody,
  AppList,
  AppUpdateRequestBody,
} from "../data/types";

export const getMyAppsThunk = createAsyncThunk<
  AppList,
  void,
  { rejectValue: NotifyError }
>("app/getMyApps", async (_, { rejectWithValue }) => {
  try {
    return await AppsApi.getMyApps();
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const getAppByIdThunk = createAsyncThunk<
  App,
  string,
  { rejectValue: NotifyError }
>("app/getAppById", async (id, { rejectWithValue }) => {
  try {
    return await AppsApi.getAppById(id);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const createAppThunk = createAsyncThunk<
  App,
  AppCreateRequestBody,
  { rejectValue: NotifyError }
>("app/createApp", async (data, { rejectWithValue }) => {
  try {
    return await AppsApi.createApp(data);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const updateAppThunk = createAsyncThunk<
  App,
  { id: string; data: AppUpdateRequestBody },
  { rejectValue: NotifyError }
>("app/updateApp", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await AppsApi.updateApp(id, data);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const deleteAppThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: NotifyError }
>("app/deleteApp", async (id, { rejectWithValue }) => {
  try {
    await AppsApi.deleteApp(id);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});
