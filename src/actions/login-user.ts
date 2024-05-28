"use server";

import { signIn } from "@/auth";
import { getDbUserByEmail } from "@/lib/db-user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getDbUserByEmail(email);
  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  if (!existingUser.password) {
    return { error: "Email already in use with different provider!" };
  }

  const existingUserPassword = existingUser.password as string;
  const matchedPassword = await bcrypt.compare(password, existingUserPassword);
  if (!matchedPassword) {
    return { error: "Incorrect password!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    }).then(() => {
      return {
        success: "Log in success!",
      };
    });
    return {
      success: "Log in success!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password!",
          };

        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
