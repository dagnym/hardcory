import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.BLIZZARD_ACCESS_TOKEN;
  // const characters = ["smallcrotch", "berominhc", "blembogue", "globsonhc"];
  const requestDomain =
    "https://us.api.blizzard.com/profile/wow/character/defias-pillager/smallcrotch/appearance?namespace=profile-classic1x-us&locale=en_US";
  try {
    const response = await fetch(requestDomain, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
