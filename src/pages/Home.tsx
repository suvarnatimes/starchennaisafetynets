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
            src={img}
            alt={`${title} view ${i + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover shrink-0 select-none"
          />
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
    title: 'Balcony Safety Nets',
    highlightWord: 'Balcony',
    icon: Shield,
    desc: 'Secure your balconies from accidental falls. Made of UV-resistant high-tensile HDPE or transparent monofilament wires. Perfect for high-rise apartment safety.',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Bird Protection Nets',
    highlightWord: 'Bird',
    icon: Sparkles,
    desc: 'Keep pigeons and wild sparrows from infesting and nesting in AC vents, pipes, and shafts without harming them. Long-lasting HDPE material.',
    images: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Pigeon Safety Nets',
    highlightWord: 'Pigeon',
    icon: Heart,
    desc: 'Specifically designed mesh targets stubborn pigeon flocks. Maintain absolute balcony sanitation with complete transparency and UV protection.',
    images: [
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: "Children's Safety Nets",
    highlightWord: "Children's",
    icon: Users,
    desc: 'Double-mesh robust netting configured near windows, staircases, and open balconies. Tested to support weights of up to 150 kg for complete child safety.',
    images: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Construction Safety Nets',
    highlightWord: 'Construction',
    icon: Award,
    desc: 'Certified industrial-grade fall arrest and dual-layer debris containment nets for multi-storey project sites. Adheres strictly to IS-11057 standards.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Coconut Tree Safety Nets',
    highlightWord: 'Coconut',
    icon: PenTool,
    desc: 'Heavy-duty weather-proof rope nets anchored below tall coconut trees to catch falling fruits safely, protecting pedestrians and properties from impact.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Industrial Safety Nets',
    highlightWord: 'Industrial',
    icon: ShieldCheck,
    desc: 'High-altitude rope nets designed for warehouses, chemical plants, and manufacturing bays. Secure cargo storage and material handling facilities.',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531834685032-c34bf0d8b939?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Duct Area Safety Nets',
    highlightWord: 'Duct',
    icon: Layers,
    desc: 'Cover narrow plumbing shafts, high-rise building ducts, and open service vents to stop garbage accumulation, birds, or accidental worker drops.',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    title: 'Building Safety Nets',
    highlightWord: 'Building',
    icon: Flame,
    desc: 'Comprehensive structural safety wraps designed for aging buildings to secure plaster falls, protect surrounding pathways, and contain debris.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600'
    ]
  }
];

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
    { title: 'Experienced Team', desc: 'Over 12 years of professional rope-access climbing and safety installations across Tamil Nadu.' },
    { title: 'Premium Quality Materials', desc: 'UV-stabilized, high-density polyethylene (HDPE) and transparent monofilament nets built to last.' },
    { title: 'Affordable Pricing', desc: 'Competitive transparent per-square-foot rates with zero hidden material surcharges.' },
    { title: 'Fast Installation', desc: 'Same-day site measurement and complete expert installation within 3 to 5 hours.' },
    { title: 'Durable Warranty', desc: 'We provide written warranty certificate support ranging from 3 to 10 years.' },
    { title: 'Professional Service', desc: 'Fully trained installers wearing certified safety harnesses, helmets, and ropes.' },
    { title: 'Tamil Nadu Wide Coverage', desc: 'Offices in Chennai, Coimbatore, Madurai, Trichy, Salem, Hosur, and major districts.' },
    { title: 'Free Site Inspection', desc: 'Enjoy 100% free site inspections, catalog walkthroughs, and precise measurements.' }
  ];

  const steps = [
    { num: '1', title: 'Contact Us', desc: 'Call us or request a WhatsApp quote to share your basic safety requirements.' },
    { num: '2', title: 'Site Inspection', desc: 'Our technician visits your property for a free precise measurement and catalog showcase.' },
    { num: '3', title: 'Installation', desc: 'Our certified climbing experts mount rust-proof anchors and stretch nets under perfect tension.' },
    { num: '4', title: 'Final Quality Check', desc: 'Complete structural tension and border anchor audit to certify the warranty certificate.' }
  ];

  const faqs = [
    { q: 'What types of safety nets do you offer?', a: 'We offer an extensive catalog including Balcony Safety Nets, Pigeon & Bird Protection Nets, Children Safety Nets, Construction/Industrial Safety Nets, Coconut Tree Nets, AC Duct/Shaft Nets, and specialized building sports nets.' },
    { q: 'What material is used in balcony safety nets?', a: 'We use high-grade UV-stabilized, 100% co-polymer Nylon or High-Density Polyethylene (HDPE) materials. Our nets are resistant to weather changes, extreme summer heat, and monsoon rain, maintaining high tensile strength for years.' },
    { q: 'How long do these safety nets typically last?', a: 'Depending on the material weight (e.g. 0.7mm nylon vs 1.2mm HDPE), our nets are highly durable and last anywhere from 5 to 8+ years under tropical climate conditions across Tamil Nadu.' },
    { q: 'Do you offer a written warranty on installations?', a: 'Yes. Star Safety Enterprises provides a written warranty ranging from 3 to 10 years, depending on the netting ply and brand you select during measurement.' },
    { q: 'How much does safety net installation cost?', a: 'Pricing is based on a transparent per-square-foot rate. We provide highly competitive pricing with zero hidden charges. You can call or request a free site measurement to get a final quotation.' },
    { q: 'Is the site measurement and inspection really free?', a: 'Yes, 100% free. We send our safety technicians to your home, school, or factory anywhere in Tamil Nadu to measure and give you samples without any obligation to purchase.' },
    { q: 'Do transparent monofilament safety nets block air or light?', a: 'Not at all. Our transparent safety nets maintain 98% of your natural view, let in maximum sunlight, and support complete ventilation/airflow.' },
    { q: 'Will bird protection nets harm the birds?', a: 'No, we value animal safety. Our bird protection nets act strictly as a physical barrier that humane, bird-safe, and pesticide-free, preventing pigeons from nesting without causing any harm.' },
    { q: 'Are safety nets strong enough to protect domestic pets like cats?', a: 'Absolutely. We install tight-mesh pet protection nets (usually 25mm mesh) that prevent cats, dogs, or puppies from climbing through or slipping past high-rise railings.' },
    { q: 'How much load weight can child safety nets support?', a: 'Our high-tensile children safety nets are reinforced with solid steel border anchor clips and can safely support a structural impact load of up to 150 kilograms.' },
    { q: 'What mesh size is recommended for stopping pigeons?', a: 'We highly recommend our 35mm or 40mm mesh nets. They are small enough to prevent pigeons from squeezing through but open enough to look aesthetically pleasing.' },
    { q: 'Do you cover deep AC duct shafts in high-rise IT parks or apartments?', a: 'Yes. Our technicians are certified rope-access climbers trained in industrial height safety. We can easily secure deep shafts and AC duct channels safely at any height.' },
    { q: 'How long does a standard balcony installation take?', a: 'For a standard balcony, our expert team usually completes the anchor mounting, border wiring, and netting tensioning within 2 to 4 hours.' },
    { q: 'Can safety nets be removed and re-installed during home painting?', a: 'Yes. Our keyhole anchorage system allows the nets to be carefully unhooked and re-tensioned after painting is complete. Our team can assist with re-installation service at a nominal charge.' },
    { q: 'Which cities do you serve in Tamil Nadu?', a: 'We provide immediate safety net services in Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruppur, Erode, Vellore, Hosur, Tirunelveli, Chengalpattu, Kanchipuram, Thanjavur, and all surrounding districts.' }
  ];

  return (
    <div className="bg-white font-sans text-slate-700">
      
      {/* 1. HERO BANNER */}
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-24 md:pt-0">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920" 
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
              Premium Safety Net <br />
              <span className="text-accent">Installation Services</span> <br />
              Across Tamil Nadu
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Protect your loved ones, children, pets, and high-rise structures. Star Safety Enterprises provides industrial-grade durability, 10-year warranty options, and same-day expert installations in Chennai, Coimbatore, Madurai, Trichy, and beyond.
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
      <section className="py-20 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-left space-y-3">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Premium Safety Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-primary leading-tight">Professional Safety Nets We Install</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl">
                Explore our range of heavy-duty, weather-proof netting options customized specifically for high-rises, residential communities, and industrial complexes in Tamil Nadu.
              </p>
            </div>
          </div>

          {/* Horizontal Scrolling Wrapper */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
            style={{ scrollbarWidth: 'thin' }}
          >
            {services.map((srv, idx) => {
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
                      <h3 className="font-display font-bold text-lg text-primary group-hover:text-accent transition-colors">
                        {renderTitle(srv.title, srv.highlightWord)}
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
          <div className="flex flex-col items-center gap-5 mt-10">
            <div className="inline-flex items-center gap-5 bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/30">
              
              {/* Left Arrow (Glassmorphic Pill) */}
              <button
                onClick={() => scrollServices('left')}
                className="group h-10 w-10 rounded-full bg-slate-50 hover:bg-accent border border-slate-200/60 hover:border-accent text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xs"
                aria-label="Previous service"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Dynamic Pill Indicators (The active icon / dot centered) */}
              <div className="flex items-center gap-2 px-1">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIdx(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      activeServiceIdx === i 
                        ? 'w-7 bg-accent shadow-[0_0_10px_rgba(var(--color-accent),0.4)]' 
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to service ${i + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow (Glassmorphic Pill) */}
              <button
                onClick={() => scrollServices('right')}
                className="group h-10 w-10 rounded-full bg-slate-50 hover:bg-accent border border-slate-200/60 hover:border-accent text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xs"
                aria-label="Next service"
              >
                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Micro active progress tracker */}
            <div className="w-36 h-1 bg-slate-200/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500 rounded-full"
                style={{ width: `${((activeServiceIdx + 1) / services.length) * 100}%` }}
              />
            </div>
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
                Schedule Your Free <br className="hidden sm:inline" />Site Measurement Visit
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                A skilled Star Safety Enterprises technician will visit your location anywhere in Tamil Nadu, bring durable co-polymer and monofilament net samples, perform professional laser-accurate measurements, and outline a customized per-square-foot quotation on the spot.
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
                <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Why Choose Star Safety</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-primary leading-tight">Engineered for Lifelong Protection</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  When it comes to the safety of your family or workers, compromises are not allowed. Here is why property managers across Tamil Nadu rate us #1.
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
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-primary">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Find instant, detailed answers to common inquiries about materials, pricing, warranties, and safe installations.
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
            Need Premium Safety Nets Installed Today?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Don't delay security. Contact us now to book a free immediate site measurement visit and receive custom quote options for your balcony or building.
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
