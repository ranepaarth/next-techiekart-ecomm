"use client";

import { addProductToCart } from "@/actions/cart-item-action";
import Image from "next/image";
import React, { useState, useTransition } from "react";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const [qty, setQty] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (qty: number) => {
    const newProduct: CartProductType = { ...product, quantity: qty };
    startTransition(() => {
      addProductToCart(newProduct, qty);
    });
  };

  return (
    <article className="bg-white p-10 m-5 rounded text-black space-y-2">
      <h4>{product.title}</h4>
      <Image
        src={product.thumbnail}
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
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-amber-500 w-full p-2 text-sm mt-auto hover:bg-amber-600 disabled:bg-amber-600 disabled:cursor-not-allowed"
        disabled={isPending}
        onClick={() => handleAddToCart(qty)}
      >
        Add to Cart
      </button>
    </article>
  );
};

export default Product;
