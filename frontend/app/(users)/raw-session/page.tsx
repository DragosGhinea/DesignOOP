"use client";

import { useSession } from "next-auth/react";
import React from "react";

const RawSession = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default RawSession;
