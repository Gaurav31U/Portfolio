import React, { useRef } from 'react';
import { ExternalLink, BrainCircuit, GraduationCap, Ship, ShoppingBag, Atom, BookOpen, Cpu, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const projects = [
  {
    title: "ABYSS: Visual Engine",
    desc: "Engineered a web-based educational 3D visualization platform using React, Three.js, and Node.js. Built a scalable backend with CouchDB and deployed on AWS EC2 with automated CI/CD to decode complex systems across Science, Math, and AI.",
    tag: "React / Three.js / AWS",
    link: "https://github.com/Gaurav31U",
    icon: Atom
  },
  {
    title: "GyanDrishti",
    desc: "Architected a modern Android educational platform delivering immersive 3D lesson content. Engineered a custom network proxy and local caching system to serve WebGL assets, with UI built in Jetpack Compose and Firebase backend.",
    tag: "Kotlin / Jetpack Compose",
    link: "https://github.com/Gaurav31U",
    icon: BrainCircuit
  },
  {
    title: "QuizOcean",
    desc: "Designed an educational testing platform with specialized IQ assessments. Built a reactive UI with Jetpack Compose, integrated complex LaTeX math rendering, offline-mode support, and monetized via Google Play Billing.",
    tag: "Kotlin / Firebase",
    link: "https://github.com/Gaurav31U",
    icon: GraduationCap
  },
  {
    title: "JEE Mock Test Series",
    desc: "Built a Kotlin-based exam simulation app serving dynamic mock tests with real-time sync via Firebase Firestore. Designed an automated performance engine providing subject-wise scoring and LaTeX-rendered solutions.",
    tag: "Kotlin / Android",
    link: "https://github.com/Gaurav31U/Android-Application-Mocktest",
    icon: BookOpen
  },
  {
    title: "ArtStock E-Commerce",
    desc: "Built a responsive Django-based platform facilitating secure art transactions. Modernized deployment by containerizing services with Docker and integrating a Prometheus, Grafana, and Loki observability stack.",
    tag: "Python / Django / Docker",
    link: "https://github.com/Gaurav31U/Django-ArtStock-Website",
    icon: ShoppingBag
  },
  {
    title: "WaterWays Cruise Booking",
    desc: "Developed a comprehensive cruise management system using Java and Spring Boot. Ensured ACID-compliant transactions and containerized the infrastructure with Docker Compose, Redis, and Prometheus/Grafana.",
    tag: "Java / Spring Boot",
    link: "https://github.com/Gaurav31U/WaterWays-Java-Spring-Boot-Project-DBMS",
    icon: Ship
  },
  {
    title: "MLP Classifier from Scratch",
    desc: "A highly optimized Multi-Layer Perceptron (MLP) machine learning classifier implemented entirely from scratch without high-level ML wrappers.",
    tag: "Python / NumPy",
    link: "https://github.com/Gaurav31U/Multilayer-Perceptron-Classifier-using-Python",
    icon: Cpu
  },
  {
    title: "Core Software Reconstructions",
    desc: "Deep-dive systems engineering reconstructing industry-standard software from scratch in C++. Implementations include: HTTP Server, Git, Redis, DNS Server, SQLite, and BitTorrent.",
    tag: "Modern C++ / Architecture",
    link: "https://github.com/Gaurav31U/Http-Server-using-Cpp",
    icon: Terminal
  }
];

const Projects = () => {
  const compRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    if (!scrollRef.current || !compRef.current) return;
    
    const updateScroll = () => {
      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const amountToScroll = scrollWidth - (viewportWidth * 0.5); // Ensure last card fully passes

      if (amountToScroll > 0) {
        gsap.to(scrollRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: compRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${amountToScroll + 500}`, // Extra buffer for stability
            invalidateOnRefresh: true,
            anticipatePin: 1,
            pinSpacing: true,
          }
        });
      }
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(updateScroll, 300);
    window.addEventListener('resize', updateScroll);

    gsap.fromTo(".project-card-anim", 
      { opacity: 0, scale: 0.9, y: 50 },
      { 
        opacity: 1, scale: 1, y: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: compRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        }
      }
    );

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScroll);
    };
  }, { scope: compRef });

  return (
    <div id="projects" ref={compRef} style={{ width: '100%', position: 'relative', overflow: 'hidden', zIndex: 5, background: 'var(--bg-color)' }}>
      <section style={{ 
        height: '100vh', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 0'
      }}>
        <div className="section-title-anim" style={{ padding: '0 8vw', marginBottom: '30px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>03 — <span className="text-gradient">OPEN SOURCE PROJECTS</span></h2>
        </div>
        
        <div 
          ref={scrollRef} 
          style={{ 
            display: 'flex', 
            gap: '3vw', 
            padding: '0 8vw',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {projects.map((proj, i) => {
            const Icon = proj.icon;
            return (
            <div 
              key={i} 
              className="glass project-card-anim"
              style={{ 
                width: '500px', 
                height: '450px',
                padding: '45px',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.05,
                transform: 'rotate(-15deg)',
                pointerEvents: 'none'
              }}>
                {Icon && <Icon size={240} color="var(--accent-cyan)" />}
              </div>

              <div style={{ marginBottom: 'auto', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', background: 'rgba(0, 255, 255, 0.1)', padding: '6px 16px', borderRadius: '50px', display: 'inline-block', marginBottom: '25px', fontWeight: 'bold' }}>
                  {proj.tag}
                </span>
                <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '18px' }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>{proj.desc}</p>
              </div>
              
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="glow-btn" style={{ marginTop: '30px', alignSelf: 'flex-start', position: 'relative', zIndex: 1 }}>
                <ExternalLink size={18} style={{ marginRight: '10px' }} /> View Source
              </a>
            </div>
          )})}
          <div style={{ width: '30vw', flexShrink: 0 }}></div>
        </div>
      </section>
      
      <style>{`
        @media (max-width: 768px) {
           .project-card-anim { width: 85vw !important; padding: 30px !important; }
           .section-title { font-size: 2.2rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Projects;
