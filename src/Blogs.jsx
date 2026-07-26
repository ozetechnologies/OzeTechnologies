import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, Clock, ArrowUpRight, Mail, Sparkles, LayoutGrid, CheckCircle,
  Code2, Layers, Smartphone, Menu, X, Sun, Moon, ChevronDown, BookOpen, TrendingUp, Users, ArrowUp
} from "lucide-react";

const LATEST_POSTS = [
  {
    id: 1,
    category: "Productivity",
    title: "10 Productivity Tips That Actually Work",
    date: "May 20, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600"
  },
  {
    id: 2,
    category: "Business",
    title: "Building Stronger Teams in a Hybrid World",
    date: "May 18, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600"
  },
  {
    id: 3,
    category: "Design",
    title: "Minimal Design, Maximum Impact",
    date: "May 15, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600"
  }
];

const CATEGORIES = [
  { name: "Business", count: "12 Articles", icon: LayoutGrid },
  { name: "Design", count: "18 Articles", icon: Sparkles },
  { name: "Technology", count: "22 Articles", icon: Code2 },
  { name: "Marketing", count: "15 Articles", icon: Layers },
  { name: "Productivity", count: "10 Articles", icon: Smartphone }
];

/* =========================================================
   ANIMATION HELPERS
   ========================================================= */

// Scroll-reveal wrapper — fades/slides an element in once it enters the viewport.
// direction: "up" | "left" | "right" | "center"
function Reveal({ children, direction = "up", delay = 0, duration = 0.8, className = "", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hiddenTransforms = {
    up: "translateY(40px)",
    left: "translateX(-48px)",
    right: "translateX(48px)",
    center: "scale(0.94)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0) scale(1)" : hiddenTransforms[direction],
        transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Mouse-parallax hook — returns a small x/y offset based on cursor position within a container.
function useParallax(strength = 4) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: px * strength * 2, y: py * strength * 2 });
    };
    const handleLeave = () => setOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return [ref, offset];
}

export default function Blogs() {
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // --- animation-related state ---
  const [scrolled, setScrolled] = useState(false);       // navbar blur/opacity on scroll
  const [scrollPct, setScrollPct] = useState(0);          // top progress bar
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const [heroImgRef, heroImgOffset] = useParallax(5);

  // Still set data-theme / .dark on <html> in case other parts of the app rely on it
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Smooth native scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Trigger hero reveal shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Scroll listener: navbar state, progress bar, back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShowBackToTop(y > 300);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom cursor tracking (desktop only — hidden on touch via CSS)
  const cursorTargetRef = useRef({ x: -100, y: -100 });
  const [shadowPos, setShadowPos] = useState({ x: -100, y: -100 }); // soft blurred glow — trails behind with lag

  useEffect(() => {
    const move = (e) => {
      cursorTargetRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const overCheck = (e) => {
      const el = e.target.closest("a, button, input");
      setCursorHover(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overCheck);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overCheck);
    };
  }, []);

  // Smoothly lerp the blurred shadow toward the cursor for a soft trailing effect
  useEffect(() => {
    let raf;
    const tick = () => {
      setShadowPos((prev) => {
        const target = cursorTargetRef.current;
        const ease = 0.12;
        return {
          x: prev.x + (target.x - prev.x) * ease,
          y: prev.y + (target.y - prev.y) * ease,
        };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const isDark = theme === "dark";

  // ---------------------------------------------------------
  // SELF-CONTAINED THEME PALETTE (no external CSS dependency)
  // ---------------------------------------------------------
  const c = {
    pageBg: isDark ? "#17151F" : "#FAFAF9",
    pageText: isDark ? "#F5F5F4" : "#1C1917",

    navBg: "#18152A",
    navBorder: isDark ? "1px solid rgba(99, 102, 241, 0.6)" : "1px solid #332D55",
    navText: "text-stone-300",
    navTextHover: "hover:text-white",

    dropdownBg: "#18152A",
    dropdownBorder: isDark ? "border-indigo-500/40" : "border-stone-800",
    dropdownText: "text-stone-300",
    dropdownHover: "hover:bg-white/5",

    toggleBtnBg: "#201D2E",
    toggleBtnBorder: "border-stone-800",

    heroBg: "linear-gradient(135deg, #120F1C 0%, #1E1B32 100%)",
    heroBorder: isDark ? "rgba(99, 102, 241, 0.5)" : "#332D55",
    heroHeading: "#ffffff",
    heroSub: "#D6D3D1",
    heroImgBorder: "border-stone-800",

    cardBg: isDark ? "#201D2E" : "#ffffff",
    cardBorder: isDark ? "#322C47" : "#E7E5E4",
    text: isDark ? "#F5F5F4" : "#1C1917",
    muted: isDark ? "#A8A29E" : "#78716C",
    line: isDark ? "#322C47" : "#E7E5E4",

    newsletterBg: isDark ? "#201D2E" : "#ffffff",
    newsletterBorder: isDark ? "border-stone-800" : "border-stone-200",
    inputBg: isDark ? "#2A2539" : "#F5F5F4",
    inputBorder: isDark ? "border-stone-800" : "border-stone-300",
    inputText: isDark ? "text-white" : "text-stone-900",
    placeholder: isDark ? "placeholder-stone-500" : "placeholder-stone-400",

    iconCircleBg: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    iconCircleIcon: "#ffffff",
  };

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    {
      label: "Products",
      dropdown: [
        { label: "IT Development", href: "#products" },
        { label: "Specialized Solutions", href: "#products" },
        { label: "View all products", href: "#products" }
      ]
    },
    {
      label: "Projects",
      dropdown: [
        { label: "Fintech", href: "#projects" },
        { label: "Healthcare", href: "#projects" },
        { label: "E-commerce", href: "#projects" },
        { label: "View all projects", href: "#projects" }
      ]
    },
    { label: "Services", href: "/services", isRoute: true },
    { label: "Blogs", href: "/blogs", isRoute: true },
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  return (
    <div
      className="w-full min-h-screen transition-colors duration-500 ease-in-out relative"
      style={{ background: c.pageBg, color: c.pageText }}
    >
      {/* ==========================================
          GLOBAL ANIMATION STYLES
         ========================================== */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85) translateY(10px); }
          70%  { opacity: 1; transform: scale(1.03) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseDot {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes meshMove {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(4%, -3%) scale(1.08); }
          100% { transform: translate(0,0) scale(1); }
        }

        .hero-fade-up { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
        .hero-loaded .hero-fade-up { animation-play-state: running; }

        .float-slow { animation: floatY 9s ease-in-out infinite; }
        .pop-on-load { animation: popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }
        .dot-pulse { animation: pulseDot 2.2s ease-out infinite; }

        .btn-anim {
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
          background-size: 200% 200%;
        }
        .btn-anim:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 28px -8px rgba(99,102,241,0.55);
          animation: gradientShift 2.5s ease infinite;
        }
        .btn-anim:active { transform: scale(0.96); }
        .btn-arrow { transition: transform 0.3s ease; }
        .btn-anim:hover .btn-arrow { transform: translateX(4px); }

        .card-hover-glow {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
        }
        .card-hover-glow:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 46px -18px rgba(99,102,241,0.4);
          border-color: rgba(99,102,241,0.55) !important;
        }

        .img-zoom { transition: transform 0.5s ease; }
        .card-hover-glow:hover .img-zoom { transform: scale(1.06); }

        .cat-icon-circle {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background-color 0.35s ease;
        }
        .cat-card:hover .cat-icon-circle {
          transform: scale(1.15) rotate(8deg);
          box-shadow: 0 0 0 6px rgba(99,102,241,0.14), 0 0 22px rgba(99,102,241,0.4);
        }

        .navbar-scrolled {
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .nav-link { position: relative; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -4px;
          width: 0%;
          height: 1.5px;
          background: #6366F1;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .mesh-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
          pointer-events: none;
          animation: meshMove 26s ease-in-out infinite;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        .cursor-shadow {
          position: fixed;
          top: 0; left: 0;
          width: 420px; height: 420px;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(180,150,255,0.85) 0%, rgba(167,139,250,0.6) 35%, rgba(216,180,190,0.3) 60%, rgba(216,180,190,0) 78%);
          filter: blur(20px);
          transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        }

        .cursor-badge {
          position: fixed;
          top: 0; left: 0;
          width: 30px; height: 30px;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          background: #6366F1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 700;
          font-size: 12px;
          box-shadow: 0 0 0 6px rgba(99,102,241,0.18), 0 4px 18px rgba(99,102,241,0.55);
          transition: width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
        }

        @media (pointer: coarse) {
          .cursor-shadow, .cursor-badge { display: none; }
        }

        .back-to-top-btn {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, box-shadow 0.3s ease;
        }
        .back-to-top-btn:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 14px 30px -10px rgba(99,102,241,0.6);
        }
      `}</style>

      {/* Custom cursor: soft blurred shadow trailing behind + "B" badge on top, exact position */}
      <div
        className="cursor-shadow hidden md:block"
        style={{
          left: shadowPos.x,
          top: shadowPos.y,
          width: cursorHover ? 560 : 420,
          height: cursorHover ? 560 : 420,
          opacity: cursorHover ? 1 : 0.85,
        }}
      />
      <div
        className="cursor-badge hidden md:flex"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: cursorHover ? 38 : 30,
          height: cursorHover ? 38 : 30,
          fontSize: cursorHover ? 13 : 12,
        }}
      >
        B
      </div>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] bg-[#6366F1] transition-[width] duration-150 ease-out"
        style={{ width: `${scrollPct}%`, boxShadow: "0 0 8px rgba(99,102,241,0.7)" }}
      />

      {/* ==========================================
          PILL NAVBAR
         ========================================== */}
      <header className="w-full sticky top-0 z-50 px-4 md:px-8 pt-4">
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 rounded-full shadow-xl transition-all duration-500 ease-in-out ${scrolled ? "navbar-scrolled" : ""}`}
          style={{
            background: scrolled ? "rgba(24,21,42,0.85)" : c.navBg,
            color: "#ffffff",
            border: c.navBorder,
            boxShadow: scrolled ? "0 8px 30px -10px rgba(0,0,0,0.5)" : undefined,
          }}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold text-base shadow-sm transition-transform duration-300 group-hover:scale-110">
              B
            </span>
            <span className="font-bold tracking-wide text-lg" style={{ color: "#ffffff" }}>
              Bluecode
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) =>
              item.dropdown ? (
                <div
                  key={i}
                  className="relative cursor-pointer py-1"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`nav-link text-[14px] font-medium ${c.navText} ${c.navTextHover} flex items-center gap-1 transition-colors duration-300`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="opacity-70 transition-transform duration-300"
                      style={{ transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-48 rounded-xl p-2 shadow-2xl flex flex-col gap-1 z-50"
                      style={{
                        background: c.dropdownBg,
                        border: isDark ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid #332D55",
                        animation: "fadeUp 0.25s ease forwards",
                      }}
                    >
                      {item.dropdown.map((sub, si) => (
                        <a
                          key={si}
                          href={sub.href}
                          className={`px-3 py-2 text-xs ${c.dropdownText} ${c.navTextHover} rounded-lg ${c.dropdownHover} transition-colors duration-300 block text-left`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  to={item.href}
                  className={`nav-link text-[14px] font-medium ${c.navText} ${c.navTextHover} transition-colors duration-300`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full border ${c.toggleBtnBorder} flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300 text-[#6366F1]`}
              style={{ background: c.toggleBtnBg }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="transition-transform duration-500 ease-in-out" style={{ transform: isDark ? "rotate(0deg)" : "rotate(180deg)" }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${c.navText} ${c.navTextHover} transition-colors duration-300`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 p-6 flex flex-col gap-4 w-64 right-0 top-0 bottom-0"
          style={{ background: c.navBg, color: "#ffffff", borderLeft: c.navBorder, animation: "fadeUp 0.3s ease forwards" }}
        >
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <span className="font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto mt-2">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.isRoute ? item.href : "#"}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 ${c.navText} transition-colors duration-300`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          1. DYNAMIC HERO SECTION
         ========================================== */}
      <section
        className={`relative w-full overflow-hidden py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 transition-all duration-500 ease-in-out ${heroLoaded ? "hero-loaded" : ""}`}
        style={{
          background: c.heroBg,
          borderTop: isDark ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid #332D55",
          borderBottom: isDark ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid #332D55",
          boxShadow: isDark ? "0 0 60px -20px rgba(99, 102, 241, 0.25) inset" : "none",
        }}
      >
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Subtle animated mesh gradient blobs */}
        <div className="mesh-blob w-96 h-96 top-[-10%] right-[-5%]" style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", opacity: 0.22 }} />
        <div className="mesh-blob w-72 h-72 bottom-[-10%] left-[-5%]" style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 70%)", opacity: 0.16, animationDelay: "4s" }} />
        <div className="noise-overlay" />

        <div className="relative z-10 max-w-xl flex-1">
          <span className="hero-fade-up font-bold text-sm uppercase tracking-widest block mb-4 text-[#6366F1]" style={{ animationDelay: "0s" }}>
            OUR BLOG
          </span>
          <h1
            className="hero-fade-up text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
            style={{ color: c.heroHeading, animationDelay: "0s", animationDuration: "0.8s" }}
          >
            Ideas.<br />
            Insights.<br />
            <span className="text-[#6366F1]">Inspiration.</span>
          </h1>
          <p
            className="hero-fade-up text-base md:text-lg mb-8 max-w-md opacity-90 leading-relaxed"
            style={{ color: c.heroSub, animationDelay: "0.2s" }}
          >
            Explore articles, guides, and stories to fuel ideas and drive success in modern engineering realms.
          </p>

          <div className="hero-fade-up flex items-center gap-6 mb-8" style={{ animationDelay: "0.3s" }}>
            <div>
              <div className="text-2xl font-extrabold" style={{ color: c.heroHeading }}>50+</div>
              <div className="text-xs uppercase tracking-wide" style={{ color: c.heroSub }}>Articles</div>
            </div>
            <div className="w-px h-8" style={{ background: isDark ? "rgba(168,162,158,0.3)" : "#D6D3D1" }} />
            <div>
              <div className="text-2xl font-extrabold" style={{ color: c.heroHeading }}>10k+</div>
              <div className="text-xs uppercase tracking-wide" style={{ color: c.heroSub }}>Readers</div>
            </div>
            <div className="w-px h-8" style={{ background: isDark ? "rgba(168,162,158,0.3)" : "#D6D3D1" }} />
            <div>
              <div className="text-2xl font-extrabold" style={{ color: c.heroHeading }}>Weekly</div>
              <div className="text-xs uppercase tracking-wide" style={{ color: c.heroSub }}>New Posts</div>
            </div>
          </div>

          <button
            className="hero-fade-up btn-anim group bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm shadow-md"
            style={{ animationDelay: "0.4s", backgroundImage: "linear-gradient(90deg,#6366F1,#4F46E5,#6366F1)" }}
          >
            Explore Articles <ArrowUpRight size={16} className="btn-arrow" />
          </button>
        </div>

        <div ref={heroImgRef} className="relative z-10 flex-1 w-full max-w-xl">
          <div
            className={`float-slow aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border ${c.heroImgBorder}`}
            style={{
              transform: `translate(${heroImgOffset.x}px, ${heroImgOffset.y}px)`,
              transition: "transform 0.2s ease-out, box-shadow 0.4s ease",
              boxShadow: "0 30px 60px -20px rgba(99,102,241,0.35)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=800"
              alt="Modern Office Setup"
              className="w-full h-full object-cover brightness-95"
            />
          </div>

          <div
            className="pop-on-load hidden lg:block absolute z-20 w-64 -left-10 bottom-8 rounded-2xl shadow-2xl p-5"
            style={{
              background: isDark ? "#0b1329" : "#ffffff",
              border: isDark ? "1px solid rgba(99,102,241,0.4)" : "1px solid #E7E5E4",
              animationDelay: "0.6s",
            }}
          >
            <div className="flex items-start gap-3 pb-3 mb-3 border-b" style={{ borderColor: isDark ? "rgba(168,162,158,0.15)" : "#E7E5E4" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[#6366F1] dot-pulse" style={{ background: "rgba(99,102,241,0.12)" }}>
                <BookOpen size={16} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: c.text }}>150+ Articles</div>
                <div className="text-xs" style={{ color: c.muted }}>Deep dives on engineering & design</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 mb-3 border-b" style={{ borderColor: isDark ? "rgba(168,162,158,0.15)" : "#E7E5E4" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[#6366F1]" style={{ background: "rgba(99,102,241,0.12)" }}>
                <TrendingUp size={16} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: c.text }}>Weekly Fresh Content</div>
                <div className="text-xs" style={{ color: c.muted }}>New insight every single week</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[#6366F1]" style={{ background: "rgba(99,102,241,0.12)" }}>
                <Users size={16} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: c.text }}>10k+ Readers</div>
                <div className="text-xs" style={{ color: c.muted }}>Trusted by teams worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. FEATURED ARTICLE SECTION
         ========================================== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal direction="up">
          <span className="text-xs font-bold tracking-widest block mb-3 text-[#6366F1]">FEATURED ARTICLE</span>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 mt-4">
          <Reveal direction="left" className="flex-1 max-w-lg">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight" style={{ color: c.text }}>
              The Future of Digital Innovation
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: c.muted }}>
              How businesses are leveraging next-gen cloud structures, robust automation patterns, and modular software designs to create deep operational impact and build lasting customer pipelines.
            </p>
            <a
              href="#read"
              className="btn-anim group inline-flex items-center gap-2 font-bold text-sm bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-xl shadow-md"
              style={{ backgroundImage: "linear-gradient(90deg,#6366F1,#4F46E5,#6366F1)" }}
            >
              Read More <ArrowUpRight size={16} className="btn-arrow" />
            </a>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="flex-1 relative w-full">
            <div
              className="card-hover-glow w-full aspect-[16/10] rounded-2xl overflow-hidden p-0 shadow-lg border"
              style={{ background: c.cardBg, borderColor: c.cardBorder }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
                alt="Architecture Setup"
                className="img-zoom w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border dot-pulse"
              style={{ background: c.cardBg, borderColor: "#6366F1" }}
            >
              <CheckCircle size={20} className="text-[#6366F1]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          3. LATEST ARTICLES GRID
         ========================================== */}
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="w-full h-px"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 25%, rgba(99,102,241,0.9) 50%, rgba(99,102,241,0.7) 75%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.5) 50%, transparent 100%)",
            boxShadow: isDark ? "0 0 16px 2px rgba(99,102,241,0.55)" : "none",
          }}
        />
      </div>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <Reveal direction="up">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest block mb-2 text-[#6366F1]">LATEST ARTICLES</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: c.text }}>Fresh Reads</h2>
            </div>
            <button
              className="btn-anim group px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 border"
              style={{ color: c.text, borderColor: c.line }}
            >
              View All Articles <ArrowUpRight size={14} className="btn-arrow" />
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LATEST_POSTS.map((post, idx) => (
            <Reveal key={post.id} direction="up" delay={idx * 0.12}>
              <article
                className="card-hover-glow rounded-2xl overflow-hidden flex flex-col h-full shadow-lg border"
                style={{ background: c.cardBg, borderColor: c.cardBorder }}
              >
                <div className="w-full aspect-[16/10] overflow-hidden">
                  <img src={post.img} alt={post.title} className="img-zoom w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase block mb-3 text-[#6366F1]">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight mb-4 leading-snug" style={{ color: c.text }}>
                      {post.title}
                    </h3>
                  </div>

                  <div
                    className="flex items-center justify-between pt-4 border-t text-xs"
                    style={{ borderColor: c.line, color: c.muted }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-[#6366F1] btn-arrow" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          4. NEWSLETTER SUBSCRIPTION BANNER
         ========================================== */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <Reveal direction="center">
          <div
            className={`w-full rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border ${c.newsletterBorder}`}
            style={{ background: c.newsletterBg }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border dot-pulse"
                style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)" }}
              >
                <Mail size={22} className="text-[#6366F1]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: c.text }}>Stay Inspired</h3>
                <p className="text-sm max-w-md" style={{ color: c.muted }}>
                  Subscribe to our newsletter and get the latest insights and updates delivered to your inbox.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border ${c.inputBorder} rounded-xl text-sm ${c.inputText} ${c.placeholder} outline-none focus:border-[#6366F1] transition-colors duration-300`}
                style={{ background: c.inputBg }}
              />
              <button
                className="btn-anim bg-[#6366F1] hover:bg-[#4F46E5] text-white w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
                style={{ backgroundImage: "linear-gradient(90deg,#6366F1,#4F46E5,#6366F1)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==========================================
          5. BROWSE BY CATEGORY STRIP
         ========================================== */}
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="w-full h-px"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 25%, rgba(99,102,241,0.9) 50%, rgba(99,102,241,0.7) 75%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.5) 50%, transparent 100%)",
            boxShadow: isDark ? "0 0 16px 2px rgba(99,102,241,0.55)" : "none",
          }}
        />
      </div>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <Reveal direction="up">
          <span className="text-xs font-bold tracking-widest text-center block mb-10 text-[#6366F1]">BROWSE BY CATEGORY</span>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <Reveal key={idx} direction="up" delay={idx * 0.08}>
                <div
                  className="cat-card card-hover-glow flex flex-col items-center text-center p-6 rounded-xl shadow-md border"
                  style={{ background: c.cardBg, borderColor: c.cardBorder }}
                >
                  <div
                    className="cat-icon-circle w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: c.iconCircleBg,
                      color: c.iconCircleIcon,
                      border: "none",
                      boxShadow: "0 6px 18px -4px rgba(99,102,241,0.55)",
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <span className="text-sm font-bold block mb-1" style={{ color: c.text }}>{cat.name}</span>
                  <span className="text-xs" style={{ color: c.muted }}>{cat.count}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top-btn fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-xl"
        style={{
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none",
          transform: showBackToTop ? "translateY(0)" : "translateY(20px)",
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}