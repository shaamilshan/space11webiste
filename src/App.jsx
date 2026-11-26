import React, { useEffect, useState } from 'react';
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
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ReserveModal from './components/ReserveModal';
import { fetchSiteContent } from './services/contentApi';
import {
  DEFAULT_GALLERY_CATEGORIES,
  DEFAULT_GALLERY_ITEMS,
  DEFAULT_TESTIMONIALS
} from './data/defaultContent';

function isAdminLocation() {
  if (typeof window === 'undefined') return false;
  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  return normalizedPath === '/admin' || window.location.hash === '#admin';
}

export default function App() {
  const initialAdmin = isAdminLocation();
  const [isLoading, setIsLoading] = useState(!initialAdmin);
  const [currentPage, setCurrentPage] = useState(initialAdmin ? 'admin' : 'home');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  // Modal opens after preloader finishes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteContent, setSiteContent] = useState({
    gallery: DEFAULT_GALLERY_ITEMS,
    galleryCategories: DEFAULT_GALLERY_CATEGORIES,
    testimonials: DEFAULT_TESTIMONIALS
  });

  useEffect(() => {
    let active = true;
    fetchSiteContent()
      .then((data) => {
        if (!active) return;
        setSiteContent({
          gallery: Array.isArray(data.gallery) ? data.gallery : DEFAULT_GALLERY_ITEMS,
          galleryCategories: Array.isArray(data.galleryCategories)
            ? data.galleryCategories
            : DEFAULT_GALLERY_CATEGORIES,
          testimonials: Array.isArray(data.testimonials)
            ? data.testimonials
            : DEFAULT_TESTIMONIALS
        });
      })
      .catch(() => {
        // Fallback to bundled defaults when backend API is unavailable
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const syncRoute = () => {
      if (isAdminLocation()) {
        setIsLoading(false);
        setIsModalOpen(false);
        setCurrentPage('admin');
      } else {
        setCurrentPage((prev) => (prev === 'admin' ? 'home' : prev));
      }
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDirectCall = () => {
    window.location.href = 'tel:+919207700711';
  };

  const handleBookNowWhatsApp = (itemName = 'Desk / Space') => {
    const text = encodeURIComponent(
      `Hello SPACE11! I want to book a reservation for: ${itemName}. Please share availability and pricing.`
    );
    window.open(`https://wa.me/919207700711?text=${text}`, '_blank');
  };

  const navigateToBlog = () => {
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    if (isAdminLocation()) {
      window.history.pushState({}, '', '/');
    }
    setCurrentPage('home');
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    if (!isAdminLocation()) {
      window.history.pushState({}, '', '/admin');
    }
    setIsLoading(false);
    setIsModalOpen(false);
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (articleId) => {
    setSelectedArticleId(articleId);
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'admin') {
    return (
      <AdminPage
        siteContent={siteContent}
        onContentChange={setSiteContent}
        onNavigateHome={navigateToHome}
      />
    );
  }

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
        <Navbar onOpenEnquire={handleDirectCall} onOpenBlog={navigateToBlog} />
        <main>
          <Hero onOpenEnquire={handleDirectCall} onBookVisit={handleOpenModal} />
          <WhyChooseUs />
          <BusinessFacilities onOpenBooking={(facilityName) => handleBookNowWhatsApp(facilityName)} />
          <DiscoverSpace onOpenBooking={handleOpenModal} />
          <GallerySection
            items={siteContent.gallery}
            categories={siteContent.galleryCategories}
          />
          <AmenitiesOffer />
          <TestimonialSection items={siteContent.testimonials} />
          <BlogSection onOpenAllBlogs={navigateToBlog} onSelectArticle={navigateToArticle} />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer onOpenAdmin={navigateToAdmin} />
        <WhatsAppButton />
        <ReserveModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}
