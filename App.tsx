import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import LegalPage from './pages/LegalPage';
import SkipToContentLink from './components/SkipToContentLink';
import { ModalProvider } from './context/ModalContext';
import ContactModal from './components/ContactModal';

const App: React.FC = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname, hash, key]);

  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen relative bg-gradient-to-b from-[#0B0F19] to-[#0F172A] text-slate-300">
        <div 
            className="absolute inset-0 bg-repeat z-0 dot-grid-background"
            aria-hidden="true" 
        />
        
        <SkipToContentLink />
        <Header />
        <main id="main-content" className="flex-grow z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/website-design" element={<ServicePage service="Website Design" />} />
            <Route path="/seo-ppc" element={<ServicePage service="SEO & PPC" />} />
            <Route path="/social" element={<ServicePage service="Social Media Marketing" />} />
            <Route path="/graphic-design" element={<ServicePage service="Graphic Designing" />} />
            <Route path="/contact" element={<ServicePage service="Contact" />} />
            <Route path="/privacy" element={<LegalPage page="Privacy" />} />
            <Route path="/terms" element={<LegalPage page="Terms" />} />
          </Routes>
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ModalProvider>
  );
};

export default App;