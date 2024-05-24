import { Cart, CartItem, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "./db";
import { getUser } from "./getUser";

type ShoppingCart = Cart & {
  cartItems: CartItem[];
  cartSubTotal: number;
  cartTotalItem: number;
};

//** Populate cart with cartItems to get its type
type CartWithItems = Prisma.CartGetPayload<{
  include: { cartItems: true };
}>;

export async function getCart(): Promise<ShoppingCart | null> {
  const user = await getUser();

  let cart: CartWithItems | null = null;

  if (user) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        cartItems: true,
      },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findFirst({
          where: {
            id: localCartId,
          },
          include: {
            cartItems: true,
          },
        })
      : null;
  }

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

  let newCart: Cart;
  if (user) {
    newCart = await prisma.cart.create({
      data: {
        userId: user?.id as string,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    cartItems: [],
    cartTotalItem: 0,
    cartSubTotal: 0,
  };
}
