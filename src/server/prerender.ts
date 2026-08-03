import { servicesData } from '../data/servicesData.js';
import { localitiesData } from '../data/localitiesData.js';
import { blogArticlesData } from '../data/blogArticlesData.js';

export function renderFullHtmlForRoute(reqPath: string, baseTemplate: string): { status: number; redirectUrl?: string; html: string } {
  let cleanPath = reqPath.split('?')[0].replace(/\/$/, '');
  if (!cleanPath) cleanPath = '/';

  // 301 Legacy Redirects
  if (cleanPath === '/safety-nets-tambaram') {
    return { status: 301, redirectUrl: '/locality/tambaram', html: '' };
  }
  if (cleanPath === '/safety-nets-trichy') {
    return { status: 301, redirectUrl: '/locality/trichy', html: '' };
  }
  if (cleanPath === '/safety-nets-pondicherry') {
    return { status: 301, redirectUrl: '/locality/pondicherry', html: '' };
  }
  if (cleanPath === '/safety-nets-chengalpattu') {
    return { status: 301, redirectUrl: '/locality/chengalpattu', html: '' };
  }

  let title = 'Balcony Safety Nets Chennai | Star Safety Enterprises';
  let desc = 'Certified balcony & pigeon safety net installation in Chennai. Garware UV HDPE nets with 7-yr warranty. Call +91 90437 17064.';
  let canonicalUrl = `https://starbalconysafetynetschennai.com${cleanPath === '/' ? '' : cleanPath}`;
  let bodyHtml = '';

  if (cleanPath === '/') {
    title = 'Balcony Safety Nets Chennai | Star Safety Enterprises';
    desc = 'Certified balcony & pigeon safety net installation in Chennai. Garware UV HDPE nets with 7-yr warranty. Call +91 90437 17064.';
    bodyHtml = `
      <header style="background-color: #0f172a; color: #ffffff; padding: 16px 24px;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 22px; font-weight: bold; color: #fbbf24;">Star Safety Enterprises</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Balcony, Pigeon & Children Safety Nets in Chennai</p>
          </div>
          <a href="tel:+919043717064" style="background-color: #f59e0b; color: #0f172a; padding: 10px 18px; border-radius: 8px; font-weight: bold; text-decoration: none;">Call +91 90437 17064</a>
        </div>
      </header>
      <main style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; color: #cbd5e1;">
        <h2 style="font-size: 28px; color: #ffffff; margin-bottom: 16px;">Balcony & Pigeon Safety Nets Installation in Chennai</h2>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Star Safety Enterprises delivers industrial-grade Garware UV-stabilized balcony safety nets, pigeon screens, child safety nets, and stainless steel invisible grills across Chennai & Tamil Nadu.</p>
        <div style="display: flex; gap: 16px; margin-bottom: 32px;">
          <a href="tel:+919043717064" style="background-color: #16a34a; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none;">Call Now: +91 90437 17064</a>
          <a href="https://wa.me/919043717064" style="background-color: #25d366; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: bold; text-decoration: none;">WhatsApp Inspection</a>
        </div>
      </main>
    `;
  } else if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const sData = servicesData[slug];
    if (sData) {
      title = sData.metaTitle;
      desc = sData.metaDescription;
      canonicalUrl = `https://starbalconysafetynetschennai.com/services/${slug}`;
      bodyHtml = `
        <main style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; color: #cbd5e1;">
          <h1 style="font-size: 32px; font-weight: bold; color: #ffffff; margin-bottom: 16px;">${sData.h1}</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${sData.introSummary}</p>
          <div style="background-color: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="font-size: 20px; color: #fbbf24; margin-bottom: 12px;">Service Specifications & Features</h2>
            <ul style="line-height: 1.8;">
              <li><strong>Material Grade:</strong> ${sData.materialGrade}</li>
              <li><strong>Warranty:</strong> ${sData.warranty} Official Written Warranty</li>
              <li><strong>Price per Sq Ft:</strong> ${sData.pricePerSqFt}</li>
              <li><strong>Primary Focus:</strong> ${sData.shortDesc}</li>
            </ul>
          </div>
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 20px; color: #ffffff; margin-bottom: 12px;">Frequently Asked Questions</h2>
            ${sData.faqs.map(f => `<div style="margin-bottom: 12px;"><strong>Q: ${f.q}</strong><p style="margin-top: 4px;">A: ${f.a}</p></div>`).join('')}
          </div>
          <a href="tel:+919043717064" style="background-color: #f59e0b; color: #0f172a; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Call +91 90437 17064 for Free Quote</a>
        </main>
      `;
    }
  } else if (cleanPath.startsWith('/locality/')) {
    const slug = cleanPath.replace('/locality/', '');
    const lData = localitiesData[slug];
    if (lData) {
      title = lData.metaTitle;
      desc = lData.metaDescription;
      canonicalUrl = `https://starbalconysafetynetschennai.com/locality/${slug}`;
      bodyHtml = `
        <main style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; color: #cbd5e1;">
          <h1 style="font-size: 32px; font-weight: bold; color: #ffffff; margin-bottom: 16px;">${lData.h1}</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${lData.introSummary}</p>
          <div style="background-color: #1e293b; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="font-size: 20px; color: #fbbf24; margin-bottom: 12px;">Local Service Highlights in ${lData.name}</h2>
            <p><strong>Response Time:</strong> ${lData.responseTimeClaim}</p>
            <p><strong>Key Landmarks Covered:</strong> ${lData.landmarks.join(', ')}</p>
            <p><strong>Property Types:</strong> ${lData.housingTypeNote}</p>
          </div>
          <div style="margin-bottom: 24px;">
            ${lData.fullBodyContent.map(p => `<p style="line-height: 1.6; margin-bottom: 12px;">${p}</p>`).join('')}
          </div>
          <a href="tel:+919043717064" style="background-color: #16a34a; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Book Free Site Measurement (+91 90437 17064)</a>
        </main>
      `;
    }
  } else if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const bData = blogArticlesData[slug];
    if (bData) {
      title = bData.metaTitle;
      desc = bData.metaDescription;
      canonicalUrl = `https://starbalconysafetynetschennai.com/blog/${slug}`;
      bodyHtml = `
        <main style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; color: #cbd5e1;">
          <h1 style="font-size: 32px; font-weight: bold; color: #ffffff; margin-bottom: 16px;">${bData.h1}</h1>
          <div style="background-color: #78350f; color: #fef3c7; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; margin-top: 0; color: #fbbf24;">Quick Summary</h2>
            <p style="margin-bottom: 0;">${bData.quickAnswer}</p>
          </div>
          ${bData.sections.map(s => `
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 22px; color: #ffffff;">${s.heading}</h2>
              <p style="line-height: 1.6;">${s.content}</p>
            </div>
          `).join('')}
          <a href="tel:+919043717064" style="background-color: #f59e0b; color: #0f172a; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Contact Tech Support (+91 90437 17064)</a>
        </main>
      `;
    }
  } else if (cleanPath === '/privacy-policy') {
    title = 'Privacy Policy | Star Safety Enterprises Chennai';
    desc = 'Privacy Policy for Star Safety Enterprises. Learn how we handle customer inquiry data and lead form submissions securely.';
    canonicalUrl = 'https://starbalconysafetynetschennai.com/privacy-policy';
    bodyHtml = `
      <main style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; color: #cbd5e1;">
        <h1 style="font-size: 32px; color: #ffffff;">Privacy Policy</h1>
        <p>Star Safety Enterprises collects customer name, phone number, and address strictly for measurement booking and installation services. We never sell your personal data.</p>
        <p>Contact Email: dudaprasad12345@gmail.com | Phone: +91 90437 17064</p>
      </main>
    `;
  } else if (cleanPath === '/faq') {
    title = 'Safety Nets FAQ Chennai | Star Safety Enterprises';
    desc = 'Frequently asked questions about balcony safety nets, pigeon mesh, pricing, installation time & warranty in Chennai. Call +91 90437 17064.';
    canonicalUrl = 'https://starbalconysafetynetschennai.com/faq';
    bodyHtml = `
      <main style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; color: #cbd5e1;">
        <h1 style="font-size: 32px; color: #ffffff;">Safety Nets Frequently Asked Questions</h1>
        <p>Find answers regarding Garware HDPE materials, 7-year warranty, price per sq ft (Rs 15-35), and installation timelines.</p>
        <p>Call +91 90437 17064 for immediate technical support.</p>
      </main>
    `;
  }

  // Inject metadata into HTML base template
  let rendered = baseTemplate;

  // Replace <title>
  rendered = rendered.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
  
  // Replace <meta name="description">
  rendered = rendered.replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${desc}" />`);
  
  // Replace <link rel="canonical"> (SELF-REFERENCING!)
  rendered = rendered.replace(/<link rel="canonical" href=".*?" \/>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);
  
  // Replace <meta property="og:url">
  rendered = rendered.replace(/<meta property="og:url" content=".*?" \/>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);

  // Replace <meta property="og:title">
  rendered = rendered.replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${title}" />`);

  // Replace <meta property="og:description">
  rendered = rendered.replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${desc}" />`);

  // Replace <div id="root">...</div> with pre-rendered bodyHtml if available
  if (bodyHtml) {
    rendered = rendered.replace(/<div id="root">[\s\S]*?<\/div>/gi, `<div id="root">${bodyHtml}</div>`);
  }

  return { status: 200, html: rendered };
}
