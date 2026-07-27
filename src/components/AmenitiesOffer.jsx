import React from 'react';
import { motion } from 'framer-motion';

export default function AmenitiesOffer() {
  const amenitiesList = [
    'Air-conditioned workspaces',
    'Coworking desks',
    'Private office spaces',
    'Virtual Office',
    'High-speed Wi-Fi',
    'Conference Hall',
    'Fully equipped indoor photo studio',
    'Party Hall',
    'Comfortable lounge and waiting areas',
    'Power backup',
    'Pantry with tea and coffee facilities',
    'Event-friendly spaces for workshops, meetings, and creative sessions',
    'Clean restrooms',
    'Flexible hourly, daily, weekly, and monthly rental plans',
    'Scenic outdoor photography locations',
    'Eco-friendly green surroundings',
    'Reception and visitor assistance',
    'Ample parking',
    'Security'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 px-6 lg:px-16 bg-[#248057] text-white text-left overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            What's Included & What We Offer
          </h2>
          <p className="text-sm sm:text-base text-white/90 font-normal">
            Everything you need for productivity, creativity, and seamless operations under one roof.
          </p>
        </motion.div>

        {/* Interactive Amenities Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {amenitiesList.map((amenity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              className="bg-white/10 border border-white/20 p-4 rounded-none flex items-start gap-3 backdrop-blur-xs transition-all duration-200"
            >
              <svg className="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-white leading-tight">
                {amenity}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Package Note Disclaimer */}
        <motion.div variants={itemVariants} className="pt-4 border-t border-white/20">
          <p className="text-xs italic text-white/70">
            * The facilities available to you will depend on the type of space or rental package you choose.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
