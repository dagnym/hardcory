import { NextResponse, NextRequest } from "next/server";

import { db } from "@/db/drizzle";
import { private_messages } from "@/db/schema";

export async function POST(req: NextRequest) {
  const { selectedUserId, senderUserId, subject, message } = await req.json();
  const recipient_id = selectedUserId;
  const sender_id = senderUserId;
  const content = message;
  try {
    await db.insert(private_messages).values({
      recipient_id,
      sender_id,
      content,
      subject,
    });
    console.log("success in send pm");
    return NextResponse.json({ data: "success" });
  } catch (err) {
    console.log("error in send pm api: ", err);
    return NextResponse.json({ data: err });
  }
}
