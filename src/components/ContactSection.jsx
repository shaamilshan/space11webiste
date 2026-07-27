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
    alert('Thank you for contacting SPACE11! We will get back to you shortly.');
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
                      placeholder="+91 98765 43210"
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
            <div className="w-full h-72 sm:h-80 border border-gray-200 shadow-xs overflow-hidden relative">
              <iframe
                title="SPACE11 Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.975412497619!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9000001%3A0xf0b96f540ed5b80a!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 bg-gray-50 border border-gray-200 text-left space-y-1">
                <MapPin className="w-5 h-5 text-[#248057] mb-2" />
                <h5 className="font-bold text-gray-900 text-xs uppercase">Location</h5>
                <p className="text-xs text-gray-600">SPACE11 Campus, Main Road Premises</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 text-left space-y-1">
                <Phone className="w-5 h-5 text-[#248057] mb-2" />
                <h5 className="font-bold text-gray-900 text-xs uppercase">Phone</h5>
                <p className="text-xs text-gray-600">+91 98765 43210</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 text-left space-y-1">
                <Mail className="w-5 h-5 text-[#248057] mb-2" />
                <h5 className="font-bold text-gray-900 text-xs uppercase">Email</h5>
                <p className="text-xs text-gray-600">hello@space11.com</p>
              </div>

            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
