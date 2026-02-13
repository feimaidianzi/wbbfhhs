import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Mouse position context for parallax
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePosition;
};

// Shared mouse position for 3D components
const MouseFollower = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1.5, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const AnimatedSphere = ({ 
  position, 
  scale, 
  color, 
  speed, 
  opacity = 0.6,
  mousePosition
}: { 
  position: [number, number, number], 
  scale: number, 
  color: string, 
  speed: number, 
  opacity?: number,
  mousePosition: { x: number, y: number }
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
      
      // Mouse parallax effect
      meshRef.current.position.x = initialPosition.current[0] + mousePosition.x * 0.5;
      meshRef.current.position.y = initialPosition.current[1] + mousePosition.y * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.2}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={opacity}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const count = 500;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      // Vivid blue and cyan particles
      const colorType = Math.random();
      if (colorType < 0.4) {
        // Bright blue
        colors[i3] = 0.2;
        colors[i3 + 1] = 0.5;
        colors[i3 + 2] = 1.0;
      } else if (colorType < 0.7) {
        // Cyan
        colors[i3] = 0.0;
        colors[i3 + 1] = 0.8;
        colors[i3 + 2] = 1.0;
      } else {
        // Light blue
        colors[i3] = 0.5;
        colors[i3 + 1] = 0.7;
        colors[i3 + 2] = 1.0;
      }
      
      sizes[i] = Math.random() * 0.08 + 0.02;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02 + mousePosition.x * 0.1;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03 + mousePosition.y * 0.05;
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

// Floating ring element with glow effect
const FloatingRing = ({ 
  position, 
  scale, 
  rotationSpeed,
  mousePosition
}: { 
  position: [number, number, number], 
  scale: number, 
  rotationSpeed: number,
  mousePosition: { x: number, y: number }
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * 0.5;
      
      // Mouse parallax
      meshRef.current.position.x = initialPosition.current[0] + mousePosition.x * 0.3;
      meshRef.current.position.y = initialPosition.current[1] + mousePosition.y * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
    </mesh>
  );
};

// Glowing orb for accent
const GlowingOrb = ({ 
  position, 
  color,
  mousePosition 
}: { 
  position: [number, number, number], 
  color: string,
  mousePosition: { x: number, y: number }
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      
      meshRef.current.position.x = initialPosition.current[0] + mousePosition.x * 0.4;
      meshRef.current.position.y = initialPosition.current[1] + mousePosition.y * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const GridFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[80, 80, 80, 80]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.06} />
    </mesh>
  );
};

// Scene content with mouse tracking
const SceneContent = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  return (
    <>
      <MouseFollower mousePosition={mousePosition} />
      
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#60a5fa" />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#06b6d4" />
      
      {/* Clear, vivid spheres */}
      <AnimatedSphere position={[-6, 2, -6]} scale={1.8} color="#3b82f6" speed={0.15} opacity={0.7} mousePosition={mousePosition} />
      <AnimatedSphere position={[6, -1, -8]} scale={1.2} color="#06b6d4" speed={0.18} opacity={0.65} mousePosition={mousePosition} />
      <AnimatedSphere position={[2, 4, -10]} scale={1} color="#60a5fa" speed={0.2} opacity={0.7} mousePosition={mousePosition} />
      <AnimatedSphere position={[-4, -3, -5]} scale={0.6} color="#0ea5e9" speed={0.25} opacity={0.6} mousePosition={mousePosition} />
      <AnimatedSphere position={[8, 3, -12]} scale={1.4} color="#2563eb" speed={0.12} opacity={0.65} mousePosition={mousePosition} />
      
      {/* Dynamic floating rings */}
      <FloatingRing position={[-5, 2.5, -5]} scale={2.5} rotationSpeed={0.2} mousePosition={mousePosition} />
      <FloatingRing position={[5, -2, -7]} scale={1.8} rotationSpeed={-0.15} mousePosition={mousePosition} />
      <FloatingRing position={[0, 1, -3]} scale={3} rotationSpeed={0.1} mousePosition={mousePosition} />
      
      {/* Glowing accent orbs */}
      <GlowingOrb position={[-3, 3, -4]} color="#06b6d4" mousePosition={mousePosition} />
      <GlowingOrb position={[4, -1, -6]} color="#3b82f6" mousePosition={mousePosition} />
      <GlowingOrb position={[1, 2, -5]} color="#60a5fa" mousePosition={mousePosition} />
      
      <ParticleField mousePosition={mousePosition} />
      <GridFloor />
      
      {/* Removed Environment preset to avoid external HDR fetch failures */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

export const HeroScene3D = () => {
  const mousePosition = useMousePosition();
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Dark background for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};