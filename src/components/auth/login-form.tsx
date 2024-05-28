"use client";

import { loginUser } from "@/actions/login-user";
import { LoginSchema } from "@/schema";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BackButton from "./back-button";
import { FormDivider } from "./form-divider";
import FormError from "./form-error";
import FormHeader from "./form-header";
import FormSubmitButton from "./form-submit-button";
import FormSuccess from "./form-success";
import OAuthLoginButton from "./oauth-login-button";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      loginUser(values)
        .then((data) => {
          setError(data?.error);
          if (data?.success) {
            setSuccess(data?.success);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <article className="w-full max-w-[500px] flex flex-col gap-4">
      <FormHeader header="Login" subheader="Welcome back!" />

      <form
        className="flex flex-col gap-4 bg-white border text-black p-4 rounded-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-neutral-100 w-full p-2 rounded border focus-visible:outline-teal-500 focus-within:outline-4"
            placeholder="test@test.com"
            autoFocus
            {...form.register("email")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-neutral-100 w-full p-2 rounded border focus-visible:outline-teal-500 focus-within:outline-4"
            placeholder="Test@123"
            {...form.register("password")}
          />
        </div>

        <FormSuccess success={success as string} />
        <FormError error={error as string} />

        <div className="flex items-center gap-4 w-full">
          <FormSubmitButton
            isPending={isPending}
            displayLabel="Login"
            loadingLabel="Loading..."
          />
          <OAuthLoginButton label="Google" provider="google" />
        </div>
      </form>

      <FormDivider label="New to Techiekart?" />
      <BackButton href="/auth/register" label="Create Account" />
    </article>
  );
};

export default LoginForm;
