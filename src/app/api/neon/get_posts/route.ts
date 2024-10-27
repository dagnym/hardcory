import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { forum_posts, users, forum_replies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const posts = await db
      .select({
        postId: forum_posts.id,
        title: forum_posts.title,
        content: forum_posts.content,
        replies: sql<number>`COUNT(${forum_replies.id})`,
        created_at: forum_posts.created_at,
        userId: users.id,
        username: users.username,
        userProfilePicture: users.profilepicture,
      })
      .from(forum_posts)
      .innerJoin(users, eq(forum_posts.user_id, users.id))
      .leftJoin(forum_replies, eq(forum_posts.id, forum_replies.post_id))
      .groupBy(
        forum_posts.id,
        users.id,
        users.username,
        users.profilepicture,
        forum_posts.title,
        forum_posts.content,
        forum_posts.created_at
      );
    console.log("posts: ", posts);
    return NextResponse.json(posts);
  } catch (err) {
    console.log("error: ", err);
    return NextResponse.json([]);
  }
}
