import { createSlice } from "@reduxjs/toolkit";
import type { NotifyError } from "../../../util/ErrorHandlerUtil";
import type { AppChannel, AppChannelList } from "../data/types";

import {
  getAppChannels,
  createAppChannel,
  deleteAppChannel,
} from "./app-channel-thunk";

export interface AppChannelState {
  appChannels: {
    loading: boolean;
    data: AppChannelList | null;
    error: NotifyError | null;
    appId: string | null;
  };
  create: {
    loading: boolean;
    data: AppChannel | null;
    error: NotifyError | null;
  };
  delete: {
    loading: boolean;
    success: boolean;
    error: NotifyError | null;
  };
}

const initialState: AppChannelState = {
  appChannels: {
    loading: false,
    data: null,
    error: null,
    appId: null,
  },
  create: {
    loading: false,
    data: null,
    error: null,
  },
  delete: {
    loading: false,
    success: false,
    error: null,
  },
};

const appChannelSlice = createSlice({
  name: "appChannel",
  initialState,
  reducers: {
    resetAppChannels: (state) => {
      state.appChannels = {
        loading: false,
        data: null,
        error: null,
        appId: null,
      };
    },
    resetCreate: (state) => {
      state.create = {
        loading: false,
        data: null,
        error: null,
      };
    },
    resetDelete: (state) => {
      state.delete = {
        loading: false,
        success: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    // getAppChannels
    builder
      .addCase(getAppChannels.pending, (state, action) => {
        state.appChannels.loading = true;
        state.appChannels.error = null;
        state.appChannels.appId = action.meta.arg; // Keep track of which app's channels are loaded
      })
      .addCase(getAppChannels.fulfilled, (state, action) => {
        state.appChannels.loading = false;
        state.appChannels.data = action.payload;
        state.appChannels.error = null;
      })
      .addCase(getAppChannels.rejected, (state, action) => {
        state.appChannels.loading = false;
        state.appChannels.error = action.payload || null;
      });

    // createAppChannel
    builder
      .addCase(createAppChannel.pending, (state) => {
        state.create.loading = true;
        state.create.error = null;
      })
      .addCase(createAppChannel.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.data = action.payload;
        state.create.error = null;
      })
      .addCase(createAppChannel.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload || null;
      });

    // deleteAppChannel
    builder
      .addCase(deleteAppChannel.pending, (state) => {
        state.delete.loading = true;
        state.delete.error = null;
        state.delete.success = false;
      })
      .addCase(deleteAppChannel.fulfilled, (state) => {
        state.delete.loading = false;
        state.delete.success = true;
        state.delete.error = null;
      })
      .addCase(deleteAppChannel.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.success = false;
        state.delete.error = action.payload || null;
      });
  },
});

export const { resetAppChannels, resetCreate, resetDelete } =
  appChannelSlice.actions;
export default appChannelSlice.reducer;
