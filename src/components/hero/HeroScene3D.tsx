import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, scale, color, speed, opacity = 0.4 }: { position: [number, number, number], scale: number, color: string, speed: number, opacity?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={0.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={opacity}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const count = 300;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 35;
      positions[i3 + 1] = (Math.random() - 0.5) * 35;
      positions[i3 + 2] = (Math.random() - 0.5) * 35;

      // Light blue and silver particles for white theme
      const colorType = Math.random();
      if (colorType < 0.5) {
        // Light blue
        colors[i3] = 0.4;
        colors[i3 + 1] = 0.6;
        colors[i3 + 2] = 0.9;
      } else {
        // Silver/light gray
        colors[i3] = 0.7;
        colors[i3 + 1] = 0.75;
        colors[i3 + 2] = 0.8;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Floating ring element
const FloatingRing = ({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.015, 16, 100]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
    </mesh>
  );
};

const GridFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[80, 80, 80, 80]} />
      <meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.04} />
    </mesh>
  );
};

export const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Clean white gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-slate-100" />
      
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#3b82f6" />
        <pointLight position={[-10, -5, -10]} intensity={0.2} color="#60a5fa" />
        
        {/* Translucent blue/silver spheres */}
        <AnimatedSphere position={[-6, 2, -8]} scale={1.5} color="#3b82f6" speed={0.12} opacity={0.25} />
        <AnimatedSphere position={[6, -1, -10]} scale={1} color="#60a5fa" speed={0.15} opacity={0.2} />
        <AnimatedSphere position={[2, 4, -12]} scale={0.8} color="#93c5fd" speed={0.18} opacity={0.25} />
        <AnimatedSphere position={[-4, -3, -6]} scale={0.5} color="#bfdbfe" speed={0.22} opacity={0.2} />
        <AnimatedSphere position={[8, 3, -14]} scale={1.2} color="#2563eb" speed={0.1} opacity={0.15} />
        
        {/* Subtle floating rings */}
        <FloatingRing position={[-5, 2.5, -6]} scale={2} rotationSpeed={0.15} />
        <FloatingRing position={[5, -2, -8]} scale={1.5} rotationSpeed={-0.1} />
        <FloatingRing position={[0, 1, -4]} scale={2.5} rotationSpeed={0.08} />
        
        <ParticleField />
        <GridFloor />
        
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};