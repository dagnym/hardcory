"use client";

import { use } from "react";

interface PostPageProps {
  params: Promise<{ slug: string | string[] }>;
}

const PostPage = ({ params }: PostPageProps) => {
  const resolvedParams = use(params);
  const slug = Array.isArray(resolvedParams.slug);
  return <h2>{slug}</h2>;
};

export default PostPage;
