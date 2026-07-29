import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserByEmail } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[Auth] Missing email or password");
          return null;
        }

        try {
          console.log(`[Auth] Authenticating against Firebase Auth: ${credentials.email}...`);
          const userCred = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          if (!userCred.user) {
            console.log("[Auth] Firebase authentication failed: No user returned");
            return null;
          }

          console.log(`[Auth] Firebase Auth success. Fetching Firestore profile for: ${credentials.email}`);
          const profile = await getUserByEmail(credentials.email);

          if (!profile) {
            console.log(`[Auth] No Firestore profile found for: ${credentials.email}`);
            return null;
          }

          return {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
          };
        } catch (error: any) {
          console.error("[Auth] Firebase authentication error:", error.message || error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_for_vercel_deploys",
};

