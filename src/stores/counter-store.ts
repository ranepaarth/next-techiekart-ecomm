import { createStore } from "zustand";

export type CounterState = {
  count: number;
};

export type CounterActions = {
  incrementCount: () => void;
  decrementCount: () => void;
};

export type CounterStore = CounterState & CounterActions;

/* Initializing store */
export const initCounterStore = (): CounterState => {
  return { count: 0 };
};

export const defaultInitialState: CounterState = {
  count: 0,
};

export const createCounterStore = (
  initState: CounterState = defaultInitialState
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
  }));
};
