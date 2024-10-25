import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const requestDomain = "https://us.api.blizzard.com/profile/user/wow";
  if (!session) {
    return NextResponse.json({ data: "no session" });
  }
  const userAccessToken = session.accessToken;
  console.log("user access token: ", userAccessToken);
  try {
    const response = await fetch(requestDomain, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    if (!response.ok) {
      console.error("bad response from user api", response.statusText);
      return NextResponse.json({ data: null });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ data: err });
  }
}
