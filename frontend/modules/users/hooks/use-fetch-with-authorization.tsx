import { useContext } from "react";
import { FetchWithAuthorizationContext } from "../context/fetch-with-authorization";

const useFetchWithAuthorization = () => {
  const context = useContext(FetchWithAuthorizationContext);
  if (!context) {
    throw new Error(
      "useFetchWithAuthorization must be used within a FetchWithAuthorizationProvider"
    );
  }
  return context;
};

export default useFetchWithAuthorization;
