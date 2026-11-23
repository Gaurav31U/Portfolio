import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  // Track scrolled state and highlight the section currently in view
  useEffect(() => {
    const ids = links.map((l) => l.id);
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) { setActive('contact'); return; }
        let current = '';
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
        });
        setActive(current);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <a href="#home" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>GAURAV</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }}></span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '400', letterSpacing: '1px' }}>DEV</span>
        </a>
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        {links.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={active === item.id ? 'current' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="nav-status nav-status-desktop">
          <span className="status-dot"></span>
          <span>OPEN TO WORK</span>
        </div>

        <a href="#contact" className="glow-btn primary" style={{ fontSize: '0.75rem', padding: '8px 18px' }}>
          HIRE ME
        </a>

        <button
          className="mobile-menu-btn"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 1001 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style>{`
        .nav-links a.current { color: #fff; }
        .nav-links a.current::after { width: 100%; background: var(--accent-green); }
        .nav-links.active {
          display: flex !important;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #030303;
          align-items: center;
          justify-content: center;
          gap: 30px;
          z-index: 1000;
        }
        .nav-links.active li a { font-size: 1.4rem; }
        @media (max-width: 1100px) {
          .nav-status-desktop { display: none !important; }
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
