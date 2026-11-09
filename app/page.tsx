'use client'

import { useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import CartNotification from '@/components/CartNotification'
import CinematicIntro from '@/components/sections/CinematicIntro'
import HeroExperience from '@/components/sections/HeroExperience'
import StorytellingSection from '@/components/sections/StorytellingSection'
import LuxuryShowcase from '@/components/sections/LuxuryShowcase'
import Interactive3DSection from '@/components/sections/Interactive3DSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ShowcaseSection from '@/components/sections/ShowcaseSection'
import ExperimentalSection from '@/components/sections/ExperimentalSection'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize GSAP defaults
    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    })

    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main ref={mainRef} className="relative">
      <CustomCursor />
      <Navigation />
      <CartNotification />
      <CinematicIntro />
      <HeroExperience />
      <LuxuryShowcase />
      <StorytellingSection />
      <Interactive3DSection />
      <FeaturesSection />
      <ShowcaseSection />
      <ExperimentalSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
