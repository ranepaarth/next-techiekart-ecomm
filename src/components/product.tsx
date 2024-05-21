"use client";

import { useCartStore } from "@/providers/cart-store-provider";
import Image from "next/image";
import React, { useState } from "react";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  qty?: number;
};
type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const [qty, setQty] = useState(1);

  const { addToCart } = useCartStore((state) => state);

  const handleAddToCart = (qty: number) => {
    addToCart(product, qty);
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
        className="bg-amber-500 w-full p-2 text-sm mt-auto hover:bg-amber-600"
        onClick={() => handleAddToCart(qty)}
      >
        Add to Cart
      </button>
    </article>
  );
};

export default Product;
