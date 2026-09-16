import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import Logo from './Logo.js';
import { servicesData } from '../data/servicesData.js';
import { localitiesData } from '../data/localitiesData.js';

interface FooterProps {
  onChangePage: (page: string) => void;
}

const regionalPartners = [
  {
    url: 'https://tamizhabalconypigeonsafetynets.in/',
    anchorText: 'Tamizha Balcony Pigeon Safety Nets Chennai',
    location: 'Chennai, Tamil Nadu',
  },
  {
    url: 'https://www.pigeonsafetycricketnets.in/',
    anchorText: 'Pigeon Safety & Cricket Nets Andhra Pradesh',
    location: 'Andhra Pradesh',
  },
  {
    url: 'https://www.kovaisafetynets.in/',
    anchorText: 'Kovai Safety Nets Coimbatore',
    location: 'Coimbatore, Tamil Nadu',
  },
  {
    url: 'https://www.chennaiinvisiblegrills.in/',
    anchorText: 'Chennai Invisible Grills',
    location: 'Chennai, Tamil Nadu',
  },
];

export default function Footer({ onChangePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesList = Object.values(servicesData);
  const localitiesList = Object.values(localitiesData);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-6">
            <div className="cursor-pointer select-none group" onClick={() => handleNavClick('home')}>
              <Logo height="36px" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Chennai's premier certified safety net installation company. Specializing in Garware-grade balcony safety nets, pigeon protection, invisible grills, and industrial netting across all Chennai neighborhoods.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> ISO 9001:2015 & Garware Certified
              </span>
            </div>
          </div>

          {/* Column 2: 14 Dedicated Services */}
          <div>
            <h4 className="font-bold text-white text-base tracking-wide mb-4 text-amber-400">Our 14 Safety Net Services</h4>
            <ul className="grid grid-cols-1 gap-2 text-xs">
              {servicesList.map((srv) => (
                <li key={srv.slug}>
                  <button
                    onClick={() => handleNavClick(`services-${srv.slug}`)}
                    className="hover:text-amber-400 transition-colors text-slate-400 text-left flex items-center gap-1.5"
                  >
                    <span className="text-amber-500">•</span> {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Priority Chennai Localities */}
          <div>
            <h4 className="font-bold text-white text-base tracking-wide mb-4 text-amber-400">Chennai Areas We Serve</h4>
            <ul className="grid grid-cols-1 gap-2 text-xs">
              {localitiesList.map((loc) => (
                <li key={loc.slug}>
                  <button
                    onClick={() => handleNavClick(`locality-${loc.slug}`)}
                    className="hover:text-amber-400 transition-colors text-slate-400 text-left flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" /> Safety Nets in {loc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official NAP (Name, Address, Phone) */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-base tracking-wide mb-4 text-amber-400">Google Profile NAP Details</h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Star Safety Enterprises</strong>
                  <span className="text-slate-400 leading-relaxed block">
                    No 14/22, Flat F2, 1st Floor, Bharathiar Street, West Mambalam, Chennai, Tamil Nadu 600033
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <div>
                  <a href="tel:+919043717064" className="hover:text-amber-400 transition-colors font-bold text-white block">
                    +91 90437 17064
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="mailto:dudaprasad12345@gmail.com" className="hover:text-amber-400 transition-colors text-slate-400">
                  dudaprasad12345@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-slate-400">
                  Mon - Sun: 8:00 AM - 9:00 PM (Daily)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Our Regional Network / Partner Associates */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="mb-4">
            <h4 className="font-bold text-white text-base tracking-wide text-amber-400">
              Our Regional Partner Network
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Trusted regional partner associates providing specialized safety netting, bird control, and invisible grill installations across South India:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {regionalPartners.map((partner) => (
              <div
                key={partner.url}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener"
                  className="text-xs font-semibold text-slate-200 hover:text-amber-400 transition-colors leading-snug"
                >
                  {partner.anchorText}
                </a>
                <span className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  {partner.location}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Star Safety Enterprises. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</a>
            <span>•</span>
            <span>Garware-Grade UV Safety Nets</span>
            <span>•</span>
            <span>Chennai Local SEO Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
