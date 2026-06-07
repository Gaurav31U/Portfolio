import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  SiRedis, SiDjango, SiSpringboot, SiReact, SiAndroid, SiApachekafka,
  SiCplusplus, SiPython, SiFirebase, SiDocker, SiNodedotjs, SiGit,
  SiRuby, SiRubyonrails, SiKubernetes, SiPostgresql, SiLinux
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';

// Expanded strictly non-zoomed 3840x2160 Coordinate Space!
// Visible viewport matches x: 1920-3840 and y: 0-1080
const techNodes = [
  { id: 'react', x: 2270, y: 350, icon: SiReact, color: '#61DAFB', name: 'React' },
  { id: 'django', x: 3420, y: 320, icon: SiDjango, color: '#44B78B', name: 'Django' },
  { id: 'spring', x: 2420, y: 750, icon: SiSpringboot, color: '#6DB33F', name: 'Spring' },
  { id: 'android', x: 3320, y: 800, icon: SiAndroid, color: '#3DDC84', name: 'Android' },
  { id: 'kafka', x: 2720, y: 200, icon: SiApachekafka, color: '#ffffff', name: 'Kafka' },
  { id: 'redis', x: 2920, y: 850, icon: SiRedis, color: '#DC382D', name: 'Redis' },
  { id: 'cplusplus', x: 2070, y: 550, icon: SiCplusplus, color: '#00599C', name: 'C++' },
  { id: 'python', x: 3120, y: 200, icon: SiPython, color: '#FFD43B', name: 'Python' },
  { id: 'java', x: 3670, y: 600, icon: FaJava, color: '#f89820', name: 'Java' },
  { id: 'aws', x: 3020, y: 550, icon: FaAws, color: '#FF9900', name: 'AWS' },
  { id: 'firebase', x: 2670, y: 500, icon: SiFirebase, color: '#FFCA28', name: 'Firebase' },
  { id: 'docker', x: 2170, y: 800, icon: SiDocker, color: '#2496ED', name: 'Docker' },
  { id: 'node', x: 2020, y: 950, icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
  { id: 'git', x: 2570, y: 950, icon: SiGit, color: '#F05032', name: 'Git' },
  
  // Deep Space Nodes - Physically positioned deep in the overflow zone so they swing up naturally into the blank space!
  { id: 'ruby', x: 1800, y: 1300, icon: SiRuby, color: '#CC342D', name: 'Ruby' },
  { id: 'rails', x: 1400, y: 1550, icon: SiRubyonrails, color: '#D30001', name: 'Rails' },
  { id: 'k8s', x: 2000, y: 1650, icon: SiKubernetes, color: '#326CE5', name: 'K8s' },
  { id: 'sqlite', x: 1600, y: 1200, icon: SiPostgresql, color: '#336791', name: 'Postgres' },
  { id: 'linux', x: 1200, y: 1800, icon: SiLinux, color: '#FCC624', name: 'Linux' }
];

export default function CircuitBoard() {
  const containerRef = useRef();
  const svgRef = useRef();
  const [activeEdge, setActiveEdge] = useState(null);

  // Procedurally generate the organic Neural Network Plexus
  const { decoNodes, lines } = useMemo(() => {
    const dNodes = [];
    const seedRandom = (seed) => {
        let val = seed;
        return () => { val = (val * 9301 + 49297) % 233280; return val / 233280; }
    };
    const rand = seedRandom(124); 

    // 250 background glowing nodes to fill the massive 3840x2160 space
    for(let i=0; i<250; i++) {
        dNodes.push({
           x: rand() * 3840,
           y: rand() * 2160,
           r: rand() * 2.5 + 1.5,
           opacity: rand() * 0.8 + 0.2
        });
    }

    const allNodes = [...dNodes, ...techNodes.map(n => ({ x: n.x, y: n.y, r: 0 }))];
    const computedLines = [];
    const MAX_DIST = 250;

    // Proximity edge generation
    for(let i=0; i<allNodes.length; i++) {
       for(let j=i+1; j<allNodes.length; j++) {
          const dx = allNodes[i].x - allNodes[j].x;
          const dy = allNodes[i].y - allNodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < MAX_DIST) {
             const opacity = Math.pow(1 - (dist / MAX_DIST), 1.5) * 0.6; // Exponential falloff for soft blending
             computedLines.push({ 
                 id: `l-${i}-${j}`, 
                 x1: allNodes[i].x, y1: allNodes[i].y, 
                 x2: allNodes[j].x, y2: allNodes[j].y, 
                 opacity 
             });
          }
       }
    }
    return { decoNodes: dNodes, lines: computedLines };
  }, []);

  useGSAP(() => {
    // Initial Intro animation for Tech Nodes
    gsap.fromTo('.tech-node-group',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.4)", stagger: 0.05, transformOrigin: 'center center' }
    );

    // Intro animation for lines
    gsap.fromTo('.circuit-edge',
      { opacity: 0 },
      { opacity: (i, el) => el.getAttribute('data-base-opacity'), duration: 2, ease: "power2.inOut", stagger: 0.002 }
    );

    // Fade in Graph on scroll past Hero
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      {
        opacity: 0.5,
        scrollTrigger: {
          trigger: document.body,
          start: "5% top",
          end: "15% top",
          scrub: true
        }
      }
    );

    // Fade out Graph when reaching Projects section
    let projectsTrigger = null;
    let timer = null;

    const setupProjectsTrigger = () => {
      const el = document.getElementById('projects');
      if (el && containerRef.current) {
        const tween = gsap.to(containerRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 20%",
            end: "top top",
            scrub: true
          }
        });
        projectsTrigger = tween.scrollTrigger;
      } else if (!el) {
        timer = setTimeout(() => {
          const retryEl = document.getElementById('projects');
          if (retryEl && containerRef.current) {
            const tween = gsap.to(containerRef.current, {
              opacity: 0,
              scrollTrigger: {
                trigger: retryEl,
                start: "top 20%",
                end: "top top",
                scrub: true
              }
            });
            projectsTrigger = tween.scrollTrigger;
          }
        }, 500);
      }
    };

    setupProjectsTrigger();

    // Parallax logic to prevent blank screen clipping
    gsap.to(svgRef.current, {
      y: () => -(window.innerHeight * 0.18),
      rotation: 15,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    return () => {
      if (timer) clearTimeout(timer);
      if (projectsTrigger) projectsTrigger.kill();
    };
  }, { scope: containerRef });

  const handleNodeEnter = (nodeId) => {
    setActiveEdge(nodeId);
  };

  const handleNodeLeave = () => {
    setActiveEdge(null);
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0 }}>
      <style>
        {`
          @keyframes float-pulse { 
             0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(0,255,255,0.7)); } 
             50% { transform: scale(1.05); filter: drop-shadow(0 0 30px rgba(0,255,255,1)); } 
          }
          @keyframes signal-flow { to { stroke-dashoffset: -200; } }
          .tech-node-active { animation: float-pulse 2s ease-in-out infinite; }
          .signal-burst { animation: signal-flow 4s linear infinite; }
        `}
      </style>
      
      <svg 
        ref={svgRef} 
        viewBox="0 0 3840 2160" 
        preserveAspectRatio="xMidYMid slice" 
        style={{ 
          width: '200vw', 
          height: '200vh', 
          position: 'absolute', 
          top: '0', 
          right: '0', 
          pointerEvents: 'none', 
          willChange: 'transform',
          transformOrigin: 'top right'
        }}
      >
        <defs>
          <filter id="mesh-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Render Plexus Lines */}
        <g stroke="#00ffff" strokeWidth="1">
           {lines.map((line) => (
              <line key={line.id} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} opacity={line.opacity} className="circuit-edge" data-base-opacity={line.opacity} />
           ))}
        </g>
        
        {/* Render Decorative Background Nodes */}
        <g fill="#00ffff">
           {decoNodes.map((n, i) => (
              <circle key={`deco-${i}`} cx={n.x} cy={n.y} r={n.r} opacity={n.opacity} filter="url(#mesh-glow)" />
           ))}
        </g>

        {/* Dynamic Connections between Active Node and background */}
        {activeEdge && (
           <g stroke={techNodes.find(n => n.id === activeEdge)?.color} strokeWidth="2" opacity="0.8">
              {lines
                 .filter(l => {
                    const activeN = techNodes.find(n => n.id === activeEdge);
                    return (l.x1 === activeN.x && l.y1 === activeN.y) || (l.x2 === activeN.x && l.y2 === activeN.y);
                 })
                 .map((l, i) => (
                    <line key={`act-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} filter="url(#mesh-glow)" strokeDasharray="5 15" className="signal-burst"/>
                 ))}
           </g>
        )}

        {/* Render Interactive Tech Nodes */}
        {techNodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeEdge === node.id;
          
          return (
            <g 
              key={node.id} 
              transform={`translate(${node.x}, ${node.y})`}
              style={{ cursor: 'pointer', outline: 'none', pointerEvents: 'auto' }}
              onMouseEnter={() => handleNodeEnter(node.id)}
              onMouseLeave={handleNodeLeave}
              className={`tech-node-group ${isActive ? "tech-node-active" : ""}`}
            >
              {/* Soft organic outer halo */}
              <circle 
                r={isActive ? "55" : "40"}
                fill={isActive ? node.color : "transparent"}
                fillOpacity={isActive ? 0.15 : 0}
                stroke={isActive ? node.color : "rgba(255,255,255,0.05)"} 
                strokeWidth={isActive ? "2" : "1"} 
                style={{ transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                filter="url(#mesh-glow)"
              />
              
              {/* Dense inner glow drop */}
              <circle 
                r="28"
                fill={isActive ? node.color : "#0a0a0a"} 
                stroke={isActive ? "#fff" : node.color} 
                strokeWidth="2" 
                filter="url(#mesh-glow)"
                style={{ transition: 'all 0.4s ease' }}
              />

              {/* Icon */}
              <svg x="-16" y="-16" width="32" height="32" style={{ pointerEvents: 'none' }}>
                <Icon size="32" color={isActive ? "#fff" : node.color} style={{ transition: 'color 0.4s ease' }}/>
              </svg>

              {/* Data label */}
              <text 
                x={0} 
                y={isActive ? "85" : "65"} 
                fill={isActive ? "#fff" : "#cccccc"} 
                fontSize="16" 
                textAnchor="middle" 
                letterSpacing="2"
                style={{ transition: 'all 0.4s ease', fontFamily: 'monospace', textTransform: 'uppercase', fontStyle: 'italic', fontWeight: 'bold' }}
                filter={isActive ? "url(#mesh-glow)" : ""}
                opacity={isActive ? 1 : 0.85}
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
