import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { username, imageUrl, userId } = await req.json();
    console.log("user in edit: ", userId);
    await db
      .update(users)
      .set({ username, profilepicture: imageUrl })
      .where(eq(users.battlenet_id, userId));
    return NextResponse.json({ data: "successfully edited user" });
  } catch (err) {
    console.log("error in edit user api: ", err);
    return NextResponse.json({ data: err });
  }
}
