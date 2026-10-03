import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartLine {
  product: Product
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  addToCart: (product: Product) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  const addToCart = useCallback((product: Product) => {
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id)
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    // ─────────────────────────────────────────────────────────────────────
    // 🔧 DEMO BREAK POINT #2 — CART COUNTER
    // The header badge shows `itemCount`. To make the counter stop updating
    // when items are added, change the line below to:
    //
    //     const itemCount = 0
    //
    // TestSprite's "add to cart updates the header counter" test will fail.
    // ─────────────────────────────────────────────────────────────────────
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0)
    return { lines, itemCount, subtotal, addToCart, clearCart }
  }, [lines, addToCart, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
