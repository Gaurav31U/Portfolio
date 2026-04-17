import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
        
        {/* Visuals Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <div className="glass" style={{ padding: '40px', background: 'linear-gradient(145deg, rgba(168,85,247,0.1) 0%, rgba(0,255,255,0.05) 100%)', border: '1px solid rgba(0,255,255,0.2)' }}>
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>CORE COMPS</h3>
            <ul style={{ listStyle: 'none', spaceY: '15px' }}>
              <li style={{ marginBottom: '15px', color: 'var(--accent-cyan)' }}>→ Algorithms & Problem Solving</li>
              <li style={{ marginBottom: '15px' }}>→ scalable Backend Engineering</li>
              <li style={{ marginBottom: '15px' }}>→ Full-stack Web & Android Apps</li>
            </ul>
          </div>
        </motion.div>

        {/* Text Right Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>01 — <span className="text-gradient">INTRODUCTION</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            I am a final-year Integrated Dual Degree (B.Tech + M.Tech) student in Computer Science & Engineering at the Indian Institute of Technology (BHU), Varanasi with a CPI of 8.57/10.0.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
            I have a strong passion for solving intricate problems and building scalable software. Over my academic journey and internships, I've gathered intensive experience spanning across backend engineering to complete product development architectures.
          </p>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <span style={{ padding: '8px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', fontWeight: 'bold' }}>ENGINEER</span>
            <span style={{ padding: '8px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', fontWeight: 'bold' }}>COMPETITIVE CODER</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
