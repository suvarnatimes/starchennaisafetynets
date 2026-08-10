import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, MapPin, Shield } from 'lucide-react';
import Logo from './Logo.js';
import { servicesData } from '../data/servicesData.js';
import { localitiesData } from '../data/localitiesData.js';

interface HeaderProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

export default function Header({ activePage, onChangePage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [areasDropdown, setAreasDropdown] = useState(false);

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

  const handleNavClick = (id: string) => {
    onChangePage(id);
    setIsOpen(false);
    setServicesDropdown(false);
    setAreasDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesList = Object.values(servicesData);
  const localitiesList = Object.values(localitiesData);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 text-white shadow-lg backdrop-blur-md py-3 border-b border-white/10'
          : 'bg-slate-900/80 text-white py-4 backdrop-blur-sm border-b border-white/5'
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
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium tracking-wide transition-colors ${
                activePage === 'home' ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-sm font-medium tracking-wide transition-colors ${
                activePage === 'about' ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
              }`}
            >
              About Us
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-1 py-2 ${
                  activePage.startsWith('services') ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
                }`}
              >
                Our Services <ChevronDown className="w-4 h-4" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 grid grid-cols-1 gap-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> All 14 Safety Net Services
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    {servicesList.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => handleNavClick(`services-${s.slug}`)}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors block"
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Areas We Serve Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAreasDropdown(true)}
              onMouseLeave={() => setAreasDropdown(false)}
            >
              <button
                className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-1 py-2 ${
                  activePage.startsWith('locality') || activePage.startsWith('safety-nets-') ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
                }`}
              >
                Areas We Serve <ChevronDown className="w-4 h-4" />
              </button>

              {areasDropdown && (
                <div className="absolute top-full left-0 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 grid grid-cols-1 gap-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Priority Chennai Localities
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-1">
                    {localitiesList.map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() => handleNavClick(`locality-${loc.slug}`)}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors block"
                      >
                        Safety Nets in {loc.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-sm font-medium tracking-wide transition-colors ${
                activePage === 'gallery' ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
              }`}
            >
              Gallery
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`text-sm font-medium tracking-wide transition-colors ${
                activePage === 'blog' ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
              }`}
            >
              Expert Blog
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium tracking-wide transition-colors ${
                activePage === 'contact' ? 'text-amber-400 font-bold' : 'text-gray-200 hover:text-white'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+919043717064"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>+91 90437 17064</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="w-full text-left py-2 text-sm font-bold text-amber-400"
            >
              All Services
            </button>

            {/* Mobile Service Sublinks */}
            <div className="pl-4 space-y-1 border-l border-slate-800 my-2">
              <span className="text-xs font-semibold text-slate-400 block mb-1 uppercase">14 Service Pages</span>
              {servicesList.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => handleNavClick(`services-${s.slug}`)}
                  className="w-full text-left py-1 text-xs text-slate-300 hover:text-amber-300 block"
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Mobile Locality Sublinks */}
            <div className="pl-4 space-y-1 border-l border-slate-800 my-2">
              <span className="text-xs font-semibold text-slate-400 block mb-1 uppercase">Chennai Localities</span>
              {localitiesList.map((loc) => (
                <button
                  key={loc.slug}
                  onClick={() => handleNavClick(`locality-${loc.slug}`)}
                  className="w-full text-left py-1 text-xs text-slate-300 hover:text-amber-300 block"
                >
                  Safety Nets in {loc.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('gallery')}
              className="w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
            >
              Expert Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left py-2 text-sm font-medium text-slate-200 hover:text-amber-400"
            >
              Contact Us
            </button>

            <div className="pt-4">
              <a
                href="tel:+919043717064"
                className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now (+91 90437 17064)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
