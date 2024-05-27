import Navbar from "@/components/navbar";
import Socials from "@/components/socials";
import { CartStoreProvider } from "@/providers/cart-store-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Techiekart | One-stop shop for all your basic needs",
    template: "%s - Techiekart",
  },
  description:
    "An E-commerce web application pivoted around core functionalities and features!",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartStoreProvider>
          <SessionProvider>
            <Navbar />
            <Socials />
            {children}
          </SessionProvider>
        </CartStoreProvider>
      </body>
    </html>
  );
}
