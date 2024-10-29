import { db } from "@/db/drizzle";
import { eq, or, and } from "drizzle-orm";
import { users, private_messages } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";

export const getMessageWithDetails = async (messageId: number) => {
  const messageWithDetails = await db
    .select({
      id: private_messages.id,
      subject: private_messages.subject,
      content: private_messages.content,
      createdAt: private_messages.created_at,
      openedAt: private_messages.opened_at,
      sender: {
        id: users.id,
        name: users.username,
      },
      recipient: {
        id: users.id,
        name: users.username,
      },
    })
    .from(private_messages)
    .innerJoin(users, eq(private_messages.sender_id, users.id))
    .innerJoin(users, eq(private_messages.recipient_id, users.id))
    .where(eq(private_messages.id, messageId));

  return messageWithDetails[0];
};

// export const getMessageHistory = async (userId1: number, userId2: number) => {
//   const messageHistory = await db
//     .select()
//     .from(private_messages)
//     .where(
//       or(
//         and(
//           eq(private_messages.recipient_id, 2),
//           eq(private_messages.sender_id, 1)
//         ),
//         and(
//           eq(private_messages.sender_id, 2),
//           eq(private_messages.recipient_id, 1)
//         )
//       )
//     )

//     .orderBy(private_messages.created_at);

//   return messageHistory;
// };

export const getUserMessages = async (userId: number) => {
  try {
    const otherUser = alias(users, "otherUser");

    const messages = await db
      .select({
        id: private_messages.id,
        subject: private_messages.subject,
        content: private_messages.content,
        created_at: private_messages.created_at,
        opened_at: private_messages.opened_at,
        sender_id: private_messages.sender_id, // Include sender_id
        recipient_id: private_messages.recipient_id, // Include recipient_id
        userDetails: {
          id: otherUser.id,
          name: otherUser.username,
          profilePicture: otherUser.profilepicture,
        },
      })
      .from(private_messages)
      .innerJoin(
        otherUser,
        or(
          eq(private_messages.sender_id, otherUser.id),
          eq(private_messages.recipient_id, otherUser.id)
        )
      )
      .where(
        or(
          and(
            eq(private_messages.sender_id, userId),
            eq(private_messages.recipient_id, otherUser.id)
          ),
          and(
            eq(private_messages.recipient_id, userId),
            eq(private_messages.sender_id, otherUser.id)
          )
        )
      );

    console.log("messages: ", messages);
    return messages;
  } catch (err) {
    console.log("error grabbing user messages: ", err);
    return [];
  }
};
