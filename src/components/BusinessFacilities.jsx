import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Building2, Globe, Mic, Users2, Armchair } from 'lucide-react';

export default function BusinessFacilities({ onOpenBooking }) {
  // First card selected by default (index 0)
  const [selectedIndex, setSelectedIndex] = useState(0);

  const facilities = [
    {
      title: 'Dedicated Desk',
      description: "You'll have your own personal dedicated desk in a quiet, productive environment with high-speed wifi & 24/7 access.",
      icon: Armchair
    },
    {
      title: 'Private Office',
      description: "Lockable, fully-furnished private office suites designed for teams seeking privacy, security, and brand identity.",
      icon: Building2
    },
    {
      title: 'Virtual Office',
      description: "Professional business address, mail handling, and official registration services without physical desk commitment.",
      icon: Globe
    },
    {
      title: 'Flexi Desk',
      description: "Flexible hot-desk options giving you the freedom to choose any open workspace daily in our creative hub.",
      icon: Laptop
    },
    {
      title: 'Conference Room',
      description: "High-tech meeting rooms equipped with wireless screen sharing, 4K displays, and acoustic soundproofing.",
      icon: Users2
    },
    {
      title: 'Photo & Podcast Studio',
      description: "Fully equipped soundproof acoustic studio with broadcast lighting, XLR mics, and multi-camera support for creators.",
      icon: Mic
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
            Premium co-working infrastructure, private suites, soundproof studios, and flexible rentals tailored for modern enterprises and creators.
          </p>
        </motion.div>

        {/* 6-Card Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {facilities.map((item, index) => {
            const isSelected = selectedIndex === index;
            const Icon = item.icon;

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
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-[#248057]/10 text-[#248057]'
                  }`}>
                    <Icon className="w-7 h-7 stroke-[1.8]" />
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
                      onOpenBooking(item.title);
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
