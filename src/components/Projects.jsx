import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Equal Microserver",
      desc: "Built scalable backend infrastructure including PII encryption with hashed lookups & database-backed concurrency control.",
      tag: "Internship Project",
      span: "span-2"
    },
    {
      title: "ArtStock Platform",
      desc: "Django e-commerce platform for art with separate artist/customer authentication and faceted search.",
      tag: "Django",
      span: ""
    },
    {
      title: "MockTest Android App",
      desc: "Native offline-first app for JEE aspirants using Kotlin. Built with Firebase and Coroutines.",
      tag: "Kotlin",
      span: ""
    },
    {
      title: "WaterWays Booking",
      desc: "Spring Boot-based cruise booking web app using MVVM architecture with secure ACID-compliant transactions.",
      tag: "Spring Boot",
      span: "span-2"
    }
  ];

  return (
    <section id="projects" className="section">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-title">03 — <span className="text-gradient">Selected Projects</span></h2>
      </motion.div>
      
      <div className="bento-grid">
        {projects.map((proj, i) => (
          <motion.div 
            key={i} 
            className={`bento-item glass ${proj.span}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ marginBottom: 'auto' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', background: 'rgba(0, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '15px' }}>
                {proj.tag}
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', marginBottom: '15px' }}>{proj.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{proj.desc}</p>
            </div>
            
            <a href="#" className="glow-icon-btn" style={{ marginTop: '20px', alignSelf: 'flex-start' }}>
              <ExternalLink size={20} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
