import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Double Helix geometry instead of loading a GLTF to avoid missing asset errors.
function ProceduralHelix({ rotationSpeed, strandColor, highlightBaseId }) {
  const groupRef = useRef();
  const numBasePairs = 20;

  // Precompute base pair positions
  const basePairs = useMemo(() => {
    const pairs = [];
    const height = 15;
    const radius = 2;
    for (let i = 0; i < numBasePairs; i++) {
      // Y-axis layout
      const y = (i / numBasePairs) * height - height / 2;
      const angle = i * 0.5; // Twist factor
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      pairs.push({ id: i, y, angle, p1: [x1, y, z1], p2: [x2, y, z2] });
    }
    return pairs;
  }, [numBasePairs]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <group ref={groupRef}>
      {basePairs.map((pair) => {
        const isHighlighted = pair.id === highlightBaseId;
        const color = isHighlighted ? '#ff0055' : strandColor;

        return (
          <group key={pair.id}>
            {/* Strand 1 Node */}
            <mesh position={pair.p1}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={color} emissive={isHighlighted ? color : '#000'} emissiveIntensity={isHighlighted ? 0.5 : 0} />
            </mesh>
            {/* Strand 2 Node */}
            <mesh position={pair.p2}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={color} emissive={isHighlighted ? color : '#000'} emissiveIntensity={isHighlighted ? 0.5 : 0} />
            </mesh>
            {/* Connecting Rung */}
            <mesh position={[0, pair.y, 0]} rotation={[0, -pair.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
              <meshStandardMaterial color={isHighlighted ? '#ffffff' : '#444'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function ControlsPanel({ onToggleRotate, onHighlight, isRotating }) {
  return (
    <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', gap: '10px', zIndex: 10 }}>
      {/* Controls using minimal glassmorphism style */}
      <button 
        onClick={onToggleRotate}
        style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
      >
        {isRotating ? 'Pause Rotation' : 'Start Rotation'}
      </button>
      <button 
        onClick={() => onHighlight(Math.floor(Math.random()*20))}
        style={{ padding: '8px 16px', background: 'rgba(0, 255, 255, 0.1)', color: '#0ff', border: '1px solid rgba(0,255,255,0.3)', borderRadius: '8px', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
      >
        Highlight Pair
      </button>
      <button 
        onClick={() => onHighlight(null)}
        style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
      >
        Clear
      </button>
    </div>
  );
}

export default function DoubleHelix({ rotationSpeed = 0.5, strandColor = '#a855f7' }) {
  const [highlightBase, setHighlightBase] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15] }} style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        <ProceduralHelix 
           rotationSpeed={isRotating ? rotationSpeed : 0} 
           strandColor={strandColor} 
           highlightBaseId={highlightBase} 
        />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
      <div style={{ pointerEvents: 'auto' }}>
        <ControlsPanel 
          onToggleRotate={() => setIsRotating(!isRotating)} 
          onHighlight={setHighlightBase} 
          isRotating={isRotating} 
        />
      </div>
    </div>
  );
}
