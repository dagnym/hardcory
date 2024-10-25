import NextAuth from "next-auth";
import BattleNetProvider from "next-auth/providers/battlenet";
import { defineAuth, secret } from "@aws-amplify/backend";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    BattleNetProvider({
      clientId: process.env.NEXT_PUBLIC_BNET_CLIENT_ID as string,
      clientSecret: process.env.NEXT_BNET_CLIENT_SECRET as string,
      issuer: "https://us.battle.net/oauth",
    }),
    // ...add more providers here
  ],
  debug: true,
  callbacks: {
    async jwt({ token, account }: any) {
      // When user signs in, add accessToken to the token object
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Pass accessToken to the session object
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
