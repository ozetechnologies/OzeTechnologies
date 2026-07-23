// ==========================================
// 1. IMPORTS & SETUP
// ==========================================
import React, { useState, useEffect } from "react";
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
} from "lucide-react";

// ==========================================
// 2. MAIN COMPONENT FUNCTION
// ==========================================
export default function ContactUs() {
  const [darkMode, setDarkMode] = useState(true); // Default mode: Dark
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    subject: "",
    message: "",
  });

  // ---- Track window resize for responsive behaviour ----
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ fullName: "", emailAddress: "", subject: "", message: "" });
  };

  // Dynamic Theme Palette based on State
  const theme = {
    pageBg: darkMode ? "#0f172a" : "#ffffff",
    pageText: darkMode ? "#f8fafc" : "#1f2937",
    cardBg: darkMode ? "#1e293b" : "#ffffff",
    cardBorder: darkMode ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid transparent",
    formBg: darkMode ? "#1e293b" : "#ffffff",
    formText: darkMode ? "#f8fafc" : "#111827",
    inputBg: darkMode ? "#334155" : "#f9fafb",
    inputBorder: darkMode ? "#475569" : "#e5e7eb",
    inputText: darkMode ? "#ffffff" : "#1f2937",
    gridContainerBg: darkMode ? "#0f172a" : "#f9fafb",
    navBg: darkMode ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)",
    navText: darkMode ? "#9ca3af" : "#4b5563",
    navBorder: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    navLogo: darkMode ? "#ffffff" : "#0f172a",
    navBtnBg: darkMode ? "#ffffff" : "#0f172a",
    navBtnText: darkMode ? "#0f172a" : "#ffffff",
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: null, dropdown: true },
    { label: "Projects", to: null, dropdown: true },
    { label: "Services", to: "/services" },
    { label: "Blogs", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact", active: true },
  ];

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
      {/* -------------------------------------------------------------
          NAVBAR: Floating Capsule Design (Responsive)
          ------------------------------------------------------------- */}
      <div
        style={{
          position: "fixed",
          top: isMobile ? "16px" : "24px",
          left: "0",
          right: "0",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : "0 24px",
        }}
      >
        <nav
          style={{
            backdropFilter: "blur(12px)",
            backgroundColor: theme.navBg,
            border: `1px solid ${theme.navBorder}`,
            borderRadius: isMobile && mobileMenuOpen ? "24px" : "9999px",
            display: "flex",
            flexDirection: "column",
            padding: isMobile ? "10px 18px" : "12px 32px",
            width: "100%",
            maxWidth: "1140px",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Top Row: Logo + (Desktop Links) + Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                color: theme.navLogo,
                textDecoration: "none",
                fontSize: isMobile ? "17px" : "20px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  backgroundColor: "#10B981",
                  color: "white",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  marginRight: "10px",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                B
              </span>
              BLUECODE<span style={{ color: "#10B981" }}>.</span>
            </Link>

            {/* Center Links - Desktop / Tablet only */}
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isTablet ? "14px" : "28px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div
                      key={link.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: theme.navText,
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {link.label} <ChevronDown size={14} />
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      style={{
                        color: link.active ? "#10B981" : theme.navText,
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: link.active ? "600" : "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Right Action & Theme Toggle Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px" }}>
              <button
                onClick={() => setDarkMode(!darkMode)}
                type="button"
                style={{
                  background: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: darkMode ? "#E5E7EB" : "#1f2937",
                  fontSize: "18px",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              {!isMobile && (
                <button
                  style={{
                    backgroundColor: theme.navBtnBg,
                    color: theme.navBtnText,
                    border: "none",
                    borderRadius: "9999px",
                    padding: isTablet ? "10px 16px" : "10px 22px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  Consultancy
                </button>
              )}

              {/* Hamburger toggle - Mobile only */}
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  type="button"
                  style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#10B981",
                    flexShrink: 0,
                  }}
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobile && mobileMenuOpen && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
                marginTop: "14px",
                paddingTop: "14px",
                borderTop: `1px solid ${theme.navBorder}`,
              }}
            >
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: theme.navText,
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "500",
                      padding: "10px 6px",
                    }}
                  >
                    {link.label} <ChevronDown size={14} />
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      color: link.active ? "#10B981" : theme.navText,
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: link.active ? "600" : "500",
                      padding: "10px 6px",
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button
                style={{
                  backgroundColor: theme.navBtnBg,
                  color: theme.navBtnText,
                  border: "none",
                  borderRadius: "9999px",
                  padding: "12px 22px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginTop: "8px",
                  width: "100%",
                }}
              >
                Consultancy
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* --- SECTION 1: HERO OVERLAY --- */}
      <section
        style={{
          minHeight: isMobile ? "auto" : "380px",
          height: isMobile ? "auto" : "55vh",
          position: "relative",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          color: "#ffffff",
          padding: isMobile ? "130px 6% 50px" : "120px 8% 40px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "750px" }}>
          <span
            style={{
              color: "#10B981",
              fontWeight: "600",
              textTransform: "uppercase",
              fontSize: "13px",
              letterSpacing: "1px",
              marginBottom: "12px",
              display: "block",
            }}
          >
            Contact Us
          </span>
          <h1
            style={{
              fontSize: isMobile ? "30px" : "46px",
              lineHeight: "1.25",
              fontWeight: "800",
              marginBottom: "15px",
              wordBreak: "break-word",
            }}
          >
            Let's Build Something <span style={{ color: "#10B981" }}>Great</span> Together.
          </h1>
          <p style={{ fontSize: isMobile ? "15px" : "18px", opacity: "0.9", lineHeight: "1.6" }}>
            Have a question, a project in mind, or just want to say hello?
            We'd love to hear from you and build impactful solutions.
          </p>
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
              ? "0 25px 50px -12px rgba(16, 185, 129, 0.15)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Info Panel */}
          <div
            style={{
              backgroundColor: "#111827",
              color: "#ffffff",
              padding: isMobile ? "36px 24px" : "50px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: !isMobile && darkMode ? "1px solid rgba(16, 185, 129, 0.3)" : "none",
              borderBottom: isMobile && darkMode ? "1px solid rgba(16, 185, 129, 0.3)" : "none",
              boxSizing: "border-box",
            }}
          >
            <div>
              <h2 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "700", marginBottom: isMobile ? "24px" : "35px" }}>
                Get in touch
              </h2>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "26px" }}>
                <Mail size={22} style={{ color: "#10B981", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Email Us</span>
                  <span style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.5" }}>hello@bluecode.com</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "26px" }}>
                <Phone size={22} style={{ color: "#10B981", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Call Us</span>
                  <span style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.5" }}>+1 (555) 123-4567</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "26px" }}>
                <MapPin size={22} style={{ color: "#10B981", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Visit Us</span>
                  <span style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.5" }}>
                    123 Innovation Drive,<br />Suite 100,<br />San Francisco, CA 94103
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: isMobile ? "0" : "30px" }}>
                <Clock size={22} style={{ color: "#10B981", marginTop: "4px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: "600", display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "4px" }}>Business Hours</span>
                  <span style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.5" }}>
                    Monday – Friday<br />9:00 AM – 6:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <form
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
                type="text"
                name="fullName"
                placeholder="Full Name"
                style={{
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
                }}
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                style={{
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
                }}
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                style={{
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
                }}
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <textarea
                name="message"
                placeholder="Your Message"
                style={{
                  padding: "14px 16px",
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: "8px",
                  width: "100%",
                  fontSize: "15px",
                  backgroundColor: theme.inputBg,
                  color: theme.inputText,
                  height: "140px",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease",
                }}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: darkMode ? "#ffffff" : "#111827",
                color: darkMode ? "#111827" : "#ffffff",
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
        <div style={{ maxWidth: "1140px", margin: isMobile ? "24px 16px 40px" : "40px auto 60px", padding: isMobile ? "0" : "0 20px" }}>
          <section
            style={{
              backgroundColor: "#111827",
              padding: isMobile ? "28px 20px" : "40px",
              borderRadius: "16px",
              border: theme.cardBorder,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
              flexWrap: "wrap",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
          >
            <div style={{ flex: "1", minWidth: isMobile ? "100%" : "280px" }}>
              <h2 style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: "800", marginBottom: "15px", lineHeight: "1.2" }}>
                Let's Connect and Create <span style={{ color: "#10B981" }}>Impact.</span>
              </h2>
              <p style={{ fontSize: "15px", color: "#9CA3AF", lineHeight: "1.6" }}>
                We're always open to new ideas, strategic partnerships, and exciting digital innovations. Drop by our office or connect digitally!
              </p>
            </div>

            <div style={{ flex: "1.5", minWidth: isMobile ? "100%" : "320px", height: isMobile ? "220px" : "260px", borderRadius: "12px", overflow: "hidden" }}>
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
                color: "#9CA3AF",
                fontSize: isMobile ? "13px" : "15px",
                marginTop: isMobile ? "20px" : "30px",
                borderTop: "1px solid #374151",
                paddingTop: "20px",
                textAlign: "center",
                flexWrap: "wrap",
              }}
            >
              <span>We respond to every single message. Let's start the conversation.</span>
              <div style={{ display: "flex", gap: "12px", color: "#10B981" }}>
                <MessageSquare size={16} />
                <Heart size={16} />
                <Users size={16} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer
        style={{
          backgroundColor: "#111827",
          color: "#9CA3AF",
          padding: "30px 5%",
          textAlign: "center",
          fontSize: "14px",
          borderTop: "1px solid #1F2937",
        }}
      >
        <p>&copy; 2026 BLUECODE Landing Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}