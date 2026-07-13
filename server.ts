import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/db.js';
import { Blog, Category, Tag, Inquiry } from './src/types.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '50mb' })); // support large image base64 uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure upload directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'data', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Static serve for uploads
app.use('/api/uploads', express.static(UPLOADS_DIR));

// Session authentication middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const data = db.get();
  const session = data.sessions.find(s => s.id === token);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return;
  }

  // Check expiration (let sessions last 24 hours)
  if (new Date(session.expiresAt) < new Date()) {
    // Remove expired session
    data.sessions = data.sessions.filter(s => s.id !== token);
    db.save(data);
    res.status(401).json({ error: 'Unauthorized: Session expired' });
    return;
  }

  // Attach session context
  (req as any).user = session;
  next();
};

// ================= AUTH API =================

app.post('/api/auth/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = db.validateUser(email, password);
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  // Create a session
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

  const data = db.get();
  const newSession = {
    id: token,
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt
  };

  data.sessions.push(newSession);
  db.save(data);

  db.logActivity('LOGIN', `User ${user.email} logged in successfully.`, user.email);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

app.post('/api/auth/logout', (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const data = db.get();
    const session = data.sessions.find(s => s.id === token);
    if (session) {
      db.logActivity('LOGOUT', `User ${session.email} logged out.`, session.email);
    }
    data.sessions = data.sessions.filter(s => s.id !== token);
    db.save(data);
  }
  res.json({ success: true });
});

app.get('/api/auth/session', authMiddleware, (req: Request, res: Response): void => {
  res.json({ user: (req as any).user });
});

// ================= BLOGS API =================

// Get all blogs (supports search, filter, categories, status check)
app.get('/api/blogs', (req: Request, res: Response): void => {
  const { status, category, tag, search, sort } = req.query;
  const data = db.get();
  let list = [...data.blogs];

  // Filters
  if (status) {
    list = list.filter(b => b.status === status);
  } else {
    // If no admin session is requested, show only published blogs (and resolve scheduled)
    const now = new Date();
    // Resolve scheduled posts
    let hasChanged = false;
    list.forEach(b => {
      if (b.status === 'scheduled' && b.scheduledDate && new Date(b.scheduledDate) <= now) {
        b.status = 'published';
        b.publishDate = b.scheduledDate;
        hasChanged = true;
      }
    });
    if (hasChanged) {
      db.save(data);
    }

    // Default to published for normal visitors
    const authHeader = req.headers.authorization;
    let isAdmin = false;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (data.sessions.some(s => s.id === token)) {
        isAdmin = true;
      }
    }

    if (!isAdmin) {
      list = list.filter(b => b.status === 'published');
    }
  }

  if (category) {
    list = list.filter(b => b.categories.includes(category as string));
  }

  if (tag) {
    list = list.filter(b => b.tags.includes(tag as string));
  }

  if (search) {
    const term = (search as string).toLowerCase();
    list = list.filter(
      b =>
        b.title.toLowerCase().includes(term) ||
        b.shortDescription.toLowerCase().includes(term) ||
        b.content.toLowerCase().includes(term)
    );
  }

  // Sort
  if (sort === 'oldest') {
    list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (sort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default: newest first
    list.sort((a, b) => {
      const timeA = a.publishDate ? new Date(a.publishDate).getTime() : new Date(a.createdAt).getTime();
      const timeB = b.publishDate ? new Date(b.publishDate).getTime() : new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  }

  res.json(list);
});

// Get single blog by slug
app.get('/api/blogs/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  const data = db.get();
  const blog = data.blogs.find(b => b.slug === slug);

  if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
    return;
  }

  // If blog is a draft, check if admin requested it
  if (blog.status !== 'published') {
    const authHeader = req.headers.authorization;
    let isAdmin = false;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (data.sessions.some(s => s.id === token)) {
        isAdmin = true;
      }
    }

    if (!isAdmin) {
      // Check if scheduled and triggerable
      const now = new Date();
      if (blog.status === 'scheduled' && blog.scheduledDate && new Date(blog.scheduledDate) <= now) {
        blog.status = 'published';
        blog.publishDate = blog.scheduledDate;
        db.save(data);
      } else {
        res.status(404).json({ error: 'Blog not found' });
        return;
      }
    }
  }

  res.json(blog);
});

// Create blog (Admin only)
app.post('/api/blogs', authMiddleware, (req: Request, res: Response): void => {
  const data = db.get();
  const blogData = req.body;

  if (!blogData.title || !blogData.slug) {
    res.status(400).json({ error: 'Title and slug are required' });
    return;
  }

  // Check unique slug
  if (data.blogs.some(b => b.slug === blogData.slug)) {
    res.status(400).json({ error: 'A blog with this slug already exists' });
    return;
  }

  const now = new Date().toISOString();
  const newBlog: Blog = {
    id: 'blog-' + Math.random().toString(36).substring(2, 9),
    title: blogData.title,
    slug: blogData.slug,
    shortDescription: blogData.shortDescription || '',
    content: blogData.content || '',
    featuredImage: blogData.featuredImage || 'https://picsum.photos/seed/blog/800/600',
    galleryImages: blogData.galleryImages || [],
    categories: blogData.categories || [],
    tags: blogData.tags || [],
    status: blogData.status || 'draft',
    scheduledDate: blogData.scheduledDate,
    publishDate: blogData.status === 'published' ? now : undefined,
    author: blogData.author || (req as any).user.name,
    readingTime: blogData.readingTime || '5 min read',
    metaTitle: blogData.metaTitle,
    metaDescription: blogData.metaDescription,
    ogImage: blogData.ogImage,
    faqs: blogData.faqs || [],
    createdAt: now,
    updatedAt: now
  };

  data.blogs.push(newBlog);
  db.save(data);

  db.logActivity('CREATE_BLOG', `Created blog post "${newBlog.title}"`, (req as any).user.email);

  res.status(201).json(newBlog);
});

// Update blog (Admin only)
app.put('/api/blogs/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = db.get();
  const blogIndex = data.blogs.findIndex(b => b.id === id);

  if (blogIndex === -1) {
    res.status(404).json({ error: 'Blog not found' });
    return;
  }

  const existingBlog = data.blogs[blogIndex];
  const updateData = req.body;

  if (updateData.slug && updateData.slug !== existingBlog.slug) {
    // Ensure slug uniqueness
    if (data.blogs.some(b => b.slug === updateData.slug && b.id !== id)) {
      res.status(400).json({ error: 'A blog with this slug already exists' });
      return;
    }
  }

  const now = new Date().toISOString();
  
  // Set publish date if status changed to published
  let publishDate = existingBlog.publishDate;
  if (updateData.status === 'published' && existingBlog.status !== 'published') {
    publishDate = now;
  }

  const updatedBlog: Blog = {
    ...existingBlog,
    ...updateData,
    publishDate,
    updatedAt: now
  };

  data.blogs[blogIndex] = updatedBlog;
  db.save(data);

  db.logActivity('UPDATE_BLOG', `Updated blog post "${updatedBlog.title}"`, (req as any).user.email);

  res.json(updatedBlog);
});

// Delete blog (Admin only)
app.delete('/api/blogs/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = db.get();
  const blog = data.blogs.find(b => b.id === id);

  if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
    return;
  }

  data.blogs = data.blogs.filter(b => b.id !== id);
  db.save(data);

  db.logActivity('DELETE_BLOG', `Deleted blog post "${blog.title}"`, (req as any).user.email);

  res.json({ success: true });
});

// Duplicate blog (Admin only)
app.post('/api/blogs/:id/duplicate', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = db.get();
  const blog = data.blogs.find(b => b.id === id);

  if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
    return;
  }

  const now = new Date().toISOString();
  const duplicateSlug = `${blog.slug}-copy-${Math.random().toString(36).substring(2, 5)}`;
  const duplicated: Blog = {
    ...blog,
    id: 'blog-' + Math.random().toString(36).substring(2, 9),
    title: `${blog.title} (Copy)`,
    slug: duplicateSlug,
    status: 'draft',
    publishDate: undefined,
    scheduledDate: undefined,
    createdAt: now,
    updatedAt: now
  };

  data.blogs.push(duplicated);
  db.save(data);

  db.logActivity('CREATE_BLOG', `Duplicated blog post "${blog.title}" to "${duplicated.title}"`, (req as any).user.email);

  res.status(201).json(duplicated);
});

// Bulk actions (Admin only)
app.post('/api/blogs/bulk', authMiddleware, (req: Request, res: Response): void => {
  const { ids, action } = req.body;
  if (!ids || !Array.isArray(ids) || !action) {
    res.status(400).json({ error: 'Invalid parameters' });
    return;
  }

  const data = db.get();
  let updatedCount = 0;
  const now = new Date().toISOString();

  if (action === 'delete') {
    data.blogs = data.blogs.filter(b => {
      if (ids.includes(b.id)) {
        updatedCount++;
        return false;
      }
      return true;
    });
    db.logActivity('DELETE_BLOG', `Bulk deleted ${updatedCount} blog posts.`, (req as any).user.email);
  } else if (action === 'publish') {
    data.blogs = data.blogs.map(b => {
      if (ids.includes(b.id) && b.status !== 'published') {
        updatedCount++;
        return { ...b, status: 'published', publishDate: now, updatedAt: now };
      }
      return b;
    });
    db.logActivity('UPDATE_BLOG', `Bulk published ${updatedCount} blog posts.`, (req as any).user.email);
  } else if (action === 'unpublish') {
    data.blogs = data.blogs.map(b => {
      if (ids.includes(b.id) && b.status === 'published') {
        updatedCount++;
        return { ...b, status: 'draft', publishDate: undefined, updatedAt: now };
      }
      return b;
    });
    db.logActivity('UPDATE_BLOG', `Bulk unpublished ${updatedCount} blog posts.`, (req as any).user.email);
  }

  db.save(data);
  res.json({ success: true, count: updatedCount });
});


// ================= CATEGORIES API =================

app.get('/api/categories', (req: Request, res: Response): void => {
  const data = db.get();
  res.json(data.categories);
});

app.post('/api/categories', authMiddleware, (req: Request, res: Response): void => {
  const { name, slug, description } = req.body;
  if (!name || !slug) {
    res.status(400).json({ error: 'Name and slug are required' });
    return;
  }

  const data = db.get();
  if (data.categories.some(c => c.slug === slug)) {
    res.status(400).json({ error: 'Category with this slug already exists' });
    return;
  }

  const newCategory: Category = {
    id: 'cat-' + Math.random().toString(36).substring(2, 9),
    name,
    slug,
    description,
    createdAt: new Date().toISOString()
  };

  data.categories.push(newCategory);
  db.save(data);

  db.logActivity('CREATE_CATEGORY', `Created category "${newCategory.name}"`, (req as any).user.email);

  res.status(201).json(newCategory);
});

app.put('/api/categories/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, slug, description } = req.body;
  const data = db.get();

  const index = data.categories.findIndex(c => c.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  if (slug && slug !== data.categories[index].slug) {
    if (data.categories.some(c => c.slug === slug && c.id !== id)) {
      res.status(400).json({ error: 'Category with this slug already exists' });
      return;
    }
  }

  const updatedCategory = {
    ...data.categories[index],
    name: name || data.categories[index].name,
    slug: slug || data.categories[index].slug,
    description: description !== undefined ? description : data.categories[index].description
  };

  data.categories[index] = updatedCategory;
  db.save(data);

  db.logActivity('UPDATE_CATEGORY', `Updated category "${updatedCategory.name}"`, (req as any).user.email);

  res.json(updatedCategory);
});

app.delete('/api/categories/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = db.get();
  const category = data.categories.find(c => c.id === id);

  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  // Remove category
  data.categories = data.categories.filter(c => c.id !== id);

  // Remove category reference from blogs
  data.blogs = data.blogs.map(b => ({
    ...b,
    categories: b.categories.filter(cId => cId !== id)
  }));

  db.save(data);
  db.logActivity('DELETE_CATEGORY', `Deleted category "${category.name}" and references.`, (req as any).user.email);

  res.json({ success: true });
});

// ================= TAGS API =================

app.get('/api/tags', (req: Request, res: Response): void => {
  const data = db.get();
  res.json(data.tags);
});

app.post('/api/tags', authMiddleware, (req: Request, res: Response): void => {
  const { name, slug } = req.body;
  if (!name || !slug) {
    res.status(400).json({ error: 'Name and slug are required' });
    return;
  }

  const data = db.get();
  if (data.tags.some(t => t.slug === slug)) {
    res.status(400).json({ error: 'Tag with this slug already exists' });
    return;
  }

  const newTag: Tag = {
    id: 'tag-' + Math.random().toString(36).substring(2, 9),
    name,
    slug,
    createdAt: new Date().toISOString()
  };

  data.tags.push(newTag);
  db.save(data);

  db.logActivity('CREATE_TAG', `Created tag "${newTag.name}"`, (req as any).user.email);

  res.status(201).json(newTag);
});

app.put('/api/tags/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, slug } = req.body;
  const data = db.get();

  const index = data.tags.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Tag not found' });
    return;
  }

  if (slug && slug !== data.tags[index].slug) {
    if (data.tags.some(t => t.slug === slug && t.id !== id)) {
      res.status(400).json({ error: 'Tag with this slug already exists' });
      return;
    }
  }

  const updatedTag = {
    ...data.tags[index],
    name: name || data.tags[index].name,
    slug: slug || data.tags[index].slug
  };

  data.tags[index] = updatedTag;
  db.save(data);

  db.logActivity('UPDATE_TAG', `Updated tag "${updatedTag.name}"`, (req as any).user.email);

  res.json(updatedTag);
});

app.delete('/api/tags/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = db.get();
  const tag = data.tags.find(t => t.id === id);

  if (!tag) {
    res.status(404).json({ error: 'Tag not found' });
    return;
  }

  // Remove tag
  data.tags = data.tags.filter(t => t.id !== id);

  // Remove tag reference from blogs
  data.blogs = data.blogs.map(b => ({
    ...b,
    tags: b.tags.filter(tId => tId !== id)
  }));

  db.save(data);
  db.logActivity('DELETE_TAG', `Deleted tag "${tag.name}" and references.`, (req as any).user.email);

  res.json({ success: true });
});


// ================= INQUIRIES API =================

// Submit new customer inquiry (Public)
app.post('/api/inquiries', (req: Request, res: Response): void => {
  const { name, phone, email, city, service, message } = req.body;

  if (!name || !phone || !city || !service) {
    res.status(400).json({ error: 'Name, Phone, City, and Service are required' });
    return;
  }

  const data = db.get();
  const newInquiry: Inquiry = {
    id: 'inq-' + Math.random().toString(36).substring(2, 9),
    name,
    phone,
    email: email || '',
    city,
    service,
    message: message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  data.inquiries.unshift(newInquiry);
  db.save(data);

  // System log
  db.logActivity('CUSTOMER_INQUIRY', `Customer ${name} from ${city} submitted an inquiry for "${service}"`, 'visitor');

  res.status(201).json(newInquiry);
});

// Get inquiries (Admin only)
app.get('/api/inquiries', authMiddleware, (req: Request, res: Response): void => {
  const data = db.get();
  res.json(data.inquiries);
});

// Update inquiry status (Admin only)
app.put('/api/inquiries/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
    res.status(400).json({ error: 'Valid status is required' });
    return;
  }

  const data = db.get();
  const inquiryIndex = data.inquiries.findIndex(i => i.id === id);

  if (inquiryIndex === -1) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }

  const updatedInquiry = {
    ...data.inquiries[inquiryIndex],
    status: status as 'new' | 'contacted' | 'resolved'
  };

  data.inquiries[inquiryIndex] = updatedInquiry;
  db.save(data);

  db.logActivity('UPDATE_INQUIRY', `Marked inquiry of ${updatedInquiry.name} as ${status}`, (req as any).user.email);

  res.json(updatedInquiry);
});

// Delete inquiry (Admin only)
app.delete('/api/inquiries/:id', authMiddleware, (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = db.get();
  const inquiry = data.inquiries.find(i => i.id === id);

  if (!inquiry) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }

  data.inquiries = data.inquiries.filter(i => i.id !== id);
  db.save(data);

  db.logActivity('DELETE_INQUIRY', `Deleted inquiry of ${inquiry.name}.`, (req as any).user.email);

  res.json({ success: true });
});


// ================= ACTIVITY LOGS API =================

app.get('/api/logs', authMiddleware, (req: Request, res: Response): void => {
  const data = db.get();
  res.json(data.logs);
});


// ================= IMAGE UPLOAD API =================

app.post('/api/upload', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { image, fileName } = req.body; // base64 payload & preferred file name

  if (!image) {
    res.status(400).json({ error: 'No image data provided' });
    return;
  }

  try {
    // If Cloudinary is configured, upload directly to Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'starchennaisafetynets',
        public_id: `${Date.now()}-${(fileName || 'upload').replace(/[^a-zA-Z0-9]/g, '-')}`
      });
      res.status(201).json({ url: uploadResult.secure_url });
      return;
    }

    // Fallback to local file upload
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ error: 'Invalid image format' });
      return;
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const extension = matches[1].split('/')[1] || 'png';
    const cleanFileName = `${Date.now()}-${(fileName || 'upload').replace(/[^a-zA-Z0-9]/g, '-')}.${extension}`;
    const filePath = path.join(UPLOADS_DIR, cleanFileName);

    fs.writeFileSync(filePath, imageBuffer);

    const relativeUrl = `/api/uploads/${cleanFileName}`;
    res.status(201).json({ url: relativeUrl });
  } catch (err: any) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload image file: ' + err.message });
  }
});


// ================= VITE DEV SERVER OR STATIC PROD SERVE =================

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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Star Safety Server] listening on http://localhost:${PORT}`);
  });
}

startServer();
