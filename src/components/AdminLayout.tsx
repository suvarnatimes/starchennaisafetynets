import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, BookOpen, Layers, Tag, Mail, ClipboardList, LogOut, Plus, 
  Trash2, Edit, Copy, Eye, Search, Filter, ArrowUpDown, Save, CheckCircle, 
  X, AlertCircle, Calendar, Clock, User, Heading, Bold, Italic, Link, 
  List, Table, Image, Video, HelpCircle, ArrowLeft, Upload, FileText,
  Smartphone, Check, RefreshCw, Images, ZoomIn, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Blog, Category, Tag as TagType, Inquiry, ActivityLog, GalleryImage } from '../types.js';

interface AdminLayoutProps {
  token: string;
  onLogout: () => void;
}

export default function AdminLayout({ token, onLogout }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'categories' | 'tags' | 'inquiries' | 'logs' | 'gallery'>('dashboard');
  
  // States for DB data
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // Gallery upload state
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryDragOver, setGalleryDragOver] = useState(false);
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('General');
  const [galleryLightbox, setGalleryLightbox] = useState<number | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  const GALLERY_CATEGORIES = ['General', 'Balcony Safety Nets', 'Invisible Grills', 'Pigeon Nets', 'Bird Spikes', 'Sports Nets', 'Construction Nets', 'Industrial Nets', 'Household'];
  
  // Loading & error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Blog list filters
  const [blogSearch, setBlogSearch] = useState('');
  const [blogStatusFilter, setBlogStatusFilter] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('');
  const [blogSort, setBlogSort] = useState('newest');
  const [selectedBlogIds, setSelectedBlogIds] = useState<string[]>([]);

  // Blog Editor State
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editorDragOver, setEditorDragOver] = useState(false);

  // Taxonomy states
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Partial<TagType> | null>(null);

  // Fetch all necessary data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [blogsRes, catsRes, tagsRes, inqsRes, logsRes, galleryRes] = await Promise.all([
        fetch('/api/blogs', { headers }),
        fetch('/api/categories'),
        fetch('/api/tags'),
        fetch('/api/inquiries', { headers }),
        fetch('/api/logs', { headers }),
        fetch('/api/gallery')
      ]);

      if (blogsRes.ok) setBlogs(await blogsRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
      if (tagsRes.ok) setTags(await tagsRes.json());
      if (inqsRes.ok) setInquiries(await inqsRes.json());
      if (logsRes.ok) setLogs(await logsRes.json());
      if (galleryRes.ok) setGalleryImages(await galleryRes.json());
    } catch (e: any) {
      showError('Failed to fetch admin dashboard data: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 4000);
  };

  // ================= INQUIRY ACTIONS =================
  const handleInquiryStatusChange = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showSuccess(`Inquiry status updated to ${status}`);
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to update inquiry');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  const handleInquiryDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Inquiry deleted successfully');
        fetchData();
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  // ================= CATEGORY ACTIONS =================
  const handleCategorySave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name || !editingCategory?.slug) {
      showError('Name and slug are required');
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const isNew = !editingCategory.id;
      const url = isNew ? '/api/categories' : `/api/categories/${editingCategory.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(editingCategory)
      });

      if (res.ok) {
        showSuccess(isNew ? 'Category created successfully' : 'Category updated successfully');
        setIsCatModalOpen(false);
        setEditingCategory(null);
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to save category');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  const handleCategoryDelete = async (id: string) => {
    if (!window.confirm('Deleting this category will remove its references from all blogs. Proceed?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Category deleted successfully');
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to delete category');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  // ================= TAG ACTIONS =================
  const handleTagSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag?.name || !editingTag?.slug) {
      showError('Name and slug are required');
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const isNew = !editingTag.id;
      const url = isNew ? '/api/tags' : `/api/tags/${editingTag.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(editingTag)
      });

      if (res.ok) {
        showSuccess(isNew ? 'Tag created successfully' : 'Tag updated successfully');
        setIsTagModalOpen(false);
        setEditingTag(null);
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to save tag');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  const handleTagDelete = async (id: string) => {
    if (!window.confirm('Deleting this tag will remove its references from all blogs. Proceed?')) return;
    try {
      const res = await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Tag deleted successfully');
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to delete tag');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  // ================= BLOG ACTIONS =================
  const handleBlogDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post permanently?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Blog deleted successfully');
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to delete blog');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  const handleBlogDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}/duplicate`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showSuccess('Blog duplicated successfully as a draft!');
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to duplicate blog');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  const handleBulkAction = async (action: 'publish' | 'unpublish' | 'delete') => {
    if (selectedBlogIds.length === 0) return;
    if (action === 'delete' && !window.confirm(`Are you sure you want to delete ${selectedBlogIds.length} blogs permanently?`)) return;

    try {
      const res = await fetch('/api/blogs/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: selectedBlogIds, action })
      });

      if (res.ok) {
        showSuccess(`Bulk action "${action}" completed successfully`);
        setSelectedBlogIds([]);
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Bulk action failed');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  // ================= EDITOR TOOLBAR HELPERS =================
  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = document.getElementById('blog-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = before + (selected || 'text') + after;
    const newContent = text.substring(0, start) + replacement + text.substring(end);

    setEditingBlog(prev => ({
      ...prev,
      content: newContent
    }));

    // Focus and select back
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected || 'text').length);
    }, 10);
  };

  // Image upload via drag-drop or file selector
  const handleImageUpload = async (file: File, type: 'featured' | 'gallery') => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            image: base64Data,
            fileName: file.name
          })
        });

        if (res.ok) {
          const result = await res.json();
          showSuccess('Image uploaded and optimized!');
          
          if (type === 'featured') {
            setEditingBlog(prev => ({ ...prev, featuredImage: result.url }));
          } else {
            setEditingBlog(prev => ({
              ...prev,
              galleryImages: [...(prev.galleryImages || []), result.url]
            }));
          }
        } else {
          const err = await res.json();
          showError(err.error || 'Failed to upload image');
        }
      } catch (err: any) {
        showError('Upload error: ' + err.message);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBlogSave = async () => {
    if (!editingBlog?.title || !editingBlog?.slug) {
      showError('Title and slug are required.');
      return;
    }

    try {
      const isNew = !editingBlog.id;
      const url = isNew ? '/api/blogs' : `/api/blogs/${editingBlog.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingBlog)
      });

      if (res.ok) {
        showSuccess(isNew ? 'Blog post created successfully!' : 'Blog post updated successfully!');
        setIsEditorOpen(false);
        setEditingBlog(null);
        fetchData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to save blog');
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  // Filter & Sort Blogs
  const filteredBlogs = blogs.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                        b.shortDescription.toLowerCase().includes(blogSearch.toLowerCase());
    const matchStatus = blogStatusFilter ? b.status === blogStatusFilter : true;
    const matchCat = blogCategoryFilter ? b.categories.includes(blogCategoryFilter) : true;
    return matchSearch && matchStatus && matchCat;
  }).sort((a, b) => {
    if (blogSort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (blogSort === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0 select-none">
        <div className="space-y-8">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center text-white">
              <RefreshCw className="h-4 w-4 animate-spin" />
            </div>
            <div>
              <h2 className="font-display font-black text-sm tracking-wide leading-none text-white uppercase">Star Safety</h2>
              <span className="text-[9px] font-mono font-bold text-accent">ADMIN PORTAL</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab('dashboard'); setIsEditorOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('blogs'); setIsEditorOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'blogs' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Blog Articles
            </button>
            <button
              onClick={() => { setActiveTab('categories'); setIsEditorOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'categories' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" />
              Blog Categories
            </button>
            <button
              onClick={() => { setActiveTab('tags'); setIsEditorOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'tags' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Tag className="h-4 w-4" />
              Blog Tags
            </button>
            <button
              onClick={() => { setActiveTab('inquiries'); setIsEditorOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'inquiries' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                Customer Inquiries
              </div>
              {inquiries.filter(i => i.status === 'new').length > 0 && (
                <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('logs'); setIsEditorOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'logs' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              Audit Security Logs
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); setIsEditorOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'gallery' ? 'bg-accent text-white font-semibold' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Images className="h-4 w-4" />
              Photo Gallery
              <span className="ml-auto text-[9px] font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                {galleryImages.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 pt-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-rose-400 hover:bg-rose-950/30 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout Portal
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 bg-slate-900 p-8 overflow-y-auto">
        {/* Banner Messages */}
        {successMessage && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-emerald-400 animate-slideIn">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="fixed top-6 right-6 z-50 bg-rose-500 text-white flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-rose-400 animate-slideIn">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Render Views */}
        {isEditorOpen && editingBlog ? (
          /* ================= BLOG EDITOR SHEET ================= */
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => { setIsEditorOpen(false); setEditingBlog(null); }}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
              >
                <ArrowLeft className="h-4 w-4" /> Back to List
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    isPreviewMode 
                      ? 'bg-slate-800 border-slate-700 text-accent' 
                      : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  {isPreviewMode ? 'Edit Content' : 'Live Preview'}
                </button>
                <button
                  onClick={handleBlogSave}
                  className="flex items-center gap-1.5 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg transition-all"
                >
                  <Save className="h-4 w-4" />
                  Save Article
                </button>
              </div>
            </div>

            <h1 className="font-display font-black text-2xl text-white">
              {editingBlog.id ? 'Edit Blog Article' : 'Compose New Safety Net Article'}
            </h1>

            {isPreviewMode ? (
              /* BLOG PREVIEW SPLIT */
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 max-w-4xl mx-auto space-y-6 text-slate-200">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {editingBlog.categories?.map(cId => {
                      const cat = categories.find(c => c.id === cId);
                      return cat ? (
                        <span key={cId} className="bg-accent/15 text-accent font-semibold text-xs px-2.5 py-1 rounded-full">
                          {cat.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <h1 className="font-display font-bold text-3xl text-white leading-tight">{editingBlog.title || 'Untitled Article'}</h1>
                  <p className="text-slate-400 text-sm flex items-center gap-4">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-accent" /> {editingBlog.author || 'S. Rajkumar'}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-accent" /> {editingBlog.readingTime || '5 min read'}</span>
                  </p>
                </div>
                
                {editingBlog.featuredImage && (
                  <img src={editingBlog.featuredImage} alt="Featured banner" className="w-full h-80 object-cover rounded-xl" referrerPolicy="no-referrer" />
                )}

                <div className="markdown-body text-slate-300 space-y-4" style={{ color: '#cbd5e1' }}>
                  {editingBlog.content ? (
                    editingBlog.content.split('\n').map((para, i) => {
                      if (para.startsWith('## ')) {
                        return <h2 key={i} className="font-display font-bold text-xl text-white mt-6 mb-2 border-b border-slate-800 pb-1">{para.replace('## ', '')}</h2>;
                      }
                      if (para.startsWith('### ')) {
                        return <h3 key={i} className="font-display font-bold text-lg text-accent mt-4 mb-2">{para.replace('### ', '')}</h3>;
                      }
                      if (para.startsWith('* ')) {
                        return <li key={i} className="list-disc ml-6 my-1 text-slate-300">{para.replace('* ', '')}</li>;
                      }
                      if (para.startsWith('> ')) {
                        return <blockquote key={i} className="border-l-4 border-accent pl-4 italic text-slate-400 my-4 bg-slate-900/50 py-2 rounded-r-lg">{para.replace('> ', '')}</blockquote>;
                      }
                      return para.trim() ? <p key={i} className="leading-relaxed mb-4">{para}</p> : null;
                    })
                  ) : (
                    <p className="italic text-slate-500">No content composed yet.</p>
                  )}
                </div>

                {editingBlog.faqs && editingBlog.faqs.length > 0 && (
                  <div className="mt-8 border-t border-slate-800 pt-6 space-y-4">
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2"><HelpCircle className="h-5 w-5 text-accent" /> Article FAQs</h3>
                    <div className="space-y-3">
                      {editingBlog.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <h4 className="font-display font-bold text-sm text-white mb-1">Q: {faq.question}</h4>
                          <p className="text-xs text-slate-400">A: {faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* BLOG EDITOR LAYOUT */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  {/* General Block */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Article Title</label>
                      <input
                        type="text"
                        value={editingBlog.title || ''}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          setEditingBlog(prev => ({ ...prev, title, slug }));
                        }}
                        placeholder="e.g., How to Install High Quality Bird Nets"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">SEO Slug URL</label>
                      <input
                        type="text"
                        value={editingBlog.slug || ''}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="e.g., how-to-install-high-quality-bird-nets"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-accent focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Short Summary / Description</label>
                      <textarea
                        rows={2}
                        value={editingBlog.shortDescription || ''}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, shortDescription: e.target.value }))}
                        placeholder="Brief 150-character summary for blog feed and Google results."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {/* ASSISTED EDITOR WORKSPACE */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Rich Text Editor Toolbar</span>
                      
                      {/* Rich Toolbar Items */}
                      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('## ', '')}
                          title="Heading 2"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <Heading className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('**', '**')}
                          title="Bold text"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white font-black"
                        >
                          <Bold className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('_', '_')}
                          title="Italic text"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <Italic className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('[', '](https://url-path.com)')}
                          title="Add hyperlink"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <Link className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('* ', '')}
                          title="Bullet point"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <List className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('\n| Header 1 | Header 2 |\n|---|---|\n| Column 1 | Column 2 |\n', '')}
                          title="Add simple table"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <Table className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('> ', '')}
                          title="Callout Quote box"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor('@[youtube](dQw4w9WgXcQ)', '')}
                          title="YouTube Embed"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          <Video className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Drag-Drop Image Dropzone in Editor */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setEditorDragOver(true); }}
                      onDragLeave={() => setEditorDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setEditorDragOver(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageUpload(e.dataTransfer.files[0], 'gallery');
                        }
                      }}
                      className={`relative flex flex-col ${editorDragOver ? 'border-accent bg-accent/5' : 'border-slate-800 bg-slate-900'} border-2 border-dashed rounded-xl transition-all`}
                    >
                      <textarea
                        id="blog-editor-textarea"
                        rows={14}
                        value={editingBlog.content || ''}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog content here in markdown... You can drag and drop images directly here to upload them to your gallery!"
                        className="w-full bg-transparent p-4 text-sm text-slate-200 font-mono leading-relaxed focus:outline-none min-h-[300px]"
                      />
                      {editorDragOver && (
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-accent">
                          <Upload className="h-10 w-10 animate-bounce mb-2" />
                          <p className="text-sm font-semibold">Drop image to upload into Gallery</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FAQ Creator Section */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Article Specific FAQs</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const faqs = editingBlog.faqs || [];
                          setEditingBlog(prev => ({
                            ...prev,
                            faqs: [...faqs, { question: '', answer: '' }]
                          }));
                        }}
                        className="flex items-center gap-1 text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-accent font-semibold hover:bg-slate-800"
                      >
                        <Plus className="h-3 w-3" /> Add FAQ Item
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(!editingBlog.faqs || editingBlog.faqs.length === 0) ? (
                        <p className="text-xs text-slate-500 italic">No FAQs added yet. These will appear structured on Google search and at the bottom of the article.</p>
                      ) : (
                        editingBlog.faqs.map((faq, idx) => (
                          <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative group">
                            <button
                              type="button"
                              onClick={() => {
                                const newFaqs = [...(editingBlog.faqs || [])];
                                newFaqs.splice(idx, 1);
                                setEditingBlog(prev => ({ ...prev, faqs: newFaqs }));
                              }}
                              className="absolute top-2 right-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <div>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => {
                                  const newFaqs = [...(editingBlog.faqs || [])];
                                  newFaqs[idx].question = e.target.value;
                                  setEditingBlog(prev => ({ ...prev, faqs: newFaqs }));
                                }}
                                placeholder="Question"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div>
                              <textarea
                                value={faq.answer}
                                onChange={(e) => {
                                  const newFaqs = [...(editingBlog.faqs || [])];
                                  newFaqs[idx].answer = e.target.value;
                                  setEditingBlog(prev => ({ ...prev, faqs: newFaqs }));
                                }}
                                placeholder="Answer"
                                rows={2}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar Config Options */}
                <div className="space-y-6">
                  {/* Status & Settings */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">Publishing Status</h3>
                    
                    <div>
                      <label className="block text-[11px] text-slate-400 font-semibold mb-1">Status</label>
                      <select
                        value={editingBlog.status || 'draft'}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, status: e.target.value as any }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent font-semibold"
                      >
                        <option value="draft">📁 Draft</option>
                        <option value="published">🚀 Published</option>
                        <option value="scheduled">📅 Scheduled</option>
                      </select>
                    </div>

                    {editingBlog.status === 'scheduled' && (
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-accent" /> Scheduled Launch Date
                        </label>
                        <input
                          type="datetime-local"
                          value={editingBlog.scheduledDate ? editingBlog.scheduledDate.substring(0, 16) : ''}
                          onChange={(e) => setEditingBlog(prev => ({ ...prev, scheduledDate: new Date(e.target.value).toISOString() }))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">Author</label>
                        <input
                          type="text"
                          value={editingBlog.author || ''}
                          onChange={(e) => setEditingBlog(prev => ({ ...prev, author: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">Read Time</label>
                        <input
                          type="text"
                          value={editingBlog.readingTime || '5 min read'}
                          onChange={(e) => setEditingBlog(prev => ({ ...prev, readingTime: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Taxonomy Pickers */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">Taxonomies</h3>
                    
                    {/* Categories List */}
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold mb-2">Categories</label>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto bg-slate-900 p-3 rounded-xl border border-slate-800">
                        {categories.map(cat => (
                          <label key={cat.id} className="flex items-center gap-2 text-xs cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={editingBlog.categories?.includes(cat.id) || false}
                              onChange={(e) => {
                                const list = editingBlog.categories || [];
                                const nextList = e.target.checked 
                                  ? [...list, cat.id] 
                                  : list.filter(id => id !== cat.id);
                                setEditingBlog(prev => ({ ...prev, categories: nextList }));
                              }}
                              className="accent-accent"
                            />
                            {cat.name}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Tags List */}
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold mb-2">Tags</label>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto bg-slate-900 p-3 rounded-xl border border-slate-800">
                        {tags.map(tag => (
                          <label key={tag.id} className="flex items-center gap-2 text-xs cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={editingBlog.tags?.includes(tag.id) || false}
                              onChange={(e) => {
                                const list = editingBlog.tags || [];
                                const nextList = e.target.checked 
                                  ? [...list, tag.id] 
                                  : list.filter(id => id !== tag.id);
                                setEditingBlog(prev => ({ ...prev, tags: nextList }));
                              }}
                              className="accent-accent"
                            />
                            {tag.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Manager */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">Media Assets</h3>
                    
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold mb-1.5">Featured Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingBlog.featuredImage || ''}
                          onChange={(e) => setEditingBlog(prev => ({ ...prev, featuredImage: e.target.value }))}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent font-mono"
                        />
                        <label className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl cursor-pointer flex items-center justify-center flex-shrink-0">
                          <Upload className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], 'featured');
                              }
                            }}
                          />
                        </label>
                      </div>
                      {editingBlog.featuredImage && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-800">
                          <img src={editingBlog.featuredImage} alt="Featured preview" className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>

                    {/* Gallery Images */}
                    <div>
                      <label className="block text-[11px] text-slate-400 font-bold mb-1.5">Gallery Uploads</label>
                      <div className="grid grid-cols-3 gap-2">
                        {editingBlog.galleryImages?.map((img, idx) => (
                          <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-800 aspect-square">
                            <img src={img} alt="Gallery item" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(editingBlog.galleryImages || [])];
                                list.splice(idx, 1);
                                setEditingBlog(prev => ({ ...prev, galleryImages: list }));
                              }}
                              className="absolute inset-0 bg-slate-950/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <label className="border border-dashed border-slate-800 hover:border-slate-700 bg-slate-900 rounded-lg flex flex-col items-center justify-center aspect-square cursor-pointer">
                          <Plus className="h-5 w-5 text-slate-500" />
                          <span className="text-[9px] text-slate-500 font-semibold font-mono">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0], 'gallery');
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SEO Metadata */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">Google SEO Optimization</h3>
                    
                    <div>
                      <label className="block text-[11px] text-slate-400 font-semibold mb-1">SEO Title Tag</label>
                      <input
                        type="text"
                        value={editingBlog.metaTitle || ''}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="Google page title"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-semibold mb-1">Meta Description</label>
                      <textarea
                        rows={2}
                        value={editingBlog.metaDescription || ''}
                        onChange={(e) => setEditingBlog(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="Snippet appearing in search results..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'dashboard' ? (
          /* ================= OVERVIEW DASHBOARD VIEW ================= */
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="font-display font-black text-2xl text-white">Overview Dashboard</h1>
                <p className="text-xs text-slate-400 font-mono uppercase">System Analytics & Customer Leads</p>
              </div>
              <div className="text-xs font-mono bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-slate-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Server Online (Port 3000)
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase">Total Articles</p>
                  <p className="font-display font-extrabold text-3xl text-white mt-1">{blogs.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase">Draft Articles</p>
                  <p className="font-display font-extrabold text-3xl text-amber-500 mt-1">{blogs.filter(b => b.status === 'draft').length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <FileText className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase">Customer Leads</p>
                  <p className="font-display font-extrabold text-3xl text-blue-500 mt-1">{inquiries.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <Mail className="h-6 w-6" />
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase">Unresolved Leads</p>
                  <p className="font-display font-extrabold text-3xl text-rose-500 mt-1">{inquiries.filter(i => i.status === 'new').length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                  <Smartphone className="h-6 w-6 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Main Grid: Customer Leads & System Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Recent Customer Inquiries (2/3) */}
              <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-display font-bold text-base text-white">Recent Service Quote Requests</h3>
                  <button 
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                  >
                    View All Leads ({inquiries.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase">
                        <th className="py-3 px-2">Customer / Contact</th>
                        <th className="py-3 px-2">Requested Service</th>
                        <th className="py-3 px-2">City</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3.5 px-2">
                            <p className="font-semibold text-white">{inq.name}</p>
                            <p className="text-slate-400 font-mono text-[11px]">{inq.phone} • {inq.email || 'No email'}</p>
                          </td>
                          <td className="py-3.5 px-2 font-medium text-slate-300">{inq.service}</td>
                          <td className="py-3.5 px-2 text-slate-400 font-semibold">{inq.city}</td>
                          <td className="py-3.5 px-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              inq.status === 'new' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                              inq.status === 'contacted' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                              'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            }`}>
                              {inq.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex justify-end gap-2">
                              {inq.status !== 'resolved' && (
                                <button
                                  onClick={() => handleInquiryStatusChange(inq.id, inq.status === 'new' ? 'contacted' : 'resolved')}
                                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-accent font-semibold p-1.5 rounded-lg"
                                  title={inq.status === 'new' ? 'Mark Contacted' : 'Mark Resolved'}
                                >
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleInquiryDelete(inq.id)}
                                className="bg-slate-900 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-900 text-slate-400 hover:text-rose-400 p-1.5 rounded-lg"
                                title="Delete inquiry"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {inquiries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-slate-500 italic">No customer inquiries submitted yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Security/Activity Logs (1/3) */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-display font-bold text-base text-white">System Actions Log</h3>
                  <button 
                    onClick={() => setActiveTab('logs')}
                    className="text-xs font-semibold text-slate-500 hover:text-white"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {logs.slice(0, 10).map((log) => (
                    <div key={log.id} className="text-[11px] font-mono leading-relaxed border-b border-slate-900/60 pb-2">
                      <div className="flex items-center justify-between text-slate-500 mb-0.5">
                        <span className="font-bold text-accent">{log.action}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-slate-300">{log.details}</p>
                      <p className="text-[10px] text-slate-600">By: {log.user}</p>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <p className="text-xs text-slate-500 italic text-center py-4">No activities logged yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'blogs' ? (
          /* ================= BLOG ARTICLES VIEW ================= */
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="font-display font-black text-2xl text-white">Blog Articles Management</h1>
                <p className="text-xs text-slate-400 font-mono uppercase">Write, publish, and schedule safety net expertise articles</p>
              </div>
              <button
                onClick={() => {
                  setEditingBlog({
                    title: '',
                    slug: '',
                    shortDescription: '',
                    content: '',
                    categories: [],
                    tags: [],
                    status: 'draft',
                    faqs: [],
                    galleryImages: []
                  });
                  setIsEditorOpen(true);
                }}
                className="flex items-center gap-1.5 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <Plus className="h-4 w-4" /> Compose Article
              </button>
            </div>

            {/* Filters Toolbar */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search input */}
                <div className="relative min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={blogStatusFilter}
                  onChange={(e) => setBlogStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>

                {/* Category Filter */}
                <select
                  value={blogCategoryFilter}
                  onChange={(e) => setBlogCategoryFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={blogSort}
                  onChange={(e) => setBlogSort(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>

              {/* Bulk Actions Panel */}
              {selectedBlogIds.length > 0 && (
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 font-bold">{selectedBlogIds.length} selected:</span>
                  <button
                    onClick={() => handleBulkAction('publish')}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Publish
                  </button>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => handleBulkAction('unpublish')}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Unpublish
                  </button>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="text-rose-400 hover:underline font-semibold"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Articles Table Grid */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase bg-slate-950">
                    <th className="py-3.5 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedBlogIds.length === filteredBlogs.length && filteredBlogs.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBlogIds(filteredBlogs.map(b => b.id));
                          } else {
                            setSelectedBlogIds([]);
                          }
                        }}
                        className="accent-accent"
                      />
                    </th>
                    <th className="py-3.5 px-4">Article Title</th>
                    <th className="py-3.5 px-4">Categories</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Publish Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-xs">
                  {filteredBlogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedBlogIds.includes(blog.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBlogIds([...selectedBlogIds, blog.id]);
                            } else {
                              setSelectedBlogIds(selectedBlogIds.filter(id => id !== blog.id));
                            }
                          }}
                          className="accent-accent"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={blog.featuredImage}
                            alt=""
                            className="h-10 w-14 object-cover rounded border border-slate-800"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-semibold text-white max-w-sm truncate">{blog.title}</p>
                            <p className="text-[10px] text-slate-500 font-mono">/{blog.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        {blog.categories.map(cId => categories.find(c => c.id === cId)?.name).filter(Boolean).join(', ') || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          blog.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          blog.status === 'scheduled' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {blog.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-400 font-mono">
                        {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingBlog(blog);
                              setIsEditorOpen(true);
                              setIsPreviewMode(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleBlogDuplicate(blog.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                            title="Duplicate"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleBlogDelete(blog.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBlogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">No blog articles match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'categories' ? (
          /* ================= BLOG CATEGORIES VIEW ================= */
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="font-display font-black text-2xl text-white">Categories Management</h1>
                <p className="text-xs text-slate-400 font-mono uppercase">Group and classify safety net articles</p>
              </div>
              <button
                onClick={() => {
                  setEditingCategory({ name: '', slug: '', description: '' });
                  setIsCatModalOpen(true);
                }}
                className="flex items-center gap-1 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg transition-all"
              >
                <Plus className="h-4 w-4" /> Create Category
              </button>
            </div>

            {/* Category Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase bg-slate-950">
                    <th className="py-3.5 px-4">Category Name</th>
                    <th className="py-3.5 px-4">Slug URL</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">{cat.name}</td>
                      <td className="py-4 px-4 font-mono text-accent">/{cat.slug}</td>
                      <td className="py-4 px-4 text-slate-400">{cat.description || '-'}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingCategory(cat);
                              setIsCatModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleCategoryDelete(cat.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Category Save Modal Overlay */}
            {isCatModalOpen && editingCategory && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <form onSubmit={handleCategorySave} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 w-full max-w-md space-y-4 shadow-2xl animate-scaleIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-display font-bold text-base text-white">
                      {editingCategory.id ? 'Edit Category' : 'Create New Category'}
                    </h3>
                    <button type="button" onClick={() => setIsCatModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Name</label>
                    <input
                      type="text"
                      value={editingCategory.name || ''}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        setEditingCategory(prev => ({ ...prev, name, slug }));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Slug</label>
                    <input
                      type="text"
                      value={editingCategory.slug || ''}
                      onChange={(e) => setEditingCategory(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-accent focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Description</label>
                    <textarea
                      value={editingCategory.description || ''}
                      onChange={(e) => setEditingCategory(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCatModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-light text-white"
                    >
                      Save Category
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : activeTab === 'tags' ? (
          /* ================= BLOG TAGS VIEW ================= */
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="font-display font-black text-2xl text-white">Tags Management</h1>
                <p className="text-xs text-slate-400 font-mono uppercase">Manage filter keywords for safety net articles</p>
              </div>
              <button
                onClick={() => {
                  setEditingTag({ name: '', slug: '' });
                  setIsTagModalOpen(true);
                }}
                className="flex items-center gap-1 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg transition-all"
              >
                <Plus className="h-4 w-4" /> Create Tag
              </button>
            </div>

            {/* Tag List */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase bg-slate-950">
                    <th className="py-3.5 px-4">Tag Name</th>
                    <th className="py-3.5 px-4">Slug URL</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {tags.map(tag => (
                    <tr key={tag.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">{tag.name}</td>
                      <td className="py-4 px-4 font-mono text-accent">#{tag.slug}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingTag(tag);
                              setIsTagModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleTagDelete(tag.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tag Modal Overlay */}
            {isTagModalOpen && editingTag && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <form onSubmit={handleTagSave} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 w-full max-w-md space-y-4 shadow-2xl animate-scaleIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-display font-bold text-base text-white">
                      {editingTag.id ? 'Edit Tag' : 'Create New Tag'}
                    </h3>
                    <button type="button" onClick={() => setIsTagModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Tag Name</label>
                    <input
                      type="text"
                      value={editingTag.name || ''}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        setEditingTag(prev => ({ ...prev, name, slug }));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Slug</label>
                    <input
                      type="text"
                      value={editingTag.slug || ''}
                      onChange={(e) => setEditingTag(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-accent focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsTagModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-light text-white"
                    >
                      Save Tag
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : activeTab === 'inquiries' ? (
          /* ================= CUSTOMER INQUIRIES LEADS VIEW ================= */
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="font-display font-black text-2xl text-white">Customer Leads Inbox</h1>
              <p className="text-xs text-slate-400 font-mono uppercase">Direct quote requests from home and business owners across Tamil Nadu</p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 uppercase bg-slate-950">
                    <th className="py-3.5 px-4">Contact Detail</th>
                    <th className="py-3.5 px-4">Requested Service</th>
                    <th className="py-3.5 px-4">City</th>
                    <th className="py-3.5 px-4">User Message</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-bold text-white">{inq.name}</p>
                        <p className="text-slate-400 font-mono text-[10px] mt-0.5">Phone: {inq.phone}</p>
                        {inq.email && <p className="text-slate-500 text-[10px]">Email: {inq.email}</p>}
                        <p className="text-[9px] text-slate-600 mt-1 font-mono">Date: {new Date(inq.createdAt).toLocaleDateString()} {new Date(inq.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-200">{inq.service}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-accent font-semibold">{inq.city}</span>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{inq.message || <span className="italic text-slate-600">No custom message.</span>}</p>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                          className={`px-2 py-1 rounded border text-[10px] font-bold ${
                            inq.status === 'new' ? 'bg-rose-500/15 text-rose-500 border-rose-500/30' :
                            inq.status === 'contacted' ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' :
                            'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          } focus:outline-none`}
                        >
                          <option value="new" className="bg-slate-950 text-rose-500 font-semibold">NEW</option>
                          <option value="contacted" className="bg-slate-950 text-amber-500 font-semibold">CONTACTED</option>
                          <option value="resolved" className="bg-slate-950 text-emerald-500 font-semibold">RESOLVED</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`tel:${inq.phone}`}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center"
                            title="Call Customer"
                          >
                            <Smartphone className="h-3.5 w-3.5" />
                          </a>
                          <button
                            onClick={() => handleInquiryDelete(inq.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">No customer inquiries submitted yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ================= SYSTEM ACTIVITY LOGS VIEW ================= */
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="font-display font-black text-2xl text-white">System Security Audit Logs</h1>
              <p className="text-xs text-slate-400 font-mono uppercase">Trace administrative changes, edits, deletions, and login tracking</p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase bg-slate-950">
                    <th className="py-3.5 px-4">Timestamp</th>
                    <th className="py-3.5 px-4">Event Code</th>
                    <th className="py-3.5 px-4">Details</th>
                    <th className="py-3.5 px-4">Operator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-3 px-4 text-slate-500 font-medium">
                        {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-accent font-bold">{log.action}</span>
                      </td>
                      <td className="py-3 px-4 max-w-sm truncate" title={log.details}>
                        {log.details}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {log.user}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================== GALLERY TAB =================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-black text-white tracking-tight">Photo Gallery</h2>
                <p className="text-xs text-slate-400 mt-1">{galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''} in the public gallery</p>
              </div>
            </div>

            {/* Upload Card */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="h-4 w-4 text-blue-400" /> Upload New Images
              </h3>

              {/* Drag & Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${galleryDragOver ? 'border-blue-400 bg-blue-900/20' : 'border-slate-600 hover:border-slate-400'}`}
                onDragOver={(e) => { e.preventDefault(); setGalleryDragOver(true); }}
                onDragLeave={() => setGalleryDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setGalleryDragOver(false);
                  const allFiles = Array.from(e.dataTransfer.files as FileList) as File[];
                  const files: File[] = allFiles.filter(f => f.type.startsWith('image/'));

                  if (!files.length) return;
                  // Upload each file
                  const uploadFile = async (file: File) => {
                    setGalleryUploading(true);
                    try {
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const base64 = reader.result as string;
                        const res = await fetch('/api/gallery', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                          body: JSON.stringify({ image: base64, fileName: file.name, caption: galleryCaption, category: galleryCategory })
                        });
                        if (res.ok) {
                          const newImg = await res.json();
                          setGalleryImages(prev => [newImg, ...prev]);
                          setGalleryCaption('');
                          showSuccess('Image uploaded successfully!');
                        } else {
                          const err = await res.json();
                          showError(err.error || 'Upload failed.');
                        }
                        setGalleryUploading(false);
                      };
                      reader.readAsDataURL(file);
                    } catch { setGalleryUploading(false); showError('Upload failed.'); }
                  };
                  files.forEach(uploadFile);
                }}
                onClick={() => galleryInputRef.current?.click()}
              >
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files: File[] = Array.from(e.target.files || []);
                    if (!files.length) return;
                    files.forEach(async (file: File) => {
                      setGalleryUploading(true);
                      try {
                        const reader = new FileReader();
                        reader.onloadend = async () => {
                          const base64 = reader.result as string;
                          const res = await fetch('/api/gallery', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify({ image: base64, fileName: file.name, caption: galleryCaption, category: galleryCategory })
                          });
                          if (res.ok) {
                            const newImg = await res.json();
                            setGalleryImages(prev => [newImg, ...prev]);
                            setGalleryCaption('');
                            showSuccess('Image uploaded!');
                          } else {
                            const err = await res.json();
                            showError(err.error || 'Upload failed.');
                          }
                          setGalleryUploading(false);
                        };
                        reader.readAsDataURL(file);
                      } catch { setGalleryUploading(false); showError('Upload failed.'); }
                    });
                    e.target.value = '';
                  }}
                />
                {galleryUploading ? (
                  <div className="flex flex-col items-center gap-2 text-blue-400">
                    <RefreshCw className="h-8 w-8 animate-spin" />
                    <span className="text-sm font-medium">Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Images className="h-8 w-8 text-slate-500" />
                    <span className="text-sm font-medium">Drag & drop images here, or click to browse</span>
                    <span className="text-xs text-slate-500">Supports JPG, PNG, WEBP — multiple files at once</span>
                  </div>
                )}
              </div>

              {/* Caption + Category inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Caption (Optional)</label>
                  <input
                    type="text"
                    value={galleryCaption}
                    onChange={e => setGalleryCaption(e.target.value)}
                    placeholder="e.g. Balcony net installation in Adyar"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Category</label>
                  <select
                    value={galleryCategory}
                    onChange={e => setGalleryCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                  >
                    {GALLERY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            {galleryImages.length === 0 ? (
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-16 text-center text-slate-500 space-y-2">
                <Images className="h-10 w-10 mx-auto text-slate-600" />
                <p className="text-sm font-medium">No images in the gallery yet.</p>
                <p className="text-xs">Upload your first image using the form above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {galleryImages.map((img, idx) => (
                  <div key={img.id} className="group relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all shadow-sm hover:shadow-lg">
                    <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => setGalleryLightbox(idx)}>
                      <img
                        src={img.url}
                        alt={img.caption || 'Gallery'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Controls */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setGalleryLightbox(idx)}
                        className="h-7 w-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                        title="View full size"
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm('Delete this image from the gallery and Cloudinary?')) return;
                          try {
                            const res = await fetch(`/api/gallery/${img.id}`, {
                              method: 'DELETE',
                              headers: { 'Authorization': `Bearer ${token}` }
                            });
                            if (res.ok) {
                              setGalleryImages(prev => prev.filter(g => g.id !== img.id));
                              showSuccess('Image deleted.');
                            } else {
                              const err = await res.json();
                              showError(err.error || 'Delete failed.');
                            }
                          } catch { showError('Delete failed.'); }
                        }}
                        className="h-7 w-7 rounded-lg bg-rose-500/80 flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
                        title="Delete image"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Caption + Category footer */}
                    <div className="p-2 space-y-1">
                      {img.caption && <p className="text-[10px] text-white font-medium truncate">{img.caption}</p>}
                      <span className="inline-block bg-blue-500/20 text-blue-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide">{img.category || 'General'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gallery Lightbox */}
        {galleryLightbox !== null && galleryImages[galleryLightbox] && (
          <div
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setGalleryLightbox(null)}
          >
            <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10" onClick={() => setGalleryLightbox(null)}>
              <X className="h-5 w-5" />
            </button>
            <button className="absolute left-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
              onClick={(e) => { e.stopPropagation(); setGalleryLightbox((galleryLightbox - 1 + galleryImages.length) % galleryImages.length); }}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-3 px-16" onClick={e => e.stopPropagation()}>
              <img src={galleryImages[galleryLightbox].url} alt="" className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl" />
              {galleryImages[galleryLightbox].caption && <p className="text-white text-sm font-medium">{galleryImages[galleryLightbox].caption}</p>}
              <p className="text-slate-400 text-xs font-mono">{galleryLightbox + 1} / {galleryImages.length}</p>
            </div>
            <button className="absolute right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
              onClick={(e) => { e.stopPropagation(); setGalleryLightbox((galleryLightbox + 1) % galleryImages.length); }}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
