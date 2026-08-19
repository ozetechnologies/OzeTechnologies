// ==========================================
// 1. IMPORTS & SETUP
// ==========================================
import Navbar from "./Navbar";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Heart,
  Users,
  ArrowUp,
} from "lucide-react";
 import contactHeroImg from "./assets/contact-hero.jpg";

// List of countries for the dropdown
const COUNTRIES = [
  "Pakistan", "United States", "United Kingdom", "Canada", "Australia",
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Germany", "France",
  "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Switzerland",
  "China", "Japan", "South Korea", "India", "Bangladesh", "Sri Lanka",
  "Singapore", "Malaysia", "Indonesia", "Turkey", "Egypt", "South Africa",
  "Nigeria", "Kenya", "Brazil", "Mexico", "Argentina", "New Zealand",
  "Ireland", "Belgium", "Austria", "Poland", "Russia", "Other",
];

// Reusable scroll-reveal hook (IntersectionObserver-based fade/slide-in)
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

// ==========================================
// 2. MAIN COMPONENT FUNCTION
// ==========================================
export default function ContactUs() {
  const [darkMode, setDarkMode] = useState(() => (localStorage.getItem("bc-theme") || "dark") === "dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    country: "",
    subject: "",
    message: "",
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  // ---- Track window resize for responsive behaviour ----
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---- Hero fade-up on load ----
  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ---- Scroll-reveal refs for below-the-fold sections ----
  const [cardRef, cardInView] = useReveal();
  const [mapRef, mapInView] = useReveal();
  const [footerRef, footerInView] = useReveal();

  // ---- Scroll progress bar + Back-to-top visibility ----
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

  // ---- Cursor glow: soft drifting glow that eases toward the mouse ----
  const cursorGlowRef = useRef(null);
  const cursorBRef = useRef(null);
const cursorRingRef = useRef(null);
const [cursorHover, setCursorHover] = useState(false);
  
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
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ---- Submit handler: builds a mailto: link so the user's default
  // email client opens with the form data pre-filled, then "sends" it ----
  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, emailAddress, phoneNumber, country, subject, message } = formData;

    const recipient = "hello@ozetechnologies.com";
    const mailSubject = subject && subject.trim() !== "" ? subject : "New Consultancy Inquiry";
    const mailBody =
      `Name: ${fullName}\n` +
      `Email: ${emailAddress}\n` +
      `Phone: ${phoneNumber}\n` +
      `Country: ${country}\n\n` +
      `Message:\n${message}`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;

    // Opens the user's default email app with everything pre-filled
    window.location.href = mailtoLink;

    setFormData({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      subject: "",
      message: "",
    });
  };

  // Dynamic Theme Palette based on State
  const theme = {
    pageBg: darkMode ? "#17151F" : "#FAFAF9",
    pageText: darkMode ? "#F5F5F4" : "#1C1917",
    cardBg: darkMode ? "#201D2E" : "#ffffff",
    cardBorder: darkMode ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid #E7E5E4",
    formBg: darkMode ? "#201D2E" : "#ffffff",
    formText: darkMode ? "#F5F5F4" : "#1C1917",
    inputBg: darkMode ? "#2A2539" : "#F5F5F4",
    inputBorder: darkMode ? "#322C47" : "#E7E5E4",
    inputText: darkMode ? "#F5F5F4" : "#1C1917",
    gridContainerBg: darkMode ? "#17151F" : "#F5F5F4",
    navBg: darkMode ? "rgba(23, 21, 31, 0.9)" : "rgba(250, 250, 249, 0.9)",
    navText: darkMode ? "#A8A29E" : "#78716C",
    navBorder: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    navLogo: darkMode ? "#ffffff" : "#1C1917",
    navBtnBg: darkMode ? "#ffffff" : "#1C1917",
    navBtnText: darkMode ? "#1C1917" : "#ffffff",
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: null, dropdown: true },
    { label: "Projects", to: null, dropdown: true },
    { label: "Services", to: "/services" },
    { label: "Blogs", to: "/blogs" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact", active: true },
  ];

  const inputStyle = {
    padding: "14px 16px",
    border: `1px solid ${theme.inputBorder}`,
    borderRadius: "8px",
    width: "100%",
    fontSize: "15px",
    backgroundColor: theme.inputBg,
    color: theme.inputText,
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: theme.pageBg,
        color: theme.pageText,
        paddingTop: "0px",
        transition: "all 0.3s ease",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes bc-fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bc-slideInLeft { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-slideInRight { 0% { opacity: 0; transform: translateX(40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes bc-scaleIn { 0% { opacity: 0; transform: scale(0.94); } 100% { opacity: 1; transform: scale(1); } }
        .bc-reveal { opacity: 0; }
        .bc-reveal.bc-in-view { animation: bc-fadeInUp 0.8s ease-out forwards; }
        .bc-reveal-left { opacity: 0; }
        .bc-reveal-left.bc-in-view { animation: bc-slideInLeft 0.8s ease-out forwards; }
        .bc-reveal-right { opacity: 0; }
        .bc-reveal-right.bc-in-view { animation: bc-slideInRight 0.8s ease-out forwards; }
        .bc-reveal-scale { opacity: 0; }
        .bc-reveal-scale.bc-in-view { animation: bc-scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) { .bc-reveal, .bc-reveal-left, .bc-reveal-right, .bc-reveal-scale { opacity: 1 !important; animation: none !important; } }

        .bc-card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .bc-card-hover:hover { transform: translateY(-6px); box-shadow: 0 30px 55px -18px rgba(99, 102, 241, 0.35); }

        .bc-submit-btn { transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease; }
        .bc-submit-btn:hover { transform: translateY(-2px) scale(1.05); filter: brightness(1.08); box-shadow: 0 12px 26px -8px rgba(99, 102, 241, 0.55); }

        .bc-input-glow { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .bc-input-glow:focus { border-color: #6366F1 !important; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18); }

        .bc-icon-hover { transition: transform 0.3s ease, color 0.3s ease; }
        .bc-icon-hover:hover { transform: scale(1.15) rotate(6deg); color: #818CF8 !important; }

        .bc-scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: #6366F1; z-index: 1100; transition: width 0.1s linear; }

        .bc-back-to-top { position: fixed; bottom: 28px; right: 28px; width: 46px; height: 46px; border-radius: 999px; background: #6366F1; color: #ffffff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 900; box-shadow: 0 10px 25px -8px rgba(99,102,241,0.6); opacity: 0; visibility: hidden; transform: translateY(12px) scale(0.9); transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease; }
        .bc-back-to-top.bc-back-to-top-visible { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
        .bc-back-to-top:hover { transform: translateY(-3px) scale(1.08); }

.bc-cursor-glow { position: fixed; top: 0; left: 0; width: 270px; height: 270px; margin: -160px 0 0 -160px; pointer-events: none; z-index: 5; opacity: 0; transition: opacity 0.6s ease; will-change: transform; }
        .bc-cursor-glow-layer { position: absolute; inset: 0; border-radius: 50%; filter: blur(60px); mix-blend-mode: screen; }
        .bc-cursor-glow-core { background: radial-gradient(circle at 60% 45%, rgba(99,102,241,0.5) 0%, transparent 60%); }
        .bc-cursor-glow-warm { background: radial-gradient(circle at 62% 55%, rgba(194,65,12,0.35) 0%, transparent 55%); }
        .bc-cursor-glow-soft { background: radial-gradient(circle at 60% 50%, rgba(99,102,241,0.18) 0%, transparent 70%); filter: blur(90px); }
       .bc-cursor-ring {
  width: 34px; height: 34px; border-radius: 999px; border: 1.5px solid #6366F1; position: fixed; top: 0; left: 0; z-index: 9998;
  pointer-events: none; opacity: 0.45; transition: transform 0.18s ease-out, width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease;
}
.bc-cursor-ring-hover { width: 58px; height: 58px; opacity: 0.9; background: rgba(99,102,241,0.12); }
.bc-cursor-b { position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; }
.bc-cursor-b-inner {
  display: flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; border-radius: 8px;
  background: #6366F1; color: #ffffff;
  font-weight: 700; font-size: 0.82rem; line-height: 1;
  box-shadow: 0 6px 16px -6px rgba(99,102,241,0.65), 0 1px 2px rgba(0,0,0,0.15);
  transform: translate(-50%, -50%) rotate(0deg) scale(1);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 0.3s ease, width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}
.bc-cursor-b-inner-hover {
  width: 40px; height: 40px; border-radius: 999px;
  transform: translate(-50%, -50%) rotate(-18deg) scale(1.15);
  box-shadow: 0 10px 26px -8px rgba(99,102,241,0.7), 0 2px 4px rgba(0,0,0,0.2);
}
@media (pointer: coarse) { .bc-cursor-b, .bc-cursor-ring { display: none; } }
@media (pointer: fine) { body { cursor: none; } }
        @media (hover: none), (pointer: coarse) { .bc-cursor-glow { display: none; } }
      `}</style>

      <div className="bc-scroll-progress" style={{ width: `${scrollProgress * 100}%` }} />
      <div ref={cursorGlowRef} className="bc-cursor-glow">
        <div className="bc-cursor-glow-layer bc-cursor-glow-soft" />
        <div className="bc-cursor-glow-layer bc-cursor-glow-core" />
        <div className="bc-cursor-glow-layer bc-cursor-glow-warm" />
      </div>
      <div ref={cursorRingRef} className={`bc-cursor-ring ${cursorHover ? "bc-cursor-ring-hover" : ""}`} />
<div ref={cursorBRef} className="bc-cursor-b">
  <span className={`bc-cursor-b-inner ${cursorHover ? "bc-cursor-b-inner-hover" : ""}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O</span>
</div>
      <button
        className={`bc-back-to-top ${showBackToTop ? "bc-back-to-top-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* -------------------------------------------------------------
          NAVBAR: Floating Capsule Design (Responsive)
          ------------------------------------------------------------- */}
    <Navbar theme={darkMode ? "dark" : "light"} toggleTheme={() => setDarkMode((prev) => { const newVal = !prev; localStorage.setItem("bc-theme", newVal ? "dark" : "light"); window.dispatchEvent(new Event("bc-theme-change")); return newVal; })} active="contact" />

{/* --- SECTION 1: HERO --- */}
<section
  style={{
    backgroundColor: theme.pageBg,
    padding: isMobile ? "130px 6% 50px" : "150px 8% 70px",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "36px" : "48px",
      alignItems: "center",
      maxWidth: "1240px",
      margin: "0 auto",
    }}
  >
    <div className={`bc-reveal ${pageLoaded ? "bc-in-view" : ""}`}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          border: `1px solid ${theme.navBorder}`,
          backgroundColor: theme.cardBg,
          borderRadius: "9999px",
          padding: "8px 18px 8px 14px",
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "24px",
        }}
      >
        <MessageSquare size={15} color="#6366F1" />
        Get In Touch
      </div>

      <h1
        style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: isMobile ? "32px" : "48px",
          lineHeight: "1.15",
          fontWeight: "800",
          marginBottom: "20px",
          wordBreak: "break-word",
        }}
      >
        Let's Build Something <span style={{ color: "#6366F1" }}>Great</span> Together.
      </h1>

      <p style={{ fontSize: isMobile ? "15px" : "17px", opacity: "0.75", lineHeight: "1.65", marginBottom: isMobile ? "24px" : "35px" }}>
        Have a question, a project in mind, or just want to say hello?
        We'd love to hear from you and build impactful solutions.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobile ? "20px" : "40px",
          borderTop: `1px solid ${theme.navBorder}`,
          paddingTop: "24px",
        }}
      >
        <div>
          <div style={{ fontSize: "26px", fontWeight: "800", color: "#6366F1" }}>24h</div>
          <div style={{ fontSize: "13px", opacity: "0.7" }}>Response Time</div>
        </div>
        <div>
          <div style={{ fontSize: "26px", fontWeight: "800", color: "#38bdf8" }}>120+</div>
          <div style={{ fontSize: "13px", opacity: "0.7" }}>Happy Clients</div>
        </div>
        <div>
          <div style={{ fontSize: "26px", fontWeight: "800", color: "#f2795a" }}>100%</div>
          <div style={{ fontSize: "13px", opacity: "0.7" }}>Response Rate</div>
        </div>
      </div>
    </div>

    <div className={`bc-reveal-right ${pageLoaded ? "bc-in-view" : ""}`}>
      <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 45px -16px rgba(0,0,0,0.25)" }}>
        <img src={contactHeroImg} alt="Contact our team" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  </div>
</section>
      {/* --- SECTION 2: CONTENT & FORM SPLIT CARD --- */}
      <div
        style={{
          backgroundColor: theme.gridContainerBg,
          padding: isMobile ? "36px 0" : "60px 0",
          transition: "all 0.3s ease",
        }}
      >
        <section
          ref={cardRef}
          className="bc-card-hover"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            maxWidth: "1140px",
            margin: isMobile ? "0 16px" : "0 auto",
            backgroundColor: theme.cardBg,
            borderRadius: "16px",
            border: theme.cardBorder,
            overflow: "hidden",
            boxShadow: darkMode
              ? "0 25px 50px -12px rgba(99, 102, 241, 0.15)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Info Panel */}
          <div
            className={`bc-reveal-left ${cardInView ? "bc-in-view" : ""}`}
            style={{
              backgroundColor: "#1E1B4B",
              color: "#ffffff",
              padding: isMobile ? "36px 24px" : "50px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: !isMobile && darkMode ? "1px solid rgba(99, 102, 241, 0.3)" : "none",
              borderBottom: isMobile && darkMode ? "1px solid rgba(99, 102, 241, 0.3)" : "none",
              boxSizing: "border-box",
            }}
          >
            <div>
              <h2 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "700", marginBottom: isMobile ? "24px" : "35px" }}>
                Get in touch
              </h2>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "26px" }}>
                <Mail size={22} className="bc-icon-hover" style={{ color: "#6366F1", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Email Us</span>
                  <span style={{ color: "#A8A29E", fontSize: "14px", lineHeight: "1.5" }}>hello@ozetechnologies.com</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "26px" }}>
                <Phone size={22} className="bc-icon-hover" style={{ color: "#6366F1", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Call Us</span>
                  <span style={{ color: "#A8A29E", fontSize: "14px", lineHeight: "1.5" }}>+1 (555) 123-4567</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "26px" }}>
                <MapPin size={22} className="bc-icon-hover" style={{ color: "#6366F1", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Visit Us</span>
                  <span style={{ color: "#A8A29E", fontSize: "14px", lineHeight: "1.5" }}>
                    123 Innovation Drive,<br />Suite 100,<br />San Francisco, CA 94103
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: isMobile ? "0" : "30px" }}>
                <Clock size={22} className="bc-icon-hover" style={{ color: "#6366F1", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Business Hours</span>
                  <span style={{ color: "#A8A29E", fontSize: "14px", lineHeight: "1.5" }}>
                    Monday – Friday<br />9:00 AM – 6:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <form
            className={`bc-reveal-right ${cardInView ? "bc-in-view" : ""}`}
            style={{
              backgroundColor: theme.formBg,
              padding: isMobile ? "32px 24px" : "50px 40px",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            onSubmit={handleSubmit}
          >
            <h2 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "700", marginBottom: isMobile ? "24px" : "35px", color: theme.formText }}>
              Send Us a Message
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                className="bc-input-glow"
                type="text"
                name="fullName"
                placeholder="Full Name"
                style={inputStyle}
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                className="bc-input-glow"
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                style={inputStyle}
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone Number + Country Dropdown */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                className="bc-input-glow"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                style={inputStyle}
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />

              <select
                className="bc-input-glow"
                name="country"
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  color: formData.country ? theme.inputText : (darkMode ? "#8A8698" : "#A8A29E"),
                }}
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <input
                className="bc-input-glow"
                type="text"
                name="subject"
                placeholder="Subject"
                style={inputStyle}
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <textarea
                className="bc-input-glow"
                name="message"
                placeholder="Your Message"
                style={{
                  ...inputStyle,
                  height: "140px",
                  resize: "none",
                }}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bc-submit-btn"
              style={{
                backgroundColor: darkMode ? "#ffffff" : "#1E1B4B",
                color: darkMode ? "#1E1B4B" : "#ffffff",
                padding: "14px 28px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: isMobile ? "100%" : "fit-content",
                transition: "all 0.2s ease",
              }}
            >
              Send Message <Send size={16} />
            </button>
          </form>
        </section>

        {/* --- SECTION 3: MAP BLOCK --- */}
        <div ref={mapRef} className={`bc-reveal ${mapInView ? "bc-in-view" : ""}`} style={{ maxWidth: "1140px", margin: isMobile ? "24px 16px 40px" : "40px auto 60px", padding: isMobile ? "0" : "0 20px" }}>
        <section
  className="bc-card-hover"
  style={{
    backgroundColor: "#1E1B4B",
    padding: isMobile ? "16px" : "24px",
    borderRadius: "16px",
    border: theme.cardBorder,
    color: "#ffffff",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  }}
>
  <div style={{ width: "100%", height: isMobile ? "320px" : "480px", borderRadius: "12px", overflow: "hidden" }}>
    <iframe
      title="Office Location Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086307432244!2d-122.40381628468205!3d37.77979697975878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2aae43a5c7%3A0xe54952ddc40049!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
      style={{ width: "100%", height: "100%", border: "0" }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>

  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      color: "#A8A29E",
      fontSize: isMobile ? "13px" : "15px",
      marginTop: isMobile ? "20px" : "24px",
      borderTop: "1px solid #374151",
      paddingTop: "20px",
      textAlign: "center",
      flexWrap: "wrap",
    }}
  >
    <span>We respond to every single message. Let's start the conversation.</span>
    <div style={{ display: "flex", gap: "12px", color: "#6366F1" }}>
      <MessageSquare size={16} className="bc-icon-hover" />
      <Heart size={16} className="bc-icon-hover" />
      <Users size={16} className="bc-icon-hover" />
    </div>
  </div>
</section>
        </div>
      </div>

     
     
    </div>
  );
}