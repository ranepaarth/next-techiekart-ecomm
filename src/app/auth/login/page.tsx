import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
import React from "react";

// export const metadata:Metadata = {
//   title:"Login",
//   robots: {
//     follow: true,
//     index: true,
//   },
// }

const LoginPage = () => {
  return (
    <section className="p-8 w-full flex justify-center items-center">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
