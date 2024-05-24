"use client";

import getStripe from "@/utils/get-stripe";
import { CartItem } from "@prisma/client";
import axios from "axios";
import { User } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";

type CartCheckoutButtonProps = {
  cartItems: CartItem[];
  user: User | undefined;
};

const CartCheckoutButton = ({ user, cartItems }: CartCheckoutButtonProps) => {
  const createCheckoutSession = async () => {
    const stripe = await getStripe();

    const checkoutSession = await axios.post("/api/checkout_sessions", {
      cart: cartItems,
      email: user?.email,
      userId: user?.id,
    });

    if (!checkoutSession) return null;
    const res = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (res?.error) {
      alert(res.error.message);
    }
  };

  const handleCheckout = async () => {
    user ? createCheckoutSession() : signIn();
  };

  return (
    <button
      className="px-4 py-2 bg-amber-400 text-black hover:bg-amber-500 rounded disabled:bg-amber-700 disabled:cursor-not-allowed"
      onClick={handleCheckout}
      disabled={!cartItems?.length || !user}
    >
      {user ? "Checkout" : "Log in to Checkout"}
    </button>
  );
};

export default CartCheckoutButton;
