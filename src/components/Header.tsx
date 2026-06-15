"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X, Globe, MessageCircle, LayoutGrid, ChevronRight, Star, Building, Baby, Sparkles, Award, FileText, FileSignature, Briefcase, Info, Mail, UserPlus, RefreshCw, LogIn, LogOut, User } from 'lucide-react';

const whatsappNumber = '773690993';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      window.dispatchEvent(new CustomEvent('auth-change'));
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  const scrollToSection = (id: string, tab?: 'new' | 'renew') => {
    if (tab) {
      window.dispatchEvent(new CustomEvent('change-visa-tab', { detail: tab }));
    }
    const targetId = id === 'pane-renew' ? 'pane-new' : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'New Visa', icon: <UserPlus size={16} />, action: () => scrollToSection('pane-new', 'new'), href: '/#pane-new' },
    { label: 'Renew Visa', icon: <RefreshCw size={16} />, action: () => scrollToSection('pane-renew', 'renew'), href: '/#pane-renew' },
  ];

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'py-3'
          : 'py-5'
        }`}
    >
      <div className={`relative z-45 max-w-[1200px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between transition-all duration-300 ${scrolled
          ? 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-md rounded-2xl mx-4 lg:mx-auto'
          : 'bg-transparent border border-transparent rounded-none'
        }`}
      >
        {/* Logo & Grid Menu */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="2" width="24" height="28" rx="3" fill="#EF3340" />
              <path d="M12 8h8M12 13h8M12 18h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 2v4a2 2 0 002 2h4" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M20 22c0-3.3 2.7-6 6-6v6h-6z" fill="white" opacity="0.3" />
            </svg>
            <span className="text-lg font-bold text-[#111827]">EmiratesVisa<span className="text-[#EF3340]">.ae</span></span>
          </Link>

          <button
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shadow-sm cursor-pointer ${
              megaMenuOpen 
                ? 'bg-[#EF3340] border-[#EF3340] text-white' 
                : 'bg-white border-gray-200 text-[#4B5563] hover:bg-gray-50'
            }`}
            title="Explore Services"
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (!isHome) {
                  window.location.href = link.href;
                } else {
                  link.action();
                }
              }}
              className="px-4 py-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1.5"
            >
              {link.icon}
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              if (!isHome) {
                window.location.href = '/#calculator';
              } else {
                scrollToSection('calculator');
              }
            }}
            className="ml-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#EF3340] hover:bg-[#D62B35] rounded-full transition-colors shadow-sm flex items-center gap-2"
          >
            <Calculator size={16} />
            Visa Calculator
          </button>
          {isAuthenticated ? (
            <>
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-semibold text-[#EF3340] bg-[#EF3340]/5 hover:bg-[#EF3340]/10 rounded-full transition-all ml-2 flex items-center gap-1.5"
              >
                <User size={16} />
                Admin Portal
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-[#EF3340] rounded-full transition-all ml-1 cursor-pointer flex items-center gap-1.5"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-[#4B5563] bg-gray-50 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-all ml-2 flex items-center gap-1.5"
            >
              <LogIn size={16} />
              Login
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center transition-colors"
          >
            <MessageCircle size={20} className="text-white" fill="white" />
          </a>
          <button className="hidden sm:flex w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center transition-colors">
            <Globe size={20} className="text-[#4B5563]" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (!isHome) {
                    window.location.href = link.href;
                  } else {
                    link.action();
                    setMobileOpen(false);
                  }
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-[#4B5563] hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                if (!isHome) {
                  window.location.href = '/#calculator';
                } else {
                  scrollToSection('calculator');
                  setMobileOpen(false);
                }
              }}
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-[#EF3340] hover:bg-[#D62B35] rounded-lg transition-colors flex items-center gap-2"
            >
              <Calculator size={16} />
              Visa Calculator
            </button>
            {isAuthenticated ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="w-full px-4 py-3 text-sm font-semibold text-[#EF3340] bg-[#EF3340]/5 hover:bg-[#EF3340]/10 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  Admin Portal
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 text-sm font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all mt-2 flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full px-4 py-3 text-sm font-semibold text-[#4B5563] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mega Menu Backdrop (Click outside to close) */}
      {megaMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-xs z-30 transition-all duration-300"
          onClick={() => setMegaMenuOpen(false)}
        />
      )}

      {/* Mega Menu Dropdown */}
      {megaMenuOpen && (
        <div className="fixed top-[84px] left-4 right-4 md:left-auto md:right-auto md:max-w-[1200px] md:w-[calc(100vw-32px)] md:mx-auto bg-white/95 backdrop-blur-xl border border-gray-100/80 shadow-2xl rounded-3xl z-40 max-h-[calc(100vh-100px)] overflow-y-auto inset-x-0 mx-auto">
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            {/* Banner: Visa Cost Calculator */}
            <div 
              onClick={() => {
                setMegaMenuOpen(false);
                if (!isHome) {
                  window.location.href = '/#calculator';
                } else {
                  scrollToSection('calculator');
                }
              }}
              className="bg-gradient-to-r from-[#EF3340] to-[#D62B35] rounded-2xl p-5 mb-8 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-1.5">
                    Visa Cost Calculator
                  </h3>
                  <p className="text-white/80 text-sm">Instant, itemised estimate</p>
                </div>
              </div>
              <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" size={24} />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column: Residence Visas & Lists (Span 3) */}
              <div className="lg:col-span-3 space-y-8">
                {/* Residence Visas */}
                <div>
                  <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF3340]" /> Residence Visas
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { title: "Golden Visa", icon: <Star size={20} className="text-[#EF3340]" fill="#EF3340" />, href: "/golden-visa", bg: "bg-red-50/50" },
                      { title: "Property Visa", icon: <Building size={20} className="text-[#EF3340]" />, href: "/property-visa", bg: "bg-red-50/50" },
                      { title: "Newborn Visa", icon: <Baby size={20} className="text-[#EF3340]" />, href: "/new-born", bg: "bg-red-50/50" },
                      { title: "Maid Visa", icon: <Sparkles size={20} className="text-[#EF3340]" />, href: "/maid-visa", bg: "bg-red-50/50" }
                    ].map((visa) => (
                      <Link
                        key={visa.title}
                        href={visa.href}
                        onClick={() => setMegaMenuOpen(false)}
                        className="flex flex-col items-center justify-center p-5 rounded-2xl border border-gray-100 hover:border-[#EF3340]/30 hover:bg-[#EF3340]/5 transition-all text-center group bg-white hover-shadow-premium"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#EF3340]/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                          {visa.icon}
                        </div>
                        <span className="font-bold text-sm text-[#111827]">{visa.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Lists: Documents & Property */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Documents & Legal */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF3340]" /> Documents & Legal
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "Attestation", icon: <Award size={16} className="text-[#EF3340]" />, href: "/attestation" },
                        { title: "Translation", icon: <FileText size={16} className="text-[#EF3340]" />, href: "/legal-translation" },
                        { title: "Power of Attorney", icon: <FileSignature size={16} className="text-[#EF3340]" />, href: "/poa" }
                      ].map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMegaMenuOpen(false)}
                          className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-red-50/5 border border-gray-100 hover:border-[#EF3340]/20 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-600">
                              {item.icon}
                            </div>
                            <span className="font-semibold text-sm text-gray-700">{item.title}</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Property & Support */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-455 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF3340]" /> Property & Support
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "DLD Trustee Services", icon: <Building size={16} className="text-[#EF3340]" />, href: "/dld-trustee" },
                        { title: "Revaluation", icon: <Award size={16} className="text-[#EF3340]" />, href: "/dld-trustee-services" },
                        { title: "Medical & EID", icon: <Briefcase size={16} className="text-[#EF3340]" />, href: "/contact-us" }
                      ].map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMegaMenuOpen(false)}
                          className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-red-50/5 border border-gray-100 hover:border-[#EF3340]/20 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-600">
                              {item.icon}
                            </div>
                            <span className="font-semibold text-sm text-gray-700">{item.title}</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Company (Span 1) */}
              <div className="lg:border-l lg:border-gray-100 lg:pl-8">
                <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF3340]" /> Company
                </h4>
                <div className="space-y-3">
                  {[
                    { title: "Articles", icon: <FileText size={16} className="text-[#EF3340]" />, href: "/articles" },
                    { title: "About Us", icon: <Info size={16} className="text-[#EF3340]" />, href: "/about-us" },
                    { title: "Career", icon: <Briefcase size={16} className="text-[#EF3340]" />, href: "/contact-us" },
                    { title: "Contact Us", icon: <Mail size={16} className="text-[#EF3340]" />, href: "/contact-us" }
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMegaMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-red-50/5 border border-gray-100 hover:border-[#EF3340]/20 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-600">
                          {item.icon}
                        </div>
                        <span className="font-semibold text-sm text-gray-700">{item.title}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
