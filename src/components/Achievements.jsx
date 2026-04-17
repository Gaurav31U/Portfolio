import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      icon: <Trophy size={28} />,
      title: "Max Rating 1775 (Expert) on Codeforces",
      desc: "Placing among the top competitive programmers globally."
    },
    {
      icon: <Star size={28} />,
      title: "Global Rank 81",
      desc: "Achieved in official Codeforces Round 1077 (Div. 2)."
    },
    {
      icon: <Target size={28} />,
      title: "2000+ Algorithmic Problems Solved",
      desc: "Solved over 1700+ on LeetCode and 300+ on CSES."
    }
  ];

  return (
    <section id="achievements" className="section">
      <h2 className="section-title">Coding <span className="text-gradient">Achievements</span></h2>
      <div className="achievements-grid">
        {achievements.map((ach, i) => (
          <div key={i} className="glass achievement-card">
            <div className="ach-icon">
              {ach.icon}
            </div>
            <div className="ach-text">
              <p><strong>{ach.title}</strong></p>
              <p>{ach.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
