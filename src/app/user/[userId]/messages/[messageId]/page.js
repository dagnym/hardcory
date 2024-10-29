import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUserMessages } from "@/helpers/neon_backend_calls";
const MessagePage = async () => {
  const session = await getServerSession(authOptions);

  const messages = await getUserMessages();
  console.log("messages: ", messages);
  console.log("session: ", session);
  return <h2></h2>;
};

export default MessagePage;
