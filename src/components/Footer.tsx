import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  authorities: [
    { label: 'GDRFA Dubai', href: 'https://gdrfad.gov.ae/en' },
    { label: 'ICP', href: 'https://icp.gov.ae/en/' },
    { label: 'MOFA UAE', href: 'https://www.mofa.gov.ae/en' },
    { label: 'UAE Pass', href: 'https://uaepass.ae/' },
    { label: 'u.ae Portal', href: 'https://u.ae/en' },
  ],
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Articles', href: '/articles' },
    { label: 'Contact', href: '/contact-us' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/800docs' },
  { icon: Instagram, href: 'https://instagram.com/800docs' },
  { icon: Linkedin, href: 'https://linkedin.com/company/800docs' },
  { icon: Youtube, href: 'https://youtube.com/@800docs' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0E1422] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="2" width="24" height="28" rx="3" fill="#EF3340" />
                <path d="M12 8h8M12 13h8M12 18h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 2v4a2 2 0 002 2h4" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M20 22c0-3.3 2.7-6 6-6v6h-6z" fill="white" opacity="0.3" />
              </svg>
              <span className="text-lg font-bold">EmiratesVisa<span className="text-[#EF3340]">.ae</span></span>
            </Link>
            <p className="text-gray-400 text-sm mb-2">UAE Family Visa Services &middot; 100% Online</p>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Your trusted partner for 100% online Dubai visa processing — replacing the need for physical typing centre visits.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Authorities */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Official UAE Government Authorities</h4>
            <ul className="space-y-2.5">
              {footerLinks.authorities.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">EmiratesVisa.ae</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-2.5">
              <a href="tel:773690993" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={14} /> 800 DOCS
              </a>
              <a href="mailto:info@emiratesvisa.ae" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={14} /> info@emiratesvisa.ae
              </a>
              <p className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                709 Business Village B Block, Next to Clock Tower, Port Saeed, Deira, Dubai
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500">
                &copy; 2026 EmiratesVisa.ae. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-1 max-w-2xl">
                EmiratesVisa.ae is operated by 800 DOCS LLC SOC, a private third-party service provider. We are not a government authority. We assist customers with visa-related typing, documentation, and application uploads through the relevant official channels.
              </p>
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Privacy</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
