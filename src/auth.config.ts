import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getDbUserByEmail } from "./lib/db-user";
import { LoginSchema } from "./schema";
export default {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getDbUserByEmail(email);

          if (!user || !user?.password) return null;

          const matchedPassword = await bcrypt.compare(
            password,
            user?.password
          );

          if (matchedPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
