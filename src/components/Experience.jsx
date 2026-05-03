import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const Experience = () => {
  const compRef = useRef(null);

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

  useGSAP(() => {
    gsap.fromTo('.section-title-anim',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.section-title-anim', start: 'top 95%', end: 'top 50%', scrub: 1 } }
    );

    gsap.fromTo('.exp-card',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2, scrollTrigger: { trigger: '.exp-grid', start: 'top 90%', end: 'top 40%', scrub: 1 } }
    );
  }, { scope: compRef });

  return (
    <section id="experience" className="section" ref={compRef}>
      <div className="section-title-anim">
        <h2 className="section-title">04 — <span className="text-gradient">EXPERIENCE</span></h2>
      </div>
      
      <div className="exp-grid">
        {experiences.map((exp, i) => (
          <div key={i} className="exp-card glass">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
