import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hexagon, Mail, Phone, MapPin, Send, Palette } from "lucide-react";

// lucide-react removed brand/logo icons, so these are simple local SVG replacements.
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

// Same IntersectionObserver-based reveal-on-scroll hook used across the site.
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

// Quick Links shown in the footer. Edit hrefs/labels here if the site's nav changes.
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Our History", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerRef, footerInView] = useReveal();
const [theme, setThemeState] = useState(() => localStorage.getItem("bc-theme") || "light");

  useEffect(() => {
    const syncTheme = () => setThemeState(localStorage.getItem("bc-theme") || "light");
    window.addEventListener("bc-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener("bc-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);
  return (
 <footer ref={footerRef} data-theme={theme} style={{ background: "var(--bc-base)", color: "var(--bc-text)", borderTop: "1px solid var(--bc-line)" }}>
      <style>{`
        .pf-social { width: 38px; height: 38px; border-radius: 10px; background: var(--bc-panel); border: 1px solid var(--bc-line); display: flex; align-items: center; justify-content: center; transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; text-decoration: none; color: var(--bc-cyan); }
        .pf-social:hover { border-color: var(--bc-cyan); transform: translateY(-2px) rotate(10deg) scale(1.08); box-shadow: 0 10px 22px -8px color-mix(in srgb, var(--bc-cyan) 55%, transparent); }

        .pf-footer-link { color: var(--bc-muted); font-size: 0.88rem; text-decoration: none; transition: color 0.2s ease, transform 0.2s ease; display: block; }
        .pf-footer-link:hover { color: var(--bc-cyan); transform: translateX(3px); }
        .pf-footer-link + .pf-footer-link { margin-top: 10px; }
        .pf-footer-heading { color: var(--bc-cyan); font-weight: 700; font-size: 0.85rem; margin-bottom: 16px; }
        .pf-newsletter-input { flex: 1; border: 1px solid var(--bc-line); border-radius: 10px 0 0 10px; padding: 11px 14px; font-size: 0.85rem; outline: none; background: var(--bc-panel); color: var(--bc-text); transition: border-color 0.2s ease; }
        .pf-newsletter-input:focus { border-color: var(--bc-cyan); }
        .pf-newsletter-btn { border: none; background: var(--bc-cyan); color: var(--bc-btn-primary-text); padding: 0 16px; border-radius: 0 10px 10px 0; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: filter 0.2s ease, transform 0.2s ease; }
        .pf-newsletter-btn:hover { filter: brightness(1.1); transform: scale(1.05); }

        @keyframes pf-fadeInUp { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        .pf-reveal { opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease; transform: translateY(24px); }
        .pf-reveal.pf-in-view { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .pf-reveal { opacity: 1; transform: none !important; transition: none !important; } }
      `}</style>

      <div className={`max-w-7xl mx-auto px-6 pt-14 pb-8 pf-reveal ${footerInView ? "pf-in-view" : ""}`}>
        <div className="grid md:grid-cols-[1.3fr_0.8fr_0.9fr_0.9fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hexagon size={22} color="var(--bc-cyan)" fill="color-mix(in srgb, var(--bc-cyan) 18%, transparent)" />
              <span className="pf-display font-bold text-lg">Trikonix</span>
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
            {quickLinks.map((item, i) => (
              <Link key={i} to={item.href} className="pf-footer-link pf-body">{item.label}</Link>
            ))}
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
              <Mail size={14} color="var(--bc-cyan)" /> hello@Trikonix.dev
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
              <form className="flex" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
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
          © 2026 Trikonix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}