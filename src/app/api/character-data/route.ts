// app/api/character/route.js

import { NextResponse } from "next/server";

export async function GET() {
  const characters = [
    "johnglobson",
    "blembogue",
    "hewmungis",
    "meatheals",
    "smallcrotch",
    "berominhc",
    "globsonhc",
    "joshchicken",
    "pohnjork",
  ];
  const accessToken = process.env.BLIZZARD_ACCESS_TOKEN;
  const fetchCharacterEquipment = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/defias-pillager/${character}/equipment?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      const data = await response.json();
      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCharacterStats = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/defias-pillager/${character}/statistics?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      const data = await response.json();

      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCharacterProfile = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/defias-pillager/${character}?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      const data = await response.json();

      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCharacterMedia = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/defias-pillager/${character}/character-media?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      const data = await response.json();
      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  try {
    const characterEquipmentPromises = characters.map((character) =>
      fetchCharacterEquipment(character)
    );
    const characterEquipmentArray = await Promise.all(
      characterEquipmentPromises
    );
    const characterStatPromises = characters.map((character) =>
      fetchCharacterStats(character)
    );
    const characterStatsArray = await Promise.all(characterStatPromises);
    const characterProfilePromises = characters.map((character) =>
      fetchCharacterProfile(character)
    );
    const characterProfileArray = await Promise.all(characterProfilePromises);
    const characterMediaPromises = characters.map((character) =>
      fetchCharacterMedia(character)
    );
    const characterMediaArray = await Promise.all(characterMediaPromises);
    return NextResponse.json({
      characterEquipmentArray,
      characterStatsArray,
      characterProfileArray,
      characterMediaArray,
    });
  } catch (err) {
    console.log(err);
  }

  // try {
  //   // console.log(character);
  //   const accessToken = process.env.BLIZZARD_ACCESS_TOKEN; // Use environment variable for access token

  //   for (let character in characters) {}

  //   const response = await fetch(requestDomain, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const data = await response.json();
  //   return NextResponse.json(data);
  // } catch (err) {
  //   console.log("error : ", err);
  //   return NextResponse.json("failure");
  // }
}
