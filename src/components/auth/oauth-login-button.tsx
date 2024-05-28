"use client";

import { signIn } from "next-auth/react";
import React from "react";

interface OAuthLoginButtonProps {
  provider: "google";
  label: string;
}

const OAuthLoginButton = ({ provider, label }: OAuthLoginButtonProps) => {
  return (
    <button
      className="bg-amber-100 border-2 border-amber-500 p-2 rounded hover:bg-amber-200 flex-1"
      type="button"
      onClick={() => {
        signIn(provider);
      }}
    >
      {label}
    </button>
  );
};

export default OAuthLoginButton;
