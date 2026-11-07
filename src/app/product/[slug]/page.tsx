import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { getProduct, products } from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} — NOBILLS` : "NOBILLS" };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const index = products.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  return <ProductView initialIndex={index} />;
}
