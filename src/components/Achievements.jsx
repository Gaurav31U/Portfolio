import React, { useRef } from 'react';
import { Target, Trophy, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const compRef = useRef(null);

  const achievements = [
    { icon: <Trophy size={28} />, title: "Codeforces Expert", desc: "Max Rating 1775" },
    { icon: <Star size={28} />, title: "Global Rank 81", desc: "Codeforces Round 1077 (Div. 2)" },
    { icon: <Target size={28} />, title: "2000+ Algorithmic Problems", desc: "1700+ on LeetCode" }
  ];

  useGSAP(() => {
    gsap.from('.section-title-anim', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.section-title-anim', start: 'top 85%' }
    });

    gsap.from('.ach-card', {
      scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.1, scrollTrigger: { trigger: '.ach-grid', start: 'top 85%' }
    });
  }, { scope: compRef });

  return (
    <section id="achievements" className="section" ref={compRef}>
      <div className="section-title-anim">
         <h2 className="section-title">05 — <span className="text-gradient">ACHIEVEMENTS</span></h2>
      </div>
      <div className="ach-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {achievements.map((ach, i) => (
          <div 
            key={i} 
            className="glass ach-card" 
            style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <div style={{ color: 'var(--accent-cyan)', background: 'rgba(0,255,255,0.05)', padding: '15px', borderRadius: '50%' }}>
              {ach.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{ach.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ach.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
