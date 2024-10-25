export async function GET() {
  const accessToken = process.env.BLIZZARD_ACCESS_TOKEN;

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
