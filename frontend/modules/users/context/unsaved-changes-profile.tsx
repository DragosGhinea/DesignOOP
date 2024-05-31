"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import React, { createContext, useState, ReactNode } from "react";
import useFetchWithAuthorization from "../hooks/use-fetch-with-authorization";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { SWRKey } from "../components/session/session-swr-config";

export interface ProfileChanges {
  username?: string;
  avatarUrl?: string;
}

export interface UnsavedChangesProfileContextType {
  changes?: ProfileChanges;
  setChanges: React.Dispatch<React.SetStateAction<ProfileChanges>>;
}

export const UnsavedChangesProfileContext = createContext<
  UnsavedChangesProfileContextType | undefined
>(undefined);

interface UnsavedChangesProfileProviderProps {
  children: ReactNode;
}

const UnsavedChangesProfileProvider = ({
  children,
}: UnsavedChangesProfileProviderProps) => {
  const { mutate } = useSWRConfig();
  const [changes, setChanges] = useState<ProfileChanges>({});
  const { fetcherWithAuthorization } = useFetchWithAuthorization();

  const handleSaveChanges = async () => {
    try {
      const res = await fetcherWithAuthorization(
        `${process.env.NEXT_PUBLIC_USERS_BACKEND_URL}/v1/users/me`,
        {
          method: "PATCH",
          body: JSON.stringify(changes),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        console.error(error);
        toast.error(
          `An error occurred while saving changes: ${error.message}`,
          {
            duration: 5000,
          }
        );
        return;
      }

      await mutate((key: SWRKey) => {
        if (!key) return false;

        if (typeof key === "object" && key.tags.includes("user-profile-data")) {
          return true;
        }

        return false;
      });
      setChanges({});
      toast.success("Changes saved successfully.", {
        duration: 5000,
      });
    } catch (e) {
      toast.error("An error occurred while sending request to save changes.", {
        duration: 5000,
      });
    }
  };

  return (
    <UnsavedChangesProfileContext.Provider
      value={{
        changes,
        setChanges,
      }}
    >
      {children}
      <div className="absolute bottom-5 flex w-full items-center justify-center">
        {Object.keys(changes).length !== 0 && (
          <Alert className="flex max-w-[80%] justify-between bg-black bg-opacity-[0.75] px-10 text-light-800">
            <div>
              <AlertTitle>Unsaved Changes</AlertTitle>
              <AlertDescription>
                You have unsaved changes. Do you want to save them?
              </AlertDescription>
            </div>
            <div className="flex gap-5">
              <Button variant="success" onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setChanges({})}>
                Discard Changes
              </Button>
            </div>
          </Alert>
        )}
      </div>
    </UnsavedChangesProfileContext.Provider>
  );
};

export default UnsavedChangesProfileProvider;
