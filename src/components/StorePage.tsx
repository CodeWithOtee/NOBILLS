"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import BuyControl from "@/components/BuyControl";
import { products, formatPrice, type Colour } from "@/lib/products";

const SIDES: { colour: Colour; label: string }[] = [
  { colour: "white", label: "WHITE" },
  { colour: "black", label: "BLACK" },
];

export default function StorePage() {
  const [info, setInfo] = useState(false);

  return (
    <div className="store">
      <TopBar title="DROP 01 · UNITS 1–3">
        <button type="button" className="topbar-btn nb-hover" aria-pressed={info} onClick={() => setInfo(!info)}>
          INFO
        </button>
      </TopBar>

      {!info ? (
        <main className="store-split nb-in">
          {SIDES.map((side) => {
            const items = products.filter((p) => p.colour === side.colour);
            return (
              <section
                key={side.colour}
                className={`store-side is-${side.colour}`}
                aria-label={`${side.label} colourway`}
              >
                <div className="store-side-head">
                  <span>{side.label}</span>
                  <span style={{ opacity: 0.7 }}>{String(items.length).padStart(2, "0")}</span>
                </div>
                <div className="store-grid">
                  {items.map((p) => (
                    <div className="tile" key={p.slug}>
                      <Link href={`/product/${p.slug}`} className="tile-img" aria-label={`Open ${p.name}`}>
                        <img className="tile-front" src={p.front} alt="" />
                        <img className="tile-back" src={p.back} alt="" />
                      </Link>
                      <div className="tile-meta">
                        <div>UNIT {p.unit}</div>
                        <div>{formatPrice(p.price)}</div>
                      </div>
                      <BuyControl product={p} />
                    </div>
                  ))}
                </div>
                <div className="store-hint">HOVER FOR THE BACK · TAP TO OPEN</div>
              </section>
            );
          })}
        </main>
      ) : (
        <main className="store-info nb-in">
          <div>
            <p style={{ fontWeight: 600 }}>NOBILLS</p>
            <p>Never Overlook Bright Ideas, Live &amp; Learn Strategically.</p>
            <p>
              NOBILLS started as a high-school idea that refused to die. Every piece is designed by Otee — luxury
              finish, streetwear attitude — for the innovators, the dreamers and the doers.
            </p>
            <p>Drop 01 is three units, each in white and black.</p>
            <p>Online first. Then the Middle East, Europe, America and Asia.</p>
            <p style={{ color: "var(--muted)" }}>[EMAIL] · INSTAGRAM · TIKTOK</p>
            <p style={{ color: "var(--muted)" }}>[SHIPPING &amp; RETURNS]</p>
          </div>
        </main>
      )}

      <footer className="store-footer">NO LIMIT, NO LABEL · © 2026 NOBILLS</footer>
    </div>
  );
}
