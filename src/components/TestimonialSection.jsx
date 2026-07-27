import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "SPACE11 completely transformed how our agency operates. The photography studio and private office setup under one roof saved us countess hours.",
      author: "Alex Morgan",
      role: "Creative Director, Studio Nexus",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The green surroundings and peaceful workspace vibe helped our tech startup focus and grow. Plus, the community networking is top-tier.",
      author: "Priya Sharma",
      role: "Founder & CEO, GreenScale",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Super flexible rental options and incredibly helpful staff. Having power backup and high-speed Wi-Fi 24/7 gives us total peace of mind.",
      author: "David Chen",
      role: "Senior Consultant, Apex Ventures",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  ];

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
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white border border-gray-200 p-8 rounded-none flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#248057] transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#248057]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#248057]/20 group-hover:text-[#248057] transition-colors" />
                <p className="text-sm text-gray-700 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-6">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{t.author}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
