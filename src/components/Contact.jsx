import React, { useEffect, useRef, useState } from 'react';
import { Mail, Copy, Check, Send, Clock, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { services } from './servicesData';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'gkxp1000@gmail.com';
const projectTypes = [...services.map((s) => s.title), 'Something else'];
const budgets = ['< $500', '$500 – $2k', '$2k – $5k', '$5k+', 'Not sure yet'];
const timelines = ['ASAP', '2–4 weeks', '1–3 months', 'Flexible'];

const useIstClock = () => {
  const fmt = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Contact = () => {
  const compRef = useRef(null);
  const [types, setTypes] = useState([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const istTime = useIstClock();

  // "Request this" buttons in Services preselect a project type
  useEffect(() => {
    const onSelect = (e) => setTypes((prev) => (prev.includes(e.detail) ? prev : [...prev, e.detail]));
    window.addEventListener('select-service', onSelect);
    return () => window.removeEventListener('select-service', onSelect);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.reveal-title-contact', { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.reveal-title-contact', start: 'top 90%' },
    });
    gsap.fromTo('.contact-col', { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' },
    });
  }, { scope: compRef });

  const toggleType = (t) => setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Project inquiry${types.length ? ` — ${types.join(', ')}` : ''}${form.name ? ` from ${form.name}` : ''}`;
    const body = [
      `Hi Gaurav,`,
      '',
      form.message,
      '',
      '---',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${types.join(', ') || 'Not specified'}`,
      `Budget: ${budget || 'Not specified'}`,
      `Timeline: ${timeline || 'Not specified'}`,
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section" ref={compRef}>
      <div className="reveal-title-contact" style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <span className="section-num">08 —</span>
          <span className="text-gradient">LET'S WORK TOGETHER</span>
        </h2>
        <p className="section-lead">Tell me a little about your project. You'll get a reply with questions, a rough plan and an estimate.</p>
      </div>

      <div className="contact-grid">
        <aside className="contact-col card-cyber contact-info">
          <div>
            <div className="availability-badge" style={{ marginBottom: '22px' }}>
              <span className="status-dot" /> Taking new projects
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.25, marginBottom: '14px' }}>
              Have an idea, a deadline, or a bug that won't die?
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              I work with startups, small businesses and individuals worldwide on web, Android, backend and AI projects.
            </p>
          </div>

          <ul className="contact-facts">
            <li><Clock size={16} color="var(--accent-green)" /> Replies within 24 hours</li>
            <li><MapPin size={16} color="var(--accent-cyan)" /> India · IST (UTC+5:30) · it's {istTime} here</li>
          </ul>

          <div className="contact-email">
            <Mail size={18} color="var(--accent-cyan)" />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button onClick={copyEmail} aria-label="Copy email address" className="contact-copy">
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://github.com/Gaurav31U" target="_blank" rel="noopener noreferrer" className="glow-icon-btn" aria-label="GitHub"><FaGithub size={18} /></a>
            <a href="https://linkedin.com/in/gaurav31u" target="_blank" rel="noopener noreferrer" className="glow-icon-btn" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
          </div>
        </aside>

        <form className="contact-col card-cyber contact-form" onSubmit={onSubmit}>
          <fieldset>
            <legend>What do you need?</legend>
            <div className="chip-row">
              {projectTypes.map((t) => (
                <button type="button" key={t} className={`chip ${types.includes(t) ? 'active' : ''}`} aria-pressed={types.includes(t)} onClick={() => toggleType(t)}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="form-row">
            <fieldset>
              <legend>Budget</legend>
              <div className="chip-row">
                {budgets.map((b) => (
                  <button type="button" key={b} className={`chip ${budget === b ? 'active' : ''}`} aria-pressed={budget === b} onClick={() => setBudget(budget === b ? '' : b)}>
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Timeline</legend>
              <div className="chip-row">
                {timelines.map((t) => (
                  <button type="button" key={t} className={`chip ${timeline === t ? 'active' : ''}`} aria-pressed={timeline === t} onClick={() => setTimeline(timeline === t ? '' : t)}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="form-row">
            <label className="field">
              <span>Your name</span>
              <input required value={form.name} onChange={update('name')} placeholder="Jane Doe" autoComplete="name" />
            </label>
            <label className="field">
              <span>Your email</span>
              <input required type="email" value={form.email} onChange={update('email')} placeholder="jane@company.com" autoComplete="email" />
            </label>
          </div>

          <label className="field">
            <span>Project details</span>
            <textarea required rows={5} value={form.message} onChange={update('message')} placeholder="What are you building, who is it for, and what does success look like?" />
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button type="submit" className="glow-btn primary" style={{ padding: '14px 30px' }}>
              <Send size={16} style={{ marginRight: '10px' }} /> SEND PROJECT BRIEF
            </button>
            <span className="form-hint">
              {sent ? 'Your email app should have opened with the brief ready to send.' : 'Opens your email app with everything pre-filled.'}
            </span>
          </div>
        </form>
      </div>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 22px; align-items: stretch; }
        .contact-info { display: flex; flex-direction: column; gap: 26px; justify-content: space-between; }
        .contact-facts { list-style: none; display: flex; flex-direction: column; gap: 12px; color: #d5dde6; font-size: 0.92rem; }
        .contact-facts li { display: flex; align-items: center; gap: 10px; }
        .contact-email {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          padding: 14px 16px; border-radius: 8px;
          border: 1px solid rgba(0, 240, 255, 0.2); background: rgba(0, 240, 255, 0.04);
        }
        .contact-email a { color: #fff; text-decoration: none; font-family: var(--font-mono); font-size: 0.9rem; word-break: break-all; }
        .contact-copy {
          margin-left: auto; display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary); border-radius: 4px; padding: 5px 10px; cursor: pointer;
          font-family: var(--font-mono); font-size: 0.72rem;
        }
        .contact-copy:hover { color: #fff; border-color: var(--accent-cyan); }
        .contact-form { display: flex; flex-direction: column; gap: 24px; }
        .contact-form:hover { transform: none; }
        .contact-form fieldset { border: none; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .contact-form legend, .field > span {
          font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 1px;
          color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px;
        }
        .chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field { display: flex; flex-direction: column; }
        .field > span { margin-bottom: 8px; }
        .field input, .field textarea {
          background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px; padding: 12px 14px; color: #fff; font: inherit; font-size: 0.95rem;
          transition: border-color 0.25s ease, box-shadow 0.25s ease; resize: vertical;
        }
        .field input::placeholder, .field textarea::placeholder { color: #55606d; }
        .field input:focus, .field textarea:focus {
          outline: none; border-color: var(--accent-cyan); box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.12);
        }
        .form-hint { color: var(--text-secondary); font-size: 0.82rem; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .contact-form, .contact-info { padding: 22px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
