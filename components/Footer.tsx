import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { Logo } from './Logo';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

const GenericPartnerLogo: React.FC<{ text: string }> = ({ text }) => (
    <div className="w-28 h-14 bg-white/10 rounded-lg flex flex-col items-center justify-center p-2 text-center transition-colors hover:bg-white/20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400 mb-1">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs text-slate-400 leading-tight">{text}</span>
    </div>
);


const Footer: React.FC = () => {
    const handlePhoneClick = () => {
        trackEvent('click', {
            event_category: 'Contact',
            event_label: 'Phone Click Footer',
        });
    };

  return (
    <footer className="bg-neutral-900/50 z-10 border-t border-white/10">
      <div className="max-w-container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            {/* FIX: The 'light' prop is not valid. Use 'variant="light"' to specify the light version of the logo. */}
            <Logo className="h-10 w-auto" variant="light" />
            <p className="text-sm text-slate-400">
              High-performance websites and data-driven marketing for ambitious SMBs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-slate-400 hover:text-white transition-colors opacity-70 hover:opacity-100">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/website-design" className="text-base text-slate-400 hover:text-white">Website Design</Link></li>
              <li><Link to="/seo-ppc" className="text-base text-slate-400 hover:text-white">SEO & PPC</Link></li>
              <li><Link to="/social" className="text-base text-slate-400 hover:text-white">Social Media</Link></li>
              <li><Link to="/graphic-design" className="text-base text-slate-400 hover:text-white">Graphic Design</Link></li>
            </ul>
          </div>
          
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-base text-slate-400">
              <li>1408 Mt Zion Rd, Union, <br/>KY 41091, United States</li>
              <li><a href="tel:513-993-5166" onClick={handlePhoneClick} className="hover:text-white">513-993-5166</a></li>
              <li><a href="mailto:info@totalqualitymedia.com" className="hover:text-white">info@totalqualitymedia.com</a></li>
            </ul>
          </div>

          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Certifications</h3>
            <div className="mt-4 flex space-x-4">
               <GenericPartnerLogo text="Certified Partner" />
               <GenericPartnerLogo text="Premier Partner" />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} TOTAL QUALITY MEDIA LLC. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;