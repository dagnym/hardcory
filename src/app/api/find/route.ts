// app/api/find-defias/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.BLIZZARD_ACCESS_TOKEN;

  const response = await fetch(
    "https://us.api.blizzard.com/data/wow/connected-realm/index?namespace=dynamic-classic1x-us&locale=en_US",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
