// Drop 01 — Units 1–3, each in white and black.
// Prices: set a number (USD) when decided. `null` shows "PRICE TBC" on the site.

export type Colour = "white" | "black";

export type Product = {
  slug: string;
  unit: 1 | 2 | 3;
  colour: Colour;
  name: string;
  price: number | null;
  spec: string;
  front: string;
  back: string;
  /** Solid background on the product page */
  bg: string;
  /** Text colour on that background */
  fg: string;
};

const img = (unit: number, colour: Colour, side: "front" | "back") =>
  `/drop01/u${unit}-${colour}-${side}.png`;

export const products: Product[] = [
  {
    slug: "unit-1-white",
    unit: 1,
    colour: "white",
    name: "UNIT 1 — WHITE",
    price: null,
    spec: "OVERSIZED · NOBILLS ACROSS THE CHEST · CLEAN BACK",
    front: img(1, "white", "front"),
    back: img(1, "white", "back"),
    bg: "#B6401D",
    fg: "#FFFFFF",
  },
  {
    slug: "unit-1-black",
    unit: 1,
    colour: "black",
    name: "UNIT 1 — BLACK",
    price: null,
    spec: "OVERSIZED · NOBILLS ACROSS THE CHEST · CLEAN BACK",
    front: img(1, "black", "front"),
    back: img(1, "black", "back"),
    bg: "#E4DFD3",
    fg: "#141210",
  },
  {
    slug: "unit-2-white",
    unit: 2,
    colour: "white",
    name: "UNIT 2 — WHITE",
    price: null,
    spec: "OVERSIZED · NOBILLS CHEST · NOBILLS COLUMN DOWN THE BACK",
    front: img(2, "white", "front"),
    back: img(2, "white", "back"),
    bg: "#141210",
    fg: "#F1EDE4",
  },
  {
    slug: "unit-2-black",
    unit: 2,
    colour: "black",
    name: "UNIT 2 — BLACK",
    price: null,
    spec: "OVERSIZED · NOBILLS CHEST · NOBILLS COLUMN DOWN THE BACK",
    front: img(2, "black", "front"),
    back: img(2, "black", "back"),
    bg: "#2A45C9",
    fg: "#FFFFFF",
  },
  {
    slug: "unit-3-white",
    unit: 3,
    colour: "white",
    name: "UNIT 3 — WHITE",
    price: 60,
    spec: "OVERSIZED · NOB CHEST · NOBILLS / NOB / NOBILLS BACK",
    front: img(3, "white", "front"),
    back: img(3, "white", "back"),
    bg: "#5E6B4E",
    fg: "#FFFFFF",
  },
  {
    slug: "unit-3-black",
    unit: 3,
    colour: "black",
    name: "UNIT 3 — BLACK",
    price: 60,
    spec: "OVERSIZED · NOB CHEST · NOBILLS / NOB / NOBILLS BACK",
    front: img(3, "black", "front"),
    back: img(3, "black", "back"),
    bg: "#7A2418",
    fg: "#FFFFFF",
  },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const formatPrice = (price: number | null) =>
  price === null ? "PRICE TBC" : `$${price}`;

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
