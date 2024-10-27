import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { forum_replies } from "@/db/schema";

export async function POST(req: NextRequest) {
  const { postId, user, reply } = await req.json();
  console.log("accessible valurd: ", postId, user, reply);
  try {
    await db
      .insert(forum_replies)
      .values({ post_id: postId, user_id: user.user_id, reply_content: reply });
    return NextResponse.json({ data: "" });
  } catch (err) {
    console.log("error in create post api: ", err);
    return NextResponse.json({ data: err });
  }
}
