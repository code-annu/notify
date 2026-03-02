import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileApi } from "../data/ProfileApi";
import {
  mapToNotifyError,
  type NotifyError,
} from "../../../util/error-handler-util";
import type { Profile, ProfileUpdateRequestBody } from "../data/types";

export const getProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: NotifyError }
>("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    return await ProfileApi.getProfile();
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const updateProfile = createAsyncThunk<
  Profile,
  ProfileUpdateRequestBody,
  { rejectValue: NotifyError }
>("profile/updateProfile", async (data, { rejectWithValue }) => {
  try {
    return await ProfileApi.updateProfile(data);
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});

export const deleteProfile = createAsyncThunk<
  void,
  void,
  { rejectValue: NotifyError }
>("profile/deleteProfile", async (_, { rejectWithValue }) => {
  try {
    await ProfileApi.deleteProfile();
  } catch (error) {
    return rejectWithValue(mapToNotifyError(error));
  }
});
