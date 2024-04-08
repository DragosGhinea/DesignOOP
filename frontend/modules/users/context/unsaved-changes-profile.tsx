import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import React, { createContext, useState, ReactNode } from "react";

export interface ProfileChanges {
  username?: string;
  profileImgUrl?: string;
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
  const [changes, setChanges] = useState<ProfileChanges>({});

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
              <Button variant="success">Save Changes</Button>
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
