'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/data/products'

interface CartItem extends Product {
  quantity: number
  selectedColor: string
  selectedSize: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, color: string, size: string) => void
  removeFromCart: (productId: string) => void
  cartCount: number
  showNotification: boolean
  lastAddedProduct: Product | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null)

  const addToCart = (product: Product, color: string, size: string) => {
    setCart(prev => {
      const existingItem = prev.find(
        item => item.id === product.id && item.selectedColor === color && item.selectedSize === size
      )

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1, selectedColor: color, selectedSize: size }]
    })

    setLastAddedProduct(product)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount, showNotification, lastAddedProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
