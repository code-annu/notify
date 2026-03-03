import { createSlice } from "@reduxjs/toolkit";
import type { NotifyError } from "../../../util/error-handler-util";
import type { App, AppList } from "../data/types";
import {
  createApp,
  deleteApp,
  getAppById,
  getMyApps,
  updateApp,
} from "./app-thunk";

export interface AppState {
  myApps: {
    loading: boolean;
    data: AppList | null;
    error: NotifyError | null;
  };
  create: {
    loading: boolean;
    data: App | null;
    error: NotifyError | null;
  };

  update: {
    loading: boolean;
    data: App | null;
    error: NotifyError | null;
  };

  delete: {
    loading: boolean;
    success: boolean;
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
  create: {
    loading: false,
    data: null,
    error: null,
  },
  update: {
    loading: false,
    data: null,
    error: null,
  },
  delete: {
    loading: false,
    success: false,
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
    resetCreate: (state) => {
      state.create = {
        loading: false,
        data: null,
        error: null,
      };
    },
    resetUpdate: (state) => {
      state.update = {
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
    resetSelectedApp: (state) => {
      state.selectedApp = {
        loading: false,
        data: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    // getMyApps
    builder
      .addCase(getMyApps.pending, (state) => {
        state.myApps.loading = true;
        state.myApps.error = null;
      })
      .addCase(getMyApps.fulfilled, (state, action) => {
        state.myApps.loading = false;
        state.myApps.data = action.payload;
        state.myApps.error = null;
      })
      .addCase(getMyApps.rejected, (state, action) => {
        state.myApps.loading = false;
        state.myApps.error = action.payload || null;
      });

    // getAppById
    builder
      .addCase(getAppById.pending, (state) => {
        state.selectedApp.loading = true;
        state.selectedApp.error = null;
      })
      .addCase(getAppById.fulfilled, (state, action) => {
        state.selectedApp.loading = false;
        state.selectedApp.data = action.payload;
        state.selectedApp.error = null;
      })
      .addCase(getAppById.rejected, (state, action) => {
        state.selectedApp.loading = false;
        state.selectedApp.error = action.payload || null;
      });

    // createApp
    builder
      .addCase(createApp.pending, (state) => {
        state.create.loading = true;
        state.create.error = null;
      })
      .addCase(createApp.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.data = action.payload;
        state.create.error = null;
      })
      .addCase(createApp.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload || null;
      });

    // updateApp
    builder
      .addCase(updateApp.pending, (state) => {
        state.update.loading = true;
        state.update.error = null;
      })
      .addCase(updateApp.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.data = action.payload;
        state.update.error = null;
      })
      .addCase(updateApp.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload || null;
      });

    // deleteApp
    builder
      .addCase(deleteApp.pending, (state) => {
        state.delete.loading = true;
        state.delete.error = null;
        state.delete.success = false;
      })
      .addCase(deleteApp.fulfilled, (state) => {
        state.delete.loading = false;
        state.delete.success = true;
        state.delete.error = null;
      })
      .addCase(deleteApp.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.success = false;
        state.delete.error = action.payload || null;
      });
  },
});

export const {
  resetMyApps,
  resetCreate,
  resetUpdate,
  resetDelete,
  resetSelectedApp,
} = appSlice.actions;
export default appSlice.reducer;
