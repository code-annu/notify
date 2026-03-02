import type React from "react";
import { useAppDispatch, useAppSelector } from "../app/app-hook";
import { useEffect } from "react";
import { getProfile } from "../features/profile/state/profile-thunk";
import { Outlet, useNavigate } from "react-router-dom";
import { AppRoutes } from "./router";
import { CircularLoadingBar } from "../components/progress/CircularLoadingBar";
import { StorageUtil } from "../util/StorageUtil";

export const ProtectedRoute: React.FC = () => {
  const { myProfile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!StorageUtil.getRefreshToken()) {
      navigate(AppRoutes.LOGIN);
      return;
    }

    if (!myProfile.data && !myProfile.loading) {
      dispatch(getProfile());
    }

    if (myProfile.error) {
      navigate(AppRoutes.LOGIN);
    }
  }, [myProfile]);

  if (myProfile.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularLoadingBar />
      </div>
    );
  }

  if (myProfile.data) {
    return <Outlet />;
  }

  return <></>;
};
