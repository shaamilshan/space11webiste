import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ onOpenEnquire }) {
  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-7xl">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-none px-6 py-3.5 flex items-center justify-between text-white shadow-xl"
      >
        
        {/* Brand Logo - SPACE11 VENTURES */}
        <a href="#home" className="flex items-center">
          <img src="/logo-white.png" alt="SPACE11 VENTURES" className="h-8 object-contain hover:scale-105 transition-transform" />
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#home" className="hover:text-white/80 transition-colors">Home</a>
          <a href="#services" className="hover:text-white/80 transition-colors">Services</a>
          <a href="#about" className="hover:text-white/80 transition-colors">About US</a>
          <a href="#gallery" className="hover:text-white/80 transition-colors">Gallery</a>
          <a href="#testimonials" className="hover:text-white/80 transition-colors">Testimonials</a>
          <a href="#contact" className="hover:text-white/80 transition-colors">Contact</a>
        </nav>

        {/* Right CTA Button */}
        <div>
          <button 
            onClick={onOpenEnquire}
            className="border border-white/60 hover:border-white text-white font-medium text-sm px-5 py-2 rounded-none transition-all hover:bg-white/10 backdrop-blur-sm active:scale-95 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>

      </motion.div>
    </header>
  );
}
