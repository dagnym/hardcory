"use client";

const UserList = ({ users }) => {
  console.log("users: ", users);
  return (
    <div className="grid grid-cols-4  mt-20">
      {users.map((user) => (
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
  );
};

export default UserList;
