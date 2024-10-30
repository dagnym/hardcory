import { db } from "@/db/drizzle";
import { private_messages } from "@/db/schema";
import { eq, or, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
// import { getUserMessages } from "@/helpers/neon_backend_calls";
import { authOptions } from "@/lib/authOptions";
import ReplyForm from "@/components/ReplyForm";

const MessagePage = async ({ params, searchParams }) => {
  const session = await getServerSession(authOptions);
  const { messageId } = await params;
  const { username } = await searchParams;

  const senderName = typeof username === "string" ? username : "Unknown";

  const sessionUserId = session?.user.user_id;

  const message = await db
    .select()
    .from(private_messages)
    .where(eq(private_messages.id, messageId));
  console.log("message: ", message[0]);
  const conversation = await db
    .select()
    .from(private_messages)
    .where(
      or(
        and(
          eq(private_messages.sender_id, Number(sessionUserId)),
          eq(private_messages.recipient_id, Number(message[0].sender_id))
        ),
        and(
          eq(private_messages.recipient_id, Number(sessionUserId)),
          eq(private_messages.sender_id, Number(message[0].sender_id))
        )
      )
    );

  console.log("conversatoin: ", conversation);
  return (
    <div className="p-20 space-y-4">
      <a href="../messages">back</a>
      <h2 className="border-b p-2">conversation</h2>
      {conversation.map((message) => (
        <div className="p-2 border w-1/2" key={message.id}>
          <h2>
            {message.sender_id === sessionUserId
              ? `You (${session?.user.name}) said: "${message.content}"`
              : `${senderName} said: "${message.content}"`}
          </h2>
        </div>
      ))}
      <ReplyForm senderId={message[0].sender_id} senderName={senderName} />
    </div>
  );
};

export default MessagePage;
