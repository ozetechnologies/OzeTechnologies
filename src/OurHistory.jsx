import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ozeIcon from "./assets/oze-icon-logo-themed.png";
import {
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Flag,
  Users,
  Rocket,
  Trophy,
  Target,
  Quote,
  Heart,
  Lightbulb,
  HandHeart,
} from "lucide-react";

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

export default function OurHistory() {
 const [theme, setTheme] = useState(() => localStorage.getItem("bc-theme") || "dark");
const [historyExpanded, setHistoryExpanded] = useState(false); // ye naya add karein
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ---- animation-related state (same system as Services / Portfolio) ----
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);

  const cursorBRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorGlowRef = useRef(null);

  const [milestone1Ref, milestone1InView] = useReveal();
  const [milestone2Ref, milestone2InView] = useReveal();
  const [milestone3Ref, milestone3InView] = useReveal();
  const [milestone4Ref, milestone4InView] = useReveal();
  const [milestone5Ref, milestone5InView] = useReveal();
  const [quoteRef, quoteInView] = useReveal();
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

  // scroll progress bar + back-to-top visibility
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY;
        const height = doc.scrollHeight - doc.clientHeight;
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

 const navItems = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Services", href: "/services", isRoute: true },
  { label: "Products", href: "/products", isRoute: true },
  { label: "Portfolio", href: "/portfolio", isRoute: true },
  {
    label: "About Us",
    dropdown: [
      { label: "Our History", desc: "How OZE Technologies got started", href: "/our-history", isRoute: true },
      { label: "Blogs", desc: "Insights from our studio", href: "/blogs", isRoute: true },
    ],
  },
  { label: "Contact", href: "/contact", isRoute: true },
];

  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      desc: "OZE Technologies started with three engineers, one laptop each, and a shared frustration with software vendors who disappeared after launch.",
      Icon: Flag,
      refHook: [milestone1Ref, milestone1InView],
      img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=900&auto=format&fit=crop",
      direction: "left",
    },
    {
      year: "2020",
      title: "Building the Foundation",
      desc: "We grew to a ten-person studio, shipped our first fintech dashboard, and set the engineering standards we still hold every project to.",
      Icon: Users,
      refHook: [milestone2Ref, milestone2InView],
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop",
      direction: "right",
    },
    {
      year: "2022",
      title: "Expanding Horizons",
      desc: "New partnerships across healthcare and logistics pushed us past 50 shipped projects, and our support-after-launch model became our signature.",
      Icon: Rocket,
      refHook: [milestone3Ref, milestone3InView],
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop",
      direction: "left",
    },
    {
      year: "2024",
      title: "Recognized for Reliability",
      desc: "Client retention hit 95%. Not from marketing, but from teams staying because the code we shipped years earlier was still running clean.",
      Icon: Trophy,
      refHook: [milestone4Ref, milestone4InView],
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
      direction: "right",
    },
    {
      year: "Today & Beyond",
      title: "Continuing the Build",
      desc: "40 engineers, 120+ projects, and the same rule we started with: we stay on call long after the invoice is paid.",
      Icon: Target,
      refHook: [milestone5Ref, milestone5InView],
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900&auto=format&fit=crop",
      direction: "left",
    },
  ];

  const pillars = [
    { Icon: Heart, title: "Our People", desc: "Our strength and inspiration", color: "#6366F1" },
    { Icon: Lightbulb, title: "Our Craft", desc: "The drive to build better software", color: "#38bdf8" },
    { Icon: HandHeart, title: "Our Word", desc: "Support that doesn't end at launch", color: "#f2795a" },
  ];

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full">
      <style>{`
        [data-theme="light"] {
          --bc-base: #FAFAF9; --bc-panel: #ffffff; --bc-panel-2: #F5F5F4; --bc-line: #E7E5E4;
          --bc-text: #1C1917; --bc-muted: #78716C; --bc-cyan: #6366F1; --bc-amber: #C2410C;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 6%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(28,25,23,0.04), 0 8px 24px -12px rgba(28,25,23,0.12);
          --bc-shadow-lg: 0 4px 6px rgba(28,25,23,0.03), 0 20px 40px -16px rgba(28,25,23,0.16);
          --bc-timeline-line: #E7E5E4;
        }
        [data-theme="dark"] {
          --bc-base: #17151F; --bc-panel: #201D2E; --bc-panel-2: #262238; --bc-line: #322C47;
          --bc-text: #F5F5F4; --bc-muted: #A8A29E; --bc-cyan: #818CF8; --bc-amber: #FB923C;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 9%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -12px rgba(0,0,0,0.45);
          --bc-shadow-lg: 0 4px 6px rgba(0,0,0,0.2), 0 20px 45px -16px rgba(0,0,0,0.55);
          --bc-timeline-line: #322C47;
        }
        html { scroll-behavior: smooth; }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }
        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); font-weight: 700; }

        /* ---------- PAGE LOAD: loader screen + page fade-in (same as Services / Portfolio) ---------- */
        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; display: flex; align-items: center; justify-content: center; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .bc-loader-brand { display: flex; flex-direction: column; align-items: center; }
        .bc-loader-mark { position: relative; width: 76px; height: 76px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
.bc-loader-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, var(--bc-cyan), transparent 65%);
  animation: bc-ring-spin 1.1s linear infinite;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
}
@keyframes bc-ring-spin { to { transform: rotate(360deg); } }
.bc-loader-pulse-icon { width: 42px; height: 42px; position: relative; z-index: 1; animation: bc-icon-pulse 1.6s ease-in-out infinite; }
@keyframes bc-icon-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.85); opacity: 0.7; } }
        .bc-loader-name { font-weight: 700; font-size: 1.05rem; color: var(--bc-text); line-height: 1.2; }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--bc-muted); margin-top: 2px; }
        @media (max-width: 767px) {
  .bc-loader-brand {
    position: absolute;
    top: 39%;
    left: 31%;
    transform: translate(-50%, -50%);
  }
}
        .bc-page-content { position: relative; z-index: 1; opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

        /* ---------- BACKGROUND: mesh gradient + noise (same as Services / Portfolio) ---------- */
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
          width: 380px; height: 380px; border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--bc-cyan) 42%, transparent) 0%, color-mix(in srgb, var(--bc-cyan) 16%, transparent) 40%, transparent 72%);
          filter: blur(10px);
          opacity: 0.8;
          mix-blend-mode: normal;
          will-change: transform;
        }
        [data-theme="dark"] .bc-cursor-glow { opacity: 0.55; }
        @media (pointer: coarse) { .bc-cursor-glow { display: none; } }

        /* ---------- SCROLL PROGRESS + CUSTOM CURSOR + BACK TO TOP (same as Services / Portfolio) ---------- */
        .bc-scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: var(--bc-cyan); z-index: 200; transition: width 0.12s linear; box-shadow: 0 0 8px color-mix(in srgb, var(--bc-cyan) 60%, transparent); }
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
        .bc-back-to-top {
          position: fixed; right: 22px; bottom: 22px; z-index: 150; width: 46px; height: 46px; border-radius: 999px;
          background: var(--bc-cyan); color: #ffffff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: var(--bc-shadow-lg); opacity: 0; transform: translateY(14px) scale(0.85); pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        [data-theme="dark"] .bc-back-to-top { color: #1E1B4B; }
        .bc-back-to-top-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .bc-back-to-top:hover { transform: translateY(-3px) scale(1.06); }

        @keyframes bc-fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bc-slideInLeft { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-slideInRight { 0% { opacity: 0; transform: translateX(40px); } 100% { opacity: 1; transform: translateX(0); } }
        .bc-reveal { opacity: 0; }
        .bc-reveal.bc-in-view { animation: bc-fadeInUp 0.8s ease-out forwards; }
        .bc-reveal-left { opacity: 0; }
        .bc-reveal-left.bc-in-view { animation: bc-slideInLeft 0.8s ease-out forwards; }
        .bc-reveal-right { opacity: 0; }
        .bc-reveal-right.bc-in-view { animation: bc-slideInRight 0.8s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .bc-reveal, .bc-reveal-left, .bc-reveal-right { opacity: 1 !important; animation: none !important; } }

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

        /* ---------- HERO (split, image right) ---------- */
        .bc-history-hero { position: relative; overflow: hidden; }
        .bc-history-hero-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .bc-history-hero-grid { grid-template-columns: 1fr 1fr; } }
        .bc-history-hero-text { padding: 130px 6% 60px; display: flex; flex-direction: column; justify-content: center; }
        @media (min-width: 900px) { .bc-history-hero-text { padding: 0 5% 0 8%; } }
        .bc-history-hero-media { position: relative; padding: 40px 6% 60px; display: flex; align-items: center; animation: bc-float 9s ease-in-out infinite; }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @media (min-width: 900px) { .bc-history-hero-media { padding: 60px 8% 60px 0; } }
        @media (max-width: 767px) { .bc-history-hero-media { animation: none; } }
        .bc-history-hero-media img { width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; display: block; border-radius: 20px; box-shadow: var(--bc-shadow-lg); border: 1px solid var(--bc-line); transition: box-shadow 0.4s ease, transform 0.4s ease; }
        .bc-history-hero-media:hover img { box-shadow: 0 34px 64px -18px color-mix(in srgb, var(--bc-cyan) 40%, transparent), var(--bc-shadow-lg); transform: scale(1.015); }
        .bc-history-underline { width: 64px; height: 4px; border-radius: 2px; background: var(--bc-cyan); margin: 18px 0 22px; }

        /* ---------- TIMELINE ---------- */
        .bc-timeline { position: relative; max-width: 1100px; margin: 0 auto; padding: 0 6%; }
        .bc-timeline-spine { display: none; }
        @media (min-width: 768px) {
          .bc-timeline-spine { display: block; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--bc-timeline-line); transform: translateX(-50%); z-index: 0; }
        }
        .bc-milestone { position: relative; display: grid; grid-template-columns: 1fr; gap: 22px; align-items: center; padding: 40px 0; z-index: 1; }
        @media (min-width: 768px) { .bc-milestone { grid-template-columns: 1fr 90px 1fr; gap: 0; } }
        .bc-milestone-media { border-radius: 16px; overflow: hidden; border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow); aspect-ratio: 16/10; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .bc-milestone-media:hover { transform: translateY(-6px); border-color: var(--bc-cyan); box-shadow: 0 20px 40px -16px color-mix(in srgb, var(--bc-cyan) 35%, transparent), var(--bc-shadow-lg); }
        .bc-milestone-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .bc-milestone-media:hover img { transform: scale(1.08); }
        .bc-milestone-content { padding: 0 4px; }
        @media (min-width: 768px) { .bc-milestone-content.bc-order-left { padding-right: 30px; text-align: right; } .bc-milestone-content.bc-order-right { padding-left: 30px; } }
        .bc-milestone-year { font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 1.4rem; color: var(--bc-cyan); margin-bottom: 6px; }
        .bc-milestone-node { display: none; }
        @media (min-width: 768px) {
          .bc-milestone-node { display: flex; align-items: center; justify-content: center; width: 62px; height: 62px; border-radius: 999px; background: var(--bc-cyan); color: #fff; margin: 0 auto; box-shadow: 0 10px 24px -8px color-mix(in srgb, var(--bc-cyan) 65%, transparent); border: 4px solid var(--bc-base); position: relative; z-index: 2; transition: transform 0.35s ease, box-shadow 0.35s ease; }
          .bc-milestone:hover .bc-milestone-node { transform: rotate(-12deg) scale(1.12); box-shadow: 0 14px 30px -8px color-mix(in srgb, var(--bc-cyan) 70%, transparent); }
        }
        .bc-milestone-node-mobile { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 999px; background: var(--bc-cyan); color: #fff; margin-bottom: 14px; box-shadow: var(--bc-shadow); }
        @media (min-width: 768px) { .bc-milestone-node-mobile { display: none; } }

        /* order swap on desktop so media/text alternate sides visually via order */
        @media (min-width: 768px) {
          .bc-milestone-media.bc-order-media-right { order: 3; }
          .bc-milestone-media.bc-order-media-left { order: 1; }
          .bc-milestone-node { order: 2; }
          .bc-milestone-content.bc-order-left { order: 1; }
          .bc-milestone-content.bc-order-right { order: 3; }
        }

        /* ---------- QUOTE / PILLARS BAND ---------- */
        .bc-quote-band { border-radius: 20px; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow); padding: 36px 32px; display: flex; flex-direction: column; gap: 30px; transition: box-shadow 0.3s ease, border-color 0.3s ease; }
        .bc-quote-band:hover { border-color: var(--bc-cyan); box-shadow: 0 20px 40px -16px color-mix(in srgb, var(--bc-cyan) 25%, transparent), var(--bc-shadow-lg); }
        @media (min-width: 900px) { .bc-quote-band { flex-direction: row; align-items: center; justify-content: space-between; gap: 40px; } }
        .bc-quote-mark { color: var(--bc-cyan); flex-shrink: 0; }
        .bc-pillars-row { display: flex; gap: 28px; flex-wrap: wrap; }
        .bc-pillar-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; min-width: 110px; }
        .bc-pillar-icon { width: 40px; height: 40px; border-radius: 999px; display: flex; align-items: center; justify-content: center; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .bc-pillar-item:hover .bc-pillar-icon { transform: rotate(10deg) scale(1.12); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        /* ---------- FOOTER ---------- */
        .bc-footer-card { position: relative; overflow: hidden; border-radius: 24px; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
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
        <span className={`bc-cursor-b-inner bc-display ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`}>O</span>
      </div>

      {/* LOADING SCREEN */}
      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`} aria-hidden={!loading}>
        <div className="bc-loader-brand">
        <div className="bc-loader-mark">
  <div className="bc-loader-ring" />
  <img src={ozeIcon} alt="Loading" className="bc-loader-pulse-icon" />
</div>
          <div className="bc-loader-name bc-display">OZE Technologies</div>
          <div className="bc-loader-label bc-mono">Loading</div>
        </div>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
        {/* NAVBAR */}
<Navbar theme={theme} toggleTheme={toggleTheme} active="about" />

        {/* HERO */}
        <section className="bc-history-hero">
          <div className="bc-history-hero-grid">
            <div className="bc-history-hero-text">
              <div className={`bc-reveal ${!loading ? "bc-in-view" : ""}`}>
                <div className="bc-eyebrow mb-2">Our Story</div>
                <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight">Our History</h1>
                <div className="bc-history-underline" />
                <p className="bc-body text-base md:text-lg font-semibold mb-3">
                  Built on Craft, Driven by People
                </p>
                <p className="bc-body text-sm md:text-base max-w-md leading-relaxed" style={{ color: "var(--bc-muted)" }}>
  Every project we've shipped started as a small, specific problem someone
  needed solved properly. Here's how that grew into a studio 120+ projects deep.
</p>

<div
  style={{
    maxHeight: historyExpanded ? "300px" : "0px",
    overflow: "hidden",
    transition: "max-height 0.5s ease",
  }}
>
  <p className="bc-body text-sm md:text-base max-w-md leading-relaxed mt-3" style={{ color: "var(--bc-muted)" }}>
    Along the way we learned that reliability matters more than speed alone —
    clients don't just want software delivered, they want it to still be running
    cleanly a year later. That's why every engagement includes support well
    past launch day. Today that philosophy shapes every team we build and every
    line of code we ship.
  </p>
</div>

<button
  onClick={() => setHistoryExpanded((v) => !v)}
  className="bc-body font-semibold text-sm mt-4 flex items-center gap-1.5 bc-cursor-hover"
  style={{
    color: "#fff",
    background: "var(--bc-cyan)",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
  }}
>
  {historyExpanded ? "Read Less" : "Read More"}
  <ChevronDown
    size={16}
    style={{ transform: historyExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
  />
</button>
              </div>
            </div>
            <div className="bc-history-hero-media bc-cursor-hover">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop"
                alt="OZE Technologies's office"
              />
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-16 md:py-20">
          <div className="bc-timeline">
            <div className="bc-timeline-spine" />
            {milestones.map((m, i) => {
              const [ref, inView] = m.refHook;
              const isLeftText = m.direction === "left";
              return (
                <div key={i} ref={ref} className="bc-milestone">
                  <div className={`bc-milestone-media bc-cursor-hover ${isLeftText ? "bc-order-media-right" : "bc-order-media-left"} ${isLeftText ? "bc-reveal-right" : "bc-reveal-left"} ${inView ? "bc-in-view" : ""}`}>
                    <img src={m.img} alt={m.title} />
                  </div>

                  <div className="bc-milestone-node">
                    <m.Icon size={24} />
                  </div>

                  <div className={`bc-milestone-content ${isLeftText ? "bc-order-left" : "bc-order-right"} ${isLeftText ? "bc-reveal-left" : "bc-reveal-right"} ${inView ? "bc-in-view" : ""}`}>
                    <div className="bc-milestone-node-mobile">
                      <m.Icon size={20} />
                    </div>
                    <div className="bc-milestone-year">{m.year}</div>
                    <h3 className="bc-display font-bold text-xl mb-2">{m.title}</h3>
                    <p className="bc-body text-sm leading-relaxed" style={{ color: "var(--bc-muted)" }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* QUOTE + PILLARS */}
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
          <div ref={quoteRef} className={`bc-quote-band bc-reveal ${quoteInView ? "bc-in-view" : ""}`}>
            <div className="flex items-start gap-4">
              <Quote size={30} className="bc-quote-mark" fill="var(--bc-cyan)" strokeWidth={0} />
              <p className="bc-body text-base md:text-lg leading-relaxed max-w-lg">
                Our history isn't just where we've been — it's the standard we hold every
                new project to.
              </p>
            </div>
            <div className="bc-pillars-row">
              {pillars.map((p, i) => (
                <div key={i} className="bc-pillar-item">
                  <div className="bc-pillar-icon" style={{ background: `${p.color}1a`, border: `1px solid ${p.color}55` }}>
                    <p.Icon size={18} color={p.color} />
                  </div>
                  <div className="bc-body font-semibold text-sm">{p.title}</div>
                  <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>{p.desc}</div>
                </div>
              ))}
            </div>
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