"use client";

import React from "react";
import ProfileCard from "../components/profile/profile-card";
import UnsavedChangesProfileProvider from "../context/unsaved-changes-profile";
import useSWR from "swr";
import { SWRKey } from "../components/session/session-swr-config";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/loading/loading-spinner";

const ProfilePage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const isLoadingSession = sessionStatus === "loading";
  const { data: profile, isLoading: isLoadingProfile } = useSWR({
    tags: ["profile", "user-profile-data"],
    url: `${process.env.NEXT_PUBLIC_USERS_BACKEND_URL}/v1/users/me`,
    method: "GET",
    accessToken: isLoadingSession
      ? "loading"
      : session?.user?.backend?.accessToken,
  } as SWRKey);

  if (isLoadingSession || isLoadingProfile) {
    return <LoadingSpinner variant="large" text="Loading profile..." />;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <UnsavedChangesProfileProvider>
      <div className="flex flex-1 items-center justify-center p-10">
        <ProfileCard className="" profile={profile} />
      </div>
    </UnsavedChangesProfileProvider>
  );
};

export default ProfilePage;
