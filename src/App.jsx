import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import BusinessFacilities from './components/BusinessFacilities';
import DiscoverSpace from './components/DiscoverSpace';
import GallerySection from './components/GallerySection';
import AmenitiesOffer from './components/AmenitiesOffer';
import FAQSection from './components/FAQSection';
import TestimonialSection from './components/TestimonialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ReserveModal from './components/ReserveModal';

export default function App() {
  // Modal opens by default on site launch
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-[#194239]">
      <Navbar onOpenEnquire={handleOpenModal} />
      <main>
        <Hero onOpenEnquire={handleOpenModal} />
        <WhyChooseUs />
        <BusinessFacilities onOpenBooking={handleOpenModal} />
        <DiscoverSpace onOpenBooking={handleOpenModal} />
        <GallerySection />
        <AmenitiesOffer />
        <TestimonialSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ReserveModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
