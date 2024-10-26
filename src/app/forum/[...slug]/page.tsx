"use client";

import { useParams } from "next/navigation";

const PostPage = () => {
  const params = useParams();
  const slug = params.slug;
  console.log("sluh:", slug);
  return <h2>{slug}</h2>;
};

export default PostPage;
