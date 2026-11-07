# NOBILLS

**No limit, no label.** Luxury streetwear designed by Otee.
*Never Overlook Bright Ideas, Live & Learn Strategically.*

## Pages

| Route | What it is |
|---|---|
| `/` | ENTER — blueprint sheet, the NOBILLS head in a turning orbit, outlined N$, live clock and date |
| `/shop` | Drop 01 — white colourway on a black half, black colourway on a light half; hover for the back; `+` → size → ADDING |
| `/product/[slug]` | Each piece floats on its own colour; drag or tap to turn front/back; WHITE / BLACK switch; arrows through all six |
| `/cart` | The bag, saved on the device. Checkout is off until payments are connected |

## Drop 01

Units 1–3, each in white and black. Data lives in `src/lib/products.ts` — set prices there
(`null` shows "PRICE TBC"). Images are in `public/drop01/` as `u{unit}-{colour}-{front|back}.png`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Built with Next.js 15, React 19 and zustand. Deploy: import this repo into Vercel — no settings needed.
