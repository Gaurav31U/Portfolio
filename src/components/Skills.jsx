import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: "C++", cat: "Languages" },
    { name: "JS/Node", cat: "Languages" },
    { name: "Python", cat: "Languages" },
    { name: "Java/Kotlin", cat: "Languages" },
    { name: "Ruby", cat: "Languages" },
    { name: "React", cat: "Frontend" },
    { name: "Django", cat: "Backend" },
    { name: "Spring Boot", cat: "Backend" },
    { name: "Rails", cat: "Backend" },
    { name: "MySQL", cat: "Database" },
    { name: "MongoDB", cat: "Database" },
    { name: "Docker", cat: "DevOps" },
    { name: "Git", cat: "DevOps" }
  ];

  return (
    <section id="skills" className="section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="section-title">02 — <span className="text-gradient">THE ENGINEERING CORE</span></h2>
      </motion.div>
      
      <div className="skills-container">
        {skills.map((skill, i) => (
          <motion.div 
            key={i} 
            className="skill-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></div>
            <span style={{ color: '#fff' }}>{skill.name}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginLeft: '5px' }}>{skill.cat}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
