import { NextResponse } from "next/server";
import pg from "pg";
const { Pool } = pg;

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
  const accessToken = await getBlizzardAccessToken();
  console.log("character appearance access token: ", accessToken);
  if (!accessToken) {
    return NextResponse.json({ error: "failure" });
  }

  // const characters = ["smallcrotch", "berominhc", "blembogue", "globsonhc"];
  const requestDomain =
    "https://us.api.blizzard.com/profile/wow/character/defias-pillager/blembogue/appearance?namespace=profile-classic1x-us";
  try {
    const response = await fetch(requestDomain, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch response:`, response);
      return NextResponse.json({ data: null });
    }
    const data = await response.json();
    console.log("character appearnace data: ", data);
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
