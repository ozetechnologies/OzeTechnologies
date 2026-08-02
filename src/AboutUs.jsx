import teamMeetingImg from "./assets/team-meeting.jpg";
import loadingGif from "./assets/loading.gif";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
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

/* ---------------------------------------------------------------- */
/* ANIMATION HELPERS                                                                            */
/* Pure CSS transitions/keyframes + small React hooks — the same approach   */
/* already used in this file (CSS variables, useState/useEffect), no added  */
/* animation library.                                                                             */
/* ---------------------------------------------------------------- */

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isFinePointer() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: fine)").matches;
}

// Scroll-triggered reveal hook: fires once when the element enters the viewport.
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -64px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Fade + up (or left/right) reveal on scroll. Stagger via `delay` (ms).
function Reveal({ as: Tag = "div", delay = 0, direction = "up", className = "", style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`bc-reveal bc-reveal-${direction} ${inView ? "bc-in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Animated count-up for stat values like "40+", "99%", "5+".
function useCountUp(rawValue, active) {
  const match = String(rawValue).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(prefersReducedMotion() ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setDisplay(target);
      return;
    }
    let raf;
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [active, target]);

  return `${display}${suffix}`;
}

function AnimatedStat({ value, label, color, variant, delay = 0 }) {
  const [ref, inView] = useInView();
  const display = useCountUp(value, inView);

  if (variant === "strip") {
    return (
      <div ref={ref} className={`bc-stats-strip-item bc-reveal bc-reveal-up ${inView ? "bc-in-view" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
        <span className="bc-display text-2xl font-bold bc-count-value" style={{ color }}>{display}</span>
        <span className="text-xs opacity-70 leading-tight">{label}</span>
      </div>
    );
  }

  return (
    <div ref={ref} className={`flex flex-col gap-1 bc-reveal bc-reveal-up ${inView ? "bc-in-view" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className="bc-display text-3xl font-bold bc-count-value" style={{ color }}>{display}</span>
      <span className="text-xs opacity-75 leading-tight">{label}</span>
    </div>
  );
}

// Draws the dashed process connector left -> right once the row scrolls into view.
function ProcessConnector() {
  const [ref, inView] = useInView(0.4);
  return (
    <div ref={ref} className="bc-process-connector">
      <div className={`bc-process-connector-fill ${inView ? "bc-in-view" : ""}`} />
    </div>
  );
}

export default function AboutUs() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  // Trailing glow — the dot (cursorPos) tracks the mouse instantly, while this
  // soft blurred blob eases toward the same target for a lagging "trail" feel.
  const glowRef = useRef(null);
  const cursorTarget = useRef({ x: -200, y: -200 });
  const cursorTrail = useRef({ x: -200, y: -200 });

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

  // Navbar blur/opacity on scroll + top scroll-progress bar + back-to-top visibility.
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const max = (doc.scrollHeight || 1) - doc.clientHeight;
        setIsScrolled(scrollTop > 10);
        setScrollProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
        setShowBackToTop(scrollTop > 300);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom cursor — desktop pointer devices only, disabled under reduced motion.
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setCursorActive(true);
    const move = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      cursorTarget.current = { x: e.clientX, y: e.clientY };
    };
    const over = (e) => setCursorHover(!!e.target.closest("a, button, [role='button']"));
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  // Trailing glow animation loop — lerps toward the live cursor target each frame
  // and writes directly to the DOM node (no re-render) for a smooth, cheap trail.
  useEffect(() => {
    if (!cursorActive) return;
    let raf;
    const ease = 0.12; // lower = laggier trail, higher = snappier
    const tick = () => {
      cursorTrail.current.x += (cursorTarget.current.x - cursorTrail.current.x) * ease;
      cursorTrail.current.y += (cursorTarget.current.y - cursorTrail.current.y) * ease;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${cursorTrail.current.x}px, ${cursorTrail.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [cursorActive]);

  const handleHeroMouseMove = (e) => {
    if (prefersReducedMotion()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroParallax({ x: relX * 10, y: relY * 10 }); // clamped to ~5px via CSS scale below
  };
  const handleHeroMouseLeave = () => setHeroParallax({ x: 0, y: 0 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

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
    { value: "40+", label: "Projects Delivered", color: "#6366F1" },
    { value: "99%", label: "Client Satisfaction", color: "#38bdf8" },
    { value: "5+", label: "Years Experience", color: "#8b7ff0" },
    { value: "15+", label: "Expert Engineers", color: "#f2795a" },
  ];

  const coreValues = [
    { Icon: Target, title: "Mission Driven", desc: "We focus heavily on shipping real working business outcomes, not just lines of code.", color: "#6366F1" },
    { Icon: Award, title: "Quality Engineering", desc: "Built with production stability in mind. Senior engineering oversight on every piece.", color: "#38bdf8" },
    { Icon: Users, title: "Absolute Transparency", desc: "Weekly active sprint demos and clear communication. No vendors lock-ins, you own everything.", color: "#8b7ff0" },
    { Icon: Heart, title: "Long-Term Partnership", desc: "We remain on call long after launching to ensure software scaling runs smooth.", color: "#f2795a" },
  ];

  const whoWeArePillars = [
    { Icon: Sparkles, title: "Engineering with Purpose", desc: "We use modern engineering practices where it creates measurable value — automation, insight, and faster decisions.", color: "#6366F1" },
    { Icon: CheckCircle2, title: "Workflow-First", desc: "Every product is designed around how teams actually work, so adoption is easy and productivity improves from day one.", color: "#38bdf8" },
    { Icon: Award, title: "Built for Scale", desc: "From startups to enterprise teams, our solutions are secure, flexible, and ready to grow with your organization.", color: "#8b7ff0" },
  ];

  const processSteps = [
    { Icon: Search, title: "Discover", desc: "We understand your business, goals, and challenges in depth.", color: "#6366F1" },
    { Icon: PenTool, title: "Design", desc: "We design intuitive workflows and clean, purposeful interfaces.", color: "#38bdf8" },
    { Icon: Code2, title: "Build", desc: "We develop scalable, reliable solutions using modern technologies.", color: "#8b7ff0" },
    { Icon: TrendingUp, title: "Optimize", desc: "We continuously measure, improve, and help you achieve more.", color: "#f2795a" },
  ];

  const contactCards = [
    { Icon: Mail, label: "Email Us", value: "hello@bluecode.com" },
    { Icon: Phone, label: "Call Us", value: "+92 300 1234567" },
    { Icon: MapPin, label: "Visit Us", value: "Islamabad, Pakistan" },
  ];

  // NOTE: swap the img URLs below for your real team photos whenever you have them —
  // either replace with an import (like teamMeetingImg above) or paste your own image URL.
  const teamMembers = [
    {
      name: "Ahmed Khan",
      role: "Founder & CEO",
      bio: "Leads product strategy and client partnerships, with 8+ years building software for growing teams.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      color: "#6366F1",
    },
    {
      name: "Sara Malik",
      role: "Lead Product Designer",
      bio: "Designs intuitive interfaces from real user flows, turning complex workflows into simple experiences.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      color: "#8b7ff0",
    },
    {
      name: "Bilal Ahmad",
      role: "Head of Engineering",
      bio: "Oversees architecture and code quality across every project, from first sprint to long-term support.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      color: "#38bdf8",
    },
    {
      name: "Hina Raza",
      role: "Client Success Manager",
      bio: "Keeps every engagement on track with clear communication and weekly progress across active sprints.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      color: "#f2795a",
    },
  ];

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className={`min-h-screen w-full bc-body ${cursorActive ? "bc-custom-cursor-active" : ""}`}>
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
        .bc-body { font-family: 'Inter', sans-serif; position: relative; }
        .bc-custom-cursor-active, .bc-custom-cursor-active a, .bc-custom-cursor-active button { cursor: none; }

        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; overflow: hidden; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; display: flex; align-items: center; justify-content: center; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .bc-loader-center { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; width: max-content; }
        @media (max-width: 768px) {
  .bc-loader-center { transform: translate(-140px, -140px); }
}
        .bc-loader-mark { width: 84px; height: 84px; display: flex; align-items: center; justify-content: center; }
        .bc-loader-mark img { width: 100%; height: 100%; object-fit: contain; }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--bc-muted); }
        .bc-page-content { opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; position: relative; z-index: 1; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

        /* ---------- SCROLL PROGRESS BAR ---------- */
        .bc-scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--bc-cyan), #8b7ff0); z-index: 200; transition: width 0.1s linear; box-shadow: 0 0 8px color-mix(in srgb, var(--bc-cyan) 60%, transparent); }

        /* ---------- BACK TO TOP ---------- */
        .bc-back-to-top { position: fixed; right: 22px; bottom: 22px; width: 46px; height: 46px; border-radius: 999px; background: var(--bc-cyan); color: #fff; border: none; display: flex; align-items: center; justify-content: center; box-shadow: var(--bc-shadow-lg); cursor: pointer; z-index: 150; opacity: 0; transform: translateY(16px) scale(0.9); pointer-events: none; transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bc-back-to-top.bc-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .bc-back-to-top:hover { transform: translateY(-3px) scale(1.06); filter: brightness(1.08); }
        .bc-back-to-top:active { transform: translateY(0) scale(0.95); }

        /* ---------- CUSTOM CURSOR ---------- */
        .bc-cursor-glow {
          position: fixed; top: 0; left: 0; width: 380px; height: 380px; margin: -190px 0 0 -190px;
          border-radius: 50%; pointer-events: none; z-index: 998;
          background: radial-gradient(circle, color-mix(in srgb, var(--bc-cyan) 38%, transparent) 0%, color-mix(in srgb, var(--bc-cyan) 14%, transparent) 45%, transparent 72%);
          filter: blur(28px);
          opacity: 0.65;
          will-change: transform;
        }
        .bc-cursor-dot {
          position: fixed; top: 0; left: 0; width: 30px; height: 30px; margin: -15px 0 0 -15px;
          border-radius: 999px; background: var(--bc-cyan); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.72rem; letter-spacing: -0.01em;
          border: 1.5px solid rgba(255,255,255,0.55);
          box-shadow: 0 0 0 5px color-mix(in srgb, var(--bc-cyan) 22%, transparent),
                      0 8px 22px -6px color-mix(in srgb, var(--bc-cyan) 70%, transparent);
          z-index: 999; pointer-events: none;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, opacity 0.2s ease;
          opacity: 0.95;
        }
        .bc-cursor-dot.bc-cursor-hover {
          transform: scale(1.4);
          box-shadow: 0 0 0 8px color-mix(in srgb, var(--bc-cyan) 30%, transparent),
                      0 10px 30px -6px color-mix(in srgb, var(--bc-cyan) 85%, transparent);
        }

        /* ---------- SCROLL REVEAL ---------- */
        .bc-reveal { opacity: 0; transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); will-change: opacity, transform; }
        .bc-reveal-up { transform: translateY(40px); }
        .bc-reveal-left { transform: translate(-48px, 12px); }
        .bc-reveal-right { transform: translate(48px, 12px); }
        .bc-reveal.bc-in-view { opacity: 1; transform: none; }
        .bc-count-value { display: inline-block; font-variant-numeric: tabular-nums; }

        /* ---------- AMBIENT MESH GRADIENT + NOISE BACKGROUND ---------- */
        .bc-mesh-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .bc-mesh-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.16; will-change: transform; }
        .bc-mesh-blob-1 { width: 46vw; height: 46vw; top: -12%; left: -8%; background: var(--bc-cyan); animation: bc-mesh-drift-1 26s ease-in-out infinite; }
        .bc-mesh-blob-2 { width: 38vw; height: 38vw; bottom: -10%; right: -6%; background: #8b7ff0; animation: bc-mesh-drift-2 30s ease-in-out infinite; }
        .bc-mesh-blob-3 { width: 30vw; height: 30vw; top: 35%; left: 55%; background: var(--bc-amber); opacity: 0.08; animation: bc-mesh-drift-3 34s ease-in-out infinite; }
        @keyframes bc-mesh-drift-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(6%, 8%) scale(1.08); } }
        @keyframes bc-mesh-drift-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-7%, -5%) scale(1.1); } }
        @keyframes bc-mesh-drift-3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-5%, 6%) scale(0.94); } }
        .bc-mesh-noise { position: absolute; inset: -20%; opacity: 0.03; mix-blend-mode: overlay; background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

        /* ---------- FLOATING ---------- */
        .bc-float { animation: bc-float-kf 9s ease-in-out infinite; }
        @keyframes bc-float-kf { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }

        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); font-weight: 700; }
        .bc-btn-primary, .bc-btn-ghost { display: inline-flex; }
        .bc-btn-primary { background: linear-gradient(120deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 55%, #4338CA), var(--bc-cyan)); background-size: 220% 100%; background-position: 0% 0%; color: var(--bc-btn-primary-text); box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); transition: filter 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, background-position 0.6s ease; }
        .bc-btn-primary:hover { filter: brightness(1.06); transform: scale(1.05); box-shadow: 0 14px 28px -8px color-mix(in srgb, var(--bc-cyan) 65%, transparent); background-position: 100% 0%; }
        .bc-btn-primary:active { transform: scale(0.96); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); background: var(--bc-panel); transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(99,102,241,0.08); transform: scale(1.05); box-shadow: var(--bc-shadow); }
        .bc-btn-ghost:active { transform: scale(0.96); }
        .bc-btn-arrow { display: inline-flex; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bc-btn-primary:hover .bc-btn-arrow, .bc-btn-ghost:hover .bc-btn-arrow { transform: translateX(5px); }
        .bc-pill-badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--bc-line); background: var(--bc-panel); border-radius: 999px; padding: 7px 14px 7px 10px; font-size: 0.78rem; font-weight: 600; box-shadow: var(--bc-shadow); }

        /* ---------- NAVBAR ---------- */
        .bc-navbar-wrap { position: sticky; top: 0; z-index: 80; display: flex; justify-content: center; padding: 16px 20px 0; }
        .bc-navbar-row { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 820px; }
        .bc-navbar-pill { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; background: #0b1220; border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; padding: 10px 12px 10px 10px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25); transition: background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease; }
        .bc-navbar-pill.bc-navbar-scrolled { background: rgba(11,18,32,0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 14px 36px -10px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.32); }
        @media (min-width: 768px) { .bc-navbar-pill { padding: 6px 8px 6px 6px; gap: 6px; } }
        .bc-navbar-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; text-decoration: none; }
        .bc-navbar-logo { width: 38px; height: 38px; flex-shrink: 0; border-radius: 999px; background: var(--bc-cyan); color: #ffffff; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bc-navbar-brand:hover .bc-navbar-logo { transform: rotate(-8deg) scale(1.06); }
        .bc-navbar-name { color: #ffffff; font-weight: 700; font-size: 1rem; white-space: nowrap; }
        .bc-navbar-links { display: none; }
        @media (min-width: 768px) { .bc-navbar-links { display: flex; align-items: center; gap: 26px; padding: 0 10px; flex: 1; min-width: 0; justify-content: center; } }
        .bc-navbar-link { position: relative; color: rgba(241,245,249,0.68); font-size: 0.82rem; white-space: nowrap; text-decoration: none; transition: color 0.2s ease; flex-shrink: 0; }
        .bc-navbar-link:hover { color: #ffffff; }
        button.bc-navbar-link { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
        @media (min-width: 768px) { .bc-navbar-link { font-size: 0.88rem; } }
        .bc-navbar-link-active { color: #ffffff; }
        .bc-navbar-link-active::after { content: ''; position: absolute; left: 0; bottom: -6px; height: 2px; width: 100%; background: var(--bc-cyan); border-radius: 2px; transform-origin: center; animation: bc-underline-grow 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        @keyframes bc-underline-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
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
        .bc-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
        .bc-navbar-theme-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px) rotate(20deg) scale(1.05); }
        .bc-navbar-cta { display: none; }
        @media (min-width: 768px) { .bc-navbar-cta { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #0b1220; border-radius: 999px; padding: 9px 18px; font-weight: 600; font-size: 0.82rem; white-space: nowrap; text-decoration: none; flex-shrink: 0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), filter 0.2s ease; } .bc-navbar-cta:hover { transform: translateY(-1px) scale(1.05); filter: brightness(0.95); } .bc-navbar-cta:active { transform: scale(0.96); } }
        .bc-navbar-hamburger { display: flex; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; transition: transform 0.2s ease; }
        .bc-navbar-hamburger:hover { transform: scale(1.06); }
        @media (min-width: 768px) { .bc-navbar-hamburger { display: none; } }
        .bc-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 90; opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s ease; }
        .bc-mobile-overlay.bc-mobile-open { opacity: 1; visibility: visible; }
        .bc-mobile-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 80%; max-width: 300px; background: #0b1220; z-index: 95; padding: 26px 22px; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); overflow-y: auto; display: flex; flex-direction: column; }
        .bc-mobile-panel.bc-mobile-open { transform: translateX(0); }
        @media (min-width: 768px) { .bc-mobile-overlay, .bc-mobile-panel { display: none; } }
        .bc-mobile-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        .bc-mobile-close { width: 34px; height: 34px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: transform 0.2s ease; }
        .bc-mobile-close:hover { transform: rotate(90deg); }
        .bc-mobile-link { color: #f1f5f9; font-size: 1rem; font-weight: 600; text-decoration: none; padding: 14px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; transition: padding-left 0.2s ease; }
        .bc-mobile-link:hover { padding-left: 8px; }
        .bc-mobile-sublink { color: rgba(241,245,249,0.68); font-size: 0.88rem; text-decoration: none; padding: 10px 4px 10px 14px; display: block; }
        .bc-mobile-cta { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: var(--bc-cyan, #6366F1); color: #ffffff; border-radius: 999px; padding: 12px 20px; font-weight: 600; text-decoration: none; }

        /* ---------- HERO / ABOUT LAYOUT ---------- */
        .bc-hero-grid { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        @media (min-width: 992px) { .bc-hero-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }

        .bc-hero-image-parallax { width: 100%; transition: transform 0.2s ease-out; }
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
          transition: box-shadow 0.4s ease;
        }
        .bc-hero-image-parallax:hover .bc-hero-image-wrapper { box-shadow: 0 30px 60px -20px color-mix(in srgb, var(--bc-cyan) 40%, transparent), var(--bc-shadow-lg); }
        .bc-hero-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* ---------- BLOCKS / CARDS ---------- */
        .bc-card { position: relative; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 20px; padding: 32px; box-shadow: var(--bc-shadow); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease; }
        .bc-card:hover { transform: translateY(-10px); border-color: var(--bc-cyan); box-shadow: var(--bc-shadow-lg), 0 0 0 1px color-mix(in srgb, var(--bc-cyan) 30%, transparent), 0 0 32px -6px color-mix(in srgb, var(--bc-cyan) 45%, transparent); }
        .bc-icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #fff; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .bc-icon-box-soft { position: relative; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .bc-card:hover .bc-icon-box,
        .bc-card:hover .bc-icon-box-soft { transform: scale(1.12) rotate(-8deg); box-shadow: 0 0 26px -4px color-mix(in srgb, var(--bc-cyan) 65%, transparent); }

        /* ---------- WHO WE ARE ---------- */
        .bc-whoweare-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
        @media (min-width: 992px) { .bc-whoweare-grid { grid-template-columns: 0.85fr 1.15fr; gap: 56px; } }
        .bc-pillar-list { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .bc-pillar-list { grid-template-columns: 1fr 1fr 1fr; } }

        /* ---------- MISSION / VISION ---------- */
        .bc-mv-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .bc-mv-grid { grid-template-columns: 1fr 1fr; } }
        .bc-mv-card { background: var(--bc-band); border: 1px solid var(--bc-line); border-radius: 20px; padding: 34px; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .bc-mv-card:hover { transform: translateY(-6px); box-shadow: var(--bc-shadow); }

        /* ---------- STATS STRIP ---------- */
        .bc-stats-strip { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (min-width: 768px) { .bc-stats-strip { grid-template-columns: repeat(4, 1fr); } }
        .bc-stats-strip-item { display: flex; align-items: center; gap: 14px; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 18px 20px; box-shadow: var(--bc-shadow); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bc-stats-strip-item:hover { transform: translateY(-4px); }

        /* ---------- PROCESS / TIMELINE ---------- */
        .bc-process-grid { display: grid; grid-template-columns: 1fr; gap: 24px; position: relative; }
        @media (min-width: 900px) { .bc-process-grid { grid-template-columns: repeat(4, 1fr); } }
        .bc-process-connector { display: none; }
        @media (min-width: 900px) {
          .bc-process-connector { display: block; position: absolute; top: 40px; left: 12.5%; right: 12.5%; height: 1px; background: repeating-linear-gradient(90deg, var(--bc-line) 0 8px, transparent 8px 16px); z-index: 0; overflow: hidden; }
        }
        .bc-process-connector-fill { position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, var(--bc-cyan), #8b7ff0); transition: width 1.2s cubic-bezier(0.16,1,0.3,1); }
        .bc-process-connector-fill.bc-in-view { width: 100%; }
        .bc-process-step { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 14px; }
        .bc-process-step:hover .bc-icon-box-soft { transform: scale(1.12) rotate(-8deg); box-shadow: 0 0 26px -4px color-mix(in srgb, var(--bc-cyan) 65%, transparent); }
        .bc-process-step.bc-in-view .bc-icon-box-soft::after { content: ''; position: absolute; inset: -6px; border-radius: 16px; border: 2px solid var(--bc-cyan); animation: bc-dot-pulse 1s ease-out 0.4s 1; opacity: 0; }
        @keyframes bc-dot-pulse { 0% { transform: scale(0.7); opacity: 0.9; } 100% { transform: scale(1.35); opacity: 0; } }

        /* ---------- TEAM ---------- */
        .bc-team-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        @media (min-width: 992px) { .bc-team-grid { grid-template-columns: 0.85fr 1.15fr; gap: 48px; } }
        .bc-team-image-wrapper { border-radius: 20px; overflow: hidden; border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
        .bc-team-image { width: 100%; height: auto; display: block; object-fit: cover; }

        /* ---------- TEAM MEMBERS GRID ---------- */
        .bc-team-members-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
        @media (min-width: 640px) { .bc-team-members-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 992px) { .bc-team-members-grid { grid-template-columns: repeat(4, 1fr); } }
        .bc-team-member-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 20px; padding: 22px; box-shadow: var(--bc-shadow); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease; }
        .bc-team-member-card:hover { transform: translateY(-10px); box-shadow: var(--bc-shadow-lg), 0 0 32px -8px color-mix(in srgb, var(--bc-cyan) 40%, transparent); border-color: var(--bc-cyan); }
        .bc-team-member-photo { position: relative; width: 100%; aspect-ratio: 1 / 1; border-radius: 14px; overflow: hidden; border: 1px solid var(--bc-line); margin-bottom: 16px; }
        .bc-team-member-photo img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .bc-team-member-card:hover .bc-team-member-photo img { transform: scale(1.08); }

        /* ---------- BOTTOM CTA BANNER ---------- */
        .bc-cta-banner { border-radius: 24px; padding: 48px; background: linear-gradient(135deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 55%, #4338CA)); color: #ffffff; background-size: 200% 200%; animation: bc-cta-gradient-shift 14s ease-in-out infinite; }
        @keyframes bc-cta-gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .bc-cta-grid { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: center; }
        @media (min-width: 992px) { .bc-cta-grid { grid-template-columns: 1.1fr 0.9fr; } }
        .bc-cta-contact-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 560px) { .bc-cta-contact-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .bc-cta-contact-card { background: rgba(255,255,255,0.85); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 8px; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bc-cta-contact-card:hover { transform: translateY(-3px); }
        .bc-cta-contact-icon { width: 34px; height: 34px; border-radius: 999px; background: #1E1B4B; color: #fff; display: flex; align-items: center; justify-content: center; }

        /* ---------- REDUCED MOTION ---------- */
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .bc-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .bc-float, .bc-mesh-blob-1, .bc-mesh-blob-2, .bc-mesh-blob-3,
          .bc-cta-banner,
          .bc-card, .bc-icon-box, .bc-icon-box-soft, .bc-team-member-photo img,
          .bc-btn-primary, .bc-btn-ghost, .bc-navbar-logo, .bc-navbar-theme-btn,
          .bc-process-connector-fill, .bc-navbar-link-active::after {
            animation: none !important;
            transition: none !important;
          }
          .bc-process-step.bc-in-view .bc-icon-box-soft::after { display: none; }
          .bc-page-content { transition: none !important; opacity: 1 !important; transform: none !important; }
          .bc-hero-image-parallax { transition: none !important; }
          .bc-cursor-glow { display: none !important; }
        }
      `}</style>

      {/* Loading Screen */}
      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`}>
        <div className="bc-loader-center">
          <div className="bc-loader-mark">
            <img src={loadingGif} alt="Loading" />
          </div>
          <span className="bc-loader-label bc-mono">About Bluecode</span>
        </div>
      </div>

      {/* Ambient mesh gradient + noise background — subtle, decorative only */}
      <div className="bc-mesh-bg" aria-hidden="true">
        <span className="bc-mesh-blob bc-mesh-blob-1" />
        <span className="bc-mesh-blob bc-mesh-blob-2" />
        <span className="bc-mesh-blob bc-mesh-blob-3" />
        <span className="bc-mesh-noise" />
      </div>

      {/* Scroll progress bar */}
      <div className="bc-scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Back to top */}
      <button
        className={`bc-back-to-top ${showBackToTop ? "bc-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>

      {/* Custom cursor (desktop pointer devices only) — trailing glow sits behind the dot */}
      {cursorActive && <div ref={glowRef} className="bc-cursor-glow" aria-hidden="true" />}
      {cursorActive && (
        <div
          className={`bc-cursor-dot bc-display ${cursorHover ? "bc-cursor-hover" : ""}`}
          style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}
          aria-hidden="true"
        >
          B
        </div>
      )}

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
        {/* Navigation */}
        <header className="bc-navbar-wrap">
          <div className="bc-navbar-row">
            <div className={`bc-navbar-pill ${isScrolled ? "bc-navbar-scrolled" : ""}`}>
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
              <Reveal direction="up" className="bc-pill-badge">
                <Sparkles size={14} style={{ color: "var(--bc-cyan)" }} />
                <span>Our Story & Core Identity</span>
              </Reveal>
              <Reveal as="h1" delay={0} direction="up" className="bc-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                Driven by craft. Engineered for high performance teams.
              </Reveal>
              <Reveal as="p" delay={200} direction="up" className="text-base md:text-lg opacity-85 leading-relaxed max-w-xl">
                We are a dedicated team of senior product engineers, designers, and cloud architects who build software with extreme precision. We bypass corporate layers to bring working solutions to life faster.
              </Reveal>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[var(--bc-line)]">
                {stats.map((stat, i) => (
                  <AnimatedStat key={i} value={stat.value} label={stat.label} color={stat.color} delay={400 + i * 60} />
                ))}
              </div>
            </div>

            <div
              className="bc-hero-image-parallax"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              style={{ transform: `translate3d(${heroParallax.x}px, ${heroParallax.y}px, 0)` }}
            >
              <Reveal delay={120} direction="up" className="bc-hero-image-wrapper bc-float">
                <img
                 src={teamMeetingImg}
                  alt="Bluecode Office Team Work"
                  className="bc-hero-image"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHO WE ARE */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="bc-whoweare-grid">
            <div className="flex flex-col gap-4">
              <Reveal as="span" direction="left" className="bc-eyebrow">Who We Are</Reveal>
              <Reveal as="h2" delay={70} direction="left" className="bc-display text-3xl md:text-4xl font-bold leading-tight">
                Empowering Teams Through Thoughtful Engineering
              </Reveal>
              <Reveal as="p" delay={140} direction="left" className="text-sm md:text-base opacity-80 leading-relaxed">
                Bluecode is a product engineering studio focused on building intelligent software experiences for businesses and growing teams. We combine automation, workflow design, and user-centered interfaces to solve real operational challenges.
              </Reveal>
              <Reveal as="p" delay={200} direction="left" className="text-sm md:text-base opacity-80 leading-relaxed">
                We believe technology should feel simple, reliable, and purposeful — instead of adding complexity, we build systems that quietly remove friction from everyday work.
              </Reveal>
              <Reveal delay={260} direction="left" className="pt-2">
                <a href="/#contact" className="bc-btn-ghost px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
                  Learn More About Us <span className="bc-btn-arrow"><ArrowRight size={15} /></span>
                </a>
              </Reveal>
            </div>

            <div className="bc-pillar-list">
              {whoWeArePillars.map((p, idx) => (
                <Reveal key={idx} delay={idx * 100} direction="right" className="bc-card">
                  <div className="bc-icon-box-soft" style={{ backgroundColor: `${p.color}1a` }}>
                    <p.Icon size={22} style={{ color: p.color }} />
                  </div>
                  <h3 className="bc-display text-base font-bold mb-2">{p.title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: MISSION & VISION + STATS STRIP */}
        <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col gap-10">
          <div className="bc-mv-grid">
            <Reveal direction="left" className="bc-mv-card">
              <div className="bc-icon-box-soft" style={{ backgroundColor: "rgba(99,102,241,0.12)" }}>
                <Target size={22} style={{ color: "var(--bc-cyan)" }} />
              </div>
              <span className="bc-eyebrow">Our Mission</span>
              <h3 className="bc-display text-2xl font-bold mt-2 mb-3 leading-snug">
                To make advanced technology accessible, practical, and impactful for every organization.
              </h3>
              <p className="text-sm opacity-75 leading-relaxed">
                We are committed to building tools that empower teams to focus on strategy, creativity, and growth while automation handles the repetitive work behind the scenes.
              </p>
            </Reveal>
            <Reveal delay={100} direction="right" className="bc-mv-card">
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
            </Reveal>
          </div>

          <div className="bc-stats-strip">
            {stats.map((stat, i) => (
              <AnimatedStat key={i} value={stat.value} label={stat.label} color={stat.color} variant="strip" delay={i * 90} />
            ))}
          </div>
        </section>

        {/* SECTION 4: CORE VALUES */}
        <section className="py-16 bg-[var(--bc-panel-2)] border-t border-b border-[var(--bc-line)] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 mb-12">
              <Reveal as="span" direction="up" className="bc-eyebrow">How We Operate</Reveal>
              <Reveal as="h2" delay={70} direction="up" className="bc-display text-3xl md:text-4xl font-bold">Our Philosophy & Core Values</Reveal>
              <Reveal delay={140} direction="up" className="w-[120px] h-[2px]" style={{ background: "linear-gradient(90deg, var(--bc-cyan), transparent)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((val, idx) => (
                <Reveal key={idx} delay={idx * 90} direction={idx % 2 === 0 ? "left" : "right"} className="bc-card">
                  <div className="bc-icon-box" style={{ backgroundColor: val.color }}>
                    <val.Icon size={24} />
                  </div>
                  <h3 className="bc-display text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{val.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4.5: MEET THE TEAM */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-14 max-w-xl mx-auto">
            <Reveal as="span" direction="up" className="bc-eyebrow">Meet The Team</Reveal>
            <Reveal as="h2" delay={70} direction="up" className="bc-display text-3xl md:text-4xl font-bold">The People Behind Bluecode</Reveal>
            <Reveal as="p" delay={140} direction="up" className="text-sm opacity-75 leading-relaxed">
              A small, senior team that stays hands-on with every project from first sprint to long-term support.
            </Reveal>
          </div>

          <div className="bc-team-members-grid">
            {teamMembers.map((member, idx) => (
              <Reveal key={idx} delay={idx * 90} direction="up" className="bc-team-member-card">
                <div className="bc-team-member-photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <h3 className="bc-display text-base font-bold mb-1">{member.name}</h3>
                <span className="text-xs font-semibold mb-3 inline-block" style={{ color: member.color }}>
                  {member.role}
                </span>
                <p className="text-sm opacity-75 leading-relaxed">{member.bio}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 5: PROCESS / TIMELINE */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-14 max-w-xl mx-auto">
            <Reveal as="span" direction="up" className="bc-eyebrow">Our Process</Reveal>
            <Reveal as="h2" delay={70} direction="up" className="bc-display text-3xl md:text-4xl font-bold">A Simple, Effective Approach</Reveal>
            <Reveal as="p" delay={140} direction="up" className="text-sm opacity-75 leading-relaxed">
              We follow a proven process to deliver solutions that create real impact.
            </Reveal>
          </div>

          <div className="bc-process-grid">
            <ProcessConnector />
            {processSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 110} direction="up" className="bc-process-step">
                <div className="bc-icon-box-soft text-white" style={{ backgroundColor: step.color, boxShadow: `0 8px 20px -6px ${step.color}80` }}>
                  <step.Icon size={20} />
                </div>
                <h3 className="bc-display text-lg font-bold">{step.title}</h3>
                <p className="text-sm opacity-75 leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 6: BOTTOM CTA BANNER */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
          <Reveal direction="up" className="bc-cta-banner">
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
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{card.label}</span>
                        <span className="text-xs font-semibold text-stone-900 truncate">{card.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-start lg:justify-end items-start lg:items-center">
                <a href="/#contact" className="bc-btn-primary px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2">
                  Launch Project Sprint <span className="bc-btn-arrow"><ArrowRight size={16} /></span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}