import teamMeetingImg from "./assets/team-meeting.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Users,
  Target,
  Award,
  Heart,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Eye,
  Search,
  PenTool,
  Code2,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function AboutUs() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const closeIt = () => setOpenDropdown(null);
    window.addEventListener("click", closeIt);
    return () => window.removeEventListener("click", closeIt);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    {
      label: "Products",
      href: "/#products",
      dropdown: [
        { label: "IT Development", desc: "Software, web & mobile builds", href: "/#products" },
        { label: "Specialized Solutions", desc: "AI, fintech & platform work", href: "/#products" },
        { label: "View all products", href: "/#products" },
      ],
    },
    {
      label: "Projects",
      href: "/#projects",
      dropdown: [
        { label: "Fintech", href: "/#projects" },
        { label: "Healthcare", href: "/#projects" },
        { label: "E-commerce", href: "/#projects" },
        { label: "View all projects", href: "/#projects" },
      ],
    },
    { label: "Services", href: "/services", isRoute: true },
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Contact", href: "/#contact" },
  ];

  const stats = [
    { value: "40+", label: "Projects Delivered", color: "#0d9488" },
    { value: "99%", label: "Client Satisfaction", color: "#38bdf8" },
    { value: "5+", label: "Years Experience", color: "#8b7ff0" },
    { value: "15+", label: "Expert Engineers", color: "#f2795a" },
  ];

  const coreValues = [
    { Icon: Target, title: "Mission Driven", desc: "We focus heavily on shipping real working business outcomes, not just lines of code.", color: "#0d9488" },
    { Icon: Award, title: "Quality Engineering", desc: "Built with production stability in mind. Senior engineering oversight on every piece.", color: "#38bdf8" },
    { Icon: Users, title: "Absolute Transparency", desc: "Weekly active sprint demos and clear communication. No vendors lock-ins, you own everything.", color: "#8b7ff0" },
    { Icon: Heart, title: "Long-Term Partnership", desc: "We remain on call long after launching to ensure software scaling runs smooth.", color: "#f2795a" },
  ];

  const whoWeArePillars = [
    { Icon: Sparkles, title: "Engineering with Purpose", desc: "We use modern engineering practices where it creates measurable value — automation, insight, and faster decisions.", color: "#0d9488" },
    { Icon: CheckCircle2, title: "Workflow-First", desc: "Every product is designed around how teams actually work, so adoption is easy and productivity improves from day one.", color: "#38bdf8" },
    { Icon: Award, title: "Built for Scale", desc: "From startups to enterprise teams, our solutions are secure, flexible, and ready to grow with your organization.", color: "#8b7ff0" },
  ];

  const processSteps = [
    { Icon: Search, title: "Discover", desc: "We understand your business, goals, and challenges in depth.", color: "#0d9488" },
    { Icon: PenTool, title: "Design", desc: "We design intuitive workflows and clean, purposeful interfaces.", color: "#38bdf8" },
    { Icon: Code2, title: "Build", desc: "We develop scalable, reliable solutions using modern technologies.", color: "#8b7ff0" },
    { Icon: TrendingUp, title: "Optimize", desc: "We continuously measure, improve, and help you achieve more.", color: "#f2795a" },
  ];

  const contactCards = [
    { Icon: Mail, label: "Email Us", value: "hello@bluecode.com" },
    { Icon: Phone, label: "Call Us", value: "+92 300 1234567" },
    { Icon: MapPin, label: "Visit Us", value: "Islamabad, Pakistan" },
  ];

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full bc-body">
      <style>{`
        [data-theme="light"] {
          --bc-base: #f7f9fc; --bc-panel: #ffffff; --bc-panel-2: #f1f5f9; --bc-line: #e2e8f0; --bc-line-soft: #edf2f7;
          --bc-text: #0f172a; --bc-muted: #64748b; --bc-cyan: #0d9488; --bc-amber: #b45309;
          --bc-btn-primary-text: #ffffff;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 7%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
          --bc-shadow-lg: 0 4px 6px rgba(15,23,42,0.03), 0 20px 40px -16px rgba(15,23,42,0.16);
        }
        [data-theme="dark"] {
          --bc-base: #0a1220; --bc-panel: #0f1b2d; --bc-panel-2: #101d31; --bc-line: #1c3350; --bc-line-soft: #16283f;
          --bc-text: #e7edf5; --bc-muted: #8fa1b8; --bc-cyan: #5eead4; --bc-amber: #f2a93b;
          --bc-btn-primary-text: #06121a;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 9%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -12px rgba(0,0,0,0.45);
          --bc-shadow-lg: 0 4px 6px rgba(0,0,0,0.2), 0 20px 45px -16px rgba(0,0,0,0.55);
        }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }

        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .bc-loader-mark { position: relative; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; }
        .bc-loader-ring { position: absolute; inset: 0; border-radius: 999px; border: 2.5px solid var(--bc-line); border-top-color: var(--bc-cyan); animation: bc-spin 0.9s linear infinite; }
        .bc-loader-square { width: 16px; height: 16px; border: 2.5px solid var(--bc-cyan); border-radius: 3px; animation: bc-loader-pulse 1.4s ease-in-out infinite; }
        @keyframes bc-spin { to { transform: rotate(360deg); } }
        @keyframes bc-loader-pulse { 0%, 100% { transform: scale(0.85); opacity: 0.6; } 50% { transform: scale(1.05); opacity: 1; } }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--bc-muted); }
        .bc-page-content { opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); font-weight: 700; }
        .bc-btn-primary { background: var(--bc-cyan); color: var(--bc-btn-primary-text); box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); transition: filter 0.2s ease, transform 0.2s ease; }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); background: var(--bc-panel); transition: border-color 0.2s ease, background 0.2s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(94,234,212,0.06); }
        .bc-pill-badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--bc-line); background: var(--bc-panel); border-radius: 999px; padding: 7px 14px 7px 10px; font-size: 0.78rem; font-weight: 600; box-shadow: var(--bc-shadow); }

        /* ---------- NAVBAR ---------- */
        .bc-navbar-wrap { display: flex; justify-content: center; padding: 16px 20px 0; }
        .bc-navbar-row { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 820px; }
        .bc-navbar-pill { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; background: #0b1220; border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; padding: 10px 12px 10px 10px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25); }
        @media (min-width: 768px) { .bc-navbar-pill { padding: 6px 8px 6px 6px; gap: 6px; } }
        .bc-navbar-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; text-decoration: none; }
        .bc-navbar-logo { width: 38px; height: 38px; flex-shrink: 0; border-radius: 999px; background: var(--bc-cyan); color: #06121a; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; }
        .bc-navbar-name { color: #ffffff; font-weight: 700; font-size: 1rem; white-space: nowrap; }
        .bc-navbar-links { display: none; }
        @media (min-width: 768px) { .bc-navbar-links { display: flex; align-items: center; gap: 26px; padding: 0 10px; flex: 1; min-width: 0; justify-content: center; } }
        .bc-navbar-link { color: rgba(241,245,249,0.68); font-size: 0.82rem; white-space: nowrap; text-decoration: none; transition: color 0.2s ease; flex-shrink: 0; }
        .bc-navbar-link:hover { color: #ffffff; }
        button.bc-navbar-link { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
        @media (min-width: 768px) { .bc-navbar-link { font-size: 0.88rem; } }
        .bc-navbar-link-active { color: #ffffff; }
        .bc-nav-dropdown-wrap { position: relative; flex-shrink: 0; }
        .bc-nav-dropdown-chevron { transition: transform 0.2s ease; }
        .bc-nav-dropdown-chevron-open, .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-chevron { transform: rotate(180deg); }
        .bc-nav-dropdown-panel { position: absolute; top: calc(100% + 16px); left: 50%; transform: translateX(-50%) translateY(6px); min-width: 220px; background: #0b1220; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 8px; box-shadow: 0 20px 45px -16px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease; z-index: 70; }
        .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-panel, .bc-nav-dropdown-panel.bc-nav-dropdown-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
        .bc-nav-dropdown-item { display: flex; flex-direction: column; gap: 2px; padding: 9px 12px; border-radius: 9px; text-decoration: none; transition: background 0.15s ease; }
        .bc-nav-dropdown-item:hover { background: rgba(255,255,255,0.07); }
        .bc-nav-dropdown-item-label { color: #f1f5f9; font-size: 0.86rem; font-weight: 600; }
        .bc-nav-dropdown-item-desc { color: rgba(241,245,249,0.5); font-size: 0.74rem; }
        .bc-navbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
        .bc-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.2s ease; cursor: pointer; }
        .bc-navbar-theme-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
        .bc-navbar-cta { display: none; }
        @media (min-width: 768px) { .bc-navbar-cta { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #0b1220; border-radius: 999px; padding: 9px 18px; font-weight: 600; font-size: 0.82rem; white-space: nowrap; text-decoration: none; flex-shrink: 0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease, filter 0.2s ease; } .bc-navbar-cta:hover { transform: translateY(-1px); filter: brightness(0.95); } }
        .bc-navbar-hamburger { display: flex; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
        @media (min-width: 768px) { .bc-navbar-hamburger { display: none; } }
        .bc-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 90; opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s ease; }
        .bc-mobile-overlay.bc-mobile-open { opacity: 1; visibility: visible; }
        .bc-mobile-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 80%; max-width: 300px; background: #0b1220; z-index: 95; padding: 26px 22px; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
        .bc-mobile-panel.bc-mobile-open { transform: translateX(0); }
        @media (min-width: 768px) { .bc-mobile-overlay, .bc-mobile-panel { display: none; } }
        .bc-mobile-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        .bc-mobile-close { width: 34px; height: 34px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        .bc-mobile-link { color: #f1f5f9; font-size: 1rem; font-weight: 600; text-decoration: none; padding: 14px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; }
        .bc-mobile-sublink { color: rgba(241,245,249,0.68); font-size: 0.88rem; text-decoration: none; padding: 10px 4px 10px 14px; display: block; }
        .bc-mobile-cta { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: var(--bc-cyan, #5eead4); color: #06121a; border-radius: 999px; padding: 12px 20px; font-weight: 600; text-decoration: none; }

        /* ---------- HERO / ABOUT LAYOUT ---------- */
        .bc-hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 992px) { .bc-hero-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }

        .bc-hero-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 580px;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--bc-shadow-lg);
          border: 1px solid var(--bc-line);
          background: var(--bc-panel);
        }
        .bc-hero-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* ---------- BLOCKS / CARDS ---------- */
        .bc-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 20px; padding: 32px; box-shadow: var(--bc-shadow); transition: transform 0.2s ease, border-color 0.2s ease; }
        .bc-card:hover { transform: translateY(-2px); border-color: var(--bc-cyan); }
        .bc-icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #fff; }
        .bc-icon-box-soft { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }

        /* ---------- WHO WE ARE ---------- */
        .bc-whoweare-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
        @media (min-width: 992px) { .bc-whoweare-grid { grid-template-columns: 0.85fr 1.15fr; gap: 56px; } }
        .bc-pillar-list { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .bc-pillar-list { grid-template-columns: 1fr 1fr 1fr; } }

        /* ---------- MISSION / VISION ---------- */
        .bc-mv-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .bc-mv-grid { grid-template-columns: 1fr 1fr; } }
        .bc-mv-card { background: var(--bc-band); border: 1px solid var(--bc-line); border-radius: 20px; padding: 34px; }

        /* ---------- STATS STRIP ---------- */
        .bc-stats-strip { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 768px) { .bc-stats-strip { grid-template-columns: repeat(4, 1fr); } }
        .bc-stats-strip-item { display: flex; align-items: center; gap: 14px; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 18px 20px; box-shadow: var(--bc-shadow); }

        /* ---------- PROCESS ---------- */
        .bc-process-grid { display: grid; grid-template-columns: 1fr; gap: 24px; position: relative; }
        @media (min-width: 900px) { .bc-process-grid { grid-template-columns: repeat(4, 1fr); } }
        .bc-process-connector { display: none; }
        @media (min-width: 900px) {
          .bc-process-connector { display: block; position: absolute; top: 40px; left: 12.5%; right: 12.5%; height: 1px; background: repeating-linear-gradient(90deg, var(--bc-line) 0 8px, transparent 8px 16px); z-index: 0; }
        }
        .bc-process-step { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 14px; }

        /* ---------- TEAM ---------- */
        .bc-team-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        @media (min-width: 992px) { .bc-team-grid { grid-template-columns: 0.85fr 1.15fr; gap: 48px; } }
        .bc-team-image-wrapper { border-radius: 20px; overflow: hidden; border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
        .bc-team-image { width: 100%; height: auto; display: block; object-fit: cover; }

        /* ---------- BOTTOM CTA BANNER ---------- */
        .bc-cta-banner { border-radius: 24px; padding: 48px; background: linear-gradient(135deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 55%, #1d4ed8)); color: #06121a; }
        .bc-cta-grid { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; }
        @media (min-width: 992px) { .bc-cta-grid { grid-template-columns: 1.1fr 0.9fr; } }
        .bc-cta-contact-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 560px) { .bc-cta-contact-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .bc-cta-contact-card { background: rgba(255,255,255,0.85); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 8px; }
        .bc-cta-contact-icon { width: 34px; height: 34px; border-radius: 999px; background: #06121a; color: #fff; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* Loading Screen */}
      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`}>
        <div className="bc-loader-mark">
          <div className="bc-loader-ring" />
          <div className="bc-loader-square" />
        </div>
        <span className="bc-loader-label bc-mono">About Bluecode</span>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
        {/* Navigation */}
        <header className="bc-navbar-wrap">
          <div className="bc-navbar-row">
            <div className="bc-navbar-pill">
              <Link to="/" className="bc-navbar-brand">
                <span className="bc-navbar-logo bc-display">B</span>
                <span className="bc-navbar-name bc-display">Bluecode</span>
              </Link>
              <nav className="bc-navbar-links">
                {navItems.map((item, idx) =>
                  item.dropdown ? (
                    <div key={idx} className="bc-nav-dropdown-wrap">
                      <button
                        className="bc-navbar-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === idx ? null : idx);
                        }}
                      >
                        {item.label}
                        <ChevronDown size={14} className={`bc-nav-dropdown-chevron ${openDropdown === idx ? "bc-nav-dropdown-chevron-open" : ""}`} />
                      </button>
                      <div className={`bc-nav-dropdown-panel ${openDropdown === idx ? "bc-nav-dropdown-open" : ""}`}>
                        {item.dropdown.map((sub, sIdx) => (
                          <a key={sIdx} href={sub.href} className="bc-nav-dropdown-item">
                            <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                            {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : item.isRoute ? (
                    <Link key={idx} to={item.href} className={`bc-navbar-link ${item.href === "/about" ? "bc-navbar-link-active" : ""}`}>
                      {item.label}
                    </Link>
                  ) : (
                    <a key={idx} href={item.href} className="bc-navbar-link">
                      {item.label}
                    </a>
                  )
                )}
              </nav>
              <div className="bc-navbar-right">
                <button onClick={toggleTheme} className="bc-navbar-theme-btn" aria-label="Toggle Theme">
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
                <a href="/#contact" className="bc-navbar-cta">
                  Get Started
                </a>
                <button className="bc-navbar-hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu">
                  <Menu size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Nav Overlay */}
        <div className={`bc-mobile-overlay ${mobileMenuOpen ? "bc-mobile-open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`bc-mobile-panel ${mobileMenuOpen ? "bc-mobile-open" : ""}`}>
          <div className="bc-mobile-panel-header">
            <span className="bc-navbar-name bc-display">Bluecode</span>
            <button className="bc-mobile-close" onClick={() => setMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.isRoute ? (
                  <Link to={item.href} className="bc-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="bc-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </a>
                )}
                {item.dropdown && (
                  <div className="pl-2">
                    {item.dropdown.map((sub, sIdx) => (
                      <a key={sIdx} href={sub.href} className="bc-mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <a href="/#contact" className="bc-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
            Get Started
          </a>
        </div>

        {/* SECTION 1: HERO / INTRO */}
        <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
          <div className="bc-hero-grid">
            <div className="flex flex-col gap-6">
              <div className="bc-pill-badge">
                <Sparkles size={14} style={{ color: "var(--bc-cyan)" }} />
                <span>Our Story & Core Identity</span>
              </div>
              <h1 className="bc-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                Driven by craft. Engineered for high performance teams.
              </h1>
              <p className="text-base md:text-lg opacity-85 leading-relaxed max-w-xl">
                We are a dedicated team of senior product engineers, designers, and cloud architects who build software with extreme precision. We bypass corporate layers to bring working solutions to life faster.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[var(--bc-line)]">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="bc-display text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
                    <span className="text-xs opacity-75 leading-tight">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bc-hero-image-wrapper">
              <img
               src={teamMeetingImg}
                alt="Bluecode Office Team Work"
                className="bc-hero-image"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2 (NEW): WHO WE ARE */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="bc-whoweare-grid">
            <div className="flex flex-col gap-4">
              <span className="bc-eyebrow">Who We Are</span>
              <h2 className="bc-display text-3xl md:text-4xl font-bold leading-tight">
                Empowering Teams Through Thoughtful Engineering
              </h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Bluecode is a product engineering studio focused on building intelligent software experiences for businesses and growing teams. We combine automation, workflow design, and user-centered interfaces to solve real operational challenges.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                We believe technology should feel simple, reliable, and purposeful — instead of adding complexity, we build systems that quietly remove friction from everyday work.
              </p>
              <div className="pt-2">
                <a href="/#contact" className="bc-btn-ghost px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
                  Learn More About Us <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="bc-pillar-list">
              {whoWeArePillars.map((p, idx) => (
                <div key={idx} className="bc-card">
                  <div className="bc-icon-box-soft" style={{ backgroundColor: `${p.color}1a` }}>
                    <p.Icon size={22} style={{ color: p.color }} />
                  </div>
                  <h3 className="bc-display text-base font-bold mb-2">{p.title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 (NEW): MISSION & VISION + STATS STRIP */}
        <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col gap-10">
          <div className="bc-mv-grid">
            <div className="bc-mv-card">
              <div className="bc-icon-box-soft" style={{ backgroundColor: "rgba(13,148,136,0.12)" }}>
                <Target size={22} style={{ color: "var(--bc-cyan)" }} />
              </div>
              <span className="bc-eyebrow">Our Mission</span>
              <h3 className="bc-display text-2xl font-bold mt-2 mb-3 leading-snug">
                To make advanced technology accessible, practical, and impactful for every organization.
              </h3>
              <p className="text-sm opacity-75 leading-relaxed">
                We are committed to building tools that empower teams to focus on strategy, creativity, and growth while automation handles the repetitive work behind the scenes.
              </p>
            </div>
            <div className="bc-mv-card">
              <div className="bc-icon-box-soft" style={{ backgroundColor: "rgba(139,127,240,0.12)" }}>
                <Eye size={22} style={{ color: "#8b7ff0" }} />
              </div>
              <span className="bc-eyebrow">Our Vision</span>
              <h3 className="bc-display text-2xl font-bold mt-2 mb-3 leading-snug">
                A future where intelligent systems seamlessly support human potential.
              </h3>
              <p className="text-sm opacity-75 leading-relaxed">
                We envision workplaces where data flows effortlessly, decisions are informed in real time, and people spend less time managing process and more time creating value.
              </p>
            </div>
          </div>

          <div className="bc-stats-strip">
            {stats.map((stat, i) => (
              <div key={i} className="bc-stats-strip-item">
                <span className="bc-display text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
                <span className="text-xs opacity-70 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CORE VALUES */}
        <section className="py-16 bg-[var(--bc-panel-2)] border-t border-b border-[var(--bc-line)] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-12">
              <span className="bc-eyebrow">How We Operate</span>
              <h2 className="bc-display text-3xl md:text-4xl font-bold">Our Philosophy & Core Values</h2>
              <div className="w-[120px] h-[2px]" style={{ background: "linear-gradient(90deg, var(--bc-cyan), transparent)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((val, idx) => (
                <div key={idx} className="bc-card">
                  <div className="bc-icon-box" style={{ backgroundColor: val.color }}>
                    <val.Icon size={24} />
                  </div>
                  <h3 className="bc-display text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 (NEW): PROCESS */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-14 max-w-xl mx-auto">
            <span className="bc-eyebrow">Our Process</span>
            <h2 className="bc-display text-3xl md:text-4xl font-bold">A Simple, Effective Approach</h2>
            <p className="text-sm opacity-75 leading-relaxed">
              We follow a proven process to deliver solutions that create real impact.
            </p>
          </div>

          <div className="bc-process-grid">
            <div className="bc-process-connector" />
            {processSteps.map((step, idx) => (
              <div key={idx} className="bc-process-step">
                <div className="bc-icon-box-soft text-white" style={{ backgroundColor: step.color, boxShadow: `0 8px 20px -6px ${step.color}80` }}>
                  <step.Icon size={20} />
                </div>
                <h3 className="bc-display text-lg font-bold">{step.title}</h3>
                <p className="text-sm opacity-75 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: BOTTOM CTA BANNER */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
          <div className="bc-cta-banner">
            <div className="bc-cta-grid">
              <div className="flex flex-col gap-4">
                <h2 className="bc-display text-3xl md:text-4xl font-bold tracking-tight">
                  Ready to transform your technical workflows?
                </h2>
                <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-xl">
                  Connect with our senior engineering architecture specialists directly to align your operational targets with production infrastructure.
                </p>
                <div className="bc-cta-contact-grid mt-4">
                  {contactCards.map((card, i) => (
                    <div key={i} className="bc-cta-contact-card">
                      <div className="bc-cta-contact-icon">
                        <card.Icon size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{card.label}</span>
                        <span className="text-xs font-semibold text-slate-900 truncate">{card.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-start lg:justify-end items-start lg:items-center">
                <a href="/#contact" className="bc-btn-primary px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2">
                  Launch Project Sprint <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}