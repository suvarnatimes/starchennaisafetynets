import fs from 'fs';
import path from 'path';
import { blogArticlesData } from '../src/data/blogArticlesData.js';

const DOMAIN = 'https://starbalconysafetynetschennai.com';
const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  // 14 Dedicated Services
  { path: '/services/balcony-safety-nets', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/pigeon-nets', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/anti-bird-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/bird-spikes', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/children-safety-nets', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/staircase-safety-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/swimming-pool-safety-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/car-parking-safety-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/coconut-tree-safety-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/monkey-safety-nets', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/construction-safety-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/duct-area-safety-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/cricket-practice-nets', changefreq: 'weekly', priority: '0.8' },
  { path: '/services/sports-nets-installation', changefreq: 'weekly', priority: '0.8' },
  // 14 Localities & Major Cities
  { path: '/locality/t-nagar', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/anna-nagar', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/velachery', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/adyar', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/omr', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/porur', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/nungambakkam', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/tambaram', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/kodambakkam', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/coimbatore', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/madurai', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/trichy', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/pondicherry', changefreq: 'weekly', priority: '0.8' },
  { path: '/locality/chengalpattu', changefreq: 'weekly', priority: '0.8' },
  // Trust & Knowledge Pages
  { path: '/gallery', changefreq: 'weekly', priority: '0.7' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'weekly', priority: '0.8' },
  { path: '/sitemap', changefreq: 'weekly', priority: '0.6' }
];

export function generateSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Internal static routes
  staticRoutes.forEach(r => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${r.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Internal blog article routes
  const allBlogSlugs = new Map<string, string>();
  if (blogArticlesData) {
    Object.values(blogArticlesData).forEach(b => {
      allBlogSlugs.set(b.slug, b.publishDate || today);
    });
  }

  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  if (fs.existsSync(dbPath)) {
    try {
      const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      if (Array.isArray(dbData.blogs)) {
        dbData.blogs
          .filter((b: any) => b.status === 'published')
          .forEach((b: any) => {
            const lastmod = b.publishDate ? b.publishDate.split('T')[0] : today;
            allBlogSlugs.set(b.slug, lastmod);
          });
      }
    } catch (err) {
      console.warn('Could not read blogs from db.json:', err);
    }
  }

  allBlogSlugs.forEach((lastmod, slug) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/blog/${slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

const targetPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(targetPath, generateSitemapXml(), 'utf-8');
console.log(`[Sitemap] Generated valid XML sitemap with refreshed lastmod (${today}) at: ${targetPath}`);
