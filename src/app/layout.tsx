import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import CartHydrator from "@/components/CartHydrator";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "NOBILLS — No limit, no label",
  description:
    "NOBILLS — luxury streetwear designed by Otee. Never Overlook Bright Ideas, Live & Learn Strategically.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <CartHydrator />
        {children}
      </body>
    </html>
  );
}
