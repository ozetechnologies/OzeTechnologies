import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FlaskConical,
  ScanLine,
  BadgeCheck,
  FileBarChart,
  Boxes,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Animations hook - same as LandingPage
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export default function GoldLaboratorySoftware() {
  const [theme, setTheme] = useState(() => localStorage.getItem("bc-theme") || "dark");

  const toggleTheme = () => {
    setTheme((t) => {
      const newTheme = t === "light" ? "dark" : "light";
      localStorage.setItem("bc-theme", newTheme);
      window.dispatchEvent(new Event("bc-theme-change"));
      return newTheme;
    });
  };

  // Parallax effect
  const parallaxRef = useRef(null);
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = window.scrollY * 0.15;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animations for each section
  const [heroRef, heroInView] = useReveal();
  const [featuresRef, featuresInView] = useReveal();
  const [workflowRef, workflowInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();

  // Cursor glow: soft drifting "smoke" glow that eases toward the mouse position
  const cursorGlowRef = useRef(null);
  const [cursorHover, setCursorHover] = useState(false);
  const cursorBRef = useRef(null);
  const cursorRingRef = useRef(null);
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    const el = cursorGlowRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let raf = null;
    let visible = false;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // ease toward the target position for a soft trailing/drift feel
      curX += (targetX - curX) * 0.07;
      curY += (targetY - curY) * 0.07;
      el.style.transform = `translate(${curX}px, ${curY}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const badge = cursorBRef.current;
    const ring = cursorRingRef.current;
    if (!badge || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const moveCursor = (e) => {
      badge.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    const handleOver = (e) => {
      if (e.target.closest && e.target.closest("a, button, .bc-cursor-hover")) setCursorHover(true);
    };
    const handleOut = (e) => {
      if (e.target.closest && e.target.closest("a, button, .bc-cursor-hover")) setCursorHover(false);
    };
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  const features = [
    {
      icon: ScanLine,
      title: "XRF & Spectrometer Integration",
      desc: "Pull purity readings directly from your lab's XRF and fire assay equipment — no manual re-entry, no transcription errors.",
    },
    {
      icon: FlaskConical,
      title: "Purity & Karat Testing",
      desc: "Log and track gold, silver, and platinum purity tests with full batch history, tolerances, and re-test workflows.",
    },
    {
      icon: BadgeCheck,
      title: "Digital Hallmarking",
      desc: "Generate compliant hallmark certificates automatically once a sample passes, tied to BIS/international standards.",
    },
    {
      icon: FileBarChart,
      title: "Certificate & Report Generation",
      desc: "One-click purity certificates and lab reports, branded for your business, ready to print or share digitally.",
    },
    {
      icon: Boxes,
      title: "Batch & Sample Tracking",
      desc: "Every sample gets a traceable ID from intake to result, so nothing gets lost between the counter and the lab.",
    },
    {
      icon: ShieldCheck,
      title: "Audit-Ready Compliance",
      desc: "Full test history and certificate logs, exportable for regulatory audits and customer disputes alike.",
    },
  ];

  const workflow = [
    { step: "Sample Intake", desc: "Log customer sample with weight, item type, and reference ID." },
    { step: "Instrument Reading", desc: "XRF/assay result pulled in automatically or entered manually." },
    { step: "Verification", desc: "Lab technician reviews and confirms the purity result." },
    { step: "Certificate Issued", desc: "Hallmark certificate generated and sent to the customer." },
  ];

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full">
      <style>{`
        [data-theme="light"] {
          --bc-base: #FAFAF9; --bc-panel: #ffffff; --bc-panel-2: #F5F5F4; --bc-line: #E7E5E4; --bc-line-soft: #F0EFED;
          --bc-text: #1C1917; --bc-muted: #78716C; --bc-cyan: #6366F1; --bc-amber: #C2410C;
          --bc-nav-bg: rgba(250,250,249,0.85); --bc-btn-primary-text: #ffffff;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 6%, var(--bc-base));
          --bc-shadow: 0 1px 2px 0 rgba(28,25,23,0.1), 0 4px 4px 0 rgba(28,25,23,0.09), 0 9px 6px 0 rgba(28,25,23,0.05);
          --bc-shadow-lg: 0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08);
        }
        [data-theme="dark"] {
          --bc-base: #17151F; --bc-panel: #201D2E; --bc-panel-2: #262238; --bc-line: #322C47; --bc-line-soft: #2A2539;
          --bc-text: #F5F5F4; --bc-muted: #A8A29E; --bc-cyan: #818CF8; --bc-amber: #FB923C;
          --bc-nav-bg: rgba(23,21,31,0.85); --bc-btn-primary-text: #1E1B4B;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 9%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -12px rgba(0,0,0,0.45);
          --bc-shadow-lg: 0 4px 6px rgba(0,0,0,0.2), 0 20px 45px -16px rgba(0,0,0,0.55);
        }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }
        .bc-card { background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow); transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-card:hover { border-color: var(--bc-cyan); transform: translateY(-8px); box-shadow: var(--bc-shadow-lg), 0 0 24px -6px color-mix(in srgb, var(--bc-cyan) 45%, transparent); }
        .bc-btn-primary { background: var(--bc-cyan); color: var(--bc-btn-primary-text); box-shadow: 0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), inset 0 2px 8px 0 rgba(255,255,255,0.5); transition: filter 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-btn-primary:hover { filter: brightness(1.15); transform: translateY(-2px) scale(1.05); box-shadow: 0 12px 28px -6px color-mix(in srgb, var(--bc-cyan) 65%, transparent), 0 0 0 4px color-mix(in srgb, var(--bc-cyan) 16%, transparent); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(99,102,241,0.08); transform: translateY(-2px) scale(1.05); box-shadow: var(--bc-shadow-lg); }
        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); }
        .bc-diagram-panel { background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); border-radius: 14px; }
        .bc-corner { position: relative; }
        .bc-corner::before, .bc-corner::after { content: ""; position: absolute; width: 14px; height: 14px; border-color: var(--bc-cyan); opacity: 0.55; }
        .bc-corner::before { top: 10px; left: 10px; border-top: 2px solid var(--bc-cyan); border-left: 2px solid var(--bc-cyan); border-radius: 3px 0 0 0; }
        .bc-corner::after { bottom: 10px; right: 10px; border-bottom: 2px solid var(--bc-cyan); border-right: 2px solid var(--bc-cyan); border-radius: 0 0 3px 0; }
        .bc-cta-banner { background: #18152A; border-radius: 16px; color: #F5F5F4; }
        [data-theme="dark"] .bc-cta-banner { background: var(--bc-panel-2); border: 1px solid var(--bc-line); }
        .bc-cta-highlight { background: var(--bc-cyan); color: #1E1B4B; padding: 0 4px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
        .bc-cta-btn { background: #ffffff; color: #18152A; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; transition: transform 0.2s ease, filter 0.2s ease; }
        .bc-cta-btn:hover { transform: translateY(-1px); filter: brightness(0.96); }

        /* Custom cursor */
        .bc-cursor-glow { position: fixed; top: 0; left: 0; width: 160px; height: 160px; margin: -80px 0 0 -80px; pointer-events: none; z-index: 5; opacity: 0; transition: opacity 0.6s ease; will-change: transform; }
        .bc-cursor-glow-layer { position: absolute; inset: 0; border-radius: 50%; filter: blur(60px); mix-blend-mode: screen; }
        [data-theme="dark"] .bc-cursor-glow-layer { mix-blend-mode: screen; }
        [data-theme="light"] .bc-cursor-glow-layer { mix-blend-mode: multiply; filter: blur(70px); }
        .bc-cursor-glow-core { background: radial-gradient(circle at 42% 45%, color-mix(in srgb, var(--bc-cyan) 55%, transparent) 0%, transparent 60%); }
        .bc-cursor-glow-warm { background: radial-gradient(circle at 62% 55%, color-mix(in srgb, var(--bc-amber) 40%, transparent) 0%, transparent 55%); }
        .bc-cursor-glow-soft { background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--bc-cyan) 20%, transparent) 0%, transparent 70%); filter: blur(90px); }
        @media (hover: none), (pointer: coarse) { .bc-cursor-glow { display: none; } }
        .bc-cursor-ring {
          width: 34px; height: 34px; border-radius: 999px; border: 1.5px solid var(--bc-cyan); position: fixed; top: 0; left: 0; z-index: 9998;
          pointer-events: none; opacity: 0.45; transition: transform 0.18s ease-out, width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease;
        }
        .bc-cursor-ring-hover { width: 58px; height: 58px; opacity: 0.9; background: color-mix(in srgb, var(--bc-cyan) 12%, transparent); }
        .bc-cursor-b { position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; }
        .bc-cursor-b-inner {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 8px;
          background: var(--bc-cyan); color: #ffffff;
          font-weight: 700; font-size: 0.82rem; line-height: 1;
          box-shadow: 0 6px 16px -6px color-mix(in srgb, var(--bc-cyan) 65%, transparent), 0 1px 2px rgba(0,0,0,0.15);
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 0.3s ease, width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .bc-cursor-b-inner-hover {
          width: 40px; height: 40px; border-radius: 999px;
          transform: translate(-50%, -50%) rotate(-18deg) scale(1.15);
          box-shadow: 0 10px 26px -8px color-mix(in srgb, var(--bc-cyan) 70%, transparent), 0 2px 4px rgba(0,0,0,0.2);
        }
        @media (pointer: coarse) { .bc-cursor-b, .bc-cursor-ring { display: none; } }
        @media (pointer: fine) { body { cursor: none; } }

        /* Animation keyframes */
        @keyframes bc-fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bc-slideInLeft { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-slideInRight { 0% { opacity: 0; transform: translateX(40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-scaleIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }

        /* Reveal animation classes */
        .bc-reveal { opacity: 0; }
        .bc-reveal.bc-in-view { animation: bc-fadeInUp 0.8s ease-out forwards; }
        .bc-reveal-left { opacity: 0; }
        .bc-reveal-left.bc-in-view { animation: bc-slideInLeft 0.8s ease-out forwards; }
        .bc-reveal-right { opacity: 0; }
        .bc-reveal-right.bc-in-view { animation: bc-slideInRight 0.8s ease-out forwards; }
        .bc-reveal-scale { opacity: 0; }
        .bc-reveal-scale.bc-in-view { animation: bc-scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards, bc-float 9s ease-in-out 0.6s infinite; }
        
        .bc-float-card { animation: bc-float 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .bc-float-card, .bc-reveal, .bc-reveal-left, .bc-reveal-right, .bc-reveal-scale { animation: none !important; opacity: 1; } }
      `}</style>
      <Navbar theme={theme} toggleTheme={toggleTheme} active="products" />

      {/* Custom cursor elements */}
      <div ref={cursorGlowRef} className="bc-cursor-glow">
        <div className="bc-cursor-glow-layer bc-cursor-glow-soft" />
        <div className="bc-cursor-glow-layer bc-cursor-glow-core" />
        <div className="bc-cursor-glow-layer bc-cursor-glow-warm" />
      </div>
      <div ref={cursorRingRef} className={`bc-cursor-ring ${cursorHover ? "bc-cursor-ring-hover" : ""}`} />
      <div ref={cursorBRef} className="bc-cursor-b">
        <span className={`bc-cursor-b-inner bc-display ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`}>O</span>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className={`bc-mono bc-eyebrow mb-3 bc-reveal ${heroInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.1s" }}>Gold Industry ERP</div>
          <h1 className={`bc-display font-bold text-4xl md:text-5xl leading-tight mb-6 bc-reveal ${heroInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.2s" }}>
            Gold Laboratory
            <span style={{ color: "var(--bc-cyan)" }}> Software</span>
          </h1>
          <p className={`bc-body text-base md:text-lg mb-8 bc-reveal ${heroInView ? "bc-in-view" : ""}`} style={{ color: "var(--bc-muted)", animationDelay: "0.3s" }}>
            Purpose-built for gold testing labs — connect your instruments, track every sample,
            and issue accurate purity certificates without the paperwork backlog.
          </p>
          <div className={`flex flex-wrap gap-4 bc-reveal ${heroInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.4s" }}>
            <Link to="/contact" className="bc-btn-primary bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
              Request a demo <ArrowRight size={18} />
            </Link>
            <Link to="/products" className="bc-btn-ghost bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
              Back to Products
            </Link>
          </div>
        </div>

        <div className={`bc-diagram-panel bc-corner p-6 md:p-7 bc-reveal-right bc-reveal-scale bc-float-card ${heroInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-5">
            <span className="bc-body font-semibold text-sm">Lab Result — Sample #A2291</span>
            <span
              className="bc-mono text-xs font-semibold px-2 py-1 rounded"
              style={{ background: "color-mix(in srgb, #34d399 18%, transparent)", color: "#34d399" }}
            >
              VERIFIED
            </span>
          </div>
          <div className="bc-mono text-xs tracking-widest uppercase mb-1" style={{ color: "var(--bc-muted)" }}>
            Measured Purity
          </div>
          <div className="bc-display font-bold text-4xl mb-6" style={{ color: "var(--bc-cyan)" }}>
            22K &nbsp;/&nbsp; 91.6%
          </div>
          <div className="space-y-3">
            {["Weight", "Item Type", "Instrument", "Technician"].map((label, i) => (
              <div key={i} className="flex items-center justify-between text-sm" style={{ borderTop: i === 0 ? "none" : "1px solid var(--bc-line)", paddingTop: i === 0 ? 0 : 10 }}>
                <span style={{ color: "var(--bc-muted)" }}>{label}</span>
                <span className="bc-body font-semibold">
                  {["12.4 g", "Bangle", "XRF-2200", "S. Malik"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} style={{ background: "var(--bc-band)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <div className={`bc-mono bc-eyebrow mb-3 bc-reveal ${featuresInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.1s" }}>What's included</div>
          <h2 className={`bc-display font-bold text-3xl md:text-4xl mb-4 bc-reveal ${featuresInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.2s" }}>
            Everything your lab needs, <span style={{ color: "var(--bc-cyan)" }}>in one system</span>
          </h2>
          <p className={`bc-body max-w-2xl mb-10 bc-reveal ${featuresInView ? "bc-in-view" : ""}`} style={{ color: "var(--bc-muted)", animationDelay: "0.3s" }}>
            Built for gold testing labs that need speed and accuracy without sacrificing traceability.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`bc-card rounded-2xl p-6 bc-reveal-scale ${featuresInView ? "bc-in-view" : ""}`} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "color-mix(in srgb, var(--bc-cyan) 14%, transparent)", border: "1px solid color-mix(in srgb, var(--bc-cyan) 35%, transparent)" }}
                >
                  <f.icon size={22} color="var(--bc-cyan)" strokeWidth={1.75} />
                </div>
                <h3 className="bc-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="bc-body text-sm" style={{ color: "var(--bc-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section ref={workflowRef} className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className={`bc-mono bc-eyebrow mb-3 bc-reveal ${workflowInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.1s" }}>How it works</div>
        <h2 className={`bc-display font-bold text-3xl md:text-4xl mb-10 bc-reveal ${workflowInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.2s" }}>From sample to certificate</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflow.map((w, i) => (
            <div key={i} className={`bc-card rounded-2xl p-6 relative bc-reveal ${workflowInView ? "bc-in-view" : ""}`} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="bc-mono text-xs font-bold mb-3" style={{ color: "var(--bc-cyan)" }}>
                0{i + 1}
              </div>
              <h3 className="bc-display font-bold text-base mb-2">{w.step}</h3>
              <p className="bc-body text-sm" style={{ color: "var(--bc-muted)" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-6 pb-20 md:pb-24">
        <div className={`bc-cta-banner p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bc-reveal ${ctaInView ? "bc-in-view" : ""}`} style={{ animationDelay: "0.2s" }}>
          <div>
            <h3 className="bc-display font-bold text-2xl md:text-3xl mb-2">
              Ready to modernize your <span className="bc-cta-highlight">gold lab?</span>
            </h3>
            <p className="bc-body text-sm" style={{ color: "rgba(245,245,244,0.7)" }}>
              We'll walk you through the system and map it to your existing lab workflow.
            </p>
          </div>
          <Link to="/contact" className="bc-cta-btn flex items-center gap-2">
            Talk to us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}