import ProductFeed from "@/components/product-feed";
import { notFound } from "next/navigation";
import React from "react";

const Home = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);

  if (response.status === 404 || !response.ok) {
    notFound();
  }

  const result = await response.json();
  const products = result?.products

  return <ProductFeed products={products} />;
};

export default Home;
