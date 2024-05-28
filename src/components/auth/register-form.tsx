"use client";

import { registerUser } from "@/actions/register-user";
import { RegisterSchema } from "@/schema";
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

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      registerUser(values).then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        if (data.success) {
          setSuccess(data.success);
          return;
        }
      });
    });
  };

  return (
    <article className="w-full max-w-[500px] flex flex-col gap-4">
      <FormHeader header="Register" subheader="Create Account!" />
      <form
        className="flex flex-col gap-4 bg-white border text-black p-4 rounded-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-sm">
            Name
          </label>
          <input
            type="name"
            id="name"
            className="bg-neutral-100 w-full p-2 rounded border focus-visible:outline-teal-500 focus-within:outline-4"
            placeholder="Your name"
            autoFocus
            {...form.register("name")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-neutral-100 w-full p-2 rounded border focus-visible:outline-teal-500 focus-within:outline-4"
            placeholder="email@example.com"
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
            placeholder="********"
            {...form.register("password")}
          />
        </div>

        <FormSuccess success={success as string} />
        <FormError error={error as string} />

        <div className="flex items-center gap-4 w-full">
          <FormSubmitButton
            isPending={isPending}
            displayLabel="Create Account"
            loadingLabel="Loading..."
          />
          <OAuthLoginButton label="Google" provider="google" />
        </div>
      </form>

      <FormDivider label="Already have an account?" />
      <BackButton href="/auth/login" label="Login" />
    </article>
  );
};

export default RegisterForm;
