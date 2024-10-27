import { db } from "@/db/drizzle";
import { forum_posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import { getPostReplies } from "@/helpers/neon_api_calls";

import PostComponent from "@/components/server_components/PostComponent";

const PostPage = async ({ params }: any) => {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);
  console.log("params: ", await params);

  const { postId } = await params;
  const post = await db
    .select({
      id: forum_posts.id,
      title: forum_posts.title,
      content: forum_posts.content,
      replies: forum_posts.replies,
      created_at: forum_posts.created_at,
      user_id: users.id,
      username: users.username,
      userProfilePicture: users.profilepicture,
    })
    .from(forum_posts)
    .innerJoin(users, eq(forum_posts.user_id, users.id))
    .where(eq(forum_posts.id, postId));

  const postReplies = await getPostReplies(
    postId,
    session?.user as { name: string; email: string; image: string }
  );
  console.log("post replies: ", postReplies);
  console.log("post: ", post);
  return (
    <div>
      <PostComponent
        post={post[0]}
        user={session?.user}
        postReplies={postReplies}
      />
    </div>
  );
};

export default PostPage;
