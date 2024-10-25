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
  }, [status, session]);
  // return (
  //   <Authenticator>
  //     {({ signOut, user }) => {
  return (
    <div className="relative">
      <div className="flex justify-around pt-5">
        <LoginButton />
        <button
          onClick={() => router.push("/characters")}
          className="border py-1 px-2 rounded-sm hover:bg-white hover:text-black"
        >
          Characters
        </button>
      </div>
    </div>
  );
  //     }}
  //   </Authenticator>
  // );
}
