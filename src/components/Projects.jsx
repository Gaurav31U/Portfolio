import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "ArtStock - E-commerce Web App",
      guide: "Guided by Dr. Amrita Chaturvedi, IIT (BHU)",
      desc: "Developed a full-stack Django e-commerce platform for art with separate artist/customer authentication and dashboards, featuring faceted search, order management, and tracking.",
      tech: ["Django", "Python", "HTML/CSS", "SQLite"],
      link: "#"
    },
    {
      title: "MockTest - Android Application",
      guide: "Guided by Dr. Sukomal Pal, IIT (BHU)",
      desc: "Built a native, offline-first Android app for JEE aspirants using Kotlin. Features Firebase-backed real-time leaderboards, Google OAuth, Coroutines, and high-fidelity LaTeX rendering for complex formulas.",
      tech: ["Kotlin", "Android SDK", "Firebase"],
      link: "#"
    },
    {
      title: "WaterWays - Web Application",
      guide: "Guided by Dr. Ravindranath Chowdary C, IIT (BHU)",
      desc: "Built a Spring Boot-based cruise booking web app using MVVM architecture, featuring secure ACID-compliant transactions, tour search, and on-cruise amenity booking with MySQL.",
      tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
      link: "#"
    },
    {
      title: "Scratch C++ Builds & Android Apps",
      guide: "Self Project",
      desc: "Built From Scratch Using C++: HTTP Server, Git, BitTorrent, SQLite and DNS Server. Built Simple Android Apps Using Kotlin: Social Media, News Feed, MemeShare and Notes.",
      tech: ["C++", "Kotlin"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div key={i} className="glass project-card">
            <div className="project-content">
              <h3 className="project-title">{proj.title}</h3>
              <div className="project-guide">{proj.guide}</div>
              <p className="project-desc">{proj.desc}</p>
              
              <div className="skill-list" style={{ marginTop: 'auto' }}>
                {proj.tech.map((t, j) => (
                  <span key={j} className="skill-tag" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>{t}</span>
                ))}
              </div>
              
              <div className="project-links">
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} /> View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
