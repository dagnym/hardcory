import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { users, forum_replies } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { postId } = await req.json();

  try {
    const replies = await db
      .select({
        replyId: forum_replies.id,
        postId: forum_replies.post_id,
        replyContent: forum_replies.reply_content,
        created_at: forum_replies.created_at,
        updated_at: forum_replies.updated_at,
        userId: users.id,
        username: users.username,
        userProfilePicture: users.profilepicture,
      })
      .from(forum_replies)
      .innerJoin(users, eq(forum_replies.user_id, users.id))
      .where(eq(forum_replies.post_id, postId));
    console.log("replies: ", replies);
    return NextResponse.json(replies);
  } catch (err) {
    console.log("error in get post info api: ", err);
    return NextResponse.json({ data: "failure" });
  }
}
