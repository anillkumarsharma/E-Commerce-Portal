import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { cartStore } from '../store/cartStore'

// LOGIC: Context banao with the MobX store type
// CartContext provides the MobX cartStore instance to all child components
const CartContext = createContext<typeof cartStore>(cartStore)

interface CartProviderProps {
  children: ReactNode
}

// LOGIC: Provider component - wrap the entire app inside this
// Any component inside can access cartStore via useCart()
export const CartProvider = ({ children }: CartProviderProps) => {
  return (
    <CartContext.Provider value={cartStore}>
      {children}
    </CartContext.Provider>
  )
}

// LOGIC: Custom hook - components call useCart() instead of useContext(CartContext)
// This is the bridge between React Context and MobX store
export const useCart = (): typeof cartStore => {
  return useContext(CartContext)
}

