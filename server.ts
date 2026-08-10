import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import express from 'express';
import app from './src/server/app.js';
import { renderFullHtmlForRoute } from './src/server/prerender.js';

const PORT = 3000;

async function startServer() {
  const distPath = path.join(process.cwd(), 'dist');

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    
    // Dynamic SSR fallback for development
    app.get('*', async (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      try {
        const indexPath = path.join(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(req.url, template);
        const result = renderFullHtmlForRoute(req.path, template);
        if (result.status === 301 && result.redirectUrl) {
          return res.redirect(301, result.redirectUrl);
        }
        res.status(result.status).set({ 'Content-Type': 'text/html' }).send(result.html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Serve static assets in production
    app.use(express.static(distPath, { index: false }));

    // Dynamic SSR rendering for all HTML page routes
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const template = fs.readFileSync(indexPath, 'utf-8');
        const result = renderFullHtmlForRoute(req.path, template);
        if (result.status === 301 && result.redirectUrl) {
          return res.redirect(301, result.redirectUrl);
        }
        return res.status(result.status).set({ 'Content-Type': 'text/html' }).send(result.html);
      }
      res.sendFile(indexPath);
    });
  }

  if (!process.env.VERCEL && !process.env.VERCEL_ENV) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Star Safety Server] listening on http://localhost:${PORT}`);
    });
  }
}

if (!process.env.VERCEL && !process.env.VERCEL_ENV) {
  startServer();
}

export default app;
