"use client";

import { useSession, signOut, signIn } from "next-auth/react";

const LoginButton = () => {
  const { status } = useSession();

  const handleLogin = async () => {
    try {
      await signIn("battlenet");
    } catch (err) {
      console.log("error on login: ", err);
    }
  };
  // const handleLogin = () => {
  //   const clientId = process.env.NEXT_PUBLIC_BNET_CLIENT_ID;
  //   const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI; // Change to your app's URL
  //   const scope = "openid wow.profile";

  //   // Construct the Blizzard authorization URL
  //   const authorizationUrl = `https://oauth.battle.net/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //     redirectUri as string
  //   )}&response_type=code&scope=${encodeURIComponent(scope)}&state=test`;

  //   // Redirect user to Blizzard's authorization page
  //   router.push(authorizationUrl);
  // };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      className="border py-1 px-2 rounded-sm hover:bg-blue-500 hover:border-blue-300 hover:text-black"
      onClick={status !== "authenticated" ? handleLogin : handleLogout}
    >
      {status !== "authenticated" ? "Login with Battle.net" : "Log out"}
    </button>
  );
};

export default LoginButton;
