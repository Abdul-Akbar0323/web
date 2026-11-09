'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      {/* Main distorted sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbit rings */}
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={1 + i} rotationIntensity={0.5} floatIntensity={1}>
          <mesh rotation={[Math.PI / 2, 0, i * 0.5]} position={[0, 0, 0]}>
            <torusGeometry args={[3 + i, 0.05, 16, 100]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#6366f1"
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Small floating spheres */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 4
        return (
          <Float key={i} speed={3 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#6366f1"
                emissiveIntensity={0.5}
              />
            </mesh>
          </Float>
        )
      })}
    </>
  )
}

export default function Interactive3DSection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
            Interactive 3D Worlds
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
            Drag to explore the immersive 3D environment. Every element is carefully crafted for maximum visual impact.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-secondary">
            <div>
              <div className="text-3xl font-bold text-white mb-2">WebGL</div>
              <div>Real-time rendering</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Three.js</div>
              <div>3D graphics library</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">R3F</div>
              <div>React integration</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-50" />
    </section>
  )
}
