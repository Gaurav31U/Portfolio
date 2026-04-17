import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaGraduationCap } from 'react-icons/fa';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Hero = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <section id="home" className="hero">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "grab" } }, modes: { grab: { distance: 140, links: { opacity: 0.5 } } } },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { enable: true, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 40 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      />
      
      <div className="watermark-text" style={{ zIndex: 0 }}>ENGINEER</div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        <div className="profile-container">
          <div className="rotating-border"></div>
          {/* Fallback to simple styled div if image not added */}
          <div className="profile-img" style={{ background: 'linear-gradient(45deg, #0a0a0a, #1a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <FaGraduationCap size={80} color="#00ffff" />
          </div>
        </div>
        
        <h1 className="hero-title">
          Hi, I'm <span className="text-gradient">Gaurav Kumar</span>
        </h1>
        
        <div className="hero-typewriter">
          <Typewriter
            words={['Full Stack Developer', 'Backend Engineer', 'Competitive Programmer']}
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

        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
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

export default Hero;
