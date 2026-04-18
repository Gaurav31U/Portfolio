import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaGraduationCap } from 'react-icons/fa';
import * as THREE from 'three';

// 3D Particle Field background
function ParticleField({ count = 800, color = "#00ffff" }) {
  const pointsRef = useRef();
  
  // Create randomized positions for particles
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
       arr[i] = (Math.random() - 0.5) * 20; // Spread out across x,y,z
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    // Gentle rotation of the whole particle group
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Simple point material */}
      <pointsMaterial 
         size={0.05} 
         color={color} 
         transparent 
         opacity={0.6}
         sizeAttenuation 
      />
    </points>
  );
}

// 3D Animated substitution for Hero component
const AnimatedHero3D = () => {
  return (
    <section id="home" className="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      
      {/* Background R3F Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5}/>
          <ParticleField count={1000} color="#00ffff" />
          <ParticleField count={500} color="#a855f7" />
        </Canvas>
      </div>

      <div className="watermark-text" style={{ zIndex: 1, pointerEvents: 'none' }}>ENGINEER</div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 2, pointerEvents: 'auto' }}
      >
        <div className="profile-container">
          <div className="rotating-border"></div>
          <div className="profile-img" style={{ background: 'linear-gradient(45deg, #0a0a0a, #1a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <FaGraduationCap size={80} color="#00ffff" />
          </div>
        </div>
        
        <h1 className="hero-title">
          Hi, I'm <span className="text-gradient">Gaurav Kumar</span>
        </h1>
        
        <div className="hero-typewriter">
          <Typewriter
            words={['Full Stack Developer', 'Backend Engineer', 'Competitive Programmer', '3D React Animator']}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
        
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
          Final-year CS&E student at IIT (BHU). Over 2000 algorithmic problems solved. Passionate about building robust backend architectures and beautifully crafted digital experiences.
        </p>

        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: 'center' }}>
          <a href="#projects" className="glow-btn">View Projects</a>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="https://github.com/Gaurav31U" target="_blank" rel="noopener noreferrer" className="glow-icon-btn"><FaGithub size={20} /></a>
            <a href="https://linkedin.com/in/gaurav31u" target="_blank" rel="noopener noreferrer" className="glow-icon-btn"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero3D;
