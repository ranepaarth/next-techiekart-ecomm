"use client";

import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type LoginButtonProps = {
  user: User | undefined;
};

const LoginButton = ({ user }: LoginButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      signOut();
    }
  };

  return (
    <button
      className="bg-blue-500 p-4 rounded hover:bg-blue-600"
      onClick={handleLogin}
    >
      {loading ? "loading..." : user ? "Log out" : "Log in"}
    </button>
  );
};

export default LoginButton;
