import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import FloatingButtons from './components/FloatingButtons.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Services from './pages/Services.js';
import Contact from './pages/Contact.js';
import BlogPage from './pages/Blog.js';
import GalleryPage from './pages/Gallery.js';
import AdminLayout from './components/AdminLayout.js';
import { 
  ShieldCheck, Lock, Eye, EyeOff, X, Send, CheckCircle, 
  RefreshCw, AlertCircle 
} from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [blogSlug, setBlogSlug] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Administrative Login form state
  const [isAdminPortal, setIsAdminPortal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Global Quote Modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteService, setQuoteService] = useState<string>('');
  const [quoteName, setQuoteName] = useState<string>('');
  const [quotePhone, setQuotePhone] = useState<string>('');
  const [quoteCity, setQuoteCity] = useState<string>('');
  const [quoteMsg, setQuoteMsg] = useState<string>('');
  const [quoteSubmitting, setQuoteSubmitting] = useState<boolean>(false);
  const [quoteSuccess, setQuoteSuccess] = useState<boolean>(false);

  // Hash Routing Parser
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/star-admin-portal-8472') {
        setIsAdminPortal(true);
        setActivePage('admin');
      } else if (hash.startsWith('#/blog/')) {
        const slug = hash.replace('#/blog/', '');
        setIsAdminPortal(false);
        setActivePage('blog');
        setBlogSlug(slug);
      } else {
        setIsAdminPortal(false);
        setBlogSlug(null);
        // Match home, about, services, blog, contact
        const page = hash.replace('#/', '');
        if (['home', 'about', 'services', 'blog', 'contact', 'gallery'].includes(page)) {
          setActivePage(page);
        } else {
          setActivePage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load parse
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changePage = (page: string) => {
    setActivePage(page);
    setIsAdminPortal(false);
    setBlogSlug(null);
    window.location.hash = `#/${page}`;
  };

  const handleBlogSlugChange = (slug: string | null) => {
    setBlogSlug(slug);
    if (slug) {
      window.location.hash = `#/blog/${slug}`;
    } else {
      window.location.hash = `#/blog`;
    }
  };

  // Open quote modal from anywhere
  const openQuoteModal = (serviceName?: string) => {
    setQuoteService(serviceName || '');
    setQuoteSuccess(false);
    setIsQuoteModalOpen(true);
  };

  // Login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter your email and password.');
      return;
    }

    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        setAdminToken(data.token);
        // Clear login fields
        setLoginEmail('');
        setLoginPassword('');
      } else {
        const err = await res.json();
        setLoginError(err.error || 'Invalid login credentials.');
      }
    } catch (err) {
      setLoginError('Server authentication connection failure.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Quote form submission handler
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone || !quoteCity || !quoteService) {
      alert('Please fill out all required fields.');
      return;
    }

    setQuoteSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteName,
          phone: quotePhone,
          city: quoteCity,
          service: quoteService,
          message: quoteMsg || 'Requested free site measurement visit via popup modal.'
        })
      });

      if (res.ok) {
        setQuoteSuccess(true);
        setQuoteName('');
        setQuotePhone('');
        setQuoteCity('');
        setQuoteMsg('');
      } else {
        alert('Failed to register request, please call us directly for fast booking.');
      }
    } catch (err) {
      alert('Network failure. Please dial our hotline.');
    } finally {
      setQuoteSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      
      {/* 1. ADMIN SYSTEM WRAPPER */}
      {isAdminPortal ? (
        adminToken ? (
          /* Logged In Admin Workspace */
          <AdminLayout 
            token={adminToken} 
            onLogout={() => {
              setAdminToken(null);
              setIsAdminPortal(false);
              changePage('home');
            }} 
          />
        ) : (
          /* Admin Login Panel Screen */
          <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 font-sans">
            <div className="w-full max-w-md bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h1 className="font-display font-black text-xl tracking-tight uppercase">Star Safety</h1>
                <p className="text-xs font-mono font-bold text-accent">SECURE ADMINISTRATIVE PORTAL</p>
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans max-w-xs mx-auto">This area is confidential and monitored. Unauthorized access is strictly prohibited under Indian Cyber laws.</p>
              </div>

              {loginError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2 font-semibold">
                  <AlertCircle className="h-4 w-4" />
                  {loginError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Administrative Email</label>
                  <input 
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@starsafetyenterprises.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Portal Password</label>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-accent hover:bg-accent-light text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      Authorizing portal key...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      Unlock Administrative Portal
                    </>
                  )}
                </button>
              </form>

              <div className="text-center">
                <button 
                  onClick={() => changePage('home')}
                  className="text-[10px] font-mono font-bold text-slate-500 hover:text-white transition-colors"
                >
                  ← Return to public website
                </button>
              </div>

            </div>
          </div>
        )
      ) : (
        /* ================= PUBLIC WEBSITE VIEWPORT ================= */
        <div className="flex flex-col min-h-screen">
          <Header activePage={activePage} onChangePage={changePage} />

          <main className="flex-grow">
            {activePage === 'home' && (
              <Home onChangePage={changePage} onOpenQuoteModal={openQuoteModal} />
            )}
            {activePage === 'about' && (
              <About onOpenQuoteModal={() => openQuoteModal()} />
            )}
            {activePage === 'services' && (
              <Services initialService={blogSlug || ''} onOpenQuoteModal={openQuoteModal} />
            )}
            {activePage === 'blog' && (
              <BlogPage 
                onOpenQuoteModal={openQuoteModal} 
                initialSlug={blogSlug} 
                onSlugChange={handleBlogSlugChange} 
              />
            )}
            {activePage === 'contact' && (
              <Contact />
            )}
            {activePage === 'gallery' && (
              <GalleryPage onOpenQuoteModal={openQuoteModal} />
            )}
          </main>

          <Footer onChangePage={changePage} />
          
          {/* Action floating widgets */}
          <FloatingButtons />
        </div>
      )}

      {/* ================= GLOBAL FREE MEASUREMENT POPUP MODAL ================= */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 animate-scaleIn text-slate-700">
            {/* Close */}
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-primary transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>

            {quoteSuccess ? (
              <div className="text-center space-y-4 py-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display font-black text-primary text-lg">Inspection Booked Successfully!</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">Thank you. Our site technician has received your measurement request and will call you within 2 hours to confirm details.</p>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="bg-accent hover:bg-accent-light text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-black text-primary text-xl">Request Free Site Inspection</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Fill out your details to schedule a local technician visit anywhere in Tamil Nadu.</p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Your Full Name <span className="text-rose-400">*</span></label>
                    <input 
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="e.g., Anbu Selvan"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number <span className="text-rose-400">*</span></label>
                      <input 
                        type="tel"
                        required
                        value={quotePhone}
                        onChange={(e) => setQuotePhone(e.target.value)}
                        placeholder="e.g., 9840245678"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs text-primary focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Your City <span className="text-rose-400">*</span></label>
                      <select 
                        required
                        value={quoteCity}
                        onChange={(e) => setQuoteCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent font-semibold"
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
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Select Net Specialty <span className="text-rose-400">*</span></label>
                    <select 
                      required
                      value={quoteService}
                      onChange={(e) => setQuoteService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-2.5 text-xs text-primary focus:outline-none focus:border-accent font-semibold"
                    >
                      <option value="">Select Safety Net Type</option>
                      <option value="Balcony Safety Nets">Balcony Safety Nets</option>
                      <option value="Pigeon Safety Nets">Pigeon Safety Nets</option>
                      <option value="Bird Protection Nets">Bird Protection Nets</option>
                      <option value="Children Safety Nets">Children Safety Nets</option>
                      <option value="Construction Safety Nets">Construction Safety Nets</option>
                      <option value="Coconut Tree Safety Nets">Coconut Tree Safety Nets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Requirements (Optional)</label>
                    <textarea 
                      rows={2}
                      value={quoteMsg}
                      onChange={(e) => setQuoteMsg(e.target.value)}
                      placeholder="e.g. Dimensions, preferred day/time of visit..."
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={quoteSubmitting}
                    className="w-full bg-accent hover:bg-accent-light text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {quoteSubmitting ? 'Booking measurement...' : 'Book Free Measurement'}
                  </button>
                </form>
              </div>
            )}
            </div>
          </div>
        )}

    </div>
  );
}
