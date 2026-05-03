import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const Skills = () => {
  const compRef = useRef(null);

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

  useGSAP(() => {
    gsap.fromTo('.skills-reveal-text', 
      { y: 100, rotateX: -45, opacity: 0 },
      { y: 0, rotateX: 0, opacity: 1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.skills-reveal-text', start: 'top 95%', end: 'top 50%', scrub: 1 } }
    );

    gsap.fromTo('.skill-badge',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.05, scrollTrigger: { trigger: '.skills-container', start: 'top 90%', end: 'top 40%', scrub: 1 } }
    );
  }, { scope: compRef });

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -5, scale: 1.05, borderColor: 'var(--accent-cyan)', duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, borderColor: 'rgba(255,255,255,0.05)', duration: 0.3, ease: 'power2.out' });
  };

  return (
    <section id="skills" className="section" ref={compRef}>
      <div className="skills-reveal-text">
        <h2 className="section-title">02 — <span className="text-gradient">THE ENGINEERING CORE</span></h2>
      </div>
      
      <div className="skills-container">
        {skills.map((skill, i) => (
          <div 
            key={i} 
            className="skill-badge"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></div>
            <span style={{ color: '#fff' }}>{skill.name}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginLeft: '5px' }}>{skill.cat}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
