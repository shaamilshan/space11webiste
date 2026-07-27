import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BusinessFacilities({ onOpenBooking }) {
  // First card selected by default (index 0)
  const [selectedIndex, setSelectedIndex] = useState(0);

  const facilities = [
    {
      title: 'Dedicated Desk',
      description: "You'll have your own moving representative on-call, any time of day or night. No automated systems or unanswered questions.",
      iconType: 'event'
    },
    {
      title: 'Private Office',
      description: "You'll have your own moving representative on-call, any time of day or night. No automated systems or unanswered questions.",
      iconType: 'house'
    },
    {
      title: 'Virtual Office',
      description: "You'll have your own moving representative on-call, any time of day or night. No automated systems or unanswered questions.",
      iconType: 'building'
    },
    {
      title: 'Flexi Desk',
      description: "You'll have your own moving representative on-call, any time of day or night. No automated systems or unanswered questions.",
      iconType: 'building'
    },
    {
      title: 'Conference Room',
      description: "You'll have your own moving representative on-call, any time of day or night. No automated systems or unanswered questions.",
      iconType: 'building'
    },
    {
      title: 'Dedicated Desk',
      description: "You'll have your own moving representative on-call, any time of day or night. No automated systems or unanswered questions.",
      iconType: 'event'
    }
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const headerVariant = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="services" className="bg-[#248057] text-white py-24 px-6 lg:px-16 text-left overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <motion.div variants={headerVariant} className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight uppercase">
            BUSINESS FACILITIES
          </h2>
          <p className="text-sm text-white/90 max-w-xl font-normal leading-relaxed">
            Advancing Cleaning & Outsourced Staff Service through Skilled Management. Cleaning Driving And Security Service
          </p>
        </motion.div>

        {/* 6-Card Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {facilities.map((item, index) => {
            const isSelected = selectedIndex === index;

            return (
              <motion.div
                key={index}
                variants={cardVariant}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`rounded-none p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#2b885e] border border-white/40 text-white shadow-2xl scale-[1.02]'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Background ambient circular graphic */}
                <div
                  className={`absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-300 ${
                    isSelected ? 'bg-white/10 opacity-100' : 'bg-emerald-500/5 opacity-50'
                  }`}
                />

                <div className="space-y-6 relative z-10">
                  {/* SVG Icon matching reference design */}
                  <div className="w-16 h-16">
                    {item.iconType === 'event' && (
                      <svg viewBox="0 0 64 64" fill="none" className={`w-full h-full transition-colors duration-300 ${isSelected ? 'stroke-white' : 'stroke-[#248057]'}`} strokeWidth="2.5">
                        <rect x="8" y="16" width="48" height="32" rx="4" />
                        <line x1="20" y1="8" x2="16" y2="16" />
                        <line x1="44" y1="8" x2="48" y2="16" />
                        <text x="32" y="36" textAnchor="middle" fill="currentColor" stroke="none" className="text-[10px] font-black tracking-widest uppercase">EVENT</text>
                      </svg>
                    )}

                    {item.iconType === 'house' && (
                      <svg viewBox="0 0 64 64" fill="none" className={`w-full h-full transition-colors duration-300 ${isSelected ? 'stroke-white' : 'stroke-[#248057]'}`} strokeWidth="2.5">
                        <path d="M12 28L32 12L52 28V52H12V28Z" />
                        <rect x="24" y="32" width="8" height="8" />
                        <line x1="44" y1="16" x2="44" y2="22" />
                      </svg>
                    )}

                    {item.iconType === 'building' && (
                      <svg viewBox="0 0 64 64" fill="none" className={`w-full h-full transition-colors duration-300 ${isSelected ? 'stroke-white' : 'stroke-[#248057]'}`} strokeWidth="2.5">
                        <rect x="18" y="16" width="16" height="36" />
                        <rect x="34" y="24" width="14" height="28" />
                        <line x1="22" y1="22" x2="26" y2="22" />
                        <line x1="22" y1="30" x2="26" y2="30" />
                        <line x1="22" y1="38" x2="26" y2="38" />
                        <line x1="38" y1="30" x2="42" y2="30" />
                        <line x1="38" y1="38" x2="42" y2="38" />
                      </svg>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed font-normal transition-colors duration-300 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Book Now Button */}
                <div className="pt-6 relative z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking();
                    }}
                    className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-[#248057] hover:bg-gray-100 shadow-md'
                        : 'border border-[#248057] text-[#248057] hover:bg-[#248057]/5'
                    }`}
                  >
                    Book Now
                  </button>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
}
