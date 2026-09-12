import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Service Finder', path: '/service-finder' },
    { name: 'How We Work', path: '/how-we-work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav border-b border-brand-border py-3.5'
            : 'bg-white/70 backdrop-blur-sm border-b border-brand-border/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Premium Entrance Motion */}
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 1.10, x: -8, y: -5, opacity: 0 }}
            animate={{
              scale: shouldReduceMotion ? 1 : [1.10, 1.04, 1.012, 1],
              x: shouldReduceMotion ? 0 : [-8, -3, 1, 0],
              y: shouldReduceMotion ? 0 : [-5, -2, 0.5, 0],
              opacity: shouldReduceMotion ? 1 : [0, 1, 1, 1],
            }}
            transition={{
              duration: 1.0,
              times: [0, 0.35, 0.75, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <NavLink to="/" className="flex items-center gap-3.5 group py-1 relative">
              <div className="relative shrink-0">
                {/* Golden Flash/Glow Halo during initial reveal */}
                {!shouldReduceMotion && (
                  <motion.div
                    initial={{ opacity: 0.9, scale: 1.3 }}
                    animate={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 rounded-xl bg-brand-primary/45 blur-md pointer-events-none"
                  />
                )}
                <img
                  src="/zenixfoodwork.jpg"
                  alt="Zenix Food Worx"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-subtle group-hover:scale-105 transition-transform duration-300 border border-brand-border/40 shrink-0 relative z-10"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading font-extrabold text-2xl sm:text-2xl tracking-tight text-brand-black leading-tight">
                  ZENIX
                </span>
                <span className="text-[11px] font-bold tracking-[0.22em] text-brand-primary uppercase leading-none mt-0.5">
                  FOOD WORX
                </span>
              </div>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-brand-backgroundSoft px-2 py-1.5 rounded-full border border-brand-border">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full font-heading text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-primary text-brand-black shadow-sm font-semibold'
                      : 'text-brand-charcoal hover:text-brand-primary hover:bg-white/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primaryDark text-brand-black font-heading text-xs xl:text-sm font-semibold shadow-subtle hover:shadow-card-hover transition-all duration-300 group"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-black" />
            </NavLink>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-xl text-brand-charcoal hover:bg-brand-backgroundSoft transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-brand-primary" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
