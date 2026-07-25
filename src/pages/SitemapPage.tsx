import React, { useEffect, useState } from 'react';
import { Blog } from '../types.js';

const staticRoutes = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Sitemap', path: '/sitemap' },
  { label: 'Safety Nets in Trichy', path: '/safety-nets-trichy' },
  { label: 'Safety Nets in Pondicherry', path: '/safety-nets-pondicherry' },
  { label: 'Safety Nets in Chengalpattu', path: '/safety-nets-chengalpattu' },
  { label: 'Safety Nets in Tambaram', path: '/safety-nets-tambaram' }
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

  return (
    <section className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent">Site Index</p>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-primary">Sitemap for Star Safety Enterprises</h1>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            This page lists the main pages and published blog articles so search engines can discover every important section of the website.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-display font-black text-primary mb-4">Main Pages</h2>
            <ul className="space-y-3">
              {staticRoutes.map((route) => (
                <li key={route.path}>
                  <a href={route.path} className="text-sm font-semibold text-slate-700 hover:text-accent transition-colors">
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-display font-black text-primary mb-4">Published Blog Posts</h2>
            {loading ? (
              <p className="text-sm text-slate-500">Loading blog index...</p>
            ) : blogs.length === 0 ? (
              <p className="text-sm text-slate-500">No published blog posts yet.</p>
            ) : (
              <ul className="space-y-3">
                {blogs.map((blog) => (
                  <li key={blog.slug}>
                    <a href={`/blog/${blog.slug}`} className="text-sm font-semibold text-slate-700 hover:text-accent transition-colors">
                      {blog.title}
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
