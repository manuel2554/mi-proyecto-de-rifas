import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface Burger3DViewerProps {
  zoom: number;
  rotation: { x: number; y: number };
  onRotationChange: (rotation: { x: number; y: number }) => void;
}

const BurgerModel = ({ zoom, rotation, onRotationChange }: Burger3DViewerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Create burger layers
  const burgerLayers = [
    { color: '#8B4513', height: 0.2, position: 0, type: 'bottom-bun' },
    { color: '#8B0000', height: 0.3, position: 0.2, type: 'patty' },
    { color: '#FFD700', height: 0.1, position: 0.5, type: 'cheese' },
    { color: '#228B22', height: 0.05, position: 0.6, type: 'lettuce' },
    { color: '#FF6347', height: 0.05, position: 0.65, type: 'tomato' },
    { color: '#8B4513', height: 0.2, position: 0.7, type: 'top-bun' },
  ];

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on mouse drag
      groupRef.current.rotation.y += 0.005;
      
      // Apply manual rotation if dragging
      if (isDragging) {
        groupRef.current.rotation.y += rotation.y * 0.01;
        groupRef.current.rotation.x += rotation.x * 0.01;
      }
    }
  });

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    onRotationChange({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5,
    });
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      scale={zoom}
    >
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
      
      {/* Burger layers */}
      {burgerLayers.map((layer, index) => (
        <mesh key={index} position={[0, layer.position, 0]}>
          <cylinderGeometry args={[1, 1, layer.height, 32]} />
          <meshStandardMaterial 
            color={layer.color} 
            roughness={0.4}
            metalness={layer.type === 'cheese' ? 0.3 : 0.1}
          />
        </mesh>
      ))}
      
      {/* Sesame seeds on top bun */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0.85;
        
        return (
          <mesh key={i} position={[x, y, z]} scale={0.1}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#F5DEB3" roughness={0.6} />
          </mesh>
        );
      })}
      
      {/* Cheese dripping effect */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Lettuce pieces */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.7 + Math.random() * 0.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0.625;
        
        return (
          <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
            <boxGeometry args={[0.4, 0.02, 0.4]} />
            <meshStandardMaterial color="#228B22" roughness={0.8} />
          </mesh>
        );
      })}
      
      {/* Tomato slices */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 0.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0.675;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
            <meshStandardMaterial color="#FF6347" roughness={0.7} />
          </mesh>
        );
      })}
      
      {/* Plate */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.5, 1.3, 0.1, 32]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Plate rim */}
      <mesh position={[0, -0.45, 0]}>
        <torusGeometry args={[1.4, 0.05, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Burger3DViewer = (props: Burger3DViewerProps) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      
      <Environment preset="studio" />
      
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <BurgerModel {...props} />
      </Float>
      
      {/* Soft background gradient */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </Canvas>
  );
};

export default Burger3DViewer;