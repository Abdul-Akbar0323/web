'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ExperimentalSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  class Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 2
      this.vy = (Math.random() - 0.5) * 2
      this.size = Math.random() * 3 + 1
      this.color = Math.random() > 0.5 ? '#6366f1' : '#8b5cf6'
    }

    update(mouseX: number, mouseY: number, width: number, height: number) {
      // Mouse interaction
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const angle = Math.atan2(dy, dx)
        this.vx -= Math.cos(angle) * force * 0.5
        this.vy -= Math.sin(angle) * force * 0.5
      }

      // Update position
      this.x += this.vx
      this.y += this.vy

      // Friction
      this.vx *= 0.98
      this.vy *= 0.98

      // Boundary wrap
      if (this.x < 0) this.x = width
      if (this.x > width) this.x = 0
      if (this.y < 0) this.y = height
      if (this.y > height) this.y = 0
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()

      // Glow effect
      ctx.shadowBlur = 10
      ctx.shadowColor = this.color
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const particleCount = window.innerWidth < 768 ? 50 : 100
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      )
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(
          mouseRef.current.x,
          mouseRef.current.y,
          canvas.width,
          canvas.height
        )
        particle.draw(ctx)
      })

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section
      id="interactive"
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
            Interactive Particle System
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
            Move your cursor to interact with the particle field. Each element responds to your presence, creating a unique experience every time.
          </p>
          <motion.div
            className="inline-block px-6 py-3 glass rounded-full text-sm font-mono"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-accent">●</span> REAL-TIME RENDERING
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-70" />
    </section>
  )
}
