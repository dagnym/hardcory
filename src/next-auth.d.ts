import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      user_id?: number; // Add user_id to the session type
    };
  }

  interface User {
    user_id?: number; // Add user_id to the user type, if needed
  }
}
