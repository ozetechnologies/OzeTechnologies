import { useState, useEffect, useRef } from "react";
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
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  User,
  Send,
  PenLine,
  Cpu,
  Rocket,
  Users,
  Package,
  Link2,
  Globe2,
  MessageCircle,
  Sun,
  Moon,
  Quote,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Truck,
  GraduationCap,
  BarChart3,
  Home as HomeIcon,
  Menu,
  X,
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

// Animates a number from 0 up to the numeric part of `value` (e.g. "120+", "95%", "8")
// once `trigger` becomes true. Keeps any non-numeric prefix/suffix (+, %, k, etc).
function useCountUp(value, trigger, duration = 1400) {
  const [display, setDisplay] = useState(() => {
    const match = String(value).match(/[\d.]+/);
    return match ? String(value).replace(match[0], "0") : value;
  });
  const started = useRef(false);
  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const match = String(value).match(/[\d.]+/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[0]);
    const prefix = String(value).slice(0, match.index);
    const suffix = String(value).slice(match.index + match[0].length);
    const isInt = !match[0].includes(".");
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`${prefix}${isInt ? Math.round(current) : current.toFixed(1)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, value, duration]);
  return display;
}

// Small subcomponent so useCountUp can be called once per rendered stat (safe inside .map())
function CountUpValue({ value, trigger, duration }) {
  const display = useCountUp(value, trigger, duration);
  return <>{display}</>;
}

export default function LandingPage() {
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);
 const [theme, setTheme] = useState(() => localStorage.getItem("bc-theme") || "light");// "light" | "dark"
  const [loading, setLoading] = useState(true);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [statsRef, statsInView] = useReveal();
  const [productsRef, productsInView] = useReveal();
  const [industriesRef, industriesInView] = useReveal();
  const [stackRef, stackInView] = useReveal();
  const [testimonialsRef, testimonialsInView] = useReveal();
  const [contactRef, contactInView] = useReveal();
  const [footerRef, footerInView] = useReveal();

  // Parallax: the hero blob drifts at a slower rate than the page scroll
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

  // Scroll progress bar + Back-to-top button visibility
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
        setShowBackToTop(scrollTop > 300);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
       { label: "Our History", desc: "How Trikonix got started", href: "/our-history", isRoute: true },
        { label: "Blogs", desc: "Insights from our studio", href: "/blogs" },
      ],
    },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  const services = [
    { icon: Code2, title: "Custom Software", desc: "Line-of-business systems built around how your team actually works, not the other way around." },
    { icon: Layers, title: "Web Applications", desc: "Fast, accessible web products — from customer portals to internal dashboards." },
    { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform apps for iOS and Android, shipped and maintained long-term." },
    { icon: Palette, title: "UI/UX Design", desc: "Interfaces designed from real user flows, tested with real people before a line of code ships." },
    { icon: Cloud, title: "Cloud & DevOps", desc: "Infrastructure, CI/CD, and monitoring so releases are routine, not risky." },
    { icon: ShieldCheck, title: "QA & Testing", desc: "Manual and automated test coverage built in from sprint one, not bolted on at the end." },
  ];

const productTabs = [
    {
      label: "IT Development",
      icon: Code2,
      color: "#8b7ff0",
      items: [
        "Custom Software Development","Web Application Development","Mobile App Development","UI/UX Design",
        "Cloud & DevOps","QA & Testing","Blockchain Development","Game Development","IoT & Embedded Solutions","API Integration Services",
      ],
    },
    {
      label: "Specialized Solutions",
      icon: Cpu,
      color: "#f2795a",
      items: [
        "AI Chatbot Development","AI & LLM Integrations","Trading Products","Fin Tech Solutions","LMS Development",
        "CMS Development","Gold & Commodities Platforms","Healthcare Solutions","Custom AI Automation","Data & Analytics Platforms",
      ],
    },
    {
      label: "Web Development",
      icon: Globe2,
      color: "#38bdf8",
      items: [
        "Frontend Development","Backend Development","Full-Stack Web Apps","Progressive Web Apps (PWA)",
        "E-Commerce Websites","CMS-Based Websites","Web Portals & Dashboards","Landing Page Development","Website Maintenance","Website Performance Optimization",
      ],
    },
    {
      label: "Android Development",
      icon: Smartphone,
      color: "#34d399",
      items: [
        "Native Android Apps","Kotlin App Development","Android UI/UX Design","Google Play Deployment",
        "Android App Maintenance","Wearable App Development","Android Enterprise Apps","In-App Purchases Integration","Push Notification Systems","Android App Testing",
      ],
    },
    {
      label: "Data Analytics",
      icon: BarChart3,
      color: "#f2a93b",
      items: [
        "Business Intelligence Dashboards","Data Visualization","Big Data Solutions","Predictive Analytics",
        "Data Warehousing","ETL Pipeline Development","Real-Time Data Processing","Data Cleaning & Integration","Machine Learning Models","Custom Reporting Tools",
      ],
    },
  ];
  const stats = [
    { value: "120+", label: "Projects delivered" },
    { value: "8", label: "Years in business" },
    { value: "40+", label: "Engineers on staff" },
    { value: "95%", label: "Client retention" },
  ];

  const industries = [
    { label: "Fintech", Icon: Landmark, color: "#8b7ff0" },
    { label: "Healthcare", Icon: HeartPulse, color: "#34d399" },
    { label: "E-commerce", Icon: ShoppingCart, color: "#38bdf8" },
    { label: "Logistics", Icon: Truck, color: "#f2a93b" },
    { label: "Education", Icon: GraduationCap, color: "#8b7ff0" },
    { label: "Real Estate", Icon: HomeIcon, color: "#38bdf8" },
  ];

  const stack = ["React","Node.js","Python","Flutter","PostgreSQL","AWS","Docker","GraphQL"];

  const testimonials = [
    { quote: "They shipped our claims portal in twelve weeks and it's been in production, untouched, for a year.", name: "Operations Director", company: "Regional Insurer", Icon: ShieldCheck, color: "#f2795a" },
    { quote: "The team writes code like they'll be the ones on call for it. Because they are.", name: "VP Engineering", company: "Logistics Platform", Icon: Truck, color: "#38bdf8" },
    { quote: "We came in with a rough sketch. We left with an architecture doc, a working app, and a team that still answers our emails.", name: "Founder", company: "Healthtech Startup", Icon: HeartPulse, color: "#34d399" },
  ];

  const heroChecks = [
    { title: "Deep engineering expertise", desc: "Fintech, healthtech, logistics, and e-commerce systems", Icon: Cpu },
    { title: "8 years, 120+ shipped projects", desc: "Long-term maintainability over quick launches", Icon: Rocket },
    { title: "95% client retention", desc: "Teams that stay because the code holds up", Icon: Users },
  ];

  const heroStats = [
    { value: "8+", label: "Years of experience", Icon: Rocket },
    { value: "120+", label: "Projects shipped", Icon: Package },
    { value: "95%", label: "Client retention", Icon: Users },
  ];

  const clientLogos = ["AI Chatbot","AI LLM Integrations","Trading Products","Fin Tech","LMS","CMS","Gold","Healthcare"];

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
        .bc-loader-screen { position: fixed; inset: 0; z-index: 999; overflow: hidden; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; display: flex; align-items: center; justify-content: center; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
       .bc-loader-center { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; width: max-content; }
       @media (max-width: 768px) {
  .bc-loader-center { transform: translate(-150px, -200px); }
}
        .bc-loader-diamonds { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; width: 46px; height: 46px; animation: bc-diamond-spin 1.6s linear infinite; }
        .bc-loader-diamond { width: 100%; height: 100%; border-radius: 4px; }
        .bc-loader-diamond-dark { background: #1E1B4B; }
        .bc-loader-diamond-accent { background: var(--bc-cyan); }
        @keyframes bc-diamond-spin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
        @media (prefers-reduced-motion: reduce) { .bc-loader-diamonds { animation: none !important; } }
        .bc-loader-word { display: flex; align-items: baseline; gap: 2px; }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--bc-muted); }
        .bc-page-content { opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }
        .bc-scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: var(--bc-cyan); z-index: 1100; transition: width 0.1s linear; }
        .bc-back-to-top { position: fixed; bottom: 28px; right: 28px; width: 46px; height: 46px; border-radius: 999px; background: var(--bc-cyan); color: var(--bc-btn-primary-text); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 900; box-shadow: var(--bc-shadow-lg); opacity: 0; visibility: hidden; transform: translateY(12px) scale(0.9); transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease; }
        .bc-back-to-top.bc-back-to-top-visible { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
        .bc-back-to-top:hover { transform: translateY(-3px) scale(1.08); }
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
        @keyframes bc-fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bc-slideInLeft { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-slideInRight { 0% { opacity: 0; transform: translateX(40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-scaleIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .bc-reveal { opacity: 0; }
        .bc-reveal.bc-in-view { animation: bc-fadeInUp 0.8s ease-out forwards; }
        .bc-reveal-left { opacity: 0; }
        .bc-reveal-left.bc-in-view { animation: bc-slideInLeft 0.8s ease-out forwards; }
        .bc-reveal-right { opacity: 0; }
        .bc-reveal-right.bc-in-view { animation: bc-slideInRight 0.8s ease-out forwards; }
        .bc-reveal-scale { opacity: 0; }
        .bc-reveal-scale.bc-in-view { animation: bc-scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) { .bc-reveal, .bc-reveal-left, .bc-reveal-right, .bc-reveal-scale { opacity: 1; animation: none !important; } }
        .bc-grid-bg { background: transparent; }
        .bc-card { background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow); transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-card:hover { border-color: var(--bc-cyan); transform: translateY(-8px); box-shadow: var(--bc-shadow-lg), 0 0 24px -6px color-mix(in srgb, var(--bc-cyan) 45%, transparent); }
        .bc-btn-primary { background: var(--bc-cyan); color: var(--bc-btn-primary-text); box-shadow: 0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5); transition: filter 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-btn-primary:hover { filter: brightness(1.15); transform: translateY(-2px) scale(1.05); box-shadow: 0 12px 28px -6px color-mix(in srgb, var(--bc-cyan) 65%, transparent), 0 0 0 4px color-mix(in srgb, var(--bc-cyan) 16%, transparent); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: rgba(99,102,241,0.08); transform: translateY(-2px) scale(1.05); box-shadow: var(--bc-shadow-lg); }
        .bc-theme-toggle { border: 1px solid var(--bc-line); color: var(--bc-text); background: var(--bc-panel-2); transition: border-color 0.2s ease, transform 0.2s ease; }
        .bc-theme-toggle:hover { border-color: var(--bc-cyan); transform: translateY(-1px); }
        .bc-eyebrow { letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.72rem; color: var(--bc-amber); }
        .bc-diagram-panel { background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); border-radius: 14px; }
        .bc-corner { position: relative; }
        .bc-corner::before, .bc-corner::after { content: ""; position: absolute; width: 14px; height: 14px; border-color: var(--bc-cyan); opacity: 0.55; }
        .bc-corner::before { top: 10px; left: 10px; border-top: 2px solid var(--bc-cyan); border-left: 2px solid var(--bc-cyan); border-radius: 3px 0 0 0; }
        .bc-corner::after { bottom: 10px; right: 10px; border-bottom: 2px solid var(--bc-cyan); border-right: 2px solid var(--bc-cyan); border-radius: 0 0 3px 0; }
        @keyframes bc-flow { to { stroke-dashoffset: -200; } }
        .bc-flow-line { stroke-dasharray: 6 10; animation: bc-flow 6s linear infinite; }
        @keyframes bc-pulse-node { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        .bc-node-rect { filter: drop-shadow(0 3px 6px rgba(15,23,42,0.10)); }
        .bc-node { animation: bc-pulse-node 3s ease-in-out infinite; }
       .bc-marquee { overflow: hidden; position: relative; -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
.bc-marquee-track { display: flex; gap: 56px; width: max-content; animation: bc-marquee-scroll 30s linear infinite; }
.bc-marquee:hover .bc-marquee-track { animation-play-state: paused; }
@keyframes bc-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.bc-logo-item { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 600; font-size: 1rem; color: var(--bc-muted); opacity: 0.8; letter-spacing: 0.01em; white-space: nowrap; transition: opacity 0.2s ease, color 0.2s ease; }
.bc-logo-item:hover { opacity: 1; color: var(--bc-cyan); }
        .bc-hero-media { position: relative; border-radius: 20px; overflow: hidden; box-shadow: var(--bc-shadow-lg); border: 1px solid var(--bc-line); aspect-ratio: 4 / 3.1; background: var(--bc-panel-2); animation: bc-float 9s ease-in-out infinite; }
        .bc-flow-card { position: relative; z-index: 1; animation: bc-float 9s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .bc-flow-card { animation: none; } }
        @keyframes bc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @media (prefers-reduced-motion: reduce) { .bc-hero-media { animation: none; } }
        .bc-hero-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bc-hero-media-dots { position: absolute; top: 16px; right: 16px; width: 44px; height: 64px; background-image: radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px); background-size: 8px 8px; z-index: 2; }
        .bc-float-card { position: absolute; right: 20px; bottom: -34px; left: 20px; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 14px; box-shadow: var(--bc-shadow-lg); padding: 20px 22px; z-index: 2; }
        @media (min-width: 768px) { .bc-float-card { left: auto; width: 340px; right: -40px; bottom: -56px; } }
        .bc-check-row + .bc-check-row { margin-top: 14px; }
        .bc-check-dot { width: 22px; height: 22px; border-radius: 999px; background: var(--bc-cyan); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (prefers-reduced-motion: reduce) { .bc-flow-line, .bc-node, .bc-marquee-track { animation: none !important; } }
       .bc-tab-row { display: flex; gap: 40px; border-bottom: 1px solid var(--bc-line); overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.bc-tab-row::-webkit-scrollbar { display: none; }
.bc-tab-btn { flex-shrink: 0; white-space: nowrap; }
        .bc-tab-btn { background: none; border: none; cursor: pointer; padding: 14px 2px; font-weight: 700; font-size: 0.95rem; color: var(--bc-muted); position: relative; transition: color 0.2s ease; }
        .bc-tab-btn.bc-tab-active { color: var(--bc-text); }
        .bc-tab-btn.bc-tab-active::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--bc-cyan); }
        .bc-product-item { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 600; font-size: 1.05rem; line-height: 1.35; color: var(--bc-text); }
        .bc-cta-banner { background: #18152A; border-radius: 16px; color: #F5F5F4; }
        [data-theme="dark"] .bc-cta-banner { background: var(--bc-panel-2); border: 1px solid var(--bc-line); }
        .bc-cta-highlight { background: var(--bc-cyan); color: #1E1B4B; padding: 0 4px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
        .bc-cta-btn { background: #ffffff; color: #18152A; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; transition: transform 0.2s ease, filter 0.2s ease; }
        .bc-cta-btn:hover { transform: translateY(-1px); filter: brightness(0.96); }
        .bc-industry-underline { width: 46px; height: 3px; border-radius: 2px; background: var(--bc-cyan); }
        .bc-industry-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 12px; padding: 18px 14px; box-shadow: var(--bc-shadow); transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
        .bc-industry-card:hover { transform: translateY(-8px); border-color: var(--bc-cyan); box-shadow: var(--bc-shadow-lg), 0 0 24px -6px color-mix(in srgb, var(--bc-cyan) 45%, transparent); }
        .bc-industry-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .bc-orbit-wrap { position: relative; width: 100%; max-width: 420px; aspect-ratio: 1 / 1; margin: 0 auto; }
        .bc-orbit-globe { position: absolute; inset: 15%; border-radius: 50%; animation: bc-globe-spin 50s linear infinite; }
        .bc-orbit-ring { position: absolute; inset: 2%; border-radius: 50%; border: 1px dashed var(--bc-line); }
        .bc-orbit-spinner { position: absolute; inset: 0; animation: bc-orbit-spin 40s linear infinite; }
        .bc-orbit-node { position: absolute; width: 58px; height: 58px; margin: -29px; border-radius: 50%; background: var(--bc-panel); border-width: 1.5px; border-style: solid; display: flex; align-items: center; justify-content: center; box-shadow: var(--bc-shadow); }
        .bc-orbit-node-icon { display: flex; align-items: center; justify-content: center; animation: bc-orbit-spin-reverse 40s linear infinite; }
        .bc-orbit-dot { position: absolute; width: 6px; height: 6px; margin: -3px; border-radius: 50%; animation: bc-pulse-node 2.4s ease-in-out infinite; }
        @keyframes bc-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bc-orbit-spin-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes bc-globe-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .bc-orbit-dot, .bc-orbit-globe, .bc-orbit-ring, .bc-orbit-spinner, .bc-orbit-node-icon { animation: none; } }
        .bc-underline-fade { width: 220px; max-width: 60%; height: 2px; background: linear-gradient(90deg, var(--bc-cyan), transparent); }
        .bc-testimonial-card { position: relative; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 26px 24px 22px; box-shadow: var(--bc-shadow); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .bc-testimonial-card::after { content: ""; position: absolute; left: 16px; right: 16px; bottom: -1px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, transparent, var(--bc-tcolor, var(--bc-cyan)), transparent); opacity: 0.7; }
        .bc-testimonial-card:hover { transform: translateY(-8px); border-color: var(--bc-tcolor, var(--bc-cyan)); box-shadow: var(--bc-shadow-lg), 0 0 24px -6px color-mix(in srgb, var(--bc-cyan) 40%, transparent); }
        .bc-quote-badge { width: 40px; height: 40px; border-radius: 999px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .bc-testimonial-divider { height: 1px; background: var(--bc-line); margin: 18px 0 16px; }
        .bc-testimonial-avatar { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-contact-highlight { color: var(--bc-cyan); }
        .bc-contact-divider { position: relative; height: 1px; background: var(--bc-line); margin: 28px 0 26px; max-width: 340px; }
        .bc-contact-divider::after { content: ""; position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; border-radius: 999px; background: var(--bc-cyan); transform: translate(-50%, -50%); box-shadow: 0 0 10px 2px color-mix(in srgb, var(--bc-cyan) 60%, transparent); }
        .bc-contact-info-row { display: flex; align-items: center; gap: 14px; }
        .bc-contact-info-row + .bc-contact-info-row { margin-top: 18px; }
        .bc-contact-icon-circle { width: 44px; height: 44px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); border: 1px solid color-mix(in srgb, var(--bc-cyan) 35%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-contact-form-card { position: relative; border-radius: 20px; padding: 32px; background: var(--bc-panel); border: 1px solid color-mix(in srgb, var(--bc-cyan) 30%, var(--bc-line)); box-shadow: var(--bc-shadow-lg), 0 0 40px -12px color-mix(in srgb, var(--bc-cyan) 35%, transparent); }
        .bc-input-wrap { position: relative; }
        .bc-input-icon { position: absolute; right: 14px; top: 14px; color: var(--bc-muted); pointer-events: none; }
        .bc-input-icon-area { top: 14px; }
        .bc-contact-input { width: 100%; background: var(--bc-panel-2); border: 1px solid var(--bc-line); border-radius: 10px; padding: 12px 40px 12px 14px; font-size: 0.9rem; outline: none; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .bc-contact-input:focus { border-color: var(--bc-cyan); box-shadow: 0 0 0 4px color-mix(in srgb, var(--bc-cyan) 18%, transparent); }
        .bc-send-btn { width: 100%; border: none; border-radius: 10px; padding: 14px 20px; font-weight: 600; color: var(--bc-btn-primary-text); background: linear-gradient(90deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 60%, #14b8a6)); display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: filter 0.2s ease, transform 0.2s ease; }
        .bc-send-btn:hover { filter: brightness(1.06); transform: translateY(-1px); }
        .bc-trust-line { display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: 0.78rem; color: var(--bc-muted); }
        .bc-hero-badge-line1 { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--bc-muted); margin-bottom: 4px; }
        .bc-hero-badge-line2 { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 700; font-size: 1.5rem; letter-spacing: 0.01em; background: linear-gradient(90deg, var(--bc-cyan), var(--bc-amber), var(--bc-cyan)); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: bc-badge-shimmer 5s linear infinite; }
        @keyframes bc-badge-shimmer { to { background-position: 200% center; } }
        @media (prefers-reduced-motion: reduce) { .bc-hero-badge-line2 { animation: none; } }
        .bc-hero-decor-dots { display: none; }
        .bc-hero-wave { position: absolute; bottom: 0; left: 0; width: 360px; max-width: 60%; height: auto; opacity: 0.4; pointer-events: none; }
        .bc-hero-media-wrap { position: relative; }
        .bc-hero-blob { position: absolute; top: -46px; right: -46px; width: 260px; height: 260px; border-radius: 50%; background: color-mix(in srgb, var(--bc-cyan) 18%, transparent); z-index: 0; }
        .bc-float-row { display: flex; align-items: flex-start; gap: 12px; padding: 11px 0; }
        .bc-float-row + .bc-float-row { border-top: 1px solid var(--bc-line); }
        .bc-float-row-icon { width: 38px; height: 38px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-hero-stats-row { display: flex; align-items: center; flex-wrap: wrap; margin-top: 30px; }
        .bc-hero-stat-item { display: flex; align-items: center; gap: 10px; padding: 0 20px; }
        .bc-hero-stat-item:first-child { padding-left: 0; }
        .bc-hero-stat-divider { width: 1px; height: 30px; background: var(--bc-line); }
        .bc-hero-stat-icon { width: 34px; height: 34px; border-radius: 10px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (max-width: 640px) {
          .bc-hero-stats-row { flex-direction: column; align-items: flex-start; gap: 14px; }
          .bc-hero-stat-item { padding: 0; width: 100%; }
          .bc-hero-stat-divider { display: none; }
        }
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
        .bc-nav-dropdown-wrap::after { content: ""; position: absolute; top: 100%; left: -20px; right: -20px; height: 20px; }
        .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-panel, .bc-nav-dropdown-panel.bc-nav-dropdown-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
        .bc-nav-dropdown-item { display: flex; flex-direction: column; gap: 2px; padding: 9px 12px; border-radius: 9px; text-decoration: none; transition: background 0.15s ease; }
        .bc-nav-dropdown-item:hover { background: rgba(255,255,255,0.07); }
        .bc-nav-dropdown-item-label { color: #F5F5F4; font-size: 0.86rem; font-weight: 600; }
        .bc-nav-dropdown-item-desc { color: rgba(241,245,249,0.5); font-size: 0.74rem; }
        .bc-navbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
        .bc-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.2s ease; }
        .bc-navbar-theme-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
        .bc-navbar-cta { display: none; }
        @media (min-width: 1024px) { .bc-navbar-cta { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #18152A; border-radius: 999px; padding: 9px 18px; font-weight: 600; font-size: 0.82rem; white-space: nowrap; text-decoration: none; flex-shrink: 0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease, filter 0.2s ease; } .bc-navbar-cta:hover { transform: translateY(-1px); filter: brightness(0.95); } }
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
        .bc-mobile-cta { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: var(--bc-cyan, #6366F1); color: #ffffff; border-radius: 999px; padding: 12px 20px; font-weight: 600; text-decoration: none; }
        .bc-footer-card { position: relative; overflow: hidden; border-radius: 0; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
        .bc-footer-decor-dots { position: absolute; bottom: 24px; right: 24px; width: 120px; height: 90px; background-image: radial-gradient(var(--bc-cyan) 1px, transparent 1px); background-size: 10px 10px; opacity: 0.25; pointer-events: none; }
        .bc-footer-decor-wave { position: absolute; top: 0; right: 0; width: 45%; max-width: 420px; height: auto; opacity: 0.35; pointer-events: none; }
        .bc-footer-underline { width: 40px; height: 3px; border-radius: 2px; background: var(--bc-cyan); margin: 14px 0 18px; }
        .bc-footer-social { width: 40px; height: 40px; border-radius: 10px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.3s ease, transform 0.3s ease; }
        .bc-footer-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px) scale(1.12) rotate(8deg); }
        .bc-footer-col-divider { display: none; }
        @media (min-width: 768px) { .bc-footer-col-divider { display: block; width: 1px; background: var(--bc-line); align-self: stretch; } }
        .bc-footer-heading-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .bc-footer-heading-badge { width: 34px; height: 34px; border-radius: 9px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); border: 1px solid color-mix(in srgb, var(--bc-cyan) 35%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bc-footer-heading { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.78rem; letter-spacing: 0.1em; font-weight: 700; color: var(--bc-cyan); }
        .bc-footer-item { display: flex; align-items: center; gap: 6px; color: var(--bc-muted); transition: color 0.2s ease; }
        .bc-footer-item:hover { color: var(--bc-text); }
        .bc-footer-item + .bc-footer-item { margin-top: 14px; }
        .bc-footer-contact-item { display: flex; align-items: center; gap: 10px; color: var(--bc-text); font-weight: 500; }
        .bc-footer-contact-item + .bc-footer-contact-item { margin-top: 16px; }
        .bc-footer-bottom { display: flex; align-items: center; gap: 10px; border-top: 1px solid var(--bc-line); padding-top: 20px; margin-top: 8px; color: var(--bc-muted); font-size: 0.85rem; }
        .bc-footer-bottom-badge { width: 26px; height: 26px; border-radius: 999px; background: color-mix(in srgb, var(--bc-cyan) 14%, transparent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      `}</style>

      <div className={`bc-loader-screen ${!loading ? "bc-loader-hidden" : ""}`} aria-hidden={!loading}>
        <div className="bc-loader-center">
          <div className="bc-loader-mark">
            <div className="bc-loader-diamonds">
              <div className="bc-loader-diamond bc-loader-diamond-dark" />
              <div className="bc-loader-diamond bc-loader-diamond-accent" />
              <div className="bc-loader-diamond bc-loader-diamond-accent" />
              <div className="bc-loader-diamond bc-loader-diamond-dark" />
            </div>
          </div>
          <div className="bc-loader-word">
            <span className="bc-display font-bold text-lg" style={{ color: "var(--bc-text)" }}>Trikonix</span>
          </div>
          <div className="bc-loader-label bc-mono">Loading</div>
        </div>
      </div>

      <div className="bc-scroll-progress" style={{ width: `${scrollProgress * 100}%` }} />
      <div ref={cursorGlowRef} className="bc-cursor-glow">
        <div className="bc-cursor-glow-layer bc-cursor-glow-soft" />
        <div className="bc-cursor-glow-layer bc-cursor-glow-core" />
        <div className="bc-cursor-glow-layer bc-cursor-glow-warm" />
      </div>
      <div ref={cursorRingRef} className={`bc-cursor-ring ${cursorHover ? "bc-cursor-ring-hover" : ""}`} />
<div ref={cursorBRef} className="bc-cursor-b">
  <span className={`bc-cursor-b-inner bc-display ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`}>T</span>
</div>
      <button
        className={`bc-back-to-top ${showBackToTop ? "bc-back-to-top-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
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
                      {item.dropdown.map((sub, j) =>
                        sub.href.startsWith("/") ? (
                          <Link
                            key={j}
                            to={sub.href}
                            className="bc-nav-dropdown-item"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                            {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                          </Link>
                        ) : (
                          <a
                            key={j}
                            href={sub.href}
                            className="bc-nav-dropdown-item"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                            {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                          </a>
                        )
                      )}
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
          <span className="bc-navbar-name bc-display">Trikonix</span>
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
                item.dropdown.map((sub, j) =>
                  sub.href.startsWith("/") ? (
                    <Link
                      key={j}
                      to={sub.href}
                      className="bc-mobile-sublink"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ) : (
                    <a
                      key={j}
                      href={sub.href}
                      className="bc-mobile-sublink"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </a>
                  )
                )}
            </div>
          ))}
        </div>
       
      </div>

      <section id="home" className="bc-grid-bg relative overflow-hidden">
        <div className="bc-hero-decor-dots" />
        <svg className="bc-hero-wave" viewBox="0 0 300 120" fill="none">
          <path d="M0 90 C 60 60, 100 110, 160 80 S 260 40, 300 70" stroke="var(--bc-cyan)" strokeWidth="1" opacity="0.5" />
          <path d="M0 110 C 60 80, 100 130, 160 100 S 260 60, 300 90" stroke="var(--bc-cyan)" strokeWidth="1" opacity="0.3" />
        </svg>
        <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-14 md:pb-24 grid md:grid-cols-2 gap-14 items-center">
          <div>
            
            <h1
              className={`bc-display font-bold text-4xl md:text-5xl leading-tight mb-6 bc-reveal ${!loading ? "bc-in-view" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              We build software
              <span style={{ color: "var(--bc-cyan)" }}> that grows with your business.</span>
            </h1>
            <p
              className={`bc-body text-base md:text-lg mb-8 bc-reveal ${!loading ? "bc-in-view" : ""}`}
              style={{ color: "var(--bc-muted)", animationDelay: "0.3s" }}
            >
              Trikonix partners with growing businesses to build custom software,
              web platforms, and mobile apps that stay reliable long after launch.
            </p>
            <div className={`flex flex-wrap gap-4 bc-reveal ${!loading ? "bc-in-view" : ""}`} style={{ animationDelay: "0.4s" }}>
              <Link to="/contact" className="bc-btn-primary bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
               Consultancy <ArrowRight size={18} />
              </Link>
            <Link to="/services" className="bc-btn-ghost bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
  See our work <ArrowUpRight size={18} />
</Link>
            </div>

            <div className={`bc-hero-stats-row bc-reveal ${!loading ? "bc-in-view" : ""}`} style={{ animationDelay: "0.5s" }}>
              {heroStats.map((s, i) => (
                <div key={i} className="flex items-center w-full sm:w-auto">
                  {i > 0 && <div className="bc-hero-stat-divider" />}
                  <div className="bc-hero-stat-item">
                    <div className="bc-hero-stat-icon">
                      <s.Icon size={17} color="var(--bc-cyan)" />
                    </div>
                    <div>
                      <div className="bc-body font-bold text-sm leading-tight">
                        <CountUpValue value={s.value} trigger={!loading} duration={1200} />
                      </div>
                      <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pb-24 md:pb-0 md:pr-8">
            <div
              className={`bc-hero-media-wrap bc-reveal-right bc-reveal-scale ${!loading ? "bc-in-view" : ""}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div ref={parallaxRef} className="bc-hero-blob" />
              <div className="bc-diagram-panel bc-corner bc-flow-card p-6 md:p-7" style={{ position: "relative", zIndex: 1 }}>
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2">
      <span style={{ width: 9, height: 9, borderRadius: 999, background: "#8b7ff0", display: "inline-block" }} />
      <span style={{ width: 9, height: 9, borderRadius: 999, background: "#f2795a", display: "inline-block" }} />
      <span style={{ width: 9, height: 9, borderRadius: 999, background: "#f2a93b", display: "inline-block" }} />
      <span className="bc-body font-semibold text-sm ml-1">Delivery Engine</span>
    </div>
    <div className="flex items-center gap-1.5">
      <span style={{ width: 7, height: 7, borderRadius: 999, background: "#f2795a", display: "inline-block" }} />
      <span className="bc-mono text-xs font-semibold" style={{ color: "#f2795a" }}>LIVE</span>
    </div>
  </div>

  <div className="bc-mono text-xs tracking-widest uppercase mb-1" style={{ color: "var(--bc-muted)" }}>
    Peak Delivery Score
  </div>
  <div className="flex items-baseline gap-2 mb-4">
    <span className="bc-display font-bold text-4xl" style={{ color: "var(--bc-cyan)" }}>
      <CountUpValue value="98%" trigger={!loading} duration={1400} />
    </span>
    <span className="bc-body text-sm" style={{ color: "var(--bc-muted)" }}>
      ↗ across 4 delivery stages
    </span>
  </div>

  <svg viewBox="0 0 380 170" className="w-full h-auto">
    <g className="bc-flow-line" stroke="var(--bc-line)" strokeWidth="1" fill="none">
      <line x1="24" y1="55" x2="170" y2="30" />
      <line x1="24" y1="55" x2="170" y2="85" />
      <line x1="24" y1="55" x2="170" y2="140" />
      <line x1="24" y1="115" x2="170" y2="30" />
      <line x1="24" y1="115" x2="170" y2="85" />
      <line x1="24" y1="115" x2="170" y2="140" />
    </g>
    <g className="bc-flow-line" stroke="var(--bc-line)" strokeWidth="1" fill="none">
      <line x1="170" y1="30" x2="300" y2="15" />
      <line x1="170" y1="30" x2="300" y2="58" />
      <line x1="170" y1="30" x2="300" y2="101" />
      <line x1="170" y1="30" x2="300" y2="144" />
      <line x1="170" y1="85" x2="300" y2="15" />
      <line x1="170" y1="85" x2="300" y2="58" />
      <line x1="170" y1="85" x2="300" y2="101" />
      <line x1="170" y1="85" x2="300" y2="144" />
      <line x1="170" y1="140" x2="300" y2="15" />
      <line x1="170" y1="140" x2="300" y2="58" />
      <line x1="170" y1="140" x2="300" y2="101" />
      <line x1="170" y1="140" x2="300" y2="144" />
    </g>

    <circle cx="24" cy="55" r="6" fill="var(--bc-muted)" className="bc-node-rect" />
    <circle cx="24" cy="115" r="6" fill="var(--bc-muted)" className="bc-node-rect" />

    <circle cx="170" cy="30" r="7" fill="var(--bc-cyan)" className="bc-node-rect bc-node" />
    <circle cx="170" cy="85" r="7" fill="var(--bc-cyan)" className="bc-node-rect bc-node" style={{ animationDelay: "0.4s" }} />
    <circle cx="170" cy="140" r="7" fill="var(--bc-cyan)" className="bc-node-rect bc-node" style={{ animationDelay: "0.8s" }} />

    <circle cx="300" cy="15" r="6" fill="#8b7ff0" className="bc-node-rect bc-node" />
    <circle cx="300" cy="58" r="6" fill="#34d399" className="bc-node-rect bc-node" style={{ animationDelay: "0.3s" }} />
    <circle cx="300" cy="101" r="6" fill="#f2795a" className="bc-node-rect bc-node" style={{ animationDelay: "0.6s" }} />
    <circle cx="300" cy="144" r="6" fill="#f2a93b" className="bc-node-rect bc-node" style={{ animationDelay: "0.9s" }} />

    <text x="310" y="19" className="bc-mono" fontSize="10" fontWeight="700" fill="#8b7ff0">DESIGN 96%</text>
    <text x="310" y="62" className="bc-mono" fontSize="10" fontWeight="700" fill="#34d399">BUILD 98%</text>
    <text x="310" y="105" className="bc-mono" fontSize="10" fontWeight="700" fill="#f2795a">TEST 95%</text>
    <text x="310" y="148" className="bc-mono" fontSize="10" fontWeight="700" fill="#f2a93b">DEPLOY 99%</text>
  </svg>
</div>
            </div>
            
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
          <div className="bc-logo-strip px-6 md:px-10 py-6 md:py-7 overflow-hidden">
            <div className="bc-mono text-[0.68rem] tracking-widest uppercase mb-4 text-center md:text-left" style={{ color: "#ffffff", opacity: 0.7 }}>
              Trusted by engineering teams at
            </div>
            <div className="bc-marquee-track">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <span key={i} className="bc-logo-item bc-display font-semibold text-base md:text-lg whitespace-nowrap mx-8">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} style={{ background: "var(--bc-band)" }}>
        <div className={`max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 bc-reveal ${statsInView ? "bc-in-view" : ""}`}>
          {stats.map((s, i) => (
            <div key={i}>
              <div className="bc-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--bc-cyan)" }}>
                <CountUpValue value={s.value} trigger={statsInView} duration={1600} />
              </div>
              <div className="bc-body text-sm mt-1" style={{ color: "var(--bc-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>


      <section id="about" ref={industriesRef} className="overflow-hidden" style={{ background: "var(--bc-band)" }}>
        <div className={`max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-14 items-center bc-reveal ${industriesInView ? "bc-in-view" : ""}`}>
          <div>
            <div className="bc-mono bc-eyebrow mb-3">Where we work</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">Industries</h2>
            <div className="bc-industry-underline mb-5" />
            <p className="bc-body mb-9 max-w-md" style={{ color: "var(--bc-muted)" }}>
              We deliver smart, scalable software across a wide range of industries — built by
              teams who understand the domain, not just the code.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className={`bc-industry-card bc-reveal-scale ${industriesInView ? "bc-in-view" : ""}`}
                  style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                >
                  <div
                    className="bc-industry-icon"
                    style={{ background: `${ind.color}1a`, border: `1px solid ${ind.color}55` }}
                  >
                    <ind.Icon size={22} color={ind.color} strokeWidth={1.75} />
                  </div>
                  <div className="bc-body font-semibold text-sm">{ind.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bc-orbit-wrap hidden md:block">
            <svg viewBox="0 0 200 200" className="bc-orbit-globe">
              <defs>
                <radialGradient id="bcGlobeGrad" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="var(--bc-cyan)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--bc-panel-2)" stopOpacity="0.95" />
                </radialGradient>
                <clipPath id="bcGlobeClip">
                  <circle cx="100" cy="100" r="90" />
                </clipPath>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#bcGlobeGrad)" stroke="var(--bc-line)" strokeWidth="1" />
              <g clipPath="url(#bcGlobeClip)" opacity="0.45" stroke="var(--bc-cyan)" strokeWidth="0.5" fill="none">
                <ellipse cx="100" cy="100" rx="90" ry="30" />
                <ellipse cx="100" cy="100" rx="90" ry="60" />
                <ellipse cx="100" cy="100" rx="30" ry="90" />
                <ellipse cx="100" cy="100" rx="60" ry="90" />
                <line x1="10" y1="100" x2="190" y2="100" />
              </g>
            </svg>
            <div className="bc-orbit-ring" />
            <div className="bc-orbit-spinner">
              {industries.map((ind, i) => {
                const angle = (360 / industries.length) * i - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 49;
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="bc-orbit-node"
                    style={{ left: `${x}%`, top: `${y}%`, borderColor: ind.color, boxShadow: `0 0 18px ${ind.color}40` }}
                  >
                    <div className="bc-orbit-node-icon">
                      <ind.Icon size={22} color={ind.color} strokeWidth={1.75} />
                    </div>
                  </div>
                );
              })}
              {industries.map((ind, i) => {
                const angle = (360 / industries.length) * (i + 0.5) - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 49;
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                return (
                  <div
                    key={`dot-${i}`}
                    className="bc-orbit-dot"
                    style={{ left: `${x}%`, top: `${y}%`, background: ind.color }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="products" ref={productsRef} className={`max-w-7xl mx-auto px-6 py-20 md:py-24 bc-reveal ${productsInView ? "bc-in-view" : ""}`}>
  <div className="bc-mono bc-eyebrow mb-3">What we build</div>
  <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">
    Our <span style={{ color: "var(--bc-cyan)" }}>Services</span>
  </h2>
  <p className="bc-body max-w-2xl mb-10" style={{ color: "var(--bc-muted)" }}>
    One team covering the full lifecycle of your product, from first sketch to long-term support.
  </p>
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((s, i) => (
      <div key={i} className="bc-card rounded-2xl p-6" style={{ animationDelay: `${i * 90}ms` }}>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${["#6366F1","#38bdf8","#8b7ff0","#f2795a","#34d399","#f2a93b"][i % 6]}1a`, border: `1px solid ${["#6366F1","#38bdf8","#8b7ff0","#f2795a","#34d399","#f2a93b"][i % 6]}55` }}
        >
          <s.icon size={22} color={["#6366F1","#38bdf8","#8b7ff0","#f2795a","#34d399","#f2a93b"][i % 6]} strokeWidth={1.75} />
        </div>
        <h3 className="bc-display font-bold text-lg mb-2">{s.title}</h3>
        <p className="bc-body text-sm mb-4" style={{ color: "var(--bc-muted)" }}>{s.desc}</p>
        <Link
          to="/contact"
          className="bc-body font-semibold text-sm flex items-center gap-1.5"
          style={{ color: ["#6366F1","#38bdf8","#8b7ff0","#f2795a","#34d399","#f2a93b"][i % 6] }}
        >
          Discuss this service <ArrowRight size={14} />
        </Link>
      </div>
    ))}
  </div>
</section>    

      <section id="blogs" ref={testimonialsRef} style={{ background: "var(--bc-band)" }}>
        <div className={`max-w-7xl mx-auto px-6 py-20 md:py-24 bc-reveal ${testimonialsInView ? "bc-in-view" : ""}`}>
        <div className="bc-mono bc-eyebrow mb-3">In their words</div>
        <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">Clients</h2>
        <div className="bc-underline-fade mb-5" />
        <p className="bc-body mb-12" style={{ color: "var(--bc-muted)" }}>
          Trusted by teams building what's next.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bc-testimonial-card bc-reveal ${testimonialsInView ? "bc-in-view" : ""}`}
              style={{ "--bc-tcolor": t.color, animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <div
                className="bc-quote-badge"
                style={{ background: `${t.color}22`, border: `1px solid ${t.color}55` }}
              >
                <Quote size={18} color={t.color} fill={t.color} strokeWidth={0} />
              </div>
              <p className="bc-body text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="bc-testimonial-divider" />
              <div className="flex items-center gap-3">
                <div
                  className="bc-testimonial-avatar"
                  style={{ background: `${t.color}1a`, border: `1px solid ${t.color}55` }}
                >
                  <t.Icon size={20} color={t.color} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="bc-body font-semibold text-sm">{t.name}</div>
                  <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

    

      </div>
    </div>
  );
}