import { useCartStore } from "@/providers/couter-store-provider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FormatPrice from "./format-price";
import { ProductType } from "./product";

type CartProductProps = {
  product: ProductType;
};

const CartProduct = ({ product }: CartProductProps) => {
  const { increaseCartItemQty, decreaseCartItemQty, removeFromCart } =
    useCartStore((state) => state);

  const [price, setPrice] = useState(product.price);

  useEffect(() => {
    if (!product.qty) {
      return setPrice(product.price);
    }
    setPrice(product.price * product.qty);
  }, [product.qty]);

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
        <button
          className="bg-zinc-300 p-2 rounded"
          onClick={() => increaseCartItemQty(product)}
        >
          +
        </button>
        <p>{product.qty}</p>
        <button
          className="bg-zinc-300 p-2 rounded"
          onClick={() => decreaseCartItemQty(product)}
        >
          -
        </button>
      </div>
      <FormatPrice price={price} />
      <button
        className="bg-amber-500 w-full p-2 text-sm mt-auto hover:bg-amber-600"
        onClick={() => removeFromCart(product)}
      >
        Remove from Cart
      </button>
    </article>
  );
};

export default CartProduct;
