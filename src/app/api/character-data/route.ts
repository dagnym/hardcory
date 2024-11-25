// app/api/character/route.js

import { NextResponse } from "next/server";
import pg from "pg";
const { Pool } = pg;

import { Amplify } from "aws-amplify";

import config from "~/amplify_outputs.json";

Amplify.configure(config);

import { generateClient } from "aws-amplify/data";
import { type Schema } from "~/amplify/data/resource";

const client = generateClient<Schema>();

// Set up the connection pool for NeonDB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function getBlizzardAccessToken() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT blizzard_access_token FROM secrets LIMIT 1"
    );
    return res.rows[0]?.blizzard_access_token || null;
  } catch (error) {
    console.error("Error fetching token from database:", error);
    return null;
  } finally {
    client.release();
  }
}

export async function GET() {
  // const characters = [
  //   "lowiqvirgin",
  //   "hairplug",
  //   "howudoinmon",
  //   "itsbubby",
  //   "dayofdefeat",
  //   "doorknob",
  // ];

  const { data: characters } = await client.models.Character.list();
  const characterNames = characters.map((character) => character.name);
  console.log("character names: ", characterNames);
  console.log("characters: ", characters);
  let accessToken: string;
  try {
    accessToken = await getBlizzardAccessToken();
    // console.log("access token: ", accessToken);
    if (!accessToken) {
      return NextResponse.json({ error: "failed to retrieve" });
    }
  } catch (err) {
    console.log("neondb error: ", err);
    return NextResponse.json({ error: "failed to retrieve" });
  }
  const fetchCharacterEquipment = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/doomhowl/${character}/equipment?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      if (!response.ok) {
        console.error(
          `Failed to fetch equipment for ${character}:`,
          response.statusText
        );
        return { character, data: null };
      }
      const data = await response.json();
      // console.log("data: ", data);
      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCharacterStats = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/doomhowl/${character}/statistics?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      if (!response.ok) {
        console.error(
          `Failed to fetch equipment for ${character}:`,
          response.statusText
        );
        return { character, data: null };
      }
      const data = await response.json();

      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCharacterProfile = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/doomhowl/${character}?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      if (!response.ok) {
        console.error(
          `Failed to fetch equipment for ${character}:`,
          response.statusText
        );
        return { character, data: null };
      }
      const data = await response.json();

      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCharacterMedia = async (character: string) => {
    const requestDomain = `https://us.api.blizzard.com/profile/wow/character/doomhowl/${character}/character-media?namespace=profile-classic1x-us&locale=en_US`;

    try {
      const response = await fetch(requestDomain, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Authorization: `Bearer ${secret("BLIZZARD_ACCESS_TOKEN")}`,
        },
      });
      if (!response.ok) {
        console.error(
          `Failed to fetch equipment for ${character}:`,
          response.statusText
        );
        return { character, data: null };
      }
      const data = await response.json();
      return { character, data };
    } catch (err) {
      console.log(err);
    }
  };

  try {
    const characterEquipmentPromises = characterNames.map((character) =>
      fetchCharacterEquipment(character as string)
    );
    const characterEquipmentArray = (
      await Promise.all(characterEquipmentPromises)
    ).filter(Boolean);
    const characterStatPromises = characterNames.map((character) =>
      fetchCharacterStats(character as string)
    );
    const characterStatsArray = (
      await Promise.all(characterStatPromises)
    ).filter(Boolean);
    const characterProfilePromises = characterNames.map((character) =>
      fetchCharacterProfile(character as string)
    );
    const characterProfileArray = (
      await Promise.all(characterProfilePromises)
    ).filter(Boolean);
    const characterMediaPromises = characterNames.map((character) =>
      fetchCharacterMedia(character as string)
    );
    const characterMediaArray = (
      await Promise.all(characterMediaPromises)
    ).filter(Boolean);
    return NextResponse.json({
      characterEquipmentArray,
      characterStatsArray,
      characterProfileArray,
      characterMediaArray,
    });
  } catch (err) {
    console.log(err);
  }
}
