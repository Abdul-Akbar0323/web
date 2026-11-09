'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

const footerLinks = [
  {
    title: 'Services',
    links: ['Creative Development', '3D Experiences', 'Motion Design', 'WebGL Solutions'],
  },
  {
    title: 'Company',
    links: ['About', 'Work', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies'],
  },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black pt-20 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.h3
              className="text-4xl font-display font-bold gradient-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              NEXUS
            </motion.h3>
            <motion.p
              className="text-secondary text-sm max-w-xs mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Creating extraordinary digital experiences that push the boundaries of web technology.
            </motion.p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-secondary hover:text-primary hover:border-accent transition-all interactive"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title}>
              <motion.h4
                className="font-display font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                {section.title}
              </motion.h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-sm text-secondary hover:text-primary transition-colors interactive"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <motion.p
            className="text-secondary text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2026 Nexus Studio. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-accent transition-all interactive group"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.4 }}
            aria-label="Back to top"
          >
            <ArrowUp className="text-secondary group-hover:text-white transition-colors" size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
