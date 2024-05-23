"use client";

import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";

type LoginButtonProps = {
  user: User | undefined;
};

const LoginButton = ({ user }: LoginButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!user) {
      setLoading(true);
      signIn("google")
        .then(() => setLoading(false))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
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
