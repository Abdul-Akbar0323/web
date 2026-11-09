'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sparkles } from 'lucide-react'
import FloatingGeometry from '@/components/3d/FloatingGeometry'

gsap.registerPlugin(ScrollTrigger)

export default function HeroExperience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subheading = subheadingRef.current

    if (!section || !heading || !subheading) return

    // Split text for character animation
    const headingText = heading.textContent || ''
    heading.innerHTML = headingText
      .split('')
      .map((char, i) => `<span class="inline-block" style="opacity: 0">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

    const chars = heading.querySelectorAll('span')

    // Main timeline
    const tl = gsap.timeline({
      delay: 2.5,
    })

    // Animate heading characters
    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Animate subheading
    tl.from(
      subheading,
      {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.4'
    )

    // Scroll-triggered animations
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0.5,
      scale: 0.95,
      ease: 'none',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-black to-purple-950/20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 canvas-container">
        <FloatingGeometry />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-6 flex items-center justify-center gap-2 text-accent"
        >
          <Sparkles size={20} />
          <span className="text-sm font-medium tracking-wider uppercase">Digital Excellence</span>
        </motion.div>

        <h1
          ref={headingRef}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-none"
          style={{ perspective: '1000px' }}
        >
          Immersive Digital Experiences
        </h1>

        <p
          ref={subheadingRef}
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12"
        >
          We craft extraordinary web experiences that blend cutting-edge technology with breathtaking design
        </p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
        >
          <motion.button
            className="group px-8 py-4 bg-accent rounded-full font-medium flex items-center gap-2 interactive relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Our Work</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.button>

          <motion.button
            className="px-8 py-4 glass rounded-full font-medium interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
