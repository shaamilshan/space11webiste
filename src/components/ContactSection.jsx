import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello SPACE11! New Contact Form Message:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Message: ${formData.message || 'No additional message'}`
    );
    window.open(`https://wa.me/919207700711?text=${text}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-16 bg-white text-gray-900 text-left overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        
        {/* Header */}
        <motion.div variants={fadeUp} className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-sans">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            Have questions or want to schedule a site tour? We're here to help you find your perfect workspace.
          </p>
        </motion.div>

        {/* 2-Column Split: Contact Form + Embedded Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Form Column */}
          <motion.div variants={fadeUp} className="lg:col-span-6 bg-gray-50 border border-gray-200 p-8 sm:p-10 rounded-none shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-gray-900">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#248057]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#248057]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9207 700 711"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#248057]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your space requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-none p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#248057]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#248057] hover:bg-[#1f6e4a] text-white font-bold py-3.5 rounded-none text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Embed & Quick Contact Info */}
          <motion.div variants={fadeUp} className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Interactive Embedded Google Map */}
            <div className="w-full h-72 sm:h-80 border border-gray-200 shadow-xs overflow-hidden relative group">
              <iframe
                title="SPACE11 Location Map"
                src="https://maps.google.com/maps?cid=3145987843263983639&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
              <a
                href="https://www.google.com/maps?cid=3145987843263983639"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-[#248057] text-white px-3 py-1.5 text-xs font-bold shadow-md hover:bg-[#1a5b3e] transition-all flex items-center gap-1.5 z-10"
              >
                Open Pin on Google Maps ↗
              </a>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <a
                href="https://www.google.com/maps?cid=3145987843263983639"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 border border-gray-200 text-left space-y-1 hover:border-[#248057] hover:bg-white transition-all group"
              >
                <MapPin className="w-5 h-5 text-[#248057] mb-2 group-hover:scale-110 transition-transform" />
                <h5 className="font-bold text-gray-900 text-xs uppercase">Location ↗</h5>
                <p className="text-xs text-gray-600">Koodathai, Near Edu Park</p>
              </a>

              <div className="p-4 bg-gray-50 border border-gray-200 text-left space-y-1">
                <Phone className="w-5 h-5 text-[#248057] mb-2" />
                <h5 className="font-bold text-gray-900 text-xs uppercase">Phone</h5>
                <p className="text-xs text-gray-600">+91 9207 700 711</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 text-left space-y-1">
                <Mail className="w-5 h-5 text-[#248057] mb-2" />
                <h5 className="font-bold text-gray-900 text-xs uppercase">Email</h5>
                <p className="text-xs text-gray-600">space11ventures@gmail.com</p>
              </div>

            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
