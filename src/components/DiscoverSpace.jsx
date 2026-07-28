import React from 'react';
import { motion } from 'framer-motion';

export default function DiscoverSpace({ onOpenBooking }) {
  // Left image slide-in animation variant (from left)
  const imageVariant = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Right text column slide-in animation variant (from right with delay)
  const contentVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="w-full bg-[#111111] text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[520px]">
        
        {/* Left Column Image - Slides in first when scrolled into view */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={imageVariant}
          className="relative h-72 sm:h-96 lg:h-full min-h-[380px] w-full overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Discover modern coworking space"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Column Black Content - Slides in right after the image */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={contentVariant}
          className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center text-left space-y-6 bg-[#111111]"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
            Where Productivity Meets Flexibility - Your Ideal Work Hub
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed max-w-xl">
            Designed for ambitious creators, remote teams, and forward-thinking enterprises. Experience an environment tailored to boost focus, encourage collaboration, and scale your business effortlessly.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm px-8 py-3.5 rounded-none transition-all shadow-md active:scale-98"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
