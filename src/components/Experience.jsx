import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Briefcase, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const compRef = useRef(null);

  const experiences = [
    {
      role: "Software Engineer Intern (Microservices)",
      company: "Equal",
      date: "July 2025 – Jan 2026",
      desc: "Built scalable backend infrastructure including PII encryption with hashed lookups, database-backed semaphore concurrency control for consent creation that reduced database write failures by 15%, and centralized microservice logging pipelines.",
      techs: ["Java", "Spring Boot", "MySQL", "Redis", "Docker", "Microservices"]
    },
    {
      role: "Product Development Intern",
      company: "10XR",
      date: "June 2024 – July 2024",
      desc: "Developed a Ruby on Rails backend with 100+ REST APIs, implementing JWT authentication, RBAC (Role-Based Access Control), Kafka event messaging, OpenCV. Configured full GitHub Actions CI/CD pipelines.",
      techs: ["Ruby on Rails", "Apache Kafka", "OpenCV", "PostgreSQL", "CI/CD", "GitHub Actions"]
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.reveal-title-exp', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-title-exp',
          start: 'top 90%',
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo('.exp-card-cyber', 
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-grid',
          start: 'top 85%',
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: compRef });

  return (
    <section id="experience" className="section" ref={compRef}>
      <div className="reveal-title-exp" style={{ marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">04 —</span>
          <span className="text-gradient">EXPERIENCE</span>
        </h2>
      </div>
      
      <div className="exp-grid" style={{ position: 'relative' }}>
        {experiences.map((exp, i) => (
          <div key={i} className="card-cyber exp-card-cyber" style={{ padding: '35px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Briefcase size={16} color="var(--accent-green)" />
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>{exp.role}</h3>
                </div>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginTop: '6px', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
                  {exp.company}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                <Calendar size={12} color="var(--accent-purple)" />
                <span>{exp.date}</span>
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', margin: '10px 0' }}>
              {exp.desc}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
              {exp.techs.map((tech) => (
                <span 
                  key={tech} 
                  style={{ 
                    border: '1px solid rgba(255,255,255,0.04)', 
                    background: 'rgba(255,255,255,0.01)', 
                    padding: '4px 10px', 
                    borderRadius: '2px', 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-mono)', 
                    color: '#fff' 
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
