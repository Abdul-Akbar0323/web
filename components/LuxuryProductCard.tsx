'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { Star, ShoppingBag, Eye } from 'lucide-react'

interface LuxuryProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
}

export default function LuxuryProductCard({ product, onQuickView }: LuxuryProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find(s => s.available)?.label || ''
  )
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !detailsRef.current) return

    const card = cardRef.current
    const image = imageRef.current
    const details = detailsRef.current

    // Cleanup previous timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    if (isHovered) {
      // Create hover timeline
      const tl = gsap.timeline()

      // 0-150ms: Initial image and container transformation
      tl.to(image, {
        scale: 1.05,
        rotateY: 2,
        rotateX: -2,
        duration: 0.15,
        ease: 'power2.out',
      }, 0)

      tl.to(card, {
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
        duration: 0.15,
        ease: 'power2.out',
      }, 0)

      // 150-300ms: Details panel reveal
      tl.to(details, {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: 'power2.out',
      }, 0.15)

      // 300-450ms: Stagger child elements
      tl.from(details.querySelectorAll('.detail-item'), {
        opacity: 0,
        y: 20,
        duration: 0.15,
        stagger: 0.05,
        ease: 'power2.out',
      }, 0.3)

      // 450-650ms: Color and size options
      tl.from(details.querySelectorAll('.color-option, .size-option'), {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      }, 0.45)

      // 650-800ms: Action buttons
      tl.from(details.querySelectorAll('.action-button'), {
        opacity: 0,
        y: 20,
        duration: 0.15,
        stagger: 0.075,
        ease: 'power3.out',
      }, 0.65)

      timelineRef.current = tl
    } else {
      // Reverse animation
      const tl = gsap.timeline()

      tl.to(image, {
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })

      tl.to(details, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: 'power2.inOut',
      }, 0)

      tl.to(card, {
        boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        duration: 0.2,
        ease: 'power2.inOut',
      }, 0)

      timelineRef.current = tl
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isHovered])

  const handleAddToCart = () => {
    if (!selectedSize) return

    addToCart(product, selectedColor, selectedSize)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 30
    const rotateY = (centerX - x) / 30

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className="relative group interactive"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative bg-zinc-900 rounded-2xl overflow-hidden transition-all duration-300">
        {/* Product Image */}
        <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Discount Badge */}
          {product.discountPrice && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              SAVE ${product.price - product.discountPrice}
            </div>
          )}

          {/* Stock Status */}
          {product.availability === 'low-stock' && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
              LOW STOCK
            </div>
          )}

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImage === index ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Basic Info (Always Visible) */}
        <div className="p-6">
          <div className="text-xs text-zinc-400 uppercase tracking-wider mb-2">{product.category}</div>
          <h3 className="text-lg font-display font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center gap-3 mb-2">
            {product.discountPrice ? (
              <>
                <span className="text-xl font-bold">${product.discountPrice}</span>
                <span className="text-sm text-zinc-400 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold">${product.price}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}
              />
            ))}
            <span className="text-sm text-zinc-400 ml-2">{product.rating}</span>
          </div>
        </div>

        {/* Detailed Information (Hover Reveal) */}
        <div
          ref={detailsRef}
          className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm p-6 opacity-0 translate-y-5"
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="detail-item text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h3 className="detail-item text-2xl font-display font-bold mb-3">{product.name}</h3>

              <div className="detail-item flex items-center gap-3 mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold text-white">${product.discountPrice}</span>
                    <span className="text-lg text-zinc-400 line-through">${product.price}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-white">${product.price}</span>
                )}
              </div>

              <p className="detail-item text-sm text-zinc-300 mb-4 line-clamp-2">{product.description}</p>

              <div className="detail-item text-xs text-zinc-400 mb-4">
                <span className="font-semibold text-white">Material:</span> {product.material}
              </div>

              {/* Colors */}
              <div className="mb-4">
                <div className="detail-item text-xs text-zinc-400 mb-2">COLOR: {selectedColor}</div>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`color-option w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-white scale-110' : 'border-zinc-600'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <div className="detail-item text-xs text-zinc-400 mb-2">SIZE</div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => size.available && setSelectedSize(size.label)}
                      disabled={!size.available}
                      className={`size-option px-4 py-2 text-sm font-medium rounded-lg transition-all ${
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
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize || addedToCart}
                className="action-button flex-1 bg-white text-black px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: selectedSize && !addedToCart ? 1.02 : 1 }}
                whileTap={{ scale: selectedSize && !addedToCart ? 0.98 : 1 }}
              >
                <ShoppingBag size={18} />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </motion.button>

              <motion.button
                onClick={() => onQuickView(product)}
                className="action-button bg-zinc-800 px-6 py-3 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Quick view"
              >
                <Eye size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
