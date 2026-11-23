import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ExternalLink, BrainCircuit, GraduationCap, Ship, ShoppingBag, Atom, BookOpen, Cpu, Terminal, GitBranch, Shield, Volume2, Code, X, ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AbyssLogicLab from './AbyssLogicLab';

const projects = [
  {
    title: "ABYSS (Logic Lab)",
    category: ['web', '3d'],
    summary: "Interactive 3D science & maths lab running at 60 FPS in the browser.",
    desc: [
      "Engineered a WebGL-powered 3D simulation engine utilizing React Three Fiber and Three.js to render complex quantum mechanics, chemical bonding, and multivariable calculus manifolds at 60 FPS.",
      "Programmed dynamic mesh deformation loops that compile and mutate WebGL plane geometries in real time using Three.js buffer attributes.",
      "Integrated a symbolic math parsing and calculation system inside the React state lifecycle to parse and evaluate user-defined equations dynamically.",
      "Offloaded CPU-intensive Monte Carlo and Markov Chain Monte Carlo (MCMC) simulations to background Web Workers to maintain frame rates.",
      "Orchestrated a premium, dark-themed glassmorphism HUD interface using styled CSS and custom keyframe animations.",
      "Built real-time statistical distribution graphs and convergence charts using custom HTML5 Canvas components for zero-dependency charting."
    ],
    tag: "React / WebGL / Web Workers",
    branch: "main",
    link: "https://abyss-web.s3.ap-south-1.amazonaws.com/index.html",
    icon: Atom
  },
  {
    title: "NetWire (VPN & Security Shield)",
    category: ['android', 'systems'],
    summary: "Android VPN that captures and analyses network packets in native C++.",
    desc: [
      "Engineered a high-performance C++ packet capture service integrated with Android’s VpnService API using the Java Native Interface (JNI).",
      "Designed an asynchronous packet capture loop on a dedicated POSIX thread reading directly from the virtual TUN interface file descriptor.",
      "Implemented raw IPv4, TCP, and UDP packet header parsers in native C++ to extract packet sizes, ports, and target IP addresses.",
      "Optimized JNI boundary crossings by implementing a packet batching buffer to reduce CPU overhead and eliminate native memory leaks.",
      "Developed a custom binary exporter implementing the PCAPNG file format specifications, allowing seamless analysis in Wireshark.",
      "Sandboxed the CyberChef utility inside Jetpack Compose using WebViewAssetLoader to provide a secure offline cryptographic suite."
    ],
    tag: "Kotlin / C++ / JNI / Android",
    branch: "main",
    link: "https://play.google.com/store/apps/details?id=com.abyss.netwire",
    icon: Shield
  },
  {
    title: "TextSpeechAI (Offline AI Reader)",
    category: ['android', 'ai'],
    summary: "Private document reader with on-device LLM and text-to-speech.",
    desc: [
      "Architected a private, offline AI document reader integrating llama.cpp and Sherpa-ONNX via JNI for local LLM and speech synthesis.",
      "Developed a reactive document processing pipeline using PDFBox Android and Kotlin Flows on background IO thread dispatchers.",
      "Built a TTS audio manager feeding PCM float buffers to Android AudioTrack with sentence highlight tracking and playback controls.",
      "Created a background asset-management system using Android WorkManager and OkHttp to download and verify multi-gigabyte models.",
      "Authored a thread-safe extraction layer using Apache Commons Compress to decompress bz2 and zip voice archives on-device."
    ],
    tag: "Kotlin / ONNX / Llama.cpp",
    branch: "main",
    link: "https://github.com/Gaurav31U",
    icon: Volume2
  },
  {
    title: "GPT-2 Inference Engine",
    category: ['ai', 'systems'],
    summary: "GPT-2 transformer inference written from scratch in C++ with OpenMP.",
    desc: [
      "Built a zero-dependency GPT-2 transformer decoder inference engine in C++ from scratch, implementing custom neural network layers.",
      "Designed and coded a Multi-Head Attention (MHA) module implementing scaled dot-product attention, causal masking, and Softmax.",
      "Optimized inference speed by parallelizing matrix computations and tensor operations using OpenMP multi-threaded compiler directives.",
      "Developed an autoregressive text generation loop incorporating temperature scaling, Top-K filtering, and discrete multinomial sampling.",
      "Engineered a Byte-Pair Encoding (BPE) SimpleTokenizer in C++ with a greedy longest-match lookup algorithm to encode/decode prompts."
    ],
    tag: "Modern C++ / OpenMP / AI",
    branch: "main",
    link: "https://github.com/Gaurav31U/LLM-using-Cplusplus",
    icon: Code
  },
  {
    title: "GyanDrishti",
    category: ['android', '3d'],
    summary: "Educational Android app with immersive 3D lessons, billing and analytics.",
    desc: [
      "Architected and deployed a modern Android educational platform delivering immersive 3D lesson content using a hardware-accelerated WebView implementation with Three.js.",
      "Engineered a custom network proxy and local file caching system to intercept and cache 3D assets, significantly reducing network latency.",
      "Developed a dynamic, premium UI/UX using Jetpack Compose, featuring an animated search system and custom dark-themed design system.",
      "Built a custom analytics engine to track user engagement, visualizing learning distribution through animated Compose Canvas charts.",
      "Integrated Google AdMob, Google Play Billing, and Firebase (Auth, Firestore) for secure real-time data sync and monetization."
    ],
    tag: "Kotlin / Jetpack Compose",
    branch: "prod",
    link: "https://play.google.com/store/apps/details?id=com.abyss.gyandrishti",
    icon: BrainCircuit
  },
  {
    title: "QuizOcean",
    category: ['android'],
    summary: "Quiz & IQ-test app with live leaderboards, OTP auth and subscriptions.",
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
    link: "https://play.google.com/store/apps/details?id=com.abyss.quizocean",
    icon: GraduationCap
  },
  {
    title: "JEE Mock Test Series",
    category: ['android'],
    summary: "Timed JEE exam simulator with LaTeX rendering and performance analytics.",
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
    category: ['web', 'backend'],
    summary: "Art marketplace connecting artists and buyers, with full observability stack.",
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
    category: ['web', 'backend'],
    summary: "Cruise booking & management platform on Spring Boot, MySQL and Redis.",
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
    category: ['ai'],
    summary: "Neural-network classifier built without ML frameworks.",
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
    category: ['systems', 'backend'],
    summary: "HTTP server, Git, Redis, DNS, SQLite & BitTorrent rebuilt in C++.",
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

const filters = [
  { id: 'all', label: 'All Work' },
  { id: 'android', label: 'Android' },
  { id: 'web', label: 'Web' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI / ML' },
  { id: '3d', label: '3D / WebGL' },
  { id: 'systems', label: 'Systems' },
];

const linkLabel = (link) =>
  link.includes('play.google.com') ? 'PLAY STORE' :
  link.includes('amazonaws.com') ? 'LIVE DEMO' : 'VIEW SOURCE';

const isLive = (link) => link.includes('play.google.com') || link.includes('amazonaws.com');

// Subtle 3D tilt that follows the pointer
const handleTilt = (e) => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
};
const resetTilt = (e) => { e.currentTarget.style.transform = ''; };

const ProjectModal = ({ project, onClose, onLaunchLab }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const Icon = project.icon;
  return (
    <div className="proj-modal-backdrop" onClick={onClose}>
      <div className="proj-modal card-cyber" role="dialog" aria-modal="true" aria-labelledby="proj-modal-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="proj-modal-close" onClick={onClose} aria-label="Close case study"><X size={20} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px', paddingRight: '40px' }}>
          <div className="proj-icon">{Icon && <Icon size={22} />}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-green)' }}>CASE STUDY</div>
            <h3 id="proj-modal-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 600, lineHeight: 1.2 }}>{project.title}</h3>
          </div>
        </div>
        <p style={{ color: '#d5dde6', fontSize: '1.02rem', margin: '8px 0 20px' }}>{project.summary}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '22px' }}>
          {project.tag.split('/').map((t) => <span key={t} className="tech-tag">{t.trim()}</span>)}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '10px', letterSpacing: '1px' }}>WHAT I BUILT</div>
        <ul className="proj-modal-list">
          {project.desc.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '26px' }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="glow-btn primary">
            <ExternalLink size={16} style={{ marginRight: '10px' }} /> {linkLabel(project.link)}
          </a>
          {project.title.includes('ABYSS') && (
            <button onClick={onLaunchLab} className="glow-btn">
              <Atom size={16} style={{ marginRight: '10px' }} /> LAUNCH LAB
            </button>
          )}
          <a href="#contact" onClick={onClose} className="glow-btn">BUILD SOMETHING SIMILAR</a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [labOpen, setLabOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const compRef = useRef(null);
  const gridRef = useRef(null);
  const firstRender = useRef(true);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category.includes(filter))),
    [filter]
  );

  const counts = useMemo(() => Object.fromEntries(filters.map((f) => [
    f.id, f.id === 'all' ? projects.length : projects.filter((p) => p.category.includes(f.id)).length,
  ])), []);

  useGSAP(() => {
    gsap.fromTo('.reveal-title-projects', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.reveal-title-projects', start: 'top 90%' },
    });
    gsap.fromTo('.project-card-anim', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
    });
  }, { scope: compRef });

  // Animate cards in when the filter changes (skip the initial mount; scroll reveal handles that)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (!gridRef.current) return;
    gsap.fromTo(gridRef.current.children, { opacity: 0, y: 20, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out',
    });
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section id="projects" className="section" ref={compRef}>
      <div className="reveal-title-projects" style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">03 —</span>
          <span className="text-gradient">SELECTED WORK</span>
        </h2>
        <p className="section-lead">Real products on the Play Store, live web apps and deep systems work. Click any project for the full case study.</p>
      </div>

      <div className="proj-filters" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`chip ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <span className="chip-count">{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <div className="proj-grid" ref={gridRef}>
        {visible.map((proj) => {
          const Icon = proj.icon;
          return (
            <article
              key={proj.title}
              className="card-cyber project-card-anim proj-card"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              onClick={() => setSelected(proj)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(proj); } }}
              tabIndex={0}
              role="button"
              aria-label={`Open case study: ${proj.title}`}
            >
              <div className="proj-watermark">{Icon && <Icon size={180} color="var(--accent-cyan)" />}</div>

              <div className="proj-card-top">
                <div className="proj-icon">{Icon && <Icon size={20} />}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {isLive(proj.link) && <span className="proj-live"><span className="status-dot" /> LIVE</span>}
                  <span className="proj-branch"><GitBranch size={12} color="var(--accent-purple)" /> {proj.branch}</span>
                </div>
              </div>

              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-summary">{proj.summary}</p>

              <div className="proj-tags">
                {proj.tag.split('/').map((t) => <span key={t} className="tech-tag">{t.trim()}</span>)}
              </div>

              <div className="proj-card-footer">
                <span className="proj-open"><Layers size={14} /> Case study</span>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {linkLabel(proj.link)} <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .proj-filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 2rem; }
        .chip-count { opacity: 0.6; font-family: var(--font-mono); font-size: 0.72rem; margin-left: 4px; }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
        }
        .proj-card {
          display: flex; flex-direction: column; gap: 14px; cursor: pointer;
          min-height: 320px; transition: transform 0.25s ease-out, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .proj-card:hover { box-shadow: 0 20px 50px rgba(0, 240, 255, 0.08); }
        .proj-watermark {
          position: absolute; top: -20px; right: -20px; opacity: 0.03;
          transform: rotate(-12deg); pointer-events: none; transition: opacity 0.4s ease, transform 0.6s ease;
        }
        .proj-card:hover .proj-watermark { opacity: 0.07; transform: rotate(-4deg) scale(1.05); }
        .proj-card-top { display: flex; justify-content: space-between; align-items: center; position: relative; }
        .proj-icon {
          width: 42px; height: 42px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent-cyan); border: 1px solid rgba(0, 240, 255, 0.3); background: rgba(0, 240, 255, 0.05);
        }
        .proj-live {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-green);
          border: 1px solid rgba(0, 255, 156, 0.25); background: rgba(0, 255, 156, 0.06);
          padding: 3px 8px; border-radius: 999px;
        }
        .proj-branch { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); }
        .proj-title { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 600; position: relative; line-height: 1.25; }
        .proj-summary { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; position: relative; }
        .proj-tags { display: flex; gap: 6px; flex-wrap: wrap; position: relative; }
        .proj-card-footer {
          margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex; justify-content: space-between; align-items: center; position: relative;
        }
        .proj-open { display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--accent-cyan); font-family: var(--font-heading); font-weight: 600; }
        .proj-link {
          display: inline-flex; align-items: center; gap: 4px; text-decoration: none;
          font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary);
          padding: 6px 10px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.25s ease;
        }
        .proj-link:hover { color: #fff; border-color: var(--accent-green); }

        .proj-modal-backdrop {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: projFade 0.25s ease;
        }
        .proj-modal {
          width: 100%; max-width: 760px; max-height: 88vh; overflow-y: auto;
          padding: 40px !important; background: rgba(8, 8, 12, 0.97) !important;
          animation: projRise 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .proj-modal:hover { transform: none; }
        .proj-modal-close {
          position: absolute; top: 16px; right: 16px; width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff;
          display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2;
        }
        .proj-modal-close:hover { border-color: var(--accent-cyan); }
        .proj-modal-list { color: var(--text-secondary); line-height: 1.65; font-size: 0.95rem; padding-left: 18px; display: flex; flex-direction: column; gap: 10px; }
        .proj-modal-list li::marker { color: var(--accent-green); }
        @keyframes projFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes projRise { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: none; } }
        @media (max-width: 480px) {
          .proj-grid { grid-template-columns: 1fr; }
          .proj-modal { padding: 28px 20px !important; }
        }
      `}</style>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
          onLaunchLab={() => { setSelected(null); setLabOpen(true); }}
        />
      )}
      {labOpen && <AbyssLogicLab onClose={() => setLabOpen(false)} />}
    </section>
  );
};

export default Projects;
