"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import UserList from "@/components/UserList";

const SiteUsersPage = async () => {
  const siteUsers = await db.select().from(users);

  return (
    <div className="w-full h-full p-20">
      <a href="/" className="border px-2 py-1 rounded-sm">
        Home
      </a>

      <UserList users={siteUsers} />
    </div>
  );
};

export default SiteUsersPage;
