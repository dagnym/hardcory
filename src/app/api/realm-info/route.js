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
  // console.log("access token: ", accessToken);
  if (!accessToken) {
    return NextResponse.json({ error: "failed to retrieve" });
  }

  // Example URL from the href you mentioned
  const realmUrl =
    "https://us.api.blizzard.com/data/wow/connected-realm/5820?namespace=dynamic-classic1x-us";

  // Fetch detailed realm data
  const response = await fetch(realmUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return new Response("Error fetching realm data", { status: 500 });
  }

  const realmData = await response.json();

  // Log the realm data to the console
  console.log("Realm data:", realmData);

  // Return the data as a response (or handle it however you want)
  return new Response(JSON.stringify(realmData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
