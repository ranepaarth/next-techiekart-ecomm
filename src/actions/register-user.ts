"use server";

import { prisma } from "@/lib/db";
import { getDbUserByEmail } from "@/lib/db-user";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getDbUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already exists!",
    };
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      error: "There was some problem while creating your account!",
    };
  }

  return {
    success: "Account created successfully!",
  };
};
