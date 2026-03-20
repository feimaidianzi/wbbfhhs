import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

// Camera follows mouse subtly
const MouseFollower = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 1.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 1, 0.02);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// === PCB Trace: a line with a glowing dot traveling along it ===
const PCBTrace = ({
  points,
  color,
  speed,
  delay,
  traceOpacity = 0.15,
}: {
  points: [number, number, number][];
  color: string;
  speed: number;
  delay: number;
  traceOpacity?: number;
}) => {
  const dotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const vectors = points.map(p => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0);
  }, [points]);

  const lineGeometry = useMemo(() => {
    const pts = curve.getPoints(120);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [curve]);

  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: traceOpacity }),
    [color, traceOpacity]
  );

  useFrame((state) => {
    if (!dotRef.current || !glowRef.current) return;
    const t = ((state.clock.elapsedTime * speed + delay) % 4) / 4;
    const point = curve.getPoint(t);
    dotRef.current.position.copy(point);
    glowRef.current.position.copy(point);
    const pulse = 0.8 + Math.sin(t * Math.PI * 2) * 0.4;
    dotRef.current.scale.setScalar(pulse);
    glowRef.current.scale.setScalar(pulse * 3);
  });

  return (
    <>
      <primitive object={new THREE.Line(lineGeometry, lineMaterial)} />
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={1} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </>
  );
};

// === IC Chip: a rectangular pad with pin lines ===
const ICChip = ({
  position,
  size = [1.2, 0.8],
  color,
  mousePosition,
  pulseSpeed = 1.5,
}: {
  position: [number, number, number];
  size?: [number, number];
  color: string;
  mousePosition: { x: number; y: number };
  pulseSpeed?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const borderRef = useRef<THREE.LineSegments>(null);

  const pinLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const [w, h] = size;
    const pinCount = 4;
    const pinLen = 0.3;
    // Top and bottom pins
    for (let i = 0; i < pinCount; i++) {
      const x = -w / 2 + (w / (pinCount + 1)) * (i + 1);
      // Top
      const topGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, h / 2, 0),
        new THREE.Vector3(x, h / 2 + pinLen, 0),
      ]);
      lines.push(topGeo);
      // Bottom
      const botGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -h / 2, 0),
        new THREE.Vector3(x, -h / 2 - pinLen, 0),
      ]);
      lines.push(botGeo);
    }
    // Left and right pins
    const sidePinCount = 3;
    for (let i = 0; i < sidePinCount; i++) {
      const y = -h / 2 + (h / (sidePinCount + 1)) * (i + 1);
      const leftGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-w / 2, y, 0),
        new THREE.Vector3(-w / 2 - pinLen, y, 0),
      ]);
      lines.push(leftGeo);
      const rightGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(w / 2, y, 0),
        new THREE.Vector3(w / 2 + pinLen, y, 0),
      ]);
      lines.push(rightGeo);
    }
    return lines;
  }, [size]);

  const borderGeo = useMemo(() => {
    const [w, h] = size;
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-w / 2, -h / 2, 0),
      new THREE.Vector3(w / 2, -h / 2, 0),
      new THREE.Vector3(w / 2, h / 2, 0),
      new THREE.Vector3(-w / 2, h / 2, 0),
      new THREE.Vector3(-w / 2, -h / 2, 0),
    ]);
  }, [size]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + mousePosition.x * 0.15;
      groupRef.current.position.y = position[1] + mousePosition.y * 0.1;
    }
    if (borderRef.current) {
      const mat = borderRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Chip body fill */}
      <mesh>
        <planeGeometry args={size} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
      {/* Chip border */}
      <primitive ref={borderRef} object={new THREE.Line(borderGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }))} />
      {/* Pins */}
      {pinLines.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 }))} />
      ))}
    </group>
  );
};

// === PCB Grid background ===
const PCBGrid = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);

  const gridLines = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const range = 20;
    const step = 1.5;
    for (let x = -range; x <= range; x += step) {
      geometries.push(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, -range, -12),
          new THREE.Vector3(x, range, -12),
        ])
      );
    }
    for (let y = -range; y <= range; y += step) {
      geometries.push(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-range, y, -12),
          new THREE.Vector3(range, y, -12),
        ])
      );
    }
    return geometries;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = mousePosition.x * 0.2;
      groupRef.current.position.y = mousePosition.y * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {gridLines.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.03 }))} />
      ))}
    </group>
  );
};

// === Solder pad / via hole ===
const Via = ({
  position,
  color,
  pulseSpeed = 2,
}: {
  position: [number, number, number];
  color: string;
  pulseSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.3;
      ringRef.current.scale.set(s, s, s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 - Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <circleGeometry args={[0.08, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.12, 0.18, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// === Floating dust particles ===
const DustParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const count = 300;
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 5;
      const r = Math.random();
      if (r < 0.5) {
        colors[i3] = 0.02; colors[i3 + 1] = 0.71; colors[i3 + 2] = 0.83; // cyan
      } else if (r < 0.75) {
        colors[i3] = 0.13; colors[i3 + 1] = 0.82; colors[i3 + 2] = 0.45; // green
      } else {
        colors[i3] = 0.96; colors[i3 + 1] = 0.62; colors[i3 + 2] = 0.04; // amber
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01 + mousePosition.x * 0.05;
      meshRef.current.rotation.x = mousePosition.y * 0.03;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// ===================== Scene =====================
const SceneContent = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  // Define PCB trace routes (orthogonal / angled like real PCB traces)
  const traces: { points: [number, number, number][]; color: string; speed: number; delay: number }[] = useMemo(
    () => [
      // Main bus – horizontal
      { points: [[-12, 0, -2], [-6, 0, -2], [-4, 2, -2], [0, 2, -2], [2, 0, -2], [8, 0, -2], [12, 0, -2]], color: '#06b6d4', speed: 0.5, delay: 0 },
      // Branch up-right
      { points: [[-8, -4, -3], [-6, -2, -3], [-3, -2, -3], [0, 1, -3], [3, 1, -3], [6, 3, -3], [10, 3, -3]], color: '#22d3ee', speed: 0.45, delay: 1 },
      // Branch down
      { points: [[0, 6, -4], [0, 3, -4], [2, 1, -4], [4, -1, -4], [4, -4, -4], [6, -6, -4]], color: '#10b981', speed: 0.4, delay: 0.5 },
      // Diagonal
      { points: [[-10, 5, -3], [-7, 3, -3], [-4, 3, -3], [-2, 1, -3], [1, -1, -3], [4, -3, -3], [8, -5, -3]], color: '#f59e0b', speed: 0.35, delay: 2 },
      // Short branch
      { points: [[-5, -5, -2], [-3, -3, -2], [-1, -3, -2], [2, -5, -2], [5, -5, -2]], color: '#8b5cf6', speed: 0.55, delay: 1.5 },
      // Top artery
      { points: [[-9, 4, -5], [-5, 4, -5], [-3, 5, -5], [0, 5, -5], [3, 4, -5], [7, 4, -5], [11, 5, -5]], color: '#06b6d4', speed: 0.42, delay: 3 },
      // Bottom artery
      { points: [[-11, -3, -4], [-7, -3, -4], [-5, -5, -4], [-2, -5, -4], [1, -3, -4], [5, -2, -4], [9, -3, -4]], color: '#22d3ee', speed: 0.38, delay: 2.5 },
      // Cross trace
      { points: [[-6, 6, -3], [-4, 4, -3], [-2, 2, -3], [0, 0, -3], [2, -2, -3], [4, -4, -3], [6, -6, -3]], color: '#10b981', speed: 0.48, delay: 0.8 },
    ],
    []
  );

  const vias: { position: [number, number, number]; color: string }[] = useMemo(
    () => [
      { position: [0, 2, -2], color: '#06b6d4' },
      { position: [2, 0, -2], color: '#06b6d4' },
      { position: [-3, -2, -3], color: '#22d3ee' },
      { position: [4, -1, -4], color: '#10b981' },
      { position: [-2, 1, -3], color: '#f59e0b' },
      { position: [5, -5, -2], color: '#8b5cf6' },
      { position: [-5, 4, -5], color: '#06b6d4' },
      { position: [3, 4, -5], color: '#06b6d4' },
      { position: [0, 0, -3], color: '#10b981' },
      { position: [-7, -3, -4], color: '#22d3ee' },
      { position: [5, -2, -4], color: '#22d3ee' },
      { position: [-4, 2, -2], color: '#06b6d4' },
    ],
    []
  );

  return (
    <>
      <MouseFollower mousePosition={mousePosition} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[-8, 5, 5]} intensity={0.3} color="#10b981" />
      <pointLight position={[8, -5, 5]} intensity={0.3} color="#f59e0b" />

      {/* PCB Grid */}
      <PCBGrid mousePosition={mousePosition} />

      {/* Traces with flowing light */}
      {traces.map((t, i) => (
        <PCBTrace key={i} points={t.points} color={t.color} speed={t.speed} delay={t.delay} />
      ))}

      {/* Via holes at junctions */}
      {vias.map((v, i) => (
        <Via key={i} position={v.position} color={v.color} />
      ))}

      {/* IC Chips */}
      <ICChip position={[-6, 0, -2]} size={[1.6, 1]} color="#06b6d4" mousePosition={mousePosition} />
      <ICChip position={[6, 0, -2]} size={[1.4, 0.9]} color="#22d3ee" mousePosition={mousePosition} pulseSpeed={1.2} />
      <ICChip position={[0, -4, -3]} size={[1.8, 1.1]} color="#10b981" mousePosition={mousePosition} pulseSpeed={1.8} />
      <ICChip position={[-3, 5, -5]} size={[1.2, 0.7]} color="#f59e0b" mousePosition={mousePosition} pulseSpeed={1.3} />
      <ICChip position={[7, 4, -5]} size={[1, 0.6]} color="#8b5cf6" mousePosition={mousePosition} pulseSpeed={2} />

      {/* Dust particles */}
      <DustParticles mousePosition={mousePosition} />
    </>
  );
};

export const HeroScene3D = () => {
  const mousePosition = useMousePosition();

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
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
