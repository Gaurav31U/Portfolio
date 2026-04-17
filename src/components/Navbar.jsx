import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Gaurav<span className="text-gradient">.</span></a>
      </div>
      
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} style={{ display: mobileMenuOpen ? 'flex' : '' }}>
        {['About', 'Skills', 'Experience', 'Projects'].map(item => (
          <li key={item}><a href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>{item}</a></li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="mailto:gkxp1000@gmail.com" className="glow-btn" style={{ fontSize: '0.85rem', padding: '10px 20px', display: window.innerWidth > 768 || mobileMenuOpen ? 'inline-flex' : 'none' }}>
           Contact Me
        </a>
        <button className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 1001 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #030303; align-items: center; justify-content: center; font-size: 1.5rem; z-index: 1000; }
          .nav-links li a { font-size: 1.5rem; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
