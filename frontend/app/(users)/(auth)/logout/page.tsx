"use client";

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  useEffect(() => {
    signOut({ callbackUrl });
  }, [callbackUrl]);

  return "Logging out...";
};

export default Logout;
