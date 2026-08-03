import React, { useState, useEffect } from 'react';
import { 
  Search, Calendar, Clock, User, ArrowRight, BookOpen, 
  ArrowLeft, Share2, Copy, Phone, MessageSquare, 
  Sparkles, CheckCircle, HelpCircle, Shield, Award 
} from 'lucide-react';
import { Blog, Category, Tag as TagType } from '../types.js';
import { blogArticlesData } from '../data/blogArticlesData.js';
import { servicesData } from '../data/servicesData.js';

interface BlogProps {
  onOpenQuoteModal: (service?: string) => void;
  initialSlug?: string;
  onSlugChange?: (slug: string | null) => void;
}

export default function BlogPage({ onOpenQuoteModal, initialSlug, onSlugChange }: BlogProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedSlug(initialSlug || null);
  }, [initialSlug]);

  // Check if selectedSlug is in local blogArticlesData
  const localArticle = selectedSlug ? blogArticlesData[selectedSlug] : null;

  useEffect(() => {
    if (selectedSlug) {
      if (blogArticlesData[selectedSlug]) {
        const art = blogArticlesData[selectedSlug];
        document.title = art.metaTitle;
        setActiveBlog(null);
      } else {
        fetch(`/api/blogs/${selectedSlug}`)
          .then(res => {
            if (res.ok) return res.json();
            throw new Error('Blog not found');
          })
          .then(data => {
            setActiveBlog(data);
            document.title = data.metaTitle || `${data.title} | Star Safety`;
          })
          .catch(err => {
            console.error(err);
            setSelectedSlug(null);
          });
      }
    } else {
      setActiveBlog(null);
      document.title = 'Expert Safety Net Blog | Star Safety Enterprises';
    }
  }, [selectedSlug]);

  const handleBlogClick = (slug: string) => {
    setSelectedSlug(slug);
    if (onSlugChange) onSlugChange(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    if (onSlugChange) onSlugChange(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const localArticlesList = Object.values(blogArticlesData);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Blog Article Detail View */}
      {selectedSlug && localArticle ? (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog Index
          </button>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <BookOpen className="w-3.5 h-3.5" /> Expert Safety Guide & Comparison
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {localArticle.h1}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 border-b pb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {localArticle.publishDate}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {localArticle.readingTime}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {localArticle.author}</span>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8 border border-slate-200">
            <img
              src={localArticle.heroImage}
              alt={localArticle.imageAlt}
              className="w-full h-80 sm:h-96 object-cover"
              loading="lazy"
            />
          </div>

          {/* GEO / AEO Quick Answer Box */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-base font-bold text-amber-950 mb-1">Quick Summary</h2>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  {localArticle.quickAnswer}
                </p>
              </div>
            </div>
          </div>

          {/* Article Sections */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8 space-y-6">
            {localArticle.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900">{sec.heading}</h2>
                <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">{sec.content}</p>
              </div>
            ))}

            {/* Comparison Table if present */}
            {localArticle.comparisonTable && (
              <div className="pt-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Detailed Feature & Spec Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        {localArticle.comparisonTable.headers.map((h, i) => (
                          <th key={i} className="p-3 text-left font-bold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {localArticle.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 border border-slate-200 text-slate-800">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* FAQs */}
          {localArticle.faqs && localArticle.faqs.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-sky-600" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {localArticle.faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Services Internal Links */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Related Safety Net Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {localArticle.relatedServiceSlugs.map(relSlug => {
                const sData = servicesData[relSlug];
                if (!sData) return null;
                return (
                  <a
                    key={relSlug}
                    href={`#/services/${relSlug}`}
                    className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-700 block transition-all group"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-amber-400 block mb-1">
                      {sData.title}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      View Service Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold mb-1">Need Expert Safety Net Installation?</h3>
              <p className="text-sm font-medium opacity-90">
                Book a free on-site inspection anywhere in Chennai with Star Safety Enterprises.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:+919840968538"
                className="bg-slate-950 text-white hover:bg-slate-900 font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call +91 98409 68538
              </a>
            </div>
          </div>

        </article>
      ) : activeBlog ? (
        /* Render fetched blog post */
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={handleBackToList} className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog Index
          </button>
          <h1 className="text-3xl font-extrabold mb-4 text-slate-900">{activeBlog.title}</h1>
          <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-200 shadow-sm" dangerouslySetInnerHTML={{ __html: activeBlog.content }} />
        </article>
      ) : (
        /* Blog Index View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block mb-2">Knowledge Base</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Expert Safety Net Guides & Buying Comparisons
            </h1>
            <p className="text-slate-600 text-base">
              In-depth articles, material comparisons, price guides, and maintenance tips written by certified safety net technicians in Chennai.
            </p>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localArticlesList.map((art) => (
              <div
                key={art.slug}
                onClick={() => handleBlogClick(art.slug)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={art.heroImage}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {art.readingTime}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors mb-2 line-clamp-2">
                      {art.title}
                    </h2>
                    <p className="text-slate-600 text-xs line-clamp-3 mb-4">
                      {art.quickAnswer}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
