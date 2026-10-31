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
  
  // Video playback reference & state
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

  // Audio state: accurately synchronized with browser autoplay policy
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const userManuallyMutedRef = useRef(false);

  // Auto-play video and sound on load + handle browser autoplay permissions seamlessly
  useEffect(() => {
    let cleanup = () => {};

    const playMedia = async () => {
      if (!videoRef.current) return;

      // First attempt to play with sound (if browser allows)
      try {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
        await videoRef.current.play();
        await ambientSound.start(0.25);
        setIsPlaying(true);
        setIsAudioMuted(false);
        setIsAudioPlaying(true);
      } catch (err) {
        // Browser restricted unmuted autoplay before first interaction.
        // 1. Play video muted so visuals start immediately
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
        setIsAudioMuted(true);
        setIsAudioPlaying(false);
        setIsPlaying(true);

        // 2. Automatically unlock sound on the user's very first interaction anywhere on page
        const handleFirstInteraction = async () => {
          if (userManuallyMutedRef.current) return;
          try {
            await ambientSound.start(0.25);
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 0.7;
              videoRef.current.play().catch(() => {});
            }
            setIsAudioMuted(false);
            setIsAudioPlaying(true);
            setIsPlaying(true);
          } catch (e) {
            console.warn('Audio auto-unlock on interaction:', e);
          }
          cleanup();
        };

        const events = ['click', 'touchstart', 'pointerdown', 'keydown'];
        events.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { once: true }));
        cleanup = () => {
          events.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
        };
      }
    };

    playMedia();

    return () => {
      cleanup();
    };
  }, []);

  const toggleAudio = async () => {
    if (isAudioMuted) {
      userManuallyMutedRef.current = false;
      try {
        await ambientSound.start(0.25);
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 0.7;
          videoRef.current.play().catch(() => {});
        }
        setIsAudioMuted(false);
        setIsAudioPlaying(true);
        setIsPlaying(true);
      } catch (e) {
        console.warn('Failed to start audio:', e);
      }
    } else {
      userManuallyMutedRef.current = true;
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
