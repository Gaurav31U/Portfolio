import React, { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const compRef = useRef(null);

  useGSAP(() => {
    gsap.from('.footer-cta', {
      scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.footer-cta', start: 'top 90%' }
    });
  }, { scope: compRef });

  return (
    <footer className="epic-footer" ref={compRef}>
      <div className="footer-cta">
        <h1 className="epic-text">
          <span className="text-gradient">let's build</span>
          <span>something epic.</span>
        </h1>
        <a href="mailto:gkxp1000@gmail.com" className="glow-btn" style={{ padding: '16px 40px', fontSize: '1.2rem', marginTop: '2rem' }}>
          Start a Conversation
        </a>
      </div>

      <div className="footer-bottom">
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', marginBottom: '5px' }}>
            <FaCode /> Crafted with precision by Gaurav Kumar
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} All Rights Reserved.
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://github.com/Gaurav31U" target="_blank" rel="noopener noreferrer" className="glow-icon-btn">
            <FaGithub size={22} />
          </a>
          <a href="https://linkedin.com/in/gaurav31u" target="_blank" rel="noopener noreferrer" className="glow-icon-btn">
            <FaLinkedin size={22} />
          </a>
          <a href="mailto:gkxp1000@gmail.com" className="glow-icon-btn">
            <FaEnvelope size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
