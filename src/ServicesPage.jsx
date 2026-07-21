import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  ShieldCheck,
  Layers,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Link2,
  Globe2,
  MessageCircle,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  PenLine,
  Rocket,
  LifeBuoy,
  Plus,
  Minus,
  Users,
  Star,
  Sparkles,
  DollarSign,
  Zap,
  Infinity as InfinityIcon,
  PackageCheck,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Truck,
  GraduationCap,
  Home as HomeIcon,
  TrendingUp,
  Terminal,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function ServicesPage() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

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
    { label: "About Us", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const services = [
    { Icon: Code2, title: "Custom Software", desc: "Line-of-business systems built around how your team actually works.", color: "#0d9488" },
    { Icon: Layers, title: "Web Applications", desc: "Fast, accessible products — from customer portals to internal dashboards.", color: "#38bdf8" },
    { Icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform apps for iOS and Android, shipped long-term.", color: "#8b7ff0" },
    { Icon: Palette, title: "UI/UX Design", desc: "Interfaces designed from real user flows, tested before code ships.", color: "#f2795a" },
    { Icon: Cloud, title: "Cloud & DevOps", desc: "Infrastructure, CI/CD and monitoring so releases are routine, not risky.", color: "#34d399" },
    { Icon: ShieldCheck, title: "QA & Testing", desc: "Automated and manual coverage built in from sprint one.", color: "#f2a93b" },
  ];

  const process = [
    { step: "01", title: "Discover", desc: "We map your workflows, constraints and goals before writing a spec.", Icon: Search },
    { step: "02", title: "Design", desc: "Wireframes and architecture reviewed with you — no surprises later.", Icon: PenLine },
    { step: "03", title: "Build", desc: "Agile sprints with demos, so you see progress every week.", Icon: Rocket },
    { step: "04", title: "Support", desc: "Post-launch monitoring and iteration — we stay on call.", Icon: LifeBuoy },
  ];

  const whyChoose = [
    { Icon: DollarSign, title: "Fixed-Scope Pricing", desc: "A clear number before we start.", color: "#0d9488" },
    { Icon: Zap, title: "10x Faster Delivery", desc: "Working software every sprint.", color: "#f2a93b" },
    { Icon: InfinityIcon, title: "Unlimited Revisions", desc: "In-sprint until it's right.", color: "#8b7ff0" },
    { Icon: ShieldCheck, title: "Senior Engineers Only", desc: "No junior hand-offs, ever.", color: "#38bdf8" },
    { Icon: PackageCheck, title: "No Vendor Lock-In", desc: "You own the code, fully.", color: "#f2795a" },
  ];

  const industries = [
    { label: "Fintech", Icon: Landmark },
    { label: "Healthcare", Icon: HeartPulse },
    { label: "E-commerce", Icon: ShoppingCart },
    { label: "Logistics", Icon: Truck },
    { label: "Education", Icon: GraduationCap },
    { label: "Real Estate", Icon: HomeIcon },
  ];

  const clientLogos = ["Tanishq Labs", "Kalyan Systems", "Malabar Digital", "Senco Cloud", "PCJ Fintech", "Joya Health"];

  const avatarInitials = [
    { text: "AK", bg: "#0d9488" },
    { text: "MZ", bg: "#8b7ff0" },
    { text: "SR", bg: "#f2a93b" },
    { text: "TJ", bg: "#38bdf8" },
  ];

  const faqs = [
    { q: "How long does a typical project take?", a: "Most engagements run 8–16 weeks depending on scope, with working software demoed every sprint rather than at the very end." },
    { q: "Do you work with startups or only established companies?", a: "Both. We've shipped first products for early-stage founders and modernized decade-old systems for enterprise teams." },
    { q: "What happens after launch?", a: "Every project includes a support window for fixes and monitoring. Many clients keep us on retainer for ongoing iteration." },
    { q: "Can you work with our existing codebase?", a: "Yes — we regularly join projects mid-flight, and always start with a short codebase audit before proposing changes." },
    { q: "How do you price projects?", a: "Fixed-scope quotes for well-defined projects, or a monthly team rate for ongoing product work." },
  ];

  // ---- reusable self-contained mockup pieces (no external images needed) ----
  const DashboardMock = ({ compact }) => (
    <div className="bc-mock bc-mock-dash">
      <div className="bc-mock-topbar">
        <span className="bc-mock-dot" style={{ background: "#f2795a" }} />
        <span className="bc-mock-dot" style={{ background: "#f2a93b" }} />
        <span className="bc-mock-dot" style={{ background: "#34d399" }} />
        <span className="bc-mock-url">app.bluecode.dev</span>
      </div>
      <div className="bc-mock-body">
        <div className="bc-mock-stats-row">
          <div className="bc-mock-stat">
            <span className="bc-mock-stat-label">MRR</span>
            <span className="bc-mock-stat-value">$48.2k</span>
            <span className="bc-mock-stat-up"><TrendingUp size={11} /> 12%</span>
          </div>
          {!compact && (
            <div className="bc-mock-stat">
              <span className="bc-mock-stat-label">Uptime</span>
              <span className="bc-mock-stat-value">99.98%</span>
              <span className="bc-mock-stat-up"><TrendingUp size={11} /> 0.2%</span>
            </div>
          )}
        </div>
        <div className="bc-mock-chart">
          {[38, 55, 42, 70, 58, 82, 65, 90, 72, 96].map((h, i) => (
            <span key={i} className="bc-mock-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );

  const CodeMock = () => (
    <div className="bc-mock bc-mock-code">
      <div className="bc-mock-topbar">
        <span className="bc-mock-dot" style={{ background: "#f2795a" }} />
        <span className="bc-mock-dot" style={{ background: "#f2a93b" }} />
        <span className="bc-mock-dot" style={{ background: "#34d399" }} />
      </div>
      <div className="bc-mock-body bc-mono">
        <div className="bc-code-line"><span className="bc-code-kw">const</span> <span className="bc-code-var">build</span> = () =&gt; {"{"}</div>
        <div className="bc-code-line bc-code-indent"><span className="bc-code-kw">return</span> <span className="bc-code-str">'shipped'</span>;</div>
        <div className="bc-code-line">{"}"}</div>
        <div className="bc-code-line bc-code-comment">// tests: 128 passed</div>
      </div>
    </div>
  );

  const MobileMock = () => (
    <div className="bc-mock bc-mock-mobile">
      <div className="bc-mock-mobile-notch" />
      <div className="bc-mock-mobile-header" />
      <div className="bc-mock-mobile-rows">
        <span className="bc-mock-mobile-row" />
        <span className="bc-mock-mobile-row" style={{ width: "70%" }} />
        <span className="bc-mock-mobile-row" style={{ width: "85%" }} />
      </div>
    </div>
  );

  const KanbanMock = () => (
    <div className="bc-mock bc-mock-kanban">
      {[1, 2, 3].map((col) => (
        <div key={col} className="bc-mock-kanban-col">
          {Array.from({ length: col === 2 ? 3 : 2 }).map((_, i) => (
            <span key={i} className="bc-mock-kanban-card" />
          ))}
        </div>
      ))}
    </div>
  );

  const TeamMock = () => (
    <div className="bc-mock bc-mock-team">
      {["AK", "SR", "TJ"].map((t, i) => (
        <div key={i} className="bc-mock-team-row">
          <span className="bc-mock-team-avatar">{t}</span>
          <span className="bc-mock-team-bar" style={{ width: `${50 + i * 15}%` }} />
        </div>
      ))}
    </div>
  );

  const TerminalMock = () => (
    <div className="bc-mock bc-mock-terminal">
      <div className="bc-mock-topbar bc-mock-topbar-dark">
        <span className="bc-mock-dot" style={{ background: "#f2795a" }} />
        <span className="bc-mock-dot" style={{ background: "#f2a93b" }} />
        <span className="bc-mock-dot" style={{ background: "#34d399" }} />
      </div>
      <div className="bc-mock-body bc-mono">
        <div className="bc-term-line"><span style={{ color: "var(--bc-cyan)" }}>$</span> npm run deploy</div>
        <div className="bc-term-line bc-term-muted">Building for production...</div>
        <div className="bc-term-line" style={{ color: "#34d399" }}>✓ Build complete in 12.4s</div>
        <div className="bc-term-line" style={{ color: "#34d399" }}>✓ Deployed to bluecode.dev</div>
      </div>
    </div>
  );

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full">
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

        .bc-grid-bg { background-image: linear-gradient(var(--bc-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--bc-line-soft) 1px, transparent 1px); background-size: 48px 48px; }
        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); font-weight: 700; }
        .bc-btn-primary { background: var(--bc-cyan); color: var(--bc-btn-primary-text); box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); transition: filter 0.2s ease, transform 0.2s ease; }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); background: var(--bc-panel); transition: border-color 0.2s ease, background 0.2s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(94,234,212,0.06); }
        .bc-underline-fade { width: 220px; max-width: 60%; height: 2px; background: linear-gradient(90deg, var(--bc-cyan), transparent); }
        .bc-pill-badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--bc-line); background: var(--bc-panel); border-radius: 999px; padding: 7px 14px 7px 10px; font-size: 0.78rem; font-weight: 600; box-shadow: var(--bc-shadow); }

        /* ---------- NAVBAR (shared) ---------- */
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
        .bc-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.2s ease; }
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

        /* ---------- HERO ---------- */
        .bc-hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 992px) { .bc-hero-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }
        .bc-hero-avatars { display: flex; align-items: center; }
        .bc-hero-avatar { width: 34px; height: 34px; border-radius: 999px; border: 2px solid var(--bc-base); margin-left: -10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: 700; font-family: 'Space Grotesk', sans-serif; flex-shrink: 0; }
        .bc-hero-avatar:first-child { margin-left: 0; }
        .bc-hero-avatar-count { background: var(--bc-panel); color: var(--bc-text); border: 1px solid var(--bc-line); font-size: 0.6rem; }
        .bc-hero-stars { color: var(--bc-amber); display: flex; gap: 1px; }

        /* ---------- HERO SCENE: laptop + phone mockup ---------- */
        .bc-hero-scene { position: relative; width: 100%; max-width: 580px; margin: 0 auto; aspect-ratio: 1 / 0.92; }
        .bc-scene-plant { position: absolute; left: 2%; top: 6%; width: 20%; z-index: 1; opacity: 0.95; }
        @media (max-width: 640px) { .bc-scene-plant { display: none; } }

        .bc-scene-laptop { position: absolute; right: 0; top: 4%; width: 82%; z-index: 2; }
        .bc-laptop-screen { background: #10192a; border-radius: 16px 16px 3px 3px; padding: 9px 9px 6px; box-shadow: var(--bc-shadow-lg); }
        .bc-laptop-inner { background: var(--bc-panel); border-radius: 7px; overflow: hidden; display: flex; aspect-ratio: 16 / 10.5; }
        .bc-laptop-sidebar { width: 15%; background: var(--bc-panel-2); border-right: 1px solid var(--bc-line); display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 10px 0; flex-shrink: 0; }
        .bc-laptop-logo { width: 20px; height: 20px; border-radius: 6px; background: var(--bc-cyan); color: var(--bc-btn-primary-text); font-size: 0.62rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
        .bc-laptop-nav-item { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--bc-muted); }
        .bc-laptop-nav-active { background: var(--bc-cyan); color: var(--bc-btn-primary-text); }
        .bc-laptop-main { flex: 1; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .bc-laptop-header { font-weight: 700; font-size: 0.72rem; }
        .bc-laptop-stats { display: flex; gap: 6px; }
        .bc-laptop-stat { flex: 1; background: var(--bc-panel-2); border: 1px solid var(--bc-line); border-radius: 6px; padding: 6px 7px; display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .bc-laptop-stat-label { font-size: 0.44rem; color: var(--bc-muted); text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bc-laptop-stat-value { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.68rem; }
        .bc-laptop-stat-up { display: inline-flex; align-items: center; gap: 2px; color: #34d399; font-size: 0.42rem; font-weight: 600; }
        .bc-laptop-panels { display: flex; gap: 6px; flex: 1; min-height: 0; }
        .bc-laptop-panel-chart, .bc-laptop-panel-activity { background: var(--bc-panel-2); border: 1px solid var(--bc-line); border-radius: 6px; padding: 6px 7px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .bc-laptop-panel-chart { flex: 1.3; }
        .bc-laptop-panel-activity { flex: 1; }
        .bc-laptop-panel-title { font-size: 0.42rem; font-weight: 700; color: var(--bc-muted); text-transform: uppercase; letter-spacing: 0.03em; }
        .bc-laptop-chart-svg { flex: 1; width: 100%; height: 100%; }
        .bc-laptop-activity-row { display: flex; align-items: center; gap: 4px; font-size: 0.42rem; color: var(--bc-text); }
        .bc-laptop-base { height: 10px; background: linear-gradient(180deg, #cbd5e1, #94a3b8); border-radius: 0 0 10px 10px; margin: 0 -4%; box-shadow: var(--bc-shadow); }
        [data-theme="dark"] .bc-laptop-base { background: linear-gradient(180deg, #263449, #16223a); }

        .bc-scene-phone { position: absolute; left: 30%; bottom: 2%; width: 26%; z-index: 3; transform: rotate(-5deg); background: #10192a; border-radius: 20px; padding: 10px 7px; box-shadow: var(--bc-shadow-lg); }
        .bc-phone-notch { width: 30%; height: 5px; border-radius: 4px; background: rgba(255,255,255,0.15); margin: 0 auto 7px; }
        .bc-phone-screen { background: var(--bc-panel); border-radius: 10px; padding: 10px 9px; display: flex; flex-direction: column; gap: 9px; }
        .bc-phone-header { font-weight: 700; font-size: 0.68rem; margin-bottom: 2px; }
        .bc-phone-row { display: flex; flex-direction: column; gap: 3px; }
        .bc-phone-row-top { display: flex; justify-content: space-between; font-size: 0.44rem; color: var(--bc-text); font-weight: 600; }
        .bc-phone-row-pct { color: var(--bc-muted); font-weight: 500; }
        .bc-phone-bar-track { height: 4px; border-radius: 3px; background: var(--bc-line-soft); overflow: hidden; }
        .bc-phone-bar-fill { display: block; height: 100%; background: var(--bc-cyan); border-radius: 3px; }

        .bc-scene-badge { position: absolute; z-index: 4; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 14px; padding: 10px 14px 10px 10px; display: flex; align-items: center; gap: 9px; box-shadow: var(--bc-shadow-lg); }
        .bc-scene-badge-icon { width: 30px; height: 30px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-scene-badge-code { left: 12%; top: 2%; }
        .bc-scene-badge-ship { left: 20%; bottom: -3%; }
        .bc-scene-badge-support { right: -2%; bottom: 10%; }
        @media (max-width: 640px) { .bc-scene-badge { display: none; } }

        /* ---------- SELF-CONTAINED MOCKUPS ---------- */
        .bc-mock { border-radius: 14px; overflow: hidden; border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow); background: var(--bc-panel); display: flex; flex-direction: column; height: 100%; }
        .bc-mock-topbar { display: flex; align-items: center; gap: 5px; padding: 9px 12px; background: var(--bc-panel-2); border-bottom: 1px solid var(--bc-line); flex-shrink: 0; }
        .bc-mock-topbar-dark { background: #0b1220; border-bottom-color: rgba(255,255,255,0.08); }
        .bc-mock-dot { width: 7px; height: 7px; border-radius: 999px; flex-shrink: 0; }
        .bc-mock-url { margin-left: 8px; font-size: 0.62rem; color: var(--bc-muted); font-family: 'JetBrains Mono', monospace; }
        .bc-mock-body { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 12px; min-height: 0; }

        .bc-mock-dash { background: var(--bc-panel); }
        .bc-mock-stats-row { display: flex; gap: 10px; }
        .bc-mock-stat { flex: 1; background: var(--bc-panel-2); border: 1px solid var(--bc-line); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 2px; }
        .bc-mock-stat-label { font-size: 0.6rem; color: var(--bc-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .bc-mock-stat-value { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.95rem; }
        .bc-mock-stat-up { display: inline-flex; align-items: center; gap: 3px; color: #34d399; font-size: 0.62rem; font-weight: 600; }
        .bc-mock-chart { flex: 1; display: flex; align-items: flex-end; gap: 5px; min-height: 60px; }
        .bc-mock-bar { flex: 1; background: linear-gradient(180deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 40%, transparent)); border-radius: 3px 3px 0 0; }

        .bc-mock-code .bc-mock-body { gap: 4px; }
        .bc-code-line { font-size: 0.72rem; color: var(--bc-text); white-space: nowrap; }
        .bc-code-indent { padding-left: 16px; }
        .bc-code-kw { color: #8b7ff0; }
        .bc-code-var { color: #38bdf8; }
        .bc-code-str { color: #f2a93b; }
        .bc-code-comment { color: var(--bc-muted); }

        .bc-mock-mobile { align-items: center; padding: 10px 0; gap: 8px; background: var(--bc-panel-2); }
        .bc-mock-mobile-notch { width: 34px; height: 4px; border-radius: 4px; background: var(--bc-line); margin-bottom: 2px; }
        .bc-mock-mobile-header { width: 80%; height: 26px; border-radius: 8px; background: var(--bc-cyan); opacity: 0.85; }
        .bc-mock-mobile-rows { width: 80%; display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
        .bc-mock-mobile-row { display: block; height: 8px; border-radius: 4px; background: var(--bc-line); width: 100%; }

        .bc-mock-kanban { flex-direction: row; padding: 10px; gap: 8px; background: var(--bc-panel-2); }
        .bc-mock-kanban-col { flex: 1; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 8px; padding: 6px; display: flex; flex-direction: column; gap: 6px; }
        .bc-mock-kanban-card { display: block; height: 16px; border-radius: 5px; background: var(--bc-line-soft); border: 1px solid var(--bc-line); }
        .bc-mock-kanban-col:nth-child(2) .bc-mock-kanban-card:first-child { background: color-mix(in srgb, var(--bc-cyan) 20%, transparent); border-color: var(--bc-cyan); }

        .bc-mock-team .bc-mock-body { gap: 10px; justify-content: center; }
        .bc-mock-team-row { display: flex; align-items: center; gap: 8px; }
        .bc-mock-team-avatar { width: 22px; height: 22px; border-radius: 999px; background: var(--bc-cyan); color: var(--bc-btn-primary-text); font-size: 0.55rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-mock-team-bar { height: 8px; border-radius: 4px; background: var(--bc-line-soft); border: 1px solid var(--bc-line); }

        .bc-mock-terminal { background: #0b1220; border-color: rgba(255,255,255,0.08); }
        .bc-term-line { font-size: 0.72rem; color: #e7edf5; margin-bottom: 6px; }
        .bc-term-muted { color: rgba(231,237,245,0.45); }

        .bc-hero-collage { position: relative; aspect-ratio: 1 / 1; max-width: 520px; margin: 0 auto; }
        .bc-hero-collage-main { position: absolute; left: 0; top: 6%; width: 64%; height: 88%; border-radius: 20px; overflow: hidden; box-shadow: var(--bc-shadow-lg); }
        .bc-hero-collage-badge { position: absolute; top: 12px; left: 12px; z-index: 3; display: inline-flex; align-items: center; gap: 6px; background: rgba(10,18,32,0.72); backdrop-filter: blur(6px); color: #fff; font-size: 0.66rem; font-weight: 600; padding: 5px 11px; border-radius: 999px; }
        .bc-hero-collage-thumbs { position: absolute; right: 0; top: 0; width: 40%; height: 100%; display: flex; flex-direction: column; gap: 10px; }
        .bc-hero-collage-thumb { flex: 1; min-height: 0; }
        .bc-hero-collage-glow { position: absolute; width: 44px; height: 44px; border-radius: 999px; background: var(--bc-panel); border: 1px solid var(--bc-line); left: 60%; top: 46%; display: flex; align-items: center; justify-content: center; box-shadow: var(--bc-shadow-lg); z-index: 4; }

        /* ---------- LOGO STRIP ---------- */
        .bc-logo-strip-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 34px 48px; }
        .bc-logo-strip-item { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 600; font-size: 1rem; color: var(--bc-muted); opacity: 0.8; letter-spacing: 0.01em; }

        /* ---------- SERVICE CARDS ---------- */
        .bc-svc-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 26px; box-shadow: var(--bc-shadow); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .bc-svc-card:hover { transform: translateY(-4px); box-shadow: var(--bc-shadow-lg); }
        .bc-svc-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }

        /* ---------- HOW IT WORKS (dark band) ---------- */
        .bc-process-band { background: #0b1220; border-radius: 22px; padding: 44px 28px 50px; position: relative; overflow: hidden; }
        [data-theme="dark"] .bc-process-band { background: var(--bc-panel-2); border: 1px solid var(--bc-line); }
        .bc-process-grid { display: grid; grid-template-columns: 1fr; gap: 34px; position: relative; }
        @media (min-width: 900px) { .bc-process-grid { grid-template-columns: repeat(4, 1fr); } }
        .bc-process-line { position: absolute; top: 26px; left: 12%; right: 12%; height: 0; border-top: 2px dashed rgba(94,234,212,0.35); display: none; }
        @media (min-width: 900px) { .bc-process-line { display: block; } }
        .bc-process-step { text-align: center; position: relative; z-index: 1; }
        .bc-process-num { width: 52px; height: 52px; border-radius: 999px; background: #0b1220; border: 2px solid var(--bc-cyan); color: var(--bc-cyan); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        [data-theme="dark"] .bc-process-num { background: var(--bc-panel-2); }

        /* ---------- SHOWCASE ---------- */
        .bc-showcase-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 768px) { .bc-showcase-grid { grid-template-columns: 1.4fr 1fr; } }
        .bc-showcase-main { position: relative; }
        .bc-showcase-main .bc-mock { aspect-ratio: 4/3; }
        .bc-showcase-tag { position: absolute; top: 12px; left: 12px; z-index: 3; background: var(--bc-cyan); color: var(--bc-btn-primary-text); font-size: 0.66rem; font-weight: 700; padding: 5px 11px; border-radius: 999px; }
        .bc-showcase-thumbs { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .bc-showcase-thumbs .bc-mock { aspect-ratio: 1/1; }

        /* ---------- WHY CHOOSE ROW ---------- */
        .bc-why-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
        @media (min-width: 768px) { .bc-why-row { grid-template-columns: repeat(5, 1fr); } }
        .bc-why-item { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
        .bc-why-icon { width: 42px; height: 42px; border-radius: 999px; display: flex; align-items: center; justify-content: center; }

        /* ---------- INDUSTRIES ROW ---------- */
        .bc-industries-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px 56px; }
        .bc-industry-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .bc-industry-icon-circle { width: 54px; height: 54px; border-radius: 999px; background: var(--bc-panel); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; box-shadow: var(--bc-shadow); }

        /* ---------- FAQ ---------- */
        .bc-faq-item { border: 1px solid var(--bc-line); border-radius: 14px; background: var(--bc-panel); overflow: hidden; transition: border-color 0.2s ease; }
        .bc-faq-item + .bc-faq-item { margin-top: 12px; }
        .bc-faq-item.bc-faq-open { border-color: var(--bc-cyan); }
        .bc-faq-question { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; background: none; border: none; cursor: pointer; text-align: left; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.95rem; color: var(--bc-text); }
        .bc-faq-icon-badge { width: 28px; height: 28px; border-radius: 999px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, border-color 0.2s ease; }
        .bc-faq-open .bc-faq-icon-badge { background: color-mix(in srgb, var(--bc-cyan) 16%, transparent); border-color: var(--bc-cyan); }
        .bc-faq-answer-wrap { max-height: 0; overflow: hidden; transition: max-height 0.25s ease; }
        .bc-faq-open .bc-faq-answer-wrap { max-height: 240px; }
        .bc-faq-answer { padding: 0 20px 18px; font-size: 0.88rem; color: var(--bc-muted); line-height: 1.6; }

        /* ---------- CTA BANNER ---------- */
        .bc-cta-banner { background: #0b1220; border-radius: 20px; color: #f1f5f9; overflow: hidden; }
        [data-theme="dark"] .bc-cta-banner { background: var(--bc-panel-2); border: 1px solid var(--bc-line); }
        .bc-cta-inner { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 850px) { .bc-cta-inner { grid-template-columns: 0.85fr 1.15fr; } }
        .bc-cta-image { position: relative; min-height: 200px; padding: 22px; display: flex; }
        .bc-cta-image .bc-mock-terminal { width: 100%; }
        .bc-cta-btn { background: #ffffff; color: #0b1220; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; transition: transform 0.2s ease, filter 0.2s ease; display: inline-flex; align-items: center; gap: 8px; }
        .bc-cta-btn:hover { transform: translateY(-1px); filter: brightness(0.96); }
        .bc-cta-btn-outline { border: 1px solid rgba(241,245,249,0.3); color: #f1f5f9; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; transition: border-color 0.2s ease, background 0.2s ease; }
        .bc-cta-btn-outline:hover { border-color: rgba(241,245,249,0.6); background: rgba(255,255,255,0.06); }

        /* ---------- FOOTER (shared) ---------- */
        .bc-footer-card { position: relative; overflow: hidden; border-radius: 24px; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
        .bc-footer-underline { width: 40px; height: 3px; border-radius: 2px; background: var(--bc-cyan); margin: 14px 0 18px; }
        .bc-footer-social { width: 40px; height: 40px; border-radius: 10px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.2s ease, transform 0.2s ease; }
        .bc-footer-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px); }
        .bc-footer-col-divider { display: none; }
        @media (min-width: 768px) { .bc-footer-col-divider { display: block; width: 1px; background: var(--bc-line); align-self: stretch; } }
        .bc-footer-heading-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .bc-footer-heading-badge { width: 34px; height: 34px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); border: 1px solid color-mix(in srgb, var(--bc-cyan) 35%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-footer-heading { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.78rem; letter-spacing: 0.1em; font-weight: 700; color: var(--bc-cyan); }
        .bc-footer-item { display: flex; align-items: center; gap: 6px; color: var(--bc-muted); transition: color 0.2s ease; text-decoration: none; }
        .bc-footer-item:hover { color: var(--bc-text); }
        .bc-footer-item + .bc-footer-item { margin-top: 14px; }
        .bc-footer-contact-item { display: flex; align-items: center; gap: 10px; color: var(--bc-text); font-weight: 500; }
        .bc-footer-contact-item + .bc-footer-contact-item { margin-top: 16px; }
        .bc-footer-bottom { display: flex; align-items: center; gap: 10px; border-top: 1px solid var(--bc-line); padding-top: 20px; margin-top: 8px; color: var(--bc-muted); font-size: 0.85rem; }
        .bc-footer-bottom-badge { width: 26px; height: 26px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      `}</style>

      {/* LOADING SCREEN */}
      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`} aria-hidden={!loading}>
        <div className="bc-loader-mark">
          <div className="bc-loader-ring" />
          <div className="bc-loader-square" />
        </div>
        <div className="bc-loader-label bc-mono">Loading</div>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
        {/* NAV */}
        <div className="bc-navbar-wrap sticky top-0 z-50">
          <div className="bc-navbar-row">
            <div className="bc-navbar-pill">
              <Link to="/" className="bc-navbar-brand">
                <span className="bc-navbar-logo bc-display">B</span>
                <span className="bc-navbar-name bc-display">Bluecode</span>
              </Link>

              <nav className="bc-navbar-links bc-body">
                {navItems.map((item, i) =>
                  item.dropdown ? (
                    <div
                      key={i}
                      className="bc-nav-dropdown-wrap"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        className="bc-navbar-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown((cur) => (cur === item.label ? null : item.label));
                        }}
                        aria-expanded={openDropdown === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`bc-nav-dropdown-chevron ${openDropdown === item.label ? "bc-nav-dropdown-chevron-open" : ""}`}
                        />
                      </button>
                      <div className={`bc-nav-dropdown-panel ${openDropdown === item.label ? "bc-nav-dropdown-open" : ""}`}>
                        {item.dropdown.map((sub, j) => (
                          <a key={j} href={sub.href} className="bc-nav-dropdown-item" onClick={() => setOpenDropdown(null)}>
                            <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                            {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : item.isRoute ? (
                    <Link
                      key={i}
                      to={item.href}
                      className={`bc-navbar-link ${item.label === "Services" ? "bc-navbar-link-active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={item.href}
                      className={`bc-navbar-link ${item.label === "Services" ? "bc-navbar-link-active" : ""}`}
                    >
                      {item.label}
                    </a>
                  )
                )}
              </nav>

              <div className="bc-navbar-right">
                <button
                  onClick={toggleTheme}
                  className="bc-navbar-theme-btn"
                  aria-label="Toggle dark/light theme"
                  title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                </button>
                <button className="bc-navbar-hamburger" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
                  <Menu size={17} />
                </button>
              </div>
            </div>

            <a href="/#contact" className="bc-navbar-cta bc-body">
              Consultancy
            </a>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`bc-mobile-overlay ${mobileMenuOpen ? "bc-mobile-open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`bc-mobile-panel ${mobileMenuOpen ? "bc-mobile-open" : ""}`}>
          <div className="bc-mobile-panel-header">
            <span className="bc-navbar-name bc-display">Bluecode</span>
            <button className="bc-mobile-close" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
              <X size={17} />
            </button>
          </div>
          <div>
            {navItems.map((item, i) => (
              <div key={i}>
                {item.isRoute ? (
                  <Link to={item.href} className="bc-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="bc-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </a>
                )}
                {item.dropdown &&
                  item.dropdown.map((sub, j) => (
                    <a key={j} href={sub.href} className="bc-mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                      {sub.label}
                    </a>
                  ))}
              </div>
            ))}
          </div>
          <a href="/#contact" className="bc-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
            Consultancy
          </a>
        </div>

        {/* HERO */}
        <section className="bc-grid-bg">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
            <div className="bc-hero-grid">
              <div>
                <div className="bc-pill-badge mb-6">
                  <Sparkles size={13} color="var(--bc-cyan)" />
                  Fixed-Scope Software Studio
                </div>
                <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight mb-5">
                  One Team.
                  <br />
                  Your Entire
                  <br />
                  <span style={{ color: "var(--bc-cyan)" }}>Product Roadmap.</span>
                </h1>
                <p className="bc-body text-base md:text-lg mb-8 max-w-md" style={{ color: "var(--bc-muted)" }}>
                  Design, build, ship, and support — every service your product
                  needs, handled by engineers you can actually reach.
                </p>
                <div className="flex flex-wrap gap-4 mb-9">
                  <a href="/#contact" className="bc-btn-primary bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                    Get a quote <ArrowRight size={18} />
                  </a>
                  <a href="#service-list" className="bc-btn-ghost bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                    Browse services <ArrowUpRight size={18} />
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bc-hero-avatars">
                    {avatarInitials.map((a, i) => (
                      <span key={i} className="bc-hero-avatar" style={{ background: a.bg }}>
                        {a.text}
                      </span>
                    ))}
                    <span className="bc-hero-avatar bc-hero-avatar-count">120+</span>
                  </div>
                  <div>
                    <div className="bc-body font-semibold text-sm">120+ teams trust Bluecode</div>
                    <div className="flex items-center gap-1.5">
                      <div className="bc-hero-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} fill="var(--bc-amber)" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>4.9/5 from 80+ reviews</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bc-hero-scene">
                {/* plant, drawn behind everything */}
                <div className="bc-scene-plant" aria-hidden="true">
                  <svg viewBox="0 0 90 100" width="100%" height="100%">
                    <ellipse cx="45" cy="88" rx="26" ry="7" fill="var(--bc-line)" opacity="0.35" />
                    <path d="M20 62h50l-6 30a6 6 0 0 1-6 5H32a6 6 0 0 1-6-5z" fill="#e7ece8" stroke="var(--bc-line)" />
                    <path d="M45 62c0-22-18-24-24-40 14 2 26 14 24 40z" fill="#0d9488" opacity="0.85" />
                    <path d="M45 62c0-26 16-30 20-46 -16 4-24 20-20 46z" fill="#34d399" opacity="0.9" />
                    <path d="M45 62c0-18-10-22-8-34 10 4 16 16 8 34z" fill="#5eead4" opacity="0.85" />
                  </svg>
                </div>

                {/* laptop */}
                <div className="bc-scene-laptop">
                  <div className="bc-laptop-screen">
                    <div className="bc-laptop-inner">
                      <div className="bc-laptop-sidebar">
                        <span className="bc-laptop-logo bc-display">B</span>
                        <span className="bc-laptop-nav-item bc-laptop-nav-active"><HomeIcon size={11} /> Home</span>
                        <span className="bc-laptop-nav-item"><Layers size={11} /> Projects</span>
                        <span className="bc-laptop-nav-item"><CheckCircle2 size={11} /> Tasks</span>
                        <span className="bc-laptop-nav-item"><TrendingUp size={11} /> Analytics</span>
                        <span className="bc-laptop-nav-item"><Users size={11} /> Team</span>
                      </div>
                      <div className="bc-laptop-main">
                        <div className="bc-laptop-header bc-display">Dashboard</div>
                        <div className="bc-laptop-stats">
                          <div className="bc-laptop-stat">
                            <span className="bc-laptop-stat-label">Total Users</span>
                            <span className="bc-laptop-stat-value">24.6K</span>
                            <span className="bc-laptop-stat-up"><TrendingUp size={10} /> 12.5%</span>
                          </div>
                          <div className="bc-laptop-stat">
                            <span className="bc-laptop-stat-label">Revenue</span>
                            <span className="bc-laptop-stat-value">$86.4K</span>
                            <span className="bc-laptop-stat-up"><TrendingUp size={10} /> 8.2%</span>
                          </div>
                          <div className="bc-laptop-stat">
                            <span className="bc-laptop-stat-label">Orders</span>
                            <span className="bc-laptop-stat-value">1.2K</span>
                            <span className="bc-laptop-stat-up"><TrendingUp size={10} /> 14.8%</span>
                          </div>
                        </div>
                        <div className="bc-laptop-panels">
                          <div className="bc-laptop-panel-chart">
                            <span className="bc-laptop-panel-title">Project Progress</span>
                            <div className="bc-laptop-chart-wrap">
                              <svg viewBox="0 0 200 60" className="bc-laptop-chart-svg" preserveAspectRatio="none">
                                <path d="M0 45 Q 20 20, 40 38 T 80 30 T 120 42 T 160 18 T 200 28" fill="none" stroke="var(--bc-cyan)" strokeWidth="2.5" />
                              </svg>
                              <span className="bc-laptop-chart-tooltip">75%<br /><span>This week</span></span>
                            </div>
                          </div>
                          <div className="bc-laptop-panel-activity">
                            <span className="bc-laptop-panel-title">Recent Activity</span>
                            {[
                              ["New project created", "2m ago"],
                              ["Design uploaded", "1h ago"],
                              ["API integrated", "3h ago"],
                              ["Deployment successful", "5h ago"],
                            ].map(([t, time], i) => (
                              <div key={i} className="bc-laptop-activity-row">
                                <CheckCircle2 size={9} color="var(--bc-cyan)" />
                                <span className="bc-laptop-activity-text">{t}<br /><span>{time}</span></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bc-laptop-base" />
                </div>

                {/* phone, overlapping the laptop base */}
                <div className="bc-scene-phone">
                  <div className="bc-phone-notch" />
                  <div className="bc-phone-screen">
                    <div className="bc-phone-header bc-display">Projects</div>
                    {[
                      { label: "Mobile App", pct: 75 },
                      { label: "Website Redesign", pct: 60 },
                      { label: "API Integration", pct: 100 },
                    ].map((row, i) => (
                      <div key={i} className="bc-phone-row">
                        <div className="bc-phone-row-top">
                          <span>{row.label}</span>
                          <span className="bc-phone-row-pct">{row.pct}%</span>
                        </div>
                        <div className="bc-phone-bar-track">
                          <span className="bc-phone-bar-fill" style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* floating badge cards */}
                <div className="bc-scene-badge bc-scene-badge-code">
                  <span className="bc-scene-badge-icon"><Code2 size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Clean Code<br />Scalable</span>
                </div>
                <div className="bc-scene-badge bc-scene-badge-ship">
                  <span className="bc-scene-badge-icon"><Rocket size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Ship Faster<br />High Quality</span>
                </div>
                <div className="bc-scene-badge bc-scene-badge-support">
                  <span className="bc-scene-badge-icon"><LifeBuoy size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Reliable Support<br />Always Here</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="bc-mono text-[0.68rem] tracking-widest uppercase mb-6 text-center" style={{ color: "var(--bc-muted)" }}>
              Trusted by growing teams at
            </div>
            <div className="bc-logo-strip-row">
              {clientLogos.map((name, i) => (
                <span key={i} className="bc-logo-strip-item">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section id="service-list" className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="bc-eyebrow mb-3">Our Services</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">
              Everything You Need to <span style={{ color: "var(--bc-cyan)" }}>Ship & Scale</span>
            </h2>
            <p className="bc-body" style={{ color: "var(--bc-muted)" }}>
              One team covering the full lifecycle of your product, from first sketch to long-term support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bc-svc-card">
                <div className="bc-svc-icon" style={{ background: `${s.color}1a`, border: `1px solid ${s.color}55` }}>
                  <s.Icon size={22} color={s.color} strokeWidth={1.75} />
                </div>
                <h3 className="bc-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="bc-body text-sm mb-4" style={{ color: "var(--bc-muted)" }}>{s.desc}</p>
                <a href="/#contact" className="bc-body font-semibold text-sm flex items-center gap-1.5" style={{ color: s.color }}>
                  Discuss this service <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
          <div className="bc-process-band">
            <div className="text-center mb-12">
              <div className="bc-mono bc-eyebrow mb-3" style={{ color: "var(--bc-cyan)" }}>How We Work</div>
              <h2 className="bc-display font-bold text-2xl md:text-3xl" style={{ color: "#f1f5f9" }}>
                From Brief to Launch in 4 Simple Steps
              </h2>
            </div>
            <div className="bc-process-grid">
              <div className="bc-process-line" />
              {process.map((p, i) => (
                <div key={i} className="bc-process-step">
                  <div className="bc-process-num">{p.step}</div>
                  <h3 className="bc-display font-bold text-base mb-2" style={{ color: "#f1f5f9" }}>{p.title}</h3>
                  <p className="bc-body text-sm" style={{ color: "rgba(241,245,249,0.6)" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section style={{ background: "var(--bc-band)" }}>
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div>
              <div className="bc-eyebrow mb-3">Recent Work</div>
              <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">
                Real Products. <br /> Real Engineering.
              </h2>
              <p className="bc-body mb-6" style={{ color: "var(--bc-muted)" }}>
                See what shipping with Bluecode looks like — dashboards, portals, and
                mobile apps built for daily, production use.
              </p>
              <a href="/#projects" className="bc-btn-ghost bc-body font-semibold px-6 py-3 rounded inline-flex items-center gap-2">
                View all projects <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="bc-showcase-grid">
              <div className="bc-showcase-main">
                <span className="bc-showcase-tag">Latest Build</span>
                <DashboardMock compact={false} />
              </div>
              <div className="bc-showcase-thumbs">
                <CodeMock />
                <MobileMock />
                <KanbanMock />
                <TeamMock />
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="bc-eyebrow mb-3">Why Bluecode</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl">A studio built to be easy to work with</h2>
          </div>
          <div className="bc-why-row">
            {whyChoose.map((w, i) => (
              <div key={i} className="bc-why-item">
                <div className="bc-why-icon" style={{ background: `${w.color}1a`, border: `1px solid ${w.color}55` }}>
                  <w.Icon size={19} color={w.color} strokeWidth={1.75} />
                </div>
                <div className="bc-body font-semibold text-sm">{w.title}</div>
                <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section style={{ background: "var(--bc-band)" }}>
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="text-center mb-12">
              <div className="bc-eyebrow mb-3">Industries We Serve</div>
              <h2 className="bc-display font-bold text-3xl md:text-4xl">Built for Every Kind of Business</h2>
            </div>
            <div className="bc-industries-row">
              {industries.map((ind, i) => (
                <div key={i} className="bc-industry-item">
                  <div className="bc-industry-icon-circle">
                    <ind.Icon size={22} color="var(--bc-cyan)" strokeWidth={1.75} />
                  </div>
                  <span className="bc-body text-sm font-medium">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-12">
            <div className="bc-eyebrow mb-3">Common Questions</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl">FAQs</h2>
            <div className="bc-underline-fade mx-auto mt-5" />
          </div>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className={`bc-faq-item ${openFaq === i ? "bc-faq-open" : ""}`}>
                <button
                  type="button"
                  className="bc-faq-question"
                  onClick={() => setOpenFaq((cur) => (cur === i ? null : i))}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="bc-faq-icon-badge">
                    {openFaq === i ? <Minus size={14} color="var(--bc-cyan)" /> : <Plus size={14} color="var(--bc-muted)" />}
                  </span>
                </button>
                <div className="bc-faq-answer-wrap">
                  <p className="bc-faq-answer">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-24">
          <div className="bc-cta-banner">
            <div className="bc-cta-inner">
              <div className="bc-cta-image">
                <TerminalMock />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center gap-6">
                <div>
                  <p className="bc-display font-semibold text-2xl md:text-3xl leading-snug mb-2">
                    Ready to Build Your Next Product?
                  </p>
                  <p className="bc-body text-sm" style={{ color: "rgba(241,245,249,0.65)" }}>
                    Join 120+ teams already shipping faster with Bluecode.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="/#contact" className="bc-cta-btn">
                    Start a Project <ArrowRight size={16} />
                  </a>
                  <a href="/#contact" className="bc-cta-btn-outline">
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "var(--bc-band)" }}>
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="bc-footer-card p-8 md:p-12">
              <div className="grid md:grid-cols-[1.2fr_auto_1fr_auto_1fr_auto_1fr] gap-x-8 gap-y-12">
                <div>
                  <div className="bc-display font-bold text-lg flex items-center gap-2">
                    <span style={{ color: "var(--bc-cyan)" }}>&#9634;</span> Bluecode
                  </div>
                  <div className="bc-footer-underline" />
                  <p className="bc-body text-sm mb-6" style={{ color: "var(--bc-muted)" }}>
                    A software house building systems companies can rely on.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="bc-footer-social" aria-label="Website">
                      <Globe2 size={17} color="var(--bc-cyan)" />
                    </a>
                    <a href="#" className="bc-footer-social" aria-label="LinkedIn">
                      <Link2 size={17} color="var(--bc-cyan)" />
                    </a>
                    <a href="#" className="bc-footer-social" aria-label="Message us">
                      <MessageCircle size={17} color="var(--bc-cyan)" />
                    </a>
                  </div>
                </div>

                <div className="bc-footer-col-divider" />

                <div>
                  <div className="bc-footer-heading-row">
                    <div className="bc-footer-heading-badge">
                      <Layers size={16} color="var(--bc-cyan)" />
                    </div>
                    <span className="bc-footer-heading">SERVICES</span>
                  </div>
                  <div className="bc-body text-sm">
                    {services.slice(0, 4).map((s, i) => (
                      <a key={i} href="#service-list" className="bc-footer-item">
                        <ChevronRight size={14} color="var(--bc-cyan)" />
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bc-footer-col-divider" />

                <div>
                  <div className="bc-footer-heading-row">
                    <div className="bc-footer-heading-badge">
                      <Users size={16} color="var(--bc-cyan)" />
                    </div>
                    <span className="bc-footer-heading">COMPANY</span>
                  </div>
                  <div className="bc-body text-sm">
                    {[
                      { label: "Our Work", href: "/#projects" },
                      { label: "Industries", href: "/#about" },
                      { label: "Clients", href: "/#blogs" },
                      { label: "Contact", href: "/#contact" },
                    ].map((item, i) => (
                      <a key={i} href={item.href} className="bc-footer-item">
                        <ChevronRight size={14} color="var(--bc-cyan)" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bc-footer-col-divider" />

                <div>
                  <div className="bc-footer-heading-row">
                    <div className="bc-footer-heading-badge">
                      <Mail size={15} color="var(--bc-cyan)" />
                    </div>
                    <span className="bc-footer-heading">CONTACT</span>
                  </div>
                  <div className="bc-body text-sm">
                    <div className="bc-footer-contact-item">
                      <Mail size={16} color="var(--bc-cyan)" /> hello@bluecode.dev
                    </div>
                    <div className="bc-footer-contact-item">
                      <Phone size={16} color="var(--bc-cyan)" /> +92 300 0000000
                    </div>
                    <div className="bc-footer-contact-item">
                      <MapPin size={16} color="var(--bc-cyan)" /> Islamabad, Pakistan
                    </div>
                  </div>
                </div>
              </div>

              <div className="bc-footer-bottom">
                <div className="bc-footer-bottom-badge">
                  <ShieldCheck size={14} color="var(--bc-cyan)" />
                </div>
                © 2026 <span style={{ color: "var(--bc-cyan)", fontWeight: 600 }}>Bluecode</span>. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}