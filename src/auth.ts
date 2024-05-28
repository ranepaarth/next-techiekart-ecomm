import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { getDbUserById } from "./lib/db-user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getDbUserById(user.id as string);

      if (!existingUser) return false;

      console.log({ existingUser });
      return true;
    },
    async session({ token, session }) {
      if (!session.user || !token.sub) return session;

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
