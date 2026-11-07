"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRef, useState } from "react";
import BuyControl from "@/components/BuyControl";
import { useBagCount } from "@/lib/cartStore";
import { formatPrice, products } from "@/lib/products";

type Drag = { active: boolean; startX: number; dx: number };

export default function ProductView({ initialIndex }: { initialIndex: number }) {
  const [index, setIndex] = useState(initialIndex);
  const [base, setBase] = useState(0); // 0 = front, 180 = back (any multiple)
  const [drag, setDrag] = useState<Drag>({ active: false, startX: 0, dx: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bag = useBagCount();
  const stageRef = useRef<HTMLDivElement>(null);

  const p = products[index];
  const dark = p.fg !== "#141210";

  const go = (i: number) => {
    const next = (i + products.length) % products.length;
    setIndex(next);
    setBase(0);
    setTilt({ x: 0, y: 0 });
    setDrag({ active: false, startX: 0, dx: 0 });
    // Keep the address bar in step without a full navigation.
    window.history.replaceState(null, "", `/product/${products[next].slug}`);
  };

  const ry = base + (drag.active ? drag.dx * 0.6 : tilt.y);
  const rx = drag.active ? 0 : tilt.x;
  const showingBack = ((Math.round(ry / 180) % 2) + 2) % 2 === 1;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDrag({ active: true, startX: e.clientX, dx: 0 });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.active) {
      setDrag((d) => ({ ...d, dx: e.clientX - d.startX }));
      return;
    }
    if (e.pointerType !== "mouse" || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 12, y: px * 18 });
  };

  const onPointerUp = () => {
    if (!drag.active) return;
    if (Math.abs(drag.dx) < 5) {
      setBase((b) => b + 180); // a tap turns it
    } else {
      setBase(Math.round((base + drag.dx * 0.6) / 180) * 180);
    }
    setDrag({ active: false, startX: 0, dx: 0 });
  };

  const unitStart = index - (index % 2);

  return (
    <div className="product" style={{ background: p.bg, color: p.fg }}>
      <div className="product-ghost" aria-hidden="true">
        <span style={{ color: dark ? "rgba(255,255,255,0.08)" : "rgba(20,18,16,0.07)" }}>{p.unit}</span>
      </div>

      <header className="product-top">
        <Link href="/shop" className="nb-hover">
          ← ALL
        </Link>
        <Link href="/" className="product-brand nb-hover">
          NOBILLS
        </Link>
        <Link href="/cart" className="nb-hover" aria-live="polite">
          BAG {bag}
        </Link>
      </header>

      <main className="product-stage">
        <button type="button" className="product-arrow is-prev" onClick={() => go(index - 1)} aria-label="Previous piece">
          ←
        </button>
        <button type="button" className="product-arrow is-next" onClick={() => go(index + 1)} aria-label="Next piece">
          →
        </button>

        <div className="product-float">
          <div
            ref={stageRef}
            className="product-grab"
            style={{ cursor: drag.active ? "grabbing" : "grab" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => !drag.active && setTilt({ x: 0, y: 0 })}
          >
            <div
              key={p.slug}
              className="product-card"
              style={{
                transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
                transition: drag.active ? "none" : "transform .7s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              <img src={p.front} alt={`${p.name}, front`} draggable={false} />
              <img className="is-back" src={p.back} alt={`${p.name}, back`} draggable={false} />
            </div>
          </div>
        </div>
        <div className="product-shadow" aria-hidden="true" />

        <div className="product-face">
          <strong>{showingBack ? "BACK" : "FRONT"}</strong>
          <button type="button" className="product-turn nb-hover" onClick={() => setBase((b) => b + 180)}>
            TURN IT ↻
          </button>
          <span style={{ opacity: 0.75, letterSpacing: "0.12em" }}>· OR DRAG IT</span>
        </div>
      </main>

      <footer className="product-bar" style={{ borderTopColor: dark ? "rgba(255,255,255,0.35)" : "rgba(20,18,16,0.3)" }}>
        <div className="product-info">
          <div className="product-name">{p.name}</div>
          <div className="product-spec">
            {formatPrice(p.price)} · {p.spec}
          </div>
          <div className="product-colours" role="group" aria-label="Colourway">
            {(["WHITE", "BLACK"] as const).map((label, k) => {
              const target = unitStart + k;
              const on = target === index;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => go(target)}
                  style={{ background: on ? p.fg : "transparent", color: on ? p.bg : p.fg }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <BuyControl key={p.slug} product={p} variant="pill" />

        <div className="product-dots">
          {products.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${x.name}`}
              aria-pressed={i === index}
            >
              <span className="dot" style={{ width: i === index ? 22 : 8, opacity: i === index ? 1 : 0.45 }} />
            </button>
          ))}
          <span className="product-count">
            {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </span>
        </div>
      </footer>
    </div>
  );
}
