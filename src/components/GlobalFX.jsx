import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Site-wide interaction layer: scroll progress bar, cursor glow,
// per-card spotlight (sets --mx/--my on .card-cyber) and back-to-top.
const GlobalFX = () => {
  const barRef = useRef(null);
  const glowRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        setShowTop(window.scrollY > window.innerHeight);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
        glowRef.current.style.opacity = '1';
      }
      const card = e.target.closest?.('.card-cyber');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    const onLeave = () => { if (glowRef.current) glowRef.current.style.opacity = '0'; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div className="fx-progress" ref={barRef} />
      <div className="fx-glow" ref={glowRef} aria-hidden="true" />
      <button
        className={`fx-top ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
      <style>{`
        .fx-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan), var(--accent-purple));
          transform-origin: 0 50%; transform: scaleX(0);
          z-index: 2000; pointer-events: none;
        }
        .fx-glow {
          position: fixed; top: 0; left: 0; width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.06), rgba(139, 92, 246, 0.03) 40%, transparent 70%);
          pointer-events: none; z-index: 5; opacity: 0;
          transition: opacity 0.4s ease;
          will-change: transform;
        }
        .fx-top {
          position: fixed; right: 24px; bottom: 24px; z-index: 900;
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(8, 8, 12, 0.85); color: #fff;
          border: 1px solid rgba(0, 240, 255, 0.3);
          cursor: pointer; opacity: 0; transform: translateY(20px); pointer-events: none;
          transition: all 0.3s ease;
        }
        .fx-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .fx-top:hover { box-shadow: 0 0 20px rgba(0, 240, 255, 0.35); border-color: var(--accent-cyan); }
      `}</style>
    </>
  );
};

export default GlobalFX;
