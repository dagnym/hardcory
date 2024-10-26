"use client";
import ForumMainPage from "@components/ForumMainPage";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ForumFrontPage = () => {
  const router = useRouter();
  const { status } = useSession();
  if (status === "loading") {
    return <div>loading</div>;
  }
  if (status === "unauthenticated") {
    router.push("/");
  }
  return (
    <div className="w-screen h-screen p-20 bg-tavern bg-cover">
      <ForumMainPage />
    </div>
  );
};

export default ForumFrontPage;
