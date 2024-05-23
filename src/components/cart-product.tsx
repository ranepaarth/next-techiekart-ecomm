"use client";

import {
  removeFromCartDb,
  updateCartItemQuantity,
} from "@/actions/cart-item-action";
import { CartItem } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import FormatPrice from "./format-price";

type CartProductProps = {
  product: CartItem;
};

const CartProduct = ({ product }: CartProductProps) => {
  const [isPending, startTransition] = useTransition();

  const [price, setPrice] = useState(product.price);

  useEffect(() => {
    if (!product.quantity) {
      return setPrice(product.price);
    }
    setPrice(product.price * product.quantity);
  }, [product.quantity, product.price]);

  const handleUpdateCartItemQty = (updateQty: number) => {
    startTransition(() => {
      updateCartItemQuantity(product.productId, updateQty);
    });
  };

  return (
    <article className="bg-white p-10 m-5 rounded text-black space-y-2">
      <h4>{product.title}</h4>
      <Image
        src={product.image}
        alt={product.title}
        width={1020}
        height={720}
        className="w-72 aspect-video object-contain"
      />
      <p className="line-clamp-3">{product.description}</p>
      <div className="flex space-x-2 items-center">
        <select
          name="qty-select"
          id="qty-select"
          value={product.quantity}
          onChange={(e) => handleUpdateCartItemQty(Number(e.target.value))}
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <FormatPrice price={price} />
      <button
        className="bg-amber-500 w-full p-2 text-sm mt-auto hover:bg-amber-600"
        onClick={() => {
          startTransition(() => {
            removeFromCartDb(product.productId);
          });
        }}
      >
        Remove from Cart
      </button>
    </article>
  );
};

export default CartProduct;
