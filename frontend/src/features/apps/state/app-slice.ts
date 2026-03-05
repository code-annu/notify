import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NotifyError } from "../../../util/ErrorHandlerUtil";
import type { App, AppList } from "../data/types";
import { getAppByIdThunk, getMyAppsThunk } from "./app-thunk";

export interface AppState {
  myApps: {
    loading: boolean;
    data: AppList | null;
    error: NotifyError | null;
  };
  selectedApp: {
    loading: boolean;
    data: App | null;
    error: NotifyError | null;
  };
}

const initialState: AppState = {
  myApps: {
    loading: false,
    data: null,
    error: null,
  },
  selectedApp: {
    loading: false,
    data: null,
    error: null,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetMyApps: (state) => {
      state.myApps = {
        loading: false,
        data: null,
        error: null,
      };
    },
    addApp: (state, action: PayloadAction<App>) => {
      state.myApps.data?.apps.push(action.payload);
    },
    resetSelectedApp: (state) => {
      state.selectedApp = {
        loading: false,
        data: null,
        error: null,
      };
    },
    updateLocalApp: (state, action: PayloadAction<App>) => {
      const app = action.payload;
      if (state.myApps.data?.apps) {
        const index = state.myApps.data.apps.findIndex((a) => a.id === app.id);
        if (index !== -1) {
          state.myApps.data.apps[index] = app;
        }
      }
      if (state.selectedApp.data?.id === app.id) {
        state.selectedApp.data = app;
      }
    },
    removeLocalApp: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.myApps.data?.apps) {
        state.myApps.data.apps = state.myApps.data.apps.filter(
          (a) => a.id !== id,
        );
      }
      if (state.selectedApp.data?.id === id) {
        state.selectedApp.data = null;
      }
    },
  },
  extraReducers: (builder) => {
    // getMyApps
    builder
      .addCase(getMyAppsThunk.pending, (state) => {
        state.myApps.loading = true;
        state.myApps.error = null;
      })
      .addCase(getMyAppsThunk.fulfilled, (state, action) => {
        state.myApps.loading = false;
        state.myApps.data = action.payload;
        state.myApps.error = null;
      })
      .addCase(getMyAppsThunk.rejected, (state, action) => {
        state.myApps.loading = false;
        state.myApps.error = action.payload || null;
      });

    // getAppById
    builder
      .addCase(getAppByIdThunk.pending, (state) => {
        state.selectedApp.loading = true;
        state.selectedApp.error = null;
      })
      .addCase(getAppByIdThunk.fulfilled, (state, action) => {
        state.selectedApp.loading = false;
        state.selectedApp.data = action.payload;
        state.selectedApp.error = null;
      })
      .addCase(getAppByIdThunk.rejected, (state, action) => {
        state.selectedApp.loading = false;
        state.selectedApp.error = action.payload || null;
      });

    // createApp
  },
});

export const {
  resetMyApps,
  resetSelectedApp,
  addApp,
  updateLocalApp,
  removeLocalApp,
} = appSlice.actions;
export default appSlice.reducer;
