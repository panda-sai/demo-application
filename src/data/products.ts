export interface Product {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  /** Tailwind gradient classes for the product image tile */
  tint: string
  tag?: string
}

export const products: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Headphones',
    description: 'Wireless over-ear headphones with 40-hour battery and active noise cancelling.',
    price: 129,
    emoji: '🎧',
    tint: 'from-indigo-100 to-violet-200',
    tag: 'Bestseller',
  },
  {
    id: 'nimbus-keyboard',
    name: 'Nimbus Keyboard',
    description: 'Low-profile mechanical keyboard with hot-swappable switches and soft backlight.',
    price: 89,
    emoji: '⌨️',
    tint: 'from-sky-100 to-cyan-200',
  },
  {
    id: 'ember-mug',
    name: 'Ember Smart Mug',
    description: 'Keeps your coffee at exactly the right temperature for up to 90 minutes.',
    price: 49,
    emoji: '☕',
    tint: 'from-amber-100 to-orange-200',
    tag: 'New',
  },
  {
    id: 'terra-backpack',
    name: 'Terra Backpack',
    description: 'Weatherproof 20L daypack with a padded laptop sleeve and hidden pockets.',
    price: 75,
    emoji: '🎒',
    tint: 'from-emerald-100 to-teal-200',
  },
  {
    id: 'lumen-lamp',
    name: 'Lumen Desk Lamp',
    description: 'Dimmable LED lamp with adjustable color temperature and USB-C charging.',
    price: 59,
    emoji: '💡',
    tint: 'from-yellow-100 to-lime-200',
  },
  {
    id: 'orbit-speaker',
    name: 'Orbit Speaker',
    description: 'Compact Bluetooth speaker with 360° sound and a 12-hour battery.',
    price: 39,
    emoji: '🔊',
    tint: 'from-rose-100 to-pink-200',
  },
]

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
