import React, { useRef } from 'react';
import { Terminal, Cpu, Award, GraduationCap, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const compRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.reveal-title-about', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-title-about',
          start: 'top 90%',
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo('.about-bento-item', 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-bento-grid',
          start: 'top 85%',
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: compRef });

  return (
    <section id="about" className="section" ref={compRef}>
      <div className="reveal-title-about" style={{ marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">01 —</span>
          <span className="text-gradient">INTRODUCTION</span>
        </h2>
      </div>

      <div className="bento-grid about-bento-grid">
        
        {/* Terminal Window (Left, span 2 on desktop) */}
        <div className="card-cyber span-2 about-bento-item" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="terminal-window" style={{ flex: 1 }}>
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn term-red"></span>
                <span className="terminal-btn term-yellow"></span>
                <span className="terminal-btn term-green"></span>
              </div>
              <span className="terminal-title">gaurav@iitbhu-node:~</span>
              <Terminal size={14} color="var(--text-secondary)" />
            </div>
            
            <div className="terminal-body" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <div className="terminal-line">
                <span className="terminal-prompt">$</span> whoami
              </div>
              <div className="terminal-line" style={{ color: 'var(--accent-green)', marginBottom: '16px' }}>
                gaurav_kumar (CS&E Dual Degree, IIT BHU)
              </div>
              
              <div className="terminal-line">
                <span className="terminal-prompt">$</span> cat profile.json
              </div>
              <div className="terminal-line" style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
{`{
  "name": "Gaurav Kumar",
  "education": "Indian Institute of Technology (BHU), Varanasi",
  "major": "Computer Science & Engineering",
  "cpi": "8.57 / 10.0",
  "focus": ["Scalable Systems", "Competitive Programming", "Full-stack Backend"]
}`}
              </div>

              <div className="terminal-line">
                <span className="terminal-prompt">$</span> grep -i "passion" about.txt
              </div>
              <div className="terminal-line" style={{ color: '#fff', fontStyle: 'italic' }}>
                "Solving intricate backend complexities and designing latency-critical architectures."
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights / Stats (Right) */}
        <div className="card-cyber about-bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-green)', marginBottom: '15px' }}>
              <GraduationCap size={20} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 'bold' }}>ACADEMICS</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', marginBottom: '15px', fontWeight: '600' }}>IIT BHU</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Integrated Dual Degree (B.Tech + M.Tech) in Computer Science & Engineering. Final year candidate graduating with a strong foundation in systems engineering and algorithms.
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '15px', marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: '#fff' }}>8.57</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>CPI / CGPA</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', color: '#fff' }}>2026</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>GRAD YEAR</div>
            </div>
          </div>
        </div>

        {/* Bio Description (Left, span 2 on desktop) */}
        <div className="card-cyber span-2 about-bento-item" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)', marginBottom: '5px' }}>
            <Cpu size={20} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 'bold' }}>MISSION STATEMENT</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>
            I specialize in developing high-throughput backend services, implementing custom protocols, and orchestrating containers. With over 2000 algorithmic problems solved, I apply strict algorithmic optimization practices to clean, production-grade code.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {['SYSTEMS ENGINEER', 'COMPETITIVE PROGRAMMER', 'BACKEND ARCHITECT'].map((tag) => (
              <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Core Competencies list (Right) */}
        <div className="card-cyber about-bento-item" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-purple)' }}>
            <Award size={20} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 'bold' }}>CORE COMPETENCIES</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              "Algorithms & Problem Solving",
              "Scalable Microservices",
              "Performance Tuning",
              "CI/CD Pipeline Automation",
              "3D Animations & WebGL"
            ].map((comp, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <ChevronRight size={16} color="var(--accent-green)" />
                <span style={{ color: '#fff' }}>{comp}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default About;
