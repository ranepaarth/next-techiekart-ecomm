import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch("https://fakestoreapi.com/products");

  const products: ProductType[] = await response.json();

  const productEntries: MetadataRoute.Sitemap = products.map(({ id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`,
  }));
  return [
    ...productEntries,
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
    },
  ];
}
