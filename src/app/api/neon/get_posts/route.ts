import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { forum_posts } from "@/db/schema";

export async function GET() {
  try {
    const posts = await db.select().from(forum_posts);
    console.log("forum posts:", posts);
    return NextResponse.json(posts);
  } catch (err) {
    console.log("error: ", err);
    return NextResponse.json({ data: err });
  }
}
