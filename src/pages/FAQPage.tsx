import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: 'balcony' | 'pigeon' | 'cost' | 'warranty';
}

const faqList: FAQItem[] = [
  {
    category: 'balcony',
    q: 'What material is used for balcony safety nets in Chennai?',
    a: 'We use 100% virgin Garware-grade High-Density Polyethylene (HDPE) mesh treated with carbon UV-blockers. Twine thickness ranges from 1.5mm to 2.5mm with a load capacity over 150kg per sq. meter.'
  },
  {
    category: 'cost',
    q: 'What is the cost per square foot for balcony safety net installation in Chennai?',
    a: 'Safety net installation costs between Rs 15 to Rs 35 per sq. ft. depending on mesh material (HDPE vs Nylon vs Heavy Monkey Mesh). Stainless steel invisible grills cost between Rs 120 to Rs 180 per sq. ft. All quotes include materials, SS 304 fasteners, and fitting labor.'
  },
  {
    category: 'pigeon',
    q: 'How do pigeon safety nets stop birds without harming them?',
    a: 'Our pigeon nets feature a fine 25mm to 30mm mesh grid that creates a physical barrier. Birds cannot fly through or nest on balcony ledges, effectively deterring them without causing injury or traps.'
  },
  {
    category: 'warranty',
    q: 'What warranty is provided with safety net installation?',
    a: 'Star Safety Enterprises provides an official 7-year written warranty card covering UV mesh degradation, net sagging, and fastener strength.'
  },
  {
    category: 'balcony',
    q: 'How long does balcony safety net installation take?',
    a: 'Installation takes between 2 to 3 hours per balcony. Our technicians handle drilling, stainless steel hook mounting, mesh tailoring, and high-tension lacing during the same visit.'
  },
  {
    category: 'pigeon',
    q: 'Can pigeon nets be installed on high-rise apartments in OMR and Velachery?',
    a: 'Yes! Our climbing technicians are certified for high-rise rope access up to 30+ floors.'
  },
  {
    category: 'cost',
    q: 'Do you charge for site measurement and inspection in Chennai?',
    a: 'No! On-site measurement and sample demonstration is 100% FREE across all Chennai localities.'
  }
];

export default function FAQPage({ onOpenQuoteModal }: { onOpenQuoteModal: (service?: string) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCat, setFilterCat] = useState<string>('all');

  const filtered = filterCat === 'all' ? faqList : faqList.filter(item => item.category === filterCat);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-700">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Safety Nets FAQ & Buyer Guide
          </h1>
          <p className="text-slate-600 text-sm">
            Everything you need to know about balcony safety nets, pigeon exclusion, invisible grills, installation time, and pricing in Chennai.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'balcony', label: 'Balcony Safety' },
            { id: 'pigeon', label: 'Pigeon Control' },
            { id: 'cost', label: 'Pricing & Cost' },
            { id: 'warranty', label: 'Warranty & Maintenance' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCat(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterCat === tab.id
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center gap-4 hover:text-amber-600"
                >
                  <span className="text-base">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-1">Still Have Questions?</h3>
            <p className="text-xs text-slate-300">
              Speak directly with our technical advisors or book a free on-site balcony measurement.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+919043717064"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call +91 90437 17064
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
