import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const herd = Array.from({ length: 26 }, (_, id) => {
  return {
    id,
    y: 8 + Math.random() * 84,
    size: 22 + Math.random() * 58,
    rotate: (Math.random() - .5) * 10,
    delay: Math.random() * 12000,
    duration: 9000 + Math.random() * 9000,
    opacity: .34 + Math.random() * .48
  };
});

function clockText() {
  const d = new Intl.DateTimeFormat('en-GB', {timeZone:'UTC',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());
  const t = new Intl.DateTimeFormat('en-GB', {timeZone:'UTC',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
  return `${d}   ${t} AM GMT`;
}

function AboutPage() {
  return <main className="about-page">
    <article className="about-content">
      <a className="about-home" href="/">← HOME</a>
      <header className="about-header">
        <a className="about-brand" href="https://www.instagram.com/_briyanii/" target="_blank" rel="noreferrer" aria-label="Briyanii Instagram">
          <img src="/briyany-logo-camel.png" alt="" />
          <span>Briyanii</span>
        </a>
        <span className="about-divider" aria-hidden="true">—</span>
        <a className="about-instagram" href="https://www.instagram.com/_briyanii/" target="_blank" rel="noreferrer">Instagram</a>
      </header>

      <section className="about-briyanii" aria-label="About Briyanii">
        <p>Briyanii is a jewelry and accessory designer, and a member of Factory2000, an independent collective of collaborating artists and designers.</p>
        <p>Briyanii’s creations span a diverse range of forms, materials, textures, and artistic styles. Driven by experimentation, the work explores the boundaries between art, design, and functionality, reinterpreting familiar shapes and concepts to create contemporary pieces that challenge traditional conventions.</p>
        <p>Embracing an open and fluid creative process, Briyanii prioritizes experimentation and unconventional ideas, continuously pushing the boundaries of jewelry and accessory design to discover new possibilities in visual expression.</p>
      </section>

      <section className="factory-section" aria-label="About Factory2000">
        <div className="factory-heading">
          <a className="factory-logo" href="https://www.instagram.com/factory.2000/" target="_blank" rel="noreferrer" aria-label="Factory2000 Instagram">
            <h1>FACTORY<br />2000</h1>
          </a>
          <span>Factory2000</span>
          <span className="about-divider" aria-hidden="true">—</span>
          <a className="about-instagram" href="https://www.instagram.com/factory.2000/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <p className="factory-letters" aria-hidden="true">F a c t o r y 2 0 0 0</p>
        <p>We are a collective of artists and designers united by a shared passion for exchanging ideas, perspectives, and experimental practices through diverse creative approaches. Our members work across a wide spectrum of disciplines, including graphic design, jewelry and accessory design, illustration, painting, product design, video, and installation art—as well as evolving creative mediums born from each member‘s distinct interests and ongoing experimentation.</p>
      </section>
    </article>
  </main>;
}

function HomePage() {
  const [clock, setClock] = useState(clockText());
  const [active, setActive] = useState('ART');
  useEffect(() => { const id = setInterval(() => setClock(clockText()), 1000); return () => clearInterval(id); }, []);
  return <main className="page">
    <div className="herd" aria-hidden="true">
      {herd.map(c => <img key={c.id} className="camel" src="/camel.png" alt=""
        style={{'--y':`${c.y}vh`,'--s':`${c.size}px`,'--r':`${c.rotate}deg`,
        '--delay':`${c.delay}ms`,'--duration':`${c.duration}ms`,'--opacity':c.opacity}} />)}
    </div>
    <section className="center">
      <h1 className="logo">BRIYANII</h1>
      <div className="clock">{clock}</div>
      <nav>{[['ART','#art'],['MUSIC','#music'],['OBJECT','#object'],['CREATIVE','#creative'],['ABOUT','/about']].map(([n,h]) =>
        <a key={n} className={active===n?'active':''} href={h} onClick={()=>setActive(n)}>{n}</a>)}</nav>
      <a className="instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24"><rect x="3.1" y="3.1" width="17.8" height="17.8" rx="5.1"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.55" cy="6.65" r="1.15" className="dot"/></svg>
      </a>
    </section>
    <footer>© {new Date().getFullYear()} BRIYANII</footer>
  </main>;
}

function App() {
  return window.location.pathname.replace(/\/+$/, '') === '/about' ? <AboutPage /> : <HomePage />;
}

createRoot(document.getElementById('root')).render(<App/>);
