import { createSlice } from "@reduxjs/toolkit";
import type { NotifyError } from "../../../util/ErrorHandlerUtil";
import type { AppUserList } from "../data/types";
import { getAppUsers } from "./app-users-thunk";

export interface AppUsersState {
  appUsers: {
    loading: boolean;
    error: NotifyError | null;
    data: AppUserList | null;
    appId: string | null;
  };
}

const initialState: AppUsersState = {
  appUsers: {
    loading: false,
    error: null,
    data: null,
    appId: null,
  },
};

const appUsersSlice = createSlice({
  name: "appUsers",
  initialState,
  reducers: {
    resetAppUsers: (state) => {
      state.appUsers = {
        loading: false,
        error: null,
        data: null,
        appId: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppUsers.pending, (state, action) => {
        state.appUsers.loading = true;
        state.appUsers.error = null;
        state.appUsers.appId = action.meta.arg;
      })
      .addCase(getAppUsers.fulfilled, (state, action) => {
        state.appUsers.loading = false;
        state.appUsers.data = action.payload;
        state.appUsers.error = null;
      })
      .addCase(getAppUsers.rejected, (state, action) => {
        state.appUsers.loading = false;
        state.appUsers.error = action.payload || null;
      });
  },
});

export const { resetAppUsers } = appUsersSlice.actions;
export default appUsersSlice.reducer;
