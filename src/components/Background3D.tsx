import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Stars, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, size, speed }: { position: [number, number, number], color: string, size: number, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </Sphere>
    </Float>
  );
};

const AnimatedTorus = () => {
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= 0.001;
            meshRef.current.rotation.y -= 0.002;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
            <TorusKnot ref={meshRef} position={[0, -2, -10]} args={[5, 0.5, 128, 32]}>
                <meshStandardMaterial 
                    color="#00d4ff" 
                    emissive="#00d4ff"
                    emissiveIntensity={0.2}
                    wireframe 
                    transparent opacity={0.1} 
                />
            </TorusKnot>
        </Float>
    );
}

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d4ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#b300ff" />
        <pointLight position={[0, 0, 0]} intensity={1} color="#ff00ff" distance={20} />

        {/* Floating Stars */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />

        {/* Floating Background Objects */}
        <AnimatedSphere position={[-6, 4, -5]} color="#00d4ff" size={2} speed={1.5} />
        <AnimatedSphere position={[5, -3, -8]} color="#b300ff" size={3} speed={1.2} />
        <AnimatedSphere position={[-4, -5, -4]} color="#ff00ff" size={1.5} speed={2} />
        <AnimatedSphere position={[6, 5, -6]} color="#00ff88" size={1.2} speed={1.8} />

        <AnimatedTorus />

        {/* Soft Fog to blend with obsidian background */}
        <fog attach="fog" args={['#0a0a0f', 5, 30]} />
      </Canvas>
    </div>
  );
};

export default Background3D;
