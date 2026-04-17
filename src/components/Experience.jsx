import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: "Software Engineer Intern (Microservices)",
      company: "Equal",
      date: "July 2025 – Jan 2026",
      desc: "Built scalable backend infrastructure including PII encryption with hashed lookups, database backed semaphore concurrency control for consent creation that reduced failures by 15%, and centralized microservice logging."
    },
    {
      role: "Product Development Intern",
      company: "10XR",
      date: "June 2024 – July 2024",
      desc: "Developed a Ruby on Rails backend with 100+ REST APIs, implementing JWT auth, RBAC, Kafka events, OpenCV. Built full GitHub Actions CI/CD."
    }
  ];

  return (
    <section id="experience" className="section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-title">04 — <span className="text-gradient">EXPERIENCE</span></h2>
      </motion.div>
      
      <div className="exp-grid">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i} 
            className="exp-card glass"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>{exp.role}</h3>
                <div style={{ color: 'var(--accent-purple)', fontWeight: 'bold', marginTop: '5px' }}>{exp.company}</div>
              </div>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {exp.date}
              </span>
            </div>
            <p style={{ marginTop: '20px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              {exp.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
