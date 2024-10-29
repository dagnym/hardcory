"use server";

import { getUserMessages } from "@/helpers/neon_backend_calls";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import MessageForm from "@/components/MessageForm";

const UserMessagesPage = async () => {
  const session = await getServerSession(authOptions);

  const sessionUserId = session.user.user_id;
  const messages = await getUserMessages(1);
  console.log("message1: ", messages[0]);

  // console.log("messages: ", messages);
  return (
    <div className="w-full h-screen bg-orange-800 p-20 flex flex-col">
      <div className="m-auto h-1/2 w-1/2 border p-6">
        <div className="w-full h-full border overflow-y-scroll">
          <ul className="">
            {messages.map((message) => (
              <div key={message.id} className="p-4 border flex space-x-10">
                <h1 className="text-2xl text-blue-500">
                  {message.userDetails.name}
                </h1>
                <h2>
                  {message.content.length > 10
                    ? `${message.content.slice(0, 10)}...`
                    : message.content}
                </h2>
                <h3 className="text-blue-300">
                  {sessionUserId === message.sender_id
                    ? `${message.created_at.toLocaleString()} (Delivered)`
                    : `${message.created_at.toLocaleString()} (Received)`}
                </h3>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <MessageForm />
    </div>
  );
};

export default UserMessagesPage;
