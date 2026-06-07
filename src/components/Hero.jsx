import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaGraduationCap } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="watermark-text" style={{ zIndex: 0 }}>ENGINEER</div>
      
      <div 
        className="hero-content"
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
      </div>
    </section>
  );
};

export default Hero;
