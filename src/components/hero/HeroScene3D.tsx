import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, scale, color, speed, opacity = 0.6 }: { position: [number, number, number], scale: number, color: string, speed: number, opacity?: number }) => {
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
          distort={0.25}
          speed={1}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={opacity}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const count = 400;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a larger area
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Blue-white color palette matching the theme
      const colorType = Math.random();
      if (colorType < 0.4) {
        // White particles
        colors[i3] = 0.95;
        colors[i3 + 1] = 0.97;
        colors[i3 + 2] = 1.0;
      } else if (colorType < 0.7) {
        // Light blue particles
        colors[i3] = 0.4;
        colors[i3 + 1] = 0.6;
        colors[i3 + 2] = 0.95;
      } else {
        // Deeper blue particles
        colors[i3] = 0.15;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 0.9;
      }
      
      // Variable sizes for depth
      sizes[i] = Math.random() * 0.03 + 0.02;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Floating ring element for tech aesthetic
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
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
    </mesh>
  );
};

const GridFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[60, 60, 60, 60]} />
      <meshBasicMaterial color="#1e40af" wireframe transparent opacity={0.06} />
    </mesh>
  );
};

export const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#1e40af" />
        <pointLight position={[0, 5, 5]} intensity={0.3} color="#ffffff" />
        
        {/* Blue gradient spheres */}
        <AnimatedSphere position={[-5, 1.5, -5]} scale={1.2} color="#2563eb" speed={0.15} opacity={0.5} />
        <AnimatedSphere position={[5, -1, -6]} scale={0.8} color="#1e40af" speed={0.2} opacity={0.4} />
        <AnimatedSphere position={[1, 3, -7]} scale={0.6} color="#3b82f6" speed={0.25} opacity={0.5} />
        <AnimatedSphere position={[-3, -2, -4]} scale={0.4} color="#60a5fa" speed={0.3} opacity={0.4} />
        
        {/* Floating rings for tech feel */}
        <FloatingRing position={[-4, 2, -4]} scale={1.5} rotationSpeed={0.2} />
        <FloatingRing position={[4, -1.5, -5]} scale={1} rotationSpeed={-0.15} />
        <FloatingRing position={[0, 0, -3]} scale={2} rotationSpeed={0.1} />
        
        <ParticleField />
        <GridFloor />
        
        <Environment preset="night" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};