import { products } from '../data/products'
import { ProductCard } from './ProductCard'

export function ProductGrid() {
  return (
    <section id="products" aria-labelledby="products-heading" className="scroll-mt-24">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 id="products-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
            Featured products
          </h2>
          <p className="mt-1 text-sm text-slate-500">Thoughtfully designed gear for your desk and day.</p>
        </div>
        <p className="hidden text-sm text-slate-400 sm:block">{products.length} items</p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="product-list" aria-label="Products">
        {products.map((product) => (
          <li key={product.id} className="flex">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
