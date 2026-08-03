import React, { useEffect, useState } from 'react';
import { Blog } from '../types.js';
import { servicesData } from '../data/servicesData.js';
import { localitiesData } from '../data/localitiesData.js';
import { Shield, MapPin, FileText } from 'lucide-react';

const mainRoutes = [
  { label: 'Home', path: '#/home' },
  { label: 'About Us', path: '#/about' },
  { label: 'All Services', path: '#/services' },
  { label: 'Gallery', path: '#/gallery' },
  { label: 'Expert Blog', path: '#/blog' },
  { label: 'Contact Us', path: '#/contact' }
];

export default function SitemapPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch('/api/blogs?status=published');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Failed to load sitemap blog list', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const servicesList = Object.values(servicesData);
  const localitiesList = Object.values(localitiesData);

  return (
    <section className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-amber-500">Site Index & Navigation</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">HTML Sitemap — Star Safety Enterprises</h1>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            Browse our complete website index including dedicated safety net service pages, Chennai neighborhood locality guides, and expert blog posts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Main & Service Pages */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b pb-3">
              <Shield className="w-5 h-5 text-amber-500" /> Service Pages (14)
            </h2>
            <ul className="space-y-2 text-xs">
              {servicesList.map((srv) => (
                <li key={srv.slug}>
                  <a href={`#/services/${srv.slug}`} className="text-slate-700 hover:text-amber-600 font-medium transition-colors block">
                    • {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Localities Served */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b pb-3">
              <MapPin className="w-5 h-5 text-red-500" /> Chennai Localities (9)
            </h2>
            <ul className="space-y-2 text-xs">
              {localitiesList.map((loc) => (
                <li key={loc.slug}>
                  <a href={`#/locality/${loc.slug}`} className="text-slate-700 hover:text-amber-600 font-medium transition-colors block">
                    • Safety Nets in {loc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Pages & Blog */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b pb-3">
              <FileText className="w-5 h-5 text-sky-500" /> Main Pages & Articles
            </h2>
            <ul className="space-y-2 text-xs mb-6">
              {mainRoutes.map((route) => (
                <li key={route.path}>
                  <a href={route.path} className="text-slate-900 font-bold hover:text-amber-600 transition-colors block">
                    • {route.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Published Blog Articles</h3>
            {loading ? (
              <p className="text-xs text-slate-400">Loading blog articles...</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {blogs.map((blog) => (
                  <li key={blog.slug}>
                    <a href={`#/blog/${blog.slug}`} className="text-slate-600 hover:text-amber-600 font-medium transition-colors block">
                      • {blog.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
