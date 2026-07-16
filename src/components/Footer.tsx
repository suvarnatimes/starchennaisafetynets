import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import Logo from './Logo.js';

interface FooterProps {
  onChangePage: (page: string) => void;
}

export default function Footer({ onChangePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { label: 'Balcony Safety Nets', slug: 'balcony-safety-nets' },
    { label: 'Bird Protection Nets', slug: 'bird-protection-nets' },
    { label: 'Pigeon Safety Nets', slug: 'pigeon-safety-nets' },
    { label: 'Children\'s Safety Nets', slug: 'children-safety-nets' },
    { label: 'Construction Safety Nets', slug: 'construction-safety-nets' },
    { label: 'Coconut Tree Safety Nets', slug: 'coconut-tree-safety-nets' }
  ];

  const cities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Pondicherry', 'Tambaram', 'Chengalpattu', 'Salem', 'Tiruppur', 'Erode', 'Vellore', 'Hosur', 'Tirunelveli', 'Kanchipuram', 'Thanjavur'
  ];

  const handleCityClick = (city: string) => {
    const pageId = `safety-nets-${city.toLowerCase()}`;
    onChangePage(pageId);
    window.location.hash = `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-gray-300 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-6">
            <div className="cursor-pointer select-none group" onClick={() => handleNavClick('home')}>
              <Logo height="36px" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Tamil Nadu's premium and most trusted professional safety net installation service. Providing industrial-grade durability and expert rope-access safety solutions for high-rises, commercial offices, and homes.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-xs text-accent font-semibold font-mono">
                ✓ 10-Year Warranty Options
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-base tracking-wide mb-6">Quick Links</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200">
                  <span>→</span> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200">
                  <span>→</span> About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200">
                  <span>→</span> Our Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('blog')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200">
                  <span>→</span> Expert Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200">
                  <span>→</span> Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200">
                  <span>→</span> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 className="font-display font-bold text-white text-base tracking-wide mb-6">Our Core Services</h4>
            <ul className="space-y-3.5 text-sm">
              {services.map((srv, idx) => (
                <li key={idx}>
                  <button onClick={() => handleNavClick('services')} className="hover:text-accent transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200 text-left">
                    <span>•</span> {srv.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide mb-6">Get In Touch</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Star Safety Enterprises, 24/18, Nehru Street, Adyar, Chennai - 600020
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="tel:+919840245678" className="hover:text-accent transition-colors">
                  +91 98402 45678
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:info@starsafetyenterprises.com" className="hover:text-accent transition-colors">
                  info@starsafetyenterprises.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-gray-400">
                  Open 24/7 (Mon - Sun)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cities Served Panel */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <h5 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-4">Areas We Serve Across Tamil Nadu:</h5>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {cities.map((city, idx) => (
              <button 
                key={idx} 
                onClick={() => handleCityClick(city)}
                className="text-xs text-gray-500 font-medium hover:text-accent transition-colors cursor-pointer text-left focus:outline-none"
              >
                {city} {idx < cities.length - 1 ? '•' : ''}
              </button>
            ))}
            <span className="text-xs text-gray-400 font-semibold italic ml-1">and all major cities across Tamil Nadu.</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {currentYear} Star Safety Enterprises. All rights reserved.</p>
          <div className="flex gap-6">
            <span>ISO 9001:2015 Certified</span>
            <span>Premium Safety Net Installation Services</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
