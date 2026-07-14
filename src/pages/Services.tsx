import React, { useState } from 'react';
import { 
  ShieldCheck, Shield, Award, Users, CheckCircle, 
  HelpCircle, ChevronDown, Phone, MessageSquare, 
  Settings, Layers, Sparkles, Heart, Clipboard, Check, Eye
} from 'lucide-react';

interface ServicesProps {
  onOpenQuoteModal: (service?: string) => void;
  initialService?: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  icon: any;
  image: string;
  desc: string;
  longDesc: string;
  benefits: string[];
  features: string[];
  gallery: string[];
  faqs: { q: string; a: string }[];
}

const serviceDetails: ServiceDetail[] = [
  {
    id: 'balcony-safety-nets',
    title: 'Balcony Safety Nets (பால்கனி பாதுகாப்பு வலைகள்)',
    icon: Shield,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954795/starchennaisafetynets/balcony_safety_1.jpg',
    desc: 'Protect your balcony spaces from dangerous intrusions and accidental falls with our premium, high-strength safety nets.',
    longDesc: 'Protect your balconies from dangerous intrusions, keeping children, pets, monkeys, and birds completely safe. Our premium, high-strength safety nets are professionally installed by a trusted, reliable local company to blend seamlessly with your home\'s exterior, ensuring complete peace of mind.',
    benefits: [
      '100% reliable fall-arrest security for children and pets.',
      'High-grade co-polymer UV protection ensures long-term outdoor life.',
      'Maintains 98% of natural views, ventilation, and sunlight.',
      'Offered by a trusted, reliable, and experienced local company.'
    ],
    features: [
      'Material: Premium Nylon, Cotton, and HDPE (High-Density Polyethylene) materials',
      'Protection: Balconies, keeping children, pets, monkeys, and birds safe',
      'Sizing & Options: Custom-tailored sizes with mesh configurations from 25mm to 50mm gaps',
      'Warranty & Support: 6 to 7 Years Warranty with 1 Year of Free Servicing'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954795/starchennaisafetynets/balcony_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954797/starchennaisafetynets/balcony_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954798/starchennaisafetynets/balcony_safety_3.jpg'
    ],
    faqs: [
      { q: 'Will the net block my balcony view?', a: 'No, our transparent and light-colored co-polymer nets maintain 98% of natural light and ventilation.' },
      { q: 'Is the installation safe for high-rise apartments?', a: 'Yes. Our experienced local technicians use professional climbing harnesses and safety equipment to perform secure installations.' }
    ]
  },
  {
    id: 'invisible-grills',
    title: 'Invisible Grills (மறைமுக கம்பி வேலிகள்)',
    icon: Eye,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954788/starchennaisafetynets/invisible_grill_balcony_1.jpg',
    desc: 'Modern safety solution that secures balconies and windows with high-tensile steel cables without blocking your panoramic view.',
    longDesc: 'Upgrade to a modern safety solution that secures balconies and windows without blocking the view. These sleek, premium grills enhance the structural beauty of the balcony and are virtually unnoticeable from a distance, acting as a robust barrier preventing children from falling and keeping monkeys out.',
    benefits: [
      'Sleek, premium look that enhances balcony aesthetics.',
      'Virtually unnoticeable from a distance, preserving views.',
      'Extremely strong high-tensile stainless steel cables.',
      'Completely rust-proof and weather-resistant.'
    ],
    features: [
      'Material: Premium-grade high-tensile stainless steel wire cables with a protective coating',
      'Protection: Acts as a barrier preventing children from falling and keeping monkeys out',
      'Sizing & Options: Available in premium thicknesses of 2mm, 2.5mm, and 3mm',
      'Warranty & Support: Highly durable structure, lasting comfortably for 10 to 12 Years'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954788/starchennaisafetynets/invisible_grill_balcony_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954790/starchennaisafetynets/invisible_grill_balcony_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954793/starchennaisafetynets/invisible_grill_balcony_3.jpg'
    ],
    faqs: [
      { q: 'Are invisible grills safe for active children?', a: 'Yes. They are built from high-tensile stainless steel wire cables and can withstand significant pressure, making them highly secure.' },
      { q: 'Do invisible grills rust over time?', a: 'No, we use high-grade stainless steel cables coated with protective nylon, preventing rust in humid weather.' }
    ]
  },
  {
    id: 'monkey-safety-nets',
    title: 'Monkey Safety Nets (குரங்கு பாதுகாப்பு வலைகள்)',
    icon: ShieldCheck,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999741/starchennaisafetynets/monkey_safety_net_1.jpg',
    desc: 'Heavy-duty bite-resistant nets designed specifically to prevent monkey intrusions into your residential premises.',
    longDesc: 'Keep aggressive and intrusive monkeys at bay with our heavy-duty monkey safety nets. Designed specifically to resist monkey intrusions into homes, these high-tensile nets ensure complete peace of mind and protection for balconies, windows, and open duct areas.',
    benefits: [
      'Heavy-duty bite-resistant build prevents monkeys from tearing the net.',
      'Provides secure anchoring to resist climbing and pulling forces.',
      'Maintains clear ventilation, breeze, and natural sunlight.',
      'Weatherproof construction suitable for hot summers and heavy rains.'
    ],
    features: [
      'Material: Heavy-duty, bite-resistant UV-stabilized HDPE and Nylon mesh',
      'Protection: Complete barrier against monkey intrusions and property damage',
      'Sizing & Options: Custom layouts designed to be installed anywhere—Balconies, Windows, and open Duct Areas',
      'Warranty & Support: 6 Months Warranty backed by 1 Year of Free Servicing'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999741/starchennaisafetynets/monkey_safety_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999743/starchennaisafetynets/monkey_safety_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999744/starchennaisafetynets/monkey_safety_net_3.jpg'
    ],
    faqs: [
      { q: 'Can monkeys climb or tear these safety nets?', a: 'Our nets are manufactured from heavy-duty, multi-ply co-polymer fibers designed to resist biting, tearing, and heavy pulling.' },
      { q: 'Where can these monkey nets be installed?', a: 'They can be installed on balconies, windows, utility areas, and open ventilation ducts.' }
    ]
  },
  {
    id: 'sports-nets',
    title: 'Sports Nets (Cricket, Football, Basketball, Tennis) (விளையாட்டு வலைகள்)',
    icon: Award,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954849/starchennaisafetynets/cricket_practice_net_1.jpg',
    desc: 'Specialized heavy boundary nets tailored for sports enclosures, practicing pitches, and stadium courts.',
    longDesc: 'Enclose your athletic spaces with specialized heavy nets tailored for sports enclosures. Built to withstand heavy impact, these premium nets are designed for professional and residential setups, ensuring safety and containment for all active play.',
    benefits: [
      'Highly durable, built to absorb high-impact sports balls.',
      'Perfect for cricket pitches, football boundaries, and tennis courts.',
      'Weather-resistant properties protect against outdoor solar wear.',
      'Ensures safety for nearby buildings, windows, and spectators.'
    ],
    features: [
      'Material: Heavy-duty Nylon and HDPE sports netting cords',
      'Protection: Boundary containment for sports pitches and protection for surrounding properties',
      'Sizing & Options: Tailored for Cricket practicing pitches, Football boundary nets, Basketball cages, and Tennis courts. Available in multiple colors including Green, Black, and White',
      'Warranty & Support: Prompt installation by professionals, Free Home Delivery available, with affordable fixing and setup charges'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954849/starchennaisafetynets/cricket_practice_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954851/starchennaisafetynets/cricket_practice_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954854/starchennaisafetynets/cricket_practice_net_3.jpg'
    ],
    faqs: [
      { q: 'Do you provide nets in different colors?', a: 'Yes, we supply sports nets in Green, Black, and White configurations to match your site layout.' },
      { q: 'Are setup and installation services included?', a: 'Yes, we provide professional setup and fixing services at highly affordable local market rates.' }
    ]
  },
  {
    id: 'bird-pigeon-safety-nets',
    title: 'Bird / Pigeon Safety Nets (பறவை / புறா பாதுகாப்பு வலைகள்)',
    icon: Sparkles,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954800/starchennaisafetynets/bird_protection_1.jpg',
    desc: 'Humane bird deterrent netting that prevents pigeon infestations and maintains absolute hygiene in balconies.',
    longDesc: 'Maintain absolute hygiene and safety in your home premises by preventing disease-spreading birds like pigeons from entering. Our premium nets offer a durable, humane barrier that keeps balconies, AC ledges, and plumbing ducts clean and sanitized.',
    benefits: [
      '100% humane barrier guiding birds away without causing harm.',
      'Saves cleaning costs by preventing bird droppings and nests.',
      'Strong physical barrier that blocks birds, pigeons, and pests.',
      'Rust-proof fixing using premium nuts and bolts.'
    ],
    features: [
      'Material: Standard Nylon and HD Nylon configurations with durable premium nuts and bolts for structural fixing',
      'Protection: Restricts disease-spreading birds like pigeons and small pests from entering premises',
      'Sizing & Options: Multiple mesh grid options (25mm, 30mm, 40mm, and 50mm gaps) and custom scales (4cm to 10cm scales) to dynamically match balcony sizes',
      'Warranty & Support: Economical, budget-friendly rates with long-lasting structural durability'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954800/starchennaisafetynets/bird_protection_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954802/starchennaisafetynets/bird_protection_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954805/starchennaisafetynets/bird_protection_3.jpg'
    ],
    faqs: [
      { q: 'Will the nets harm the pigeons?', a: 'No, our nets act as a gentle physical barrier that keeps pigeons away without trapping or hurting them.' },
      { q: 'How is the net sized for custom balconies?', a: 'Measurements are calculated based on standard centimeter scales (4cm to 10cm scales) to perfectly match your balcony dimensions.' }
    ]
  },
  {
    id: 'coconut-safety-nets',
    title: 'Coconut Safety Nets (தென்னை மர பாதுகாப்பு வலைகள்)',
    icon: Clipboard,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954833/starchennaisafetynets/coconut_safety_1.jpg',
    desc: 'Heavy-duty overhead safety netting designed to catch falling coconuts, protecting pedestrians and cars.',
    longDesc: 'Ensure pedestrian and property safety with our heavy-duty overhead safety nets designed to catch falling coconuts or large fruits. These robust nets protect children, passersby, and parked vehicles from severe impact and damages.',
    benefits: [
      'Heavy-duty wire/thread build designed for high-impact loads.',
      'Prevents severe head injuries and windshield/vehicle damage.',
      'Can be configured with single or double layers depending on height.',
      'Highly weather-resistant, built for open outdoor exposure.'
    ],
    features: [
      'Material: Heavy wire/thread build available in 2.5mm and 3mm variants',
      'Protection: Defends pedestrians, children, and vehicles below from falling coconuts or large fruits',
      'Sizing & Options: Can be layered as Single Net or Double Net configurations based on custom load requirements',
      'Warranty & Support: High-strength anchoring with premium weather-resistant performance'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954833/starchennaisafetynets/coconut_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954836/starchennaisafetynets/coconut_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954838/starchennaisafetynets/coconut_safety_3.jpg'
    ],
    faqs: [
      { q: 'How many falling coconuts can the net hold?', a: 'Our double-net configurations are designed to safely catch and retain multiple falling coconuts before clearing is required.' },
      { q: 'Does it harm the growth of the tree?', a: 'No, the net is anchored below the tree crown and does not touch or affect the growth of the tree.' }
    ]
  },
  {
    id: 'window-safety-nets',
    title: 'Window Safety Nets (ஜன்னல் பாதுகாப்பு வலைகள்)',
    icon: Layers,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954917/starchennaisafetynets/invisible_grill_window_1.jpg',
    desc: 'Compact, small-gap window safety nets that keep pests and geckos out while keeping fresh air flowing.',
    longDesc: 'Block geckos, lizards, and flying insects from creeping inside your home with our compact window safety nets. Enjoy fresh air and natural window ventilation day and night without worrying about unwanted crawling pests.',
    benefits: [
      'Blocks geckos, lizards, spiders, and crawling bugs.',
      'Sized with tight 25mm gaps specifically to stop insects.',
      'Maintains perfect ventilation and natural room lighting.',
      'Clean, aesthetic installation that fits standard window frames.'
    ],
    features: [
      'Material: Fine-mesh UV-stabilized Nylon filaments',
      'Protection: Restricts lizards, geckos, and flying insects from creeping inside',
      'Sizing & Options: Compact 25mm mesh gap configurations custom-fit to standard residential window frames',
      'Warranty & Support: Lasts securely for 4 to 5 Years, supported by 1 Year of Free Servicing'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954917/starchennaisafetynets/invisible_grill_window_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954920/starchennaisafetynets/invisible_grill_window_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954923/starchennaisafetynets/invisible_grill_window_3.jpg'
    ],
    faqs: [
      { q: 'Will these nets block the window breeze?', a: 'No, the 25mm mesh gaps allow maximum airflow and ventilation while keeping pests out.' },
      { q: 'How long do window safety nets last?', a: 'They are made of high-quality UV-stabilized nylon and comfortably last 4 to 5 years.' }
    ]
  },
  {
    id: 'terrace-safety-nets',
    title: 'Terrace Safety Nets (மொட்டை மாடி பாதுகாப்பு வலைகள்)',
    icon: ShieldCheck,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954912/starchennaisafetynets/invisible_grill_terrace_1.jpg',
    desc: 'Wide-area terrace netting designed to enclose rooftop gardens, keeping pests, snakes, and stray animals out.',
    longDesc: 'Secure your rooftop or open terrace with wide-area open terrace netting that encloses gardens or open house roofs. Keep dangerous stray animals, snakes, and crawling pests completely out of your property while preventing height hazards.',
    benefits: [
      'Secures wide open terrace boundaries, preventing accidents.',
      'Acts as a barrier against snakes, geckos, and crawling pests.',
      'Keeps stray dogs and cats off your rooftop gardens.',
      'High-tensile, weather-resistant HDPE wire built to resist heavy winds.'
    ],
    features: [
      'Material: High-tensile, weather-proof co-polymer HDPE wire mesh',
      'Protection: Prevents falls and keeps dangerous stray animals, snakes, and crawling pests off the terrace',
      'Sizing & Options: Wide-area custom roof and terrace enclosure layouts matching the exact dimensions of your terrace',
      'Warranty & Support: Highly durable structure with long-term weather-proof warranty protection'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954912/starchennaisafetynets/invisible_grill_terrace_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954914/starchennaisafetynets/invisible_grill_terrace_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954916/starchennaisafetynets/invisible_grill_terrace_3.jpg'
    ],
    faqs: [
      { q: 'Is it strong enough to resist heavy winds on rooftops?', a: 'Yes. The co-polymer HDPE wire mesh is UV-stabilized and calibrated to withstand strong rooftop winds without tearing.' },
      { q: 'Does it cover rooftop gardens?', a: 'Yes, it can enclose gardens and terrace perimeters to ensure complete security.' }
    ]
  }
];

export default function Services({ onOpenQuoteModal, initialService }: ServicesProps) {
  // Find index based on initialService or default to 0
  const defaultIdx = initialService 
    ? serviceDetails.findIndex(s => s.title.toLowerCase().includes(initialService.toLowerCase()) || s.id === initialService)
    : 0;
  
  const [activeTab, setActiveTab] = useState(defaultIdx !== -1 ? defaultIdx : 0);
  const activeSrv = serviceDetails[activeTab];
  const IconComp = activeSrv.icon;

  return (
    <div className="bg-white font-sans text-slate-700">
      
      {/* Services Header Banner */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938508/starchennaisafetynets/chennai_hero_backdrop.jpg" 
            alt="Star Safety Services" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15 select-none"
          />
          <div className="absolute inset-0 bg-primary/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Explore Our Offerings</span>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">Our Safety Net Services</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Discover our high-tensile, UV-stabilized safety net systems custom-fabricated for balconies, birds, kids, and builders in Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Main Tabbed Services Workspace */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Sidebar Tab Selection */}
            <div className="w-full lg:w-1/4 space-y-2 select-none">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">Select Safety Net Specialty</span>
              {serviceDetails.map((srv, idx) => {
                const TabIcon = srv.icon;
                const titleParts = srv.title.split(' (');
                const englishTitle = titleParts[0];
                const tamilTitle = titleParts[1] ? `(${titleParts[1]}` : '';
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveTab(idx)}
                    className={`group w-full text-left flex flex-col justify-center px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                      activeTab === idx 
                        ? 'bg-accent text-white shadow shadow-accent/15' 
                        : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-accent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-sm font-semibold">
                      <TabIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                      <span>{englishTitle}</span>
                    </div>
                    {tamilTitle && (
                      <span className={`text-xs ml-7 mt-0.5 font-bold transition-colors ${
                        activeTab === idx ? 'text-white/95' : 'text-slate-500 group-hover:text-accent/80'
                      }`}>
                        {tamilTitle}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Content Section */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xl shadow-slate-100/50 space-y-8">
              
              {/* Cover Banner */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden relative">
                <img 
                  src={activeSrv.image} 
                  alt={activeSrv.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="bg-accent p-3 rounded-xl shrink-0">
                    <IconComp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">Star Safety Specialty</span>
                    <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight leading-tight text-white mt-1">
                      {activeSrv.title.split(' (')[0]}
                    </h2>
                    {activeSrv.title.includes(' (') && (
                      <span className="text-sm sm:text-base text-slate-200 block font-sans font-bold mt-1.5 leading-tight">
                        {`(${activeSrv.title.split(' (')[1]}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-primary">Service Overview</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans whitespace-pre-line">{activeSrv.longDesc}</p>
              </div>

              {/* Two Column Benefits vs Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                {/* Benefits */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-accent" /> Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    {activeSrv.benefits.map((ben, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-slate-500 font-sans leading-relaxed">
                        <span className="text-accent">✓</span>
                        {ben}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-accent" /> Technical Specifications
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2.5 font-sans">
                    {activeSrv.features.map((feat, idx) => (
                      <div key={idx} className="flex justify-between text-xs border-b border-slate-200/50 pb-1.5 last:border-b-0 last:pb-0">
                        <span className="text-slate-400 font-medium">{feat.split(':')[0]}</span>
                        <span className="text-slate-700 font-bold">{feat.split(':')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service FAQs */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="font-display font-bold text-base text-primary flex items-center gap-1.5">
                  <HelpCircle className="h-4.5 w-4.5 text-accent" /> Specialty FAQs
                </h3>
                <div className="space-y-3">
                  {activeSrv.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <h4 className="font-display font-bold text-sm text-primary mb-1">Q: {faq.q}</h4>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Gallery Images */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h3 className="font-display font-bold text-base text-primary">Specialty Work Showcase</h3>
                <div className="grid grid-cols-2 gap-4">
                  {activeSrv.gallery.map((img, idx) => (
                    <div key={idx} className="h-40 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                      <img src={img} alt={`${activeSrv.title} gallery`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated CTA Block */}
              <div className="bg-primary/95 rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Secure your spaces with {activeSrv.title.split(' (')[0]} today!</h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">Book a local technician visit now and enjoy same-day safety net completion.</p>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(activeSrv.title.split(' (')[0])}
                  className="group relative overflow-hidden bg-accent hover:bg-accent-light text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 shadow shadow-accent/15 hover:shadow-accent/40 whitespace-nowrap"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative z-10">Book Free Site Visit</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
