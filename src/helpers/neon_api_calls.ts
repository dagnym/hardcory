export const createForumPost = async (
  title: string,
  content: string,
  user: number
) => {
  try {
    const response = await fetch("/api/neon/create_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, user }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getForumPosts = async () => {
  try {
    const response = await fetch("/api/neon/get_posts");
    const posts = await response.json();
    console.log("posts in getforumpotst:", posts);
    return posts;
  } catch (err) {
    console.log("error in api call: ", err);
    return err;
  }
};

export const getPostReplies = async (
  postId: number,
  user: { name: string; email: string; image: string }
) => {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXTAUTH_URL;
    const response = await fetch(`${baseUrl}/api/neon/get_post_replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, user }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPostReply = async (
  postId: number,
  user: {
    name: string;
    email?: string | undefined;
    image: string;
    id: number;
  },
  reply: string
) => {
  try {
    const response = await fetch("/api/neon/create_post_reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, user, reply }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
