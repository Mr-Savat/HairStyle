import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TransformationSlider from './components/TransformationSlider';
import StyleQuiz from './components/StyleQuiz';
import LookbookSection from './components/LookbookSection';
import ServicesMenu from './components/ServicesMenu';
import AtelierExperience from './components/AtelierExperience';
import StylistsSection from './components/StylistsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingAudioWidget from './components/FloatingAudioWidget';
import { ambientSound } from './utils/ambientAudio';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);
  const [preselectedStylist, setPreselectedStylist] = useState(null);
  
  // Video playback reference & state (Playing by default)
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Theme state: default to 'dark' or stored preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('elixir_theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('elixir_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Audio state: Default to PLAYING with sound
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  // Auto-play video and sound on load + handle browser autoplay permissions seamlessly
  useEffect(() => {
    const playMedia = async () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
        try {
          await videoRef.current.play();
          ambientSound.start(0.25);
          setIsPlaying(true);
          setIsAudioMuted(false);
          setIsAudioPlaying(true);
        } catch (err) {
          // If browser restricts unmuted autoplay before first interaction,
          // play video muted initially and unlock sound on the first scroll or touch
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }

          const autoStartSound = () => {
            ambientSound.start(0.25);
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 0.7;
              videoRef.current.play().catch(() => {});
            }
            setIsAudioMuted(false);
            setIsAudioPlaying(true);
            setIsPlaying(true);

            window.removeEventListener('click', autoStartSound);
            window.removeEventListener('scroll', autoStartSound);
            window.removeEventListener('touchstart', autoStartSound);
            window.removeEventListener('pointerdown', autoStartSound);
          };

          window.addEventListener('click', autoStartSound, { once: true });
          window.addEventListener('scroll', autoStartSound, { once: true, passive: true });
          window.addEventListener('touchstart', autoStartSound, { once: true });
          window.addEventListener('pointerdown', autoStartSound, { once: true });
        }
      }
    };

    playMedia();
  }, []);

  const toggleAudio = () => {
    if (isAudioMuted) {
      ambientSound.start(0.25);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
      }
      setIsAudioMuted(false);
      setIsAudioPlaying(true);
    } else {
      ambientSound.stop();
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
      setIsAudioMuted(true);
      setIsAudioPlaying(false);
    }
  };

  const handleOpenBooking = (serviceName = null, stylistName = null) => {
    setPreselectedService(serviceName);
    setPreselectedStylist(stylistName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedService(null);
    setPreselectedStylist(null);
  };

  return (
    <div className="min-h-screen bg-[#faf7fd] dark:bg-[#0e0919] text-[#21133b] dark:text-[#f7f4fd] flex flex-col font-sans selection:bg-[#d2c3f6]/40 selection:text-[#36255c] dark:selection:text-[#faf7fd] transition-colors duration-300">
      {/* Fixed Luxury Navigation Bar with Top Announcement Ribbon & Theme Controls */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1">
        {/* Hero Section with Pristine Cinematic Video Background */}
        <HeroSection
          videoRef={videoRef}
          onOpenBooking={() => handleOpenBooking()}
          isAudioMuted={isAudioMuted}
        />

        {/* Interactive Before & After Transformation Slider */}
        <TransformationSlider onOpenBooking={handleOpenBooking} />

        {/* Interactive Style Matcher Consultation Quiz */}
        <StyleQuiz onOpenBooking={handleOpenBooking} />

        {/* Ultra-Impressive Couture Lookbook with Infinite Auto-Scroll Runway & Quick-View Lightbox */}
        <LookbookSection onOpenBooking={handleOpenBooking} />

        {/* Services & Transparent Investment Menu */}
        <ServicesMenu onOpenBooking={handleOpenBooking} />

        {/* The Atelier Difference & Amenities Bento Grid */}
        <AtelierExperience />

        {/* Master Stylists Team Showcase */}
        <StylistsSection onOpenBooking={handleOpenBooking} />

        {/* Verified Client Praise & Social Proof */}
        <TestimonialsSection />

        {/* FAQ & Objection Handling Accordion */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* THE ONLY Unified Floating Audio & Video Controller (Right Corner - Docks on Scroll & Expands on Hover) */}
      <FloatingAudioWidget
        videoRef={videoRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isAudioMuted={isAudioMuted}
        toggleAudio={toggleAudio}
        isAudioPlaying={isAudioPlaying}
      />

      {/* Interactive Booking Modal / Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={preselectedService}
        preselectedStylist={preselectedStylist}
      />
    </div>
  );
}
