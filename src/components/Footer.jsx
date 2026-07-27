import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white/70 border-t border-white/10 py-16 px-6 lg:px-16 text-left font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Logo & Intro Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="inline-block">
              <img src="/logo-white.png" alt="SPACE11 VENTURES" className="h-9 object-contain" />
            </a>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-normal">
              A creative destination where businesses, entrepreneurs, creators, and teams can work, collaborate, and produce exceptional results.
            </p>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><a href="#" className="hover:text-[#248057] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#248057] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#248057] transition-colors">Business Facilities</a></li>
              <li><a href="#gallery" className="hover:text-[#248057] transition-colors">Space Gallery</a></li>
              <li><a href="#contact" className="hover:text-[#248057] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 2: Spaces */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Spaces & Studios</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li><a href="#" className="hover:text-[#248057] transition-colors">Flexi Desks</a></li>
              <li><a href="#" className="hover:text-[#248057] transition-colors">Dedicated Desks</a></li>
              <li><a href="#" className="hover:text-[#248057] transition-colors">Private Offices</a></li>
              <li><a href="#" className="hover:text-[#248057] transition-colors">Photo & Podcast Studio</a></li>
              <li><a href="#" className="hover:text-[#248057] transition-colors">Event & Conference Hall</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-2 text-xs font-normal text-white/70">
              <p>SPACE11 Campus, Main Road Premises</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: hello@space11ventures.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} SPACE11 VENTURES. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
