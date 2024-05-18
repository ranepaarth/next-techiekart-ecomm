import Image from "next/image";
import React from "react";
import { ProductType } from "./product";

type CartProductProps = {
  product: ProductType;
};

const CartProduct = ({ product }: CartProductProps) => {
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
        <button className="bg-zinc-300 p-2 rounded ">+</button>
        <p>{product.qty}</p>
        <button className="bg-zinc-300 p-2 rounded">-</button>
      </div>
      <button className="bg-amber-500 w-full p-2 text-sm mt-auto hover:bg-amber-600">
        Add to Cart
      </button>
    </article>
  );
};

export default CartProduct;
