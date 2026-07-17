import { useState, useEffect } from "react";
import {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  ShieldCheck,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  MapPin,
  Phone,
  Link2,
  Globe2,
  MessageCircle,
  Sun,
  Moon,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);
  const [theme, setTheme] = useState("light"); // "light" | "dark"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate real asset/boot time. Swap this for your actual "ready" signal
    // (e.g. Promise.all of image preloads, or removing it once data has arrived).
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const services = [
    {
      icon: Code2,
      title: "Custom Software",
      desc: "Line-of-business systems built around how your team actually works, not the other way around.",
    },
    {
      icon: Layers,
      title: "Web Applications",
      desc: "Fast, accessible web products — from customer portals to internal dashboards.",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      desc: "Native and cross-platform apps for iOS and Android, shipped and maintained long-term.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "Interfaces designed from real user flows, tested with real people before a line of code ships.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      desc: "Infrastructure, CI/CD, and monitoring so releases are routine, not risky.",
    },
    {
      icon: ShieldCheck,
      title: "QA & Testing",
      desc: "Manual and automated test coverage built in from sprint one, not bolted on at the end.",
    },
  ];

  const stats = [
    { value: "120+", label: "Projects delivered" },
    { value: "8", label: "Years in business" },
    { value: "40+", label: "Engineers on staff" },
    { value: "95%", label: "Client retention" },
  ];

  const industries = [
    "Fintech",
    "Healthcare",
    "E-commerce",
    "Logistics",
    "Education",
    "Real Estate",
  ];

  const stack = [
    "React",
    "Node.js",
    "Python",
    "Flutter",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
  ];

  const testimonials = [
    {
      quote:
        "They shipped our claims portal in twelve weeks and it's been in production, untouched, for a year.",
      name: "Operations Director",
      company: "Regional Insurer",
    },
    {
      quote:
        "The team writes code like they'll be the ones on call for it. Because they are.",
      name: "VP Engineering",
      company: "Logistics Platform",
    },
    {
      quote:
        "We came in with a rough sketch. We left with an architecture doc, a working app, and a team that still answers our emails.",
      name: "Founder",
      company: "Healthtech Startup",
    },
  ];

  const heroChecks = [
    { title: "Deep engineering expertise", desc: "Fintech, healthtech, logistics, and e-commerce systems" },
    { title: "8 years, 120+ shipped projects", desc: "Long-term maintainability over quick launches" },
    { title: "95% client retention", desc: "Teams that stay because the code holds up" },
  ];

  const clientLogos = [
    "NORTHGATE",
    "Ferra & Co.",
    "VELIX",
    "Marlowe Health",
    "ORBIT LOGISTICS",
    "Hearthstone",
  ];

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full">
      <style>{`
        [data-theme="light"] {
          --bc-base: #f7f9fc;
          --bc-panel: #ffffff;
          --bc-panel-2: #f1f5f9;
          --bc-line: #e2e8f0;
          --bc-line-soft: #edf2f7;
          --bc-text: #0f172a;
          --bc-muted: #64748b;
          --bc-cyan: #0d9488;
          --bc-amber: #b45309;
          --bc-nav-bg: rgba(255,255,255,0.85);
          --bc-btn-primary-text: #ffffff;
          --bc-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
          --bc-shadow-lg: 0 4px 6px rgba(15,23,42,0.03), 0 20px 40px -16px rgba(15,23,42,0.16);
        }
        [data-theme="dark"] {
          --bc-base: #0a1220;
          --bc-panel: #0f1b2d;
          --bc-panel-2: #101d31;
          --bc-line: #1c3350;
          --bc-line-soft: #16283f;
          --bc-text: #e7edf5;
          --bc-muted: #8fa1b8;
          --bc-cyan: #5eead4;
          --bc-amber: #f2a93b;
          --bc-nav-bg: rgba(10,18,32,0.85);
          --bc-btn-primary-text: #06121a;
          --bc-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -12px rgba(0,0,0,0.45);
          --bc-shadow-lg: 0 4px 6px rgba(0,0,0,0.2), 0 20px 45px -16px rgba(0,0,0,0.55);
        }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }

        /* ---------- LOADING SCREEN ---------- */
        .bc-loader-screen {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          background: var(--bc-base);
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .bc-loader-screen.bc-loader-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .bc-loader-mark {
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bc-loader-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2.5px solid var(--bc-line);
          border-top-color: var(--bc-cyan);
          animation: bc-spin 0.9s linear infinite;
        }
        .bc-loader-square {
          width: 16px;
          height: 16px;
          border: 2.5px solid var(--bc-cyan);
          border-radius: 3px;
          animation: bc-loader-pulse 1.4s ease-in-out infinite;
        }
        @keyframes bc-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bc-loader-pulse {
          0%, 100% { transform: scale(0.85); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .bc-loader-word {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .bc-loader-label {
          font-size: 0.68rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--bc-muted);
        }
        @media (prefers-reduced-motion: reduce) {
          .bc-loader-ring, .bc-loader-square { animation: none !important; }
        }

        .bc-page-content {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .bc-page-content.bc-page-visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* ---------- /LOADING SCREEN ---------- */

        .bc-grid-bg {
          background-image:
            linear-gradient(var(--bc-line-soft) 1px, transparent 1px),
            linear-gradient(90deg, var(--bc-line-soft) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .bc-card {
          background: var(--bc-panel);
          border: 1px solid var(--bc-line);
          box-shadow: var(--bc-shadow);
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .bc-card:hover {
          border-color: var(--bc-cyan);
          transform: translateY(-3px);
          box-shadow: var(--bc-shadow-lg);
        }
        .bc-btn-primary {
          background: var(--bc-cyan);
          color: var(--bc-btn-primary-text);
          box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent);
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .bc-btn-ghost {
          border: 1px solid var(--bc-line);
          color: var(--bc-text);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(94,234,212,0.06); }
        .bc-theme-toggle {
          border: 1px solid var(--bc-line);
          color: var(--bc-text);
          background: var(--bc-panel-2);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .bc-theme-toggle:hover { border-color: var(--bc-cyan); transform: translateY(-1px); }
        .bc-eyebrow {
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.72rem;
          color: var(--bc-amber);
        }
        .bc-diagram-panel {
          background: var(--bc-panel);
          border: 1px solid var(--bc-line);
          box-shadow: var(--bc-shadow-lg);
          border-radius: 14px;
        }
        .bc-corner {
          position: relative;
        }
        .bc-corner::before, .bc-corner::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--bc-cyan);
          opacity: 0.55;
        }
        .bc-corner::before {
          top: 10px; left: 10px;
          border-top: 2px solid var(--bc-cyan);
          border-left: 2px solid var(--bc-cyan);
          border-radius: 3px 0 0 0;
        }
        .bc-corner::after {
          bottom: 10px; right: 10px;
          border-bottom: 2px solid var(--bc-cyan);
          border-right: 2px solid var(--bc-cyan);
          border-radius: 0 0 3px 0;
        }
        @keyframes bc-flow {
          to { stroke-dashoffset: -200; }
        }
        .bc-flow-line {
          stroke-dasharray: 6 10;
          animation: bc-flow 6s linear infinite;
        }
        @keyframes bc-pulse-node {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .bc-node-rect {
          filter: drop-shadow(0 3px 6px rgba(15,23,42,0.10));
        }
        .bc-node { animation: bc-pulse-node 3s ease-in-out infinite; }
        .bc-marquee-track {
          display: flex;
          width: max-content;
          animation: bc-marquee 22s linear infinite;
        }
        @keyframes bc-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .bc-logo-strip {
          background: var(--bc-panel-2);
          border: 1px solid var(--bc-line);
          border-radius: 14px;
        }
        .bc-logo-item {
          color: var(--bc-muted);
          opacity: 0.75;
          transition: opacity 0.2s ease, color 0.2s ease;
          letter-spacing: 0.04em;
        }
        .bc-logo-item:hover { opacity: 1; color: var(--bc-text); }
        .bc-hero-media {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--bc-shadow-lg);
          border: 1px solid var(--bc-line);
          aspect-ratio: 4 / 3.1;
          background: var(--bc-panel-2);
        }
        .bc-hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .bc-hero-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15,23,42,0) 40%, rgba(6,15,26,0.55) 100%);
        }
        .bc-float-card {
          position: absolute;
          right: 20px;
          bottom: -34px;
          left: 20px;
          background: var(--bc-panel);
          border: 1px solid var(--bc-line);
          border-radius: 14px;
          box-shadow: var(--bc-shadow-lg);
          padding: 20px 22px;
        }
        @media (min-width: 768px) {
          .bc-float-card { left: auto; width: 300px; right: -28px; bottom: -30px; }
        }
        .bc-check-row + .bc-check-row { margin-top: 14px; }
        .bc-check-dot {
          width: 22px; height: 22px; border-radius: 999px;
          background: var(--bc-cyan);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .bc-flow-line, .bc-node, .bc-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* LOADING SCREEN */}
      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`} aria-hidden={!loading}>
        <div className="bc-loader-mark">
          <div className="bc-loader-ring" />
          <div className="bc-loader-square" />
        </div>
        <div className="bc-loader-word">
          <span className="bc-display font-bold text-lg" style={{ color: "var(--bc-text)" }}>Bluecode</span>
        </div>
        <div className="bc-loader-label bc-mono">Loading</div>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--bc-line)", background: "var(--bc-nav-bg)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 bc-display font-bold text-lg">
            <span style={{ color: "var(--bc-cyan)" }}>&#9634;</span>
            Bluecode
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm bc-body" style={{ color: "var(--bc-muted)" }}>
            <a href="#services" className="hover:text-[var(--bc-text)] transition-colors">Services</a>
            <a href="#work" className="hover:text-[var(--bc-text)] transition-colors">Work</a>
            <a href="#industries" className="hover:text-[var(--bc-text)] transition-colors">Industries</a>
            <a href="#testimonials" className="hover:text-[var(--bc-text)] transition-colors">Clients</a>
            <a href="#contact" className="hover:text-[var(--bc-text)] transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="bc-theme-toggle w-9 h-9 rounded-full flex items-center justify-center"
              aria-label="Toggle dark/light theme"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <a href="#contact" className="hidden md:inline-flex bc-btn-primary bc-body text-sm font-semibold px-4 py-2 rounded">
              Start a project
            </a>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm bc-body" style={{ color: "var(--bc-muted)" }}>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Clients</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bc-grid-bg relative overflow-hidden border-b" style={{ borderColor: "var(--bc-line)" }}>
        <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-14 md:pb-16 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="bc-mono bc-eyebrow mb-5">Your Business IT Partner</div>
            <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight mb-6">
              Software that runs your business —
              <span style={{ color: "var(--bc-cyan)" }}> not the other way around.</span>
            </h1>
            <p className="bc-body text-base md:text-lg mb-8" style={{ color: "var(--bc-muted)" }}>
              Bluecode partners with growing businesses to build custom software,
              web platforms, and mobile apps that stay reliable long after launch.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bc-btn-primary bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                Start a project <ArrowRight size={18} />
              </a>
              <a href="#work" className="bc-btn-ghost bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                See our work <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Hero visual: photo + overlapping floating checklist card */}
          <div className="relative pb-10 md:pb-0 md:pr-8">
            <div className="bc-hero-media">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Bluecode engineering team at work"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>
            <div className="bc-float-card">
              {heroChecks.map((c, i) => (
                <div key={i} className="bc-check-row flex items-start gap-3">
                  <span className="bc-check-dot mt-0.5">
                    <CheckCircle2 size={14} color="var(--bc-btn-primary-text)" />
                  </span>
                  <div>
                    <div className="bc-body font-semibold text-sm leading-tight">{c.title}</div>
                    <div className="bc-body text-xs mt-0.5" style={{ color: "var(--bc-muted)" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
          <div className="bc-logo-strip px-6 md:px-10 py-6 md:py-7">
            <div className="bc-mono text-[0.68rem] tracking-widest uppercase mb-4 text-center md:text-left" style={{ color: "var(--bc-muted)" }}>
              Trusted by engineering teams at
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-4">
              {clientLogos.map((name, i) => (
                <span key={i} className="bc-logo-item bc-display font-semibold text-base md:text-lg whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b" style={{ borderColor: "var(--bc-line)", background: "var(--bc-panel)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="bc-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--bc-cyan)" }}>{s.value}</div>
              <div className="bc-body text-sm mt-1" style={{ color: "var(--bc-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="bc-mono bc-eyebrow mb-3">What we build</div>
        <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">Services</h2>
        <p className="bc-body max-w-2xl mb-12" style={{ color: "var(--bc-muted)" }}>
          Every engagement starts with a working prototype, not a slide deck.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bc-card rounded-lg p-6">
                <div className="w-11 h-11 rounded flex items-center justify-center mb-5" style={{ background: "var(--bc-panel-2)", border: "1px solid var(--bc-line)" }}>
                  <Icon size={20} color="var(--bc-cyan)" />
                </div>
                <h3 className="bc-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="bc-body text-sm" style={{ color: "var(--bc-muted)" }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="border-y" style={{ borderColor: "var(--bc-line)", background: "var(--bc-panel)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bc-mono bc-eyebrow mb-3">Where we work</div>
          <h2 className="bc-display font-bold text-2xl md:text-3xl mb-8">Industries</h2>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind, i) => (
              <span key={i} className="bc-mono text-sm px-4 py-2 rounded-full" style={{ border: "1px solid var(--bc-line)", color: "var(--bc-muted)" }}>
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section id="work" className="py-14 overflow-hidden border-b" style={{ borderColor: "var(--bc-line)" }}>
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bc-mono bc-eyebrow mb-2">Tooling</div>
          <h2 className="bc-display font-bold text-2xl md:text-3xl">Our stack</h2>
        </div>
        <div className="bc-marquee-track">
          {[...stack, ...stack].map((t, i) => (
            <div key={i} className="bc-mono text-sm px-6 py-3 mx-2 rounded whitespace-nowrap" style={{ border: "1px solid var(--bc-line)", color: "var(--bc-text)" }}>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="bc-mono bc-eyebrow mb-3">In their words</div>
        <h2 className="bc-display font-bold text-3xl md:text-4xl mb-12">Clients</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bc-card rounded-lg p-6 flex flex-col justify-between">
              <p className="bc-body text-sm mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="bc-mono text-xs" style={{ color: "var(--bc-muted)" }}>
                {t.name} — {t.company}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t" style={{ borderColor: "var(--bc-line)", background: "var(--bc-panel)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-14">
          <div>
            <div className="bc-mono bc-eyebrow mb-3">Get in touch</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl mb-6">Tell us about the project</h2>
            <p className="bc-body mb-8" style={{ color: "var(--bc-muted)" }}>
              Send a short brief and we'll reply within one business day with next
              steps — no discovery-call runaround.
            </p>
            <div className="space-y-4 bc-body text-sm">
              <div className="flex items-center gap-3" style={{ color: "var(--bc-muted)" }}>
                <Mail size={16} color="var(--bc-cyan)" /> hello@bluecode.dev
              </div>
              <div className="flex items-center gap-3" style={{ color: "var(--bc-muted)" }}>
                <Phone size={16} color="var(--bc-cyan)" /> +92 300 0000000
              </div>
              <div className="flex items-center gap-3" style={{ color: "var(--bc-muted)" }}>
                <MapPin size={16} color="var(--bc-cyan)" /> Islamabad, Pakistan
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bc-corner p-6 rounded-lg" style={{ background: "var(--bc-panel-2)", border: "1px solid var(--bc-line)", boxShadow: "var(--bc-shadow)" }}>
            {sent ? (
              <div className="bc-body text-sm">
                <p className="font-semibold mb-1" style={{ color: "var(--bc-cyan)" }}>Message sent.</p>
                <p style={{ color: "var(--bc-muted)" }}>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="bc-mono text-xs block mb-1" style={{ color: "var(--bc-muted)" }}>Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent rounded px-3 py-2 bc-body text-sm outline-none"
                    style={{ border: "1px solid var(--bc-line)", color: "var(--bc-text)" }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="bc-mono text-xs block mb-1" style={{ color: "var(--bc-muted)" }}>Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent rounded px-3 py-2 bc-body text-sm outline-none"
                    style={{ border: "1px solid var(--bc-line)", color: "var(--bc-text)" }}
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="bc-mono text-xs block mb-1" style={{ color: "var(--bc-muted)" }}>Project brief</label>
                  <textarea
                    required
                    rows={4}
                    value={form.brief}
                    onChange={(e) => setForm({ ...form, brief: e.target.value })}
                    className="w-full bg-transparent rounded px-3 py-2 bc-body text-sm outline-none resize-none"
                    style={{ border: "1px solid var(--bc-line)", color: "var(--bc-text)" }}
                    placeholder="What are you trying to build?"
                  />
                </div>
                <button type="submit" className="bc-btn-primary bc-body font-semibold px-6 py-3 rounded w-full flex items-center justify-center gap-2">
                  Send message <ArrowRight size={16} />
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: "var(--bc-line)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="bc-display font-bold text-lg mb-3 flex items-center gap-2">
              <span style={{ color: "var(--bc-cyan)" }}>&#9634;</span> Bluecode
            </div>
            <p className="bc-body text-sm" style={{ color: "var(--bc-muted)" }}>
              A software house building systems companies can rely on.
            </p>
            <div className="flex gap-4 mt-4">
             <Link2 size={18} color="var(--bc-muted)" />
<Globe2 size={18} color="var(--bc-muted)" />
<MessageCircle size={18} color="var(--bc-muted)" />
            </div>
          </div>
          <div>
            <div className="bc-mono text-xs mb-3" style={{ color: "var(--bc-amber)" }}>SERVICES</div>
            <ul className="space-y-2 bc-body text-sm" style={{ color: "var(--bc-muted)" }}>
              <li>Custom Software</li>
              <li>Web Applications</li>
              <li>Mobile Apps</li>
              <li>Cloud &amp; DevOps</li>
            </ul>
          </div>
          <div>
            <div className="bc-mono text-xs mb-3" style={{ color: "var(--bc-amber)" }}>COMPANY</div>
            <ul className="space-y-2 bc-body text-sm" style={{ color: "var(--bc-muted)" }}>
              <li>Our Work</li>
              <li>Industries</li>
              <li>Clients</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="bc-mono text-xs mb-3" style={{ color: "var(--bc-amber)" }}>CONTACT</div>
            <ul className="space-y-2 bc-body text-sm" style={{ color: "var(--bc-muted)" }}>
              <li>hello@bluecode.dev</li>
              <li>+92 300 0000000</li>
              <li>Islamabad, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 border-t bc-mono text-xs" style={{ borderColor: "var(--bc-line)", color: "var(--bc-muted)" }}>
          © 2026 Bluecode. All rights reserved.
        </div>
      </footer>
      </div>
    </div>
  );
}