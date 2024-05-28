"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  const router = useRouter();
  return (
    <button
      className="w-full text-black bg-neutral-100 border rounded p-2 hover:bg-neutral-200"
      onClick={() => router.push(href)}
      type="submit"
    >
      {label}
    </button>
  );
};

export default BackButton;
