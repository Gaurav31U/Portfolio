import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <a href="#home">Gaurav<span className="text-gradient">.Dev</span></a>
      </div>
      
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
        <li><a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
        <li><a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a></li>
        <li><a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
        <li><a href="#achievements" onClick={() => setMobileMenuOpen(false)}>Achievements</a></li>
      </ul>

      <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;
