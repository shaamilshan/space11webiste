import React from 'react';
import { motion } from 'framer-motion';
import { 
  TreePine, Layers, CalendarCheck, ShieldCheck, 
  Camera, Briefcase, Users, Navigation 
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: TreePine,
      title: 'Inspiring Green Surroundings',
      desc: 'Escape the typical office environment and work in a peaceful setting surrounded by nature. Our eco-friendly landscape creates a refreshing atmosphere that boosts creativity, focus, and well-being.'
    },
    {
      icon: Layers,
      title: 'Multiple Spaces, One Destination',
      desc: 'Whether you need a coworking desk, a private office, or a professional indoor or outdoor photography studio, SPACE 11 offers everything under one roof.'
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Rental Options',
      desc: 'Book by the hour, day, week, or month. We provide flexible solutions for freelancers, startups, agencies, production teams, and established businesses.'
    },
    {
      icon: ShieldCheck,
      title: 'Modern Facilities',
      desc: 'Enjoy high-speed internet, comfortable workspaces, meeting areas, ample parking, power backup, and professional amenities designed to keep your work uninterrupted.'
    },
    {
      icon: Camera,
      title: 'Perfect for Creators',
      desc: 'Our indoor and outdoor studio spaces are ideal for photoshoots, video production, product photography, fashion campaigns, social media content, Podcasts, and creative projects.'
    },
    {
      icon: Briefcase,
      title: 'Professional Business Environment',
      desc: 'Host meetings, welcome clients, and grow your business from a premium address designed to make a lasting impression.'
    },
    {
      icon: Users,
      title: 'Community & Collaboration',
      desc: 'Connect with entrepreneurs, designers, photographers, creators, and professionals who share ideas, opportunities, and inspiration.'
    },
    {
      icon: Navigation,
      title: 'Easy Access',
      desc: 'Convenient location with spacious premises, easy parking, and a peaceful atmosphere away from crowded commercial areas.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="about" className="bg-white text-gray-900 py-24 px-6 lg:px-16 text-left overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        
        {/* Top Split Section: Logo & Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column Logo */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
            <div className="pt-2">
              <img
                src="/logo-main.png"
                alt="SPACE11 VENTURES"
                className="h-16 sm:h-20 object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column Story Paragraphs */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
              A Space Built For Work, Creativity, And Everything In Between
            </h3>
            <p>
              At SPACE 11, we believe great ideas deserve an inspiring environment. We've created more than just a workspace - we've built a creative destination where businesses, entrepreneurs, creators, and teams can work, collaborate, and produce exceptional results.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              We focus on giving you a clean, eco-friendly environment that feels calm, modern, and easy to work in - without the high costs of traditional offices.
            </p>
          </motion.div>

        </div>

        {/* Section Divider Badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-block border border-gray-900 text-gray-900 font-bold text-sm tracking-wider uppercase px-6 py-2">
            SPACE11 HIGHLIGHTS
          </span>
        </motion.div>

        {/* 8 Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 border border-gray-200 p-8 rounded-none flex flex-col justify-between hover:border-[#248057] hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#248057]/10 text-[#248057] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
}
