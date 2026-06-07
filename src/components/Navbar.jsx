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
        <a href="#home" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>GAURAV</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }}></span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '400', letterSpacing: '1px' }}>IIT BHU</span>
        </a>
      </div>
      
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        {['About', 'Skills', 'Projects', 'Experience', 'Achievements'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="nav-status" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
          <span className="status-dot"></span>
          <span>SYSTEMS ACTIVE</span>
        </div>

        <a href="mailto:gkxp1000@gmail.com" className="glow-btn" style={{ fontSize: '0.75rem', padding: '8px 18px' }}>
          CONTACT
        </a>

        <button className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 1001 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style>{`
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
        .nav-links.active li a {
          font-size: 1.4rem;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
