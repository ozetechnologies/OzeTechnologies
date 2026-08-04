import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, Clock, ArrowUpRight, Mail, Sparkles, LayoutGrid, CheckCircle,
  Code2, Layers, Smartphone, Menu, X, Sun, Moon, ChevronDown, BookOpen, TrendingUp, Users
} from "lucide-react";

/* ---------------------------------------------------------------------
   useReveal — IntersectionObserver hook for scroll-into-view section
   animations (fade + move, alternating direction). Ported from the
   Services page so both pages share identical scroll-reveal behavior.
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

export default function Blogs() {
  const [theme, setTheme] = useState(() => localStorage.getItem("bc-theme") || "light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);

  // ---- scroll-reveal refs for each major section (alternating directions,
  // mirrors the pattern used on the Services page) ----
  const [featuredRef, featuredInView] = useReveal();
  const [articlesRef, articlesInView] = useReveal();
  const [newsletterRef, newsletterInView] = useReveal();
  const [categoriesRef, categoriesInView] = useReveal();

  // ---- scroll progress bar + back-to-top visibility (ported from Services) ----
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const toggleTheme = () => {
    setTheme((t) => {
      const newTheme = t === "light" ? "dark" : "light";
      localStorage.setItem("bc-theme", newTheme);
      window.dispatchEvent(new Event("bc-theme-change"));
      return newTheme;
    });
  };
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

    heroBg: isDark
      ? "linear-gradient(135deg, #120F1C 0%, #1E1B32 100%)"
      : "linear-gradient(135deg, #FAFAF9 0%, #F2F1FF 100%)",
    heroBorder: isDark ? "rgba(99, 102, 241, 0.5)" : "#E7E5E4",
    heroHeading: isDark ? "#ffffff" : "#1C1917",
    heroSub: isDark ? "#D6D3D1" : "#57534E",
    heroImgBorder: isDark ? "border-stone-800" : "border-stone-200",

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

    iconCircleBg: isDark ? "rgba(99,102,241,0.14)" : "#000000",
    iconCircleIcon: "#A5B4FC",
  };

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Services", href: "/services", isRoute: true },
    { label: "Products", href: "/products", isRoute: true },
    { label: "Portfolio", href: "/portfolio", isRoute: true },
    {
      label: "About Us",
      dropdown: [
        { label: "Our History", desc: "How Trikonix got started", href: "/our-history", isRoute: true },
        { label: "Blogs", desc: "Insights from our studio", href: "/blogs", isRoute: true },
      ],
    },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  return (
    <div
      className="w-full min-h-screen transition-colors duration-500 ease-in-out"
      style={{ background: c.pageBg, color: c.pageText }}
    >
      <style>{`
        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; overflow: hidden; background: ${c.pageBg}; transition: opacity 0.5s ease, visibility 0.5s ease; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .bc-loader-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; width: max-content; }
        .bc-loader-diamonds { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; width: 46px; height: 46px; animation: bc-diamond-spin 1.6s linear infinite; }
        .bc-loader-diamond { width: 100%; height: 100%; border-radius: 4px; }
        .bc-loader-diamond-dark { background: #1E1B4B; }
        .bc-loader-diamond-accent { background: #6366F1; }
        @keyframes bc-diamond-spin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${c.muted}; }
        @media (prefers-reduced-motion: reduce) { .bc-loader-diamonds { animation: none !important; } }

        /* ---------- PAGE-LOAD REVEAL (page content fade-in once loader clears) ---------- */
        .bc-page-content { opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }

        /* ---------- HERO TEXT REVEAL: heading, paragraph, buttons staggered on load ---------- */
        .bc-hero-anim { opacity: 0; transform: translateY(24px); }
        .bc-page-visible .bc-hero-anim-heading { animation: bc-fade-up 0.8s ease forwards; }
        .bc-page-visible .bc-hero-anim-para { animation: bc-fade-up 0.8s ease 0.2s forwards; }
        .bc-page-visible .bc-hero-anim-stats { animation: bc-fade-up 0.8s ease 0.35s forwards; }
        .bc-page-visible .bc-hero-anim-buttons { animation: bc-fade-up 0.8s ease 0.5s forwards; }
        @keyframes bc-fade-up { to { opacity: 1; transform: translateY(0); } }

        /* ---------- HERO IMAGE: slow float, ported from Services ---------- */
        .bc-float { animation: bc-float 9s ease-in-out infinite; }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }

        /* ---------- HERO SIDE-CARD BADGES: pop in on load ---------- */
        .bc-hero-photo-badge { opacity: 0; transform: scale(0.6); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-hero-photo-badge:hover { transform: translateY(-4px) scale(1.04) !important; box-shadow: 0 16px 32px -10px rgba(99,102,241,0.35); }
        .bc-page-visible .bc-hero-photo-badge { animation: bc-badge-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.8s forwards; }
        @keyframes bc-badge-pop { to { opacity: 1; transform: scale(1); } }

        /* ---------- SCROLL-REVEAL (whole page section animations, ported from Services) ---------- */
        .bc-reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; }
        .bc-reveal-center { transform: translateY(40px); }
        .bc-reveal-left { transform: translate(-40px, 24px); }
        .bc-reveal-right { transform: translate(40px, 24px); }
        .bc-reveal-in { opacity: 1; transform: translate(0, 0); }

        /* ---------- SCROLL PROGRESS BAR + BACK TO TOP (ported from Services) ---------- */
        .bc-scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: #6366F1; z-index: 200; transition: width 0.12s linear; box-shadow: 0 0 8px rgba(99,102,241,0.6); }
        .bc-back-to-top {
          position: fixed; right: 22px; bottom: 22px; z-index: 150; width: 46px; height: 46px; border-radius: 999px;
          background: #6366F1; color: #ffffff; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 20px 40px -16px rgba(0,0,0,0.4); opacity: 0; transform: translateY(14px) scale(0.85); pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .bc-back-to-top-visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .bc-back-to-top:hover { transform: translateY(-3px) scale(1.06); }

        /* ---------- ARTICLE CARD HOVER LIFT (ported from Services .bc-svc-card) ---------- */
        .bc-article-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .bc-article-card:hover { transform: translateY(-10px); border-color: #6366F1 !important; box-shadow: 0 24px 50px -16px rgba(99,102,241,0.35); }

        /* ---------- CATEGORY ICON HOVER (ported from Services .bc-industry-icon-circle) ---------- */
        .bc-category-icon { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .bc-category-card:hover .bc-category-icon { transform: rotate(-10deg) scale(1.12); box-shadow: 0 10px 22px -8px rgba(99,102,241,0.5); }
      `}</style>

      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`} aria-hidden={!loading}>
        <div className="bc-loader-center">
          <div className="bc-loader-diamonds">
            <div className="bc-loader-diamond bc-loader-diamond-dark" />
            <div className="bc-loader-diamond bc-loader-diamond-accent" />
            <div className="bc-loader-diamond bc-loader-diamond-accent" />
            <div className="bc-loader-diamond bc-loader-diamond-dark" />
          </div>
          <span className="font-bold text-lg" style={{ color: c.text }}>Trikonix</span>
          <div className="bc-loader-label">Loading</div>
        </div>
      </div>

      {/* scroll progress bar */}
      <div className="bc-scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>

        {/* ==========================================
            PILL NAVBAR
           ========================================== */}
        <header className="w-full sticky top-0 z-50 px-4 md:px-8 pt-4">
          <div
            className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 rounded-full shadow-xl transition-all duration-500 ease-in-out"
            style={{ background: c.navBg, color: "#ffffff", border: c.navBorder }}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold text-base shadow-sm">
                T
              </span>
              <span className="font-bold tracking-wide text-lg" style={{ color: "#ffffff" }}>
                Trikonix
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
                      className={`text-[14px] font-medium ${c.navText} ${c.navTextHover} flex items-center gap-1 transition-colors duration-300`}
                    >
                      {item.label} <ChevronDown size={14} className="opacity-70" />
                    </button>

                    {openDropdown === item.label && (
                      <div
                        className="absolute top-full left-0 mt-2 w-48 rounded-xl p-2 shadow-2xl flex flex-col gap-1 z-50 transition-all duration-500"
                        style={{ background: c.dropdownBg, border: isDark ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid #332D55" }}
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
                    className={`text-[14px] font-medium ${c.navText} ${c.navTextHover} transition-colors duration-300`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`w-9 h-9 rounded-full border ${c.toggleBtnBorder} flex items-center justify-center hover:opacity-80 transition-all duration-300 text-[#6366F1]`}
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
            className="fixed inset-0 z-50 p-6 flex flex-col gap-4 w-64 right-0 top-0 bottom-0 transition-all duration-500"
            style={{ background: c.navBg, color: "#ffffff", borderLeft: c.navBorder }}
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
          className="relative w-full overflow-hidden py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 transition-all duration-500 ease-in-out"
          style={{ background: c.heroBg }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-xl flex-1">
            <span className="font-bold text-sm uppercase tracking-widest block mb-4 text-[#6366F1]">
              OUR BLOG
            </span>
            <h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 transition-colors duration-500 bc-hero-anim bc-hero-anim-heading"
              style={{ color: c.heroHeading }}
            >
              Ideas.<br />
              Insights.<br />
              <span className="text-[#6366F1]">Inspiration.</span>
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-md opacity-90 leading-relaxed transition-colors duration-500 bc-hero-anim bc-hero-anim-para" style={{ color: c.heroSub }}>
              Explore articles, guides, and stories to fuel ideas and drive success in modern engineering realms.
            </p>

            <div className="flex items-center gap-6 mb-8 bc-hero-anim bc-hero-anim-stats">
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

            <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm transition-all duration-200 shadow-md bc-hero-anim bc-hero-anim-buttons hover:-translate-y-0.5 hover:scale-105 active:scale-95">
              Explore Articles <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="relative z-10 flex-1 w-full max-w-xl">
            <div className={`aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border ${c.heroImgBorder} transition-colors duration-500 bc-float`}>
              <img
                src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=800"
                alt="Modern Office Setup"
                className="w-full h-full object-cover brightness-95"
              />
            </div>

            <div
              className="hidden lg:block absolute z-20 w-64 -left-10 bottom-8 rounded-2xl shadow-2xl p-5 transition-all duration-500 bc-hero-photo-badge"
              style={{
                background: isDark ? "#0b1329" : "#ffffff",
                border: isDark ? "1px solid rgba(99,102,241,0.4)" : "1px solid #E7E5E4",
              }}
            >
              <div className="flex items-start gap-3 pb-3 mb-3 border-b" style={{ borderColor: isDark ? "rgba(168,162,158,0.15)" : "#E7E5E4" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[#6366F1]" style={{ background: "rgba(99,102,241,0.12)" }}>
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
        <section
          ref={featuredRef}
          className={`max-w-6xl mx-auto px-6 py-20 bc-reveal bc-reveal-left ${featuredInView ? "bc-reveal-in" : ""}`}
        >
          <span className="text-xs font-bold tracking-widest block mb-3 text-[#6366F1]">FEATURED ARTICLE</span>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 mt-4">
            <div className="flex-1 max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight transition-colors duration-500" style={{ color: c.text }}>
                The Future of Digital Innovation
              </h2>
              <p className="text-base leading-relaxed mb-8 transition-colors duration-500" style={{ color: c.muted }}>
                How businesses are leveraging next-gen cloud structures, robust automation patterns, and modular software designs to create deep operational impact and build lasting customer pipelines.
              </p>
             <button
                onClick={() => setShowFeaturedModal(true)}
                className="inline-flex items-center gap-2 font-bold text-sm bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              >
                Read More <ArrowUpRight size={16} />
              </button>

              {showFeaturedModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" style={{ background: c.cardBg }}>
                    <div className="w-full h-64 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" alt="Article" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8">
                      <h2 className="text-3xl font-bold mb-4" style={{ color: c.text }}>The Future of Digital Innovation</h2>
                      <p className="text-base leading-relaxed mb-6" style={{ color: c.muted }}>How businesses are leveraging next-gen cloud structures, robust automation patterns, and modular software designs to create deep operational impact and build lasting customer pipelines.</p>
                      <p className="text-base leading-relaxed mb-8" style={{ color: c.muted }}>This comprehensive guide explores how industry leaders reshape technical foundations for digital-first competitiveness.</p>
                      <button onClick={() => setShowFeaturedModal(false)} className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white py-3 rounded-xl font-bold transition-all hover:scale-105">Close</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 relative w-full">
              <div
                className="w-full aspect-[16/10] rounded-2xl overflow-hidden p-0 shadow-lg border transition-colors duration-500"
                style={{ background: c.cardBg, borderColor: c.cardBorder }}
              >
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
                  alt="Architecture Setup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border transition-colors duration-500"
                style={{ background: c.cardBg, borderColor: "#6366F1" }}
              >
                <CheckCircle size={20} className="text-[#6366F1]" />
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. LATEST ARTICLES GRID
           ========================================== */}
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="w-full h-px transition-all duration-500"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 25%, rgba(99,102,241,0.9) 50%, rgba(99,102,241,0.7) 75%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.5) 50%, transparent 100%)",
              boxShadow: isDark ? "0 0 16px 2px rgba(99,102,241,0.55)" : "none",
            }}
          />
        </div>
        <section
          ref={articlesRef}
          className="max-w-6xl mx-auto px-6 py-12 transition-colors duration-500"
        >
          <div className={`flex items-center justify-between mb-10 bc-reveal bc-reveal-center ${articlesInView ? "bc-reveal-in" : ""}`}>
            <div>
              <span className="text-xs font-bold tracking-widest block mb-2 text-[#6366F1]">LATEST ARTICLES</span>
              <h2 className="text-2xl md:text-3xl font-bold transition-colors duration-500" style={{ color: c.text }}>Fresh Reads</h2>
            </div>
            <button
              className="px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 border transition-colors duration-300"
              style={{ color: c.text, borderColor: c.line }}
            >
              View All Articles <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LATEST_POSTS.map((post, i) => (
              <article
                key={post.id}
                className={`bc-article-card rounded-2xl overflow-hidden flex flex-col h-full shadow-lg border transition-colors duration-500 bc-reveal bc-reveal-center ${articlesInView ? "bc-reveal-in" : ""}`}
                style={{ background: c.cardBg, borderColor: c.cardBorder, transitionDelay: `${i * 90}ms` }}
              >
                <div className="w-full aspect-[16/10] overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase block mb-3 text-[#6366F1]">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight mb-4 leading-snug transition-colors duration-500" style={{ color: c.text }}>
                      {post.title}
                    </h3>
                  </div>

                  <div
                    className="flex items-center justify-between pt-4 border-t text-xs transition-colors duration-500"
                    style={{ borderColor: c.line, color: c.muted }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-[#6366F1]" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. NEWSLETTER SUBSCRIPTION BANNER
           ========================================== */}
        <section
          ref={newsletterRef}
          className={`max-w-6xl mx-auto px-6 py-12 bc-reveal bc-reveal-center ${newsletterInView ? "bc-reveal-in" : ""}`}
        >
          <div
            className={`w-full rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border ${c.newsletterBorder} transition-colors duration-500`}
            style={{ background: c.newsletterBg }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors duration-500"
                style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)" }}
              >
                <Mail size={22} className="text-[#6366F1]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 transition-colors duration-500" style={{ color: c.text }}>Stay Inspired</h3>
                <p className="text-sm max-w-md transition-colors duration-500" style={{ color: c.muted }}>
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
              <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. BROWSE BY CATEGORY STRIP
           ========================================== */}
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="w-full h-px transition-all duration-500"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 25%, rgba(99,102,241,0.9) 50%, rgba(99,102,241,0.7) 75%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.5) 50%, transparent 100%)",
              boxShadow: isDark ? "0 0 16px 2px rgba(99,102,241,0.55)" : "none",
            }}
          />
        </div>
        <section
          ref={categoriesRef}
          className="max-w-6xl mx-auto px-6 py-16 transition-colors duration-500"
        >
          <span className={`text-xs font-bold tracking-widest text-center block mb-10 text-[#6366F1] bc-reveal bc-reveal-center ${categoriesInView ? "bc-reveal-in" : ""}`}>
            BROWSE BY CATEGORY
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={idx}
                  className={`bc-category-card flex flex-col items-center text-center p-6 rounded-xl shadow-md border transition-colors duration-500 bc-reveal bc-reveal-center ${categoriesInView ? "bc-reveal-in" : ""}`}
                  style={{ background: c.cardBg, borderColor: c.cardBorder, transitionDelay: `${idx * 90}ms` }}
                >
                  <div
                    className="bc-category-icon w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-500"
                    style={{
                      background: c.iconCircleBg,
                      color: c.iconCircleIcon,
                      border: isDark ? "1px solid rgba(99,102,241,0.4)" : "none",
                      boxShadow: isDark ? "0 0 14px rgba(99,102,241,0.25)" : "none",
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <span className="text-sm font-bold block mb-1 transition-colors duration-500" style={{ color: c.text }}>{cat.name}</span>
                  <span className="text-xs transition-colors duration-500" style={{ color: c.muted }}>{cat.count}</span>
                </div>
              );
            })}
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