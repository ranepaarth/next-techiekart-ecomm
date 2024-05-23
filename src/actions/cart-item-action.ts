"use server";

import { prisma } from "@/lib/db";
import { createCart, getCart } from "@/lib/db-cart";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addProductToCart = async (
  cartItem: CartProductType,
  qty: number
) => {
  const cart = (await getCart()) ?? (await createCart());

  const itemInCart = cart.cartItems.find(
    (item) => item.productId === cartItem.id
  );
  console.log(
    `"------ItemInCart------${itemInCart?.quantity}----------------"`
  );
  if (itemInCart) {
    console.log(`"------Qty------${qty}----------------"`);
    const addedCartItem = await prisma.cartItem.update({
      where: {
        id: itemInCart.id,
      },
      data: {
        quantity:
          itemInCart.quantity + qty > 9 ? 9 : (itemInCart.quantity += qty),
      },
    });
    // console.log(addedCartItem);
  }

  if (!itemInCart) {
    await prisma.cartItem.create({
      data: {
        productId: cartItem.id,
        title: cartItem.title,
        description: cartItem.description,
        image: cartItem.image,
        price: cartItem.price,
        quantity: cartItem.quantity,
        cartId: cart.id,
      },
    });
  }

  revalidatePath("/cart");
  revalidatePath("/");
};

export const updateCartItemQuantity = async (
  itemToUpdateId: number,
  qty: number
) => {
  const cart = (await getCart()) ?? (await createCart());

  const itemInCart = cart.cartItems.find(
    (item) => item.productId === itemToUpdateId
  );
  console.log(
    `"------ItemInCart------${itemInCart?.quantity}----------------"`
  );
  if (itemInCart) {
    console.log(`"------Qty------${qty}----------------"`);
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: itemInCart.id,
      },
      data: {
        quantity: qty,
      },
    });
    // console.log(updatedCartItem);
  }

  if (!itemInCart) {
    return;
  }

  revalidatePath("/cart");
  //   revalidatePath("/");
};

export async function removeFromCartDb(cartItemId: number) {
  const cartItemExists = await prisma.cartItem.findFirst({
    where: {
      productId: cartItemId,
    },
  });

  if (cartItemExists) {
    const removedCartItem = await prisma.cartItem.delete({
      where: {
        id: cartItemExists.id,
      },
    });

    // console.log(removedCartItem);
  }

  revalidatePath("/cart");
  revalidatePath("/");
}

export async function deleteCartDb() {
  const cart = (await getCart()) ?? (await createCart());

  await prisma.cart.delete({
    where: {
      id: cart.id,
    },
  });
  cookies().delete("localCartId");

  revalidatePath("/cart");
  revalidatePath("/");
}
