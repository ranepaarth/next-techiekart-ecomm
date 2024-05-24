import CartCheckoutButton from "@/components/cart-checkout-button";
import CartEmptyButton from "@/components/cart-empty-button";
import CartProduct from "@/components/cart-product";
import FormatPrice from "@/components/format-price";
import { getCart } from "@/lib/db-cart";
import { getUser } from "@/lib/getUser";
import { CartItem } from "@prisma/client";
import React from "react";

const CartPage = async () => {
  const user = await getUser();
  const cart = await getCart();

  let content;

  const newCart =
    cart?.cartItems &&
    (cart.cartItems.sort(
      (a, b) =>
        new Date(new Date(a.createdAt).toISOString()).getTime() -
        new Date(new Date(b.createdAt).toISOString()).getTime()
    ) as CartItem[]);

  if (!newCart?.length) {
    content = <p className="text-2xl font-bold">Cart is empty</p>;
  }

  if (newCart?.length) {
    content = (
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {newCart?.map((product) => (
          <CartProduct product={product} key={product.id} />
        ))}
      </section>
    );
  }

  // console.log(newCart);

  return (
    <div className="px-10 pt-8 flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-8">
          <FormatPrice price={cart?.cartSubTotal as number} />
          <CartCheckoutButton user={user} cartItems={newCart as CartItem[]} />
        </div>
        <CartEmptyButton disabled={!newCart?.length || !user} />
      </div>

      {content}
    </div>
  );
};

export default CartPage;
