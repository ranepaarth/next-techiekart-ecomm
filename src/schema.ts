import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, {
    message: "Name is required!",
  }),
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required!",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(8, {
    message: "Password is required!",
  }),
});
