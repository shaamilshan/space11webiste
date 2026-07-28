import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const blogPosts = [
  {
    id: 1,
    category: 'COWORKING & COMMUNITY',
    title: 'Why Hybrid Workplaces Are the Future of Modern Business in 2026',
    excerpt: 'Discover how flexible workspaces boost productivity, lower overhead costs, and foster collaborative innovation for startups and established enterprises alike.',
    readTime: '5 min read',
    date: 'July 24, 2026',
    author: 'SPACE11 Editorial',
    tags: ['Coworking', 'Hybrid Work', 'Productivity'],
    content: `
      <p class="mb-4">The traditional 9-to-5 office setup has undergone a massive transformation over recent years. Businesses of all sizes are shifting toward hybrid workspace solutions that combine flexibility, premium amenities, and vibrant professional communities.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">1. Unmatched Agility and Scalability</h3>
      <p class="mb-4">Rigid multi-year commercial leases often restrict growth or burden startups with unnecessary overhead. Flexible office solutions allow companies to scale desks up or down on demand without long-term capital lockup.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">2. Fostering Organic Networking</h3>
      <p class="mb-4">When diverse talents—from tech innovators and creative directors to financial strategists—share high-end facilities, cross-industry collaboration occurs naturally. At SPACE11 VENTURES, our curated events and shared lounges act as catalyst hubs for new business partnerships.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">3. State-of-the-Art Creative Infrastructure</h3>
      <p class="mb-4">Modern teams require more than just a desk; they need dedicated podcasting booths, high-end photography studios, high-speed fiber internet, and ergonomic conference rooms. Shared luxury facilities deliver enterprise-grade infrastructure at a fraction of the cost.</p>
    `
  },
  {
    id: 2,
    category: 'CREATIVE & CONTENT STUDIO',
    title: 'How to Produce High-Converting Podcast & Video Content for Brands',
    excerpt: 'Step-by-step guide to leveraging professional acoustic environments, broadcast lighting, and modern studio setups to elevate your brand content.',
    readTime: '6 min read',
    date: 'July 18, 2026',
    author: 'Media Lab Team',
    tags: ['Podcasting', 'Video Studio', 'Branding'],
    content: `
      <p class="mb-4">In today's digital ecosystem, video and audio content are the most potent tools for building brand authority and audience trust. However, raw audio and poor lighting can instantly undermine your message.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Acoustics & Sound Proofing First</h3>
      <p class="mb-4">Echo and background hum ruin listener engagement. Utilizing acoustically isolated soundproof rooms with studio-grade XLR microphones ensures crisp, broadcast-quality audio from frame one.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Multi-Camera Production Angles</h3>
      <p class="mb-4">Dynamic camera switching retains viewers 3x longer than static single-angle recordings. Our fully equipped Podcast & Content Studio at SPACE11 features multi-angle 4K setups and pre-configured lighting setups ready for immediate recording.</p>
    `
  },
  {
    id: 3,
    category: 'ENTERPRISE & STRATEGY',
    title: 'Designing High-Impact Executive Meetings & Workshops',
    excerpt: 'Key strategies for hosting board meetings, investor pitches, and team retreats that leave a lasting impression and drive actionable decisions.',
    readTime: '4 min read',
    date: 'July 10, 2026',
    author: 'Events & Strategy Desk',
    tags: ['Events', 'Conference', 'Leadership'],
    content: `
      <p class="mb-4">The environment in which key business decisions are made directly impacts focus, creativity, and outcome. Holding executive sessions in mundane rooms drains energy, while curated architectural spaces inspire visionary thinking.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Seamless Audio-Visual Integration</h3>
      <p class="mb-4">Nothing derails a high-stakes investor pitch faster than technical connectivity friction. Modern conference facilities must provide plug-and-play wireless screen sharing and crystal-clear hybrid video conferencing for remote stakeholders.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Hospitality & Concierge Excellence</h3>
      <p class="mb-4">From gourmet refreshment services to dedicated event coordinators on stand-by, premium hospitality allows leaders to stay entirely focused on strategic goals during corporate offsites.</p>
    `
  },
  {
    id: 4,
    category: 'WORKPLACE WELLNESS',
    title: 'Maximizing Focus & Ergonomics in Shared Workspaces',
    excerpt: 'Simple wellness routines and workspace configurations that keep remote workers energized and focused all day.',
    readTime: '5 min read',
    date: 'June 28, 2026',
    author: 'Wellness Desk',
    tags: ['Ergonomics', 'Focus', 'Workplace'],
    content: `
      <p class="mb-4">Physical environment directly influences mental clarity. Incorporating natural light, greenery, and ergonomic seating into daily routines prevents fatigue and maintains high energy levels.</p>

      <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">Biophilic Design Benefits</h3>
      <p class="mb-4">Surrounding your workspace with plants and open views reduces stress levels while boosting cognitive clarity and problem-solving speed.</p>
    `
  },
  {
    id: 5,
    category: 'STARTUP GROWTH',
    title: 'Bootstrapping a Venture: Capital Efficient Studio & Office Options',
    excerpt: 'How emerging agencies and creators can access top-tier equipment without capital lockups.',
    readTime: '7 min read',
    date: 'June 15, 2026',
    author: 'Venture Lab',
    tags: ['Startups', 'Bootstrap', 'Strategy'],
    content: `
      <p class="mb-4">Shared membership structures allow early-stage teams to leverage professional podcasting suites, conference halls, and premium meeting rooms on demand.</p>
    `
  }
];

export default function BlogSection({ onOpenAllBlogs, onSelectArticle }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="blog" className="py-24 px-6 lg:px-16 bg-white text-gray-900 text-left overflow-hidden border-t border-gray-100 font-sans">
      <motion.div
        className="max-w-7xl mx-auto space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        {/* Header matching main section font styles */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-sans">
              Latest News & Workplace Trends
            </h2>
            <p className="text-sm text-gray-600 font-normal max-w-xl">
              Expert insights on hybrid workspaces, content creation studios, and business growth strategies from SPACE 11 VENTURES.
            </p>
          </div>

          <button
            onClick={onOpenAllBlogs}
            className="border border-gray-900 hover:bg-[#248057] hover:border-[#248057] hover:text-white text-gray-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap self-start md:self-end"
          >
            View All Articles →
          </button>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-gray-50 border border-gray-200 p-8 rounded-none flex flex-col justify-between hover:border-[#248057] hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
              onClick={() => onSelectArticle ? onSelectArticle(post.id) : setSelectedPost(post)}
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

              <div className="pt-6 mt-6 border-t border-gray-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-gray-900 group-hover:text-[#248057]">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>

      {/* Single Article Modal */}
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
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
