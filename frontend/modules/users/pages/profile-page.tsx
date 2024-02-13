"use client";

import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return <div>{JSON.stringify(session)}</div>;
};

export default ProfilePage;
