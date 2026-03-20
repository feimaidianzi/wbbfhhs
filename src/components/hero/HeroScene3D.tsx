import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Mouse position hook
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

const MouseFollower = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1.5, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// === 新增：六边形网格 ===
const HexGrid = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const hexPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const rows = 6;
    const cols = 8;
    const spacing = 2.2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing + (r % 2) * (spacing / 2);
        const y = (r - rows / 2) * (spacing * 0.866);
        positions.push([x, y, -15]);
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      groupRef.current.position.x = mousePosition.x * 0.3;
      groupRef.current.position.y = mousePosition.y * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {hexPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <circleGeometry args={[0.8, 6]} />
          <meshBasicMaterial 
            color="#3b82f6" 
            wireframe 
            transparent 
            opacity={0.04 + Math.sin(i * 0.5) * 0.02} 
          />
        </mesh>
      ))}
    </group>
  );
};

// === 新增：数据流线 ===
const DataStream = ({ 
  start, end, color, speed, delay 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color: string; 
  speed: number;
  delay: number;
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 3,
      (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 3,
      (start[2] + end[2]) / 2 + 2,
    ];
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [curve]);

  useFrame((state) => {
    if (dotRef.current) {
      const t = ((state.clock.elapsedTime * speed + delay) % 3) / 3;
      const point = curve.getPoint(t);
      dotRef.current.position.copy(point);
      dotRef.current.scale.setScalar(0.8 + Math.sin(t * Math.PI) * 0.4);
    }
  });

  return (
    <>
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.08} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </>
  );
};

// === 改进：多色系球体 ===
const AnimatedSphere = ({ 
  position, scale, color, speed, opacity = 0.6, mousePosition, emissive
}: { 
  position: [number, number, number]; scale: number; color: string; speed: number; 
  opacity?: number; mousePosition: { x: number, y: number }; emissive?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.position.x = initialPosition.current[0] + mousePosition.x * 0.5;
      meshRef.current.position.y = initialPosition.current[1] + mousePosition.y * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          emissive={emissive || color}
          emissiveIntensity={0.15}
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

// === 改进：多色粒子场 ===
const ParticleField = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const count = 600;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      const colorType = Math.random();
      if (colorType < 0.3) {
        // Cyan
        colors[i3] = 0.02; colors[i3 + 1] = 0.71; colors[i3 + 2] = 0.83;
      } else if (colorType < 0.5) {
        // Purple
        colors[i3] = 0.55; colors[i3 + 1] = 0.36; colors[i3 + 2] = 0.97;
      } else if (colorType < 0.65) {
        // Amber
        colors[i3] = 0.96; colors[i3 + 1] = 0.62; colors[i3 + 2] = 0.04;
      } else if (colorType < 0.75) {
        // Emerald
        colors[i3] = 0.2; colors[i3 + 1] = 0.83; colors[i3 + 2] = 0.6;
      } else {
        // Blue
        colors[i3] = 0.23; colors[i3 + 1] = 0.51; colors[i3 + 2] = 0.96;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.015 + mousePosition.x * 0.08;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.03 + mousePosition.y * 0.04;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
};

// === 新增：环形脉冲 ===
const PulseRing = ({ 
  position, color, mousePosition 
}: { 
  position: [number, number, number]; color: string; mousePosition: { x: number; y: number } 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.material.opacity = 0.4 - Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      meshRef.current.position.x = initialPos.current[0] + mousePosition.x * 0.25;
      meshRef.current.position.y = initialPos.current[1] + mousePosition.y * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.5, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

const FloatingRing = ({ position, scale, rotationSpeed, mousePosition }: {
  position: [number, number, number]; scale: number; rotationSpeed: number;
  mousePosition: { x: number, y: number };
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * 0.5;
      meshRef.current.position.x = initialPosition.current[0] + mousePosition.x * 0.3;
      meshRef.current.position.y = initialPosition.current[1] + mousePosition.y * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
    </mesh>
  );
};

const GlowingOrb = ({ position, color, mousePosition }: {
  position: [number, number, number]; color: string; mousePosition: { x: number, y: number };
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.position.x = initialPosition.current[0] + mousePosition.x * 0.4;
      meshRef.current.position.y = initialPosition.current[1] + mousePosition.y * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

const GridFloor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
    <planeGeometry args={[80, 80, 80, 80]} />
    <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.05} />
  </mesh>
);

const SceneContent = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => (
  <>
    <MouseFollower mousePosition={mousePosition} />
    
    {/* 更丰富的灯光 */}
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
    <pointLight position={[10, 10, 10]} intensity={0.6} color="#3b82f6" />
    <pointLight position={[-10, -5, -10]} intensity={0.4} color="#8b5cf6" />
    <pointLight position={[0, 5, 5]} intensity={0.3} color="#06b6d4" />
    <pointLight position={[-8, 3, 8]} intensity={0.3} color="#f59e0b" />
    
    {/* 多色球体 */}
    <AnimatedSphere position={[-6, 2, -6]} scale={1.8} color="#3b82f6" emissive="#1d4ed8" speed={0.15} opacity={0.65} mousePosition={mousePosition} />
    <AnimatedSphere position={[6, -1, -8]} scale={1.2} color="#06b6d4" emissive="#0891b2" speed={0.18} opacity={0.6} mousePosition={mousePosition} />
    <AnimatedSphere position={[2, 4, -10]} scale={1} color="#8b5cf6" emissive="#7c3aed" speed={0.2} opacity={0.55} mousePosition={mousePosition} />
    <AnimatedSphere position={[-4, -3, -5]} scale={0.6} color="#f59e0b" emissive="#d97706" speed={0.25} opacity={0.5} mousePosition={mousePosition} />
    <AnimatedSphere position={[8, 3, -12]} scale={1.4} color="#10b981" emissive="#059669" speed={0.12} opacity={0.5} mousePosition={mousePosition} />
    
    {/* 环形 */}
    <FloatingRing position={[-5, 2.5, -5]} scale={2.5} rotationSpeed={0.2} mousePosition={mousePosition} />
    <FloatingRing position={[5, -2, -7]} scale={1.8} rotationSpeed={-0.15} mousePosition={mousePosition} />
    <FloatingRing position={[0, 1, -3]} scale={3} rotationSpeed={0.1} mousePosition={mousePosition} />
    
    {/* 脉冲环 - 新增 */}
    <PulseRing position={[-3, 1, -8]} color="#8b5cf6" mousePosition={mousePosition} />
    <PulseRing position={[4, 2, -10]} color="#06b6d4" mousePosition={mousePosition} />
    
    {/* 发光点 - 多色 */}
    <GlowingOrb position={[-3, 3, -4]} color="#06b6d4" mousePosition={mousePosition} />
    <GlowingOrb position={[4, -1, -6]} color="#8b5cf6" mousePosition={mousePosition} />
    <GlowingOrb position={[1, 2, -5]} color="#f59e0b" mousePosition={mousePosition} />
    <GlowingOrb position={[-6, -2, -7]} color="#10b981" mousePosition={mousePosition} />
    <GlowingOrb position={[7, 4, -9]} color="#ef4444" mousePosition={mousePosition} />
    
    {/* 六边形网格背景 */}
    <HexGrid mousePosition={mousePosition} />
    
    {/* 数据流线 */}
    <DataStream start={[-8, 4, -5]} end={[6, -2, -8]} color="#06b6d4" speed={0.4} delay={0} />
    <DataStream start={[7, 3, -6]} end={[-5, -3, -7]} color="#8b5cf6" speed={0.35} delay={1} />
    <DataStream start={[-3, -4, -4]} end={[4, 5, -9]} color="#f59e0b" speed={0.3} delay={2} />
    <DataStream start={[0, 5, -3]} end={[-7, -1, -10]} color="#10b981" speed={0.38} delay={0.5} />
    
    <ParticleField mousePosition={mousePosition} />
    <GridFloor />
    
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

export const HeroScene3D = () => {
  const mousePosition = useMousePosition();
  
  return (
    <div className="absolute inset-0 z-0">
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
