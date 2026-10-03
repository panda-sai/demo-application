import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'

export function Header() {
  const { itemCount } = useCart()
  const [bump, setBump] = useState(false)
  const previousCount = useRef(itemCount)

  // Briefly animate the badge whenever the count goes up.
  useEffect(() => {
    if (itemCount > previousCount.current) {
      setBump(true)
      const timer = setTimeout(() => setBump(false), 300)
      previousCount.current = itemCount
      return () => clearTimeout(timer)
    }
    previousCount.current = itemCount
  }, [itemCount])

  return (
    <header
      className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur"
      data-testid="site-header"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Northwind Supply home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
            <BagIcon className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Northwind Supply</span>
        </a>

        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
          <a
            href="#products"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
          >
            Products
          </a>
          <a
            href="#contact"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
          >
            Contact
          </a>
          <a
            href="#cart"
            className="relative ml-1 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            data-testid="cart-button"
          >
            <CartIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-semibold tabular-nums transition-transform duration-300 ${
                itemCount > 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
              } ${bump ? 'scale-125' : 'scale-100'}`}
              data-testid="cart-count"
              aria-live="polite"
            >
              {itemCount}
            </span>
          </a>
        </nav>
      </div>
    </header>
  )
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Zm4 0V7a3 3 0 0 1 6 0v1" />
    </svg>
  )
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.5L21 8H6.2" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  )
}
