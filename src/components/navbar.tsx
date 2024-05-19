"use client";

import { useCartStore } from "@/providers/couter-store-provider";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { cart } = useCartStore((state) => state);
  const session = useSession();

  const [loading, setLoading] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    setCartQty(
      cart.reduce((total, item) => {
        if (!item.qty) {
          return total;
        }
        return total + item.qty;
      }, 0)
    );
  }, [cart]);

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
      <Link href={"/"} className="p-4 bg-neutral-800 rounded">
        Home
      </Link>
      <Link href={"/cart"} className="p-4 bg-neutral-800 rounded">
        Cart {cartQty}
      </Link>
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
