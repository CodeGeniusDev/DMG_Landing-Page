import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { Logo } from "./Logo";
import { useModal } from "../context/ModalContext";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      // Navigate to home first, then the hash will be handled
      window.location.href = `/${href}`;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCTAClick = () => {
    trackEvent("click", {
      event_category: "CTA",
      event_label: "Get Free Audit Header",
    });
    openModal();
    setIsOpen(false);
  };

  const initialHeaderStyle =
    "bg-neutral-900/80 backdrop-blur-sm text-white border-b border-white/10";
  const scrolledHeaderStyle = "bg-white/95 shadow-md backdrop-blur-sm";
  const useDarkLogo = isScrolled || isOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        useDarkLogo ? scrolledHeaderStyle : initialHeaderStyle
      }`}
    >
      <nav className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2"
              aria-label="TQM Digital Home"
            >
              <Logo
                variant={useDarkLogo ? "dark" : "light"}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`${
                    useDarkLogo ? "text-neutral-700" : "text-white"
                  } hover:text-brand-red px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={handleCTAClick}
              className="ml-4 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-red text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
            >
              Get Free Audit
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                useDarkLogo ? "text-neutral-700" : "text-white"
              } hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-neutral-700 hover:text-brand-red block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleCTAClick}
              className="block w-full text-left mt-2 px-4 py-2 rounded-lg text-base font-semibold bg-brand-red text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition-transform transform hover:scale-105"
            >
              Get Free Audit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
