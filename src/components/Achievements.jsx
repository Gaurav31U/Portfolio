import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Star } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { icon: <Trophy size={28} />, title: "Codeforces Expert", desc: "Max Rating 1775" },
    { icon: <Star size={28} />, title: "Global Rank 81", desc: "Codeforces Round 1077 (Div. 2)" },
    { icon: <Target size={28} />, title: "2000+ Algorithmic Problems", desc: "1700+ on LeetCode" }
  ];

  return (
    <section id="achievements" className="section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
         <h2 className="section-title">05 — <span className="text-gradient">ACHIEVEMENTS</span></h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {achievements.map((ach, i) => (
          <motion.div 
            key={i} 
            className="glass" 
            style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ color: 'var(--accent-cyan)', background: 'rgba(0,255,255,0.05)', padding: '15px', borderRadius: '50%' }}>
              {ach.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{ach.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ach.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
