import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ReserveModal from '../components/ReserveModal';
import { blogPosts } from '../components/BlogSection';

export default function BlogPage({ onNavigateHome, onSelectArticle, onOpenEnquire }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    'ALL',
    'COWORKING & COMMUNITY',
    'CREATIVE & CONTENT STUDIO',
    'ENTERPRISE & STRATEGY',
    'WORKPLACE WELLNESS',
    'STARTUP GROWTH'
  ];

  const filteredPosts = activeCategory === 'ALL'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-[#194239] flex flex-col justify-between">
      {/* Header */}
      <header className="bg-[#14352d] text-white py-4 px-6 lg:px-16 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={onNavigateHome} className="flex items-center cursor-pointer">
            <img src="/logo-white.png" alt="SPACE11 VENTURES" className="h-8 object-contain" />
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button onClick={onNavigateHome} className="hover:text-white/80 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={onNavigateHome} className="hover:text-white/80 transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={onNavigateHome} className="hover:text-white/80 transition-colors cursor-pointer">
              About Us
            </button>
            <span className="text-[#c29b38] font-bold border-b-2 border-[#c29b38] pb-0.5">Blog Page</span>
            <button onClick={onNavigateHome} className="hover:text-white/80 transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-white/60 hover:border-white text-white font-medium text-sm px-5 py-2 rounded-none transition-all hover:bg-white/10 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="grow py-16 px-6 lg:px-16 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Breadcrumb & Title */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#248057]">
              <button onClick={onNavigateHome} className="hover:underline cursor-pointer">Home</button>
              <span>/</span>
              <span>Blog & Articles</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 font-sans">
              Latest News & Workplace Trends
            </h1>
            <p className="text-sm text-gray-600 font-normal max-w-2xl">
              Explore strategic insights, workplace innovation, and creative studio tips from SPACE 11 VENTURES.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 border-b border-gray-200 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2.5 uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#248057] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectArticle ? onSelectArticle(post.id) : setSelectedPost(post)}
                className="bg-white border border-gray-200 p-8 rounded-none flex flex-col justify-between hover:border-[#248057] hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#248057] uppercase tracking-wider">
                    <span>{post.category}</span>
                    <span className="text-gray-400 font-normal">{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-[#248057] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-900 group-hover:text-[#248057]">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      {/* Article Detail View */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-gray-900 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-12 shadow-2xl relative border border-gray-200"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 text-xl font-bold p-2 cursor-pointer"
                aria-label="Close article"
              >
                ✕
              </button>

              <div className="space-y-3 mb-8 pr-8">
                <span className="text-xs font-semibold text-[#248057] uppercase tracking-wider">
                  {selectedPost.category} • {selectedPost.date}
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 font-sans">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center space-x-3 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div
                className="text-sm text-gray-700 leading-relaxed font-normal space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-xs">
                <div className="flex gap-2">
                  {selectedPost.tags.map((t) => (
                    <span key={t} className="bg-gray-100 text-gray-600 px-2 py-1 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-[#248057] text-white px-6 py-2.5 font-bold hover:bg-[#1c6444] transition-colors cursor-pointer"
                >
                  Back to Articles
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
      <ReserveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
