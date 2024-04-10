"use client";

import React from "react";
import ProfileCard from "../components/profile/profile-card";
import UnsavedChangesProfileProvider from "../context/unsaved-changes-profile";
import useSWR from "swr";
import { SWRKey } from "../components/session/session-swr-config";

const ProfilePage = () => {
  const { data: profile, isLoading: isLoadingProfile } = useSWR({
    tags: ["profile", "user-profile-data"],
    url: "/v1/users/me",
    method: "GET",
  } as SWRKey);

  if (isLoadingProfile) {
    return <div>Loading...</div>;
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
