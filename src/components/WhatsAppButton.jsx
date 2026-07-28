import React from 'react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919207700711?text=Hello%20SPACE11!%20I%20would%20like%20to%20inquire%20about%20your%20workspace%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <img src="/whatsapp.png" alt="WhatsApp" className="w-7 h-7 object-contain brightness-0 invert" />
      {/* Tooltip on hover */}
      <span className="absolute right-16 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
        Chat with Us
      </span>
    </a>
  );
}
