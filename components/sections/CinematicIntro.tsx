'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

export default function CinematicIntro() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isLoading && sectionRef.current) {
      // Animate intro exit
      const tl = gsap.timeline({
        delay: 1.5,
        onComplete: () => {
          if (sectionRef.current) {
            sectionRef.current.style.display = 'none'
          }
        },
      })

      tl.to(sectionRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      })

      // Animate circles
      circleRefs.current.forEach((circle, index) => {
        if (circle) {
          gsap.to(circle, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.in',
          })
        }
      })
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.section
          ref={sectionRef}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated background circles */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                ref={el => (circleRefs.current[i] = el)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Loading content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold gradient-accent mb-8">
                NEXUS
              </h1>
            </motion.div>

            <motion.div
              className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-secondary"
                style={{ width: `${loadProgress}%` }}
              />
            </motion.div>

            <motion.p
              className="text-secondary mt-4 font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {loadProgress}%
            </motion.p>
          </div>

          <style jsx>{`
            @keyframes pulse {
              0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.3;
              }
              50% {
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 0.1;
              }
            }
          `}</style>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
