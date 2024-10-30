"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const MessagePage = async () => {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);
  return <h2></h2>;
};

export default MessagePage;
