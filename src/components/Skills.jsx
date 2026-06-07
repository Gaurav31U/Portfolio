import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Code, Server, Layout, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const compRef = useRef(null);

  const skillGroups = [
    {
      title: "LANGUAGES",
      icon: <Code size={18} color="var(--accent-green)" />,
      skills: ["C++", "JavaScript", "Python", "Java", "Kotlin", "Ruby"]
    },
    {
      title: "BACKEND & SYSTEM",
      icon: <Server size={18} color="var(--accent-cyan)" />,
      skills: ["Node.js", "Spring Boot", "Django", "Ruby on Rails", "Apache Kafka", "Redis"]
    },
    {
      title: "FRONTEND & WEBGL",
      icon: <Layout size={18} color="var(--accent-purple)" />,
      skills: ["React.js", "Three.js", "GSAP Animations", "WebGL", "Thymeleaf", "HTML/CSS"]
    },
    {
      title: "DB & PLATFORMS",
      icon: <Database size={18} color="var(--accent-green)" />,
      skills: ["MySQL", "MongoDB", "Firebase", "Docker", "AWS EC2", "Git / GitHub"]
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.reveal-title-skills', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-title-skills',
          start: 'top 90%',
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo('.skills-group-card', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: compRef });

  return (
    <section id="skills" className="section" ref={compRef}>
      <div className="reveal-title-skills" style={{ marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">02 —</span>
          <span className="text-gradient">ENGINEERING CORE</span>
        </h2>
      </div>

      <div className="bento-grid skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {skillGroups.map((group, idx) => (
          <div key={idx} className="card-cyber skills-group-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {group.icon}
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', fontWeight: 'bold' }}>{group.title}</h3>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {group.skills.map((skill, sIdx) => (
                <div 
                  key={sIdx} 
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                    e.currentTarget.style.background = 'rgba(0, 255, 156, 0.04)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
