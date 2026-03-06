import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/app-hook";
import { AppRoutes } from "../../router/router";
import { NavLink } from "react-router-dom";
import { getMyAppsThunk } from "../apps/state/app-thunk";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { myProfile } = useAppSelector((state) => state.profile);
  const { myApps } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!myApps.data && !myApps.loading) {
      dispatch(getMyAppsThunk());
    }
  }, [dispatch, myApps.data, myApps.loading]);

  const appCount = myApps.data?.apps.length || 0;

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 to-violet-700 rounded-3xl p-10 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

        <div className="space-y-5 relative z-10 w-full max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Notify Service Active
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Welcome back, {myProfile.data?.firstName || "Developer"}! 👋
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl leading-relaxed opacity-95">
            Notify is your robust notification service platform. Manage your
            registered applications, configure API keys, and seamlessly send
            push notifications to your users.
          </p>
        </div>

        <div className="hidden md:flex shrink-0 relative z-10">
          <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg
              className="w-20 h-20 text-indigo-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all duration-200">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5v14"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Apps</p>
            {myApps.loading ? (
              <div className="w-12 h-6 bg-gray-100 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold text-gray-900">{appCount}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all duration-200">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              System Status
            </p>
            <p className="text-2xl font-bold text-gray-900">Operational</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all duration-200">
          <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">API Status</p>
            <p className="text-2xl font-bold text-gray-900">Active</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold text-gray-900 pt-4 px-1">
        Developer Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NavLink
          to={AppRoutes.APPS}
          className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              Manage Applications
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Register new apps, configure your push notification settings, and
              retrieve your integration API keys.
            </p>
            <div className="text-indigo-600 font-semibold flex items-center gap-2">
              View Applications
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </NavLink>

        <NavLink
          to={AppRoutes.PROFILE}
          className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
              Developer Settings
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Access your personal developer credentials, update your account
              information, and view security settings.
            </p>
            <div className="text-emerald-600 font-semibold flex items-center gap-2">
              Go to Profile
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
