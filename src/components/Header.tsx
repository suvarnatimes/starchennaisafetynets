import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import Logo from './Logo.js';

interface HeaderProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

export default function Header({ activePage, onChangePage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'blog', label: 'Expert Blog' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string) => {
    onChangePage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary/95 text-white shadow-lg backdrop-blur-md py-3 border-b border-white/5'
          : 'bg-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer select-none group"
          >
            <Logo height="36px" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-accent hover:scale-105 active:scale-95 ${
                  activePage === item.id
                    ? 'text-accent font-bold scale-105'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full transition-all duration-300 origin-left ${
                  activePage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+919840245678"
              className="group relative overflow-hidden flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-accent/15 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
              <Phone className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary shadow-xl border-t border-white/5 backdrop-blur-lg animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-accent/15 text-accent font-semibold border-l-4 border-accent'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4">
              <a
                href="tel:+919840245678"
                className="group relative overflow-hidden flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                <Phone className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Call Now (+91 98402 45678)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
