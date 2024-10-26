export const createForumPost = async (
  title: string,
  content: string,
  user: string
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
    return posts;
  } catch (err) {
    console.log("error in api call: ", err);
    return err;
  }
};
