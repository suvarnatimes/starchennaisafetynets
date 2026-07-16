import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Shield, Award, Users, CheckCircle, Truck, 
  HelpCircle, ChevronDown, Phone, MessageSquare, ArrowRight,
  Sparkles, Calendar, Layers, PenTool, Flame, Heart, FileText, Check,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import LogoCarousel from '../components/LogoCarousel.js';
import ReviewSlider from '../components/ReviewSlider.js';
import RippleGrid from '../components/RippleGrid.js';
import Vertical3DWheel from '../components/Vertical3DWheel.js';
import { optimizeImage } from '../utils/optimizeImage.js';

interface HomeProps {
  onChangePage: (page: string) => void;
  onOpenQuoteModal: (service?: string) => void;
}

interface CardImageSlideshowProps {
  images: string[];
  title: string;
}

function CardImageSlideshow({ images, title }: CardImageSlideshowProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="w-full h-full relative overflow-hidden group/slideshow">
      {/* Slides */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={optimizeImage(img)}
            alt={`${title} view ${i + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover shrink-0 select-none"
           loading="lazy" />
        ))}
      </div>

      {/* Navigation Indicators (Dots) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/30 backdrop-blur-xs py-1 px-2.5 rounded-full">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIdx === i ? 'w-4 bg-accent' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Manual Arrow Buttons on Hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/slideshow:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIdx((prev) => (prev + 1) % images.length);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/slideshow:opacity-100 transition-opacity duration-300 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

const services = [
  {
    title: 'Balcony Safety Nets (பால்கனி பாதுகாப்பு வலைகள்)',
    highlightWord: 'Balcony',
    icon: Shield,
    desc: 'Secure your balconies from accidental falls. Made of UV-resistant high-tensile HDPE or transparent monofilament wires. Perfect for high-rise apartment safety.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954795/starchennaisafetynets/balcony_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954797/starchennaisafetynets/balcony_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954798/starchennaisafetynets/balcony_safety_3.jpg'
    ]
  },
  {
    title: 'Bird Protection Nets (பறவை பாதுகாப்பு வலைகள்)',
    highlightWord: 'Bird',
    icon: Sparkles,
    desc: 'Keep pigeons and wild sparrows from infesting and nesting in AC vents, pipes, and shafts without harming them. Long-lasting HDPE material.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954800/starchennaisafetynets/bird_protection_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954802/starchennaisafetynets/bird_protection_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954805/starchennaisafetynets/bird_protection_3.jpg'
    ]
  },
  {
    title: 'Pigeon Safety Nets (புறா பாதுகாப்பு வலைகள்)',
    highlightWord: 'Pigeon',
    icon: Heart,
    desc: 'Specifically designed mesh targets stubborn pigeon flocks. Maintain absolute balcony sanitation with complete transparency and UV protection.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954895/starchennaisafetynets/pigeon_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954897/starchennaisafetynets/pigeon_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954898/starchennaisafetynets/pigeon_safety_3.jpg'
    ]
  },
  {
    title: "Children's Safety Nets (குழந்தைகள் பாதுகாப்பு வலைகள்)",
    highlightWord: "Children's",
    icon: Users,
    desc: 'Double-mesh robust netting configured near windows, staircases, and open balconies. Tested to support weights of up to 150 kg for complete child safety.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954819/starchennaisafetynets/child_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954822/starchennaisafetynets/child_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954824/starchennaisafetynets/child_safety_3.jpg'
    ]
  },
  {
    title: 'Construction Safety Nets (கட்டுமான பாதுகாப்பு வலைகள்)',
    highlightWord: 'Construction',
    icon: Award,
    desc: 'Certified industrial-grade fall arrest and dual-layer debris containment nets for multi-storey project sites. Adheres strictly to IS-11057 standards.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954840/starchennaisafetynets/construction_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954843/starchennaisafetynets/construction_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954845/starchennaisafetynets/construction_safety_3.jpg'
    ]
  },
  {
    title: 'Coconut Tree Safety Nets (தென்னை மர பாதுகாப்பு வலைகள்)',
    highlightWord: 'Coconut',
    icon: PenTool,
    desc: 'Heavy-duty weather-proof rope nets anchored below tall coconut trees to catch falling fruits safely, protecting pedestrians and properties from impact.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954833/starchennaisafetynets/coconut_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954836/starchennaisafetynets/coconut_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954838/starchennaisafetynets/coconut_safety_3.jpg'
    ]
  },
  {
    title: 'Monkey Safety Nets (குரங்கு பாதுகாப்பு வலைகள்)',
    highlightWord: 'Monkey',
    icon: ShieldCheck,
    desc: 'Heavy-duty high-tensile mesh nets designed to prevent monkeys from entering residential balconies, terraces, and windows while maintaining clear ventilation and visibility.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999741/starchennaisafetynets/monkey_safety_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999743/starchennaisafetynets/monkey_safety_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999744/starchennaisafetynets/monkey_safety_net_3.jpg'
    ]
  },
  {
    title: 'Duct Area Safety Nets (குழாய் வழி பாதுகாப்பு வலைகள்)',
    highlightWord: 'Duct',
    icon: Layers,
    desc: 'Cover narrow plumbing shafts, high-rise building ducts, and open service vents to stop garbage accumulation, birds, or accidental worker drops.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954859/starchennaisafetynets/duct_area_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954860/starchennaisafetynets/duct_area_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954864/starchennaisafetynets/duct_area_3.jpg'
    ]
  },
  {
    title: 'Building Safety Nets (கட்டிட பாதுகாப்பு வலைகள்)',
    highlightWord: 'Building',
    icon: Flame,
    desc: 'Comprehensive structural safety wraps designed for aging buildings to secure plaster falls, protect surrounding pathways, and contain debris.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954813/starchennaisafetynets/building_safety_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954815/starchennaisafetynets/building_safety_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954817/starchennaisafetynets/building_safety_3.jpg'
    ]
  }
];

const invisibleGrillServices = [
  {
    title: 'Balcony Invisible Grill (பால்கனி மறைமுக கம்பி வேலி)',
    highlightWord: 'Balcony',
    icon: Shield,
    desc: 'Elegant safety barrier for modern high-rise balconies. Strong 316-grade stainless steel cables with nylon coating ensure complete fall protection without blocking views.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954788/starchennaisafetynets/invisible_grill_balcony_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954790/starchennaisafetynets/invisible_grill_balcony_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954793/starchennaisafetynets/invisible_grill_balcony_3.jpg'
    ]
  },
  {
    title: 'Window Invisible Grill (ஜன்னல் மறைமுக கம்பி வேலி)',
    highlightWord: 'Window',
    icon: Layers,
    desc: 'Ditch ugly iron grates. Window invisible grills feature thin, extremely strong steel wires spaced perfectly to keep kids and pets safe while preserving window breeze and beautiful outside views.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954917/starchennaisafetynets/invisible_grill_window_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954920/starchennaisafetynets/invisible_grill_window_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954923/starchennaisafetynets/invisible_grill_window_3.jpg'
    ]
  },
  {
    title: 'Staircase Invisible Grill (படிக்கட்டு மறைமுக கம்பி வேலி)',
    highlightWord: 'Staircase',
    icon: Flame,
    desc: 'Custom vertically stretched high-tension wires alongside open staircase railings. Prevents kids from slipping through gaps while retaining the modern architectural openness of your home.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954900/starchennaisafetynets/invisible_grill_staircase_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954902/starchennaisafetynets/invisible_grill_staircase_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954904/starchennaisafetynets/invisible_grill_staircase_3.jpg'
    ]
  },
  {
    title: 'Terrace Invisible Grill (மொட்டை மாடி மறைமுக கம்பி வேலி)',
    highlightWord: 'Terrace',
    icon: ShieldCheck,
    desc: 'Ensure absolute safety on rooftop garden edges or open terraces. Provides high-security load-bearing boundaries without obstructing magnificent skyline scenery.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954912/starchennaisafetynets/invisible_grill_terrace_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954914/starchennaisafetynets/invisible_grill_terrace_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954916/starchennaisafetynets/invisible_grill_terrace_3.jpg'
    ]
  },
  {
    title: 'Office Invisible Grill (அலுவலக மறைமுக கம்பி வேலி)',
    highlightWord: 'Office',
    icon: Sparkles,
    desc: 'Minimalist perimeter safety barriers designed for corporate high-rises, commercial office ducts, and luxury showrooms. Offers modern aesthetics with rigid safety certification.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954889/starchennaisafetynets/invisible_grill_office_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954891/starchennaisafetynets/invisible_grill_office_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954893/starchennaisafetynets/invisible_grill_office_3.jpg'
    ]
  }
];

const sportsNetServices = [
  {
    title: 'Cricket Practice Nets (கிரிக்கெட் பயிற்சி வலைகள்)',
    highlightWord: 'Cricket',
    icon: Sparkles,
    desc: 'Premium robust sports netting setups for professional cricket clubs, residential terraces, and school grounds. UV-treated nylon nets built to absorb heavy cricket ball impact.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954849/starchennaisafetynets/cricket_practice_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954851/starchennaisafetynets/cricket_practice_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954854/starchennaisafetynets/cricket_practice_net_3.jpg'
    ]
  },
  {
    title: 'Football Nets (கால்பந்து வலைகள்)',
    highlightWord: 'Football',
    icon: Award,
    desc: 'Custom high-density co-polymer goalpost nets and enclosing fence nets for turf courts and outdoor football grounds. Extreme tear resistance and high-tensile knotting.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954866/starchennaisafetynets/football_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954868/starchennaisafetynets/football_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954870/starchennaisafetynets/football_net_3.jpg'
    ]
  },
  {
    title: 'Tennis Court Nets (டென்னிஸ் விளையாட்டு வலைகள்)',
    highlightWord: 'Tennis',
    icon: Shield,
    desc: 'Heavy-duty tournament-grade tennis nets and perimeter backdrop windbreak netting. Resists continuous outdoor solar wear, wind pressure, and rain.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954907/starchennaisafetynets/tennis_court_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954909/starchennaisafetynets/tennis_court_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954911/starchennaisafetynets/tennis_court_net_3.jpg'
    ]
  },
  {
    title: 'Golf Practice Nets (கோல்ஃப் பயிற்சி வலைகள்)',
    highlightWord: 'Golf',
    icon: Heart,
    desc: 'Tight-mesh ultra-durable containment nets that stop golf balls of high-velocity impact. Safely practice drives inside residential spaces, offices, or gardens.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954873/starchennaisafetynets/golf_practice_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954875/starchennaisafetynets/golf_practice_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954877/starchennaisafetynets/golf_practice_net_3.jpg'
    ]
  }
];

const householdServices = [
  {
    title: 'Cloth Hangers (துணி உலர்த்தும் கம்பிகள்)',
    highlightWord: 'Cloth',
    icon: Layers,
    desc: 'Space-saving ceiling-mounted pulley cloth drying hangers. High-quality rust-free stainless steel pipes ideal for apartments in Chennai.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999736/starchennaisafetynets/cloth_hanger_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999738/starchennaisafetynets/cloth_hanger_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783999739/starchennaisafetynets/cloth_hanger_3.jpg'
    ]
  },
  {
    title: 'Mosquito Nets (கொசு வலைகள்)',
    highlightWord: 'Mosquito',
    icon: ShieldCheck,
    desc: 'Premium Velcro and pleated mosquito net screens for windows and doors. Durable mesh protection keeping insects away while preserving airflow.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954884/starchennaisafetynets/mosquito_net_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954886/starchennaisafetynets/mosquito_net_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954888/starchennaisafetynets/mosquito_net_3.jpg'
    ]
  },
  {
    title: 'Bird Spikes (பறவை தடுப்பு முட்கள்)',
    highlightWord: 'Bird',
    icon: Sparkles,
    desc: 'Polycarbonate and stainless steel bird spikes. Long-lasting humane deterrents to prevent birds and pigeons from nesting on ledges.',
    images: [
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954807/starchennaisafetynets/bird_spikes_1.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954809/starchennaisafetynets/bird_spikes_2.jpg',
      'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783954810/starchennaisafetynets/bird_spikes_3.jpg'
    ]
  }
];

interface ScrollingServiceRowProps {
  items: typeof services;
  onChangePage: (page: string) => void;
  onOpenQuoteModal: (service?: string) => void;
}

function ScrollingServiceRow({ items, onChangePage, onOpenQuoteModal }: ScrollingServiceRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToIdx = (idx: number) => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 32 : 380 + 32;
      scrollContainerRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setActiveIdx(idx);
    }
  };

  const scrollServices = (direction: 'left' | 'right') => {
    const nextIdx = direction === 'left' 
      ? (activeIdx - 1 + items.length) % items.length
      : (activeIdx + 1) % items.length;
    scrollToIdx(nextIdx);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const firstChild = el.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 32 : 380 + 32;
      const currentIdx = Math.round(scrollLeft / cardWidth);
      if (currentIdx >= 0 && currentIdx < items.length) {
        setActiveIdx((prev) => (prev !== currentIdx ? currentIdx : prev));
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  const renderTitle = (title: string, highlight: string) => {
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <span key={i} className="text-accent font-black">{part}</span> 
            : part
        )}
      </>
    );
  };

  return (
    <div>
      {/* Horizontal Scrolling Wrapper */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((srv, idx) => {
          const IconComp = srv.icon;
          return (
            <div 
              key={idx} 
              className="w-full sm:w-[380px] shrink-0 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group snap-start"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <CardImageSlideshow images={srv.images} title={srv.title} />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow p-2.5 rounded-xl text-accent z-10">
                    <IconComp className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors leading-tight">
                    {renderTitle(srv.title.split(' (')[0], srv.highlightWord)}
                    {srv.title.includes(' (') && (
                      <span className="text-sm text-slate-500 block font-sans font-bold mt-1.5 leading-normal">
                        {`(${srv.title.split(' (')[1]}`}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed h-16 overflow-y-auto scrollbar-none">{srv.desc}</p>
                </div>
              </div>
              <div className="p-6 pt-0 flex gap-3">
                <button 
                  onClick={() => onChangePage('services')}
                  className="group flex-1 text-center bg-slate-50 hover:bg-primary hover:text-white border border-slate-100 hover:border-primary text-xs text-primary font-bold py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  Learn More
                </button>
                <button 
                  onClick={() => onOpenQuoteModal(srv.title)}
                  className="group relative overflow-hidden flex-1 text-center bg-accent hover:bg-accent-light text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 shadow shadow-accent/15 hover:shadow-accent/30"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative z-10">Get Quote</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Centered Modern Floating Navigation Deck */}
      <div className="flex flex-col items-center mt-3 mb-2">
        <div className="inline-flex items-center gap-5 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-200/20">
          
          {/* Left Arrow (Glassmorphic Pill) */}
          <button
            onClick={() => scrollServices('left')}
            className="group h-9 w-9 rounded-full bg-slate-50 hover:bg-accent border border-slate-200/60 hover:border-accent text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-4.5 w-4.5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Dynamic Pill Indicators */}
          <div className="flex items-center gap-1.5 px-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIdx === i 
                    ? 'w-5 bg-accent shadow-[0_0_8px_rgba(var(--color-accent),0.3)]' 
                    : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to service ${i + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow (Glassmorphic Pill) */}
          <button
            onClick={() => scrollServices('right')}
            className="group h-9 w-9 rounded-full bg-slate-50 hover:bg-accent border border-slate-200/60 hover:border-accent text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
            aria-label="Next service"
          >
            <ChevronRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default function Home({ onChangePage, onOpenQuoteModal }: HomeProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  const scrollToIdx = (idx: number) => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 32 : 380 + 32;
      scrollContainerRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setActiveServiceIdx(idx);
    }
  };

  const scrollServices = (direction: 'left' | 'right') => {
    const nextIdx = direction === 'left' 
      ? (activeServiceIdx - 1 + services.length) % services.length
      : (activeServiceIdx + 1) % services.length;
    scrollToIdx(nextIdx);
  };

  // Auto-scroll services every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = (activeServiceIdx + 1) % services.length;
      scrollToIdx(nextIdx);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeServiceIdx]);

  // Handle manual scroll updates (e.g. touch swiping)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const firstChild = el.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 32 : 380 + 32;
      const currentIdx = Math.round(scrollLeft / cardWidth);
      if (currentIdx >= 0 && currentIdx < services.length) {
        setActiveServiceIdx((prev) => (prev !== currentIdx ? currentIdx : prev));
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTitle = (title: string, highlight: string) => {
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <span key={i} className="text-accent font-black">{part}</span> 
            : part
        )}
      </>
    );
  };

  const features = [
    { title: 'Chennai Safety Net Dealers', desc: 'Over 12 years of professional safety net installation services across Chennai and Tamil Nadu.' },
    { title: 'Balcony Safety Net Material', desc: 'UV-stabilized, high-density polyethylene (HDPE) and transparent nylon monofilament nets built for tropical weather.' },
    { title: 'Best Mosquito Net Options', desc: 'Premium mosquito screens for windows and doors using Phifer and Saint Gobain fabrics.' },
    { title: 'Fast Local Installation', desc: 'Same-day site measurement and complete balcony safety net setup within 3 to 5 hours.' },
    { title: 'Written Warranty Support', desc: 'Official written warranty certificates ranging from 3 to 10 years on all safety nets.' },
    { title: 'Certified Climbing Crew', desc: 'Technicians are trained rope-access climbers wearing safety helmets and harnesses.' },
    { title: 'Tamil Nadu Regional Hubs', desc: 'Local offices serving Chennai, Coimbatore, Madurai, Trichy, Pondicherry, and Salem.' },
    { title: 'Free Measurement & Quote', desc: 'No-obligation laser measurement, material catalogs, and transparent quote per square foot.' }
  ];

  const steps = [
    { num: '1', title: 'Request Free Visit', desc: 'Call us or request a WhatsApp quote to schedule safety net dealers near you.' },
    { num: '2', title: 'Laser Measurement', desc: 'Our technician visits with HDPE safety net and mosquito screen samples to measure.' },
    { num: '3', title: 'Tension Installation', desc: 'Climbing experts anchor marine-grade stainless steel hooks and stretch the nets under high tension.' },
    { num: '4', title: 'Warranty Handoff', desc: 'Final load testing check (up to 150 kg) and written warranty certificate handoff.' }
  ];

  const faqs = [
    { q: 'What is the balcony safety nets price per square feet in chennai?', a: 'Pricing is based on a transparent per-square-foot rate. Standard pigeon net for balcony starts at ₹20 - ₹35 per sq. ft., while premium transparent nylon nets range from ₹25 - ₹40 per sq. ft., including custom sizing and professional installation with rust-proof anchors.' },
    { q: 'Why should I install pigeon safety nets in chennai balconies?', a: 'Pigeons nesting in AC ducts and shafts cause severe sanitation issues and health hazards. A high-tensile 35mm-50mm pigeon safety net acts as a humane physical barrier that keeps birds away without harming them.' },
    { q: 'Which is the best mosquito net in chennai for apartment windows?', a: 'For windows, pleated retractable mosquito nets or velcro screen borders are highly popular. We recommend Phifer and Saint Gobain glass fiber meshes, which block insects, maintain 98% ventilation, and do not rot under direct sunlight.' },
    { q: 'Are balcony safety nets safe enough for active toddlers and cats?', a: 'Absolutely. Our double-mesh HDPE child safety nets are reinforced with steel border wires and heavy anchor brackets, certified to hold sudden impact drops of up to 150 kilograms.' },
    { q: 'Do you install invisible grills in chennai apartments?', a: 'Yes! Invisible grills in chennai are a modern replacement for iron grates. They use 316-grade stainless steel wire cables spaced at 2" or 3" intervals to secure balconies and windows without blocking views.' },
    { q: 'Why do safety net hooks rust, and how do you prevent it?', a: 'Chennai\'s coastal salt air corrodes standard iron hooks, causing rust stains. Star Safety Enterprises exclusively uses SS304/SS316 stainless steel fasteners, ensuring they remain completely rust-free.' },
    { q: 'How long does the safety net installation process take?', a: 'A standard residential balcony safety net or window mosquito screen installation is completed by our local team within 2 to 4 hours, with zero clean-up required from your end.' }
  ];

  return (
    <div className="bg-white font-sans text-slate-700">
      
      {/* 1. HERO BANNER */}
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-24 md:pt-0">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938508/starchennaisafetynets/chennai_hero_backdrop.jpg" 
            alt="Safety Netting Backdrop" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-10 select-none"
          />
          <RippleGrid 
            enableRainbow={false}
            gridColor="#FF5A1F"
            rippleIntensity={0.06}
            gridSize={12.0}
            gridThickness={3.5}
            fadeDistance={1.8}
            vignetteStrength={1.5}
            glowIntensity={0.25}
            opacity={0.35}
            gridRotation={15}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent/40 z-10 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between">
          {/* Left Column: Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-xs text-accent font-semibold font-mono animate-pulse uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> ISO 9001:2015 Certified Service
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white leading-tight tracking-tight">
              Balcony Safety Nets & <br />
              <span className="text-accent">Pigeon Netting Chennai</span> <br />
              Tamil Nadu Services
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Secure your home with Chennai's trusted safety net dealers. We install premium, UV-resistant balcony safety nets, pigeon safety nets, and rust-proof invisible grills with same-day measurement and a written warranty.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="tel:+919840245678"
                className="group relative overflow-hidden flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
                {/* Premium Shimmer element */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                
                <Phone className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Call Now (+91 98402 45678)</span>
              </a>
              <a 
                href="https://wa.me/919840245678?text=Hi%20Star%20Safety,%20I'm%20looking%20for%20safety%20net%20installation%20services.%20Please%20share%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-xl shadow-green-500/10 hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
                {/* Premium Shimmer element */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                
                <MessageSquare className="h-5 w-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">WhatsApp Chat</span>
              </a>
              <button 
                onClick={() => onOpenQuoteModal()}
                className="group relative overflow-hidden flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 font-bold text-base px-6 py-3.5 rounded-xl border border-white/20 hover:border-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request Free Quote
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300 text-accent group-hover:text-accent-dark" />
                </span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-8 pt-10 max-w-md mx-auto lg:mx-0 border-t border-white/10 mt-8">
              <div>
                <p className="font-display font-black text-2xl sm:text-3xl text-accent">15,000+</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono font-semibold uppercase tracking-wider">Homes Secured</p>
              </div>
              <div>
                <p className="font-display font-black text-2xl sm:text-3xl text-white">100%</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono font-semibold uppercase tracking-wider">UV treated net</p>
              </div>
              <div>
                <p className="font-display font-black text-2xl sm:text-3xl text-white">10-Year</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono font-semibold uppercase tracking-wider">Warranty Opt.</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Vertical Wheel Carousel */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end py-6">
            <Vertical3DWheel />
          </div>
        </div>
      </section>

      {/* 2. LOGO CAROUSEL */}
      <section className="bg-white">
        <LogoCarousel />
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-12 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Section Header */}
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Comprehensive Protection Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-primary leading-tight">Our Premium Installation Services</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl mx-auto">
              Explore our heavy-duty, weather-proof safety nets, modern high-tensile invisible grills, and professional sports netting customized for homes, clubs, and commercial complexes in Tamil Nadu.
            </p>
          </div>

          {/* ROW 1: SAFETY NETS */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <div>
                <h3 className="text-lg sm:text-xl font-display font-black text-primary">Professional Safety Nets</h3>
                <p className="text-xs text-slate-500 font-sans">Heavy-duty co-polymer & Nylon safety barriers for balconies, children, duct areas, and industries.</p>
              </div>
            </div>
            <ScrollingServiceRow 
              items={services} 
              onChangePage={onChangePage} 
              onOpenQuoteModal={onOpenQuoteModal} 
            />
          </div>

          {/* ROW 2: INVISIBLE GRILLS */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <div>
                <h3 className="text-lg sm:text-xl font-display font-black text-primary">Professional Invisible Grills</h3>
                <p className="text-xs text-slate-500 font-sans">Durable, high-tension 316 stainless steel wires for modern safety with zero view obstruction.</p>
              </div>
            </div>
            <ScrollingServiceRow 
              items={invisibleGrillServices} 
              onChangePage={onChangePage} 
              onOpenQuoteModal={onOpenQuoteModal} 
            />
          </div>

          {/* ROW 3: SPORTS NETS */}
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <div>
                <h3 className="text-lg sm:text-xl font-display font-black text-primary">Premium Sports Nets</h3>
                <p className="text-xs text-slate-500 font-sans">Tournament-grade cricket practice nets, football goalpost nets, tennis, and golf practice setups.</p>
              </div>
            </div>
            <ScrollingServiceRow 
              items={sportsNetServices} 
              onChangePage={onChangePage} 
              onOpenQuoteModal={onOpenQuoteModal} 
            />
          </div>

          {/* ROW 4: HOUSEHOLD ACCESSORIES & BIRD SPIKES */}
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <div>
                <h3 className="text-lg sm:text-xl font-display font-black text-primary">Household Safety & Accessories</h3>
                <p className="text-xs text-slate-500 font-sans">Premium ceiling cloth hangers, custom window mosquito nets, and polycarbonate/stainless steel bird spikes.</p>
              </div>
            </div>
            <ScrollingServiceRow 
              items={householdServices} 
              onChangePage={onChangePage} 
              onOpenQuoteModal={onOpenQuoteModal} 
            />
          </div>

        </div>
      </section>

      {/* FREE SITE MEASUREMENT FORM SECTION */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
            {/* Background Accent glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            {/* Left Column: Info */}
            <div className="flex-1 space-y-6 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-xs text-accent font-semibold font-mono uppercase tracking-wider">
                ⚡ Complimentary On-Site Estimation
              </div>
              <h3 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight leading-tight">
                Schedule Your Free <br className="hidden sm:inline" />Safety Net Measurement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                Our expert safety net installers will visit your premises anywhere in Chennai or Tamil Nadu. We bring material samples of HDPE nets, transparent Nylon nets, and window mosquito screens to provide a laser-accurate, no-obligation price quote per square foot.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400 font-mono font-semibold">
                <span className="flex items-center gap-1.5 text-accent">✓ Same-day booking slots</span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-white">✓ Physical net samples demo</span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-white">✓ No obligation estimate</span>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-[420px] bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100 relative z-10 text-slate-700">
              <h4 className="font-display font-black text-primary text-xl tracking-tight mb-2">Book Free Visit</h4>
              <p className="text-xs text-slate-500 mb-5">Provide your details below to schedule your site verification visit.</p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem('custName') as HTMLInputElement).value;
                  const phone = (form.elements.namedItem('custPhone') as HTMLInputElement).value;
                  const city = (form.elements.namedItem('custCity') as HTMLSelectElement).value;
                  const service = (form.elements.namedItem('custService') as HTMLSelectElement).value;
                  const message = `Home Page Section Form Submission. Requested site measurement visit.`;

                  try {
                    const res = await fetch('/api/inquiries', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name, phone, city, service, message })
                    });
                    if (res.ok) {
                      alert('Thank you! Your free measurement visit has been booked successfully. Our Tamil Nadu local technician will call you within 2 hours to confirm details.');
                      form.reset();
                    } else {
                      alert('Something went wrong, please call us directly for immediate support.');
                    }
                  } catch (err) {
                    alert('Network error. Please call us directly.');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Your Full Name <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="custName" 
                    required 
                    placeholder="e.g., Anbu Selvan" 
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs text-primary placeholder-slate-400 focus:outline-none focus:border-accent font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile Number <span className="text-rose-400">*</span></label>
                  <input 
                    type="tel" 
                    name="custPhone" 
                    required 
                    placeholder="e.g., 9840245678" 
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs text-primary placeholder-slate-400 focus:outline-none focus:border-accent font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Select City <span className="text-rose-400">*</span></label>
                    <select 
                      name="custCity" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-3 text-xs text-primary focus:outline-none focus:border-accent font-semibold"
                    >
                      <option value="">Select City</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                      <option value="Hosur">Hosur</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Net Speciality <span className="text-rose-400">*</span></label>
                    <select 
                      name="custService" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-3 text-xs text-primary focus:outline-none focus:border-accent font-semibold"
                    >
                      <option value="">Select Type</option>
                      <option value="Balcony Safety Nets">Balcony Nets</option>
                      <option value="Pigeon Safety Nets">Pigeon Nets</option>
                      <option value="Bird Protection Nets">Bird Protection</option>
                      <option value="Children Safety Nets">Child Safety</option>
                      <option value="Construction Nets">Construction Nets</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="group relative overflow-hidden w-full bg-accent hover:bg-accent-light text-white font-bold text-xs py-3.5 rounded-xl shadow-lg hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative z-10">Book Free Site Visit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Box Image */}
            <div className="flex-1 relative w-full max-w-lg">
              <div className="absolute -inset-2 bg-accent/5 rounded-3xl -z-10 translate-x-4 translate-y-4" />
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" 
                alt="Quality Net Material" 
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover rounded-3xl shadow-lg"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-primary/95 backdrop-blur-md p-6 rounded-2xl border border-white/5 text-white">
                <p className="text-xs font-mono text-accent font-bold uppercase tracking-widest mb-1">Our Safety Commitment</p>
                <p className="text-sm font-sans text-slate-200 leading-relaxed">
                  We verify every knot, anchor, and border cable personally. Safety isn't a option for us—it's our absolute baseline.
                </p>
              </div>
            </div>

            {/* Right Feature Grid */}
            <div className="flex-1 space-y-8">
              <div className="space-y-3 text-center lg:text-left">
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Top Rated Safety Net Dealers</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-primary leading-tight">Durable Balcony & Pigeon Netting Chennai</h2>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  When it comes to balcony safety nets and pigeon protection screens, quality and tension are critical. As leading safety net installers in Tamil Nadu, we engineer setups that resist weather, bird bites, and structural stress.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent flex-shrink-0 mt-0.5">
                      <Check className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-primary">{feat.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORK PROCESS */}
      <section className="py-20 bg-slate-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-primary">Simple 4-Step Process</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Securing your spaces with Star Safety is extremely fast, transparent, and completely hazard-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm relative group hover:shadow-md transition-all">
                {/* Step Connector arrow on desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
                <div className="h-10 w-10 rounded-xl bg-accent text-white font-display font-black flex items-center justify-center text-lg mb-4 shadow shadow-accent/20">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-base text-primary mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Customer Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-primary">Aesthetic. Secure. Rated 5 Stars.</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Read real-world feedback from families and engineers who have secured their buildings with our team.
            </p>
          </div>

          <ReviewSlider />
        </div>
      </section>

      {/* 7. ACCORDION FAQ SECTION */}
      <section className="py-20 bg-slate-50/50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Chennai Safety Net FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-primary">Safety & Pigeon Nets Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              Find direct answers regarding balcony safety net pricing, mesh sizes, Phifer vs Saint Gobain window mosquito nets, and invisible grill installations in Chennai.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-primary hover:text-accent font-display font-bold text-sm md:text-base focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 animate-slideDown font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="relative py-20 bg-primary overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" 
            alt="Safety work banner" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-10 select-none"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight">
            Get Professional Balcony Safety Nets Installed Today
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Secure your home or office now. Book a free same-day site measurement with Chennai's top safety net dealers to get premium pigeon nets, pet barriers, or invisible grills installed.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="tel:+919840245678"
              className="group relative overflow-hidden flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
              <Phone className="h-4.5 w-4.5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Call Now (+91 98402 45678)</span>
            </a>
            <a 
              href="https://wa.me/919840245678?text=Hello%20Star%20Safety,%20I'm%20looking%20for%20safety%20net%20installation%20services.%20Please%20share%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
              <MessageSquare className="h-4.5 w-4.5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">WhatsApp Quote</span>
            </a>
            <button 
              onClick={() => onOpenQuoteModal()}
              className="group relative overflow-hidden flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 font-bold px-6 py-3.5 rounded-xl border border-white/20 hover:border-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-white/5"
            >
              <span className="relative z-10">Book Free Site Visit</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
