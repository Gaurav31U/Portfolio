import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="epic-footer">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="epic-text">
          <span className="text-gradient">let's build</span>
          <span>something epic.</span>
        </h1>
        <a href="mailto:gkxp1000@gmail.com" className="glow-btn" style={{ padding: '16px 40px', fontSize: '1.2rem', marginTop: '2rem' }}>
          Start a Conversation
        </a>
      </motion.div>

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
