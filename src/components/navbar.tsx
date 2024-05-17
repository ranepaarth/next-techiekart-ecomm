"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const Navbar = () => {
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const handleLogin = () => {
    setLoading(true);
    signIn("google")
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    if (session.data?.user) {
      signOut();
    }
  };

  return (
    <nav className="bg-neutral-700 py-2 flex justify-center space-x-4 items-center">
      <span className="p-4 bg-neutral-800 rounded">Cart 0</span>
      <button
        className="bg-blue-500 p-4 rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        {loading ? "loading..." : session.data?.user ? "Log out" : "Log in"}
      </button>
      <span>{session.data?.user?.name}</span>
    </nav>
  );
};

export default Navbar;
