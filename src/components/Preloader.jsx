import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1.8s sequence before curtain split
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 700); // sync with curtain exit duration
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center font-sans overflow-hidden">
      {/* Top Half Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isDone ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#14352d] z-10"
      />

      {/* Bottom Half Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isDone ? "100%" : "0%" }}
        transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#14352d] z-10"
      />

      {/* Center Content Stage */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isDone ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex flex-col items-center justify-center p-8"
      >
        {/* Wireframe Architectural Box Frame around Logo */}
        <div className="relative p-8 md:p-12">
          {/* Animated SVG Border */}
          <svg className="absolute inset-0 w-full h-full" overflow="visible">
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="#c29b38"
              strokeWidth="1.5"
              strokeDasharray="400"
              initial={{ strokeDashoffset: 400 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>

          {/* Golden Corner Accents */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#c29b38]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#c29b38]" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#c29b38]" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#c29b38]" />

          {/* Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <img
              src="/logo-white.png"
              alt="SPACE11 VENTURES"
              className="h-10 md:h-12 object-contain"
            />
          </motion.div>
        </div>

        {/* Minimalist Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 text-[10px] md:text-xs font-light tracking-[0.35em] text-[#e0cf9b] uppercase"
        >
          Workspaces & Facilities
        </motion.p>
      </motion.div>
    </div>
  );
}
