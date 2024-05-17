import { products } from "@/data/products";
import React from "react";
import Product from "./product";

const ProductFeed = () => {

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductFeed;
