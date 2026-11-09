'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import gsap from 'gsap'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [currentImage, setCurrentImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0].name)
      setSelectedSize(product.sizes.find(s => s.available)?.label || '')
      setCurrentImage(0)
    }
  }, [product])

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const tl = gsap.timeline()

      tl.from(contentRef.current.querySelectorAll('.animate-in'), {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }
  }, [isOpen, product])

  const handleAddToCart = () => {
    if (!product || !selectedSize) return

    addToCart(product, selectedColor, selectedSize)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const nextImage = () => {
    if (!product) return
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    if (!product) return
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            ref={contentRef}
            className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors interactive"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
              {/* Image Gallery */}
              <div className="animate-in">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-800">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={product.images[currentImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentImage === index ? 'bg-white w-8' : 'bg-white/40'
                            }`}
                            aria-label={`View image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <div className="animate-in text-xs text-zinc-400 uppercase tracking-wider mb-3">
                  {product.category}
                </div>

                <h2 className="animate-in text-4xl md:text-5xl font-display font-bold mb-4">
                  {product.name}
                </h2>

                <div className="animate-in flex items-center gap-4 mb-6">
                  {product.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold">${product.discountPrice}</span>
                      <span className="text-xl text-zinc-400 line-through">${product.price}</span>
                      <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                        SAVE ${product.price - product.discountPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">${product.price}</span>
                  )}
                </div>

                <div className="animate-in flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}
                    />
                  ))}
                  <span className="text-zinc-400 ml-2">({product.rating})</span>
                </div>

                <p className="animate-in text-zinc-300 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="animate-in mb-6">
                  <div className="text-sm font-semibold mb-2">Material</div>
                  <div className="text-zinc-400">{product.material}</div>
                </div>

                <div className="animate-in mb-6">
                  <div className="text-sm font-semibold mb-3">
                    Color: <span className="text-zinc-400">{selectedColor}</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedColor === color.name ? 'border-white scale-110' : 'border-zinc-600'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="animate-in mb-8">
                  <div className="text-sm font-semibold mb-3">Size</div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => size.available && setSelectedSize(size.label)}
                        disabled={!size.available}
                        className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${
                          selectedSize === size.label
                            ? 'bg-white text-black'
                            : size.available
                            ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                            : 'bg-zinc-800/30 text-zinc-600 cursor-not-allowed'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || addedToCart}
                  className="animate-in w-full bg-white text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: selectedSize && !addedToCart ? 1.02 : 1 }}
                  whileTap={{ scale: selectedSize && !addedToCart ? 0.98 : 1 }}
                >
                  <ShoppingBag size={22} />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </motion.button>

                {!selectedSize && (
                  <p className="animate-in text-sm text-amber-500 mt-4 text-center">
                    Please select a size
                  </p>
                )}

                {product.availability === 'low-stock' && (
                  <p className="animate-in text-sm text-amber-500 mt-4 text-center">
                    ⚠️ Only a few items left in stock
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
