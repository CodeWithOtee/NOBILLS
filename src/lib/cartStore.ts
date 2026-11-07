"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  /** slug + size */
  key: string;
  slug: string;
  name: string;
  size: string;
  price: number | null;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "key" | "qty">) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const key = `${item.slug}:${item.size}`;
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, key, qty: 1 }] };
        }),
      remove: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "nobills-bag",
      storage: createJSONStorage(() => localStorage),
      // Rehydrated on the client by <CartHydrator /> to avoid SSR mismatches.
      skipHydration: true,
    }
  )
);

export const useBagCount = () =>
  useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
