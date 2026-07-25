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
  Home as HomeIcon,
  Menu,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);
  const [theme, setTheme] = useState("light"); // "light" | "dark"
  const [loading, setLoading] = useState(true);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    {
      label: "Products",
      href: "#products",
      dropdown: [
        { label: "IT Development", desc: "Software, web & mobile builds", href: "#products" },
        { label: "Specialized Solutions", desc: "AI, fintech & platform work", href: "#products" },
        { label: "View all products", href: "#products" },
      ],
    },
    {
      label: "Projects",
      href: "#projects",
      dropdown: [
        { label: "Fintech", href: "#projects" },
        { label: "Healthcare", href: "#projects" },
        { label: "E-commerce", href: "#projects" },
        { label: "View all projects", href: "#projects" },
      ],
    },
    { label: "Services", href: "/services", isRoute: true },
    { label: "Blogs", href: "/blogs", isRoute: true },
   { label: "About Us", href: "/about", isRoute: true },
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
      items: [
        "Custom Software Development","Web Application Development","Mobile App Development","UI/UX Design",
        "Cloud & DevOps","QA & Testing","Blockchain Development","Game Development","IoT & Embedded Solutions","API Integration Services",
      ],
    },
    {
      label: "Specialized Solutions",
      items: [
        "AI Chatbot Development","AI & LLM Integrations","Trading Products","Fin Tech Solutions","LMS Development",
        "CMS Development","Gold & Commodities Platforms","Healthcare Solutions","Custom AI Automation","Data & Analytics Platforms",
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
    { label: "Fintech", Icon: Landmark, color: "#6366f1" },
    { label: "Healthcare", Icon: HeartPulse, color: "#e0775a" },
    { label: "E-commerce", Icon: ShoppingCart, color: "#d97706" },
    { label: "Logistics", Icon: Truck, color: "#a8763e" },
    { label: "Education", Icon: GraduationCap, color: "#818cf8" },
    { label: "Real Estate", Icon: HomeIcon, color: "#8b7355" },
  ];

  const stack = ["React","Node.js","Python","Flutter","PostgreSQL","AWS","Docker","GraphQL"];

  const testimonials = [
    { quote: "They shipped our claims portal in twelve weeks and it's been in production, untouched, for a year.", name: "Operations Director", company: "Regional Insurer", Icon: ShieldCheck, color: "#f2795a" },
    { quote: "The team writes code like they'll be the ones on call for it. Because they are.", name: "VP Engineering", company: "Logistics Platform", Icon: Truck, color: "#6366f1" },
    { quote: "We came in with a rough sketch. We left with an architecture doc, a working app, and a team that still answers our emails.", name: "Founder", company: "Healthtech Startup", Icon: HeartPulse, color: "#d97706" },
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
          --bc-base: #f8f6f2; --bc-panel: #ffffff; --bc-panel-2: #f2efe8; --bc-line: #e5e0d6; --bc-line-soft: #ece8de;
          --bc-text: #24211d; --bc-muted: #78716c; --bc-cyan: #4f46e5; --bc-amber: #b45309;
          --bc-nav-bg: rgba(255,255,255,0.85); --bc-btn-primary-text: #ffffff;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 6%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(36,33,29,0.05), 0 8px 24px -12px rgba(36,33,29,0.14);
          --bc-shadow-lg: 0 4px 6px rgba(36,33,29,0.04), 0 20px 40px -16px rgba(36,33,29,0.18);
        }
        [data-theme="dark"] {
          --bc-base: #17151f; --bc-panel: #1e1b2b; --bc-panel-2: #221f30; --bc-line: #342f47; --bc-line-soft: #2a2739;
          --bc-text: #eeecf5; --bc-muted: #9a94a8; --bc-cyan: #818cf8; --bc-amber: #f2a444;
          --bc-nav-bg: rgba(23,21,31,0.85); --bc-btn-primary-text: #15121f;
          --bc-band: color-mix(in srgb, var(--bc-cyan) 9%, var(--bc-base));
          --bc-shadow: 0 1px 2px rgba(0,0,0,0.25), 0 8px 24px -12px rgba(0,0,0,0.5);
          --bc-shadow-lg: 0 4px 6px rgba(0,0,0,0.25), 0 20px 45px -16px rgba(0,0,0,0.6);
        }
        .bc-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .bc-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-body { font-family: 'Inter', sans-serif; }
        .bc-loader-screen { position: fixed; top: 0; right: 0; bottom: 0; left: 0; margin: 0; padding: 0; box-sizing: border-box; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; background: var(--bc-base); transition: opacity 0.5s ease, visibility 0.5s ease; }
        .bc-loader-screen.bc-loader-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .bc-loader-mark { position: relative; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; }
        .bc-loader-ring { position: absolute; inset: 0; border-radius: 999px; border: 2.5px solid var(--bc-line); border-top-color: var(--bc-cyan); animation: bc-spin 0.9s linear infinite; }
        .bc-loader-square { width: 16px; height: 16px; border: 2.5px solid var(--bc-cyan); border-radius: 3px; animation: bc-loader-pulse 1.4s ease-in-out infinite; }
        @keyframes bc-spin { to { transform: rotate(360deg); } }
        @keyframes bc-loader-pulse { 0%, 100% { transform: scale(0.85); opacity: 0.6; } 50% { transform: scale(1.05); opacity: 1; } }
        .bc-loader-word { display: flex; align-items: baseline; gap: 2px; }
        .bc-loader-label { font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--bc-muted); }
        @media (prefers-reduced-motion: reduce) { .bc-loader-ring, .bc-loader-square { animation: none !important; } }
        .bc-page-content { opacity: 0; transform: translateY(6px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bc-page-content.bc-page-visible { opacity: 1; transform: translateY(0); }
        .bc-grid-bg { background: transparent; }
        .bc-card { background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow); transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; }
        .bc-card:hover { border-color: var(--bc-cyan); transform: translateY(-3px); box-shadow: var(--bc-shadow-lg); }
        .bc-btn-primary { background: var(--bc-cyan); color: var(--bc-btn-primary-text); box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); transition: filter 0.2s ease, transform 0.2s ease; }
        .bc-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .bc-btn-ghost { border: 1px solid var(--bc-line); color: var(--bc-text); transition: border-color 0.2s ease, background 0.2s ease; }
        .bc-btn-ghost:hover { border-color: var(--bc-cyan); background: color-mix(in srgb, var(--bc-cyan) 8%, transparent); }
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
        .bc-node-rect { filter: drop-shadow(0 3px 6px rgba(36,33,29,0.12)); }
        .bc-node { animation: bc-pulse-node 3s ease-in-out infinite; }
        .bc-marquee-track { display: flex; width: max-content; animation: bc-marquee 22s linear infinite; }
        @keyframes bc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bc-logo-strip { background: var(--bc-panel-2); border: 1px solid var(--bc-line); border-radius: 14px; }
        .bc-logo-item { color: var(--bc-muted); opacity: 0.75; transition: opacity 0.2s ease, color 0.2s ease; letter-spacing: 0.04em; }
        .bc-logo-item:hover { opacity: 1; color: var(--bc-text); }
        .bc-hero-media { position: relative; border-radius: 20px; overflow: hidden; box-shadow: var(--bc-shadow-lg); border: 1px solid var(--bc-line); aspect-ratio: 4 / 3.1; background: var(--bc-panel-2); }
        .bc-hero-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bc-hero-media-dots { position: absolute; top: 16px; right: 16px; width: 44px; height: 64px; background-image: radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px); background-size: 8px 8px; z-index: 2; }
        .bc-float-card { position: absolute; right: 20px; bottom: -34px; left: 20px; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 14px; box-shadow: var(--bc-shadow-lg); padding: 20px 22px; z-index: 2; }
        @media (min-width: 768px) { .bc-float-card { left: auto; width: 340px; right: -40px; bottom: -56px; } }
        .bc-check-row + .bc-check-row { margin-top: 14px; }
        .bc-check-dot { width: 22px; height: 22px; border-radius: 999px; background: var(--bc-cyan); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (prefers-reduced-motion: reduce) { .bc-flow-line, .bc-node, .bc-marquee-track { animation: none !important; } }
        .bc-tab-row { display: flex; gap: 40px; border-bottom: 1px solid var(--bc-line); }
        .bc-tab-btn { background: none; border: none; cursor: pointer; padding: 14px 2px; font-weight: 600; font-size: 0.95rem; color: var(--bc-muted); position: relative; transition: color 0.2s ease; }
        .bc-tab-btn.bc-tab-active { color: var(--bc-text); }
        .bc-tab-btn.bc-tab-active::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--bc-cyan); }
        .bc-product-item { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 600; font-size: 1.05rem; line-height: 1.35; color: var(--bc-text); }
        .bc-cta-banner { background: #1c1a2b; border-radius: 16px; color: #f1f0ee; }
        [data-theme="dark"] .bc-cta-banner { background: var(--bc-panel-2); border: 1px solid var(--bc-line); }
        .bc-cta-highlight { background: var(--bc-cyan); color: #15121f; padding: 0 4px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
        .bc-cta-btn { background: #ffffff; color: #1c1a2b; border-radius: 999px; font-weight: 600; padding: 12px 24px; white-space: nowrap; transition: transform 0.2s ease, filter 0.2s ease; }
        .bc-cta-btn:hover { transform: translateY(-1px); filter: brightness(0.96); }
        .bc-industry-underline { width: 46px; height: 3px; border-radius: 2px; background: var(--bc-cyan); }
        .bc-industry-card { background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 12px; padding: 18px 14px; box-shadow: var(--bc-shadow); transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
        .bc-industry-card:hover { transform: translateY(-3px); border-color: var(--bc-cyan); box-shadow: var(--bc-shadow-lg); }
        .bc-industry-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .bc-orbit-wrap { position: relative; width: 100%; max-width: 420px; aspect-ratio: 1 / 1; margin: 0 auto; }
        .bc-orbit-globe { position: absolute; inset: 15%; border-radius: 50%; }
        .bc-orbit-ring { position: absolute; inset: 2%; border-radius: 50%; border: 1px dashed var(--bc-line); }
        .bc-orbit-node { position: absolute; width: 58px; height: 58px; margin: -29px; border-radius: 50%; background: var(--bc-panel); border-width: 1.5px; border-style: solid; display: flex; align-items: center; justify-content: center; box-shadow: var(--bc-shadow); }
        .bc-orbit-dot { position: absolute; width: 6px; height: 6px; margin: -3px; border-radius: 50%; animation: bc-pulse-node 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .bc-orbit-dot { animation: none; } }
        .bc-underline-fade { width: 220px; max-width: 60%; height: 2px; background: linear-gradient(90deg, var(--bc-cyan), transparent); }
        .bc-testimonial-card { position: relative; background: var(--bc-panel); border: 1px solid var(--bc-line); border-radius: 16px; padding: 26px 24px 22px; box-shadow: var(--bc-shadow); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .bc-testimonial-card::after { content: ""; position: absolute; left: 16px; right: 16px; bottom: -1px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, transparent, var(--bc-tcolor, var(--bc-cyan)), transparent); opacity: 0.7; }
        .bc-testimonial-card:hover { transform: translateY(-3px); box-shadow: var(--bc-shadow-lg); }
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
        .bc-contact-input { width: 100%; background: var(--bc-panel-2); border: 1px solid var(--bc-line); border-radius: 10px; padding: 12px 40px 12px 14px; font-size: 0.9rem; outline: none; transition: border-color 0.2s ease; }
        .bc-contact-input:focus { border-color: var(--bc-cyan); }
        .bc-send-btn { width: 100%; border: none; border-radius: 10px; padding: 14px 20px; font-weight: 600; color: var(--bc-btn-primary-text); background: linear-gradient(90deg, var(--bc-cyan), color-mix(in srgb, var(--bc-cyan) 60%, #8b5cf6)); display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: filter 0.2s ease, transform 0.2s ease; }
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
  .bc-hero-stat-item { padding: 0 !important; }
  .bc-hero-stat-divider { display: none; }
}
        .bc-navbar-wrap { display: flex; justify-content: center; padding: 16px 20px 0; }
        .bc-navbar-row { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 920px; }
        .bc-navbar-pill { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; background: #1c1a2b; border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; padding: 10px 12px 10px 10px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25); }
        @media (min-width: 1024px) { .bc-navbar-pill { padding: 6px 8px 6px 6px; gap: 6px; } }
        .bc-navbar-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; text-decoration: none; }
        .bc-navbar-logo { width: 38px; height: 38px; flex-shrink: 0; border-radius: 999px; background: var(--bc-cyan); color: #ffffff; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; }
        .bc-navbar-name { color: #ffffff; font-weight: 700; font-size: 1rem; white-space: nowrap; }
        .bc-navbar-links { display: none; }
        @media (min-width: 1024px) { .bc-navbar-links { display: flex; align-items: center; gap: 18px; padding: 0 8px; flex: 1; min-width: 0; justify-content: center; } }
        .bc-navbar-link { color: rgba(241,240,238,0.68); font-size: 0.82rem; white-space: nowrap; text-decoration: none; transition: color 0.2s ease; flex-shrink: 0; }
        .bc-navbar-link:hover { color: #ffffff; }
        button.bc-navbar-link { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
        @media (min-width: 1024px) { .bc-navbar-link { font-size: 0.85rem; } }
        .bc-nav-dropdown-wrap { position: relative; flex-shrink: 0; }
        .bc-nav-dropdown-chevron { transition: transform 0.2s ease; }
        .bc-nav-dropdown-chevron-open, .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-chevron { transform: rotate(180deg); }
        .bc-nav-dropdown-panel { position: absolute; top: calc(100% + 16px); left: 50%; transform: translateX(-50%) translateY(6px); min-width: 220px; background: #1c1a2b; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 8px; box-shadow: 0 20px 45px -16px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease; z-index: 70; }
        .bc-nav-dropdown-wrap:hover .bc-nav-dropdown-panel, .bc-nav-dropdown-panel.bc-nav-dropdown-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
        .bc-nav-dropdown-item { display: flex; flex-direction: column; gap: 2px; padding: 9px 12px; border-radius: 9px; text-decoration: none; transition: background 0.15s ease; }
        .bc-nav-dropdown-item:hover { background: rgba(255,255,255,0.07); }
        .bc-nav-dropdown-item-label { color: #f1f0ee; font-size: 0.86rem; font-weight: 600; }
        .bc-nav-dropdown-item-desc { color: rgba(241,240,238,0.5); font-size: 0.74rem; }
        .bc-navbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
        .bc-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f0ee; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.2s ease; }
        .bc-navbar-theme-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
        .bc-navbar-cta { display: none; }
        @media (min-width: 1024px) { .bc-navbar-cta { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #1c1a2b; border-radius: 999px; padding: 9px 18px; font-weight: 600; font-size: 0.82rem; white-space: nowrap; text-decoration: none; flex-shrink: 0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s ease, filter 0.2s ease; } .bc-navbar-cta:hover { transform: translateY(-1px); filter: brightness(0.95); } }
        .bc-navbar-hamburger { display: flex; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f0ee; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
        @media (min-width: 1024px) { .bc-navbar-hamburger { display: none; } }
        .bc-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 90; opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s ease; }
        .bc-mobile-overlay.bc-mobile-open { opacity: 1; visibility: visible; }
        .bc-mobile-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 80%; max-width: 300px; background: #1c1a2b; z-index: 95; padding: 26px 22px; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
        .bc-mobile-panel.bc-mobile-open { transform: translateX(0); }
        @media (min-width: 1024px) { .bc-mobile-overlay, .bc-mobile-panel { display: none; } }
        .bc-mobile-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        .bc-mobile-close { width: 34px; height: 34px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #f1f0ee; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        .bc-mobile-link { color: #f1f0ee; font-size: 1rem; font-weight: 600; text-decoration: none; padding: 14px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; }
        .bc-mobile-sublink { color: rgba(241,240,238,0.68); font-size: 0.88rem; text-decoration: none; padding: 10px 4px 10px 14px; display: block; }
        .bc-mobile-cta { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: var(--bc-cyan, #4f46e5); color: #ffffff; border-radius: 999px; padding: 12px 20px; font-weight: 600; text-decoration: none; }
        .bc-footer-card { position: relative; overflow: hidden; border-radius: 24px; background: var(--bc-panel); border: 1px solid var(--bc-line); box-shadow: var(--bc-shadow-lg); }
        .bc-footer-decor-dots { position: absolute; bottom: 24px; right: 24px; width: 120px; height: 90px; background-image: radial-gradient(var(--bc-cyan) 1px, transparent 1px); background-size: 10px 10px; opacity: 0.25; pointer-events: none; }
        .bc-footer-decor-wave { position: absolute; top: 0; right: 0; width: 45%; max-width: 420px; height: auto; opacity: 0.35; pointer-events: none; }
        .bc-footer-underline { width: 40px; height: 3px; border-radius: 2px; background: var(--bc-cyan); margin: 14px 0 18px; }
        .bc-footer-social { width: 40px; height: 40px; border-radius: 10px; background: var(--bc-panel-2); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.2s ease, transform 0.2s ease; }
        .bc-footer-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px); }
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
        <div className="bc-loader-mark">
          <div className="bc-loader-ring" />
          <div className="bc-loader-square" />
        </div>
        <div className="bc-loader-word">
          <span className="bc-display font-bold text-lg" style={{ color: "var(--bc-text)" }}>Bluecode</span>
        </div>
        <div className="bc-loader-label bc-mono">Loading</div>
      </div>

      <div className={`bc-page-content ${!loading ? "bc-page-visible" : ""}`}>
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
                        <a
                          key={j}
                          href={sub.href}
                          className="bc-nav-dropdown-item"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="bc-nav-dropdown-item-label">{sub.label}</span>
                          {sub.desc && <span className="bc-nav-dropdown-item-desc">{sub.desc}</span>}
                        </a>
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

          <a href="#contact" className="bc-navbar-cta bc-body">
            Consultancy
          </a>
        </div>
      </div>

      <div
        className={`bc-mobile-overlay ${mobileMenuOpen ? "bc-mobile-open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`bc-mobile-panel ${mobileMenuOpen ? "bc-mobile-open" : ""}`}>
        <div className="bc-mobile-panel-header">
          <span className="bc-navbar-name bc-display">Bluecode</span>
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
              ) : (
                <a
                  href={item.href}
                  className="bc-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )}
              {item.dropdown &&
                item.dropdown.map((sub, j) => (
                  <a
                    key={j}
                    href={sub.href}
                    className="bc-mobile-sublink"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sub.label}
                  </a>
                ))}
            </div>
          ))}
        </div>
        <a
          href="#contact"
          className="bc-mobile-cta"
          onClick={() => setMobileMenuOpen(false)}
        >
          Consultancy
        </a>
      </div>

      <section id="home" className="bc-grid-bg relative overflow-hidden">
        <div className="bc-hero-decor-dots" />
        <svg className="bc-hero-wave" viewBox="0 0 300 120" fill="none">
          <path d="M0 90 C 60 60, 100 110, 160 80 S 260 40, 300 70" stroke="var(--bc-cyan)" strokeWidth="1" opacity="0.5" />
          <path d="M0 110 C 60 80, 100 130, 160 100 S 260 60, 300 90" stroke="var(--bc-cyan)" strokeWidth="1" opacity="0.3" />
        </svg>
        <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-14 md:pb-24 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="mb-6">
              <div className="bc-hero-badge-line1">Your Business</div>
              <div className="bc-hero-badge-line2">AI Powered IT Partner</div>
            </div>
            <h1 className="bc-display font-bold text-4xl md:text-5xl leading-tight mb-6">
              We build software
              <span style={{ color: "var(--bc-cyan)" }}> that grows with your business.</span>
            </h1>
            <p className="bc-body text-base md:text-lg mb-8" style={{ color: "var(--bc-muted)" }}>
              Bluecode partners with growing businesses to build custom software,
              web platforms, and mobile apps that stay reliable long after launch.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bc-btn-primary bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                Start a project <ArrowRight size={18} />
              </a>
              <a href="#projects" className="bc-btn-ghost bc-body font-semibold px-6 py-3 rounded flex items-center gap-2">
                See our work <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="bc-hero-stats-row">
              {heroStats.map((s, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="bc-hero-stat-divider" />}
                  <div className="bc-hero-stat-item">
                    <div className="bc-hero-stat-icon">
                      <s.Icon size={17} color="var(--bc-cyan)" />
                    </div>
                    <div>
                      <div className="bc-body font-bold text-sm leading-tight">{s.value}</div>
                      <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pb-24 md:pb-0 md:pr-8">
            <div className="bc-hero-media-wrap">
              <div className="bc-hero-blob" />
              <div className="bc-hero-media" style={{ position: "relative", zIndex: 1 }}>
                <div className="bc-hero-media-dots" />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Bluecode engineering team at work"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
            <div className="bc-float-card">
              {heroChecks.map((c, i) => (
                <div key={i} className="bc-float-row">
                  <div className="bc-float-row-icon">
                    <c.Icon size={17} color="var(--bc-cyan)" />
                  </div>
                  <div>
                    <div className="bc-body font-semibold text-sm leading-tight">{c.title}</div>
                    <div className="bc-body text-xs mt-0.5" style={{ color: "var(--bc-muted)" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
          <div className="bc-logo-strip px-6 md:px-10 py-6 md:py-7 overflow-hidden">
            <div className="bc-mono text-[0.68rem] tracking-widest uppercase mb-4 text-center md:text-left" style={{ color: "var(--bc-muted)" }}>
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

      <section style={{ background: "var(--bc-band)" }}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="bc-mono font-bold text-3xl md:text-4xl" style={{ color: "var(--bc-cyan)" }}>{s.value}</div>
              <div className="bc-body text-sm mt-1" style={{ color: "var(--bc-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="bc-mono bc-eyebrow mb-3">What we build</div>
        <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">
          Our Core <span style={{ color: "var(--bc-cyan)" }}>Products</span>
        </h2>
        <p className="bc-body max-w-2xl mb-8" style={{ color: "var(--bc-muted)" }}>
          Bluecode builds custom software and specialized digital products, standing
          among the teams businesses trust to power their next platform.
        </p>

        <div className="bc-tab-row mb-10">
          {productTabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveProductTab(i)}
              className={`bc-tab-btn ${activeProductTab === i ? "bc-tab-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {productTabs[activeProductTab].items.map((item, i) => (
            <div key={i} className="bc-product-item">
              {item}
            </div>
          ))}
        </div>

        <div className="bc-cta-banner mt-14 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="bc-display font-semibold text-xl md:text-2xl leading-snug max-w-xl">
            Choose from our core products{" "}
            <span className="bc-cta-highlight">to build the right solution for your business.</span>
          </p>
          <a href="#contact" className="bc-cta-btn flex-shrink-0">
            Talk to Our Experts
          </a>
        </div>
      </section>

      <section id="about" className="overflow-hidden" style={{ background: "var(--bc-band)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-14 items-center">
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
                <div key={i} className="bc-industry-card">
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
                  <ind.Icon size={22} color={ind.color} strokeWidth={1.75} />
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
      </section>

      <section id="projects" className="py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bc-mono bc-eyebrow mb-2">Tooling</div>
          <h2 className="bc-display font-bold text-2xl md:text-3xl">Our stack</h2>
        </div>
        <div className="bc-marquee-track">
          {[...stack, ...stack].map((t, i) => (
            <div key={i} className="bc-mono text-sm px-6 py-3 mx-2 rounded whitespace-nowrap" style={{ border: "1px solid var(--bc-line)", color: "var(--bc-text)" }}>
              {t}
            </div>
          ))}
        </div>
      </section>

      <section id="blogs" style={{ background: "var(--bc-band)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="bc-mono bc-eyebrow mb-3">In their words</div>
        <h2 className="bc-display font-bold text-3xl md:text-4xl mb-4">Clients</h2>
        <div className="bc-underline-fade mb-5" />
        <p className="bc-body mb-12" style={{ color: "var(--bc-muted)" }}>
          Trusted by teams building what's next.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bc-testimonial-card" style={{ "--bc-tcolor": t.color }}>
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

      <section id="contact">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-14">
          <div>
            <div className="bc-mono bc-eyebrow mb-3">Get in touch</div>
            <h2 className="bc-display font-bold text-3xl md:text-4xl mb-6">Tell us about the project</h2>
            <p className="bc-body mb-2" style={{ color: "var(--bc-muted)" }}>
              Send a short brief and we'll reply within one business day with next
              steps — <span className="bc-contact-highlight">no discovery-call runaround.</span>
            </p>
            <div className="bc-contact-divider" />
            <div>
              <div className="bc-contact-info-row">
                <div className="bc-contact-icon-circle">
                  <Mail size={18} color="var(--bc-cyan)" />
                </div>
                <div>
                  <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>Email</div>
                  <div className="bc-body font-semibold text-sm">hello@bluecode.dev</div>
                </div>
              </div>
              <div className="bc-contact-info-row">
                <div className="bc-contact-icon-circle">
                  <Phone size={18} color="var(--bc-cyan)" />
                </div>
                <div>
                  <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>Phone</div>
                  <div className="bc-body font-semibold text-sm">+92 300 0000000</div>
                </div>
              </div>
              <div className="bc-contact-info-row">
                <div className="bc-contact-icon-circle">
                  <MapPin size={18} color="var(--bc-cyan)" />
                </div>
                <div>
                  <div className="bc-body text-xs" style={{ color: "var(--bc-muted)" }}>Location</div>
                  <div className="bc-body font-semibold text-sm">Islamabad, Pakistan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bc-contact-form-card">
            {sent ? (
              <div className="bc-body text-sm">
                <p className="font-semibold mb-1" style={{ color: "var(--bc-cyan)" }}>Message sent.</p>
                <p style={{ color: "var(--bc-muted)" }}>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="bc-body font-semibold text-sm block mb-2">Name</label>
                  <div className="bc-input-wrap">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bc-contact-input bc-body"
                      placeholder="Your name"
                    />
                    <User size={16} className="bc-input-icon" />
                  </div>
                </div>
                <div>
                  <label className="bc-body font-semibold text-sm block mb-2">Email</label>
                  <div className="bc-input-wrap">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bc-contact-input bc-body"
                      placeholder="you@company.com"
                    />
                    <Mail size={16} className="bc-input-icon" />
                  </div>
                </div>
                <div>
                  <label className="bc-body font-semibold text-sm block mb-2">Project brief</label>
                  <div className="bc-input-wrap">
                    <textarea
                      required
                      rows={4}
                      value={form.brief}
                      onChange={(e) => setForm({ ...form, brief: e.target.value })}
                      className="bc-contact-input bc-body resize-none"
                      placeholder="What are you trying to build?"
                    />
                    <PenLine size={16} className="bc-input-icon bc-input-icon-area" />
                  </div>
                </div>
                <button type="submit" className="bc-send-btn">
                  Send message <Send size={16} />
                </button>
                <div className="bc-trust-line">
                  <ShieldCheck size={15} color="var(--bc-cyan)" />
                  We respect your privacy. Your information is safe with us.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{ background: "var(--bc-band)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="bc-footer-card p-8 md:p-12">
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
                  {["Custom Software", "Web Applications", "Mobile Apps", "Cloud & DevOps"].map((item, i) => (
                    <div key={i} className="bc-footer-item">
                      <ChevronRight size={14} color="var(--bc-cyan)" />
                      {item}
                    </div>
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
                    { label: "Our Work", href: "#projects" },
                    { label: "Industries", href: "#about" },
                    { label: "Clients", href: "#blogs" },
                    { label: "Contact", href: "#contact" },
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
    </div>
  );
}