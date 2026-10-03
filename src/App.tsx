import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { ProductGrid } from './components/ProductGrid'
import { CartSummary } from './components/CartSummary'
import { ContactForm } from './components/ContactForm'

export default function App() {
  return (
    <CartProvider>
      <div id="top" className="min-h-screen">
        <Header />

        <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <section className="py-12 sm:py-16" aria-labelledby="hero-heading">
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
              Free shipping on orders over $50
            </p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            >
              Everyday essentials, <span className="text-indigo-600">beautifully made.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              A small, curated collection of tools for focused work. Pick what you need and we&apos;ll handle the rest.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex h-11 items-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Shop products
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Get in touch
              </a>
            </div>
          </section>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <ProductGrid />
            <aside className="lg:sticky lg:top-24 lg:mt-[68px]">
              <CartSummary />
            </aside>
          </div>

          <div className="mt-16 max-w-3xl">
            <ContactForm />
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© {new Date().getFullYear()} Northwind Supply. Demo app — no real orders are placed.</p>
            <p>Built with Vite, React &amp; Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}
