import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaGraduationCap } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 3D Particle Field background
function ParticleField({ count = 600, color = "#00f0ff", speed = 0.02 }) {
  const pointsRef = useRef();
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    let seed = 123;
    const lcg = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count * 3; i++) {
       arr[i] = (lcg() - 0.5) * 15;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed;
      pointsRef.current.rotation.x += delta * (speed * 0.4);
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
      <pointsMaterial 
         size={0.035} 
         color={color} 
         transparent 
         opacity={0.4}
         sizeAttenuation 
      />
    </points>
  );
}

// 3D Interactive WebGL Core Object
function TechCore() {
  const groupRef = useRef();
  const outerKnotRef = useRef();
  const innerSphereRef = useRef();
  const haloRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Slow base rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }

    // Interactive mouse leaning (Parallax)
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;

    if (outerKnotRef.current) {
      outerKnotRef.current.rotation.x += (targetY - outerKnotRef.current.rotation.x) * 0.1;
      outerKnotRef.current.rotation.y += (targetX - outerKnotRef.current.rotation.y) * 0.1;
      outerKnotRef.current.rotation.z = t * 0.3;
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.x = -t * 0.2;
      innerSphereRef.current.rotation.y = t * 0.4;
      
      // Floating translation effect
      innerSphereRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }

    if (haloRef.current) {
      // Rotate the halo dynamically and keep it tilted
      haloRef.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.4) * 0.08;
      haloRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Neon Purple Torus Knot */}
      <mesh ref={outerKnotRef}>
        <torusKnotGeometry args={[1.3, 0.28, 120, 16]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          wireframe 
          emissive="#8b5cf6" 
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Neon Green Sphere Core */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#00ff9c" 
          wireframe 
          emissive="#00ff9c" 
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Halo Ring - now with a ref and dynamic rotation */}
      <mesh ref={haloRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.0, 0.03, 8, 64]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          emissive="#00f0ff" 
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

const AnimatedHero3D = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.hero-left-col', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.1 }
    );
  }, { scope: heroRef });

  return (
    <section id="home" className="hero-split-container" ref={heroRef}>
      {/* Background R3F Canvas - Immersive WebGL Area */}
      <div className="hero-canvas-container">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 70 }}>
          <ambientLight intensity={0.4}/>
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} intensity={1.0} color="#00f0ff" />
          <TechCore />
          <ParticleField count={800} color="#00ff9c" speed={0.03} />
          <ParticleField count={400} color="#8b5cf6" speed={0.015} />
        </Canvas>
      </div>

      <div className="watermark-text" style={{ zIndex: 1, pointerEvents: 'none' }}>ALGORITHMS</div>
      
      <div className="hero-split-content">
        <div className="hero-left-col">
          <div className="profile-container">
            <div className="rotating-border"></div>
            <div className="profile-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <FaGraduationCap size={56} color="var(--accent-green)" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 156, 0.4))' }} />
            </div>
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Gaurav Kumar</span>
          </h1>
          
          <div className="hero-typewriter">
            <Typewriter
              words={['Full Stack Developer', 'Backend Architect', 'Competitive Programmer', '3D React Animator']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </div>
          
          <p className="hero-description-p">
            Final-year CS&E student at IIT (BHU). Solved 2000+ algorithmic problems. Dedicated to engineering robust backends, microservices, and immersive digital interfaces.
          </p>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
            <a href="#projects" className="glow-btn">EXPLORE PROJECTS</a>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://github.com/Gaurav31U" target="_blank" rel="noopener noreferrer" className="glow-icon-btn" aria-label="GitHub"><FaGithub size={18} /></a>
              <a href="https://linkedin.com/in/gaurav31u" target="_blank" rel="noopener noreferrer" className="glow-icon-btn" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-split-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background-color: var(--bg-color);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 8% 60px;
        }
        .hero-canvas-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          z-index: 1;
        }
        .hero-split-content {
          display: grid;
          grid-template-columns: 1.2fr 1.2fr;
          gap: 40px;
          width: 100%;
          max-width: 1400px;
          align-items: center;
          z-index: 2;
          pointer-events: none;
        }
        .hero-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 24px;
          pointer-events: auto;
        }
        .hero-description-p {
          color: #b0c0d0;
          max-width: 580px;
          margin-top: 10px;
          font-size: 1.05rem;
          line-height: 1.7;
          font-family: var(--font-heading);
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }
        @media (max-width: 991px) {
          .hero-split-container {
            padding: 120px 24px 60px;
            flex-direction: column;
          }
          .hero-canvas-container {
            width: 100%;
            height: 45vh;
            top: 60px;
            position: relative;
          }
          .hero-split-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
            margin-top: -30px;
          }
          .hero-left-col {
            align-items: center;
            text-align: center;
          }
          .hero-description-p {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimatedHero3D;
