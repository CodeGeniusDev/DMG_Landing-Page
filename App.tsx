import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipToContentLink from './components/SkipToContentLink';
import { ModalProvider } from './context/ModalContext';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ContactModal = lazy(() => import('./components/ContactModal'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
  </div>
);

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
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <ContactModal />
        </Suspense>
      </div>
    </ModalProvider>
  );
};

export default App;