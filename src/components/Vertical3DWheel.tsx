import React, { useState, useEffect, useRef } from 'react';
import { Shield, Eye, ArrowUp, ArrowDown } from 'lucide-react';

interface WheelItem {
  id: number;
  url: string;
  title: string;
  desc: string;
}

const CAROUSEL_IMAGES: WheelItem[] = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938511/starchennaisafetynets/chennai_balcony_safety_net.jpg',
    title: 'Balcony Safety Nets',
    desc: 'Heavy-duty 100% UV treated transparent co-polymer safety nets.'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938508/starchennaisafetynets/chennai_hero_backdrop.jpg',
    title: 'Apartment Safety Nets',
    desc: 'Indian high-rise safety nets customized to withstand strong winds.'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938515/starchennaisafetynets/chennai_pigeon_safety_net.jpg',
    title: 'Pigeon Safety Nets',
    desc: 'Effective and humane wire-reinforced nylon mesh to keep birds away.'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938515/starchennaisafetynets/chennai_pigeon_safety_net.jpg',
    title: 'Anti-Bird Grills',
    desc: 'Durable nylon bird control barriers for balconies and duct areas.'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938532/starchennaisafetynets/chennai_construction_net.jpg',
    title: 'Construction Safety Nets',
    desc: 'Debris collection and fallback protection nets for industrial sites.'
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783938521/starchennaisafetynets/chennai_child_safety_net.jpg',
    title: 'Child Protection Nets',
    desc: 'Maximum strength anchorage ensuring total safety for children and pets.'
  }
];

export default function Vertical3DWheel() {
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const dragStartY = useRef<number>(0);
  const dragStartRotation = useRef<number>(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const totalItems = CAROUSEL_IMAGES.length;
  const itemAngle = 360 / totalItems; // 60 degrees each
  const [radius, setRadius] = useState<number>(160); // 3D cylinder radius in pixels

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth >= 1024 ? 195 : 160);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Calculate active index based on rotation
  useEffect(() => {
    // Standardize rotation to 0-359 range
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    // Find closest item index
    // Note that rotating backwards (negative) advances through the items
    const rawIndex = Math.round((360 - normalizedRotation) / itemAngle) % totalItems;
    setActiveIndex(rawIndex);
  }, [rotation, totalItems, itemAngle]);

  // Handle auto-scroll
  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollTimer.current = setInterval(() => {
      setRotation(prev => prev - itemAngle);
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoScroll();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartRotation.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    // Scale down delta for smooth drag
    const rotationChange = (deltaY / 3) * 1.5;
    setRotation(dragStartRotation.current + rotationChange);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest itemAngle
    const nearestStep = Math.round(rotation / itemAngle) * itemAngle;
    setRotation(nearestStep);
    startAutoScroll();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoScroll();
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
    dragStartRotation.current = rotation;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - dragStartY.current;
    const rotationChange = (deltaY / 3) * 1.5;
    setRotation(dragStartRotation.current + rotationChange);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const nearestStep = Math.round(rotation / itemAngle) * itemAngle;
    setRotation(nearestStep);
    startAutoScroll();
  };

  const handleManualNav = (direction: 'up' | 'down') => {
    stopAutoScroll();
    setRotation(prev => {
      const step = direction === 'up' ? itemAngle : -itemAngle;
      return Math.round((prev + step) / itemAngle) * itemAngle;
    });
    // Restart auto-scroll after delay
    setTimeout(() => {
      if (!isDragging) startAutoScroll();
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm lg:max-w-md mx-auto select-none">
      
      {/* Perspective Container */}
      <div 
        id="wheel-3d-perspective"
        className="relative w-72 sm:w-80 lg:w-96 h-[360px] lg:h-[440px] mb-12 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{ perspective: '1200px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons for Ease of Use */}
        <button 
          onClick={() => handleManualNav('up')}
          className="group absolute -top-12 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-accent border border-white/20 hover:border-accent text-white shadow-lg hover:shadow-accent/40 backdrop-blur-sm transition-all duration-300 hover:scale-125 active:scale-90"
          aria-label="Previous image"
        >
          <ArrowUp className="h-4 w-4 text-accent group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>

        <button 
          onClick={() => handleManualNav('down')}
          className="group absolute -bottom-12 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-accent border border-white/20 hover:border-accent text-white shadow-lg hover:shadow-accent/40 backdrop-blur-sm transition-all duration-300 hover:scale-125 active:scale-90"
          aria-label="Next image"
        >
          <ArrowDown className="h-4 w-4 text-accent group-hover:text-white transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>

        {/* The 3D Wheel cylinder */}
        <div 
          className="w-full h-[180px] lg:h-[230px] relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {CAROUSEL_IMAGES.map((item, index) => {
            const angle = index * itemAngle;
            // Determine if this is the active front item
            const isFront = index === activeIndex;

            return (
              <div
                key={item.id}
                className="absolute inset-0 w-full h-full rounded-2xl border-2 transition-all duration-500 overflow-hidden bg-slate-950/90 p-2"
                style={{
                  transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  borderColor: isFront ? '#FF5A1F' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: isFront ? '0 15px 35px -10px rgba(255, 90, 31, 0.5)' : 'none',
                  opacity: isFront ? 1.0 : 0.25,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description & Specs below the Wheel */}
      <div className="mt-6 text-center max-w-xs space-y-1.5 px-4 min-h-[64px] relative z-20">
        <h5 className="font-display font-black text-white text-base tracking-tight uppercase flex items-center justify-center gap-1.5">
          <Shield className="h-4 w-4 text-accent" />
          {CAROUSEL_IMAGES[activeIndex]?.title}
        </h5>
        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
          {CAROUSEL_IMAGES[activeIndex]?.desc}
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 mt-4 relative z-20">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              stopAutoScroll();
              // Find the shortest rotation direction to reach target index
              const currentSpin = Math.round(rotation / 360) * 360;
              const targetNormalizedRotation = -idx * itemAngle;
              let finalTarget = currentSpin + targetNormalizedRotation;
              
              // Handle wrapping correctly
              if (Math.abs(finalTarget - rotation) > 180) {
                if (finalTarget < rotation) {
                  finalTarget += 360;
                } else {
                  finalTarget -= 360;
                }
              }

              setRotation(finalTarget);
              setTimeout(() => {
                if (!isDragging) startAutoScroll();
              }, 1000);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 hover:scale-y-125 ${
              idx === activeIndex ? 'w-5 bg-accent shadow-[0_0_10px_rgba(255,90,31,0.5)]' : 'w-1.5 bg-white/25 hover:w-3 hover:bg-accent/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
