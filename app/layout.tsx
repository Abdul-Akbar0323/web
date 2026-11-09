import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'NEXUS - Luxury Fashion Experience',
  description: 'An extraordinary luxury fashion e-commerce experience featuring advanced 3D interactions, cinematic animations, and immersive product showcases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grain">
        <CartProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  )
}
