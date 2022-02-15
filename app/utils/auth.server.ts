import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "./auth0-strategy";
import { sessionStorage } from "~/session.server";

export const authenticator = new Authenticator<any>(sessionStorage);

if (!process.env.AUTH0_CALLBACK_URL)
  throw new Error("AUTH0_CALLBACK_URL is not set");
if (!process.env.AUTH0_CLIENT_ID) throw new Error("AUTH0_CLIENT_ID is not set");
if (!process.env.AUTH0_DOMAIN) throw new Error("AUTH0_DOMAIN is not set");
if (!process.env.AUTH0_CLIENT_SECRET)
  throw new Error("AUTH0_CLIENT_SECRET is not set");

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: process.env.AUTH0_CALLBACK_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log({ accessToken, refreshToken, extraParams, profile });
    // Get the user data from your DB or API using the tokens and profile
    return { email: profile.emails[0].value };
  }
);

authenticator.use(auth0Strategy);
