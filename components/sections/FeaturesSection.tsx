'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Boxes, Sparkles, Zap, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Boxes,
    title: 'Creative Development',
    description: 'Pushing the boundaries of web technology with innovative solutions and experimental approaches.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: '3D Experiences',
    description: 'Immersive three-dimensional environments that captivate and engage your audience.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Motion Design',
    description: 'Sophisticated animations that bring your brand story to life with fluid transitions.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'WebGL Solutions',
    description: 'Hardware-accelerated graphics for stunning visual effects and unparalleled performance.',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Stagger animation for cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: -20,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
          },
        }
      )

      // Hover parallax effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: 'power2.out',
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && cardsRef.current.includes(trigger.vars.trigger as any)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-black to-purple-950/30 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
            Our Expertise
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Combining technical mastery with creative vision to deliver extraordinary digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
ref={(el) => {
  cardsRef.current[index] = el;
}}              className="group relative p-8 glass rounded-3xl interactive cursor-pointer transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="text-white" size={32} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:gradient-accent transition-all duration-500">
                {feature.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-accent-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
