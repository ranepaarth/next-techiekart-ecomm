import { type ProductType } from "@/components/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartState = {
  cart: ProductType[];
};

export type CartActions = {
  addToCart: (item: ProductType, qty: number) => void;
  updateCartItemQty: (item: ProductType, qty: number) => void;
  removeFromCart: (item: ProductType) => void;
  emptyCart: () => void;
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

            if (!duplicateCart[itemIndex]?.qty) {
              return { cart: duplicateCart };
            }

            if (duplicateCart[itemIndex].qty + qty > 9) {
              duplicateCart[itemIndex].qty = 9;
            }

            if (duplicateCart[itemIndex].qty + qty < 9) {
              duplicateCart[itemIndex].qty += qty;
            }

            return { cart: duplicateCart };
          }),

        updateCartItemQty: (item, qty) =>
          set((state) => {
            const itemIndex = state.cart.findIndex(
              (product) => product.id === item.id
            );
            const duplicateCart = [...state.cart];

            if (!duplicateCart[itemIndex]) {
              return { cart: state.cart };
            }

            duplicateCart[itemIndex].qty = qty;

            return { cart: duplicateCart };
          }),

        removeFromCart: (item) =>
          set((state) => {
            return {
              cart: state.cart.filter((product) => product.id !== item.id),
            };
          }),
        emptyCart: () =>
          set((state) => ({
            cart: [],
          })),
      }),
      {
        name: "anazom-cart-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
