import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import teamPhoto from "./assets/team-meeting.jpg"; // apna actual image path/naam yahan daalein
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
  Send,
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

/* ---------------------------------------------------------------------
   useReveal — small IntersectionObserver hook used for "scroll into
   view" section animations (fade + move, alternating direction).
--------------------------------------------------------------------- */
function useReveal(options) {
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export default function ServicesPage() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // ---- animation-related state ----
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  const cursorBRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorGlowRef = useRef(null);

  // scroll-reveal refs for each major section (alternating directions)
  const [svcRef, svcInView] = useReveal();
  const [processRef, processInView] = useReveal();
  const [showcaseRef, showcaseInView] = useReveal();
  const [whyRef, whyInView] = useReveal();
  const [industriesRef, industriesInView] = useReveal();
  const [faqRef, faqInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();
  const [footerRef, footerInView] = useReveal();

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

  // scroll progress bar + navbar blur + back-to-top visibility
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY;
        const height = doc.scrollHeight - doc.clientHeight;
        setScrolled(scrollTop > 10);
        setShowBackToTop(scrollTop > 300);
        setScrollProgress(height > 0 ? (scrollTop / height) * 100 : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // custom cursor (desktop / fine-pointer only)
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

  // big soft glow blob that trails the cursor with easing (desktop / fine-pointer only)
  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const current = { ...target };
    let raf;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      glow.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // subtle 3-5px mouse parallax helpers
  const makeParallaxHandlers = (setter, strength = 6) => ({
    onMouseMove: (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setter({ x: relX * strength, y: relY * strength });
    },
    onMouseLeave: () => setter({ x: 0, y: 0 }),
  });
  const heroParallaxHandlers = makeParallaxHandlers(setHeroParallax, 8);

 const navItems = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Services", href: "/services", isRoute: true },
  { label: "Products", href: "/products", isRoute: true },
  { label: "Portfolio", href: "/portfolio", isRoute: true },
  {
    label: "About Us",
    dropdown: [
      { label: "Our History", desc: "How Bluecode got started", href: "/our-history" },
      { label: "Blogs", desc: "Insights from our studio", href: "/blogs" },
    ],
  },
  { label: "Contact", href: "/contact", isRoute: true },
];

  const services = [
    { Icon: Code2, title: "Custom Software", desc: "Line-of-business systems built around how your team actually works.", color: "#6366F1" },
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
    { Icon: DollarSign, title: "Fixed-Scope Pricing", desc: "A clear number before we start.", color: "#6366F1" },
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
    { text: "AK", bg: "#6366F1" },
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
          --bc-base: #FAFAF9; --bc-panel: #ffffff; --bc-panel-2: #F5F5F4; --bc-line: #E7E5E4; --bc-line-soft: #F0EFED;
          --bc-text: #1C1917; --bc-muted: #78716C; --bc-cyan: #6366F1; --bc-amber: #C2410C;
          --bc-btn-primary-text: #ffffff;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 6%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(28,25,23,0.04), 0 8px 24px -12px rgba(28,25,23,0.12);
          --bc-shadow-lg: 0 4px 6px rgba(28,25,23,0.03), 0 20px 40px -16px rgba(28,25,23,0.16);
        }
        [data-theme="dark"] {
          --bc-base: #17151F; --bc-panel: #201D2E; --bc-panel-2: #262238; --bc-line: #322C47; --bc-line-soft: #2A2539;
          --bc-text: #F5F5F4; --bc-muted: #A8A29E; --bc-cyan: #818CF8; --bc-amber: #FB923C;
          --bc-btn-primary-text: #1E1B4B;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 9%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -12px rgba(0,0,0,0.45);
          --bc-shadow-lg: 0 4px 6px rgba(0,0,0,0.2), 0 20px 45px -16px rgba(0,0,0,0.55);
        }
        html { scroll-behavior: smooth; }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }

        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; display: flex; align-items: center; justify-content: center; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
       .bc-loader-brand { display: flex; flex-direction: column; align-items: center; }
       @media (max-width: 768px) {
  .bc-loader-brand { transform: translate(-140px, -140px); }
}
        .bc-loader-logo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; width: 40px; height: 40px; margin-bottom: 10px; }
        .bc-loader-sq { width: 18px; height: 18px; border-radius: 6px; animation: bc-loader-sq-pulse 1.2s ease-in-out infinite; }
        .bc-loader-sq-a { background: var(--bc-cyan); }
        .bc-loader-sq-b { background: #1E1B4B; }
        .bc-loader-sq:nth-child(1) { animation-delay: 0s; }
        .bc-loader-sq:nth-child(2) { animation-delay: 0.15s; }
        .bc-loader-sq:nth-child(3) { animation-delay: 0.3s; }
        .bc-loader-sq:nth-child(4) { animation-delay: 0.45s; }
        @keyframes bc-loader-sq-pulse { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1); } }
        .bc-loader-name { font-weight: 700; font-size: 1.05rem; color: var(--bc-text); line-height: 1.2; }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--bc-muted); margin-top: 2px; }
        .bc-page-content { position: relative; z-index: 1; opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

        .bc-grid-bg { background: transparent; }
        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); font-weight: 700; }

        /* ---------- BUTTONS (hover scale + shadow + gradient shift, click scale) ---------- */
        .bc-btn-primary {
          background: linear-gradient(90deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 55%, #38bdf8), var(--bc-cyan));
          background-size: 220% 100%; background-position: 0% 0%;
          color: var(--bc-btn-primary-text);
          box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent);
          transition: filter 0.2s ease, transform 0.2s ease, background-position 0.6s ease, box-shadow 0.3s ease;
        }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px) scale(1.05); background-position: 100% 0%; box-shadow: 0 14px 30px -8px color-mix(in srgb, var(--bc-cyan) 65%, transparent); }
        .bc-btn-primary:active { transform: scale(0.96); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); background: var(--bc-panel); transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(99,102,241,0.08); transform: translateY(-1px) scale(1.03); box-shadow: var(--bc-shadow-lg); }
        .bc-btn-ghost:active { transform: scale(0.96); }
        .bc-btn-arrow { display: inline-block; transition: transform 0.25s ease; }
        .group:hover .bc-btn-arrow { transform: translateX(4px); }
        .bc-underline-fade { width: 220px; max-width: 60%; height: 2px; background: linear-gradient(90deg, var(--bc-cyan), transparent); }
        .bc-pill-badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--bc-line); background: var(--bc-panel); border-radius: 999px; padding: 7px 14px 7px 10px; font-size: 0.78rem; font-weight: 600; box-shadow: var(--bc-shadow); }

        /* ---------- BACKGROUND: mesh gradient + noise ---------- */
        .bc-bg-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.55;
          background:
            radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--bc-cyan) 18%, transparent), transparent 45%),
            radial-gradient(circle at 80% 25%, color-mix(in srgb, var(--bc-amber) 12%, transparent), transparent 42%),
            radial-gradient(circle at 50% 85%, color-mix(in srgb, var(--bc-cyan) 14%, transparent), transparent 45%);
          background-size: 180% 180%;
          animation: bc-mesh-drift 26s ease-in-out infinite;
        }
        @keyframes bc-mesh-drift {
          0%, 100% { background-position: 0% 0%, 100% 0%, 50% 100%; }
          50% { background-position: 30% 40%, 60% 60%, 70% 30%; }
        }
        .bc-bg-noise {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.03; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .bc-cursor-glow {
          position: fixed; top: 0; left: 0; z-index: 0; pointer-events: none;
          width:380px; height: 380px; border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--bc-cyan) 42%, transparent) 0%, color-mix(in srgb, var(--bc-cyan) 16%, transparent) 40%, transparent 72%);
          filter: blur(10px);
          opacity: 0.8;
          mix-blend-mode: normal;
          will-change: transform;
        }
        [data-theme="dark"] .bc-cursor-glow { opacity: 0.55; }
        @media (pointer: coarse) { .bc-cursor-glow { display: none; } }

        /* ---------- SCROLL PROGRESS + BACK TO TOP + CUSTOM CURSOR ---------- */
        .bc-scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: var(--bc-cyan); z-index: 200; transition: width 0.12s linear; box-shadow: 0 0 8px color-mix(in srgb, var(--bc-cyan) 60%, transparent); }
        .bc-back-to-top {
          position: fixed; right: 22px; bottom: 22px; z-index: 150; width: 46px; height: 46px; border-radius: 999px;
          background: var(--bc-cyan); color: var(--bc-btn-primary-text); display: flex; align-items: center; justify-content: center;
          box-shadow: var(--bc-shadow-lg); opacity: 0; transform: translateY(14px) scale(0.85); pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .bc-back-to-top-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .bc-back-to-top:hover { transform: translateY(-3px) scale(1.06); }
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
        @media (pointer: coarse) { .bc-cursor-b, .bc-cursor-ring, .bc-scroll-progress { display: none; } }
        @media (pointer: fine) { body { cursor: none; } }

        /* ---------- SCROLL-REVEAL (whole page section animations) ---------- */
        .bc-reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
        .bc-reveal-center { transform: translateY(40px); }
        .bc-reveal-left { transform: translate(-40px, 24px); }
        .bc-reveal-right { transform: translate(40px, 24px); }
        .bc-reveal-in { opacity: 1; transform: translate(0, 0); }

        /* ---------- NAVBAR (shared) ---------- */
       .bc-navbar-wrap { display: flex; justify-content: center; padding: 16px 20px 0; }
.bc-navbar-row { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 920px; }
.bc-navbar-pill { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; background: #18152A; border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; padding: 10px 12px 10px 10px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25); }
@media (min-width: 1024px) { .bc-navbar-pill { padding: 6px 8px 6px 6px; gap: 6px; } }
.bc-navbar-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; text-decoration: none; }
.bc-navbar-logo { width: 38px; height: 38px; flex-shrink: 0; border-radius: 999px; background: var(--bc-cyan); color: #1E1B4B; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; }
.bc-navbar-name { color: #ffffff; font-weight: 700; font-size: 1rem; white-space: nowrap; }
.bc-navbar-links { display: none; }
@media (min-width: 1024px) { .bc-navbar-links { display: flex; align-items: center; gap: 18px; padding: 0 8px; flex: 1; min-width: 0; justify-content: center; } }
.bc-navbar-link { position: relative; color: rgba(241,245,249,0.68); font-size: 0.82rem; white-space: nowrap; text-decoration: none; transition: color 0.3s ease; flex-shrink: 0; }
button.bc-navbar-link { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
.bc-navbar-link:hover { color: #ffffff; }
.bc-navbar-link-active { color: #ffffff; }
.bc-nav-dropdown-wrap { position: relative; flex-shrink: 0; }
.bc-nav-dropdown-chevron { transition: transform 0.2s ease; }
.bc-nav-dropdown-chevron-open, .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-chevron { transform: rotate(180deg); }
.bc-nav-dropdown-panel { position: absolute; top: calc(100% + 16px); left: 50%; transform: translateX(-50%) translateY(6px); min-width: 220px; background: #18152A; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 8px; box-shadow: 0 20px 45px -16px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease; z-index: 70; }
.bc-nav-dropdown-wrap:hover .bc-nav-dropdown-panel, .bc-nav-dropdown-panel.bc-nav-dropdown-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
.bc-nav-dropdown-wrap::after { content: ""; position: absolute; top: 100%; left: -20px; right: -20px; height: 20px; }
.bc-nav-dropdown-item { display: flex; flex-direction: column; gap: 2px; padding: 9px 12px; border-radius: 9px; text-decoration: none; transition: background 0.15s ease; }
.bc-nav-dropdown-item:hover { background: rgba(255,255,255,0.07); }
.bc-nav-dropdown-item-label { color: #F5F5F4; font-size: 0.86rem; font-weight: 600; }
.bc-nav-dropdown-item-desc { color: rgba(241,245,249,0.5); font-size: 0.74rem; }
.bc-navbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
.bc-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.2s ease; }
.bc-navbar-theme-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
.bc-navbar-hamburger { display: flex; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
@media (min-width: 1024px) { .bc-navbar-hamburger { display: none; } }
.bc-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 90; opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s ease; }
.bc-mobile-overlay.bc-mobile-open { opacity: 1; visibility: visible; }
.bc-mobile-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 80%; max-width: 300px; background: #18152A; z-index: 95; padding: 26px 22px; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
.bc-mobile-panel.bc-mobile-open { transform: translateX(0); }
@media (min-width: 1024px) { .bc-mobile-overlay, .bc-mobile-panel { display: none; } }
.bc-mobile-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.bc-mobile-close { width: 34px; height: 34px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
.bc-mobile-link { color: #F5F5F4; font-size: 1rem; font-weight: 600; text-decoration: none; padding: 14px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; }
.bc-mobile-sublink { color: rgba(241,245,249,0.68); font-size: 0.88rem; text-decoration: none; padding: 10px 4px 10px 14px; display: block; }        /* ---------- HERO ---------- */
        .bc-hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 992px) { .bc-hero-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }
        .bc-hero-avatars { display: flex; align-items: center; }
        .bc-hero-avatar { width: 34px; height: 34px; border-radius: 999px; border: 2px solid var(--bc-base); margin-left: -10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: 700; font-family: 'Space Grotesk', sans-serif; flex-shrink: 0; }
        .bc-hero-avatar:first-child { margin-left: 0; }
        .bc-hero-avatar-count { background: var(--bc-panel); color: var(--bc-text); border: 1px solid var(--bc-line); font-size: 0.6rem; }
        .bc-hero-stars { color: var(--bc-amber); display: flex; gap: 1px; }

        /* hero text reveal: heading (0.8s), paragraph (0.2s delay), buttons (0.4s delay) */
        .bc-hero-anim { opacity: 0; transform: translateY(24px); }
        .bc-page-visible .bc-hero-anim-heading { animation: bc-fade-up 0.8s ease forwards; }
        .bc-page-visible .bc-hero-anim-para { animation: bc-fade-up 0.8s ease 0.2s forwards; }
        .bc-page-visible .bc-hero-anim-buttons { animation: bc-fade-up 0.8s ease 0.4s forwards; }
        .bc-page-visible .bc-hero-anim-social { animation: bc-fade-up 0.8s ease 0.55s forwards; }
        @keyframes bc-fade-up { to { opacity: 1; transform: translateY(0); } }

        /* ---------- HERO PHOTO: slow float + parallax + shadow transition ---------- */
        .bc-hero-photo { position: relative; width: 100%; max-width: 560px; margin: 0 auto; animation: bc-float 9s ease-in-out infinite; }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .bc-hero-photo-frame { border-radius: 20px; overflow: hidden; box-shadow: var(--bc-shadow-lg); border: 1px solid var(--bc-line); aspect-ratio: 3 / 2.6; transition: box-shadow 0.4s ease, transform 0.15s ease-out; }
        .bc-hero-photo-frame:hover { box-shadow: 0 34px 64px -18px color-mix(in srgb, var(--bc-cyan) 40%, transparent), var(--bc-shadow-lg); }
        .bc-hero-photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bc-hero-photo-badge { position: absolute; z-index: 4; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 14px; padding: 10px 14px 10px 10px; display: flex; align-items: center; gap: 9px; box-shadow: var(--bc-shadow-lg); opacity: 0; transform: scale(0.6); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-hero-photo-badge:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 16px 32px -10px color-mix(in srgb, var(--bc-cyan) 45%, transparent), var(--bc-shadow-lg); }
        .bc-page-visible .bc-hero-photo-badge-code { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.9s forwards; }
        .bc-page-visible .bc-hero-photo-badge-ship { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards; }
        @keyframes bc-badge-pop { to { opacity: 1; transform: scale(1); } }
        .bc-scene-badge-icon { width: 30px; height: 30px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-hero-photo-badge-code { left: -4%; top: 8%; }
        .bc-hero-photo-badge-ship { right: -4%; bottom: 8%; }
        @media (max-width: 640px) { .bc-hero-photo-badge { display: none; } }

        /* ---------- SELF-CONTAINED MOCKUPS (used in Showcase & CTA sections) ---------- */
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

        .bc-showcase-visual { position: relative; width: 100%; max-width: 480px; margin: 0 auto; animation: bc-showcase-float 8s ease-in-out infinite; }
        @keyframes bc-showcase-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .bc-showcase-tag { display: inline-flex; align-items: center; background: var(--bc-cyan); color: var(--bc-btn-primary-text); font-size: 0.7rem; font-weight: 700; padding: 6px 13px; border-radius: 999px; margin-bottom: 12px; box-shadow: var(--bc-shadow); }
        .bc-showcase-main .bc-mock { aspect-ratio: 4/3; transition: box-shadow 0.4s ease; }
        .bc-showcase-visual:hover .bc-mock { box-shadow: 0 30px 60px -18px color-mix(in srgb, var(--bc-cyan) 38%, transparent), var(--bc-shadow-lg); }
        .bc-showcase-badge { position: absolute; z-index: 4; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 14px; padding: 10px 14px 10px 10px; display: flex; align-items: center; gap: 9px; box-shadow: var(--bc-shadow-lg); transition: transform 0.3s ease, box-shadow 0.3s ease; opacity: 0; transform: scale(0.6); }
        .bc-showcase-badge:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 16px 32px -10px color-mix(in srgb, var(--bc-cyan) 45%, transparent), var(--bc-shadow-lg); }
        .bc-page-visible .bc-showcase-badge-left { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s forwards; }
        .bc-page-visible .bc-showcase-badge-right { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s forwards; }
        .bc-showcase-badge-left { left: -6%; bottom: 10%; }
        .bc-showcase-badge-right { right: -6%; top: 10%; }
        @media (max-width: 640px) { .bc-showcase-badge { display: none; } }

        /* ---------- LOGO STRIP → INFINITE MARQUEE ---------- */
        .bc-marquee { overflow: hidden; position: relative; -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
        .bc-marquee-track { display: flex; gap: 56px; width: max-content; animation: bc-marquee-scroll 30s linear infinite; }
        .bc-marquee:hover .bc-marquee-track { animation-play-state: paused; }
        @keyframes bc-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bc-logo-strip-item { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 600; font-size: 1rem; color: var(--bc-muted); opacity: 0.8; letter-spacing: 0.01em; white-space: nowrap; transition: opacity 0.2s ease, color 0.2s ease; }
        .bc-logo-strip-item:hover { opacity: 1; color: var(--bc-cyan); }

        /* ---------- SERVICE CARDS ---------- */
        .bc-svc-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 26px; box-shadow: var(--bc-shadow); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease; }
        .bc-svc-card:hover { transform: translateY(-10px); border-color: var(--bc-cyan); box-shadow: 0 24px 50px -16px color-mix(in srgb, var(--bc-cyan) 35%, transparent), var(--bc-shadow-lg); filter: brightness(1.02); }
        .bc-svc-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: transform 0.35s ease; }
        .bc-svc-card:hover .bc-svc-icon { transform: rotate(10deg) scale(1.08); }

        /* ---------- HOW IT WORKS / TIMELINE (dark band) ---------- */
        .bc-process-band { background: #0b1220; border-radius: 22px; padding: 44px 28px 50px; position: relative; overflow: hidden; }
        [data-theme="dark"] .bc-process-band { background: var(--bc-panel-2); border: 1px solid var(--bc-line); }
        .bc-process-grid { display: grid; grid-template-columns: 1fr; gap: 34px; position: relative; }
        @media (min-width: 900px) { .bc-process-grid { grid-template-columns: repeat(4, 1fr); } }
        .bc-process-line { position: absolute; top: 26px; left: 12%; right: 12%; height: 0; border-top: 2px dashed rgba(129,140,248,0.25); display: none; }
        .bc-process-line-fill { position: absolute; top: -2px; left: 0; height: 2px; width: 0%; background: var(--bc-cyan); border-radius: 2px; transition: width 1.4s ease; }
        .bc-process-line-in .bc-process-line-fill { width: 100%; }
        @media (min-width: 900px) { .bc-process-line { display: block; } }
        .bc-process-step { text-align: center; position: relative; z-index: 1; }
        .bc-process-num { width: 52px; height: 52px; border-radius: 999px; background: #0b1220; border: 2px solid var(--bc-cyan); color: var(--bc-cyan); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        [data-theme="dark"] .bc-process-num { background: var(--bc-panel-2); }
        .bc-process-num-pulse { animation: bc-dot-pulse 0.9s ease-out 1; }
        @keyframes bc-dot-pulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--bc-cyan) 55%, transparent); } 100% { box-shadow: 0 0 0 14px color-mix(in srgb, var(--bc-cyan) 0%, transparent); } }

        /* ---------- WHY CHOOSE ROW ---------- */
        .bc-why-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
        @media (min-width: 768px) { .bc-why-row { grid-template-columns: repeat(5, 1fr); } }
        .bc-why-item { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
        .bc-why-icon { width: 42px; height: 42px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .bc-why-item:hover .bc-why-icon { transform: rotate(-12deg) scale(1.12); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        /* ---------- INDUSTRIES ROW ---------- */
        .bc-industries-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px 56px; }
        .bc-industry-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .bc-industry-icon-circle { width: 54px; height: 54px; border-radius: 999px; background: var(--bc-panel); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; box-shadow: var(--bc-shadow); transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease; }
        .bc-industry-item:hover .bc-industry-icon-circle { transform: scale(1.15); border-color: var(--bc-cyan); background: color-mix(in srgb, var(--bc-cyan) 12%, var(--bc-panel)); box-shadow: 0 12px 26px -10px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        /* ---------- FAQ ---------- */
        .bc-faq-item { border: 1px solid var(--bc-line); border-radius: 14px; background: var(--bc-panel); overflow: hidden; transition: border-color 0.2s ease; }
        .bc-faq-item + .bc-faq-item { margin-top: 12px; }
        .bc-faq-item.bc-faq-open { border-color: var(--bc-cyan); }
        .bc-faq-question { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; background: none; border: none; cursor: pointer; text-align: left; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.95rem; color: var(--bc-text); }
        .bc-faq-icon-badge { width: 28px; height: 28px; border-radius: 999px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, border-color 0.2s ease, transform 0.3s ease; }
        .bc-faq-open .bc-faq-icon-badge { background: color-mix(in srgb, var(--bc-cyan) 16%, transparent); border-color: var(--bc-cyan); transform: rotate(180deg); }
        .bc-faq-answer-wrap { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease; }
        .bc-faq-open .bc-faq-answer-wrap { max-height: 240px; opacity: 1; }
        .bc-faq-answer { padding: 0 20px 18px; font-size: 0.88rem; color: var(--bc-muted); line-height: 1.6; }

        /* ---------- CTA BANNER: subtle animated gradient ---------- */
        .bc-cta-banner { background: linear-gradient(120deg, #0b1220, #131b30, #0b1220); background-size: 220% 220%; animation: bc-cta-gradient 20s ease infinite; border-radius: 20px; color: #f1f5f9; overflow: hidden; }
        [data-theme="dark"] .bc-cta-banner { background: linear-gradient(120deg, var(--bc-panel-2), var(--bc-panel), var(--bc-panel-2)); background-size: 220% 220%; animation: bc-cta-gradient 20s ease infinite; border: 1px solid var(--bc-line); }
        @keyframes bc-cta-gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .bc-cta-inner { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 850px) { .bc-cta-inner { grid-template-columns: 0.85fr 1.15fr; } }
        .bc-cta-image { position: relative; min-height: 200px; padding: 22px; display: flex; }
        .bc-cta-image .bc-mock-terminal { width: 100%; }
        .bc-cta-btn { background: linear-gradient(90deg, #ffffff, #eef1ff, #ffffff); background-size: 220% 100%; background-position: 0% 0%; color: #0b1220; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; transition: transform 0.2s ease, filter 0.2s ease, background-position 0.6s ease; display: inline-flex; align-items: center; gap: 8px; }
        .bc-cta-btn:hover { transform: translateY(-1px) scale(1.04); filter: brightness(0.97); background-position: 100% 0%; }
        .bc-cta-btn:active { transform: scale(0.96); }
        .bc-cta-btn-outline { border: 1px solid rgba(241,245,249,0.3); color: #f1f5f9; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease; }
        .bc-cta-btn-outline:hover { border-color: rgba(241,245,249,0.6); background: rgba(255,255,255,0.06); transform: translateY(-1px) scale(1.03); }
        .bc-cta-btn-outline:active { transform: scale(0.96); }

        /* ---------- FOOTER (shared) ---------- */
       .bc-footer-card { position: relative; overflow: hidden; border-radius: 0; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
.bc-footer-decor-dots { position: absolute; bottom: 24px; right: 24px; width: 120px; height: 90px; background-image: radial-gradient(var(--bc-cyan) 1px, transparent 1px); background-size: 10px 10px; opacity: 0.25; pointer-events: none; }
.bc-footer-decor-wave { position: absolute; top: 0; right: 0; width: 45%; max-width: 420px; height: auto; opacity: 0.35; pointer-events: none; }
        .bc-footer-underline { width: 40px; height: 3px; border-radius: 2px; background: var(--bc-cyan); margin: 14px 0 18px; }
        .bc-footer-social { width: 40px; height: 40px; border-radius: 10px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.2s ease, transform 0.25s ease, box-shadow 0.25s ease; }
        .bc-footer-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px) rotate(10deg) scale(1.1); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }
        .bc-footer-col-divider { display: none; }
        @media (min-width: 768px) { .bc-footer-col-divider { display: block; width: 1px; background: var(--bc-line); align-self: stretch; } }
        .bc-footer-heading-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .bc-footer-heading-badge { width: 34px; height: 34px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); border: 1px solid color-mix(in srgb, var(--bc-cyan) 35%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-footer-heading { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.78rem; letter-spacing: 0.1em; font-weight: 700; color: var(--bc-cyan); }
        .bc-footer-item { display: flex; align-items: center; gap: 6px; color: var(--bc-muted); transition: color 0.2s ease, transform 0.2s ease; text-decoration: none; }
        .bc-footer-item:hover { color: var(--bc-text); transform: translateX(3px); }
        .bc-footer-item + .bc-footer-item { margin-top: 14px; }
        .bc-footer-contact-item { display: flex; align-items: center; gap: 10px; color: var(--bc-text); font-weight: 500; }
        .bc-footer-contact-item + .bc-footer-contact-item { margin-top: 16px; }
        .bc-footer-bottom { display: flex; align-items: center; gap: 10px; border-top: 1px solid var(--bc-line); padding-top: 20px; margin-top: 8px; color: var(--bc-muted); font-size: 0.85rem; }
        .bc-footer-bottom-badge { width: 26px; height: 26px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      `}</style>

      {/* decorative background layers */}
      <div className="bc-bg-mesh" aria-hidden="true" />
      <div className="bc-bg-noise" aria-hidden="true" />
      <div ref={cursorGlowRef} className="bc-cursor-glow" aria-hidden="true" />

      {/* scroll progress bar */}
      <div className="bc-scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* custom cursor: trailing glow ring + rotating "B" badge */}
      <div ref={cursorRingRef} className={`bc-cursor-ring ${cursorHover ? "bc-cursor-ring-hover" : ""}`} />
      <div ref={cursorBRef} className="bc-cursor-b">
        <span className={`bc-cursor-b-inner bc-display ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`}>B</span>
      </div>

      {/* LOADING SCREEN */}
      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`} aria-hidden={!loading}>
        <div className="bc-loader-brand">
          <div className="bc-loader-logo-grid">
            <span className="bc-loader-sq bc-loader-sq-a" />
            <span className="bc-loader-sq bc-loader-sq-b" />
            <span className="bc-loader-sq bc-loader-sq-b" />
            <span className="bc-loader-sq bc-loader-sq-a" />
          </div>
          <div className="bc-loader-name bc-display">Bluecode</div>
          <div className="bc-loader-label bc-mono">Loading</div>
        </div>
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
                  <Link key={j} to={sub.href} className="bc-nav-dropdown-item" onClick={() => setOpenDropdown(null)}>
                    <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                    {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={i} to={item.href} className="bc-navbar-link">
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="bc-navbar-right">
        <button onClick={toggleTheme} className="bc-navbar-theme-btn" aria-label="Toggle theme">
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <button className="bc-navbar-hamburger" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={17} />
        </button>
      </div>
    </div>
  </div>
</div>

<div className={`bc-mobile-overlay ${mobileMenuOpen ? "bc-mobile-open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
<div className={`bc-mobile-panel ${mobileMenuOpen ? "bc-mobile-open" : ""}`}>
  <div className="bc-mobile-panel-header">
    <span className="bc-navbar-name bc-display">Bluecode</span>
    <button className="bc-mobile-close" onClick={() => setMobileMenuOpen(false)}>
      <X size={17} />
    </button>
  </div>
  <div>
    {navItems.map((item, i) => (
      <div key={i}>
        {item.dropdown ? (
          <>
            <span className="bc-mobile-link" style={{ opacity: 0.6, cursor: "default" }}>{item.label}</span>
            {item.dropdown.map((sub, j) => (
              <Link key={j} to={sub.href} className="bc-mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                {sub.label}
              </Link>
            ))}
          </>
        ) : (
          <Link to={item.href} className="bc-mobile-link" onClick={() => setMobileMenuOpen(false)}>
            {item.label}
          </Link>
        )}
      </div>
    ))}
  </div>
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
                <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight mb-5 bc-hero-anim bc-hero-anim-heading">
                  One Team.
                  <br />
                  Your Entire
                  <br />
                  <span style={{ color: "var(--bc-cyan)" }}>Product Roadmap.</span>
                </h1>
                <p className="bc-body text-base md:text-lg mb-8 max-w-md bc-hero-anim bc-hero-anim-para" style={{ color: "var(--bc-muted)" }}>
                  Design, build, ship, and support — every service your product
                  needs, handled by engineers you can actually reach.
                </p>
                <div className="flex flex-wrap gap-4 mb-9 bc-hero-anim bc-hero-anim-buttons">
                  <a href="/#contact" className="group bc-btn-primary bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                    Get a quote <ArrowRight size={18} className="bc-btn-arrow" />
                  </a>
                  <a href="#service-list" className="group bc-btn-ghost bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                    Browse services <ArrowUpRight size={18} className="bc-btn-arrow" />
                  </a>
                </div>

                <div className="flex items-center gap-4 bc-hero-anim bc-hero-anim-social">
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

              {/* hero photo with float + mouse parallax + shadow transition */}
              <div className="bc-hero-photo" {...heroParallaxHandlers}>
                <div
                  className="bc-hero-photo-frame bc-cursor-hover"
                  style={{ transform: `translate(${heroParallax.x}px, ${heroParallax.y}px)` }}
                >
                  <img src={teamPhoto} alt="Bluecode team collaborating on a project" />
                </div>
                <div className="bc-hero-photo-badge bc-hero-photo-badge-code">
                  <span className="bc-scene-badge-icon"><Code2 size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Clean Code<br />Scalable</span>
                </div>
                <div className="bc-hero-photo-badge bc-hero-photo-badge-ship">
                  <span className="bc-scene-badge-icon"><Rocket size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Ship Faster<br />High Quality</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="bc-mono text-[0.68rem] tracking-widest uppercase mb-6 text-center" style={{ color: "var(--bc-muted)" }}>
              Trusted by growing teams at
            </div>
            <div className="bc-marquee">
              <div className="bc-marquee-track">
                {clientLogos.concat(clientLogos).map((name, i) => (
                  <span key={i} className="bc-logo-strip-item">{name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section id="service-list" className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div
            ref={svcRef}
            className={`bc-reveal bc-reveal-center ${svcInView ? "bc-reveal-in" : ""} text-center max-w-2xl mx-auto mb-12`}
          >
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
              <div
                key={i}
                className={`bc-svc-card bc-reveal bc-reveal-center ${svcInView ? "bc-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="bc-svc-icon" style={{ background: `${s.color}1a`, border: `1px solid ${s.color}55` }}>
                  <s.Icon size={22} color={s.color} strokeWidth={1.75} />
                </div>
                <h3 className="bc-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="bc-body text-sm mb-4" style={{ color: "var(--bc-muted)" }}>{s.desc}</p>
                <a href="/#contact" className="group bc-body font-semibold text-sm flex items-center gap-1.5" style={{ color: s.color }}>
                  Discuss this service <ArrowRight size={14} className="bc-btn-arrow" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS / TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
          <div
            ref={processRef}
            className={`bc-process-band bc-reveal bc-reveal-left ${processInView ? "bc-reveal-in" : ""} ${processInView ? "bc-process-line-in" : ""}`}
          >
            <div className="text-center mb-12">
              <div className="bc-mono bc-eyebrow mb-3" style={{ color: "var(--bc-cyan)" }}>How We Work</div>
              <h2 className="bc-display font-bold text-2xl md:text-3xl" style={{ color: "#f1f5f9" }}>
                From Brief to Launch in 4 Simple Steps
              </h2>
            </div>
            <div className="bc-process-grid">
              <div className="bc-process-line">
                <div className="bc-process-line-fill" />
              </div>
              {process.map((p, i) => (
                <div key={i} className="bc-process-step">
                  <div className={`bc-process-num ${processInView ? "bc-process-num-pulse" : ""}`} style={{ animationDelay: `${0.3 + i * 0.25}s` }}>
                    {p.step}
                  </div>
                  <h3 className="bc-display font-bold text-base mb-2" style={{ color: "#f1f5f9" }}>{p.title}</h3>
                  <p className="bc-body text-sm" style={{ color: "rgba(241,245,249,0.6)" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section style={{ background: "var(--bc-band)" }}>
          <div
            ref={showcaseRef}
            className={`bc-reveal bc-reveal-right ${showcaseInView ? "bc-reveal-in" : ""} max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center`}
          >
            <div>
              <div className="bc-eyebrow mb-3">Recent Work</div>
              <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">
                Real Products. <br /> Real Engineering.
              </h2>
              <p className="bc-body mb-6" style={{ color: "var(--bc-muted)" }}>
                See what shipping with Bluecode looks like — dashboards, portals, and
                mobile apps built for daily, production use.
              </p>
              <a href="/#projects" className="group bc-btn-ghost bc-body font-semibold px-6 py-3 rounded inline-flex items-center gap-2">
                View all projects <ArrowUpRight size={18} className="bc-btn-arrow" />
              </a>
            </div>
            <div className="bc-showcase-visual">
              <span className="bc-showcase-tag">Latest Build</span>
              <div className="bc-showcase-main">
                <DashboardMock compact={false} />
              </div>
              <div className="bc-showcase-badge bc-showcase-badge-left bc-cursor-hover">
                <span className="bc-scene-badge-icon"><CheckCircle2 size={16} color="var(--bc-cyan)" /></span>
                <span className="bc-body font-semibold text-xs leading-tight">128 Tests<br />All Passing</span>
              </div>
              <div className="bc-showcase-badge bc-showcase-badge-right bc-cursor-hover">
                <span className="bc-scene-badge-icon"><Rocket size={16} color="var(--bc-cyan)" /></span>
                <span className="bc-body font-semibold text-xs leading-tight">Deployed<br />12.4s Build</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div
            ref={whyRef}
            className={`bc-reveal bc-reveal-center ${whyInView ? "bc-reveal-in" : ""} text-center max-w-xl mx-auto mb-12`}
          >
            <div className="bc-eyebrow mb-3">Why Bluecode</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl">A studio built to be easy to work with</h2>
          </div>
          <div className="bc-why-row">
            {whyChoose.map((w, i) => (
              <div
                key={i}
                className={`bc-why-item bc-reveal bc-reveal-center ${whyInView ? "bc-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
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
          <div
            ref={industriesRef}
            className={`bc-reveal bc-reveal-left ${industriesInView ? "bc-reveal-in" : ""} max-w-7xl mx-auto px-6 py-16 md:py-20`}
          >
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
        <section
          ref={faqRef}
          className={`bc-reveal bc-reveal-center ${faqInView ? "bc-reveal-in" : ""} max-w-3xl mx-auto px-6 py-16 md:py-20`}
        >
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
        <section
          ref={ctaRef}
          className={`bc-reveal bc-reveal-right ${ctaInView ? "bc-reveal-in" : ""} max-w-7xl mx-auto px-6 pb-20 md:pb-24`}
        >
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
                  <a href="/#contact" className="group bc-cta-btn">
                    Start a Project <ArrowRight size={16} className="bc-btn-arrow" />
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
<footer ref={footerRef}>
  <div className={`w-full bc-reveal bc-reveal-center ${footerInView ? "bc-reveal-in" : ""}`}>
    <div className="bc-footer-card py-16 md:py-20 px-8 md:px-12">
      <div className="bc-footer-decor-dots" />
      <svg className="bc-footer-decor-wave" viewBox="0 0 300 160" fill="none">
        <path d="M0 40 C 60 10, 100 70, 160 40 S 260 -10, 300 30" stroke="var(--bc-cyan)" strokeWidth="1" />
        <path d="M0 70 C 60 40, 100 100, 160 70 S 260 20, 300 60" stroke="var(--bc-cyan)" strokeWidth="1" opacity="0.6" />
      </svg>
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
                    <Send size={15} color="var(--bc-cyan)" />
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

      {/* back to top */}
      <button
        className={`bc-back-to-top ${showBackToTop ? "bc-back-to-top-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ChevronDown size={20} style={{ transform: "rotate(180deg)" }} />
      </button>
    </div>
  );
}