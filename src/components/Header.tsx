"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X, Globe, MessageCircle } from 'lucide-react';

const whatsappNumber = '773690993';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
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
    { label: 'New Visa', action: () => scrollToSection('pane-new', 'new'), href: '/#pane-new' },
    { label: 'Renew Visa', action: () => scrollToSection('pane-renew', 'renew'), href: '/#pane-renew' },
  ];

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="2" width="24" height="28" rx="3" fill="#EF3340" />
            <path d="M12 8h8M12 13h8M12 18h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 2v4a2 2 0 002 2h4" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M20 22c0-3.3 2.7-6 6-6v6h-6z" fill="white" opacity="0.3" />
          </svg>
          <span className="text-lg font-bold text-[#111827]">EmiratesVisa<span className="text-[#EF3340]">.ae</span></span>
        </Link>

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
              className="px-4 py-2 text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors"
            >
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
                className="block w-full text-left px-4 py-3 text-sm font-medium text-[#4B5563] hover:bg-gray-50 rounded-lg transition-colors"
              >
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
          </div>
        </div>
      )}
    </header>
  );
}
