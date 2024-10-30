"use client";

import { useSession } from "next-auth/react";

import { useRef } from "react";

import { sendPrivateMessage } from "@/helpers/neon_api_calls";

// selectedUserId: number,
// senderUserId: number,
// subject: string,
// message: string

const ReplyForm = ({ senderId, senderName }) => {
  const textRef = useRef();
  const { data: session } = useSession();
  console.log("session: ", session);
  console.log("sender id: ", senderId);

  const handleSendMessage = async () => {
    const message = textRef.current.value;
    await sendPrivateMessage(senderId, session?.user?.user_id, "", message);
    console.log("message: ", message);
  };
  return (
    <form className="flex flex-col w-1/4 space-y-2">
      <h2 className="text-2xl border-t border-b mt-4">Message {senderName}</h2>

      <textarea
        className="text-black"
        ref={textRef}
        name="message"
        id="message"
      ></textarea>
      <button
        type="button"
        onClick={handleSendMessage}
        className="px-2 py-1 border rounded-sm mt-2"
      >
        send
      </button>
    </form>
  );
};

export default ReplyForm;
