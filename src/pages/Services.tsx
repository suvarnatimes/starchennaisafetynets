import React, { useState } from 'react';
import { 
  ShieldCheck, Shield, Award, Users, CheckCircle, 
  HelpCircle, ChevronDown, Phone, MessageSquare, 
  Settings, Layers, Sparkles, Heart, Clipboard, Check
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
    title: 'Balcony Safety Nets',
    icon: Shield,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954795/starchennaisafetynets/balcony_safety_1.jpg',
    desc: 'Heavy-duty balcony netting solutions engineered to prevent high-rise apartment falls and secure children and pets.',
    longDesc: 'High-rise apartment balconies offer fresh air and scenic views but pose major hazards for families with curious kids or playful pets. Our professional balcony safety nets are custom-fabricated from UV-treated co-polymers and transparent monofilament wires. They provide solid, reliable fall-arrest security up to 150 kg without blocking air circulation or light.',
    benefits: [
      'Preserves 98% of natural view and sunlight.',
      'Prevents fatal domestic balcony accidents completely.',
      'Heavily UV-resistant—resists bleaching and cracking in hot summers.',
      'Extremely safe and custom-calibrated for pets and children.'
    ],
    features: [
      'Material: 100% co-polymer Nylon or UV HDPE',
      'Breaking Strength: Up to 150 kg impact load',
      'Mesh Size: 25mm to 50mm configured options',
      'Fasteners: Rust-proof Solid Stainless Steel (SS304)'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954795/starchennaisafetynets/balcony_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954797/starchennaisafetynets/balcony_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954798/starchennaisafetynets/balcony_safety_3.jpg'
    ],
    faqs: [
      { q: 'Will the net block my balcony view?', a: 'No, our transparent monofilament safety nets are nearly invisible from a few feet away and do not block light or fresh breeze.' },
      { q: 'What mesh size should I choose if I have a cat?', a: 'For cats and puppies, we install a tight 25mm or 30mm mesh net to prevent them from squeezing through border rails.' }
    ]
  },
  {
    id: 'bird-protection-nets',
    title: 'Bird Protection Nets',
    icon: Sparkles,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954800/starchennaisafetynets/bird_protection_1.jpg',
    desc: 'Keep sparrows and pigeons away from your balconies, windows, and AC vents permanently and humanely.',
    longDesc: 'Pigeon and bird infestations are more than a nuisance; their acidic droppings corrode building concrete, destroy AC coils, and spread dangerous respiratory pathogens. Our high-tensile bird protection nets act as a continuous physical barrier. They prevent birds from landing or nesting anywhere on your exterior walls, shafts, or ducts.',
    benefits: [
      '100% humane—gently guides birds to find other natural habitats without harm.',
      'Maintains pristine apartment cleanliness and hygienic balconies.',
      'Protects expensive external AC compressors and plumbing channels.',
      'Long-lasting—remains intact under high winds.'
    ],
    features: [
      'Material: UV-stabilized High-Density Polyethylene (HDPE)',
      'Mesh Size: 25mm to 35mm (stops smaller birds)',
      'Life Span: Up to 8 years under standard tropical climate',
      'Border: Heavy-duty 1mm wire rope with steel cable loops'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954800/starchennaisafetynets/bird_protection_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954802/starchennaisafetynets/bird_protection_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954805/starchennaisafetynets/bird_protection_3.jpg'
    ],
    faqs: [
      { q: 'Do these nets tear when birds fly into them?', a: 'No. Our bird nets are manufactured from high-tensile HDPE which can absorb sudden impacts without tearing.' },
      { q: 'Do you offer a warranty against bird damage?', a: 'Yes, we provide up to 5 years warranty on bird protection nets.' }
    ]
  },
  {
    id: 'pigeon-safety-nets',
    title: 'Pigeon Safety Nets',
    icon: Heart,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954895/starchennaisafetynets/pigeon_safety_1.jpg',
    desc: 'Sturdy, small-mesh netting solutions targeting stubborn urban pigeon nesting grounds in open windows and AC ledges.',
    longDesc: 'Pigeons are extremely stubborn nesting creatures that frequently infest AC compressor slabs and service shafts. Our pigeon safety nets use a specialized 35mm to 40mm mesh that stops pigeons of all sizes while maintaining maximum transparency. Our technicians use professional climbing equipment to secure these nets across deep outer ledges safely.',
    benefits: [
      'Prevents severe pigeon nesting and noise issues.',
      'Saves money spent on frequent balcony washings and sanitizations.',
      'Invisible from a short distance—maintains home aesthetics.',
      'Weather-proof material that doesn\'t rust or fade.'
    ],
    features: [
      'Material: 15-ply to 21-ply UV-stabilized co-copolymer HDPE',
      'Mesh Size: 35mm to 40mm',
      'Mounting: Stainless Steel wall keyhole loops',
      'Warranty: Up to 5 years certification support'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954895/starchennaisafetynets/pigeon_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954897/starchennaisafetynets/pigeon_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954898/starchennaisafetynets/pigeon_safety_3.jpg'
    ],
    faqs: [
      { q: 'How do you secure the net corners so pigeons do not sneak in?', a: 'We use professional solid steel border framing cables and anchor bolts every 1.5 feet to seal all gaps.' },
      { q: 'Is site inspection free for pigeon netting?', a: 'Yes. We provide free measurements and cost estimates across all Tamil Nadu towns.' }
    ]
  },
  {
    id: 'children-safety-nets',
    title: 'Children\'s Safety Nets',
    icon: Users,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954819/starchennaisafetynets/child_safety_1.jpg',
    desc: 'Heavy-duty double-knotted safety nets designed to prevent falls and secure children near open windows, staircases, and balconies.',
    longDesc: 'Toddler safety is a priority. Windows and high stairs are high-risk areas in modern duplexes and high-rise apartments. Our children safety nets are made of high-tensile, double-knotted co-polymer material designed to absorb high fall energy. They are anchored with double-reinforced fasteners to ensure extreme stability for active, playful toddlers.',
    benefits: [
      'Provides absolute safety around windows, staircases, and balconies.',
      'Double-mesh design for maximum strength and support.',
      'Extremely safe and child-friendly soft material—no sharp wires.',
      'Installed cleanly without disrupting your home interior decor.'
    ],
    features: [
      'Material: High-tensile co-polymer Double-Knotted Nylon',
      'Load Rating: Tested for sudden falls of up to 150 kg',
      'Fasteners: Heavy-duty steel wall anchor loops',
      'Warranty: 5 to 10 years certification'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954819/starchennaisafetynets/child_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954822/starchennaisafetynets/child_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954824/starchennaisafetynets/child_safety_3.jpg'
    ],
    faqs: [
      { q: 'Can a child cut these safety nets with scissors?', a: 'Our nets are made of thick, high-tensile multi-ply co-polymer ropes which are extremely hard to break or cut with safety scissors. However, children should be kept away from sharp tools.' },
      { q: 'Can you install these nets inside around staircases?', a: 'Yes. We specialize in staircase safety nets, windows, and mezzanine railings.' }
    ]
  },
  {
    id: 'construction-safety-nets',
    title: 'Construction Safety Nets',
    icon: Award,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954840/starchennaisafetynets/construction_safety_1.jpg',
    desc: 'OSHA & IS certified heavy fall-arrest safety nets and fine debris containment nets for multi-storey builders.',
    longDesc: 'Under Indian Standard IS-11057, construction safety nets are mandatory for tall engineering and real-estate project sites. We supply and install dual-layer construction nets: an outer high-tensile 100mm rope grid to catch falling workers, and an inner fine green mesh layer to contain falling bricks, concrete plaster, and structural debris.',
    benefits: [
      'Protects high-rise construction workers from fatal falls.',
      'Prevents falling construction debris from hurting pedestrians.',
      'Helps builders comply fully with safety norms (IS-11057).',
      'Highly durable material that resists welding sparks and chemicals.'
    ],
    features: [
      'Material: Heavy braided Polypropylene or Nylon ropes',
      'Breaking Strength: Border ropes rating up to 20 KN',
      'Design: Dual-layer net (Heavy rope + Fine debris mesh)',
      'Standards: Fully complies with IS-11057'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954840/starchennaisafetynets/construction_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954843/starchennaisafetynets/construction_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954845/starchennaisafetynets/construction_safety_3.jpg'
    ],
    faqs: [
      { q: 'Do your construction safety nets have testing certificates?', a: 'Yes. All our industrial and construction safety nets are accompanied by manufacturer test certificates.' },
      { q: 'Can you handle large corporate orders for IT parks?', a: 'Yes. We regularly execute large-scale commercial installations for major builders across Tamil Nadu.' }
    ]
  },
  {
    id: 'coconut-tree-safety-nets',
    title: 'Coconut Tree Safety Nets',
    icon: Clipboard,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954833/starchennaisafetynets/coconut_safety_1.jpg',
    desc: 'Protect pedestrian pathways, parking spaces, and roofs from heavy falling coconuts in tropical yards.',
    longDesc: 'Falling coconuts are a serious safety hazard, capable of causing severe head injuries or destroying car windshields. Our coconut tree safety nets are high-tensile HDPE nets installed horizontally below the tree crown. They catch falling coconuts safely, keeping surrounding pathways and car parks fully secure.',
    benefits: [
      'Prevents severe head injuries and property damages.',
      'Saves cars and window glass in surrounding driveways.',
      'Strong co-polymer material that withstands falling coconut impact.',
      'Weather-resistant—resists continuous monsoon moisture.'
    ],
    features: [
      'Material: Weather-proof thick co-polymer HDPE',
      'Mesh Size: Tight mesh to retain falling coconuts easily',
      'Anchoring: Stainless steel frame anchors and cable hooks',
      'Warranty: Up to 5 years'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954833/starchennaisafetynets/coconut_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954836/starchennaisafetynets/coconut_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954838/starchennaisafetynets/coconut_safety_3.jpg'
    ],
    faqs: [
      { q: 'Does the net affect the coconut tree growth?', a: 'Not at all. The net is mounted a few feet below the tree crown and does not touch or affect the growth of the tree.' },
      { q: 'Can the net catch multiple coconuts?', a: 'Yes, our thick HDPE coconut nets are built to support the weight of multiple falling fruits safely.' }
    ]
  },
  {
    id: 'monkey-safety-nets',
    title: 'Monkey Safety Nets',
    icon: ShieldCheck,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999741/starchennaisafetynets/monkey_safety_net_1.jpg',
    desc: 'Heavy-duty high-tensile mesh nets designed to prevent monkeys from entering residential balconies, terraces, and windows.',
    longDesc: 'Monkey intrusions can cause property damage, mess, and safety hazards for families and pets in apartments and individual homes. Our Monkey Safety Nets use robust, bite-resistant and high-tensile mesh anchored securely along balconies, windows, and terraces to keep monkeys out while preserving natural light and breeze.',
    benefits: [
      'Complete protection against monkey intrusions and property damage.',
      'Strong high-tensile material designed to withstand pulling and climbing.',
      'Maintains clear ventilation and outdoor visibility.',
      'UV-stabilized and weather-resistant for long-term outdoor use.'
    ],
    features: [
      'Material: Heavy-duty UV-treated HDPE / Nylon mesh',
      'Mesh Size: Customized tight mesh preventing entry',
      'Anchoring: Heavy-duty stainless steel anchors & borders',
      'Warranty: Up to 5 years'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999741/starchennaisafetynets/monkey_safety_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999743/starchennaisafetynets/monkey_safety_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999744/starchennaisafetynets/monkey_safety_net_3.jpg'
    ],
    faqs: [
      { q: 'Can monkeys chew or tear through these safety nets?', a: 'Our monkey safety nets are fabricated from high-tensile, heavy-grade fibers specifically chosen to resist pulling, climbing, and wear.' },
      { q: 'Will monkey safety nets block airflow or sunlight?', a: 'No, the mesh allows fresh air and natural sunlight to pass through freely while acting as an effective barrier.' }
    ]
  },
  {
    id: 'cloth-hangers',
    title: 'Cloth Hangers',
    icon: Layers,
    image: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999736/starchennaisafetynets/cloth_hanger_1.jpg',
    desc: 'Space-saving ceiling-mounted pulley cloth drying hangers with rust-free stainless steel pipes.',
    longDesc: 'Drying clothes in apartments and urban homes can take up valuable balcony and floor space. Our ceiling-mounted pulley cloth drying hangers feature high-grade rust-free stainless steel pipes with smooth, independent pulley systems that let you lower each rod effortlessly for hanging laundry and raise it to the ceiling out of the way.',
    benefits: [
      'Saves valuable balcony and floor space.',
      '100% rust-free stainless steel pipes for long durability.',
      'Individual pulley mechanism for effortless raising and lowering.',
      'Neat and modern aesthetic for apartments and utility areas.'
    ],
    features: [
      'Material: High-grade 304 Stainless Steel Pipes',
      'Mechanism: Heavy-duty smooth nylon pulleys & ropes',
      'Mounting: Ceiling anchored with high-strength fasteners',
      'Warranty: Up to 3 years'
    ],
    gallery: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999736/starchennaisafetynets/cloth_hanger_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999738/starchennaisafetynets/cloth_hanger_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999739/starchennaisafetynets/cloth_hanger_3.jpg'
    ],
    faqs: [
      { q: 'Are the stainless steel pipes rust-proof?', a: 'Yes, we use high-grade rust-proof stainless steel pipes suitable even for humid and coastal weather conditions.' },
      { q: 'Can each rod be operated individually?', a: 'Yes, each pipe has an independent pulley system allowing you to lower and raise one pipe at a time.' }
    ]
  }
];

export default function Services({ onOpenQuoteModal, initialService }: ServicesProps) {
  // Find index based on initialService or default to 0
  const defaultIdx = initialService 
    ? serviceDetails.findIndex(s => s.title === initialService || s.id === initialService)
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
            Discover our high-tensile, UV-stabilized safety net systems custom-fabricated for balconies, birds, kids, and builders in Tamil Nadu.
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
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveTab(idx)}
                    className={`group w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                      activeTab === idx 
                        ? 'bg-accent text-white shadow shadow-accent/15' 
                        : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-accent hover:border-slate-200'
                    }`}
                  >
                    <TabIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    {srv.title}
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
                  <div className="bg-accent p-3 rounded-xl">
                    <IconComp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">Star Safety Specialty</span>
                    <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight leading-none text-white mt-1">{activeSrv.title}</h2>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-primary">Service Overview</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">{activeSrv.longDesc}</p>
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
                  <h4 className="font-display font-bold text-sm text-white">Secure your balconies with {activeSrv.title} today!</h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">Book a local technician visit now and enjoy same-day safety net completion.</p>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(activeSrv.title)}
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
