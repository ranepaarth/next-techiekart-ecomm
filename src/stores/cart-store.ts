import { type ProductType } from "@/components/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartState = {
  cart: ProductType[];
};

export type CartActions = {
  addToCart: (item: ProductType, qty: number) => void;
  removeFromCart: (item: ProductType) => void;
  decreaseCartItemQty: (item: ProductType) => void;
  increaseCartItemQty: (item: ProductType) => void;
};

export type CartStore = CartState & CartActions;

/* Initializing store */
export const initCartStore = (): CartState => {
  return { cart: [] };
};

export const defaultInitialState: CartState = {
  cart: [],
};

export const createCartStore = (initState: CartState = defaultInitialState) => {
  return create(
    persist<CartStore>(
      (set) => ({
        ...initState,
        addToCart: (item, qty) =>
          set((state) => {
            const itemIndex = state.cart.findIndex(
              (product) => product.id === item.id
            );
            const duplicateCart = [...state.cart];

            // Item doesn't exist
            if (itemIndex < 0) {
              duplicateCart.push({ ...item, qty });
            }

            // Item exist but qty===1
            if (itemIndex >= 0 && duplicateCart[itemIndex].qty && qty === 1) {
              duplicateCart[itemIndex].qty += 1;
            }

            // Item exist but qty>1
            if (itemIndex >= 0 && duplicateCart[itemIndex].qty) {
              duplicateCart[itemIndex].qty += qty;
            }

            return { cart: duplicateCart };
          }),

        removeFromCart: (item) =>
          set((state) => {
            return {
              cart: state.cart.filter((product) => product.id !== item.id),
            };
          }),

        decreaseCartItemQty: (item) =>
          set((state) => {
            const itemIndex = state.cart.findIndex(
              (product) => product.id === item.id
            );
            const duplicateCart = [...state.cart];

            if (
              itemIndex >= 0 &&
              duplicateCart[itemIndex].qty &&
              duplicateCart[itemIndex].qty > 1
            ) {
              duplicateCart[itemIndex].qty -= 1;
            }

            return { cart: duplicateCart };
          }),

        increaseCartItemQty: (item) =>
          set((state) => {
            const itemIndex = state.cart.findIndex(
              (product) => product.id === item.id
            );
            const duplicateCart = [...state.cart];

            if (itemIndex >= 0 && duplicateCart[itemIndex].qty) {
              duplicateCart[itemIndex].qty += 1;
            }

            return { cart: duplicateCart };
          }),
      }),
      {
        name: "anazom-cart-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
