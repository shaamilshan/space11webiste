import React, { useState, useEffect } from 'react';

export default function Hero({ onOpenEnquire, onBookVisit }) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Typewriter effect state
  const phrases = [
    'Work. Create. Celebrate.',
    'Innovate & Elevate.',
    'Build Your Future.'
  ];
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=2000&q=80'
  ];

  // Typewriter effect logic
  useEffect(() => {
    const currentPhrase = phrases[textIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, typingSpeed]);

  return (
    <section 
      id="home"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6 lg:px-16 text-white overflow-hidden transition-all duration-700" 
      style={{ backgroundImage: `url('${backgroundImages[activeSlide]}')` }}
    >
      {/* Dark Dim Overlay */}
      <div className="absolute inset-0 bg-black/65 z-0" />

      {/* Main Center Content */}
      <div className="relative z-10 max-w-4xl text-center space-y-6 mt-12">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight min-h-[140px] sm:min-h-[160px] flex flex-col justify-center items-center">
          <span>{displayText}<span className="inline-block w-1.5 h-10 sm:h-14 bg-white ml-2 animate-pulse align-middle" /></span>
          <span className="block text-[#FFffff] text-3xl sm:text-5xl mt-2 font-normal">All in One Space.</span>
        </h1>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
          Eco-friendly co-working & creative studio for freelancers, startups & events
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {/* Book a Visit Outline Button */}
          <button 
            onClick={onBookVisit}
            className="border-2 border-white/90 hover:border-white text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-none transition-all hover:bg-white/10 backdrop-blur-xs cursor-pointer"
          >
            Book a Visit
          </button>

          {/* Enquire Now Glass Button */}
          <button 
            onClick={onOpenEnquire}
            className="bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-none transition-all backdrop-blur-md shadow-lg cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Left Social Icons Bar */}
      <div className="absolute bottom-10 left-10 z-10 flex items-center space-x-3 text-white/80">
        {/* WhatsApp */}
        <a 
          href="https://wa.me/919207700711?text=Hello%20SPACE11!%20I%20would%20like%20to%20inquire%20about%20your%20workspace%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all overflow-hidden p-2"
        >
          <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain brightness-0 invert" />
        </a>

        {/* Instagram */}
        <a 
          href="https://instagram.com/space11ventures" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* Facebook */}
        <a href="#" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.808V8z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
          </svg>
        </a>
      </div>

      {/* Right Carousel Lines Indicator */}
      <div className="absolute bottom-10 right-10 z-10 flex items-center space-x-2">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-1 transition-all rounded-full ${
              activeSlide === idx ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
