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
  const accessToken = getBlizzardAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "failure" });
  }
  try {
    const response = await fetch(
      "https://us.api.blizzard.com/data/wow/connected-realm/5126/auctions/2?namespace=dynamic-classic1x-us&locale=en_US",
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
    console.log("error with auctions: ", err);
    return NextResponse.json({ data: err });
  }
}
