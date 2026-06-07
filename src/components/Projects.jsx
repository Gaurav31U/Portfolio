import React, { useRef } from 'react';
import { ExternalLink, BrainCircuit, GraduationCap, Ship, ShoppingBag, Atom, BookOpen, Cpu, Terminal, GitBranch } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const projects = [
  {
    title: "ABYSS: Visual Cognitive Engine",
    desc: [
      "Engineered a web-based educational visualization platform designed to decode complex systems across Science, Math, AI, and Finance using interactive 3D environments.",
      "Built an immersive React frontend leveraging Three.js (@react-three/fiber, @react-three/drei) and Framer Motion to render real-time, interactive models.",
      "Designed a Node.js/Express backend with an Apache CouchDB database to securely store and retrieve complex visual configurations.",
      "Deployed on AWS EC2 using Nginx as a reverse proxy, configuring SSL via Let's Encrypt, and integrating AWS SES for communications.",
      "Optimized memory utilization for AWS t2.micro/nano instances by configuring system swap space, achieving stable 3D rendering."
    ],
    tag: "React / Three.js / AWS",
    branch: "main",
    link: "https://github.com/Gaurav31U",
    icon: Atom
  },
  {
    title: "GyanDrishti",
    desc: [
      "Architected and deployed a modern Android educational platform delivering immersive 3D lesson content using a hardware-accelerated WebView implementation with Three.js.",
      "Engineered a custom network proxy and local file caching system to intercept and cache 3D assets, significantly reducing network latency.",
      "Developed a dynamic, premium UI/UX using Jetpack Compose, featuring an animated search system and custom dark-themed design system.",
      "Built a custom analytics engine to track user engagement, visualizing learning distribution through animated Compose Canvas charts.",
      "Integrated Google AdMob, Google Play Billing, and Firebase (Auth, Firestore) for secure real-time data sync and monetization."
    ],
    tag: "Kotlin / Jetpack Compose",
    branch: "prod",
    link: "https://github.com/Gaurav31U",
    icon: BrainCircuit
  },
  {
    title: "QuizOcean",
    desc: [
      "Architected a comprehensive educational Android application using Kotlin and Jetpack Compose with a clean MVVM architecture.",
      "Engineered a robust backend infrastructure using Firebase Firestore and Auth, implementing secure OTP verification with custom rate-limiting.",
      "Developed an offline-first experience utilizing a custom network monitoring service to gracefully handle connectivity states.",
      "Integrated complex mathematical formula rendering using JLaTeXMath and implemented logic for standardized IQ tests.",
      "Implemented a highly scalable, paginated real-time leaderboard using Firestore to optimize read operations.",
      "Monetized the application by integrating Google Play Billing for premium subscriptions and Google AdMob."
    ],
    tag: "Kotlin / Firebase",
    branch: "stable",
    link: "https://github.com/Gaurav31U",
    icon: GraduationCap
  },
  {
    title: "JEE Mock Test Series",
    desc: [
      "Developed a feature-rich, native Android application in Kotlin designed to simulate the Joint Entrance Examination (JEE) with a real-time 3-hour countdown.",
      "Integrated Firebase Firestore via the DAO pattern and Kotlin Coroutines for real-time synchronization of dynamic mock tests.",
      "Incorporated a LaTeX formatter library (MathRenderer) to accurately render complex mathematical and chemical equations.",
      "Engineered a performance analysis module calculating subject-wise marks, accuracy tracking, and comprehensive solution reviews.",
      "Built a modern, edge-to-edge UI using Material 3, DataBinding, Navigation Component, and optimized RecyclerViews."
    ],
    tag: "Kotlin / Android",
    branch: "v1.2",
    link: "https://github.com/Gaurav31U/Android-Application-Mocktest",
    icon: BookOpen
  },
  {
    title: "ArtStock",
    desc: [
      "Developed a comprehensive e-commerce platform using Django and Python to connect artists with buyers, featuring role-based access controls.",
      "Engineered the underlying database schema using Django ORM and SQLite to handle complex relationships between Artists, Customers, Artworks, and Orders.",
      "Integrated image processing capabilities using Pillow to manage and optimize user-uploaded artwork efficiently.",
      "Containerized the application infrastructure using Docker and Docker Compose, streamlining the deployment environment.",
      "Established a robust observability pipeline by deploying Prometheus, Grafana, and Loki for real-time performance monitoring."
    ],
    tag: "Python / Django / Docker",
    branch: "main",
    link: "https://github.com/Gaurav31U/Django-ArtStock-Website",
    icon: ShoppingBag
  },
  {
    title: "WaterWays",
    desc: [
      "Developed a comprehensive cruise management web application using Java and Spring Boot, implementing an MVC/MVVM architecture.",
      "Designed a robust MySQL database schema; enforced strict ACID properties utilizing Spring's @Transactional annotations.",
      "Containerized the entire application ecosystem using Docker Compose with the Java backend, Redis for caching, and Prometheus/Grafana.",
      "Engineered role-based administrative and user portals using Thymeleaf, implementing complex SQL queries for dynamic search functionalities."
    ],
    tag: "Java / Spring Boot",
    branch: "main",
    link: "https://github.com/Gaurav31U/WaterWays-Java-Spring-Boot-Project-DBMS",
    icon: Ship
  },
  {
    title: "MLP Classifier from Scratch",
    desc: [
      "A highly optimized Multi-Layer Perceptron (MLP) machine learning classifier implemented entirely from scratch without high-level ML wrappers.",
      "Designed for deep understanding of backpropagation, gradient descent, and neural network architectures."
    ],
    tag: "Python / NumPy",
    branch: "legacy",
    link: "https://github.com/Gaurav31U/Multilayer-Perceptron-Classifier-using-Python",
    icon: Cpu
  },
  {
    title: "Core Software Reconstructions",
    desc: [
      "Deep-dive systems engineering reconstructing industry-standard software from scratch in C++.",
      "Implementations include: HTTP Server, Git, Redis, DNS Server, SQLite, and BitTorrent.",
      "Focuses on low-level networking, custom parsers, state management, and multi-threading."
    ],
    tag: "Modern C++ / Architecture",
    branch: "dev",
    link: "https://github.com/Gaurav31U/Http-Server-using-Cpp",
    icon: Terminal
  }
];

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const compRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    if (!scrollRef.current || !compRef.current) return;

    let activeScrollTrigger = null;
    
    const updateScroll = () => {
      // Clean up previous scroll trigger if it exists
      if (activeScrollTrigger) {
        activeScrollTrigger.kill();
        activeScrollTrigger = null;
      }

      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const amountToScroll = scrollWidth - viewportWidth;

      if (amountToScroll > 0) {
        const tween = gsap.to(scrollRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: compRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            pinSpacing: true,
          }
        });
        activeScrollTrigger = tween.scrollTrigger;
      }
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(updateScroll, 300);
    window.addEventListener('resize', updateScroll);

    gsap.fromTo(".project-card-anim", 
      { opacity: 0, scale: 0.95, y: 30 },
      { 
        opacity: 1, scale: 1, y: 0, 
        stagger: 0.08, 
        duration: 0.6, 
        ease: "power3.out",
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
      if (activeScrollTrigger) {
        activeScrollTrigger.kill();
      }
    };
  }, { scope: compRef });

  return (
    <div id="projects" ref={compRef} style={{ width: '100%', position: 'relative', overflow: 'hidden', zIndex: 20, background: 'var(--bg-color)' }}>
      <section style={{ 
        height: '100vh', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 0'
      }}>
        <div className="section-title-anim" style={{ padding: '0 8vw', marginBottom: '30px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            <span className="section-num">03 —</span>
            <span className="text-gradient">OPEN SOURCE PROJECTS</span>
          </h2>
        </div>
        
        <div 
          ref={scrollRef} 
          style={{ 
            display: 'flex', 
            gap: '2vw', 
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
              className="card-cyber project-card-anim"
              style={{ 
                width: '580px', 
                height: '600px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Massive background watermark icon */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                opacity: 0.025,
                transform: 'rotate(-12deg)',
                pointerEvents: 'none'
              }}>
                {Icon && <Icon size={220} color="var(--accent-cyan)" />}
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', background: 'rgba(0, 255, 156, 0.08)', border: '1px solid rgba(0, 255, 156, 0.15)', padding: '5px 12px', borderRadius: '4px', display: 'inline-block', fontWeight: '500', fontFamily: 'var(--font-mono)' }}>
                  {proj.tag}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <GitBranch size={14} color="var(--accent-purple)" />
                  <span>{proj.branch}</span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginBottom: '18px', fontWeight: '600', position: 'relative', zIndex: 1 }}>{proj.title}</h3>
              
              <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1, paddingRight: '10px', marginBottom: '25px' }}>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.92rem', paddingLeft: '15px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Array.isArray(proj.desc) ? proj.desc.map((bullet, idx) => (
                    <li key={idx} style={{ paddingLeft: '5px' }}>{bullet}</li>
                  )) : (
                    proj.desc && <li style={{ paddingLeft: '5px' }}>{proj.desc}</li>
                  )}
                </ul>
              </div>
              
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="glow-btn" style={{ alignSelf: 'flex-start', position: 'relative', zIndex: 1 }}>
                <ExternalLink size={16} style={{ marginRight: '10px' }} /> VIEW SOURCE
              </a>
            </div>
          )})}
          <div style={{ width: '25vw', flexShrink: 0 }}></div>
        </div>
      </section>
      
      <style>{`
        @media (max-width: 768px) {
           .project-card-anim { width: 85vw !important; padding: 25px !important; height: auto !important; max-height: 80vh !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.4); }
      `}</style>
    </div>
  );
};

export default Projects;
