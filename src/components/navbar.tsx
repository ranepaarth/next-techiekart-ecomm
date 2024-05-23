import { getCart } from "@/lib/db-cart";
import { getUser } from "@/lib/getUser";
import Link from "next/link";
import React from "react";
import LoginButton from "./login-button";

const Navbar = async () => {
  const user = await getUser();
  const cart = await getCart();

  return (
    <nav className="bg-neutral-700 py-2 flex justify-center space-x-4 items-center">
      <Link href={"/"} className="p-4 bg-neutral-800 rounded">
        Home
      </Link>
      <Link href={"/cart"} className="p-4 bg-neutral-800 rounded">
        Cart {cart?.cartTotalItem}
      </Link>
      <Link href={"/orders"} className="p-4 bg-neutral-800 rounded">
        My Orders
      </Link>
      <LoginButton user={user} />
      <span>{user?.name}</span>
    </nav>
  );
};

export default Navbar;
