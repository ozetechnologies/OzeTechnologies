import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Hexagon,
  ArrowRight,
  Download,
  Palette,
  Code2,
  FolderKanban,
  CalendarDays,
  Users,
  Star,
  ExternalLink,
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Menu,
  X,
  PenTool,
  GitBranch,
  Terminal,
  Cloud,
  Layers,
  Braces,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

// lucide-react removed brand/logo icons (Github, Linkedin, Instagram, etc.)
// in recent versions, so these are simple local SVG replacements.
function Github(props) {
  const { size = 16, color = "currentColor", ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} {...rest}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
    </svg>
  );
}
function Linkedin(props) {
  const { size = 16, color = "currentColor", ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} {...rest}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
    </svg>
  );
}
function Instagram(props) {
  const { size = 16, color = "currentColor", ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" {...rest}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

/* ---------------------------------------------------------------------
   useReveal — IntersectionObserver hook, same pattern as the Services
   page: fade + move, alternating direction per section.
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

function Bar({ label, value, delay, trigger }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="pf-body text-sm font-medium" style={{ color: "var(--bc-text)" }}>{label}</span>
        <span className="pf-body text-sm font-semibold" style={{ color: "var(--bc-cyan)" }}>{value}%</span>
      </div>
      <div className="pf-bar-track">
        <div
          className="pf-bar-fill"
          style={{ width: trigger ? `${value}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [theme, setTheme] = useState("light"); // "light" | "dark" — kept in sync with landing page's system

  // ---- animation-related state (same system as the Services page) ----
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorHover, setCursorHover] = useState(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  const cursorBRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    if (!openDropdown) return;
    const closeIt = () => setOpenDropdown(null);
    window.addEventListener("click", closeIt);
    return () => window.removeEventListener("click", closeIt);
  }, [openDropdown]);

  const [statsRef, statsInView] = useReveal();
  const [skillsRef, skillsInView] = useReveal();
  const [projectsRef, projectsInView] = useReveal();
  const [journeyRef, journeyInView] = useReveal();
  const [ctaRef, ctaInView] = useReveal();
  const [footerRef, footerInView] = useReveal();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // subtle mouse parallax on hero photo, same helper shape as Services page
  const heroParallaxHandlers = {
    onMouseMove: (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setHeroParallax({ x: relX * 8, y: relY * 8 });
    },
    onMouseLeave: () => setHeroParallax({ x: 0, y: 0 }),
  };

  const stats = [
    { icon: FolderKanban, value: "34+", label: "Projects Completed" },
    { icon: CalendarDays, value: "2+", label: "Years Experience" },
    { icon: Users, value: "11+", label: "Happy Clients" },
    { icon: Star, value: "27%", label: "Repeat Clients" },
  ];

  const designSkills = [
    { label: "UI/UX Design", value: 95 },
    { label: "Figma", value: 92 },
    { label: "Wireframing", value: 90 },
    { label: "Prototyping", value: 88 },
    { label: "Design Systems", value: 85 },
  ];

  const devSkills = [
    { label: "HTML / CSS", value: 95 },
    { label: "JavaScript", value: 90 },
    { label: "React.js", value: 88 },
    { label: "Tailwind CSS", value: 90 },
    { label: "Responsive Design", value: 95 },
  ];

  const tools = [
    { label: "Figma", icon: PenTool },
    { label: "VS Code", icon: Terminal },
    { label: "React", icon: Braces },
    { label: "Tailwind CSS", icon: Layers },
    { label: "Git", icon: GitBranch },
    { label: "GitHub", icon: Github },
    { label: "Postman", icon: Send },
    { label: "Netlify", icon: Cloud },
  ];

  const projects = [
    { title: "Analytics Dashboard", desc: "A modern analytics dashboard with real-time data visualization and reports.", tag: "WEB APPLICATION", tags: ["React", "Tailwind CSS", "Chart.js"], dark: true, image: "/projects/analytics-dashboard.jpg" },
    { title: "Fintech Landing Page", desc: "A clean and conversion-focused landing page for a fintech startup.", tag: "WEB APPLICATION", tags: ["Figma", "UI/UX Design", "Prototyping"], image: "/projects/fintech-landing.jpg" },
    { title: "E-commerce Website", desc: "A fully responsive e-commerce website with product filtering and cart.", tag: "E-COMMERCE", tags: ["React", "Redux", "Tailwind CSS"], image: "/projects/ecommerce-website.jpg" },
    { title: "Task Management App", desc: "Task management app to organize projects, tasks and team workflow.", tag: "WEB APPLICATION", tags: ["React", "Firebase", "Tailwind CSS"], image: "/projects/task-management-app.jpg" },
  ];

  const journey = [
    { year: "2023 – Present", role: "UI/UX Designer & Frontend Developer", org: "Bluecode Solutions", desc: "Designing and developing modern web applications and interfaces for clients across different industries.", icon: Hexagon },
    { year: "2022 – 2023", role: "Frontend Developer", org: "Pixel Craft", desc: "Built responsive websites and collaborated with designers to bring ideas to life on the web.", icon: Code2 },
    { year: "2021 – 2022", role: "UI/UX Designer", org: "Creative Studio", desc: "Designed user interfaces, wireframes and prototypes for web and mobile applications.", icon: Palette },
  ];

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Services", href: "/services", isRoute: true },
    { label: "Products", href: "/#products" },
    { label: "Portfolio", href: "/portfolio", isRoute: true, active: true },
    {
      label: "About Us",
      dropdown: [
        { label: "Our History", desc: "How Bluecode got started", href: "/about" },
        { label: "Blogs", desc: "Insights from our studio", href: "/blogs" },
      ],
    },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  return (
    <div data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)" }} className="min-h-screen w-full">
      <style>{`
        /* Same color system as the landing page, so both pages match exactly (light + dark) */
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

        html { scroll-behavior: smooth; }
        .pf-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .pf-body { font-family: 'Inter', sans-serif; }
        .pf-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        /* ---------- PAGE LOAD: loader screen + page fade-in (same as Services) ---------- */
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
    top: 40%;
    left: 29%;
    transform: translate(-50%, -50%);
  }
}
        .bc-page-content { position: relative; z-index: 1; opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

        /* ---------- BACKGROUND: mesh gradient + noise (same as Services) ---------- */
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

        /* ---------- SCROLL PROGRESS + CUSTOM CURSOR (same as Services) ---------- */
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

        @keyframes pf-fadeInUp { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        .pf-reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; transform: translateY(24px); }
        .pf-reveal.pf-in-view { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .pf-reveal { opacity: 1; transform: none !important; transition: none !important; } }

        /* Navbar — copied exactly from the landing page's dark floating-pill navbar */
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
        .bc-navbar-link::after { content: ""; position: absolute; left: 0; bottom: -4px; width: 100%; height: 1.5px; background: var(--bc-cyan); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
        .bc-navbar-link:hover::after { transform: scaleX(1); }
        .bc-navbar-link:hover { color: #ffffff; }
        button.bc-navbar-link { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
        @media (min-width: 1024px) { .bc-navbar-link { font-size: 0.85rem; } }
        .bc-nav-dropdown-wrap { position: relative; flex-shrink: 0; }
        .bc-nav-dropdown-chevron { transition: transform 0.2s ease; }
        .bc-nav-dropdown-chevron-open, .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-chevron { transform: rotate(180deg); }
        .bc-nav-dropdown-panel { position: absolute; top: calc(100% + 16px); left: 50%; transform: translateX(-50%) translateY(6px); min-width: 220px; background: #18152A; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 8px; box-shadow: 0 20px 45px -16px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease; z-index: 70; }
        .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-panel, .bc-nav-dropdown-panel.bc-nav-dropdown-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
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

        .pf-eyebrow { letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.75rem; font-weight: 700; color: var(--bc-amber); }

        /* ---------- BUTTONS: hover scale + shadow lift, click scale (same feel as Services) ---------- */
        .pf-btn-primary { background: var(--bc-cyan); color: var(--bc-btn-primary-text); box-shadow: 0 10px 25px -10px color-mix(in srgb, var(--bc-cyan) 50%, transparent); transition: filter 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; }
        .pf-btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px) scale(1.04); box-shadow: 0 16px 34px -10px color-mix(in srgb, var(--bc-cyan) 60%, transparent); }
        .pf-btn-primary:active { transform: scale(0.96); }
        .pf-btn-ghost { border: 1px solid var(--bc-line); background: var(--bc-panel); color: var(--bc-text); transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease; }
        .pf-btn-ghost:hover { border-color: var(--bc-cyan); transform: translateY(-2px) scale(1.03); background: rgba(99,102,241,0.08); box-shadow: var(--bc-shadow-lg); }
        .pf-btn-ghost:active { transform: scale(0.96); }

        .pf-social { width: 38px; height: 38px; border-radius: 10px; background: var(--bc-panel); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; text-decoration: none; color: var(--bc-cyan); }
        .pf-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px) rotate(10deg) scale(1.08); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        /* ---------- HERO PHOTO: slow float + parallax + shadow transition (same as Services) ---------- */
        .pf-hero-photo-wrap { position: relative; animation: bc-float 9s ease-in-out infinite; }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .pf-hero-blob { position: absolute; top: 6%; right: 2%; width: 78%; height: 88%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--bc-cyan) 28%, var(--bc-panel-2)), color-mix(in srgb, var(--bc-cyan) 14%, var(--bc-panel-2))); z-index: 0; }
        .pf-hero-photo { position: relative; z-index: 1; width: 100%; border-radius: 24px; display: block; box-shadow: var(--bc-shadow-lg); transition: box-shadow 0.4s ease, transform 0.15s ease-out; }
        .pf-hero-photo-wrap:hover .pf-hero-photo { box-shadow: 0 34px 64px -18px color-mix(in srgb, var(--bc-cyan) 40%, transparent), var(--bc-shadow-lg); }
        .pf-hero-float-card { position: absolute; z-index: 2; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; box-shadow: var(--bc-shadow-lg); padding: 16px 18px; top: 12%; right: -6%; width: 190px; opacity: 0; transform: scale(0.6); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-page-visible .pf-hero-float-card { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.9s forwards; }
        @keyframes bc-badge-pop { to { opacity: 1; transform: scale(1); } }
        .pf-hero-float-card:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 16px 32px -10px color-mix(in srgb, var(--bc-cyan) 45%, transparent), var(--bc-shadow-lg); }
        @media (max-width: 767px) { .pf-hero-photo-wrap { animation: none; } .pf-hero-float-card { position: static; margin-top: 16px; width: 100%; opacity: 1; transform: none; animation: none !important; } }
        .pf-avail-dot { width: 7px; height: 7px; border-radius: 999px; background: #22C55E; display: inline-block; }

        /* hero text reveal: heading -> paragraph -> buttons -> socials, staggered (same timing as Services) */
        .pf-hero-anim { opacity: 0; transform: translateY(24px); }
        .bc-page-visible .pf-hero-anim-heading { animation: bc-fade-up 0.8s ease forwards; }
        .bc-page-visible .pf-hero-anim-para { animation: bc-fade-up 0.8s ease 0.2s forwards; }
        .bc-page-visible .pf-hero-anim-buttons { animation: bc-fade-up 0.8s ease 0.4s forwards; }
        .bc-page-visible .pf-hero-anim-social { animation: bc-fade-up 0.8s ease 0.55s forwards; }
        @keyframes bc-fade-up { to { opacity: 1; transform: translateY(0); } }

        .pf-stats-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 18px; box-shadow: var(--bc-shadow); }
        .pf-stat-icon { width: 42px; height: 42px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.35s ease; }
        .pf-stats-card:hover .pf-stat-icon { transform: rotate(10deg) scale(1.08); }

        .pf-panel { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 18px; box-shadow: var(--bc-shadow); transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .pf-panel:hover { transform: translateY(-4px); border-color: var(--bc-cyan); box-shadow: 0 20px 40px -16px color-mix(in srgb, var(--bc-cyan) 30%, transparent), var(--bc-shadow-lg); }
        .pf-panel-icon { width: 34px; height: 34px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pf-bar-track { width: 100%; height: 6px; border-radius: 999px; background: var(--bc-line-soft); overflow: hidden; }
        .pf-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, color-mix(in srgb, var(--bc-cyan) 70%, white), var(--bc-cyan)); transition: width 1s cubic-bezier(0.22,1,0.36,1); }

        .pf-tool-chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); font-size: 0.85rem; font-weight: 500; color: var(--bc-text); white-space: nowrap; transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease; }
        .pf-tool-chip:hover { border-color: var(--bc-cyan); transform: translateY(-2px); background: color-mix(in srgb, var(--bc-cyan) 10%, var(--bc-panel-2)); }

        /* ---------- PROJECT CARDS: lift + glow shadow + thumb zoom (same feel as Services svc-card) ---------- */
        .pf-project-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 18px; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .pf-project-card:hover { transform: translateY(-10px); border-color: var(--bc-cyan); box-shadow: 0 24px 50px -16px color-mix(in srgb, var(--bc-cyan) 35%, transparent), var(--bc-shadow-lg); }
        .pf-project-thumb { aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .pf-project-thumb-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .pf-project-card:hover .pf-project-thumb-img { transform: scale(1.08); }
        .pf-project-thumb-fallback { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: transform 0.5s ease; }
        .pf-project-card:hover .pf-project-thumb-fallback { transform: scale(1.08); }
        .pf-project-tag-badge { position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9); color: var(--bc-cyan); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em; padding: 4px 9px; border-radius: 999px; z-index: 2; }
        .pf-project-open { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 999px; background: #ffffff; display: flex; align-items: center; justify-content: center; color: var(--bc-cyan); z-index: 2; transition: transform 0.25s ease; }
        .pf-project-card:hover .pf-project-open { transform: rotate(45deg) scale(1.1); }
        .pf-project-chip { font-size: 0.7rem; font-weight: 500; padding: 3px 9px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); color: var(--bc-cyan); }

        .pf-timeline-line { position: absolute; left: 20px; top: 8px; bottom: 8px; width: 2px; background: var(--bc-line); }
        .pf-timeline-icon { width: 40px; height: 40px; border-radius: 999px; background: var(--bc-panel); border: 2px solid color-mix(in srgb, var(--bc-cyan) 45%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 1; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .pf-timeline-icon:hover { transform: rotate(-12deg) scale(1.12); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        /* ---------- CTA: subtle animated gradient (same as Services CTA banner) ---------- */
        .pf-cta-banner { background: linear-gradient(120deg, #18152A, #241f3a, #18152A); background-size: 220% 220%; animation: bc-cta-gradient 20s ease infinite; border-radius: 22px; }
        [data-theme="dark"] .pf-cta-banner { background: linear-gradient(120deg, var(--bc-panel-2), var(--bc-panel), var(--bc-panel-2)); background-size: 220% 220%; animation: bc-cta-gradient 20s ease infinite; border: 1px solid var(--bc-line); }
        @keyframes bc-cta-gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .pf-cta-icon { width: 56px; height: 56px; border-radius: 999px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s ease; }
        .pf-cta-banner:hover .pf-cta-icon { transform: rotate(-10deg) scale(1.08); }
        .pf-cta-btn { background: linear-gradient(90deg, #ffffff, #eef1ff, #ffffff); background-size: 220% 100%; background-position: 0% 0%; color: #18152A; border-radius: 999px; padding: 12px 24px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: transform 0.2s ease, filter 0.2s ease, background-position 0.6s ease; white-space: nowrap; }
        .pf-cta-btn:hover { transform: translateY(-2px) scale(1.04); filter: brightness(0.97); background-position: 100% 0%; }
        .pf-cta-btn:active { transform: scale(0.96); }

        .pf-footer-link { color: var(--bc-muted); font-size: 0.88rem; text-decoration: none; transition: color 0.2s ease, transform 0.2s ease; display: block; }
        .pf-footer-link:hover { color: var(--bc-cyan); transform: translateX(3px); }
        .pf-footer-link + .pf-footer-link { margin-top: 10px; }
        .pf-footer-heading { color: var(--bc-cyan); font-weight: 700; font-size: 0.85rem; margin-bottom: 16px; }
        .pf-newsletter-input { flex: 1; border: 1px solid var(--bc-line); border-radius: 10px 0 0 10px; padding: 11px 14px; font-size: 0.85rem; outline: none; background: var(--bc-panel); color: var(--bc-text); transition: border-color 0.2s ease; }
        .pf-newsletter-input:focus { border-color: var(--bc-cyan); }
        .pf-newsletter-btn { border: none; background: var(--bc-cyan); color: var(--bc-btn-primary-text); padding: 0 16px; border-radius: 0 10px 10px 0; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: filter 0.2s ease, transform 0.2s ease; }
        .pf-newsletter-btn:hover { filter: brightness(1.1); transform: scale(1.05); }

        /* ---------- BACK TO TOP (same behaviour as Services) ---------- */
        .pf-back-to-top { position: fixed; bottom: 26px; right: 26px; width: 46px; height: 46px; border-radius: 999px; background: var(--bc-cyan); color: var(--bc-btn-primary-text); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 150; box-shadow: var(--bc-shadow-lg); opacity: 0; visibility: hidden; transform: translateY(14px) scale(0.85); transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease; }
        .pf-back-to-top.pf-visible { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
        .pf-back-to-top:hover { transform: translateY(-3px) scale(1.06); }
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
        <span className={`bc-cursor-b-inner pf-display ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`}>B</span>
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
          <div className="bc-loader-name pf-display">Bluecode</div>
          <div className="bc-loader-label pf-mono">Loading</div>
        </div>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
        {/* Navbar — same dark floating pill as the landing page */}
        <div className="bc-navbar-wrap sticky top-0 z-50">
          <div className="bc-navbar-row">
            <div className="bc-navbar-pill">
              <Link to="/" className="bc-navbar-brand">
                <span className="bc-navbar-logo pf-display">B</span>
                <span className="bc-navbar-name pf-display">Bluecode</span>
              </Link>

              <nav className="bc-navbar-links pf-body">
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
                        className="bc-navbar-link bc-nav-dropdown-trigger"
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
                          <Link
                            key={j}
                            to={sub.href}
                            className="bc-nav-dropdown-item"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                            {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : item.isRoute ? (
                    <Link key={i} to={item.href} className="bc-navbar-link">
                      {item.label}
                    </Link>
                  ) : (
                    <a key={i} href={item.href} className="bc-navbar-link">
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
                <button
                  className="bc-navbar-hamburger"
                  aria-label="Open menu"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`bc-mobile-overlay ${mobileMenuOpen ? "bc-mobile-open" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className={`bc-mobile-panel ${mobileMenuOpen ? "bc-mobile-open" : ""}`}>
          <div className="bc-mobile-panel-header">
            <span className="bc-navbar-name pf-display">Bluecode</span>
            <button
              className="bc-mobile-close"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={17} />
            </button>
          </div>
          <div>
            {navItems.map((item, i) => (
              <div key={i}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="bc-mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="bc-mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="bc-mobile-link" style={{ opacity: 0.6, cursor: "default" }}>
                    {item.label}
                  </span>
                )}
                {item.dropdown &&
                  item.dropdown.map((sub, j) => (
                    <Link
                      key={j}
                      to={sub.href}
                      className="bc-mobile-sublink"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <section id="home" className="max-w-7xl mx-auto px-6 pt-14 md:pt-16 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="pf-eyebrow mb-3 pf-body">Our Portfolio</div>
            <h1 className="pf-display font-bold text-4xl md:text-5xl leading-tight mb-5 pf-hero-anim pf-hero-anim-heading">
              Turning ideas into
              <br /><span style={{ color: "var(--bc-cyan)" }}>digital experiences.</span>
            </h1>
            <p className="pf-body text-base mb-8 max-w-md pf-hero-anim pf-hero-anim-para" style={{ color: "var(--bc-muted)" }}>
              We're a team of UI/UX Designers &amp; Frontend Developers who build clean,
              user-focused and high-performing web experiences.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 pf-hero-anim pf-hero-anim-buttons">
              <a href="#projects" className="pf-btn-primary pf-body font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
                View Our Work <ArrowRight size={17} />
              </a>
              <a href="#" className="pf-btn-ghost pf-body font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
                Download CV <Download size={17} />
              </a>
            </div>
            <div className="pf-hero-anim pf-hero-anim-social">
              <div className="pf-body text-sm mb-3" style={{ color: "var(--bc-muted)" }}>Follow us on</div>
              <div className="flex gap-3">
                <a href="#" className="pf-social" aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="#" className="pf-social" aria-label="GitHub"><Github size={16} /></a>
                <a href="#" className="pf-social" aria-label="Instagram"><Instagram size={16} /></a>
                <a href="#" className="pf-social" aria-label="Behance"><Palette size={16} /></a>
              </div>
            </div>
          </div>

          <div className="pf-hero-photo-wrap bc-cursor-hover" {...heroParallaxHandlers}>
            <div className="pf-hero-blob" />
            <img
              src="/team-photo.jpg"
              alt="The Bluecode team"
              className="pf-hero-photo"
              style={{ transform: `translate(${heroParallax.x}px, ${heroParallax.y}px)` }}
            />
            <div className="pf-hero-float-card bc-cursor-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="pf-avail-dot" />
                <span className="pf-body font-semibold text-sm">Available for New Projects</span>
              </div>
              <p className="pf-body text-xs mb-3" style={{ color: "var(--bc-muted)" }}>Open to exciting opportunities.</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--bc-cyan) 14%, transparent)" }}>
                <ArrowRight size={14} color="var(--bc-cyan)" style={{ transform: "rotate(-45deg)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section ref={statsRef} className="max-w-7xl mx-auto px-6 pb-16">
          <div className={`pf-stats-card px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 pf-reveal ${statsInView ? "pf-in-view" : ""}`}>
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="pf-stat-icon">
                  <s.icon size={19} color="var(--bc-cyan)" />
                </div>
                <div>
                  <div className="pf-display font-bold text-xl">{s.value}</div>
                  <div className="pf-body text-xs" style={{ color: "var(--bc-muted)" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="services" ref={skillsRef} className="max-w-7xl mx-auto px-6 pb-20">
          <div className={`grid md:grid-cols-[0.8fr_1fr_1fr] gap-6 pf-reveal ${skillsInView ? "pf-in-view" : ""}`}>
            <div>
              <div className="pf-eyebrow mb-2 pf-body">Our Expertise</div>
              <h2 className="pf-display font-bold text-2xl md:text-3xl mb-3">Skills &amp; Tools</h2>
              <p className="pf-body text-sm mb-6" style={{ color: "var(--bc-muted)" }}>
                We design and develop modern, responsive and scalable digital
                solutions with the right tools and technologies.
              </p>
              <a href="#skills-all" className="pf-btn-ghost pf-body font-semibold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 text-sm">
                View All Skills <ArrowRight size={15} />
              </a>
            </div>
            <div className="pf-panel p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="pf-panel-icon"><Palette size={17} color="var(--bc-cyan)" /></div>
                <span className="pf-display font-semibold">Design Skills</span>
              </div>
              {designSkills.map((s, i) => (
                <Bar key={i} label={s.label} value={s.value} delay={i * 120} trigger={skillsInView} />
              ))}
            </div>
            <div className="pf-panel p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="pf-panel-icon"><Code2 size={17} color="var(--bc-cyan)" /></div>
                <span className="pf-display font-semibold">Development Skills</span>
              </div>
              {devSkills.map((s, i) => (
                <Bar key={i} label={s.label} value={s.value} delay={i * 120} trigger={skillsInView} />
              ))}
            </div>
          </div>

          <div className={`pf-panel mt-6 px-6 py-5 flex flex-wrap items-center gap-3 pf-reveal ${skillsInView ? "pf-in-view" : ""}`} style={{ transitionDelay: "150ms" }}>
            <span className="pf-body font-semibold text-sm mr-2" style={{ color: "var(--bc-text)" }}>Tools I Use</span>
            {tools.map((t, i) => (
              <span key={i} className="pf-tool-chip">
                <t.icon size={15} color="var(--bc-cyan)" /> {t.label}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="our-work" ref={projectsRef} className="max-w-7xl mx-auto px-6 pb-20">
          <div className={`flex items-end justify-between mb-8 pf-reveal ${projectsInView ? "pf-in-view" : ""}`}>
            <div>
              <div className="pf-eyebrow mb-2 pf-body">Our Work</div>
              <h2 className="pf-display font-bold text-2xl md:text-3xl">Featured Projects</h2>
            </div>
            <a href="#" className="pf-body font-semibold text-sm hidden sm:flex items-center gap-1.5" style={{ color: "var(--bc-cyan)" }}>
              View All Projects <ArrowRight size={15} />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <div
                key={i}
                className={`pf-project-card pf-reveal ${projectsInView ? "pf-in-view" : ""}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  className="pf-project-thumb"
                  style={{ background: p.dark ? "#18152A" : "linear-gradient(135deg, color-mix(in srgb, var(--bc-cyan) 20%, var(--bc-panel-2)), color-mix(in srgb, var(--bc-cyan) 35%, var(--bc-panel-2)))" }}
                >
                  <div className="pf-project-tag-badge">{p.tag}</div>
                  <div className="pf-project-open"><ExternalLink size={13} /></div>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="pf-project-thumb-img"
                      onError={(e) => {
                        // Falls back to the icon placeholder until the real screenshot is added
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="pf-project-thumb-fallback"
                    style={{ display: p.image ? "none" : "flex" }}
                  >
                    <Layers size={40} color={p.dark ? "var(--bc-cyan)" : "color-mix(in srgb, var(--bc-cyan) 70%, white)"} strokeWidth={1.3} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="pf-display font-semibold text-base mb-1.5">{p.title}</h3>
                  <p className="pf-body text-xs mb-3" style={{ color: "var(--bc-muted)" }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t, j) => (
                      <span key={j} className="pf-project-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section id="about-us" ref={journeyRef} className="max-w-7xl mx-auto px-6 pb-20">
          <div className={`grid md:grid-cols-[0.8fr_1.2fr] gap-12 pf-reveal ${journeyInView ? "pf-in-view" : ""}`}>
            <div>
              <div className="pf-eyebrow mb-2 pf-body">Experience</div>
              <h2 className="pf-display font-bold text-2xl md:text-3xl mb-3">Our Journey</h2>
              <p className="pf-body text-sm mb-6" style={{ color: "var(--bc-muted)" }}>
                A quick overview of our team's journey and the milestones we've
                reached along the way.
              </p>
              <a href="#" className="pf-btn-ghost pf-body font-semibold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 text-sm">
                Download CV <Download size={15} />
              </a>
            </div>
            <div className="relative pl-2">
              <div className="pf-timeline-line" />
              <div className="space-y-9">
                {journey.map((j, i) => (
                  <div key={i} className="flex gap-5 relative">
                    <div className="pf-timeline-icon">
                      <j.icon size={17} color="var(--bc-cyan)" />
                    </div>
                    <div className="pt-1">
                      <div className="pf-mono text-xs font-semibold mb-1" style={{ color: "var(--bc-muted)" }}>{j.year}</div>
                      <div className="pf-display font-semibold text-base">{j.role}</div>
                      <div className="pf-body text-sm font-medium mb-1.5" style={{ color: "var(--bc-cyan)" }}>{j.org}</div>
                      <p className="pf-body text-sm" style={{ color: "var(--bc-muted)" }}>{j.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" ref={ctaRef} className="max-w-7xl mx-auto px-6 pb-20">
          <div className={`pf-cta-banner px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8 pf-reveal ${ctaInView ? "pf-in-view" : ""}`}>
            <div className="flex items-center gap-5">
              <div className="pf-cta-icon"><Send size={22} color="#fff" /></div>
              <div>
                <h3 className="pf-display font-bold text-xl md:text-2xl text-white mb-1.5">
                  Let's build something<br />amazing together.
                </h3>
                <p className="pf-body text-sm" style={{ color: "color-mix(in srgb, var(--bc-cyan) 55%, white)" }}>
                  We're always open to discussing new projects and opportunities.
                </p>
              </div>
            </div>
            <a href="mailto:hello@bluecode.dev" className="pf-cta-btn">
              Let's Talk <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer ref={footerRef} style={{ borderTop: "1px solid var(--bc-line)" }}>
          <div className={`max-w-7xl mx-auto px-6 pt-14 pb-8 pf-reveal ${footerInView ? "pf-in-view" : ""}`}>
            <div className="grid md:grid-cols-[1.3fr_0.8fr_0.9fr_0.9fr_1fr] gap-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Hexagon size={22} color="var(--bc-cyan)" fill="color-mix(in srgb, var(--bc-cyan) 18%, transparent)" />
                  <span className="pf-display font-bold text-lg">Bluecode</span>
                </div>
                <p className="pf-body text-sm mb-5" style={{ color: "var(--bc-muted)" }}>
                  We build clean, user-focused digital experiences that help
                  businesses grow, innovate and lead in a digital world.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="pf-social" aria-label="LinkedIn"><Linkedin size={15} /></a>
                  <a href="#" className="pf-social" aria-label="GitHub"><Github size={15} /></a>
                  <a href="#" className="pf-social" aria-label="Instagram"><Instagram size={15} /></a>
                  <a href="#" className="pf-social" aria-label="Behance"><Palette size={15} /></a>
                </div>
              </div>

              <div>
                <div className="pf-footer-heading pf-body">Quick Links</div>
                {navItems.map((item, i) =>
                  item.dropdown ? (
                    item.dropdown.map((sub, j) => (
                      <Link key={j} to={sub.href} className="pf-footer-link pf-body">{sub.label}</Link>
                    ))
                  ) : item.isRoute ? (
                    <Link key={i} to={item.href} className="pf-footer-link pf-body">{item.label}</Link>
                  ) : (
                    <a key={i} href={item.href} className="pf-footer-link pf-body">{item.label}</a>
                  )
                )}
              </div>

              <div>
                <div className="pf-footer-heading pf-body">Services</div>
                {["UI/UX Design", "Web Development", "Frontend Development", "Responsive Design"].map((s, i) => (
                  <a key={i} href="#" className="pf-footer-link pf-body">{s}</a>
                ))}
              </div>

              <div>
                <div className="pf-footer-heading pf-body">Contact</div>
                <div className="pf-body text-sm flex items-center gap-2 mb-2.5" style={{ color: "var(--bc-muted)" }}>
                  <Mail size={14} color="var(--bc-cyan)" /> hello@bluecode.dev
                </div>
                <div className="pf-body text-sm flex items-center gap-2 mb-2.5" style={{ color: "var(--bc-muted)" }}>
                  <Phone size={14} color="var(--bc-cyan)" /> +92 312 3456789
                </div>
                <div className="pf-body text-sm flex items-center gap-2" style={{ color: "var(--bc-muted)" }}>
                  <MapPin size={14} color="var(--bc-cyan)" /> Karachi, Pakistan
                </div>
              </div>

              <div>
                <div className="pf-footer-heading pf-body">Stay Updated</div>
                <p className="pf-body text-sm mb-3" style={{ color: "var(--bc-muted)" }}>
                  Subscribe to my newsletter for the latest updates and insights.
                </p>
                {subscribed ? (
                  <p className="pf-body text-sm font-semibold" style={{ color: "var(--bc-cyan)" }}>Subscribed — thank you!</p>
                ) : (
                  <form
                    className="flex"
                    onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                  >
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="pf-newsletter-input pf-body"
                    />
                    <button type="submit" className="pf-newsletter-btn" aria-label="Subscribe">
                      <Send size={15} />
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-10 pt-6 text-center pf-body text-sm" style={{ borderTop: "1px solid var(--bc-line)", color: "var(--bc-muted)" }}>
              © 2026 Bluecode. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <button
        className={`pf-back-to-top ${showBackToTop ? "pf-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={19} />
      </button>
    </div>
  );
}