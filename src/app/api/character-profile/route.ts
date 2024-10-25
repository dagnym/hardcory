import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.BLIZZARD_ACCESS_TOKEN;

  try {
    const response = await fetch(
      "https://us.api.blizzard.com/profile/wow/character/defias-pillager/berominhc?namespace=profile-classic1x-us&locale=en_US",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      console.error(`Failed to fetch response:`, response.statusText);
      return NextResponse.json({ data: null });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log("error retrieving character profile: ", err);
    return NextResponse.json({ message: "failure", error: err });
  }
}
