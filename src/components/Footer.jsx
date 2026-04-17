import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="social-links">
        <a href="https://github.com/Gaurav31U" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://linkedin.com/in/gaurav31u" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
        <a href="mailto:gkxp1000@gmail.com">
          <Mail size={24} />
        </a>
        <a href="tel:+918218039928">
          <Phone size={24} />
        </a>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Gaurav Kumar. Designed & Built with React.
      </p>
    </footer>
  );
};

export default Footer;
