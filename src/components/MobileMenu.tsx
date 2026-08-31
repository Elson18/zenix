import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, ArrowRight, Phone, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyData } from '../data/companyData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Service Finder', path: '/service-finder' },
    { name: 'How We Work', path: '/how-we-work' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/50 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-6 border-b border-brand-border">
                <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
                  <img
                    src="/zenixfoodwork.jpg"
                    alt="Zenix Food Worx"
                    className="w-9 h-9 rounded-lg object-cover shadow-sm border border-brand-border"
                  />
                  <div>
                    <span className="font-heading font-extrabold text-lg text-brand-black tracking-tight block leading-tight">
                      ZENIX
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-brand-primary uppercase block leading-none">
                      FOOD WORX
                    </span>
                  </div>
                </NavLink>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-brand-charcoal hover:text-brand-primary hover:bg-brand-backgroundSoft transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-xl font-heading font-medium text-base transition-all ${
                        isActive
                          ? 'bg-brand-primaryLight text-brand-black font-semibold'
                          : 'text-brand-charcoal hover:bg-brand-backgroundSoft hover:text-brand-primary'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-brand-border bg-brand-backgroundSoft space-y-4">
              <NavLink
                to="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading font-semibold shadow-md transition-all active:scale-[0.98]"
              >
                <span>Get a Consultation</span>
                <ArrowRight className="w-4 h-4 text-brand-black" />
              </NavLink>

              <div className="pt-3 border-t border-brand-border text-xs text-brand-textMuted space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{companyData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{companyData.contact.email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
