'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const image = imageRef.current

    if (!section || !content || !image) return

    // Pin section while content animates
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      },
    })

    // Animate text elements
    const words = content.querySelectorAll('.story-word')
    tl.from(words, {
      opacity: 0.3,
      scale: 0.95,
      stagger: 0.1,
      duration: 1,
    })

    // Parallax image
    gsap.to(image, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: 100,
      ease: 'none',
    })

    // Background color transition
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
      backgroundColor: '#0a0514',
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  const storyText = [
    'We',
    'believe',
    'in',
    'the',
    'power',
    'of',
    'digital',
    'storytelling.',
    'Every',
    'pixel,',
    'every',
    'animation,',
    'every',
    'interaction',
    'is',
    'crafted',
    'to',
    'create',
    'meaningful',
    'connections',
    'between',
    'brands',
    'and',
    'people.',
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-4">
            <div className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              {storyText.map((word, index) => (
                <span
                  key={index}
                  className="story-word inline-block mr-4 mb-2 gradient-text"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent-secondary/30 backdrop-blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-accent to-accent-secondary rounded-full blur-3xl opacity-50 animate-pulse" />
            </div>
            <div className="absolute inset-0 glass" />
          </div>
        </div>
      </div>

      {/* Ambient light effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  )
}
