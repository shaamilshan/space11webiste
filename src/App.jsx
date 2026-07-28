import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
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
import BlogSection from './components/BlogSection';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ReserveModal from './components/ReserveModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  // Modal opens after preloader finishes
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEnquireWhatsApp = () => {
    const text = encodeURIComponent(`Hello SPACE11! I would like to inquire about your workspace services.`);
    window.open(`https://wa.me/919207700711?text=${text}`, '_blank');
  };

  const handleBookNowWhatsApp = (itemName = "Desk / Space") => {
    const text = encodeURIComponent(`Hello SPACE11! I want to book a reservation for: ${itemName}. Please share availability and pricing.`);
    window.open(`https://wa.me/919207700711?text=${text}`, '_blank');
  };

  const navigateToBlog = () => {
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (articleId) => {
    setSelectedArticleId(articleId);
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'article') {
    return (
      <ArticlePage
        articleId={selectedArticleId}
        onNavigateHome={navigateToHome}
        onNavigateBlog={navigateToBlog}
        onOpenEnquire={handleOpenModal}
      />
    );
  }

  if (currentPage === 'blog') {
    return (
      <BlogPage
        onNavigateHome={navigateToHome}
        onSelectArticle={navigateToArticle}
        onOpenEnquire={handleOpenModal}
      />
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white font-sans antialiased text-[#194239]">
        <Navbar onOpenEnquire={handleEnquireWhatsApp} onOpenBlog={navigateToBlog} />
        <main>
          <Hero onOpenEnquire={handleEnquireWhatsApp} onBookVisit={() => handleBookNowWhatsApp("Site Visit Tour")} />
          <WhyChooseUs />
          <BusinessFacilities onOpenBooking={(facilityName) => handleBookNowWhatsApp(facilityName)} />
          <DiscoverSpace onOpenBooking={() => handleBookNowWhatsApp("Workspace Consultation")} />
          <GallerySection />
          <AmenitiesOffer />
          <TestimonialSection />
          <BlogSection onOpenAllBlogs={navigateToBlog} onSelectArticle={navigateToArticle} />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer onOpenBlog={navigateToBlog} />
        <WhatsAppButton />
        <ReserveModal isOpen={isModalOpen} onClose={handleCloseModal} onBookWhatsApp={handleBookNowWhatsApp} />
      </div>
    </>
  );
}


