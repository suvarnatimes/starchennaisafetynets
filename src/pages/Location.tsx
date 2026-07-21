import React from 'react';
import { 
  ShieldCheck, Phone, MessageSquare, MapPin, 
  Clock, Shield, Star, Award, CheckCircle, ArrowRight 
} from 'lucide-react';
import { optimizeImage } from '../utils/optimizeImage.js';

interface LocationPageProps {
  city: string;
  onOpenQuoteModal: (service?: string) => void;
}

interface CityData {
  name: string;
  displayName: string;
  heroTitle: string;
  heroDesc: string;
  introTitle: string;
  introDesc: string;
  suburbs: string[];
  localHighlight: string;
  services: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const cityDataMap: Record<string, CityData> = {
  trichy: {
    name: 'trichy',
    displayName: 'Trichy (Tiruchirappalli)',
    heroTitle: 'Professional Safety Net Installation in Trichy',
    heroDesc: 'Top-rated balcony safety nets, pigeon exclusion netting, and child safety barriers in Trichy. Direct factory prices, 100% rust-proof SS anchors, and written warranty.',
    introTitle: 'Securing High-Rise Residences & Commercial Hubs in Trichy',
    introDesc: 'As Tiruchirappalli expands with modern multi-storey apartments and educational institutions, safety is paramount. Old and new buildings in Cantonment, Thillai Nagar, and Srirangam face severe pigeon infestation and fall hazards. Star Safety Enterprises provides certified, industrial-grade co-polymer safety nets designed to withstand Trichy’s hot summer sun without stretching or tearing.',
    suburbs: ['Thillai Nagar', 'Cantonment', 'Srirangam', 'KK Nagar', 'Lalgudi', 'Kattur', 'Woraiyur', 'Tiruverumbur'],
    localHighlight: 'Our Trichy regional team consists of certified rope-access climbers who specialize in high-elevation installations, particularly around historical structures and high-rise apartments near the Kaveri riverfront.',
    services: [
      { title: 'Balcony Safety Nets', desc: 'Secure open balconies from accidental slips. Made from heavy-duty UV-resistant HDPE co-polymer. Supports up to 150 kg impact load.' },
      { title: 'Pigeon Protection Nets', desc: 'Humane physical barriers (25mm-35mm mesh) to stop pigeon flocks from nesting in AC shafts and balconies in Thillai Nagar & KK Nagar.' },
      { title: 'Construction Safety Nets', desc: 'Certified industrial-grade fall arrest and debris netting for commercial building sites in Trichy, complying with IS-11057 standards.' }
    ],
    faqs: [
      { q: 'How long does it take for installation in Trichy?', a: 'We offer same-day site measurement and installation services in Trichy. The actual fitting process takes about 2 to 4 hours depending on balcony size.' },
      { q: 'Do you cover Srirangam and surrounding villages?', a: 'Yes, our local Trichy crew serves Srirangam, Lalgudi, Tiruverumbur, Woraiyur, and all surrounding areas within a 30km radius.' }
    ]
  },
  pondicherry: {
    name: 'pondicherry',
    displayName: 'Puducherry (Pondicherry)',
    heroTitle: 'Premium Safety Nets & Invisible Grills in Pondicherry',
    heroDesc: 'Secure your coastal homes and tourist villas in Puducherry from bird droppings and fall hazards. Heavy-duty UV-protected nets with Grade 316 marine-grade rust-proof brackets.',
    introTitle: 'Coastal-Durable Safety Net Solutions in Puducherry',
    introDesc: 'Puducherry’s unique coastal weather brings high humidity and salty sea breezes that rapidly corrodes standard iron hooks used by local operators. At Star Safety Enterprises, we use Grade 304 and 316 Stainless Steel anchoring hooks that prevent orange rust stains on your heritage walls. Whether you live in a modern French Quarter villa or a high-rise in Lawspet, we have the perfect custom mesh solution.',
    suburbs: ['White Town', 'Lawspet', 'Oulgaret', 'Ariyankuppam', 'Kathirkamam', 'Muthialpet', 'Nellithope', 'Olandai Keerapalayam'],
    localHighlight: 'Our Puducherry operations focus heavily on coastal-grade invisible grills and insect screens that resist salt air weathering while preserving the French Quarter’s aesthetic skyline views.',
    services: [
      { title: 'Balcony Safety & Cat Nets', desc: 'UV-stabilized 15-ply HDPE nets that protect playful pets and children from high-altitude falls in coastal apartments.' },
      { title: 'Rust-Proof Invisible Grills', desc: 'Marine-grade 316 stainless steel cables. Replaces ugly iron window grates with a strong, highly transparent view barrier.' },
      { title: 'Mosquito Window Screens', desc: 'Pleated and sliding insect screens featuring Phifer mesh to keep mosquitoes and insects out while letting coastal breezes flow in.' }
    ],
    faqs: [
      { q: 'Will the salt air rust my safety net fasteners in Pondicherry?', a: 'Absolutely not. Unlike local contractors who use iron brackets, we exclusively use premium SS304 and SS316 stainless steel anchors that are 100% rust-proof in coastal areas.' },
      { q: 'Do you provide services in Lawspet and Oulgaret?', a: 'Yes, our Puducherry team provides same-day inspections and installations in Lawspet, Oulgaret, Muthialpet, and nearby tourist zones.' }
    ]
  },
  chengalpattu: {
    name: 'chengalpattu',
    displayName: 'Chengalpattu',
    heroTitle: 'Industrial & Domestic Safety Nets in Chengalpattu',
    heroDesc: 'Certified safety net installation for homes, IT parks, and factories near Mahindra World City. Custom-designed HDPE co-polymers with official test certificates.',
    introTitle: 'High-Tensile Netting for Industrial and Residential Sites',
    introDesc: 'Chengalpattu has transformed into a massive industrial and manufacturing corridor. With hundreds of warehouse projects near Singaperumal Koil and Mahindra World City, fall containment is crucial. Star Safety Enterprises supplies certified construction safety nets (conforming to IS-11057 standards) alongside residential balcony nets for the growing workforce living in high-rise townships.',
    suburbs: ['Mahindra World City', 'Maraimalai Nagar', 'Singaperumal Koil', 'Guduvanchery', 'Paranur', 'Melamaiyur', 'Alagesan Nagar', 'Vallam'],
    localHighlight: 'We specialize in large-scale commercial duct cover nets, factory ceiling wraps, and residential pigeon-proofing in high-density township apartments.',
    services: [
      { title: 'Industrial Debris Nets', desc: 'Dual-layer containment nets built from high-tensile polypropylene to catch tools, concrete fragments, and falls in factories.' },
      { title: 'Duct Area Cover Nets', desc: 'Secure narrow plumbing shafts and open duct vents in high-rise apartments in Guduvanchery and Singaperumal Koil.' },
      { title: 'Pigeon Netting Services', desc: 'Tight 30mm co-polymer mesh to keep nesting pigeons away from kitchen utilities and AC ledges.' }
    ],
    faqs: [
      { q: 'Do you issue test certificates for construction nets?', a: 'Yes. All our industrial and construction safety nets come with manufacturer test certificates specifying tensile strength and load limits.' },
      { q: 'Can your team visit Mahindra World City for residential netting?', a: 'Yes. We routinely service apartments inside Mahindra World City, Maraimalai Nagar, and surrounding residential complexes.' }
    ]
  },
  tambaram: {
    name: 'tambaram',
    displayName: 'Tambaram',
    heroTitle: 'Expert Safety Nets & Mosquito Screens in Tambaram',
    heroDesc: 'The leading safety net installer in East & West Tambaram. High-tensile balcony nets, pigeon mesh, and premium Phifer mosquito window screens at budget prices.',
    introTitle: 'Protecting Homes in Tambaram’s Residential Hubs',
    introDesc: 'As the gateway to South Chennai, Tambaram is home to thousands of families. Proximity to local lakes (Selaiyur, Chitlapakkam) results in high mosquito activity, while dense apartment blocks suffer from chronic pigeon nesting. Star Safety Enterprises provides a combined home safety service: installing heavy-duty child safety nets on balconies and custom mosquito screens on windows.',
    suburbs: ['East Tambaram', 'West Tambaram', 'Selaiyur', 'Chromepet', 'Chitlapakkam', 'Selaiyur Lake', 'Mudichur', 'Sanatorium'],
    localHighlight: 'We offer specialized package deals for Tambaram residents—get a discount when combining balcony safety netting with window mosquito screen installations.',
    services: [
      { title: 'Children\'s Safety Netting', desc: 'Robust double-mesh borders for balconies and staircases, certified to hold up to 150 kg for active toddler safety.' },
      { title: 'Window Mosquito Nets', desc: 'Saint Gobain and Phifer screens (pleated retractable, velcro, or magnetic frames) customized for Tambaram homes.' },
      { title: 'Pigeon Netting & Bird Spikes', desc: 'Durable HDPE pigeon protection nets and humane polycarbonate bird spikes for balconies and AC ledges.' }
    ],
    faqs: [
      { q: 'Why are mosquito screens essential in Tambaram?', a: 'Tambaram\'s proximity to water bodies like Selaiyur Lake leads to heavy mosquito breeding. Retractable or velcro screens allow fresh evening air while blocking insects.' },
      { q: 'Do you offer bulk discounts for apartment societies in Selaiyur?', a: 'Yes. We offer special society discounts (up to 20% off) if multiple flat owners coordinate a bulk safety net order together.' }
    ]
  }
};

export default function LocationPage({ city, onOpenQuoteModal }: LocationPageProps) {
  const currentCity = city.toLowerCase();
  const data = cityDataMap[currentCity] || {
    name: currentCity,
    displayName: city.charAt(0).toUpperCase() + city.slice(1),
    heroTitle: `Professional Safety Nets in ${city}`,
    heroDesc: `Premium balcony safety nets, pigeon protection nets, and invisible grills in ${city}. Professional installation with robust warranty.`,
    introTitle: `Securing Homes & Businesses in ${city}`,
    introDesc: `Star Safety Enterprises provides industrial-grade safety nets and professional installation services across ${city} and surrounding areas. Protecting your family from accidental falls and pigeon droppings.`,
    suburbs: [],
    localHighlight: `Our regional technicians serve residential societies, schools, corporate IT parks, and factories, ensuring flawless safety certifications.`,
    services: [
      { title: 'Balcony Safety Nets', desc: 'Heavy-duty transparent and nylon nets designed to prevent falls and accidents in apartment balconies.' },
      { title: 'Pigeon Protection Nets', desc: 'Aesthetic and durable netting solutions to stop pigeon infestation and bird nesting.' }
    ],
    faqs: [
      { q: 'Do you offer free inspection?', a: 'Yes, we provide 100% free site measurements and inspections across all districts.' }
    ]
  };

  const handleQuoteClick = (service?: string) => {
    onOpenQuoteModal(service || 'Balcony Safety Nets');
  };

  const bannerImage = 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938508/starchennaisafetynets/chennai_hero_backdrop.jpg';

  return (
    <div className="bg-white font-sans text-slate-700">
      
      {/* Hero Banner Section */}
      <section className="relative py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={optimizeImage(bannerImage)} 
            alt={`Safety Nets in ${data.displayName}`} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15 select-none"
          />
          <div className="absolute inset-0 bg-primary/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block bg-accent/15 border border-accent/25 py-1 px-3 rounded-full w-fit mx-auto">
            Regional Branch: {data.displayName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
            {data.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
            {data.heroDesc}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleQuoteClick()}
              className="bg-accent hover:bg-accent-light text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg hover:shadow-accent/25 transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-mono"
            >
              Book Free Site Visit <ArrowRight className="h-4 w-4" />
            </button>
            <a 
              href="tel:+919043717064"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center gap-1.5 border border-white/10"
            >
              <Phone className="h-4 w-4" /> Call: +91 90437 17064
            </a>
          </div>
        </div>
      </section>

      {/* Key Quick Stats */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="font-display font-black text-3xl text-accent">Same-Day</p>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">Inspection & Quote</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="font-display font-black text-3xl text-primary">SS 304/316</p>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">Rust-Proof Anchors</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="font-display font-black text-3xl text-primary">10-Year</p>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">Written Warranty</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="font-display font-black text-3xl text-accent">15,000+</p>
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* City Overview Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-5">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Local Coverage</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-primary leading-tight">
                {data.introTitle}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                {data.introDesc}
              </p>
              <p className="text-xs text-slate-400 bg-slate-50 border border-slate-100 p-4 rounded-2xl italic">
                {data.localHighlight}
              </p>
            </div>
            
            {/* Visual Checklist Box */}
            <div className="w-full md:w-80 bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
              <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wide border-b border-slate-200 pb-2">Why Choose Star Safety?</h4>
              <ul className="space-y-3">
                {[
                  'Technicians are Certified Rope Climbers',
                  'ISO 9001:2015 Fabrication Quality',
                  'UV-Stabilized co-polymers (Tropical grade)',
                  'No hidden charges (tax & fixing included)',
                  '100% Free measurements'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suburbs List */}
          {data.suburbs.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <h4 className="font-display font-black text-xs text-primary uppercase tracking-widest mb-4">Areas We Serve in {data.displayName}:</h4>
              <div className="flex flex-wrap gap-2">
                {data.suburbs.map((sub, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-150 rounded-lg text-xs px-3.5 py-1.5 text-slate-600 font-medium">
                    📍 {sub}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services in this Location */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Services Offered</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-primary">Tailored Safety Net Specialties</h2>
            <p className="text-sm text-slate-500">We offer custom-fit installations matching strict safety protocols for all structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.services.map((srv, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-accent/20 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-primary text-base">{srv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{srv.desc}</p>
                </div>
                <button 
                  onClick={() => handleQuoteClick(srv.title)}
                  className="mt-6 text-accent hover:text-accent-light font-bold text-xs flex items-center gap-1 hover:translate-x-1 duration-200 uppercase tracking-wider font-mono self-start"
                >
                  Request Price <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Have Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-primary">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-2">
                <h4 className="font-display font-bold text-sm text-primary flex items-start gap-2">
                  <span className="text-accent font-black">Q:</span>
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans pl-5 border-l-2 border-slate-200">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase">Get A Free Quote in {data.displayName} Today</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our local field technician will visit your site, provide material catalogs (HDPE, Nylon, stainless steel invisible grills), take exact measurements, and give a transparent final quote—completely free.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleQuoteClick()}
              className="bg-accent hover:bg-accent-light text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg shadow-accent/15 cursor-pointer uppercase tracking-wider font-mono"
            >
              Schedule Free Visit
            </button>
            <a 
              href="https://wa.me/919043717064"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
