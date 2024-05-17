"use client";

import { useSession } from "next-auth/react";

export const useGetUser = async () => {
  const session = useSession();

  return session.data?.user;
};
