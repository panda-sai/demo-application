import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice, type Product } from '../data/products'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 1200)
    return () => clearTimeout(timer)
  }, [justAdded])

  function handleAdd() {
    addToCart(product)
    setJustAdded(true)
  }

  return (
    <article
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70"
      data-testid={`product-card-${product.id}`}
      aria-labelledby={`product-name-${product.id}`}
    >
      <div className={`relative grid aspect-[4/3] place-items-center bg-gradient-to-br ${product.tint}`}>
        <span className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          {product.emoji}
        </span>
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 id={`product-name-${product.id}`} className="font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="font-semibold tabular-nums text-slate-900" data-testid={`product-price-${product.id}`}>
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-slate-500">{product.description}</p>

        <button
          type="button"
          onClick={handleAdd}
          className={`mt-1 inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-white hover:bg-slate-700'
          }`}
          aria-label={`Add ${product.name} to cart`}
          data-testid={`add-to-cart-${product.id}`}
        >
          {justAdded ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
