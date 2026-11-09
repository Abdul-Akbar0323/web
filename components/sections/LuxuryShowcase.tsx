'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LuxuryProductCard from '@/components/LuxuryProductCard'
import QuickViewModal from '@/components/QuickViewModal'
import { products, Product } from '@/data/products'
import { Sparkles } from 'lucide-react'

export default function LuxuryShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <Sparkles size={20} />
            <span className="text-sm font-medium tracking-wider uppercase">Luxury Collection</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
            Curated Fashion
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Discover our meticulously curated collection of premium garments. Each piece tells a story of craftsmanship and timeless elegance.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <LuxuryProductCard product={product} onQuickView={handleQuickView} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
