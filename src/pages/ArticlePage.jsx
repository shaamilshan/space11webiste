import React from 'react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ReserveModal from '../components/ReserveModal';
import { blogPosts } from '../components/BlogSection';

export default function ArticlePage({ articleId, onNavigateHome, onNavigateBlog, onOpenEnquire }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const post = blogPosts.find((p) => p.id === Number(articleId)) || blogPosts[0];

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
            <button onClick={onNavigateBlog} className="hover:text-white/80 transition-colors cursor-pointer">
              Blog
            </button>
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

      {/* Article Body */}
      <main className="grow py-16 px-6 lg:px-16 bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto space-y-10 bg-white p-8 sm:p-14 border border-gray-200 shadow-sm">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#248057]">
            <button onClick={onNavigateHome} className="hover:underline cursor-pointer">Home</button>
            <span>/</span>
            <button onClick={onNavigateBlog} className="hover:underline cursor-pointer">Blog</button>
            <span>/</span>
            <span className="text-gray-400 truncate max-w-[200px] sm:max-w-none">{post.category}</span>
          </div>

          {/* Article Header */}
          <div className="space-y-4 border-b border-gray-100 pb-8">
            <span className="inline-block bg-gray-100 text-[#248057] font-bold text-xs px-3 py-1 uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 font-sans leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-xs text-gray-500 pt-2 font-medium">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="text-base text-gray-700 leading-relaxed font-normal space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer & Tags */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={onNavigateBlog}
              className="bg-[#248057] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#1c6444] transition-colors cursor-pointer"
            >
              ← Back to All Articles
            </button>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <ReserveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
