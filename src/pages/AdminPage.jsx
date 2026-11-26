import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  LogOut,
  MessageSquareQuote,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
  X
} from 'lucide-react';
import {
  checkAdminSession,
  clearStoredAdminToken,
  createGalleryItem,
  createTestimonial,
  deleteGalleryItem,
  deleteTestimonial,
  fetchSiteContent,
  getStoredAdminToken,
  loginAdmin,
  logoutAdmin,
  updateGalleryItem,
  updateTestimonial,
  uploadAdminImage
} from '../services/contentApi';
import {
  DEFAULT_GALLERY_CATEGORIES,
  DEFAULT_GALLERY_ITEMS,
  DEFAULT_TESTIMONIALS
} from '../data/defaultContent';

function ImageInputField({
  label,
  value,
  onChange,
  required = false,
  placeholder = 'https://... or upload an image',
  previewShape = 'rect',
  onNotify
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploading(true);
    try {
      const { url } = await uploadAdminImage(file);
      onChange(url);
      onNotify?.('success', 'Image uploaded successfully.');
    } catch (err) {
      onNotify?.('error', err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {value && !required && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] font-semibold text-gray-500 hover:text-red-600 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="flex-1 border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
        />
        <label
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer shrink-0 ${
            uploading
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-wait'
              : 'bg-[#14352d] hover:bg-[#248057] text-white border-[#14352d]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading ? 'Uploading...' : 'Upload'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {value && (
        <div className="pt-1 flex items-center gap-3">
          <img
            src={value}
            alt="Preview"
            className={
              previewShape === 'circle'
                ? 'w-14 h-14 rounded-full object-cover border border-gray-300'
                : 'w-32 h-20 object-cover border border-gray-300'
            }
          />
          <span className="text-xs text-gray-500 break-all line-clamp-2">{value}</span>
        </div>
      )}
    </div>
  );
}

const EMPTY_GALLERY_FORM = {
  title: '',
  category: 'Coworking',
  src: ''
};

const EMPTY_TESTIMONIAL_FORM = {
  author: '',
  role: '',
  quote: '',
  rating: 5,
  avatar: ''
};

export default function AdminPage({ siteContent, onContentChange, onNavigateHome }) {
  const [authState, setAuthState] = useState('checking'); // checking | unauthenticated | authenticated
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState('gallery');
  const [notice, setNotice] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Gallery state
  const [galleryForm, setGalleryForm] = useState(EMPTY_GALLERY_FORM);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [gallerySearch, setGallerySearch] = useState('');
  const [confirmDeleteGalleryId, setConfirmDeleteGalleryId] = useState(null);

  // Testimonial state
  const [testimonialForm, setTestimonialForm] = useState(EMPTY_TESTIMONIAL_FORM);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [testimonialSearch, setTestimonialSearch] = useState('');
  const [confirmDeleteTestimonialId, setConfirmDeleteTestimonialId] = useState(null);

  const gallery = siteContent?.gallery || DEFAULT_GALLERY_ITEMS;
  const galleryCategories = siteContent?.galleryCategories || DEFAULT_GALLERY_CATEGORIES;
  const testimonials = siteContent?.testimonials || DEFAULT_TESTIMONIALS;

  const showNotice = (type, message) => {
    setNotice({ type, message });
  };

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    let active = true;
    const token = getStoredAdminToken();
    if (!token) {
      setAuthState('unauthenticated');
      return undefined;
    }

    checkAdminSession()
      .then(() => {
        if (active) setAuthState('authenticated');
      })
      .catch(() => {
        clearStoredAdminToken();
        if (active) setAuthState('unauthenticated');
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (authState !== 'authenticated') return undefined;
    let active = true;
    fetchSiteContent()
      .then((fresh) => {
        if (active) onContentChange?.(fresh);
      })
      .catch(() => {
        // Keep current content if refresh fails
      });
    return () => {
      active = false;
    };
  }, [authState, onContentChange]);

  const handleAuthError = (err) => {
    if (err.status === 401) {
      clearStoredAdminToken();
      setAuthState('unauthenticated');
      setLoginError('Session expired. Please sign in again.');
      return true;
    }
    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await loginAdmin(password);
      setPassword('');
      setAuthState('authenticated');
      showNotice('success', 'Signed in to SPACE11 Admin Panel.');
    } catch (err) {
      setLoginError(err.message || 'Invalid password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAuthState('unauthenticated');
    setNotice(null);
  };

  // Gallery handlers
  const availableCategories = useMemo(() => {
    const set = new Set([...DEFAULT_GALLERY_CATEGORIES, ...galleryCategories]);
    gallery.forEach((g) => {
      if (g.category) set.add(g.category);
    });
    return [...set];
  }, [galleryCategories, gallery]);

  const filteredGallery = useMemo(() => {
    const query = gallerySearch.trim().toLowerCase();
    return gallery.filter((item) => {
      const matchesCat = galleryFilter === 'All' || item.category === galleryFilter;
      const matchesQuery =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  }, [gallery, galleryFilter, gallerySearch]);

  const resetGalleryForm = () => {
    setGalleryForm(EMPTY_GALLERY_FORM);
    setEditingGalleryId(null);
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = editingGalleryId
        ? await updateGalleryItem(editingGalleryId, galleryForm)
        : await createGalleryItem(galleryForm);

      onContentChange?.((prev) => ({
        ...prev,
        gallery: data.gallery,
        galleryCategories: data.galleryCategories
      }));
      showNotice(
        'success',
        editingGalleryId ? 'Gallery item updated.' : 'Gallery item added.'
      );
      resetGalleryForm();
    } catch (err) {
      if (!handleAuthError(err)) {
        showNotice('error', err.message || 'Could not save gallery item.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditGallery = (item) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title || '',
      category: item.category || 'Coworking',
      src: item.src || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteGallery = async (id) => {
    setIsSaving(true);
    try {
      const data = await deleteGalleryItem(id);
      onContentChange?.((prev) => ({
        ...prev,
        gallery: data.gallery,
        galleryCategories: data.galleryCategories
      }));
      if (editingGalleryId === id) {
        resetGalleryForm();
      }
      setConfirmDeleteGalleryId(null);
      showNotice('success', 'Gallery item deleted.');
    } catch (err) {
      if (!handleAuthError(err)) {
        showNotice('error', err.message || 'Could not delete gallery item.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Testimonial handlers
  const filteredTestimonials = useMemo(() => {
    const query = testimonialSearch.trim().toLowerCase();
    if (!query) return testimonials;
    return testimonials.filter(
      (t) =>
        t.author?.toLowerCase().includes(query) ||
        t.role?.toLowerCase().includes(query) ||
        t.quote?.toLowerCase().includes(query)
    );
  }, [testimonials, testimonialSearch]);

  const resetTestimonialForm = () => {
    setTestimonialForm(EMPTY_TESTIMONIAL_FORM);
    setEditingTestimonialId(null);
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = editingTestimonialId
        ? await updateTestimonial(editingTestimonialId, testimonialForm)
        : await createTestimonial(testimonialForm);

      onContentChange?.((prev) => ({
        ...prev,
        testimonials: data.testimonials
      }));
      showNotice(
        'success',
        editingTestimonialId ? 'Testimonial updated.' : 'Testimonial added.'
      );
      resetTestimonialForm();
    } catch (err) {
      if (!handleAuthError(err)) {
        showNotice('error', err.message || 'Could not save testimonial.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditTestimonial = (item) => {
    setEditingTestimonialId(item.id);
    setTestimonialForm({
      author: item.author || '',
      role: item.role || '',
      quote: item.quote || '',
      rating: Number(item.rating) || 5,
      avatar: item.avatar || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTestimonial = async (id) => {
    setIsSaving(true);
    try {
      const data = await deleteTestimonial(id);
      onContentChange?.((prev) => ({
        ...prev,
        testimonials: data.testimonials
      }));
      if (editingTestimonialId === id) {
        resetTestimonialForm();
      }
      setConfirmDeleteTestimonialId(null);
      showNotice('success', 'Testimonial deleted.');
    } catch (err) {
      if (!handleAuthError(err)) {
        showNotice('error', err.message || 'Could not delete testimonial.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (authState === 'checking') {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-6">
        <p className="text-sm text-white/70 tracking-wide">Verifying admin session...</p>
      </div>
    );
  }

  if (authState !== 'authenticated') {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-center items-center p-6 font-sans">
        <div className="w-full max-w-md bg-white text-gray-900 border border-gray-200 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <img src="/logo-main.png" alt="SPACE11 VENTURES" className="h-9 object-contain" />
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#14352d] text-white px-2.5 py-1">
              Admin
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Panel Login</h1>
            <p className="text-xs text-gray-500">
              Sign in to manage SPACE11 gallery images and community testimonials.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="w-full border border-gray-300 pl-10 pr-10 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#248057] hover:bg-[#1a5b3e] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
            >
              {isLoggingIn ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#248057] font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Website
            </button>
            <span className="text-gray-400">Protected CMS</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#14352d] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo-white.png" alt="SPACE11 VENTURES" className="h-8 object-contain" />
            <span className="text-[11px] font-bold uppercase tracking-widest bg-[#248057] text-white px-2.5 py-1">
              CMS Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 border border-white/40 hover:border-white hover:bg-white/10 text-white text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              View Website
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 space-y-8">
        {/* Title & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Content Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Updates made here reflect live on the SPACE11 Gallery and Testimonials sections.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#248057] text-white border-[#248057]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#248057]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery ({gallery.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('testimonials')}
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[#248057] text-white border-[#248057]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#248057]'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              Testimonials ({testimonials.length})
            </button>
          </div>
        </div>

        {/* Toast Notice */}
        {notice && (
          <div
            className={`flex items-center justify-between gap-4 px-4 py-3 border text-xs font-semibold ${
              notice.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-emerald-50 border-emerald-200 text-[#194239]'
            }`}
          >
            <span>{notice.message}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="p-1 hover:opacity-70 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Form */}
            <form
              onSubmit={handleGallerySubmit}
              className="lg:col-span-4 bg-white border border-gray-200 p-6 space-y-5 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingGalleryId ? 'Edit Gallery Item' : 'Add Gallery Item'}
                </h2>
                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={resetGalleryForm}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Executive Podcast Suite"
                  required
                  className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Category <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="Coworking, Studios, Offices, Events..."
                  required
                  className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {availableCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setGalleryForm((prev) => ({ ...prev, category: cat }))}
                      className={`px-2.5 py-1 text-[11px] font-semibold border transition-colors cursor-pointer ${
                        galleryForm.category === cat
                          ? 'bg-[#14352d] text-white border-[#14352d]'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <ImageInputField
                label="Space Photo"
                value={galleryForm.src}
                onChange={(src) => setGalleryForm((prev) => ({ ...prev, src }))}
                required
                onNotify={showNotice}
              />

              <button
                type="submit"
                disabled={isSaving}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#248057] hover:bg-[#1a5b3e] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
              >
                {editingGalleryId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isSaving
                  ? 'Saving...'
                  : editingGalleryId
                  ? 'Update Gallery Item'
                  : 'Add to Gallery'}
              </button>
            </form>

            {/* Gallery List */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {['All', ...availableCategories].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        galleryFilter === cat
                          ? 'bg-[#248057] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative sm:w-56">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    placeholder="Search gallery..."
                    className="w-full border border-gray-300 pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#248057]"
                  />
                </div>
              </div>

              {filteredGallery.length === 0 ? (
                <div className="bg-white border border-gray-200 p-12 text-center text-sm text-gray-500">
                  No gallery items match your filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredGallery.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 overflow-hidden flex flex-col justify-between shadow-xs"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white text-[#248057] px-2.5 py-1 shadow-xs">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-4 flex items-center justify-between gap-3">
                        <h3 className="font-bold text-sm text-gray-900 truncate">{item.title}</h3>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {confirmDeleteGalleryId === item.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleDeleteGallery(item.id)}
                                disabled={isSaving}
                                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteGalleryId(null)}
                                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleEditGallery(item)}
                                className="p-2 border border-gray-200 hover:border-[#248057] text-gray-600 hover:text-[#248057] cursor-pointer"
                                aria-label={`Edit ${item.title}`}
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteGalleryId(item.id)}
                                className="p-2 border border-gray-200 hover:border-red-600 text-gray-600 hover:text-red-600 cursor-pointer"
                                aria-label={`Delete ${item.title}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Testimonial Form */}
            <form
              onSubmit={handleTestimonialSubmit}
              className="lg:col-span-4 bg-white border border-gray-200 p-6 space-y-5 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingTestimonialId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
                {editingTestimonialId && (
                  <button
                    type="button"
                    onClick={resetTestimonialForm}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Author Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={testimonialForm.author}
                  onChange={(e) =>
                    setTestimonialForm((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Role / Company <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={testimonialForm.role}
                  onChange={(e) =>
                    setTestimonialForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="e.g. Creative Director, Studio Nexus"
                  required
                  className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setTestimonialForm((prev) => ({ ...prev, rating: star }))}
                      className="p-1 cursor-pointer"
                      aria-label={`Set rating to ${star} stars`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= testimonialForm.rating
                            ? 'text-[#248057] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{testimonialForm.rating} / 5</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Quote <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={testimonialForm.quote}
                  onChange={(e) =>
                    setTestimonialForm((prev) => ({ ...prev, quote: e.target.value }))
                  }
                  placeholder="What did the client say about SPACE11?"
                  required
                  className="w-full border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#248057]"
                />
              </div>

              <ImageInputField
                label="Avatar Photo (Optional)"
                value={testimonialForm.avatar}
                onChange={(avatar) => setTestimonialForm((prev) => ({ ...prev, avatar }))}
                previewShape="circle"
                onNotify={showNotice}
              />

              <button
                type="submit"
                disabled={isSaving}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#248057] hover:bg-[#1a5b3e] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
              >
                {editingTestimonialId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isSaving
                  ? 'Saving...'
                  : editingTestimonialId
                  ? 'Update Testimonial'
                  : 'Add Testimonial'}
              </button>
            </form>

            {/* Testimonials List */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white border border-gray-200 p-4 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Showing {filteredTestimonials.length} of {testimonials.length}
                </span>
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={testimonialSearch}
                    onChange={(e) => setTestimonialSearch(e.target.value)}
                    placeholder="Search testimonials..."
                    className="w-full border border-gray-300 pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#248057]"
                  />
                </div>
              </div>

              {filteredTestimonials.length === 0 ? (
                <div className="bg-white border border-gray-200 p-12 text-center text-sm text-gray-500">
                  No testimonials match your search.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTestimonials.map((item) => {
                    const initial = (item.author || 'S').trim().charAt(0).toUpperCase();
                    const starCount = Math.min(5, Math.max(1, Number(item.rating) || 5));

                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 p-6 flex flex-col sm:flex-row justify-between gap-6 shadow-xs"
                      >
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-1 text-[#248057]">
                            {Array.from({ length: starCount }).map((_, idx) => (
                              <Star key={idx} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700 italic leading-relaxed">
                            "{item.quote}"
                          </p>
                          <div className="flex items-center gap-3 pt-2">
                            {item.avatar ? (
                              <img
                                src={item.avatar}
                                alt={item.author}
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#14352d] text-white font-bold text-xs flex items-center justify-center">
                                {initial}
                              </div>
                            )}
                            <div>
                              <h3 className="text-sm font-bold text-gray-900">{item.author}</h3>
                              <p className="text-xs text-gray-500">{item.role}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-end sm:justify-start gap-2 shrink-0">
                          {confirmDeleteTestimonialId === item.id ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleDeleteTestimonial(item.id)}
                                disabled={isSaving}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteTestimonialId(null)}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditTestimonial(item)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-[#248057] text-xs font-semibold text-gray-700 hover:text-[#248057] cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteTestimonialId(item.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-red-600 text-xs font-semibold text-gray-700 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
