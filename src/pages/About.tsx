import React from 'react';
import { 
  ShieldCheck, Heart, Award, Star, MapPin, 
  Clock, Shield, Target, Users, BookOpen, Check 
} from 'lucide-react';

interface AboutProps {
  onOpenQuoteModal: () => void;
}

export default function About({ onOpenQuoteModal }: AboutProps) {
  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To provide absolute safety and sanitation solutions for high-rises and homes across Tamil Nadu, preventing accidents and infestations humanely and affordably.' },
    { icon: Shield, title: 'Our Vision', desc: 'To be Tamil Nadu\'s undisputed benchmark in height-safety net solutions, continually engineering durable co-polymer knots and certified anchoring technologies.' },
    { icon: Users, title: 'Our Team', desc: 'Every technician is a certified high-altitude rope-access climber with over 150 hours of industrial-grade training in safety harnesses, helmet anchorage, and safety rules.' }
  ];

  const standards = [
    { title: 'ISO 9001:2015 Certified', desc: 'Our fabrication processes, material procurement, and field installations are fully ISO 9001:2015 certified for strict quality compliance.' },
    { title: 'UV-Stabilized co-polymers', desc: 'We source raw materials that are heavily co-polymer stabilized, meaning our nets resist fading, cracking, and decay under tropical sun and heat.' },
    { title: 'Rust-Proof solid Anchorages', desc: 'All border wires, hooks, fasteners, and keyhole loops are made of high-quality stainless steel (SS304/SS316) to prevent rusty streaks on wall facings.' },
    { title: '150kg Impact load Tested', desc: 'Our child safety and industrial fall nets undergo strict testing, certifying impact loads of up to 150 kilograms at sudden free-drop.' }
  ];

  const timeline = [
    { year: '2014', title: 'Company Foundation', desc: 'Started as a small local safety net installation service in Chennai with 3 trained technicians.' },
    { year: '2017', title: 'Coimbatore & Madurai Expansion', desc: 'Established regional logistics hubs in western and southern Tamil Nadu to address rising high-rise apartment construction.' },
    { year: '2020', title: 'ISO 9001 Quality Certification', desc: 'Obtained official ISO certification and upgraded all technician equipment to certified industrial-grade height harnesses.' },
    { year: '2023', title: '10,000+ Homes Secured', desc: 'Proudly reached the milestone of securing 10,000+ happy residential balconies, AC ducts, and industrial project sites.' },
    { year: '2026', title: 'Tamil Nadu Wide Safety Leader', desc: 'Deploying same-day inspection and installation services across 13 major cities with 50+ fully trained staff.' }
  ];

  const areas = [
    'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tiruppur', 'Erode', 'Vellore', 'Hosur', 'Tirunelveli', 'Chengalpattu', 'Kanchipuram', 'Thanjavur'
  ];

  const galleryImages = [
    'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938511/starchennaisafetynets/chennai_balcony_safety_net.jpg',
    'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938532/starchennaisafetynets/chennai_construction_net.jpg',
    'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938537/starchennaisafetynets/chennai_grill_balcony.jpg',
    'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938508/starchennaisafetynets/chennai_hero_backdrop.jpg'
  ];

  return (
    <div className="bg-white font-sans text-slate-700">
      
      {/* About Hero Banner */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938508/starchennaisafetynets/chennai_hero_backdrop.jpg" 
            alt="About Star Safety" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15 select-none"
          />
          <div className="absolute inset-0 bg-primary/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Learn Our Story</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">About Star Safety Enterprises</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            The pioneer of high-tensile co-polymer and monofilament safety net installation across Tamil Nadu. Combining expert industrial rope climbing with premium materials.
          </p>
        </div>
      </section>

      {/* Story & Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
            {/* Story text */}
            <div className="flex-1 space-y-6">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Our Background</span>
              <h2 className="text-3xl font-display font-black text-primary">Securing Tamil Nadu's Balconies & Projects Since 2014</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Star Safety Enterprises was established with a singular focus: to engineer and install elite high-altitude safety netting that prevents fatal household balcony slips and sanitizes commercial sites. Finding that cheap, raw domestic nets decay and rip easily under the Chennai sun, we pioneered the import and supply of UV-treated industrial HDPE co-polymers.
import { optimizeImage } from '../utils/optimizeImage.js';
              </p>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Today, with regional hubs in Coimbatore, Trichy, and Madurai, our expert technicians serve residential societies, schools, corporate IT parks, and factories, ensuring flawless safety certifications and written warranty peace of mind.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-mono text-primary font-bold">
                  ✓ Over 15,000+ balcones and shafts installed
                </span>
              </div>
            </div>

            {/* Visual Stats box */}
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center space-y-1 hover:border-accent/30 hover:bg-white hover:shadow-lg transition-all">
                <p className="font-display font-black text-4xl text-accent">12+</p>
                <p className="text-xs font-mono font-semibold text-primary uppercase">Years Expertise</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center space-y-1 hover:border-accent/30 hover:bg-white hover:shadow-lg transition-all">
                <p className="font-display font-black text-4xl text-primary">15K+</p>
                <p className="text-xs font-mono font-semibold text-slate-500 uppercase">Homes Secured</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center space-y-1 hover:border-accent/30 hover:bg-white hover:shadow-lg transition-all">
                <p className="font-display font-black text-4xl text-primary">50+</p>
                <p className="text-xs font-mono font-semibold text-slate-500 uppercase">Certified Installers</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center space-y-1 hover:border-accent/30 hover:bg-white hover:shadow-lg transition-all">
                <p className="font-display font-black text-4xl text-accent">100%</p>
                <p className="text-xs font-mono font-semibold text-primary uppercase">Free Inspections</p>
              </div>
            </div>
          </div>

          {/* Value cards list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-16">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div key={idx} className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow shadow-accent/15">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-primary">{v.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Standards & Certifications */}
      <section className="py-20 bg-slate-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Quality Assured</span>
            <h2 className="text-3xl font-display font-black text-primary">Our Strict Quality Standards</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We never cut corners. Our raw material batches undergo continuous inspection to ensure they stand up to the elements and accidents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((st, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100/80 p-6 flex gap-4 hover:shadow-md transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white flex-shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-primary mb-1">{st.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Our Journey</span>
            <h2 className="text-3xl font-display font-black text-primary">A Decade of Growth & Safety</h2>
          </div>

          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-32 space-y-12">
            {timeline.map((mil, idx) => (
              <div key={idx} className="relative group pl-8">
                {/* Timeline node */}
                <div className="absolute -left-1.5 top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-white group-hover:bg-accent transition-colors" />
                
                {/* Year tag on desktop */}
                <div className="hidden md:block absolute -left-32 top-0.5 text-right w-24">
                  <span className="font-display font-black text-base text-accent">{mil.year}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="inline-block md:hidden font-display font-black text-xs text-accent font-mono bg-accent/10 px-2 py-0.5 rounded-md mb-1">{mil.year}</span>
                  <h3 className="font-display font-bold text-base text-primary">{mil.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{mil.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Image Gallery */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="h-48 rounded-xl overflow-hidden shadow-sm group relative">
                <img src={optimizeImage(img)} alt="Installation gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer"  loading="lazy" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Geographic Footprint</span>
            <h2 className="text-3xl font-display font-black text-primary">Serving Every Corner of Tamil Nadu</h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Our service fleets are stationed locally in multiple nodes, ensuring same-day inspection visits and quick emergency installation availability.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {areas.map((area, idx) => (
              <span key={idx} className="bg-slate-50 border border-slate-100 text-xs text-primary font-semibold font-sans px-4 py-2 rounded-xl hover:border-accent hover:bg-white hover:text-accent transition-all select-none">
                📍 {area}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 italic">and all adjacent major municipalities across Tamil Nadu.</p>
        </div>
      </section>

      {/* Call to Action banner */}
      <section className="bg-primary py-16 text-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-black">Ready to Secure Your Premises?</h2>
          <p className="text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
            Get in touch with our safety consultants for immediate measurement bookings, free samples, and custom quote details.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="tel:+919840245678" 
              className="group relative overflow-hidden bg-accent hover:bg-accent-light text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-accent/40"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="relative z-10">Call Now</span>
            </a>
            <button 
              onClick={onOpenQuoteModal} 
              className="group relative overflow-hidden bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 hover:border-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/5"
            >
              <span className="relative z-10">Schedule Free Visit</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
