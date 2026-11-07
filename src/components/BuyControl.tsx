"use client";

import { useEffect, useRef, useState } from "react";
import { SIZES, type Product } from "@/lib/products";
import { useCart } from "@/lib/cartStore";

type Mode = "idle" | "size" | "adding";

/** Yeezy-style buy flow: + → pick a size → ADDING → back to + */
export default function BuyControl({
  product,
  variant = "compact",
}: {
  product: Product;
  variant?: "compact" | "pill";
}) {
  const [mode, setMode] = useState<Mode>("idle");
  const add = useCart((s) => s.add);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const choose = (size: string) => {
    setMode("adding");
    add({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      image: product.front,
    });
    timer.current = setTimeout(() => setMode("idle"), 1100);
  };

  return (
    <div className={`buy${variant === "pill" ? " is-pill" : ""}`}>
      {mode === "idle" && (
        <button
          type="button"
          className="buy-plus nb-hover"
          onClick={() => setMode("size")}
          aria-label={`Add ${product.name} — choose a size`}
        >
          {variant === "pill" ? "+ ADD" : "+"}
        </button>
      )}
      {mode === "size" && (
        <div className="buy-sizes nb-in" role="group" aria-label="Choose a size">
          {SIZES.map((size) => (
            <button key={size} type="button" className="buy-size nb-hover" onClick={() => choose(size)}>
              {size}
            </button>
          ))}
        </div>
      )}
      {mode === "adding" && (
        <span role="status" className="buy-status nb-dots">
          ADDING
        </span>
      )}
    </div>
  );
}
