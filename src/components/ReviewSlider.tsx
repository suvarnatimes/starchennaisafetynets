import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  review: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Manoj Kumar',
    city: 'Adyar, Chennai',
    rating: 5,
    review: 'Extremely satisfied with Star Safety Enterprises! They installed balcony safety nets in my 9th-floor apartment within 3 hours. The materials are heavy-duty, and the pricing was highly competitive. Highly recommended for families with kids.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-2',
    name: 'Suresh Krishnan',
    city: 'RS Puram, Coimbatore',
    rating: 5,
    review: 'Superb service! I had a severe pigeon problem in my kitchen duct area. Their climbing team did an incredible job installing transparent bird nets safely. The view is preserved, and the pigeons are finally gone. Free site measurement was very helpful.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-3',
    name: 'Meenakshi Sundaram',
    city: 'K.K. Nagar, Madurai',
    rating: 5,
    review: 'We installed child safety nets for our windows and staircases. The staff was highly professional, neat, and wore safety equipment while installing. Very responsive team and reasonable pricing.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-4',
    name: 'R. Vigneshwar',
    city: 'Cantonment, Trichy',
    rating: 5,
    review: 'Excellent industrial safety nets supplied for our warehouse construction site. They adhered fully to safety standards and finished the installation ahead of schedule. Truly Tamil Nadu\'s finest netting experts.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-5',
    name: 'Deepika Rangarajan',
    city: 'Salem',
    rating: 5,
    review: 'Highly professional team. They helped us select the perfect HDPE net mesh size for our balconies. Very polite behavior and extremely fast execution. Five stars all the way!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  }
];

export default function ReviewSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Autoplay every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const activeReview = reviews[activeIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 text-gray-100 -z-10 translate-x-2 -translate-y-4">
        <Quote className="h-24 w-24 fill-current opacity-50" />
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-xl shadow-slate-100 p-8 md:p-12 transition-all duration-500">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          {/* Reviewer Image */}
          <div className="flex-shrink-0 relative">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
              <img
                src={optimizeImage(activeReview.image)}
                alt={activeReview.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
               loading="lazy" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent text-white p-1.5 rounded-full shadow">
              <Quote className="h-3 w-3" />
            </div>
          </div>

          {/* Testimonial details */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < activeReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>

            <blockquote className="text-base md:text-lg text-slate-600 font-sans italic leading-relaxed mb-6">
              "{activeReview.review}"
            </blockquote>

            <div>
              <h4 className="font-display font-bold text-slate-800 text-base md:text-lg">
                {activeReview.name}
              </h4>
              <p className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                {activeReview.city}
              </p>
            </div>
          </div>
        </div>

        {/* Manual Controls */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <div className="flex gap-1.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-6 bg-accent' : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="p-2 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="p-2 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
