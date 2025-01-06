import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Account",
  robots: {
    follow: true,
    index: true,
  },
};

const RegisterPage = () => {
  return (
    <section className="p-8 w-full flex justify-center items-center">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
