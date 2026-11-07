"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useBagCount } from "@/lib/cartStore";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

/** Spinning head (home) · title · extra actions · bag count */
export default function TopBar({ title, children }: Props) {
  const count = useBagCount();
  return (
    <header className="topbar">
      <Link href="/" className="head-link" aria-label="NOBILLS — back to the entrance">
        <img className="nb-coin" src="/brand/head.png" alt="" />
      </Link>
      {title ? <span className="topbar-title">{title}</span> : null}
      <div className="topbar-actions">
        {children}
        <Link href="/cart" className={`topbar-btn bag-link${count > 0 ? " has-items" : ""}`} aria-live="polite">
          BAG {count}
        </Link>
      </div>
    </header>
  );
}
