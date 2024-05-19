"use client";

import CartProduct from "@/components/cart-product";
import FormatPrice from "@/components/format-price";
import { useGetUser } from "@/hooks/useGetUser";
import { useCartStore } from "@/providers/couter-store-provider";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { cart } = useCartStore((state) => state);
  const user = useGetUser();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => {
        if (!item.qty) {
          return total;
        }
        return total + item.price * item.qty;
      }, 0)
    );
  }, [cart]);

  if (!user) {
    return <p className="text-2xl font-bold">Please Login to continue</p>;
  }

  if (cart.length <= 0) {
    return <p className="text-2xl font-bold">Cart is empty</p>;
  }

  return (
    <div>
      <FormatPrice price={total as number} />
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {cart.map((product) => (
          <CartProduct product={product} key={product.id} />
        ))}
      </section>
    </div>
  );
};

export default CartPage;
