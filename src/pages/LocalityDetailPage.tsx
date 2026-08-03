import React from 'react';
import { localitiesData } from '../data/localitiesData.js';
import { servicesData } from '../data/servicesData.js';
import { 
  ShieldCheck, MapPin, CheckCircle, Phone, MessageSquare, 
  HelpCircle, Clock, Sparkles, Building, ArrowRight
} from 'lucide-react';

interface LocalityDetailPageProps {
  slug: string;
  onOpenQuoteModal: (service?: string) => void;
}

export default function LocalityDetailPage({ slug, onOpenQuoteModal }: LocalityDetailPageProps) {
  const locality = localitiesData[slug];

  if (!locality) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Locality Page Not Found</h1>
        <p className="text-slate-600 mb-8">The Chennai neighborhood page you are looking for does not exist.</p>
        <a href="#/home" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-lg">
          Return to Home
        </a>
      </div>
    );
  }

  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Star Safety Enterprises - ${locality.name} Branch`,
    "telephone": "+91 98409 68538",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 14/22, Flat F2, 1st Floor, Bharathiar Street",
      "addressLocality": `${locality.name}, Chennai`,
      "addressRegion": "Tamil Nadu",
      "postalCode": "600033",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `${locality.name}, Chennai`
    },
    "description": locality.metaDescription
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Breadcrumb Header */}
      <div className="bg-slate-900 text-white py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 flex items-center space-x-2 flex-wrap">
            <a href="#/home" className="hover:text-amber-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-slate-400">Areas We Serve</span>
            <span>/</span>
            <span className="text-amber-400 font-medium">{locality.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Local Safety Net Installation Service in {locality.name}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                {locality.h1}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                {locality.introSummary}
              </p>

              {/* Area Highlights Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-400 block">Response Claim</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {locality.responseTimeClaim}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-400 block">Primary Focus</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400">Balcony Safety Nets</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 block">Warranty</span>
                  <span className="text-xs sm:text-sm font-bold text-sky-400">7-Year Written Warranty</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onOpenQuoteModal(`Safety Nets in ${locality.name}`)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Book Free On-Site Inspection
                </button>
                <a
                  href={`https://wa.me/919840968538?text=Hi%20Star%20Safety%20Enterprises,%20I%20need%20a%20quote%20for%20balcony%20safety%20nets%20in%20${encodeURIComponent(locality.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" /> WhatsApp Quote
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
                <img
                  src={locality.heroImage}
                  alt={locality.imageAlt1}
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-sm font-medium text-amber-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Fast local dispatch across {locality.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GEO & AEO Quick Answer Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-md">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-base font-bold text-amber-950 mb-1">Local Service Answer</h2>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                Looking for <strong>balcony safety nets in {locality.name}, Chennai</strong>? Star Safety Enterprises provides certified balcony safety netting, pigeon protection, and invisible grills near <strong>{locality.landmarks.slice(0, 3).join(', ')}</strong> with a <strong>{locality.responseTimeClaim}</strong>. All installations use Garware UV-stabilized mesh backed by a 7-year warranty. Call <strong>+91 98409 68538</strong> for a free measurement visit today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Detailed Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building className="w-6 h-6 text-amber-500" /> Balcony & Safety Net Services in {locality.name}
              </h2>
              
              <div className="prose prose-slate max-w-none space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                {locality.fullBodyContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Landmarks & Building Types */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Coverage & Landmarks in {locality.name}</h3>
              <p className="text-slate-600 text-sm mb-4">
                <strong>Typical Housing Profile:</strong> {locality.housingTypeNote}
              </p>

              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Key Landmarks We Serve Nearby:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {locality.landmarks.map((lm, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> {lm}
                  </span>
                ))}
              </div>
            </div>

            {/* Services Offered in Locality */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Popular Safety Net Services Offered in {locality.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locality.featuredServices.map(s => (
                  <a
                    key={s.id}
                    href={`#/services/${s.id}`}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all group block"
                  >
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-amber-600 flex items-center justify-between mb-1">
                      {s.name} <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                    </h4>
                    <p className="text-slate-600 text-xs">{s.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Locality FAQs */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-sky-600" /> Frequently Asked Questions — {locality.name}
              </h3>
              <div className="space-y-4">
                {locality.faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h4 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Nearby Localities & Call to Action */}
          <div className="lg:col-span-4 space-y-6">

            {/* Neighboring Areas Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" /> Adjacent Chennai Neighborhoods
              </h3>
              <p className="text-xs text-slate-600 mb-4">We also provide fast safety net installation in neighboring areas:</p>
              <div className="space-y-2">
                {locality.nearbyLocalitySlugs.map(nearSlug => {
                  const nearData = localitiesData[nearSlug];
                  if (!nearData) return null;
                  return (
                    <a
                      key={nearSlug}
                      href={`#/locality/${nearSlug}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 text-slate-800 text-sm font-medium transition-colors"
                    >
                      <span>Balcony Nets in {nearData.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Official NAP CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <h3 className="text-lg font-bold text-amber-400 mb-2">Book Free Visit in {locality.name}</h3>
              <p className="text-xs text-slate-300 mb-4">
                Star Safety Enterprises — Guaranteed Fast Dispatch to {locality.name}
              </p>
              
              <div className="space-y-3 text-xs text-slate-200 mb-6">
                <p><strong>Address:</strong> No 14/22, Flat F2, 1st Floor, Bharathiar Street, West Mambalam, Chennai, TN 600033</p>
                <p><strong>Phone:</strong> +91 98409 68538 / +91 98409 68539</p>
                <p><strong>Hours:</strong> Mon - Sun: 8:00 AM - 9:00 PM</p>
              </div>

              <button
                onClick={() => onOpenQuoteModal(`Safety Nets in ${locality.name}`)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all text-center block"
              >
                Schedule Free Site Visit
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
