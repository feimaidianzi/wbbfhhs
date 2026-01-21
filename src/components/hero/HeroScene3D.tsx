import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, scale, color, speed }: { position: [number, number, number], scale: number, color: string, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.5}
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

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 25;

      // White to light blue gradient for minimal look
      const t = Math.random();
      colors[i] = 0.7 + t * 0.3;     // R: 0.7-1.0
      colors[i + 1] = 0.8 + t * 0.2; // G: 0.8-1.0
      colors[i + 2] = 0.9 + t * 0.1; // B: 0.9-1.0
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
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

const GridFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#4a5568" wireframe transparent opacity={0.08} />
    </mesh>
  );
};

export const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#2563eb" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#1e40af" />
        
        {/* Minimal blue spheres */}
        <AnimatedSphere position={[-4, 1, -3]} scale={1.0} color="#2563eb" speed={0.25} />
        <AnimatedSphere position={[4, -1, -4]} scale={0.7} color="#1e40af" speed={0.4} />
        <AnimatedSphere position={[1, 2.5, -5]} scale={0.5} color="#3b82f6" speed={0.35} />
        
        <ParticleField />
        <GridFloor />
        
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};
