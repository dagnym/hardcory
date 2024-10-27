import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { forum_posts } from "@/db/schema";

export async function POST(request: NextRequest) {
  // let data = null;
  const { title, content, user } = await request.json();
  console.log("user in create api: ", user);
  try {
    await db.insert(forum_posts).values({
      title: title,
      content: content,
      user_id: user,
      replies: 0,
      created_at: new Date(),
    });

    return NextResponse.json({ data: "success" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ data: err });
  }
}
