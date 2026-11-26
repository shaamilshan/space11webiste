import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_GALLERY_CATEGORIES, DEFAULT_GALLERY_ITEMS } from '../data/defaultContent';

export default function GallerySection({
  items = DEFAULT_GALLERY_ITEMS,
  categories: configuredCategories = DEFAULT_GALLERY_CATEGORIES
}) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = useMemo(() => {
    const unique = new Set(configuredCategories);
    items.forEach((item) => {
      if (item.category) unique.add(item.category);
    });
    return ['All', ...unique];
  }, [configuredCategories, items]);

  const selectedTab = categories.includes(activeTab) ? activeTab : 'All';

  const filteredImages =
    selectedTab === 'All'
      ? items
      : items.filter((img) => img.category === selectedTab);

  return (
    <section id="gallery" className="py-24 px-6 lg:px-16 bg-[#111111] text-white text-left overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
              Explore Our Spaces
            </h2>
            <p className="text-sm text-white/70 font-normal">
              Take a visual tour through our eco-friendly workspaces, photo studios, and private offices.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  selectedTab === cat
                    ? 'bg-[#248057] text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center text-sm text-white/60">
            No gallery images found in this category yet.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={img.id || `${img.title}-${idx}`}
                className="relative h-72 rounded-none overflow-hidden group border border-white/10 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-bold tracking-widest text-[#248057] uppercase bg-white px-2.5 py-1 w-max mb-2">
                    {img.category}
                  </span>
                  <h4 className="font-bold text-white text-lg">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
