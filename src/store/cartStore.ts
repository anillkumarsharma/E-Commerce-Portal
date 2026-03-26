import { makeObservable, observable, action, computed } from 'mobx'
import type { CartItem, Product } from '../types'

class CartStore {
  // LOGIC: observable array - MobX will track any changes to this array
  items: CartItem[] = []

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action,
      removeItem: action,
      clearCart: action,
      increaseQuantity: action,
      decreaseQuantity: action,
      totalItems: computed,
      totalPrice: computed,
    })

    // LOGIC: Load persisted cart from localStorage when app starts
    this.loadFromStorage()
  }

  // LOGIC: Add item to cart
  // - If product already in cart, increase its quantity by 1
  // - If new product, push it with quantity = 1
  addItem = (product: Product): void => {
    // LOGIC: aapko yahan apni logic likhni hai
    const existing = this.items.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
    this.saveToStorage()
  }

  // LOGIC: Remove item from cart by product id
  removeItem = (productId: number): void => {
    // LOGIC: aapko yahan apni logic likhni hai
    this.items = this.items.filter((item) => item.id !== productId)
    this.saveToStorage()
  }

  // LOGIC: Clear entire cart
  clearCart = (): void => {
    this.items = []
    this.saveToStorage()
  }

  // LOGIC: Computed - total number of items (sum of all quantities)
  get totalItems(): number {
    // LOGIC: aapko yahan apni logic likhni hai
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  // LOGIC: Computed - total price (price × quantity for each item, summed)
  get totalPrice(): number {
    // LOGIC: aapko yahan apni logic likhni hai
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  increaseQuantity = (productId: number): void => {
    const item = this.items.find((i) => i.id === productId)
    if (item) {
      item.quantity += 1
      this.saveToStorage()
    }
  }

  decreaseQuantity = (productId: number): void => {
    const item = this.items.find((i) => i.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        this.items = this.items.filter((i) => i.id !== productId)
      }
      this.saveToStorage()
    }
  }

  // LOGIC: Check if a specific product is already in cart
  isInCart = (productId: number): boolean => {
    return this.items.some((item) => item.id === productId)
  }

  // LOGIC: Save current cart items to localStorage (bonus: persistence)
  private saveToStorage = (): void => {
    localStorage.setItem('cart', JSON.stringify(this.items))
  }

  // LOGIC: Load cart items from localStorage on app init
  private loadFromStorage = (): void => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        this.items = JSON.parse(stored) as CartItem[]
      } catch {
        // LOGIC: If stored data is corrupted, start with empty cart
        this.items = []
      }
    }
  }
}

// LOGIC: Single instance exported - same store used across entire app
export const cartStore = new CartStore()
