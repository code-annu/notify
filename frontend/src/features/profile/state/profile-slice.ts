import { createSlice } from "@reduxjs/toolkit";
import type { NotifyError } from "../../../util/ErrorHandlerUtil";
import type { Profile } from "../data/types";
import { deleteProfile, getProfile, updateProfile } from "./profile-thunk";

export interface ProfileState {
  myProfile: {
    loading: boolean;
    error: NotifyError | null;
    data: Profile | null;
  };

  update: {
    loading: boolean;
    error: NotifyError | null;
    data: Profile | null;
  };

  delete: {
    loading: boolean;
    error: NotifyError | null;
  };
}

const initialState: ProfileState = {
  myProfile: {
    loading: false,
    error: null,
    data: null,
  },
  update: {
    loading: false,
    error: null,
    data: null,
  },
  delete: {
    loading: false,
    error: null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling getProfile thunk
    builder
      .addCase(getProfile.pending, (state) => {
        state.myProfile.loading = true;
        state.myProfile.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.myProfile.loading = false;
        state.myProfile.data = action.payload;
        state.myProfile.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.myProfile.loading = false;
        state.myProfile.error = action.payload || null;
      });

    // Handling updateProfile thunk
    builder
      .addCase(updateProfile.pending, (state) => {
        state.update.loading = true;
        state.update.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.data = action.payload;
        state.update.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload || null;
      });

    // Handling deleteProfile thunk
    builder
      .addCase(deleteProfile.pending, (state) => {
        state.delete.loading = true;
        state.delete.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.delete.loading = false;
        state.delete.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload || null;
      });
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
