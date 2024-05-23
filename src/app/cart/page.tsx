import CartCheckoutButton from "@/components/cart-checkout-button";
import CartEmptyButton from "@/components/cart-empty-button";
import CartProduct from "@/components/cart-product";
import FormatPrice from "@/components/format-price";
import { prisma } from "@/lib/db";
import { getCart } from "@/lib/db-cart";
import { getUser } from "@/lib/getUser";
import React from "react";

const CartPage = async () => {
  const user = await getUser();
  const cart = await getCart();

  const newCart = await prisma.cartItem.findMany({
    where: {
      cartId: cart?.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let content;
  if (!user) {
    content = <p className="text-2xl font-bold">Please Login to continue</p>;
  }

  if (newCart.length <= 0) {
    content = <p className="text-2xl font-bold">Cart is empty</p>;
  }

  if (user && newCart.length > 0) {
    content = (
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {newCart.map((product) => (
          <CartProduct product={product} key={product.id} />
        ))}
      </section>
    );
  }

  // console.log(cart?.cartItems);

  return (
    <div className="px-10 pt-8 flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-8">
          <FormatPrice price={cart?.cartSubTotal as number} />
          <CartCheckoutButton user={user} cartItems={newCart} />
        </div>
        <CartEmptyButton disabled={newCart.length <= 0 || !user} />
      </div>

      {content}
    </div>
  );
};

export default CartPage;
