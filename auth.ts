import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  signInUser,
  signInWithOAuthProvider,
} from "./features/user/api/sign-in";
import { Env } from "./constants/env";
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { DEFAULT_LOGIN_REDIRECT } from "./routes";

class InvalidLoginError extends CredentialsSignin {
  code: string = "";

  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      name: "google",
      clientId: Env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: Env.AUTH_GOOGLE_CLIENT_SECRET
    }),
    GitHub({
      name: "github",
      clientId: Env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: Env.AUTH_GITHUB_CLIENT_SECRET
    }),
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          !credentials.identifier ||
          typeof credentials.identifier !== "string" ||
          !credentials.password ||
          typeof credentials.password !== "string"
        ) {
          throw new InvalidLoginError("invalid inputs");
        }

        // logic to verify if the user exists
        const data = await signInUser({
          identifier: credentials.identifier,
          password: credentials.password,
        });

        if (!data) {
          throw new Error("Invalid credentials. Please try again.");
          // return null;
        }

        if (!data.success) {
          console.log({ "data.message": data.message });
          throw new InvalidLoginError(data.message);
        }

        const { data: user } = data;

        return {
          id: user?.id,
          email: user?.email,
          name: user?.username,
          image: user?.profileImage,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({trigger_provider_id: account?.providerAccountId})

      // Initial sign-in
      // create user in db
      if (user && account && user.email && user.name) {
        console.log({
          account,
        });

        if (account.provider === "credentials") {
          console.log("credentials provider");
        } else {
          if (!account.provider) {
            return null;
          }
          if (account.provider !== "google" && account.provider !== "github") {
            console.log({
              account_pr: account.provider,
            });
            return null;
          }
          const response = await signInWithOAuthProvider({
            username: user.name,
            email: user.email,
            profileImage: user.image,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
          if (!response.success) {
            return null;
          }
        }
        // token.refresh_token = account.refresh_token;
        token.access_token = account.access_token;
        token.bearer_token = account.id_token;
        token.access_token_expires_at = account.expires_at
          ? account.expires_at * 1000
          : undefined; // expires_at is in seconds
      }
      return token;
    },
    async session({ session, token }) {
      // Add access_token and refresh_token to session
      // session.refresh_token = token.refresh_token;
      session.access_token = token.access_token;
      session.bearer_token = token.bearer_token;
      session.access_token_expires_at = token.access_token_expires_at;

      return session;
    },
    async redirect() {
      return DEFAULT_LOGIN_REDIRECT;
    },
  },
  secret: Env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
