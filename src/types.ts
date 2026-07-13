export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string; // Rich markdown or HTML content
  featuredImage: string;
  galleryImages: string[];
  categories: string[]; // Category IDs
  tags: string[]; // Tag IDs
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  publishDate?: string;
  author: string;
  readingTime: string; // e.g. "5 min read"
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  faqs: { question: string; answer: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  action: string; // e.g. "CREATE_BLOG", "UPDATE_BLOG", "DELETE_BLOG", "LOGIN", "LOGOUT"
  details: string;
  user: string; // Email of the user who performed the action
  timestamp: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  email: string;
  name: string;
  expiresAt: string;
}
