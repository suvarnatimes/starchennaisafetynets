import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, Images, Loader2, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  category?: string;
  createdAt: string;
}

interface GalleryProps {
  onOpenQuoteModal: () => void;
}

export default function Gallery({ onOpenQuoteModal }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.ok ? r.json() : [])
      .then(data => setImages(data))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category || 'General')))];

  const filtered = selectedCategory === 'All'
    ? images
    : images.filter(img => (img.category || 'General') === selectedCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const prev = useCallback(() => {
    if (lightboxIdx !== null) setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIdx !== null) setLightboxIdx((lightboxIdx + 1) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx, prev, next]);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero Banner ── */}
      <section className="bg-slate-950 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold font-mono uppercase tracking-wider">
            <Images className="h-3 w-3" /> Project Gallery
          </div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl tracking-tight">
            Our Work in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Action
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Browse our installation gallery — balcony safety nets, invisible grills, pigeon nets, and more across Tamil Nadu homes and commercial properties.
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            Get a Free Quote
          </button>
        </div>
      </section>

      {/* ── Category Filter ── */}
      {categories.length > 1 && (
        <section className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Gallery Grid ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading && (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="text-sm font-medium">Loading gallery...</span>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400 gap-4">
              <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <ImageOff className="h-8 w-8 text-slate-300" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-500">No images yet</p>
                <p className="text-xs text-slate-400 mt-1">Gallery images will appear here once uploaded.</p>
              </div>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
              {filtered.map((img, idx) => (
                <div
                  key={img.id}
                  className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={optimizeImage(img.url)}
                    alt={img.caption || `Gallery image ${idx + 1}`}
                    className="w-full h-auto object-cover block group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-end justify-between">
                      {img.caption && (
                        <p className="text-white text-xs font-semibold leading-tight line-clamp-2 flex-1">{img.caption}</p>
                      )}
                      <div className="ml-2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    {img.category && (
                      <span className="mt-2 inline-block bg-blue-500/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit">
                        {img.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="font-display font-black text-white text-2xl sm:text-3xl">Ready for Your Installation?</h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            Get a free site visit and quotation from our expert team — anywhere in Tamil Nadu.
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="bg-white text-blue-700 font-bold text-sm px-8 py-3 rounded-xl shadow-lg hover:bg-blue-50 transition-all"
          >
            Book Free Site Visit →
          </button>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-10"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-10"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
            <img
              src={optimizeImage(filtered[lightboxIdx].url)}
              alt={filtered[lightboxIdx].caption || 'Gallery image'}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
             loading="lazy" />
            {filtered[lightboxIdx].caption && (
              <p className="text-white text-sm font-medium text-center">{filtered[lightboxIdx].caption}</p>
            )}
            <p className="text-slate-400 text-xs font-mono">{lightboxIdx + 1} / {filtered.length}</p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-10"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

    </div>
  );
}
