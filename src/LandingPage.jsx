import { useState } from "react";
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
} from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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

  return (
    <div style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full">
      <style>{`
        :root {
          --bc-base: #0a1220;
          --bc-panel: #0f1b2d;
          --bc-panel-2: #101d31;
          --bc-line: #1c3350;
          --bc-line-soft: #16283f;
          --bc-text: #e7edf5;
          --bc-muted: #8fa1b8;
          --bc-cyan: #5eead4;
          --bc-amber: #f2a93b;
        }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }
        .bc-grid-bg {
          background-image:
            linear-gradient(var(--bc-line-soft) 1px, transparent 1px),
            linear-gradient(90deg, var(--bc-line-soft) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .bc-card {
          background: var(--bc-panel);
          border: 1px solid var(--bc-line);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .bc-card:hover {
          border-color: var(--bc-cyan);
          transform: translateY(-3px);
        }
        .bc-btn-primary {
          background: var(--bc-cyan);
          color: #06121a;
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .bc-btn-ghost {
          border: 1px solid var(--bc-line);
          color: var(--bc-text);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(94,234,212,0.06); }
        .bc-eyebrow {
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.72rem;
          color: var(--bc-amber);
        }
        .bc-corner {
          position: relative;
        }
        .bc-corner::before, .bc-corner::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--bc-cyan);
        }
        .bc-corner::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--bc-cyan);
          border-left: 2px solid var(--bc-cyan);
        }
        .bc-corner::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--bc-cyan);
          border-right: 2px solid var(--bc-cyan);
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
        @media (prefers-reduced-motion: reduce) {
          .bc-flow-line, .bc-node, .bc-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--bc-line)", background: "rgba(10,18,32,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 bc-display font-bold text-lg">
            <span style={{ color: "var(--bc-cyan)" }}>&#9634;</span>
            Bluecode
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm bc-body" style={{ color: "var(--bc-muted)" }}>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#industries" className="hover:text-white transition-colors">Industries</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Clients</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:inline-flex bc-btn-primary bc-body text-sm font-semibold px-4 py-2 rounded">
            Start a project
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
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
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="bc-mono bc-eyebrow mb-5">Software engineering partner</div>
            <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight mb-6">
              We architect software the way engineers architect buildings —
              <span style={{ color: "var(--bc-cyan)" }}> deliberately, load-tested, built to hold weight.</span>
            </h1>
            <p className="bc-body text-base md:text-lg mb-8" style={{ color: "var(--bc-muted)" }}>
              Bluecode designs and builds custom software, web platforms, and mobile
              apps for companies who need systems that still run cleanly two years
              after launch.
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

          {/* Signature: animated architecture diagram */}
          <div className="bc-corner p-4 md:p-6" style={{ background: "var(--bc-panel)", border: "1px solid var(--bc-line)" }}>
            <svg viewBox="0 0 460 360" className="w-full h-auto" role="img" aria-label="Animated system architecture diagram">
              <g stroke="var(--bc-line)" strokeWidth="1.5" fill="none">
                <path className="bc-flow-line" stroke="var(--bc-cyan)" d="M80 60 L80 160" />
                <path className="bc-flow-line" stroke="var(--bc-cyan)" d="M230 60 L230 160" />
                <path className="bc-flow-line" stroke="var(--bc-cyan)" d="M380 60 L380 160" />
                <path className="bc-flow-line" stroke="var(--bc-amber)" d="M80 160 L230 220" />
                <path className="bc-flow-line" stroke="var(--bc-amber)" d="M230 160 L230 220" />
                <path className="bc-flow-line" stroke="var(--bc-amber)" d="M380 160 L230 220" />
                <path className="bc-flow-line" stroke="var(--bc-cyan)" d="M230 220 L230 300" />
              </g>

              {[
                { x: 80, y: 40, label: "Client" },
                { x: 230, y: 40, label: "Mobile" },
                { x: 380, y: 40, label: "Partner API" },
              ].map((n, i) => (
                <g key={i}>
                  <rect className="bc-node" x={n.x - 38} y={n.y} width="76" height="34" rx="4" fill="var(--bc-panel-2)" stroke="var(--bc-line)" />
                  <text x={n.x} y={n.y + 22} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="var(--bc-text)">{n.label}</text>
                </g>
              ))}

              <g>
                <rect className="bc-node" x={230 - 60} y="160" width="120" height="40" rx="4" fill="var(--bc-panel-2)" stroke="var(--bc-cyan)" strokeWidth="1.5" />
                <text x="230" y="185" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono, monospace" fill="var(--bc-cyan)">Gateway</text>
              </g>

              <g>
                <rect className="bc-node" x={230 - 55} y="220" width="110" height="36" rx="4" fill="var(--bc-panel-2)" stroke="var(--bc-line)" />
                <text x="230" y="243" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="var(--bc-text)">Services</text>
              </g>

              <g>
                <rect className="bc-node" x={230 - 45} y="300" width="90" height="34" rx="4" fill="var(--bc-panel-2)" stroke="var(--bc-line)" />
                <text x="230" y="322" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="var(--bc-text)">Database</text>
              </g>
            </svg>
            <div className="bc-mono text-xs mt-2" style={{ color: "var(--bc-muted)" }}>fig. 01 — typical service architecture</div>
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

          <form onSubmit={handleSubmit} className="bc-corner p-6 rounded-lg" style={{ background: "var(--bc-panel-2)", border: "1px solid var(--bc-line)" }}>
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
  );
}
