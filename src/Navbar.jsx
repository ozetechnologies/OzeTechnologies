import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X, Sun, Moon } from "lucide-react";
import ozeLogo from "./assets/oze-icon-logo-themed.png";
/**
 * Shared Navbar — used on every page so the site has one consistent nav.
 *
 * Props:
 *  - theme: "light" | "dark"
 *  - toggleTheme: () => void
 *  - active: which nav key should be highlighted (e.g. "home", "services", "products", "portfolio", "about", "contact")
 */
export default function Navbar({ theme = "light", toggleTheme, active = "" }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);

  const cyan = theme === "dark" ? "#818CF8" : "#6366F1";

  useEffect(() => {
    if (!openDropdown) return;
    const closeIt = () => {
      setOpenDropdown(null);
      setOpenSubmenu(null);
    };
    window.addEventListener("click", closeIt);
    return () => window.removeEventListener("click", closeIt);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { key: "services", label: "Services", href: "/services", isRoute: true },
    {
      key: "products",
      label: "Products",
      dropdown: [
        {
          label: "Gold Industry ERP",
          children: [
            { label: "Gold Laboratory Software", href: "/products/gold-laboratory-software" },
            { label: "Blinko Jewelry Management Software", href: "/products/blinko-jewelry-management-software" },
            { label: "Karkhana Software", href: "/products/karkhana-software" },
          ],
        },
        {
          label: "Stock Handler ERP",
          children: [
            { label: "Stock Handler Pro", href: "/products/stock-handler-pro" },
          ],
        },
      ],
    },
    { key: "portfolio", label: "Portfolio", href: "/portfolio", isRoute: true },
    {
      key: "insights",
      label: "Insights",
      dropdown: [
        { label: "Blogs", href: "/blogs" },
      ],
    },
    { key: "about", label: "About Us", href: "/our-history", isRoute: true },
    { key: "contact", label: "Contact", href: "/contact", isRoute: true },
  ];

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setOpenSubmenu(null);
  };

  return (
    <>
      <style>{`
        .bc-shared-navbar-wrap { display: flex; justify-content: center; padding: 16px 20px 0; }
        .bc-shared-navbar-row { display: flex; align-items: center; gap: 12px; width: 100%; max-width: 920px; }
        .bc-shared-navbar-pill { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; background: #18152A; border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; padding: 10px 12px 10px 10px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25); }
        @media (min-width: 1024px) { .bc-shared-navbar-pill { padding: 6px 8px 6px 6px; gap: 6px; } }
        .bc-shared-navbar-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; text-decoration: none; }
        .bc-shared-navbar-logo { width: 38px; height: 38px; flex-shrink: 0; border-radius: 999px; color: #1E1B4B; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-shared-navbar-name { color: #ffffff; font-weight: 700; font-size: 1rem; white-space: nowrap; font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .bc-shared-navbar-links { display: none; }
        @media (min-width: 1024px) { .bc-shared-navbar-links { display: flex; align-items: center; gap: 18px; padding: 0 8px; flex: 1; min-width: 0; justify-content: center; } }
        .bc-shared-navbar-link { position: relative; color: rgba(241,245,249,0.68); font-size: 0.82rem; white-space: nowrap; text-decoration: none; transition: color 0.3s ease; flex-shrink: 0; font-family: 'Inter', sans-serif; }
        button.bc-shared-navbar-link { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
        .bc-shared-navbar-link:hover { color: #ffffff; }
        .bc-shared-navbar-link-active { color: #ffffff; }
        .bc-shared-nav-dropdown-wrap { position: relative; flex-shrink: 0; }
        .bc-shared-nav-dropdown-chevron { transition: transform 0.2s ease; }
        .bc-shared-nav-dropdown-chevron-open, .bc-shared-nav-dropdown-wrap:hover .bc-shared-nav-dropdown-chevron { transform: rotate(180deg); }
        .bc-shared-nav-dropdown-panel { position: absolute; top: calc(100% + 16px); left: 50%; transform: translateX(-50%) translateY(6px); min-width: 220px; background: #18152A; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 8px; box-shadow: 0 20px 45px -16px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease; z-index: 70; }
        .bc-shared-nav-dropdown-wrap:hover .bc-shared-nav-dropdown-panel, .bc-shared-nav-dropdown-panel.bc-shared-nav-dropdown-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
        .bc-shared-nav-dropdown-wrap::after { content: ""; position: absolute; top: 100%; left: -20px; right: -20px; height: 20px; }
        .bc-shared-nav-dropdown-item { display: flex; flex-direction: column; gap: 2px; padding: 9px 12px; border-radius: 9px; text-decoration: none; transition: background 0.15s ease; }
        .bc-shared-nav-dropdown-item:hover { background: rgba(255,255,255,0.07); }
        .bc-shared-nav-dropdown-item-label { color: #F5F5F4; font-size: 0.86rem; font-weight: 600; font-family: 'Inter', sans-serif; }
        .bc-shared-nav-dropdown-item-desc { color: rgba(241,245,249,0.5); font-size: 0.74rem; font-family: 'Inter', sans-serif; }

        /* Nested category (2-level) dropdown */
        .bc-shared-nav-dropdown-category { position: relative; }
        .bc-shared-nav-dropdown-category-trigger { flex-direction: row; align-items: center; justify-content: space-between; cursor: pointer; gap: 10px; }
        .bc-shared-nav-dropdown-category-trigger svg { color: rgba(241,245,249,0.45); flex-shrink: 0; transition: transform 0.15s ease, color 0.15s ease; }
        .bc-shared-nav-dropdown-category:hover .bc-shared-nav-dropdown-category-trigger svg,
        .bc-shared-nav-dropdown-category.bc-shared-nav-dropdown-category-open .bc-shared-nav-dropdown-category-trigger svg { color: #ffffff; transform: translateX(2px); }
        .bc-shared-nav-dropdown-submenu { position: absolute; top: -8px; left: calc(100% + 10px); min-width: 240px; background: #18152A; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 8px; box-shadow: 0 20px 45px -16px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3); opacity: 0; visibility: hidden; pointer-events: none; transform: translateX(6px); transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease; z-index: 80; }
        .bc-shared-nav-dropdown-category:hover .bc-shared-nav-dropdown-submenu,
        .bc-shared-nav-dropdown-submenu.bc-shared-nav-dropdown-submenu-open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(0); }
        .bc-shared-nav-dropdown-category::after { content: ""; position: absolute; top: 0; left: 100%; width: 12px; height: 100%; }

        .bc-shared-navbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: auto; }
        .bc-shared-navbar-theme-btn { width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, transform 0.2s ease; cursor: pointer; }
        .bc-shared-navbar-theme-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
        .bc-shared-navbar-hamburger { display: flex; width: 36px; height: 36px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
        @media (min-width: 1024px) { .bc-shared-navbar-hamburger { display: none; } }
        .bc-shared-mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 90; opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s ease; }
        .bc-shared-mobile-overlay.bc-shared-mobile-open { opacity: 1; visibility: visible; }
        .bc-shared-mobile-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 80%; max-width: 300px; background: #18152A; z-index: 95; padding: 26px 22px; transform: translateX(100%); transition: transform 0.3s ease; overflow-y: auto; display: flex; flex-direction: column; }
        .bc-shared-mobile-panel.bc-shared-mobile-open { transform: translateX(0); }
        @media (min-width: 1024px) { .bc-shared-mobile-overlay, .bc-shared-mobile-panel { display: none; } }
        .bc-shared-mobile-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        .bc-shared-mobile-close { width: 34px; height: 34px; border-radius: 999px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: #F5F5F4; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        .bc-shared-mobile-link { color: #F5F5F4; font-size: 1rem; font-weight: 600; text-decoration: none; padding: 14px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); display: block; font-family: 'Inter', sans-serif; }
        .bc-shared-mobile-sublink { color: rgba(241,245,249,0.68); font-size: 0.88rem; text-decoration: none; padding: 10px 4px 10px 14px; display: block; font-family: 'Inter', sans-serif; }
        .bc-shared-mobile-category-trigger { display: flex; align-items: center; justify-content: space-between; width: 100%; background: none; border: none; text-align: left; color: rgba(241,245,249,0.85); font-size: 0.9rem; font-weight: 600; padding: 10px 4px 10px 14px; font-family: 'Inter', sans-serif; cursor: pointer; }
        .bc-shared-mobile-category-trigger svg { transition: transform 0.2s ease; color: rgba(241,245,249,0.5); flex-shrink: 0; }
        .bc-shared-mobile-category-trigger.bc-shared-mobile-category-open svg { transform: rotate(90deg); }
        .bc-shared-mobile-subsublink { color: rgba(241,245,249,0.55); font-size: 0.83rem; text-decoration: none; padding: 9px 4px 9px 30px; display: block; font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="bc-shared-navbar-wrap sticky top-0 z-50">
        <div className="bc-shared-navbar-row">
          <div className="bc-shared-navbar-pill">
            <Link to="/" className="bc-shared-navbar-brand">
        <img src={ozeLogo} alt="OZE Technologies" className="bc-shared-navbar-logo" style={{ objectFit: "contain" }} />
              <span className="bc-shared-navbar-name">OZE Technologies</span>
            </Link>

            <nav className="bc-shared-navbar-links">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.key}
                    className="bc-shared-nav-dropdown-wrap"
                    onMouseEnter={() => setOpenDropdown(item.key)}
                    onMouseLeave={() => {
                      setOpenDropdown(null);
                      setOpenSubmenu(null);
                    }}
                  >
                    <button
                      type="button"
                      className={`bc-shared-navbar-link ${active === item.key ? "bc-shared-navbar-link-active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown((cur) => (cur === item.key ? null : item.key));
                      }}
                      aria-expanded={openDropdown === item.key}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`bc-shared-nav-dropdown-chevron ${openDropdown === item.key ? "bc-shared-nav-dropdown-chevron-open" : ""}`}
                      />
                    </button>
                    <div className={`bc-shared-nav-dropdown-panel ${openDropdown === item.key ? "bc-shared-nav-dropdown-open" : ""}`}>
                      {item.dropdown.map((sub, j) =>
                        sub.children ? (
                          <div
                            key={j}
                            className={`bc-shared-nav-dropdown-category ${openSubmenu === sub.label ? "bc-shared-nav-dropdown-category-open" : ""}`}
                            onMouseEnter={() => setOpenSubmenu(sub.label)}
                            onMouseLeave={() => setOpenSubmenu(null)}
                          >
                            <div
                              className="bc-shared-nav-dropdown-item bc-shared-nav-dropdown-category-trigger"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSubmenu((cur) => (cur === sub.label ? null : sub.label));
                              }}
                            >
                              <span className="bc-shared-nav-dropdown-item-label">{sub.label}</span>
                              <ChevronRight size={13} />
                            </div>
                            <div
                              className={`bc-shared-nav-dropdown-submenu ${openSubmenu === sub.label ? "bc-shared-nav-dropdown-submenu-open" : ""}`}
                            >
                              {sub.children.map((child, k) => (
                                <Link
                                  key={k}
                                  to={child.href}
                                  className="bc-shared-nav-dropdown-item"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setOpenSubmenu(null);
                                  }}
                                >
                                  <span className="bc-shared-nav-dropdown-item-label">{child.label}</span>
                                  {child.desc && <span className="bc-shared-nav-dropdown-item-desc">{child.desc}</span>}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={j}
                            to={sub.href}
                            className="bc-shared-nav-dropdown-item"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="bc-shared-nav-dropdown-item-label">{sub.label}</span>
                            {sub.desc && <span className="bc-shared-nav-dropdown-item-desc">{sub.desc}</span>}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={`bc-shared-navbar-link ${active === item.key ? "bc-shared-navbar-link-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="bc-shared-navbar-right">
              <button onClick={toggleTheme} className="bc-shared-navbar-theme-btn" aria-label="Toggle theme">
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
              </button>
              <button className="bc-shared-navbar-hamburger" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`bc-shared-mobile-overlay ${mobileMenuOpen ? "bc-shared-mobile-open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`bc-shared-mobile-panel ${mobileMenuOpen ? "bc-shared-mobile-open" : ""}`}>
        <div className="bc-shared-mobile-panel-header">
          <span className="bc-shared-navbar-name">OZE Technologies</span>
          <button className="bc-shared-mobile-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={17} />
          </button>
        </div>
        <div>
          {navItems.map((item) => (
            <div key={item.key}>
              {item.dropdown ? (
                <>
                  <span className="bc-shared-mobile-link" style={{ opacity: 0.6, cursor: "default" }}>{item.label}</span>
                  {item.dropdown.map((sub, j) =>
                    sub.children ? (
                      <div key={j}>
                        <button
                          type="button"
                          className={`bc-shared-mobile-category-trigger ${mobileOpenCategory === sub.label ? "bc-shared-mobile-category-open" : ""}`}
                          onClick={() => setMobileOpenCategory((cur) => (cur === sub.label ? null : sub.label))}
                        >
                          {sub.label}
                          <ChevronRight size={14} />
                        </button>
                        {mobileOpenCategory === sub.label &&
                          sub.children.map((child, k) => (
                            <Link
                              key={k}
                              to={child.href}
                              className="bc-shared-mobile-subsublink"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileOpenCategory(null);
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                      </div>
                    ) : (
                      <Link key={j} to={sub.href} className="bc-shared-mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                        {sub.label}
                      </Link>
                    )
                  )}
                </>
              ) : (
                <Link to={item.href} className="bc-shared-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}