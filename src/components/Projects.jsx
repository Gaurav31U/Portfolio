import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "WaterWays Cruise Booking",
      desc: "Robust Spring Boot project enabling customers to book cruises. Engineered with an MVVM architecture and secure ACID-compliant transactions.",
      tag: "Java / Spring Boot",
      span: "span-2",
      link: "https://github.com/Gaurav31U/WaterWays-Java-Spring-Boot-Project-DBMS"
    },
    {
      title: "MockTest Android App",
      desc: "Native offline-first Android application designed for JEE aspirants using Kotlin, Coroutines, and Firebase real-time leaderboards.",
      tag: "Kotlin / Firebase",
      span: "",
      link: "https://github.com/Gaurav31U/Android-Application-Mocktest"
    },
    {
      title: "MLP Classifier from Scratch",
      desc: "A highly optimized Multi-Layer Perceptron (MLP) machine learning classifier implemented entirely from scratch without high-level ML wrappers.",
      tag: "Python / NumPy",
      span: "",
      link: "https://github.com/Gaurav31U/Multilayer-Perceptron-Classifier-using-Python"
    },
    {
      title: "ArtStock E-Commerce",
      desc: "Fully-featured Django e-commerce platform targeting art distribution. Includes complete artist/customer authentication and faceted search algorithms.",
      tag: "Python / Django",
      span: "span-2",
      link: "https://github.com/Gaurav31U/Django-ArtStock-Website"
    },
    {
      title: "Core Software Reconstructions",
      desc: "Deep-dive systems engineering reconstructing industry-standard software from scratch in C++. Implementations include: HTTP Server, Git, Redis, DNS Server, SQLite, and BitTorrent.",
      tag: "Modern C++ / Architecture",
      span: "span-3",
      link: "https://github.com/Gaurav31U/Http-Server-using-Cpp" 
    }
  ];

  return (
    <section id="projects" className="section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-title">03 — <span className="text-gradient">Open Source Projects</span></h2>
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
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', background: 'rgba(0, 255, 255, 0.1)', padding: '5px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '20px', fontWeight: '600' }}>
                {proj.tag}
              </span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', marginBottom: '15px' }}>{proj.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{proj.desc}</p>
            </div>
            
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="glow-icon-btn" style={{ marginTop: '25px', alignSelf: 'flex-start' }}>
              <ExternalLink size={20} />
            </a>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .span-3 { grid-column: span 3; }
        @media (max-width: 900px) {
          .span-3 { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
