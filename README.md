# Northwind Supply — TestSprite Demo App

A small, polished storefront built to demo **[TestSprite](https://www.testsprite.com/)** (AI testing that runs real browser sessions against a live app). It has two easy-to-test flows:

1. **Shopping cart:** a product grid with "Add to Cart" buttons, a live cart counter in the header, a cart summary with subtotal, and a "Clear Cart" button.
2. **Contact form:** Name / Email / Message with client-side validation and a clear success state.

No backend. Everything runs in the browser.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4

---

## Run locally

Requires **Node.js 20.19+** (Node 22 recommended; there's an `.nvmrc`).

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. The port is fixed (`strictPort`), so the URL is always the same for TestSprite.

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the dev server at `localhost:5173`    |
| `npm run build`     | Type-check and build to `dist/`             |
| `npm run preview`   | Serve the production build at `localhost:4173` |
| `npm run typecheck` | Type-check only                             |

---

## Deploy (zero config)

The output is a static site in `dist/`.

- **Vercel:** import the repo and click Deploy. Vite is detected automatically (`vercel.json` pins it too).
- **Netlify:** import the repo and click Deploy. `netlify.toml` sets the build command, output folder and Node version.
- **Cloudflare Pages:** import the repo and choose the **Vite** (or React (Vite)) framework preset. That means build command `npm run build` and output directory `dist`. Node is picked up from `.nvmrc`.

---

## 🔧 Breaking the app on purpose (for the demo)

Two lines are marked with a `🔧 DEMO BREAK POINT` comment. Change one, save, and re-run TestSprite to show it catching the bug.

### #1: Success message never appears
**File:** `src/components/ContactForm.tsx`. Search for `DEMO BREAK POINT #1`.

```diff
- setStatus('success')
+ setStatus('idle')
```
The form still shows "Sending…" but never shows *"Thank you! Your message has been sent."*

### #2: Cart counter stops updating
**File:** `src/context/CartContext.tsx`. Search for `DEMO BREAK POINT #2`.

```diff
- const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
+ const itemCount = 0
```
"Add to Cart" still adds items to the cart summary, but the header badge stays at `0`.

Revert the line (`git checkout .`) to fix the app again.

---

## Test selectors

Every interactive element has a visible label, an accessible name, and a stable `data-testid`.

### Header / cart
| Element                     | Selector                                   | Notes |
| --------------------------- | ------------------------------------------ | ----- |
| Cart link (header)          | `[data-testid="cart-button"]`              | aria-label: `Shopping cart, N items` |
| Cart counter badge          | `[data-testid="cart-count"]`               | Text is the total quantity |
| Product list                | `[data-testid="product-list"]`             | 6 products |
| Product card                | `[data-testid="product-card-{id}"]`        | e.g. `product-card-aurora-headphones` |
| Add to Cart button          | `[data-testid="add-to-cart-{id}"]`         | aria-label: `Add {Product Name} to cart` |
| Cart summary panel          | `[data-testid="cart-summary"]`             | |
| Empty cart message          | `[data-testid="cart-empty"]`               | "Your cart is empty" |
| Cart line item / quantity   | `[data-testid="cart-item-{id}"]`, `[data-testid="cart-item-qty-{id}"]` | |
| Subtotal                    | `[data-testid="cart-subtotal"]`            | e.g. `$129.00` |
| Clear Cart button           | `[data-testid="clear-cart"]`               | Disabled when the cart is empty |

Product IDs: `aurora-headphones`, `nimbus-keyboard`, `ember-mug`, `terra-backpack`, `lumen-lamp`, `orbit-speaker`.

### Contact form
| Element               | Selector                                         | Notes |
| --------------------- | ------------------------------------------------ | ----- |
| Form                  | `[data-testid="contact-form"]`                   | |
| Name / Email / Message | `[data-testid="contact-{name\|email\|message}-input"]` | Each has a `<label>` |
| Field errors          | `[data-testid="contact-{field}-error"]`          | `role="alert"` |
| Submit button         | `[data-testid="contact-submit"]`                 | Text: "Send Message" ("Sending…" while submitting) |
| Success panel         | `[data-testid="contact-success"]`                | `role="status"` |
| Success text          | `[data-testid="contact-success-message"]`        | Exactly: `Thank you! Your message has been sent.` |
| Send another          | `[data-testid="contact-send-another"]`           | Returns to an empty form |

**Validation rules:** all fields are required, and the email must look like `name@domain.tld`. Error messages are "Name is required.", "Email is required.", "Please enter a valid email address." and "Message is required."

---

## Suggested TestSprite test cases

1. Adding one product sets the header counter to `1`. Adding it again sets it to `2`.
2. Adding two different products lists both in the cart summary with the right subtotal.
3. "Clear Cart" resets the counter to `0` and shows "Your cart is empty".
4. Submitting the empty form shows three "required" errors and no success message.
5. Submitting with `jane@example` shows "Please enter a valid email address."
6. Submitting valid data shows "Thank you! Your message has been sent."

---

## Project structure

```
├── index.html
├── public/favicon.svg
├── src/
│   ├── main.tsx              # React entry
│   ├── App.tsx               # Page layout (hero, products, cart, contact)
│   ├── index.css             # Tailwind import + base styles
│   ├── data/products.ts      # Mock product catalogue
│   ├── context/CartContext.tsx   # Cart state  (🔧 break point #2)
│   └── components/
│       ├── Header.tsx        # Logo, nav, cart counter
│       ├── ProductGrid.tsx
│       ├── ProductCard.tsx   # Add to Cart button
│       ├── CartSummary.tsx   # Line items, subtotal, Clear Cart
│       └── ContactForm.tsx   # Validation + success state (🔧 break point #1)
├── netlify.toml / vercel.json / .nvmrc   # Deploy settings
└── vite.config.ts
```
