import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export function CartSummary() {
  const { lines, itemCount, subtotal, clearCart } = useCart()
  const isEmpty = lines.length === 0

  return (
    <section
      id="cart"
      aria-labelledby="cart-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      data-testid="cart-summary"
    >
      <div className="flex items-center justify-between">
        <h2 id="cart-heading" className="text-lg font-semibold text-slate-900">
          Your cart
        </h2>
        <span className="text-sm text-slate-500" data-testid="cart-summary-count">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {isEmpty ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center" data-testid="cart-empty">
          <p className="text-sm font-medium text-slate-700">Your cart is empty</p>
          <p className="mt-1 text-sm text-slate-400">Add a product to get started.</p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100" data-testid="cart-items" aria-label="Cart items">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-3 py-3" data-testid={`cart-item-${product.id}`}>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-xl ${product.tint}`}
                aria-hidden="true"
              >
                {product.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{product.name}</p>
                <p className="text-xs text-slate-500">
                  Qty <span data-testid={`cart-item-qty-${product.id}`}>{quantity}</span>
                </p>
              </div>
              <p className="text-sm font-medium tabular-nums text-slate-900">
                {formatPrice(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-500">Subtotal</span>
        <span className="text-base font-semibold tabular-nums text-slate-900" data-testid="cart-subtotal">
          {formatPrice(subtotal)}
        </span>
      </div>

      <button
        type="button"
        onClick={clearCart}
        disabled={isEmpty}
        className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700"
        aria-label="Clear cart"
        data-testid="clear-cart"
      >
        Clear Cart
      </button>
    </section>
  )
}
