import React, { useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './index.css';
import './App.css';

function App() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="app-container">
      {/* Global Background Visualization */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: { 
            events: { onHover: { enable: true, mode: "grab" } }, 
            modes: { grab: { distance: 150, links: { opacity: 0.8 } } } 
          },
          particles: {
            color: { value: "#00ffff" },
            links: { color: "#a855f7", distance: 150, enable: true, opacity: 0.3, width: 1 },
            move: { enable: true, random: false, speed: 0.8, straight: false },
            number: { density: { enable: true, area: 1000 }, value: 60 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
