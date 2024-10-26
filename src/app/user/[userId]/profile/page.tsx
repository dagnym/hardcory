"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const userId = params.userId;
  console.log("session: ", session);
  const user = session?.user;
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetch("/api/user-data");
      const userInfo = await userData.json();
      const userId = userInfo.id.toString();

      if (!userId || !userId?.includes(userId)) {
        router.push("/");
      }
    };
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, userId, router]);

  const userNameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    if (userNameRef.current && imageRef.current) {
      console.log(
        "username and image: ",
        userNameRef.current.value,
        imageRef.current.value
      );
      const username = userNameRef.current.value;
      const imageUrl = imageRef.current.value;
      await fetch("/api/neon/edit_user", {
        method: "POST",
        body: JSON.stringify({ username, imageUrl, userId }),
      });
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
      <form className="flex flex-col w-1/4 p-4 bg-gray-600 border rounded-sm border-blue-900 bg-opacity-30 m-auto mt-20 space-y-2">
        <div className="flex flex-col self-center">
          <h2 className="mb-4">Account: {user?.name}</h2>
          <Image
            alt=""
            src={
              user?.image ||
              "https://static.wikia.nocookie.net/caseoh/images/2/22/Pork.png/revision/latest?cb=20240608224623"
            }
            height={300}
            width={200}
          />
        </div>
        <label htmlFor="username">Username</label>
        <input
          ref={userNameRef}
          type="text"
          className="border text-black p-1"
          defaultValue={user?.name || ""}
        />
        <label htmlFor="image">Profile Picture link</label>
        <input
          ref={imageRef}
          className="text-black p-1"
          name="image"
          defaultValue={user?.image || ""}
        ></input>
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
