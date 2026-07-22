import React, { useState, useEffect } from "react"; // 1. useEffect import kiya
import { Link } from "react-router-dom";
import { 
  Calendar, Clock, ArrowUpRight, Mail, Sparkles, LayoutGrid, CheckCircle, 
  Code2, Layers, Smartphone, Menu, X, Sun, Moon, ChevronDown 
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

export default function Blogs() {
  const [theme, setTheme] = useState("dark"); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // 2. Yeh Hook aapke global custom CSS variables ko control karega
  useEffect(() => {
    const root = document.documentElement;
    
    // Agar aapka CSS [data-theme="dark"] use karta hai:
    root.setAttribute("data-theme", theme);
    
    // Agar aapka Tailwind / CSS .dark class use karta hai, toh yeh bhi safe side add kar dete hain:
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

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
    <div className="w-full min-h-screen bc-body" style={{ background: "var(--bc-base)", color: "var(--bc-text)" }}>
      
      {/* ==========================================
          EXACT DESIGN PILL NAVBAR
         ========================================== */}
      <header className="w-full sticky top-0 z-50 px-4 md:px-8 pt-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-[#0b1329] text-white px-4 md:px-6 py-3 rounded-full shadow-xl border border-slate-800">
          
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-base shadow-sm">
              B
            </span>
            <span className="font-bold tracking-wide text-lg text-white">
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
                  <button type="button" className="text-[14px] font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors">
                    {item.label} <ChevronDown size={14} className="opacity-70" />
                  </button>
                  
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-xl p-2 bg-[#0b1329] border border-slate-800 shadow-2xl flex flex-col gap-1 z-50">
                      {item.dropdown.map((sub, si) => (
                        <a key={si} href={sub.href} className="px-3 py-2 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors block text-left">
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={i} to={item.href} className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors text-[#00a884]"
            >
              {/* Icon conditional toggle fix: Light state me Moon dikhega taaki click krke dark ho sake */}
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-300 hover:text-white">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1329] p-6 flex flex-col gap-4 text-white w-64 right-0 top-0 bottom-0 border-l border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto mt-2">
            {navItems.map((item, i) => (
              <Link key={i} to={item.isRoute ? item.href : "#"} onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 text-slate-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          1. DYNAMIC HERO SECTION
         ========================================== */}
      <section className="relative w-full overflow-hidden py-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
               style={{ background: "linear-gradient(135deg, #060c17 0%, #0a1424 100%)", borderBottom: "1px solid var(--bc-line)" }}>
        
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #00a884 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-xl flex-1">
          <span className="font-bold text-xs uppercase tracking-widest block mb-4 text-[#00a884]">
            OUR BLOG
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-6 text-white">
            Ideas.<br />
            Insights.<br />
            <span className="text-[#00a884]">Inspiration.</span>
          </h1>
          <p className="text-sm md:text-base mb-8 max-w-md opacity-90 text-slate-300">
            Explore articles, guides, and stories to fuel ideas and drive success in modern engineering realms.
          </p>
          <button className="bg-[#00a884] hover:bg-[#008f70] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm transition-all duration-200 shadow-md">
            Explore Articles <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="relative z-10 flex-1 w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=800" 
            alt="Modern Office Setup" 
            className="w-full h-full object-cover brightness-95"
          />
        </div>
      </section>

      {/* ==========================================
          2. FEATURED ARTICLE SECTION 
         ========================================== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <span className="text-xs font-bold tracking-widest block mb-3 text-[#00a884]">FEATURED ARTICLE</span>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-4">
          <div className="flex-1">
            <h2 className="bc-display text-2xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--bc-text)" }}>
              The Future of Digital Innovation
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--bc-muted)" }}>
              How businesses are leveraging next-gen cloud structures, robust automation patterns, and modular software designs to create deep operational impact and build lasting customer pipelines.
            </p>
            <a href="#read" className="inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-200 text-[#00a884] hover:text-[#008f70]">
              Read More <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="flex-1 relative w-full">
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden p-0 shadow-lg bc-card">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" 
                alt="Architecture Setup" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border"
                 style={{ background: "var(--bc-card)", borderColor: "#00a884" }}>
              <CheckCircle size={20} className="text-[#00a884]" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. LATEST ARTICLES GRID 
         ========================================== */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t" style={{ borderColor: "var(--bc-line)" }}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest block mb-2 text-[#00a884]">LATEST ARTICLES</span>
            <h2 className="bc-display text-2xl md:text-3xl font-bold" style={{ color: "var(--bc-text)" }}>Fresh Reads</h2>
          </div>
          <button className="bc-btn-ghost px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors">
            View All Articles <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LATEST_POSTS.map((post) => (
            <article key={post.id} className="bc-card rounded-2xl overflow-hidden flex flex-col h-full shadow-lg">
              <div className="w-full aspect-[16/10] overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase block mb-3 text-[#00a884]">
                    {post.category}
                  </span>
                  <h3 className="bc-display text-lg font-bold tracking-tight mb-4 leading-snug" style={{ color: "var(--bc-text)" }}>
                    {post.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t text-xs" style={{ borderColor: "var(--bc-line)", color: "var(--bc-muted)" }}>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-[#00a884]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==========================================
          4. NEWSLETTER SUBSCRIPTION BANNER
         ========================================== */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="w-full rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl bg-[#0b1220] border border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10 border border-emerald-500/20">
              <Mail size={22} className="text-[#00a884]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Inspired</h3>
              <p className="text-sm max-w-md text-slate-400">Subscribe to our newsletter and get the latest insights and updates delivered to your inbox.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-[#00a884] transition-colors duration-200"
            />
            <button className="bg-[#00a884] hover:bg-[#008f70] text-white w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. BROWSE BY CATEGORY STRIP
         ========================================== */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t" style={{ borderColor: "var(--bc-line)" }}>
        <span className="text-xs font-bold tracking-widest text-center block mb-10 text-[#00a884]">BROWSE BY CATEGORY</span>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div key={idx} className="bc-card flex flex-col items-center text-center p-6 rounded-xl transition-all duration-200 shadow-md">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-slate-900 text-[#00a884]">
                  <IconComponent size={20} />
                </div>
                <span className="bc-display text-sm font-bold block mb-1" style={{ color: "var(--bc-text)" }}>{cat.name}</span>
                <span className="text-xs" style={{ color: "var(--bc-muted)" }}>{cat.count}</span>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}