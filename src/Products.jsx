import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Globe2,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  Sparkles,
  PackageCheck,
  Rocket,
  Mail,
  Phone,
  MapPin,
  Link2,
  MessageCircle,
} from "lucide-react";

/* ---------------------------------------------------------------------
   useReveal — same IntersectionObserver hook used on the Services page
   for "scroll into view" section animations (fade + move, alternating
   direction).
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

export default function Products() {
 const [theme, setTheme] = useState(() => localStorage.getItem("bc-theme") || "light");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // ---- animation-related state (mirrors Services page) ----
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  const cursorBRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorGlowRef = useRef(null);

  // scroll-reveal refs for each major section (alternating directions)
  const [gridRef, gridInView] = useReveal();
  const [whyRef, whyInView] = useReveal();
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

 const toggleTheme = () => {
  setTheme((t) => {
    const newTheme = t === "light" ? "dark" : "light";
    localStorage.setItem("bc-theme", newTheme);
    window.dispatchEvent(new Event("bc-theme-change"));
    return newTheme;
  });
};

  // subtle mouse parallax helper (used on hero image)
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
    { label: "Products", href: "/products", isRoute: true },
    { label: "Services", href: "/services", isRoute: true },
    {
      label: "About Us",
      dropdown: [
        { label: "Our History", desc: "How Trikonix got started", href: "/our-history" },
        { label: "Blogs", desc: "Insights from our studio", href: "/blogs" },
      ],
    },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  const categories = ["All", "IT Development", "Specialized Solutions", "Web Development", "Android Development", "Data Analytics"];

  const products = [
    { category: "IT Development", Icon: Code2, title: "Custom Software", desc: "Line-of-business systems built around how your team actually works.", color: "#6366F1" },
    { category: "Web Development", Icon: Globe2, title: "Web Applications", desc: "Fast, accessible products — from customer portals to internal dashboards.", color: "#38bdf8" },
    { category: "Android Development", Icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform apps for iOS and Android, shipped long-term.", color: "#8b7ff0" },
    { category: "Specialized Solutions", Icon: Cpu, title: "AI & LLM Integrations", desc: "Custom AI automation and chatbot builds wired into your existing stack.", color: "#f2795a" },
    { category: "Data Analytics", Icon: BarChart3, title: "Data & Analytics Platforms", desc: "Dashboards and reporting tools that turn raw data into daily decisions.", color: "#f2a93b" },
    { category: "IT Development", Icon: ShieldCheck, title: "QA & Testing", desc: "Automated and manual coverage built in from sprint one, not bolted on.", color: "#34d399" },
    { category: "Specialized Solutions", Icon: Zap, title: "Fintech Solutions", desc: "Trading products, payment flows, and compliance-ready platforms.", color: "#6366F1" },
    { category: "Web Development", Icon: Globe2, title: "E-Commerce Websites", desc: "Storefronts built to convert, with checkout flows that don't break.", color: "#38bdf8" },
    { category: "Data Analytics", Icon: BarChart3, title: "Business Intelligence", desc: "Real-time dashboards so decisions stop waiting on monthly reports.", color: "#f2a93b" },
  ];

  const filteredProducts = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const whyChoose = [
    { Icon: ShieldCheck, title: "Senior Engineers Only", desc: "No junior hand-offs, ever.", color: "#6366F1" },
    { Icon: Zap, title: "10x Faster Delivery", desc: "Working software every sprint.", color: "#f2a93b" },
    { Icon: Sparkles, title: "Fixed-Scope Pricing", desc: "A clear number before we start.", color: "#8b7ff0" },
    { Icon: Users, title: "Direct Access", desc: "Talk to engineers, not account managers.", color: "#38bdf8" },
    { Icon: PackageCheck, title: "No Vendor Lock-In", desc: "You own the code, fully.", color: "#f2795a" },
  ];

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
        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); font-weight: 700; }

        /* ---------- LOADER ---------- */
        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; display: flex; align-items: center; justify-content: center; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .bc-loader-brand { display: flex; flex-direction: column; align-items: center; }
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
        @media (max-width: 767px) {
  .bc-loader-brand {
    position: absolute;
    top: 39%;
    left: 32%;
    transform: translate(-50%, -50%);
  }
}
        .bc-page-content { position: relative; z-index: 1; opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

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
        @media (prefers-reduced-motion: reduce) { .bc-reveal { opacity: 1 !important; transform: none !important; } }

        /* ---------- BUTTONS ---------- */
        .bc-btn-primary {
          background: linear-gradient(90deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 55%, #38bdf8), var(--bc-cyan));
          background-size: 220% 100%; background-position: 0% 0%;
          color: var(--bc-btn-primary-text);
          box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent);
          transition: filter 0.2s ease, transform 0.2s ease, background-position 0.6s ease, box-shadow 0.3s ease;
        }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px) scale(1.05); background-position: 100% 0%; box-shadow: 0 14px 30px -8px color-mix(in srgb, var(--bc-cyan) 65%, transparent); }
        .bc-btn-primary:active { transform: scale(0.96); }
        .bc-btn-arrow { display: inline-block; transition: transform 0.25s ease; }
        .group:hover .bc-btn-arrow { transform: translateX(4px); }

        /* ---------- NAVBAR (shared pattern) ---------- */
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
        .bc-mobile-sublink { color: rgba(241,245,249,0.68); font-size: 0.88rem; text-decoration: none; padding: 10px 4px 10px 14px; display: block; }

        /* ---------- HERO (float + parallax + badge pop, matches Services page) ---------- */
        .bc-products-hero-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .bc-products-hero-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }
        .bc-products-hero-text { padding: 130px 6% 40px; display: flex; flex-direction: column; justify-content: center; }
        @media (min-width: 900px) { .bc-products-hero-text { padding: 0 0 0 8%; } }
        .bc-products-hero-media { position: relative; padding: 30px 6% 50px; display: flex; align-items: center; }
        @media (min-width: 900px) { .bc-products-hero-media { padding: 60px 8% 60px 0; } }

        .bc-hero-anim { opacity: 0; transform: translateY(24px); }
        .bc-page-visible .bc-hero-anim-heading { animation: bc-fade-up 0.8s ease forwards; }
        .bc-page-visible .bc-hero-anim-para { animation: bc-fade-up 0.8s ease 0.2s forwards; }
        .bc-page-visible .bc-hero-anim-buttons { animation: bc-fade-up 0.8s ease 0.4s forwards; }
        @keyframes bc-fade-up { to { opacity: 1; transform: translateY(0); } }

        .bc-hero-photo { position: relative; width: 100%; animation: bc-float 9s ease-in-out infinite; }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .bc-hero-photo-frame { border-radius: 20px; overflow: hidden; box-shadow: var(--bc-shadow-lg); border: 1px solid var(--bc-line); aspect-ratio: 4 / 3; transition: box-shadow 0.4s ease, transform 0.15s ease-out; }
        .bc-hero-photo-frame:hover { box-shadow: 0 34px 64px -18px color-mix(in srgb, var(--bc-cyan) 40%, transparent), var(--bc-shadow-lg); }
        .bc-hero-photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bc-hero-photo-badge { position: absolute; z-index: 4; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 14px; padding: 10px 14px 10px 10px; display: flex; align-items: center; gap: 9px; box-shadow: var(--bc-shadow-lg); opacity: 0; transform: scale(0.6); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-hero-photo-badge:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 16px 32px -10px color-mix(in srgb, var(--bc-cyan) 45%, transparent), var(--bc-shadow-lg); }
        .bc-page-visible .bc-hero-photo-badge-left { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.9s forwards; }
        .bc-page-visible .bc-hero-photo-badge-right { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards; }
        @keyframes bc-badge-pop { to { opacity: 1; transform: scale(1); } }
        .bc-scene-badge-icon { width: 30px; height: 30px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-hero-photo-badge-left { left: 2%; bottom: 12%; }
        .bc-hero-photo-badge-right { right: 2%; top: 10%; }
        @media (max-width: 640px) { .bc-hero-photo-badge { display: none; } }

        /* ---------- CATEGORY FILTER PILLS ---------- */
        .bc-filter-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .bc-filter-pill { border: 1px solid var(--bc-line); background: var(--bc-panel); color: var(--bc-text); border-radius: 999px; padding: 9px 18px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
        .bc-filter-pill:hover { border-color: var(--bc-cyan); transform: translateY(-1px); }
        .bc-filter-pill.bc-filter-active { background: var(--bc-cyan); color: var(--bc-btn-primary-text); border-color: var(--bc-cyan); }

        /* ---------- PRODUCT CARDS (hover lift + icon rotate, matches service cards) ---------- */
        .bc-product-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 26px; box-shadow: var(--bc-shadow); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease; }
        .bc-product-card:hover { transform: translateY(-10px); border-color: var(--bc-cyan); box-shadow: 0 24px 50px -16px color-mix(in srgb, var(--bc-cyan) 35%, transparent), var(--bc-shadow-lg); filter: brightness(1.02); }
        .bc-product-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: transform 0.35s ease; }
        .bc-product-card:hover .bc-product-icon { transform: rotate(10deg) scale(1.08); }
        .bc-product-link { display: inline-flex; align-items: center; gap: 6px; }
        .bc-product-link-arrow { transition: transform 0.25s ease; }
        .bc-product-card:hover .bc-product-link-arrow { transform: translateX(4px); }

        /* ---------- WHY CHOOSE ROW ---------- */
        .bc-why-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @media (min-width: 768px) { .bc-why-row { grid-template-columns: repeat(5, 1fr); } }
        .bc-why-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
        .bc-why-icon { width: 44px; height: 44px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .bc-why-item:hover .bc-why-icon { transform: rotate(-12deg) scale(1.12); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        /* ---------- CTA BANNER: animated gradient (matches Services page) ---------- */
        .bc-cta-banner { background: linear-gradient(120deg, #0b1220, #131b30, #0b1220); background-size: 220% 220%; animation: bc-cta-gradient 20s ease infinite; border-radius: 20px; color: #f1f5f9; padding: 40px; overflow: hidden; }
        [data-theme="dark"] .bc-cta-banner { background: linear-gradient(120deg, var(--bc-panel-2), var(--bc-panel), var(--bc-panel-2)); background-size: 220% 220%; animation: bc-cta-gradient 20s ease infinite; border: 1px solid var(--bc-line); }
        @keyframes bc-cta-gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .bc-cta-btn { background: linear-gradient(90deg, #ffffff, #eef1ff, #ffffff); background-size: 220% 100%; background-position: 0% 0%; color: #0b1220; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s ease, filter 0.2s ease, background-position 0.6s ease; }
        .bc-cta-btn:hover { transform: translateY(-1px) scale(1.04); filter: brightness(0.97); background-position: 100% 0%; }
        .bc-cta-btn:active { transform: scale(0.96); }

        /* ---------- FOOTER (shared pattern with social hover) ---------- */
        .bc-footer-card { position: relative; overflow: hidden; border-radius: 24px; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
        .bc-footer-underline { width: 40px; height: 3px; border-radius: 2px; background: var(--bc-cyan); margin: 14px 0 18px; }
        .bc-footer-social { width: 40px; height: 40px; border-radius: 10px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.2s ease, transform 0.25s ease, box-shadow 0.25s ease; }
        .bc-footer-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px) rotate(10deg) scale(1.1); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }
        .bc-footer-bottom { display: flex; align-items: center; justify-content: center; gap: 10px; border-top: 1px solid var(--bc-line); padding-top: 20px; margin-top: 20px; color: var(--bc-muted); font-size: 0.85rem; }
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
        <span className={`bc-cursor-b-inner bc-display ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`}>T</span>
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
          <div className="bc-loader-name bc-display">Trikonix</div>
          <div className="bc-loader-label bc-mono">Loading</div>
        </div>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
        {/* NAVBAR */}
        <div className="bc-navbar-wrap sticky top-0 z-50">
          <div className="bc-navbar-row">
            <div className="bc-navbar-pill">
              <Link to="/" className="bc-navbar-brand">
                <span className="bc-navbar-logo bc-display">T</span>
                <span className="bc-navbar-name bc-display">Trikonix</span>
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
                    <Link key={i} to={item.href} className={`bc-navbar-link ${item.label === "Products" ? "bc-navbar-link-active" : ""}`}>
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

        {/* MOBILE MENU */}
        <div className={`bc-mobile-overlay ${mobileMenuOpen ? "bc-mobile-open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`bc-mobile-panel ${mobileMenuOpen ? "bc-mobile-open" : ""}`}>
          <div className="bc-mobile-panel-header">
            <span className="bc-navbar-name bc-display">Trikonix</span>
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
        <section>
          <div className="bc-products-hero-grid">
            <div className="bc-products-hero-text">
              <div className="bc-eyebrow mb-2 bc-hero-anim bc-hero-anim-heading">Our Products</div>
              <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight mb-5 bc-hero-anim bc-hero-anim-heading">
                Software Built for <span style={{ color: "var(--bc-cyan)" }}>Excellence</span>
              </h1>
              <p className="bc-body text-base md:text-lg mb-8 max-w-md bc-hero-anim bc-hero-anim-para" style={{ color: "var(--bc-muted)" }}>
                From custom platforms to AI integrations, we build products designed
                for reliability, scale, and long-term performance.
              </p>
              <div className="bc-hero-anim bc-hero-anim-buttons">
                <a href="#product-grid" className="group bc-btn-primary bc-body font-semibold px-6 py-3 rounded inline-flex items-center gap-2">
                  Explore Our Products <ArrowRight size={18} className="bc-btn-arrow" />
                </a>
              </div>
            </div>

            {/* hero photo with float + mouse parallax + shadow transition */}
            <div className="bc-products-hero-media">
              <div className="bc-hero-photo" {...heroParallaxHandlers}>
                <div
                  className="bc-hero-photo-frame bc-cursor-hover"
                  style={{ transform: `translate(${heroParallax.x}px, ${heroParallax.y}px)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
                    alt="Trikonix engineering team at work"
                  />
                </div>
                <div className="bc-hero-photo-badge bc-hero-photo-badge-left">
                  <span className="bc-scene-badge-icon"><Code2 size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Clean Code<br />Scalable</span>
                </div>
                <div className="bc-hero-photo-badge bc-hero-photo-badge-right">
                  <span className="bc-scene-badge-icon"><Zap size={16} color="var(--bc-cyan)" /></span>
                  <span className="bc-body font-semibold text-xs leading-tight">Ship Faster<br />High Quality</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER + PRODUCT GRID */}
        <section id="product-grid" className="max-w-7xl mx-auto px-6 py-10 md:py-16">
          <div
            ref={gridRef}
            className={`bc-filter-row mb-12 bc-reveal bc-reveal-center ${gridInView ? "bc-reveal-in" : ""}`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`bc-filter-pill ${activeCategory === cat ? "bc-filter-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p, i) => (
              <div
                key={i}
                className={`bc-product-card bc-reveal bc-reveal-center ${gridInView ? "bc-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="bc-product-icon" style={{ background: `${p.color}1a`, border: `1px solid ${p.color}55` }}>
                  <p.Icon size={22} color={p.color} strokeWidth={1.75} />
                </div>
                <h3 className="bc-display font-bold text-lg mb-2">{p.title}</h3>
                <p className="bc-body text-sm mb-4" style={{ color: "var(--bc-muted)" }}>{p.desc}</p>
                <a href="/#contact" className="group bc-product-link bc-body font-semibold text-sm" style={{ color: p.color }}>
                  View Details <ChevronRight size={14} className="bc-product-link-arrow" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section style={{ background: "var(--bc-band)" }}>
          <div
            ref={whyRef}
            className={`bc-reveal bc-reveal-left ${whyInView ? "bc-reveal-in" : ""} max-w-7xl mx-auto px-6 py-14 md:py-16`}
          >
            <h2 className="bc-display font-bold text-2xl md:text-3xl text-center mb-10">Why Choose Our Products?</h2>
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
          </div>
        </section>

        {/* CTA */}
        <section
          ref={ctaRef}
          className={`bc-reveal bc-reveal-right ${ctaInView ? "bc-reveal-in" : ""} max-w-7xl mx-auto px-6 py-16 md:py-20`}
        >
          <div className="bc-cta-banner flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="bc-display font-semibold text-xl md:text-2xl leading-snug mb-2">
                Need Help Choosing the Right Product?
              </p>
              <p className="bc-body text-sm" style={{ color: "rgba(241,245,249,0.65)" }}>
                Our engineers are here to help you find the best fit for your needs.
              </p>
            </div>
            <a href="/#contact" className="group bc-cta-btn flex-shrink-0">
              Talk to Our Expert <ArrowRight size={16} className="bc-btn-arrow" />
            </a>
          </div>
        </section>

       
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