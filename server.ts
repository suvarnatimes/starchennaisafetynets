import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { createServer as createViteServer } from 'vite';
import express from 'express';
import app from './src/server/app.js';

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Boot Vite as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distFolder = 'di' + 'st';
    const distPath = path.join(process.cwd(), distFolder);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
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
