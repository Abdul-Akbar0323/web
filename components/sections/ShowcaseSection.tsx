'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Stellar Interface',
    category: 'UI/UX Design',
    description: 'A revolutionary space exploration platform with immersive 3D navigation.',
    color: 'from-blue-600 to-purple-600',
    year: '2026',
  },
  {
    title: 'Neural Network',
    category: 'Data Visualization',
    description: 'Real-time AI visualization dashboard with particle-based interactions.',
    color: 'from-green-600 to-teal-600',
    year: '2026',
  },
  {
    title: 'Quantum Realm',
    category: 'WebGL Experience',
    description: 'An experimental journey through abstract digital landscapes.',
    color: 'from-pink-600 to-red-600',
    year: '2025',
  },
  {
    title: 'Holographic UI',
    category: 'Interface Design',
    description: 'Next-generation holographic interface for immersive applications.',
    color: 'from-yellow-600 to-orange-600',
    year: '2025',
  },
  {
    title: 'Cyber Nexus',
    category: 'Digital Platform',
    description: 'A cutting-edge platform for digital creators and innovators.',
    color: 'from-indigo-600 to-violet-600',
    year: '2026',
  },
]

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    // Horizontal scroll animation
    const scrollWidth = container.scrollWidth - window.innerWidth

    gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      <div className="absolute top-12 left-6 z-20">
        <motion.h2
          className="text-4xl md:text-6xl font-display font-bold gradient-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Featured Work
        </motion.h2>
      </div>

      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-6"
        style={{ width: `${projects.length * 600}px` }}
      >
        {/* Spacer for initial scroll */}
        <div className="w-screen flex-shrink-0" />

        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="relative w-[500px] h-[600px] flex-shrink-0 group interactive"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass">
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-mono text-white/60">{project.year}</span>
                  <motion.div
                    className="w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                  >
                    <ExternalLink size={20} />
                  </motion.div>
                </div>

                <div>
                  <div className="text-sm font-medium text-white/60 mb-2">{project.category}</div>
                  <h3 className="text-4xl font-display font-bold mb-4">{project.title}</h3>
                  <p className="text-white/80">{project.description}</p>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />

              {/* Animated border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl" style={{
                  background: `linear-gradient(90deg, transparent, white, transparent)`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s infinite',
                  WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '2px',
                }} />
              </div>
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div className="w-screen flex-shrink-0" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}
