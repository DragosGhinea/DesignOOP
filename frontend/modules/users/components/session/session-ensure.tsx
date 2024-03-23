"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

const SessionEnsure = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      return;
    }

    if ("error" in session) {
      signOut({ redirect: false }).then((data) => {
        router.push(data.url);
        toast.warning("Your session ended. You will need to login again.", {
          duration: 5000,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return children;
};

export default SessionEnsure;
