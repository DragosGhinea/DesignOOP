import { useContext } from "react";
import { UnsavedChangesProfileContext } from "../context/unsaved-changes-profile";

const useUnsavedChangesProfile = () => {
  const context = useContext(UnsavedChangesProfileContext);
  if (!context) {
    throw new Error(
      "useUnsavedChangesProfile must be used within a UnsavedChangesProfileProvider"
    );
  }
  return context;
};

export default useUnsavedChangesProfile;
