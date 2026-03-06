import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/state/profile-slice";
import appReducer from "../features/apps/state/app-slice";
import appChannelReducer from "../features/app_channel/state/app-channel-slice";
import appUsersReducer from "../features/app_users/state/app-users-slice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    app: appReducer,
    appChannel: appChannelReducer,
    appUsers: appUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
