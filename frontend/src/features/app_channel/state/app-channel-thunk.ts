import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppChannelApi } from "../data/AppChannelApi";
import {
  mapToNotifyError,
  type NotifyError,
} from "../../../util/error-handler-util";
import type {
  AppChannel,
  AppChannelCreateRequestBody,
  AppChannelList,
} from "../data/types";

export const getAppChannels = createAsyncThunk<
  AppChannelList,
  string,
  { rejectValue: NotifyError }
>("appChannel/getAppChannels", async (appId, { rejectWithValue }) => {
  try {
    return await AppChannelApi.getAppChannels(appId);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const createAppChannel = createAsyncThunk<
  AppChannel,
  { appId: string; body: AppChannelCreateRequestBody },
  { rejectValue: NotifyError }
>(
  "appChannel/createAppChannel",
  async ({ appId, body }, { rejectWithValue }) => {
    try {
      return await AppChannelApi.createAppChannel(appId, body);
    } catch (error) {
      return rejectWithValue(mapToNotifyError(error));
    }
  },
);

export const getChannelById = createAsyncThunk<
  AppChannel,
  string,
  { rejectValue: NotifyError }
>("appChannel/getChannelById", async (channelId, { rejectWithValue }) => {
  try {
    return await AppChannelApi.getChannelById(channelId);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const deleteAppChannel = createAsyncThunk<
  void,
  string,
  { rejectValue: NotifyError }
>("appChannel/deleteAppChannel", async (channelId, { rejectWithValue }) => {
  try {
    await AppChannelApi.deleteAppChannel(channelId);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});
