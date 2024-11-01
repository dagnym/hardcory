import { NextResponse } from "next/server";

import { users } from "@/db/schema";
import { db } from "@/db/drizzle";

export async function GET() {
  try {
    const existingUsers = await db.select().from(users);
    return NextResponse.json({ users: existingUsers });
  } catch (err) {
    console.log("error in get users api: ", err);
    return NextResponse.json({ data: "failed" });
  }
}
