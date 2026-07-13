import React, { useState, useEffect } from 'react';
import { 
  Search, Calendar, Clock, User, ArrowRight, BookOpen, 
  Tag, Layers, ArrowLeft, Share2, Copy, Send, Phone, 
  MessageSquare, HelpCircle, ChevronRight 
} from 'lucide-react';
import { Blog, Category, Tag as TagType } from '../types.js';

interface BlogProps {
  onOpenQuoteModal: (service?: string) => void;
  // If the URL has a direct blog slug
  initialSlug?: string;
  onSlugChange?: (slug: string | null) => void;
}

export default function BlogPage({ onOpenQuoteModal, initialSlug, onSlugChange }: BlogProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  
  // View State: list vs detail
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Copy share feedback
  const [copied, setCopied] = useState(false);

  // Sync state with prop
  useEffect(() => {
    setSelectedSlug(initialSlug || null);
  }, [initialSlug]);

  // Fetch blogs, categories, tags from server API
  const fetchBlogData = async () => {
    setIsLoading(true);
    try {
      const [blogsRes, catsRes, tagsRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/categories'),
        fetch('/api/tags')
      ]);

      if (blogsRes.ok) setBlogs(await blogsRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
      if (tagsRes.ok) setTags(await tagsRes.json());
    } catch (e) {
      console.error('Failed to load blog page assets', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  // Fetch single blog detail if slug is selected
  useEffect(() => {
    if (selectedSlug) {
      setIsLoading(true);
      fetch(`/api/blogs/${selectedSlug}`)
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Blog not found');
        })
        .then(data => {
          setActiveBlog(data);
          setIsLoading(false);
          // Update page title for SEO
          if (data.metaTitle) {
            document.title = data.metaTitle;
          } else {
            document.title = `${data.title} | Star Safety`;
          }
        })
        .catch(err => {
          console.error(err);
          setSelectedSlug(null);
          if (onSlugChange) onSlugChange(null);
          setIsLoading(false);
        });
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

  // Filter list
  const filteredBlogs = blogs.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        b.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCat ? b.categories.includes(selectedCat) : true;
    const matchTag = selectedTag ? b.tags.includes(selectedTag) : true;
    return matchSearch && matchCat && matchTag;
  });

  const popularBlogs = [...blogs].slice(0, 3);
  const recentBlogs = [...blogs].slice(0, 4);

  return (
    <div className="bg-white font-sans text-slate-700 min-h-screen">
      
      {/* Blog Top Header */}
      {!selectedSlug && (
        <section className="relative py-24 bg-primary text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1200" 
              alt="Star Safety Blog" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-15 select-none"
            />
            <div className="absolute inset-0 bg-primary/95" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest block">Expert Insights</span>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">Star Safety Knowledge Base</h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              In-depth articles, safety standards (IS-11057), material comparisons (HDPE vs Nylon), bird repelling techniques, and professional advice.
            </p>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="py-20 text-center text-primary space-y-4">
            <div className="h-10 w-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono font-semibold uppercase">Loading expert safety articles...</p>
          </div>
        ) : activeBlog ? (
          /* ================= BLOG DETAILED READ SHEET ================= */
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 font-sans select-none pb-4 border-b border-slate-100">
              <button onClick={handleBackToList} className="hover:text-accent">Blog Feed</button>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-600 truncate max-w-md">{activeBlog.title}</span>
            </div>

            <button
              onClick={handleBackToList}
              className="group flex items-center gap-1.5 text-slate-500 hover:text-accent font-semibold text-sm transition-all duration-300 hover:-translate-x-1"
            >
              <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" /> Back to feed
            </button>

            {/* Category tags */}
            <div className="flex flex-wrap gap-2">
              {activeBlog.categories.map(cId => {
                const cat = categories.find(c => c.id === cId);
                return cat ? (
                  <span key={cId} className="bg-accent/15 text-accent font-semibold text-xs px-3 py-1 rounded-full uppercase font-mono tracking-wider">
                    {cat.name}
                  </span>
                ) : null;
              })}
            </div>

            {/* Title & metadata */}
            <div className="space-y-4">
              <h1 className="font-display font-black text-2xl sm:text-4xl text-primary leading-tight">
                {activeBlog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-sans border-y border-slate-50 py-3">
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <User className="h-4 w-4 text-accent" />
                  {activeBlog.author}
                </div>
                {activeBlog.publishDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-accent" />
                    {new Date(activeBlog.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent" />
                  {activeBlog.readingTime}
                </div>
              </div>
            </div>

            {/* Cover image */}
            {activeBlog.featuredImage && (
              <div className="h-80 sm:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                <img 
                  src={activeBlog.featuredImage} 
                  alt={activeBlog.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Render article rich text markdown */}
            <div className="markdown-body space-y-5 leading-relaxed font-sans text-slate-600">
              {activeBlog.content.split('\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="font-display font-black text-xl sm:text-2xl text-primary mt-8 mb-4">{para.replace('## ', '')}</h2>;
                }
                if (para.startsWith('### ')) {
                  return <h3 key={i} className="font-display font-bold text-lg text-accent mt-6 mb-3">{para.replace('### ', '')}</h3>;
                }
                if (para.startsWith('* ')) {
                  return <li key={i} className="list-disc ml-6 my-1.5 text-slate-600">{para.replace('* ', '')}</li>;
                }
                if (para.startsWith('> ')) {
                  return <blockquote key={i} className="border-l-4 border-accent pl-4 italic text-slate-500 my-4 bg-slate-50 py-3 rounded-r-xl">{para.replace('> ', '')}</blockquote>;
                }
                return para.trim() ? <p key={i} className="mb-4">{para}</p> : null;
              })}
            </div>

            {/* Article Image Gallery Showcase */}
            {activeBlog.galleryImages && activeBlog.galleryImages.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <h3 className="font-display font-bold text-lg text-primary">Related Installation Photos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {activeBlog.galleryImages.map((img, idx) => (
                    <div key={idx} className="h-44 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={img} alt="Installation gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article FAQs */}
            {activeBlog.faqs && activeBlog.faqs.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-4">
                <h3 className="font-display font-bold text-lg text-primary flex items-center gap-1.5">
                  <HelpCircle className="h-5 w-5 text-accent" /> Article Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {activeBlog.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100/80">
                      <h4 className="font-display font-bold text-sm md:text-base text-primary mb-1">Q: {faq.question}</h4>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article tags listing */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="h-3 w-3" /> Tags:
              </span>
              {activeBlog.tags.map(tId => {
                const tag = tags.find(t => t.id === tId);
                return tag ? (
                  <span key={tId} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg">
                    #{tag.name}
                  </span>
                ) : null;
              })}
            </div>

            {/* Dynamic Social Sharing Toolbar */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-primary">
                <Share2 className="h-5 w-5 text-accent" />
                <span className="font-display font-bold text-sm">Share this safety guide:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopyLink}
                  className="group flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs text-primary font-bold px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  <Copy className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this safety netting guide: ${activeBlog.title} at ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba56] text-xs text-white font-bold px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-green-500/10"
                >
                  <MessageSquare className="h-3.5 w-3.5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  WhatsApp Share
                </a>
              </div>
            </div>

            {/* Inside Article CTA Banner */}
            <div className="bg-primary/95 rounded-3xl border border-white/5 p-8 text-center text-white space-y-4">
              <h3 className="font-display font-black text-xl md:text-2xl">Need Balcony Safety Inspection?</h3>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">Book a same-day site measurement with our local Tamil Nadu crew. Free catalogs, net weight tests, and instant estimates.</p>
              <div className="flex justify-center gap-3">
                <a 
                  href="tel:+919840245678" 
                  className="group relative overflow-hidden bg-accent hover:bg-accent-light text-white font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 flex items-center gap-1.5"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                  <Phone className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Call Hotline</span>
                </a>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="group bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 hover:border-white font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
                >
                  Book Free Visit
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* ================= BLOG ARTICLES FEED LIST VIEW ================= */
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left side: Main Blog cards feed (2/3) */}
            <div className="flex-1 space-y-10">
              
              {/* Filter notification row */}
              {(selectedCat || selectedTag || searchQuery) && (
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between text-xs font-mono font-bold">
                  <div className="text-primary">
                    Filtered articles by:{' '}
                    {selectedCat && <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-md">Category: {categories.find(c => c.id === selectedCat)?.name}</span>}
                    {selectedTag && <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-md">Tag: #{tags.find(t => t.id === selectedTag)?.name}</span>}
                    {searchQuery && <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-md">Search: "{searchQuery}"</span>}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCat(null);
                      setSelectedTag(null);
                      setSearchQuery('');
                    }}
                    className="text-rose-500 hover:underline"
                  >
                    Clear Filter [X]
                  </button>
                </div>
              )}

              {/* Feed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredBlogs.map((blog) => (
                  <article 
                    key={blog.id} 
                    className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image block */}
                      {blog.featuredImage && (
                        <div 
                          className="h-48 overflow-hidden relative cursor-pointer"
                          onClick={() => handleBlogClick(blog.slug)}
                        >
                          <img 
                            src={blog.featuredImage} 
                            alt={blog.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                            {categories.find(c => c.id === blog.categories[0])?.name || 'Safety'}
                          </div>
                        </div>
                      )}

                      {/* Summary Block */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-[11px] font-mono font-bold text-slate-400">
                          <span className="flex items-center gap-1"><User className="h-3 w-3 text-accent" /> {blog.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-accent" /> {blog.readingTime}</span>
                        </div>

                        <h3 
                          onClick={() => handleBlogClick(blog.slug)}
                          className="font-display font-bold text-lg text-primary hover:text-accent transition-colors cursor-pointer leading-snug line-clamp-2"
                        >
                          {blog.title}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                          {blog.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Footer read link */}
                    <div className="p-6 pt-0 border-t border-slate-50/50 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono font-semibold">
                        {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : 'Draft'}
                      </span>
                      <button
                        onClick={() => handleBlogClick(blog.slug)}
                        className="group flex items-center gap-1 text-xs text-accent font-bold transition-all duration-300 hover:scale-[1.02]"
                      >
                        <span className="group-hover:mr-1 transition-all duration-300">Read Expert Guide</span> 
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>

                  </article>
                ))}
                {filteredBlogs.length === 0 && (
                  <div className="col-span-2 py-20 text-center text-slate-500 italic space-y-2">
                    <BookOpen className="h-10 w-10 mx-auto text-slate-300" />
                    <p>No safety articles found matching your criteria.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right side: Categories, Tags, Search widgets (1/3) */}
            <aside className="w-full lg:w-1/3 space-y-8 select-none">
              
              {/* 1. Search Box Widget */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-4">
                <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wider pb-2 border-b border-slate-200/50 flex items-center gap-1.5">
                  <Search className="h-4 w-4 text-accent" /> Search safety guides
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords..."
                    className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* 2. Categories Selection Widget */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-4">
                <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wider pb-2 border-b border-slate-200/50 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-accent" /> Expert Categories
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCat(null)}
                    className={`text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 active:scale-95 ${
                      selectedCat === null 
                        ? 'bg-accent text-white shadow-sm font-bold' 
                        : 'text-slate-600 hover:bg-white hover:text-primary border border-transparent hover:border-slate-100'
                    }`}
                  >
                    All Specialties ({blogs.length})
                  </button>
                  {categories.map(cat => {
                    const count = blogs.filter(b => b.categories.includes(cat.id)).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className={`text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 active:scale-95 flex items-center justify-between ${
                          selectedCat === cat.id 
                            ? 'bg-accent text-white shadow-sm font-bold' 
                            : 'text-slate-600 hover:bg-white hover:text-primary border border-transparent hover:border-slate-100'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCat === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-500'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Tags Selection Widget */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-4">
                <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wider pb-2 border-b border-slate-200/50 flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-accent" /> Keyword Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      selectedTag === null ? 'bg-primary text-white font-bold' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    All Tags
                  </button>
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => setSelectedTag(tag.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                        selectedTag === tag.id ? 'bg-accent text-white font-bold' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Recent Advice Widget */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-4">
                <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wider pb-2 border-b border-slate-200/50">
                  Recent Advice
                </h3>
                <div className="space-y-4">
                  {recentBlogs.map(blog => (
                    <div 
                      key={blog.id} 
                      onClick={() => handleBlogClick(blog.slug)}
                      className="flex gap-3 items-center group cursor-pointer"
                    >
                      <img 
                        src={blog.featuredImage} 
                        alt="" 
                        className="h-12 w-16 object-cover rounded border border-slate-100 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-display font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono font-medium block mt-0.5">
                          {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : 'Draft'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        )}
      </div>

    </div>
  );
}
