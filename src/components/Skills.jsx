import React from 'react';
import { Code2, Database, Globe, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 size={32} />,
      skills: ["C++", "Python", "Java", "Kotlin", "JavaScript", "Ruby", "C"]
    },
    {
      title: "Databases",
      icon: <Database size={32} />,
      skills: ["MySQL", "MongoDB", "Cloud Firestore", "SQLite", "Oracle"]
    },
    {
      title: "Web Frameworks",
      icon: <Globe size={32} />,
      skills: ["Spring Boot", "Django", "Ruby on Rails", "Node.js", "React"]
    },
    {
      title: "DevOps & Tools",
      icon: <Wrench size={32} />,
      skills: ["Docker", "Git", "CI/CD", "Kafka", "Postman", "Android SDK", "GitHub Actions"]
    }
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical <span className="text-gradient">Skills</span></h2>
      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <div key={i} className="glass skill-category">
            <div className="skill-icon">{cat.icon}</div>
            <h3>{cat.title}</h3>
            <div className="skill-list">
              {cat.skills.map((skill, j) => (
                <span key={j} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
