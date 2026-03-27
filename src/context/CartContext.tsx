import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '../types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  isInCart: (productId: number) => boolean
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

const loadFromStorage = (): CartItem[] => {
  const stored = localStorage.getItem('cart')
  if (stored) {
    try {
      return JSON.parse(stored) as CartItem[]
    } catch {
      return []
    }
  }
  return []
}

const saveToStorage = (items: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(items))
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage)

  const addItem = (product: Product): void => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      const updated = existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }]
      saveToStorage(updated)
      return updated
    })
  }

  const removeItem = (productId: number): void => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== productId)
      saveToStorage(updated)
      return updated
    })
  }

  const clearCart = (): void => {
    setItems([])
    saveToStorage([])
  }

  const increaseQuantity = (productId: number): void => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
      saveToStorage(updated)
      return updated
    })
  }

  const decreaseQuantity = (productId: number): void => {
    setItems((prev) => {
      const updated = prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
      saveToStorage(updated)
      return updated
    })
  }

  const isInCart = (productId: number): boolean => {
    return items.some((item) => item.id === productId)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
