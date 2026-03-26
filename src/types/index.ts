// ─── Product Types ───────────────────────────────────────────────────────────

export interface Rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem extends Product {
  // LOGIC: quantity tracks how many of the same product are in cart
  quantity: number
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export type SortOrder = 'asc' | 'desc' | ''
