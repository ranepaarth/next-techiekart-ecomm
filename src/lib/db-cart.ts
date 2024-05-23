import { Cart, CartItem } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "./db";
import { getUser } from "./getUser";

type ShoppingCart = Cart & {
  cartItems: CartItem[];
  cartSubTotal: number;
  cartTotalItem: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;

  const cart = localCartId
    ? await prisma.cart.findFirst({
        where: {
          id: localCartId,
        },
        include: {
          cartItems: true,
        },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    cartTotalItem: cart.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    cartSubTotal: cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const user = await getUser();
  const newCart = await prisma.cart.create({
    data: {
      userId: user?.id as string,
    },
  });

  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    cartItems: [],
    cartTotalItem: 0,
    cartSubTotal: 0,
  };
}
