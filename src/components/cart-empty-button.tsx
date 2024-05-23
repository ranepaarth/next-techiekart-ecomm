"use client";

import { deleteCartDb } from "@/actions/cart-item-action";
import React, { useTransition } from "react";

const CartEmptyButton = ({ disabled }: { disabled: boolean }) => {
  const [isPending, startTransition] = useTransition();

  const handleEmptyCart = () => {
    startTransition(() => {
      deleteCartDb();
    });
  };

  return (
    <button
      className="bg-zinc-400 hover:bg-zinc-500 disabled:bg-zinc-700 disabled:text-black disabled:cursor-not-allowed p-2 rounded"
      onClick={handleEmptyCart}
      disabled={disabled}
    >
      Empty Cart
    </button>
  );
};

export default CartEmptyButton;
