import React from 'react';

const Experience = () => {
  const experiences = [
    {
      role: "Software Engineer Intern (Finshare Microserver)",
      company: "Equal",
      date: "July 2025 – Jan 2026",
      details: [
        "Built scalable backend infrastructure including PII encryption with hashed lookups.",
        "Created database-backed semaphore concurrency control for consent creation that reduced failures by 15 percent.",
        "Centralized microservice logging that reduced storage by 50 percent and CPU usage by 10 percent.",
        "Led major data platform initiatives by executing a full MySQL to Oracle migration with complete data integrity, minimal downtime, and production grade reliability."
      ]
    },
    {
      role: "Product Development Intern",
      company: "10XR",
      location: "Remote",
      date: "June 2024 – July 2024",
      details: [
        "Developed a Ruby on Rails backend 'Store Service' with 100+ REST APIs, implementing JWT auth, RBAC, Cloudflare image uploads, and event-driven components using Kafka and OpenLoyalty (Hyperledger Fabric).",
        "Built a full CI/CD pipeline with GitHub Actions for Rubocop linting, Brakeman security scans, Docker image builds, Azure deployment, and documented APIs using Swagger/OpenAPI.",
        "Technologies: Ruby, Ruby on Rails, MongoDB, Git, Docker."
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Professional <span className="text-gradient">Experience</span></h2>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="glass experience-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">{exp.role}</h3>
                  <div className="exp-company">{exp.company}</div>
                </div>
                <div className="exp-date">{exp.date}</div>
              </div>
              <ul className="exp-list">
                {exp.details.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
