import React from 'react';
import { optimizeImage } from '../utils/optimizeImage.js';

interface LogoProps {
  className?: string;
  height?: number | string;
}

export default function Logo({
  className = '',
  height = '34px'
}: LogoProps) {
  const logoUrl = 'https://res.cloudinary.com/dovm8ucqv/image/upload/v1783934007/logo1_muwsf8.png';
  
  // Parse height to inline style if needed, or fallback to class
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className={`inline-flex items-center justify-center select-none bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/80 shadow-[0_4px_12px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-300 hover:bg-white/100 hover:border-white/90 hover:shadow-[0_8px_20px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 active:scale-98 ${className}`}>
      <img
        src={optimizeImage(logoUrl)}
        alt="Star Enterprises Logo"
        referrerPolicy="no-referrer"
        style={{ height: resolvedHeight, width: 'auto' }}
        className="object-contain block transition-transform duration-300 group-hover:scale-102"
      />
    </div>
  );
}

