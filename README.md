# Aura Herbal Store

A React + Tailwind rebuild of the Aura Herbal Store site — home, products, about and
a checkout page with a working cart, all in one app.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (includes npm)

## Setup

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a `dist/` folder you can upload to any static host (Netlify, Vercel,
cPanel, etc.).

## What's included

- `src/App.jsx` — the whole app: header/nav, home, products, about, checkout,
  cart drawer, footer
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind imports
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup
- `vite.config.js` — Vite build config

## Notes

- The cart and checkout are fully functional on the front end (add/remove items,
  update quantities, running total, order confirmation with an order number) —
  there's **no live payment gateway** connected. To take real payments you'd wire
  the checkout submit handler in `App.jsx` up to a provider like PayFast, Yoco,
  Stripe, or Paystack (all support South African cards/EFT).
- Product photography isn't included — the cards currently use simple icon marks
  as placeholders. Swap in real product photos by adding an `<img>` inside each
  `ProductCard`.
- Social links (WhatsApp, Instagram, Facebook) in the footer point to the accounts
  from the original site — update these if the client's handles change.
- Fonts (Fraunces, Work Sans) load from Google Fonts at runtime — if you need the
  site to work fully offline, download the font files and self-host them instead.
