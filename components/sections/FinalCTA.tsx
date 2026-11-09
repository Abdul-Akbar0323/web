'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current

    if (!section || !text) return

    // Parallax background
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      backgroundPosition: '50% 100%',
      ease: 'none',
    })

    // Text reveal
    gsap.from(text, {
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
      scale: 0.8,
      opacity: 0.3,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 via-black to-blue-950"
      style={{ backgroundSize: '200% 200%', backgroundPosition: '50% 0%' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-accent mb-6">
              Ready to start?
            </span>
          </div>

          <h2
            ref={textRef}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight"
          >
            Let's Create Something
            <br />
            <span className="gradient-accent">Extraordinary</span>
          </h2>

          <p className="text-xl text-secondary max-w-3xl mx-auto mb-12">
            Transform your digital presence with cutting-edge design and technology.
            Get in touch to discuss your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              className="group px-10 py-5 bg-accent rounded-full font-medium text-lg flex items-center gap-3 interactive relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.button>

            <motion.button
              className="px-10 py-5 glass rounded-full font-medium text-lg interactive hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Case Studies
            </motion.button>
          </div>

          {/* Contact info */}
          <motion.div
            className="mt-16 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 text-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <div className="text-sm uppercase tracking-wider mb-1">Email</div>
              <a href="mailto:hello@nexus.studio" className="text-white hover:text-accent transition-colors interactive">
                hello@nexus.studio
              </a>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div>
              <div className="text-sm uppercase tracking-wider mb-1">Phone</div>
              <a href="tel:+1234567890" className="text-white hover:text-accent transition-colors interactive">
                +1 (234) 567-890
              </a>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div>
              <div className="text-sm uppercase tracking-wider mb-1">Location</div>
              <span className="text-white">San Francisco, CA</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
