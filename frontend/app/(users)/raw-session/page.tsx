"use client";

import LoadingSpinner from "@/components/loading/loading-spinner";
import { useSession } from "next-auth/react";
import React from "react";

const RawSession = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <LoadingSpinner variant="large" text="Loading session..." />;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default RawSession;
