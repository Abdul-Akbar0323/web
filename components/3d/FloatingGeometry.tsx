'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Rotate the entire group
    groupRef.current.rotation.x = time * 0.2
    groupRef.current.rotation.y = time * 0.3

    // Pulse the mesh
    meshRef.current.scale.setScalar(1 + Math.sin(time) * 0.1)

    // Mouse interaction
    const mouseX = (state.mouse.x * Math.PI) / 4
    const mouseY = (state.mouse.y * Math.PI) / 4

    groupRef.current.rotation.x += (mouseY - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.05
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#8b5cf6" />

      <AnimatedGeometry />

      {/* Background particles */}
      {[...Array(30)].map((_, i) => {
        const x = (Math.random() - 0.5) * 20
        const y = (Math.random() - 0.5) * 20
        const z = (Math.random() - 0.5) * 20

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )
      })}
    </>
  )
}

export default function FloatingGeometry() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <Scene />
    </Canvas>
  )
}
