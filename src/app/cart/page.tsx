"use client";

import CartProduct from "@/components/cart-product";
import FormatPrice from "@/components/format-price";
import { useGetUser } from "@/hooks/useGetUser";
import { useCartStore } from "@/providers/couter-store-provider";
import getStripe from "@/utils/get-stripe";
import axios from "axios";
import { signIn } from "next-auth/react";
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

  const createCheckoutSession = async () => {
    const stripe = await getStripe();

    const checkoutSession = await axios.post("/api/checkout_sessions", {
      cart,
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

  const handleCheckout = () => {
    user ? createCheckoutSession() : signIn();
  };

  if (!user) {
    return <p className="text-2xl font-bold">Please Login to continue</p>;
  }

  if (cart.length <= 0) {
    return <p className="text-2xl font-bold">Cart is empty</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-x-8 px-10 pt-8">
        <FormatPrice price={total as number} />
        <button
          className="px-4 py-2 bg-amber-400 text-black hover:bg-amber-500 rounded"
          onClick={handleCheckout}
        >
          {user ? "Checkout" : "Log in to Checkout"}
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2">
        {cart.map((product) => (
          <CartProduct product={product} key={product.id} />
        ))}
      </section>
    </div>
  );
};

export default CartPage;
