"use client";

import Image from "next/image";
import React, { useState } from "react";

type Product = {
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
};
type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  const [qty, setQty] = useState(0);

  const handleClick = (isIncrease: boolean) => {
    console.log(isIncrease);
    if (isIncrease) {
      setQty((prev) => prev + 1);
      return;
    }
    setQty((prev) => prev - 1);
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

      <button className="bg-amber-500 w-full p-2 text-sm mt-auto hover:bg-amber-600">
        Add to Cart
      </button>
    </article>
  );
};

export default Product;
