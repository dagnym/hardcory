"use client";

import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_BNET_CLIENT_ID;
    const redirectUri = "http://localhost:3000/"; // Change to your app's URL
    const scope = "openid wow.profile";

    // Construct the Blizzard authorization URL
    const authorizationUrl = `https://oauth.battle.net/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(scope)}&state=''`;

    // Redirect user to Blizzard's authorization page
    router.push(authorizationUrl);
  };

  return (
    <button
      className="border py-1 px-2 rounded-sm hover:bg-blue-500 hover:border-blue-300 hover:text-black"
      onClick={handleLogin}
    >
      Login with Battle.net
    </button>
  );
};

export default LoginButton;
