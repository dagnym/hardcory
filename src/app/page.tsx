"use client";

import LoginButton from "@/components/LoginButton";

import { useRouter } from "next/navigation";
import "@aws-amplify/ui-react/styles.css";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState();
  const user = session?.user;
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetch("/api/user-data");
      const userInfo = await userData.json();
      setUserId(userInfo.id);
    };
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, session]);

  const handleProfilePage = () => {
    router.push(`/user/${userId}/profile`);
  };
  // return (
  //   <Authenticator>
  //     {({ signOut, user }) => {

  return (
    <div className="relative h-screen p-10 pb-20">
      <div id="nav" className="flex justify-around pb-4">
        {status === "authenticated" && (
          <div className="flex space-x-4">
            <h2 className="text-xl self-center text-blue-400">
              Welcome, {user!.name}!
            </h2>
          </div>
        )}
        <div className="flex space-x-2">
          <button
            onClick={() => router.push("/characters")}
            className="border py-1 px-2 rounded-sm hover:bg-white hover:text-black"
          >
            Characters
          </button>
          <button
            onClick={() => router.push("/forum/main")}
            className="border py1 px-2 rounded-sm hover:bg-white hover:text-black"
          >
            Forum
          </button>
          <button
            onClick={() => router.push("/site-info/users")}
            className="border py1 px-2 rounded-sm hover:bg-white hover:text-black"
          >
            Site Users
          </button>
          {status === "authenticated" && (
            <button
              onClick={handleProfilePage}
              className="border py1 px-2 rounded-sm hover:bg-white hover:text-black"
            >
              My Profile
            </button>
          )}
          <LoginButton />
        </div>
      </div>
      <div className="w-full h-full border p-40 bg-ironforge bg-cover">
        {status === "authenticated" && (
          <div className="absolute right-80 bottom-20">
            <div className=" w-full h-full">gnomes are watching</div>
            <img src="/images/gnom.png" alt="" className="w-10 h-20" />
          </div>
        )}
      </div>
      {status === "loading" ? <div>Loading...</div> : null}
    </div>
  );
  //     }}
  //   </Authenticator>
  // );
}
