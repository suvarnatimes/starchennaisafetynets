import { Phone, MessageCircle, Image } from 'lucide-react';

export default function FloatingButtons() {
  const phoneNumber = '+919840245678';
  const whatsappNumber = '919840245678';
  const whatsappMessage = encodeURIComponent("Hello Star Safety Enterprises, I'm interested in your safety net installation services. Please share details.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:gap-4 select-none">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-115 hover:bg-[#20ba56] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:h-14 md:w-14"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
        <span className="pointer-events-none absolute right-14 scale-0 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow transition-all group-hover:scale-100 whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* Gallery Button */}
      <a
        href="#/gallery"
        aria-label="View Gallery"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-115 hover:bg-accent-light active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 md:h-14 md:w-14"
      >
        <Image className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
        <span className="pointer-events-none absolute right-14 scale-0 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow transition-all group-hover:scale-100 whitespace-nowrap">
          Our Gallery
        </span>
      </a>

      {/* Call Now Button */}
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call Now"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-lg transition-all duration-300 hover:scale-115 hover:bg-[#15803d] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2 md:h-14 md:w-14"
      >
        <Phone className="h-5 w-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
        <span className="pointer-events-none absolute right-14 scale-0 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow transition-all group-hover:scale-100 whitespace-nowrap">
          Call Us
        </span>
      </a>
    </div>
  );
}
