"use client";

import LoginButton from "@/components/LoginButton";

import { useRouter } from "next/navigation";
import "@aws-amplify/ui-react/styles.css";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    console.log("status: ", status);
    console.log("session data: ", session);

    const fetchUserData = async () => {
      const userData = await fetch("/api/user-data");
      const userInfo = await userData.json();
      console.log("user data: ", userInfo);
    };
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, session]);
  // return (
  //   <Authenticator>
  //     {({ signOut, user }) => {

  return (
    <div className="relative h-screen p-20">
      <div id="nav" className="flex justify-around pb-4">
        {status === "authenticated" && (
          <h2 className="text-xl self-center text-blue-400">
            Welcome, {session.user!.name}!
          </h2>
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
          <LoginButton />
        </div>
      </div>
      <div className="w-full h-full border p-40 bg-gnome">
        {status === "authenticated" && (
          <div className=" w-full h-full">we r watching u</div>
        )}
      </div>
      {status === "loading" ? <div>Loading...</div> : null}
    </div>
  );
  //     }}
  //   </Authenticator>
  // );
}
