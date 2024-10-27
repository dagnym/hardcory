import BattleNetProvider from "next-auth/providers/battlenet";
import { JWT } from "next-auth/jwt";
import { Account, Session } from "next-auth";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface CustomJWT extends JWT {
  accessToken?: string;
  userInfo?: {
    username: string;
    profilepicture: string;
    user_id: number;
  };
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    BattleNetProvider({
      clientId: process.env.NEXT_PUBLIC_BNET_CLIENT_ID as string,
      clientSecret: process.env.NEXT_BNET_CLIENT_SECRET as string,
      issuer: "https://us.battle.net/oauth",
      authorization:
        "https://oauth.battle.net/authorize?scope=openid%20wow.profile",

      token: "https://oauth.battle.net/token",
      // token: "https://oauth.battle.net/token",
    }),
    // ...add more providers here
  ],

  debug: true,
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: CustomJWT;
      account?: Account | null;
    }) {
      // When user signs in, add accessToken to the token object
      if (account) {
        token.accessToken = account.access_token;
        const accountId = account.providerAccountId;
        console.log("ACCOUNT LARGE: ", account);
        try {
          let existingUser = await db
            .select()
            .from(users)
            .where(eq(users.battlenet_id, accountId));
          if (existingUser.length === 0) {
            await db.insert(users).values({
              battlenet_id: accountId,
              username: "edit username/profile image in My Profile",
              profilepicture: "https://i.imgur.com/wdpuoLF.jpeg",
            });
            existingUser = await db
              .select()
              .from(users)
              .where(eq(users.battlenet_id, accountId));
          }
          token.userInfo = {
            username: existingUser[0]?.username || "",
            profilepicture: existingUser[0]?.profilepicture || "",
            user_id: existingUser[0]?.id || 0,
          };
        } catch (err) {
          console.log("error in jwt callback: ", err);
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }) {
      // Pass accessToken to the session object
      if (token.userInfo) {
        session.user = {
          ...session.user,
          name: token.userInfo.username,
          image: token.userInfo.profilepicture,
          user_id: token.userInfo.user_id,
        };
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
