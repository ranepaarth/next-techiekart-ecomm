"use client";

import {
  createCartStore,
  initCartStore,
  type CartStore,
} from "@/stores/cart-store";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

export const CartStoreContext = createContext<StoreApi<CartStore> | null>(null);

export interface CartStoreProviderProps {
  children: ReactNode;
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CartStore>>();

  if (!storeRef.current) {
    storeRef.current = createCartStore(initCartStore());
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error(`useCartStore must be use within CartStoreProvider`);
  }

  return useStore(cartStoreContext, selector);
};
