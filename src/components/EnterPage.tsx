"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const pad = (n: number) => String(n).padStart(2, "0");

function RegMark({ style }: { style: React.CSSProperties }) {
  return (
    <svg className="enter-mark" style={style} viewBox="0 0 30 30" fill="none" stroke="#141210" strokeWidth="1" aria-hidden="true">
      <circle cx="15" cy="15" r="7" />
      <path d="M15 0v30M0 15h30" />
    </svg>
  );
}

export default function EnterPage() {
  // Clock + date only render in the browser, so the server HTML never mismatches.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const clock = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : "--:--:--";
  const date = now
    ? `${DAYS[now.getDay()]} ${pad(now.getDate())} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`
    : "—";

  return (
    <div className="enter">
      <div className="enter-frame" aria-hidden="true" />
      <div className="enter-frame-inner" aria-hidden="true" />
      <RegMark style={{ left: 30, top: 30 }} />
      <RegMark style={{ right: 30, top: 30 }} />
      <RegMark style={{ left: 30, bottom: 30 }} />
      <RegMark style={{ right: 30, bottom: 30 }} />

      <div className="enter-top">
        <span>001 / 003</span>
        <span className="enter-wordmark">NOBILLS</span>
        <span className="enter-clock">
          <span className="enter-blink">●</span> {clock}
        </span>
      </div>

      <main className="enter-stage">
        <div className="enter-ns" aria-hidden="true">
          <span>N$</span>
        </div>
        <div className="enter-vline" aria-hidden="true" />

        <div className="enter-head">
          <div className="enter-hline" aria-hidden="true" />
          <div className="enter-orbit" aria-hidden="true" />
          <div className="enter-orbit-in" aria-hidden="true" />
          <img src="/brand/head.png" alt="The NOBILLS head — a line drawing of a young man in a beanie" />
          <div className="enter-note" aria-hidden="true" style={{ left: "86%", top: "22%" }}>
            <i />
            <span>FIG. 01</span>
          </div>
          <div className="enter-note" aria-hidden="true" style={{ right: "88%", bottom: "20%", color: "#B6401D" }}>
            <span>Ø — THE IDEA</span>
            <i />
          </div>
        </div>

        <div className="enter-cta">
          <Link href="/shop" className="enter-button">
            ENTER
          </Link>
          <p className="enter-tagline">No limit, no label.</p>
        </div>
      </main>

      <div className="enter-bottom">
        <nav className="enter-social" aria-label="Social">
          <a href="#" aria-disabled="true">INSTAGRAM ↗</a>
          <a href="#" aria-disabled="true">TIKTOK ↗</a>
          <a href="#" aria-disabled="true">CONTACT ↗</a>
        </nav>
        <table className="titleblock">
          <tbody>
            <tr>
              <th scope="row">PROJECT</th>
              <td className="tb-name">NOBILLS</td>
            </tr>
            <tr>
              <th scope="row">DRAWING</th>
              <td>DROP 01 — UNITS 1–3</td>
            </tr>
            <tr>
              <th scope="row">DESIGNED BY</th>
              <td>OTEE</td>
            </tr>
            <tr>
              <th scope="row">DATE</th>
              <td style={{ fontVariantNumeric: "tabular-nums" }}>{date}</td>
            </tr>
            <tr>
              <th scope="row">SCALE</th>
              <td>1 : 1 — WEAR IT</td>
            </tr>
            <tr>
              <td colSpan={2} className="tb-motto">
                NEVER OVERLOOK BRIGHT IDEAS, LIVE &amp; LEARN STRATEGICALLY.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
