"use client";

import CartProduct from "@/components/cart-product";
import { useGetUser } from "@/hooks/useGetUser";
import { useCartStore } from "@/providers/couter-store-provider";
import React from "react";

const CartPage = () => {
  const { cart } = useCartStore((state) => state);
  const user = useGetUser();

  if (!user) {
    return <p className="text-2xl font-bold">Please Login to continue</p>;
  }
  if (cart.length <= 0) {
    return <p className="text-2xl font-bold">Cart is empty</p>;
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2">
      {cart.map((product) => (
        <CartProduct product={product} key={product.id} />
      ))}
    </section>
  );
};

export default CartPage;
