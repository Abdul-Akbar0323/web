'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function CartNotification() {
  const { showNotification, lastAddedProduct } = useCart()

  return (
    <AnimatePresence>
      {showNotification && lastAddedProduct && (
        <motion.div
          className="fixed top-24 right-6 z-[90] w-80 glass rounded-2xl p-4 shadow-2xl"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Added to Cart</h4>
              <p className="text-sm text-zinc-400">{lastAddedProduct.name}</p>
              <p className="text-sm text-white font-bold mt-1">
                ${lastAddedProduct.discountPrice || lastAddedProduct.price}
              </p>
            </div>
            <div className="flex-shrink-0">
              <ShoppingBag size={20} className="text-zinc-400" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
