// components/ForumMainPage.js
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { createForumPost, getForumPosts } from "@/helpers/neon_api_calls";

const ForumMainPage = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name || "Guest");

  const userId = session?.user?.user_id;
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Adjust as needed
  const [posts, setPosts] = useState([]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pagesPerSet = 3; // Display 6 page numbers at a time
  const currentSet = Math.ceil(currentPage / pagesPerSet);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const existingPosts = await getForumPosts();
        setPosts(existingPosts);
      } catch (err) {
        console.log("error in getposts: ", err);
      }
    };
    getPosts();
  }, [posts.length]);
  const handleCreatePost = async () => {
    await createForumPost(title, content, userId);
    setPosts([]);
    // Handle post creation logic here
    setModalOpen(false);
  };

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousSet = () => {
    const newPage = Math.max(1, (currentSet - 1) * pagesPerSet);
    setCurrentPage(newPage);
  };
  const goToNextSet = () => {
    const newPage = Math.max(totalPages, currentSet * pagesPerSet + 1);
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4 px-96">
      <header className="flex justify-between items-center mb-4">
        <button
          className="bg-white bg-opacity-30 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        {/* {session && (
          <span className="text-2xl font-semibold ">{session.user.name}</span>
        )} */}
        <button
          className="bg-blue-900 bg-opacity-90 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setModalOpen(true)}
        >
          Create Post
        </button>
      </header>

      <main className="space-y-4 text-black">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-yellow-200">
              <th className="border border-gray-300 p-2">User</th>
              <th className="border border-gray-300 p-2">Post Title</th>
              <th className="border border-gray-300 p-2">Replies</th>
              <th className="border border-gray-300 p-2">Content</th>
            </tr>
          </thead>
          <tbody className="text-white bg-gray-600 bg-opacity-90">
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 p-2 text-center"
                >
                  No posts available
                </td>
              </tr>
            ) : (
              posts
                .slice(
                  (currentPage - 1) * postsPerPage,
                  currentPage * postsPerPage
                )
                .map((post) => (
                  <tr
                    key={post.postId}
                    className="hover:bg-red-500"
                    onClick={() => router.push(`/forum/posts/${post.postId}`)}
                  >
                    <td className="border border-gray-300 p-2">
                      {post.username}
                    </td>
                    <td className="border border-gray-300 p-2">{post.title}</td>
                    <td className="border border-gray-300 p-2">
                      {post.replies}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {post.content}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </main>

      <footer className="mt-4">
        <div className="p-4  grid place-items-center">
          <div className="flex items-center space-x-2 text-blue-800 text-lg">
            {/* Left button */}
            <button
              onClick={goToPreviousSet}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              &lt;
            </button>

            {/* Page numbers (6 visible at a time) */}
            {[...Array(3)].map((_, index) => {
              const pageNumber = (currentSet - 1) * pagesPerSet + index + 1;
              return (
                <button
                  onClick={() => goToPage(pageNumber)}
                  key={pageNumber}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                >
                  {pageNumber} {/* Replace with actual page numbers */}
                </button>
              );
            })}

            {/* Right button */}
            <button
              onClick={goToNextSet}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
                onClick={handleCreatePost}
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

export default ForumMainPage;
