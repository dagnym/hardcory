import BattleNetProvider from "next-auth/providers/battlenet";
import { JWT } from "next-auth/jwt";
import { Account, Session } from "next-auth";

interface CustomJWT extends JWT {
  accessToken?: string;
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
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }) {
      // Pass accessToken to the session object
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
