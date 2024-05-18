import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { getDbUserById } from "./lib/db-user";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    async signIn({ user }) {
      try {
        // console.log(user);

        const existingUser = await getDbUserById(user.id as string);

        if (!existingUser) return false;

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ token, session }) {
      // console.log({ token });
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
