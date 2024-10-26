// components/ForumMainPage.js
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ForumMainPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Adjust as needed
  const posts = []; // Fetch your posts here

  const handleCreatePost = () => {
    // Handle post creation logic here
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 px-96">
      <header className="flex justify-between items-center mb-4">
        <button
          className="bg-orange-600 bg-opacity-60 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        {/* {session && (
          <span className="text-2xl font-semibold ">{session.user.name}</span>
        )} */}
        <button
          className="bg-blue-500 bg-opacity-70 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setModalOpen(true)}
        >
          Create Post
        </button>
      </header>

      <main className="space-y-4 text-black">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">User</th>
              <th className="border border-gray-300 p-2">Post Title</th>
              <th className="border border-gray-300 p-2">Replies</th>
              <th className="border border-gray-300 p-2">Last Response</th>
            </tr>
          </thead>
          <tbody className="text-white bg-gray-600 bg-opacity-40">
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
                  <tr key={post.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{post.user}</td>
                    <td className="border border-gray-300 p-2">{post.title}</td>
                    <td className="border border-gray-300 p-2">
                      {post.replies}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {post.lastResponse}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </main>

      <footer className="mt-4">{/* Add pagination controls here */}</footer>

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
