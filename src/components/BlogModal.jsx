import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from './BlogSection';

export default function BlogModal({ isOpen, onClose }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', 'COWORKING & COMMUNITY', 'CREATIVE & CONTENT STUDIO', 'ENTERPRISE & STRATEGY', 'WORKPLACE WELLNESS', 'STARTUP GROWTH'];

  const filteredPosts = activeCategory === 'ALL'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="bg-white text-gray-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl relative border border-gray-200 p-6 sm:p-10"
        >
          {/* Close Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#248057]">
                SPACE11 JOURNAL
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 font-sans mt-1">
                All News & Workplace Trends
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-colors text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-100 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#248057] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-gray-50 border border-gray-200 p-7 rounded-none flex flex-col justify-between hover:border-[#248057] hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#248057] uppercase tracking-wider">
                    <span>{post.category}</span>
                    <span className="text-gray-400 font-normal">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-[#248057] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-gray-900 group-hover:text-[#248057]">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Full Post Inner Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white text-gray-900 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-12 shadow-2xl relative border border-gray-200"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 text-xl font-bold p-2 cursor-pointer"
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
                className="text-sm text-gray-700 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center text-xs">
                <div className="flex gap-2">
                  {selectedPost.tags.map((t) => (
                    <span key={t} className="bg-gray-100 text-gray-600 px-2 py-1">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-[#248057] text-white px-6 py-2.5 font-bold hover:bg-[#1c6444] transition-colors cursor-pointer"
                >
                  Back to All Articles
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
