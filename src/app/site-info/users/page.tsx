"use client";

import UserList from "@/components/UserList";
import { useEffect, useState } from "react";

const SiteUsersPage = () => {
  const [siteUsers, setSiteUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/neon/get_users");
      const data = await response.json();
      setSiteUsers(data.users);
    };
    getUsers();
  }, []);
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
