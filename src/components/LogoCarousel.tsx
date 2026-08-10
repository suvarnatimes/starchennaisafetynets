import React from 'react';

const brands = [
  { name: 'Casagrand', desc: 'Premium Developer' },
  { name: 'Sobha Developers', desc: 'Luxury Homes' },
  { name: 'L&T Constructions', desc: 'Infrastructure' },
  { name: 'DLF India', desc: 'Commercial Parks' },
  { name: 'TVS Group', desc: 'Industrial Sites' },
  { name: 'Alliance Group', desc: 'Urban Housing' },
  { name: 'Prestige Group', desc: 'Residential' },
  { name: 'Godrej Properties', desc: 'Green Homes' },
];

export default function LogoCarousel() {
  // Duplicate list to ensure seamless looping
  const doubleBrands = [...brands, ...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden bg-gray-50/50 py-10 border-y border-gray-100">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="mb-4 text-center">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">Trusted By Top Real Estate & Builder Brands</p>
      </div>

      <div className="flex w-max select-none">
        <div className="flex animate-marquee gap-8 md:gap-16 pr-8 md:pr-16">
          {doubleBrands.map((brand, idx) => (
            <div 
              key={`${brand.name}-${idx}`} 
              className="flex items-center gap-2 group cursor-default"
            >
              <div className="h-10 px-5 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100/80 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-md">
                <span className="font-display font-extrabold text-sm md:text-base text-slate-400 tracking-tight group-hover:text-primary transition-colors">
                  {brand.name.split(' ')[0]}
                </span>
                {brand.name.split(' ')[1] && (
                  <span className="font-sans text-xs text-slate-300 ml-1 group-hover:text-accent font-medium">
                    {brand.name.split(' ')[1]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
