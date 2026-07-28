import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function ReserveModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    service: 'Dedicated Desk',
    phone: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello SPACE11! New Service Booking Request:\n\n` +
      `Service: ${formData.service}\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'N/A'}`
    );
    window.open(`https://wa.me/919207700711?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-300">
      
      {/* Modal Container - Ultra-Glassmorphism aesthetic with light border & ambient glow */}
      <div className="relative w-full max-w-3xl bg-white/10 backdrop-blur-2xl text-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 grid grid-cols-1 md:grid-cols-2">
        
        {/* Ambient subtle inside highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side Image */}
        <div className="relative hidden md:block h-full min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80"
            alt="Reserve Your Space"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Right Side Glass Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between text-left space-y-6 bg-black/20 backdrop-blur-md">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Reserve Your Space
            </h2>
            <p className="text-xs text-white/70 mt-1">
              Select a service below to connect with us instantly on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* YOUR NAME */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1.5">
                YOUR NAME
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/20 border border-white/25 backdrop-blur-md text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
              />
            </div>

            {/* CHOOSE SERVICE TYPE */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1.5">
                SELECT SERVICE
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-white/20 border border-white/25 backdrop-blur-md text-white rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all cursor-pointer pr-10 [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="Dedicated Desk">Dedicated Desk</option>
                  <option value="Private Office">Private Office Suite</option>
                  <option value="Virtual Office">Virtual Office</option>
                  <option value="Flexi Desk">Flexi Desk</option>
                  <option value="Conference Room">Conference Room</option>
                  <option value="Photo & Podcast Studio">Photo & Podcast Studio</option>
                  <option value="Event & Workshop Space">Event & Workshop Space</option>
                </select>
                <ChevronDown className="w-4 h-4 text-white/70 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* PHONE & EMAIL SIDE BY SIDE */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1.5">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/20 border border-white/25 backdrop-blur-md text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@canvas.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/20 border border-white/25 backdrop-blur-md text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold py-3 rounded-lg text-sm transition-all backdrop-blur-md shadow-lg active:scale-98 mt-2"
            >
              Submit
            </button>
          </form>

          {/* Privacy Footnote */}
          <p className="text-[10px] text-white/60 text-center">
            By submitting, you agree to our{' '}
            <a href="#" className="underline hover:text-white">Privacy Policy</a> and{' '}
            <a href="#" className="underline hover:text-white">Terms of Service</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
