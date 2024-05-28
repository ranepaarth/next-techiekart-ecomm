import React from "react";
import Product from "./product";

const ProductFeed = ({ products }: { products: ProductType[] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductFeed;
