import ProductFeed from "@/components/product-feed";
import { notFound } from "next/navigation";
import React from "react";

const Home = async () => {
  const response = await fetch("https://fakestoreapi.com/products");

  if (response.status === 404 || !response.ok) {
    notFound();
  }

  const products = await response.json();

  return <ProductFeed products={products} />;
};

export default Home;
