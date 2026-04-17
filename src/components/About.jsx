import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
      <div className="glass about-grid" style={{ padding: '40px' }}>
        <div className="about-text">
          <p>
            I am a final-year Integrated Dual Degree (B.Tech + M.Tech) student in Computer Science & Engineering at the <strong>Indian Institute of Technology (BHU), Varanasi</strong> with a CPI of 8.57/10.0.
          </p>
          <p>
            I have a strong passion for solving intricate problems and building scalable software. Over my academic journey and internships, I've gathered intensive experience in backend engineering, full-stack development, and competitive programming.
          </p>
          <p>
            When I'm not coding, I enjoy exploring new technologies, playing games, and continuously expanding my problem-solving repertoire.
          </p>
        </div>
        <div>
          <div className="about-stats">
            <div className="glass stat-item">
              <div className="stat-num">1700+</div>
              <div className="stat-label">LeetCode Problems</div>
            </div>
            <div className="glass stat-item">
              <div className="stat-num">1775</div>
              <div className="stat-label">Codeforces (Expert)</div>
            </div>
            <div className="glass stat-item">
              <div className="stat-num">300+</div>
              <div className="stat-label">CSES Problems</div>
            </div>
            <div className="glass stat-item">
              <div className="stat-num">8.57</div>
              <div className="stat-label">CPI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
