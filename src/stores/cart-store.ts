import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartState = {
  cart: CartProductType[];
};

export type CartActions = {
  addToCart: (item: CartProductType, qty: number) => void;
  updateCartItemQty: (item: CartProductType, qty: number) => void;
  removeFromCart: (item: CartProductType) => void;
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
        addToCart: (item, qty = 1) =>
          set((state) => {
            const itemIndex = state.cart.findIndex(
              (product) => product.id === item.id
            );
            const duplicateCart = [...state.cart];

            if (itemIndex < 0) {
              duplicateCart.push(item);
            }

            if (itemIndex >= 0 && duplicateCart[itemIndex].qty + qty > 9) {
              duplicateCart[itemIndex].qty = 9;
            }

            if (itemIndex >= 0 && duplicateCart[itemIndex].qty + qty < 9) {
              duplicateCart[itemIndex].qty += qty;
            }

            return { cart: [...duplicateCart] };
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
