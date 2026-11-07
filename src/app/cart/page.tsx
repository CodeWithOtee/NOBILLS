"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import TopBar from "@/components/TopBar";
import { useCart } from "@/lib/cartStore";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);

  const hasTbc = items.some((i) => i.price === null);
  const subtotal = items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);

  return (
    <div className="bag">
      <TopBar title="BAG" />
      <main className="bag-main">
        <h1 className="bag-title">YOUR BAG</h1>

        {items.length === 0 ? (
          <div className="bag-empty">
            NOTHING HERE YET.
            <br />
            <Link href="/shop">BACK TO DROP 01 →</Link>
          </div>
        ) : (
          <>
            {items.map((i) => (
              <div className="bag-line" key={i.key}>
                <Link href={`/product/${i.slug}`}>
                  <img src={i.image} alt={i.name} />
                </Link>
                <div className="bag-line-info">
                  <div>{i.name}</div>
                  <div>SIZE {i.size} · {i.price === null ? "PRICE TBC" : `$${i.price}`}</div>
                </div>
                <div className="bag-qty">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty(i.key, i.qty - 1)}>
                    −
                  </button>
                  <span>{i.qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty(i.key, i.qty + 1)}>
                    +
                  </button>
                </div>
                <button type="button" className="bag-remove" onClick={() => remove(i.key)}>
                  REMOVE
                </button>
              </div>
            ))}

            <div className="bag-summary">
              <div className="bag-row">
                <span>SUBTOTAL</span>
                <span>{hasTbc ? `$${subtotal} + TBC` : `$${subtotal}`}</span>
              </div>
              <div className="bag-row" style={{ fontWeight: 500 }}>
                <span>DELIVERY</span>
                <span>AT CHECKOUT</span>
              </div>
              <button type="button" className="bag-checkout" disabled>
                CHECKOUT — COMING SOON
              </button>
              <p className="bag-note">Payments are not connected yet. Your bag is saved on this device.</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
