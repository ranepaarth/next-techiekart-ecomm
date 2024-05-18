import { type ProductType } from "@/components/product";
import { createStore } from "zustand";

export type CartState = {
  cart: ProductType[];
};

export type CartActions = {
  addToCart: (item: ProductType, qty: number) => void;
  removeFromCart: (item: ProductType) => void;
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
  return createStore<CartStore>()((set) => ({
    ...initState,
    addToCart: (item, qty) =>
      set((state) => {
        const itemIndex = state.cart.findIndex(
          (product) => product.id === item.id
        );
        const duplicateCart = [...state.cart];

        //TODO: Item doesn't exist
        if (itemIndex < 0) {
          duplicateCart.push({ ...item, qty });
        }

        //TODO: Item exist but qty===1
        if (itemIndex >= 0 && duplicateCart[itemIndex].qty && qty === 1) {
          duplicateCart[itemIndex].qty += 1;
        }

        //TODO: Item exist but qty>1
        if (itemIndex >= 0 && duplicateCart[itemIndex].qty && qty>1) {
          duplicateCart[itemIndex].qty += qty;
        }

        return { cart: duplicateCart };
      }),
    removeFromCart: (item) =>
      set((state) => ({
        cart: state.cart.filter((product) => product.id !== item.id),
      })),
  }));
};
