import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const SiteUsersPage = async () => {
  const siteUsers = await db.select().from(users);

  return (
    <div className="w-full h-full p-20">
      <a href="/" className="border px-2 py-1 rounded-sm">
        Home
      </a>
      <div className="grid grid-cols-4  mt-20">
        {siteUsers.map((user) => (
          <form
            key={user.id}
            className="flex flex-col p-4 bg-gray-600 border rounded-sm border-blue-900 bg-opacity-30 m-auto mt-20 space-y-2"
          >
            <div className="flex flex-col self-center">
              <h2 className="mb-4">{user?.username}</h2>
              <img
                alt=""
                src={user?.profilepicture || ""}
                className="w-60 h-60"
              />
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default SiteUsersPage;
