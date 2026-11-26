import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { DEFAULT_TESTIMONIALS } from '../data/defaultContent';

export default function TestimonialSection({ items = DEFAULT_TESTIMONIALS }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="testimonials" className="py-24 px-6 lg:px-16 bg-slate-50 text-gray-900 text-left overflow-hidden border-t border-b border-gray-200">
      <motion.div
        className="max-w-7xl mx-auto space-y-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-sans">
            What Our Community Says
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Real stories from entrepreneurs, creators, and businesses thriving at SPACE 11.
          </p>
        </div>

        {/* Testimonials Grid */}
        {items.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center text-sm text-gray-500">
            No testimonials published yet.
          </div>
        ) : (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((t, idx) => {
              const starCount = Math.min(5, Math.max(1, Number(t.rating) || 5));
              const initial = (t.author || 'S').trim().charAt(0).toUpperCase();

              return (
                <motion.div
                  key={t.id || `${t.author}-${idx}`}
                  variants={itemVariants}
                  className="bg-white border border-gray-200 p-8 rounded-none flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#248057] transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-[#248057]">
                      {Array.from({ length: starCount }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#248057]/20 group-hover:text-[#248057] transition-colors" />
                    <p className="text-sm text-gray-700 leading-relaxed font-normal italic">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-6">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-11 h-11 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#14352d] text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {initial}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{t.author}</h4>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
