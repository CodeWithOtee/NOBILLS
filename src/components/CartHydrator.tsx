"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cartStore";

/** Loads the saved bag from localStorage once the page is in the browser. */
export default function CartHydrator() {
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);
  return null;
}
