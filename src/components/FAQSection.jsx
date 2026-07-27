import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '1. What is SPACE 11?',
      a: 'SPACE 11 is a creative business hub offering coworking spaces, private offices, indoor and outdoor photography studios, meeting spaces, and flexible workspace rentals.'
    },
    {
      q: '2. Who can use SPACE 11?',
      a: 'Our spaces are perfect for freelancers, startups, entrepreneurs, photographers, content creators, production teams, agencies, remote workers, and businesses of all sizes.'
    },
    {
      q: '3. Can I book the space for just a few hours?',
      a: 'Yes. We offer flexible hourly, daily, weekly, and monthly bookings.'
    },
    {
      q: '4. Can I schedule a tour before booking?',
      a: 'Yes. We welcome visitors to schedule a tour and explore our facilities before making a reservation.'
    },
    {
      q: '5. Are food and beverages available?',
      a: 'Complimentary tea or coffee are available, and nearby dining options are easily accessible.'
    },
    {
      q: '6. Is parking available?',
      a: 'Yes. We provide ample on-site parking for members and visitors.'
    },
    {
      q: '7. Can I host meetings or workshops?',
      a: 'Yes. Our meeting rooms and event spaces are ideal for business meetings, training sessions, workshops, and small events.'
    },
    {
      q: '8. How can I make a booking?',
      a: 'You can book online through our website or contact our team directly by phone, WhatsApp, or email.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 px-6 lg:px-16 bg-white text-gray-900 text-left overflow-hidden">
      <motion.div 
        className="max-w-5xl mx-auto space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 font-normal">
            Everything you need to know about SPACE 11 services and bookings.
          </p>
        </motion.div>

        {/* Accordion List */}
        <motion.div variants={containerVariants} className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-none transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#248057] text-white border-[#248057] shadow-lg'
                    : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg transition-colors cursor-pointer"
                >
                  <span className={isOpen ? 'text-white' : 'text-gray-900'}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-white/90 leading-relaxed border-t border-white/20 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
}
