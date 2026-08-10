import React from 'react';
import { servicesData } from '../data/servicesData.js';
import { localitiesData } from '../data/localitiesData.js';
import { 
  ShieldCheck, CheckCircle, Phone, MessageSquare, 
  HelpCircle, Sparkles, Award, Clock, MapPin, ArrowRight
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onOpenQuoteModal: (service?: string) => void;
}

export default function ServiceDetailPage({ slug, onOpenQuoteModal }: ServiceDetailPageProps) {
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Service Page Not Found</h1>
        <p className="text-slate-600 mb-8">The safety net service page you are looking for does not exist.</p>
        <a href="#/services" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-lg">
          View All Services
        </a>
      </div>
    );
  }

  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Star Safety Enterprises",
      "telephone": "+91 90437 17064",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No 14/22, Flat F2, 1st Floor, Bharathiar Street",
        "addressLocality": "West Mambalam, Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600033",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Chennai"
    },
    "description": service.metaDescription
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
            <a href="#/services" className="hover:text-amber-400 transition-colors">Services</a>
            <span>/</span>
            <span className="text-amber-400 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Safety Net Installation in Chennai
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                {service.h1}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                {service.introSummary}
              </p>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-400 block">Warranty</span>
                  <span className="text-sm font-bold text-amber-400">{service.warranty.split(' ')[0]} {service.warranty.split(' ')[1]}</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-400 block">Material</span>
                  <span className="text-sm font-bold text-emerald-400">Garware / UV-HDPE</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 block">Site Visit</span>
                  <span className="text-sm font-bold text-sky-400">Free On-Site Quote</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Get Free Quote Now
                </button>
                <a
                  href="https://wa.me/919043717064?text=Hi%20Star%20Safety%20Enterprises,%20I%20need%20a%20quote%20for%20safety%20nets."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" /> WhatsApp Inspection
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
                <img
                  src={service.heroImage}
                  alt={service.imageAlt1}
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-sm font-medium text-amber-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Professional Installation across Chennai
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
              <h2 className="text-base font-bold text-amber-950 mb-1">Quick Answer Summary</h2>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                <strong>What is {service.title} in Chennai?</strong> {service.introSummary} Star Safety Enterprises delivers certified installations using UV-stabilized Garware-grade materials backed by a {service.warranty} across all Chennai localities. Call <strong>+91 90437 17064</strong> for a free site inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Specs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Detailed Body Text */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" /> Complete Service Guide & Details
              </h2>
              
              <div className="prose prose-slate max-w-none space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                {service.fullBodyContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Key Benefits of {service.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Installation Process */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Our 4-Step Installation Process</h3>
              <div className="space-y-4">
                {service.installationProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-slate-800 text-sm sm:text-base font-medium mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-sky-600" /> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h4 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Service Cross-Links */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Related Safety Net Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.relatedServiceSlugs.map(relSlug => {
                  const relData = servicesData[relSlug];
                  if (!relData) return null;
                  return (
                    <a
                      key={relSlug}
                      href={`#/services/${relSlug}`}
                      className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-700 block transition-all group"
                    >
                      <span className="text-sm font-bold text-white group-hover:text-amber-400 block mb-1">
                        {relData.title}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        Learn details <ArrowRight className="w-3 h-3" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Specs, Trust, & NAP */}
          <div className="lg:col-span-4 space-y-6">

            {/* Technical Specs Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-3">Technical Specifications</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-slate-500 uppercase font-semibold">Material Grade</dt>
                  <dd className="text-slate-900 font-medium mt-0.5">{service.materialsSpec}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 uppercase font-semibold">Warranty Period</dt>
                  <dd className="text-emerald-700 font-bold mt-0.5">{service.warranty}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 uppercase font-semibold">Pricing Approach</dt>
                  <dd className="text-slate-900 font-medium mt-0.5">{service.pricingApproach}</dd>
                </div>
              </dl>
            </div>

            {/* Local Trust Signals */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-3">Why Trust Star Enterprises?</h3>
              <ul className="space-y-3">
                {service.trustSignals.map((ts, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    {ts}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chennai Localities Served */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" /> Chennai Localities Served
              </h3>
              <p className="text-xs text-slate-600 mb-4">We provide fast 60-minute site visits for {service.title} in:</p>
              <div className="flex flex-wrap gap-2">
                {service.nearbyLocalitySlugs.map(locSlug => {
                  const locData = localitiesData[locSlug];
                  if (!locData) return null;
                  return (
                    <a
                      key={locSlug}
                      href={`#/locality/${locSlug}`}
                      className="text-xs bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                    >
                      {locData.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Official NAP CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <h3 className="text-lg font-bold text-amber-400 mb-2">Book Free Inspection</h3>
              <p className="text-xs text-slate-300 mb-4">
                Star Safety Enterprises — Chennai Official Business Details
              </p>
              
              <div className="space-y-3 text-xs text-slate-200 mb-6">
                <p><strong>Address:</strong> No 14/22, Flat F2, 1st Floor, Bharathiar Street, West Mambalam, Chennai, TN 600033</p>
                <p><strong>Phone:</strong> +91 90437 17064</p>
                <p><strong>Hours:</strong> Mon - Sun: 8:00 AM - 9:00 PM</p>
              </div>

              <button
                onClick={() => onOpenQuoteModal(service.title)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all text-center block"
              >
                Request On-Site Quote
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
