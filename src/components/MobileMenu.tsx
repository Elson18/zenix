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
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'How We Work', path: '/how-we-work' },
    { name: 'Industries', path: '/industries' },
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
              <div className="flex items-center justify-between p-6 border-b border-brand-borderSubtle">
                <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-brand-emerald flex items-center justify-center text-brand-gold font-heading font-bold text-lg shadow-sm">
                    Z
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-lg text-brand-emerald tracking-tight block leading-tight">
                      ZENIX
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-brand-gold uppercase block leading-none">
                      FOOD WORX
                    </span>
                  </div>
                </NavLink>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-brand-slate hover:text-brand-emerald hover:bg-brand-bgLight transition-colors"
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
                          ? 'bg-brand-lightGreen text-brand-emerald font-semibold'
                          : 'text-brand-charcoal hover:bg-brand-bgLight hover:text-brand-emerald'
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
            <div className="p-6 border-t border-brand-borderSubtle bg-brand-bgWarm space-y-4">
              <NavLink
                to="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldHover text-white font-heading font-semibold shadow-md transition-all active:scale-[0.98]"
              >
                <span>Get a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <div className="pt-3 border-t border-brand-borderLight text-xs text-brand-muted space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>{companyData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-emerald" />
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
