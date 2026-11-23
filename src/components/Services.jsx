import React, { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { services } from './servicesData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);


const requestService = (title) => {
  window.dispatchEvent(new CustomEvent('select-service', { detail: title }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const Services = () => {
  const compRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.reveal-title-services', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.reveal-title-services', start: 'top 90%' },
    });
    gsap.fromTo('.service-card', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
    });
  }, { scope: compRef });

  return (
    <section id="services" className="section" ref={compRef}>
      <div className="reveal-title-services" style={{ marginBottom: '3.5rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">02 —</span>
          <span className="text-gradient">WHAT I CAN BUILD FOR YOU</span>
        </h2>
        <p className="section-lead">
          From a quick MVP to a production system — pick what you need and I'll get back to you with a plan and estimate.
        </p>
      </div>

      <div className="services-grid">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.id} className="card-cyber service-card">
              <div className="service-icon" style={{ color: s.color, borderColor: s.color }}>
                <Icon size={22} />
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-pitch">{s.pitch}</p>
              <ul className="service-points">
                {s.points.map((p) => (
                  <li key={p}><Check size={14} color="var(--accent-green)" /> {p}</li>
                ))}
              </ul>
              <div className="service-footer">
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {s.stack.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <button className="service-cta" onClick={() => requestService(s.title)}>
                  Request this <ArrowRight size={14} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 22px;
        }
        .service-card { display: flex; flex-direction: column; gap: 14px; }
        .service-icon {
          width: 48px; height: 48px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid; background: rgba(255, 255, 255, 0.02);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card:hover .service-icon { transform: rotate(-8deg) scale(1.08); }
        .service-title { font-family: var(--font-heading); font-size: 1.35rem; font-weight: 600; }
        .service-pitch { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; }
        .service-points { list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem; color: #d5dde6; }
        .service-points li { display: flex; align-items: center; gap: 8px; }
        .service-footer {
          margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .service-cta {
          background: none; border: none; color: var(--accent-cyan); cursor: pointer;
          font-family: var(--font-heading); font-size: 0.85rem; font-weight: 600;
          display: inline-flex; align-items: center; gap: 6px; padding: 4px 0;
          transition: gap 0.25s ease, color 0.25s ease;
        }
        .service-cta:hover { gap: 10px; color: var(--accent-green); }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Services;
