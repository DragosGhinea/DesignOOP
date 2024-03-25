"use client";

import { useSession } from "next-auth/react";
import React from "react";
import ProfileCard from "../components/profile/profile-card";
import LinkedProviders from "../components/profile/linked-providers";
import Activity from "../components/profile/activity";

const ProfilePage = () => {
  // const { data: session, status } = useSession();

  // if (status === "loading") return <div>Loading...</div>;

  // return <div>{JSON.stringify(session)}</div>;
  return (
    // trebuie inlocuit cu grid
    <div className="flex flex-1 items-center p-10">
      <div className="flex flex-1 items-center justify-center gap-7">
        <ProfileCard
          className=""
          profile={{
            username: "John Doe",
            email: "dragos.dev12@gmail.com",
            avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
            id: "1",
            roles: ["MEMBER"],
          }}
        />
        <div className="flex flex-1 flex-col gap-7 self-stretch grid-area-[ceva]">
          <LinkedProviders
            linkedProviders={[
              {
                provider: "discord",
                linkedAtDateInSeconds: 1632086400,
                providerUserId: "123456789",
                userId: "1",
              },
              {
                provider: "github",
                linkedAtDateInSeconds: 1632086400,
                providerUserId: "123456789",
                userId: "1",
              },
            ]}
          />
          <Activity />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
