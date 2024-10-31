import { db } from "@/db/drizzle";
import { private_messages, users } from "@/db/schema";
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
    .select({
      id: private_messages.id,
      sender_id: private_messages.sender_id,
      recipient_id: private_messages.recipient_id,
      subject: private_messages.subject,
      content: private_messages.content,
      created_at: private_messages.created_at,
      sender: {
        id: users.id,
        name: users.username,
        profilepicture: users.profilepicture,
      },
    })
    .from(private_messages)
    .innerJoin(users, eq(private_messages.sender_id, users.id))
    .where(eq(private_messages.id, messageId));
  console.log("message: ", message[0].sender);
  const senderProfilePicture = message[0].sender.profilepicture;
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

  const sortedConversation = conversation.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  console.log("conversatoin: ", conversation);
  return (
    <div className="p-20 space-y-4">
      <a href="../messages">back</a>
      <h2 className="border-b p-2">conversation</h2>
      {sortedConversation.map((message) => (
        <div className="p-2 border w-1/2 flex" key={message.id}>
          <div className="flex items-center space-x-2">
            <img
              className="h-14 w-14"
              src={
                message.sender_id === sessionUserId
                  ? `${session.user.image}`
                  : `${senderProfilePicture}`
              }
              alt="profilepic"
            />
            <h2 className="text-xl text-green-400">
              {message.sender_id === sessionUserId
                ? `You (${session?.user.name}): `
                : `${senderName}: `}
            </h2>
            <h2 className="pl-10 text-lg">
              {message.sender_id === sessionUserId
                ? `"${message.content}"`
                : `"${message.content}"`}
            </h2>
          </div>
        </div>
      ))}
      <ReplyForm senderId={message[0].sender_id} senderName={senderName} />
    </div>
  );
};

export default MessagePage;
