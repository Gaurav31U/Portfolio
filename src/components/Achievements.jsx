import React, { useRef } from 'react';
import { Target, Trophy, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const compRef = useRef(null);

  const achievements = [
    { 
      metric: "1775", 
      title: "CODEFORCES EXPERT", 
      desc: "Max rating achieved in competitive programming platforms",
      icon: <Trophy size={16} color="var(--accent-green)" /> 
    },
    { 
      metric: "#81", 
      title: "GLOBAL RANK", 
      desc: "Rank 81 in Codeforces Round 1077 (Div. 2) out of thousands of participants",
      icon: <Star size={16} color="var(--accent-cyan)" /> 
    },
    { 
      metric: "2000+", 
      title: "ALGORITHMIC PROBLEMS", 
      desc: "Solved 1700+ problems on LeetCode & others with optimal time complexity",
      icon: <Target size={16} color="var(--accent-purple)" /> 
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.reveal-title-ach', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-title-ach',
          start: 'top 90%',
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo('.ach-metric-card', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ach-grid',
          start: 'top 85%',
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: compRef });

  return (
    <section id="achievements" className="section" ref={compRef}>
      <div className="reveal-title-ach" style={{ marginBottom: '4rem' }}>
         <h2 className="section-title" style={{ margin: 0 }}>
           <span className="section-num">05 —</span>
           <span className="text-gradient">ACHIEVEMENTS</span>
         </h2>
      </div>
      
      <div className="ach-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {achievements.map((ach, i) => (
          <div 
            key={i} 
            className="card-cyber ach-metric-card" 
            style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {ach.icon}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                  {ach.title}
                </span>
              </div>
            </div>
            
            <div style={{ margin: '15px 0' }}>
              <div style={{ 
                fontSize: '4rem', 
                fontFamily: 'var(--font-heading)', 
                fontWeight: '700', 
                color: '#fff', 
                lineHeight: '1', 
                letterSpacing: '-2px',
                background: 'linear-gradient(to right, #fff, var(--text-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {ach.metric}
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              {ach.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
