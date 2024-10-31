"use client";

import { sendPrivateMessage } from "@/helpers/neon_api_calls";
import { useRef } from "react";

import { useSession } from "next-auth/react";

const MessageForm = (users) => {
  const { data: session } = useSession();
  console.log("users: ", users);
  const senderUserId = Number(session?.user?.user_id);
  const selectUserRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const sendMessageHandler = async () => {
    const selectedUserId = Number(selectUserRef?.current?.value);
    const subject = subjectRef?.current?.value || "";
    const message = messageRef?.current?.value || "";

    await sendPrivateMessage(selectedUserId, senderUserId, subject, message);
  };
  return (
    <form className="p-10 m-auto w-1/2 h-1/2 bg-black bg-opacity-20 border border-black rounded-sm grid grid-cols-2">
      <div className="space-x-2">
        <label htmlFor="users">select a user to send to</label>
        <select
          ref={selectUserRef}
          className="text-black p-1"
          name="users"
          id="users"
        >
          {users.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="subject">subject</label>
        <input ref={subjectRef} className="text-black p-1" type="text" />
        <label htmlFor="content">message</label>
        <textarea ref={messageRef} className="text-black p-1" rows={7} />
        <button
          type="button"
          onClick={() => sendMessageHandler()}
          className="self-end px-2 py-1 border hover:bg-black hover:text-white"
        >
          send
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
