import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="floating-circle fc-1"></div>
      <div className="floating-circle fc-2"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm <span className="text-gradient">Gaurav Kumar</span>
        </h1>
        <p className="hero-subtitle">
          Computer Science & Engineering Student at IIT (BHU) crafting polished software, scaling backend systems, and solving complex problems.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowRight size={18} style={{ display: 'inline', marginLeft: '5px', verticalAlign: 'middle' }} />
          </a>
          <a href="mailto:gkxp1000@gmail.com" className="btn btn-outline">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
