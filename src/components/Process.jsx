import React, { useRef } from 'react';
import { MessageSquare, ClipboardList, Code2, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: MessageSquare, title: 'Discovery Call', desc: 'A free call to understand your goals, users and constraints. No obligations.' },
  { icon: ClipboardList, title: 'Plan & Estimate', desc: 'A clear scope, milestones, tech choices and a fixed quote or hourly estimate.' },
  { icon: Code2, title: 'Build & Demo', desc: 'Work in short sprints with regular demos, so you see progress and can steer early.' },
  { icon: Rocket, title: 'Launch & Support', desc: 'Deployment, handover docs and post-launch support so nothing breaks after go-live.' },
];

const promises = ['Clean, documented code you own', 'Regular progress updates', 'Clear communication in English & Hindi', 'Post-launch bug-fix support'];

const Process = () => {
  const compRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.reveal-title-process', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.reveal-title-process', start: 'top 90%' },
    });
    const mm = gsap.matchMedia();
    const fillLine = (axis) => gsap.fromTo('.process-line-fill', { [axis]: 0 }, {
      [axis]: 1, ease: 'none',
      scrollTrigger: { trigger: '.process-steps', start: 'top 80%', end: 'bottom 55%', scrub: 1 },
    });
    mm.add('(min-width: 901px)', () => { fillLine('scaleX'); });
    mm.add('(max-width: 900px)', () => { fillLine('scaleY'); });
    gsap.fromTo('.process-step', { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.process-steps', start: 'top 80%' },
    });
  }, { scope: compRef });

  return (
    <section id="process" className="section" ref={compRef}>
      <div className="reveal-title-process" style={{ marginBottom: '3.5rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">04 —</span>
          <span className="text-gradient">HOW WE'LL WORK</span>
        </h2>
        <p className="section-lead">A simple, transparent process — you always know what's being built, when, and why.</p>
      </div>

      <div className="process-steps">
        <div className="process-line"><div className="process-line-fill" /></div>
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="process-step">
              <div className="process-node">
                <Icon size={20} />
                <span className="process-index">0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="process-promises">
        {promises.map((p) => (
          <span key={p} className="process-promise"><span className="status-dot" /> {p}</span>
        ))}
      </div>

      <style>{`
        .process-steps {
          position: relative;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px;
        }
        .process-line {
          position: absolute; top: 28px; left: 28px; right: 28px; height: 2px;
          background: rgba(255, 255, 255, 0.06);
        }
        .process-line-fill {
          height: 100%; transform-origin: 0 50%;
          background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan), var(--accent-purple));
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
        }
        .process-step { position: relative; display: flex; flex-direction: column; gap: 12px; }
        .process-node {
          position: relative; width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #08080c; color: var(--accent-cyan);
          border: 1px solid rgba(0, 240, 255, 0.35);
          box-shadow: 0 0 0 6px var(--bg-color);
          transition: all 0.3s ease;
        }
        .process-step:hover .process-node {
          color: #030303; background: linear-gradient(135deg, var(--accent-green), var(--accent-cyan));
          box-shadow: 0 0 0 6px var(--bg-color), 0 0 25px rgba(0, 255, 156, 0.45);
        }
        .process-index {
          position: absolute; top: -8px; right: -12px;
          font-family: var(--font-mono); font-size: 0.65rem; color: var(--accent-green);
          background: var(--bg-color); padding: 1px 4px; border-radius: 3px;
        }
        .process-step h3 { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 600; margin-top: 8px; }
        .process-step p { color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; }
        .process-promises {
          margin-top: 3.5rem; display: flex; flex-wrap: wrap; gap: 12px;
        }
        .process-promise {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06); background: rgba(255, 255, 255, 0.02);
          padding: 10px 16px; border-radius: 999px; font-size: 0.88rem; color: #d5dde6;
        }
        @media (max-width: 900px) {
          .process-steps { grid-template-columns: 1fr; gap: 32px; padding-left: 0; }
          .process-line { top: 28px; bottom: 28px; left: 27px; right: auto; width: 2px; height: auto; }
          .process-line-fill { width: 100%; height: 100%; transform-origin: 50% 0; }
          .process-step { padding-left: 80px; min-height: 56px; }
          .process-node { position: absolute; left: 0; top: 0; }
          .process-step h3 { margin-top: 0; }
        }
      `}</style>
    </section>
  );
};

export default Process;
