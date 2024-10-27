"use client";

import { useState, useRef, useEffect } from "react";

import { createPostReply, getPostReplies } from "@/helpers/neon_api_calls";

import { useRouter } from "next/navigation";

interface Reply {
  replyId: number;
  replyContent: string;
  username: string;
  userProfilePicture: string;
}

interface PostInterface {
  post: {
    id: number;
    title: string | null;

    created_at: Date | null;
    content: string | null;
    replies: number | null;
    username: string | null;
    userProfilePicture: string | null;
  };
  user: { name: string; email: string; image: string; id: number };
  postReplies: Reply[];
}

const PostComponent = ({ post, user, postReplies }: PostInterface) => {
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  console.log("post: ", post);
  console.log("user in post component: ", user);
  const handleCreateReply = async () => {
    const reply = replyRef?.current?.value || "";
    await createPostReply(post.id, user, reply);
    console.log("reply : ", reply);
    setReplies([]);
  };
  useEffect(() => {
    const getReplies = async () => {
      try {
        const existingReplies = await getPostReplies(post.id, user);
        console.log("existing replies: ", existingReplies);
        setReplies(existingReplies);
        setModalOpen(false);
      } catch (err) {
        console.log("error in getposts: ", err);
      }
    };
    getReplies();
  }, [replies.length, post.id, user]);
  return (
    <div className="w-1/2 m-auto mt-10">
      <button
        className="border px-2 py-1 rounded-sm"
        onClick={() => router.push("/")}
      >
        home
      </button>
      <div className="w-full flex justify-end mt-10">
        <button
          onClick={() => setModalOpen(true)}
          className="px-2 py-1 bg-green-300 text-black"
        >
          Reply
        </button>
      </div>
      <div className="flex items-center">
        <div className="w-1/4 flex flex-col">
          <h2>{post.username}</h2>
          <img
            className="w-40 h-40"
            alt=""
            src={post.userProfilePicture || ""}
          />
        </div>
        <div className="bg-gray-700 w-full h-full border p-2">
          <h2 className="text-2xl border-b p-4">{post.title}</h2>
          <p className="p-4">{post.content}</p>
        </div>
      </div>
      <div className="p-4 w-full flex justify-center">
        {postReplies.length === 0 && <div>No replies yet...</div>}
      </div>
      {replies.length >= 1 && (
        <div className="grid gap-8 grid-rows-5 grid-cols-1">
          {replies.map((reply) => (
            <div key={reply.replyId} className="grid grid-cols-2 gap-4">
              <div className="border flex flex-col p-4">
                <p>{reply.replyContent}</p>
              </div>
              <div className="w-1/4">
                <h2>{reply.username}</h2>
                <img
                  src={reply.userProfilePicture}
                  className="w-40 h-20"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Make a reply</h2>

            <textarea
              ref={replyRef}
              placeholder="Type reply here lol"
              className="border w-full p-2 mb-4 rounded h-32"
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleCreateReply}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComponent;
