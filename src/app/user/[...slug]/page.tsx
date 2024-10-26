"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetch("/api/user-data");
      const userInfo = await userData.json();
      const userId = userInfo.id.toString();

      if (!slug || !slug?.includes(userId)) {
        router.push("/");
      }
    };
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, slug, router]);

  const userNameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = async () => {
    if (userNameRef.current && bioRef.current) {
      console.log(
        "username and bio: ",
        userNameRef.current.value,
        bioRef.current.value
      );
    }
  };
  return (
    <div className="w-full h-full p-10">
      <button
        onClick={() => router.push("/")}
        className="border py-1 px-2 rounded-sm hover:bg-blue-900"
      >
        Home
      </button>
      <form className="flex flex-col w-1/4 p-10 bg-gray-600 border rounded-sm border-blue-900 bg-opacity-30 m-auto mt-20 space-y-2">
        <h2 className="mb-4">Account: {session?.user?.name}</h2>
        <label htmlFor="username">Username</label>
        <input
          ref={userNameRef}
          type="text"
          className="border text-black p-1"
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          ref={bioRef}
          className="text-black p-1"
          name="bio"
          id="bio"
        ></textarea>
        <button
          type="button"
          onClick={handleSubmit}
          className="py-1 px-2 border hover:bg-green-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
