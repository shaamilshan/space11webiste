import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenEnquire, onOpenBlog }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-7xl">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-transparent md:bg-white/10 md:backdrop-blur-md border border-transparent md:border-white/20 rounded-none px-5 sm:px-6 py-3.5 flex items-center justify-between text-white md:shadow-xl relative"
      >
        
        {/* Brand Logo - SPACE11 VENTURES */}
        <a href="#home" onClick={closeMenu} className="flex items-center">
          <img src="/logo-white.png" alt="SPACE11 VENTURES" className="h-7 sm:h-8 object-contain hover:scale-105 transition-transform" />
        </a>

        {/* Center Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#home" className="hover:text-white/80 transition-colors">Home</a>
          <a href="#services" className="hover:text-white/80 transition-colors">Services</a>
          <a href="#about" className="hover:text-white/80 transition-colors">About US</a>
          <a href="#gallery" className="hover:text-white/80 transition-colors">Gallery</a>
          <button onClick={onOpenBlog} className="hover:text-white/80 transition-colors cursor-pointer">Blog</button>
          <a href="#testimonials" className="hover:text-white/80 transition-colors">Testimonials</a>
          <a href="#contact" className="hover:text-white/80 transition-colors">Contact</a>
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center space-x-3">
          {/* CTA Button: Hidden on Mobile, Shown on Desktop */}
          <button 
            onClick={onOpenEnquire}
            className="hidden md:block border border-white/60 hover:border-white text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-none transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
          >
            Enquire Now
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </motion.div>

      {/* Mobile Menu Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2 bg-[#14352d] border border-[#1f4a3f] text-white shadow-2xl p-6 flex flex-col space-y-4 font-medium text-sm text-left"
          >
            <a
              href="#home"
              onClick={closeMenu}
              className="py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={closeMenu}
              className="py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors"
            >
              About US
            </a>
            <a
              href="#gallery"
              onClick={closeMenu}
              className="py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors"
            >
              Gallery
            </a>
            <button
              onClick={() => {
                closeMenu();
                if (onOpenBlog) onOpenBlog();
              }}
              className="text-left py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors cursor-pointer"
            >
              Blog
            </button>
            <a
              href="#testimonials"
              onClick={closeMenu}
              className="py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="py-2 border-b border-white/10 hover:text-[#c29b38] transition-colors"
            >
              Contact
            </a>

            {/* Enquire Button inside Mobile Dropdown Menu */}
            <div className="pt-2">
              <button
                onClick={() => {
                  closeMenu();
                  if (onOpenEnquire) onOpenEnquire();
                }}
                className="w-full bg-[#248057] hover:bg-[#1a5b3e] text-white font-bold py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
