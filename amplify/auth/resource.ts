import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: "BattleNet",
          clientId: secret("BATTLENET_CLIENT_ID"),
          clientSecret: secret("BATTLENET_CLIENT_SECRET"),
          issuerUrl: "https://us.battle.net/oauth",
          scopes: ["openid", "wow.profile"],
        },
      ],
      logoutUrls: [
        "http://localhost:3000/",
        "https://main.dlvgd9rcsj33x.amplifyapp.com",
      ],
      callbackUrls: [
        "http://localhost:3000",
        "https://main.dlvgd9rcsj33x.amplifyapp.com",
      ],
    },
  },
});
