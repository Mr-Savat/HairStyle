import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Scissors, Phone, Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar({
  onOpenBooking,
  theme,
  toggleTheme,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Signature Looks', href: '#lookbook' },
    { name: 'Services & Rates', href: '#services' },
    { name: 'Transformation', href: '#transformation' },
    { name: 'Style Matcher', href: '#quiz' },
    { name: 'The Atelier', href: '#experience' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Luxury Announcement Ribbon with Dismiss [X] Button */}
      {!bannerDismissed && (
        <div className="relative bg-gradient-to-r from-[#261742] via-[#36255C] to-[#261742] text-[#FAF7FD] py-1.5 px-10 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2 shadow-sm border-b border-[#D2C3F6]/20 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#D2C3F6] flex-shrink-0" />
          <span>First Atelier Visit: Complimentary Botanical Scalp Spa with any Cut & Color</span>
          <span className="hidden sm:inline text-[#D2C3F6]">•</span>
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline underline font-bold text-[#D2C3F6] hover:text-white transition-colors cursor-pointer ml-1"
          >
            Claim &rarr;
          </button>

          {/* Close [X] Button */}
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#FAF7FD]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Announcement"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#faf7fd]/92 dark:bg-[#100A1F]/90 backdrop-blur-md border-b border-[#D2C3F6]/25 dark:border-[#D2C3F6]/15 shadow-lg dark:shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0E0919]/90 via-[#0E0919]/50 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D2C3F6] via-[#B89CF7] to-[#36255C] flex items-center justify-center text-[#1E1136] shadow-lg shadow-[#D2C3F6]/25 group-hover:scale-105 transition-transform">
              <Scissors className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <span
                className={`font-display tracking-[0.25em] text-xl font-bold transition-colors ${
                  scrolled
                    ? 'text-[#21133B] dark:text-white group-hover:text-[#6D3ABF] dark:group-hover:text-[#D2C3F6]'
                    : 'text-white group-hover:text-[#D2C3F6]'
                }`}
              >
                ÉLIXIR
              </span>
              <span
                className={`block text-[10px] tracking-[0.3em] uppercase font-sans font-medium ${
                  scrolled ? 'text-stone-500 dark:text-stone-400' : 'text-stone-400'
                }`}
              >
                Coiffure Atelier
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 group ${
                  scrolled
                    ? 'text-stone-700 hover:text-[#6D3ABF] dark:text-stone-300 dark:hover:text-[#D2C3F6]'
                    : 'text-stone-300 hover:text-[#D2C3F6]'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D2C3F6] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                scrolled
                  ? 'bg-purple-100/60 dark:bg-[#1A112E] border-purple-200 dark:border-[#36255C] text-[#36255C] dark:text-[#D2C3F6] hover:scale-105'
                  : 'bg-stone-900/60 border-stone-800 text-[#D2C3F6] hover:text-white hover:scale-105'
              }`}
              title={theme === 'dark' ? 'Switch to Luxury Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D2C3F6] transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#36255C] dark:text-[#D2C3F6] transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              type="button"
              className="shimmer-btn bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] px-4 sm:px-5 py-2 rounded-full font-semibold text-xs tracking-wider uppercase shadow-lg shadow-[#D2C3F6]/25 hover:shadow-[#D2C3F6]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors ${
                scrolled
                  ? 'text-stone-800 dark:text-stone-300 bg-purple-100/50 dark:bg-[#1A112E] border-purple-200 dark:border-[#36255C]'
                  : 'text-stone-300 hover:text-white bg-stone-900/80 border-stone-800'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf7fd]/95 dark:bg-[#120B20]/95 backdrop-blur-xl border-b border-[#D2C3F6]/30 dark:border-[#36255C] px-6 py-6 animate-in slide-in-from-top-4 duration-300 text-[#21133B] dark:text-white">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-800 dark:text-stone-200 hover:text-[#6D3ABF] dark:hover:text-[#D2C3F6] py-2 border-b border-purple-100 dark:border-[#1E1338] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-gradient-to-r from-[#D2C3F6] via-[#B89CF7] to-[#A78BFA] text-[#1E1136] rounded-xl font-bold text-center tracking-wider text-sm shadow-lg shadow-[#D2C3F6]/25"
              >
                Reserve Consultation
              </button>
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8B5CF6]" /> +1 (555) 849-2910
                </span>
                <span>Madison Ave, NYC</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
